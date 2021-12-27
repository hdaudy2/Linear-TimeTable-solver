import ClassInitializer from "./ClassInitializer";
import Room from "./Room";
import Subject from "./Subject";
import Instructor from "./Instructor";
import {
  InitializerConfig,
  Days,
  Times,
  SectionNames,
  SectionStructure,
  SubjectInSection,
  weeklyScheduleStructure,
  SubjectType,
  SetSlotConfigObject,
} from "../types/types";
import Randomizer from "../util/Randomizer";

type availableSlots = {
  Monday?: [Times, Room][];
  Tuesday?: [Times, Room][];
  Wednesday?: [Times, Room][];
  Thursday?: [Times, Room][];
  Friday?: [Times, Room][];
};

const calenderConfig: InitializerConfig = {
  Monday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Tuesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Wednesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Thursday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Friday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
};

class Section extends ClassInitializer implements SectionStructure {
  batch: number;
  section: SectionNames;
  room: Room;
  subjects: SubjectInSection[];
  labs?: Room[];

  constructor(
    batch: number,
    section: SectionNames,
    semester: number,
    room: Room,
    subjects: Subject[],
    labs?: Room[]
  ) {
    if (room.allotted)
      throw new Error("Selected Room is already alloted to another class...");
    room.allot();

    super(calenderConfig, "section");
    this.batch = batch;
    this.section = section;
    this.room = room;
    this.subjects = [];
    if (labs) this.labs = labs;
    this.updateSubjects(semester, subjects);
  }

  updateSubjects(semester: number, subjects: Subject[]) {
    const filteredSubject = subjects.filter((el) => el.semester === semester);

    if (filteredSubject.length >= 0) {
      filteredSubject.forEach((sub) => {
        const tempSubject: SubjectInSection = {
          ...sub,
          assigned: false,
        };
        this.subjects.push(tempSubject);
      });
    } else {
      console.log(`No such subject found with ${semester} semester.`);
    }
  }

  assignInstructor(
    subject: Subject,
    type: SubjectType,
    instructor: Instructor
  ) {
    // console.log({subject, type, instructor});

    const subjectPointer = this.subjects.find((T) => T.ID === subject.ID);

    if (!subjectPointer) throw new Error("This subject isn't in the semester.");

    subjectPointer.assigned = true;
    subjectPointer.instructor = instructor;
    subjectPointer.instructor.setSubject(
      subject,
      this.batch,
      this.section,
      this.room.roomNumber
    );
  }

  createTimetable() {
    // ---------------------------------------------------------------------
    // 1. initialize
    // 1.1 Set weekly schedule for the section
    const weeklySchedule = this.subjects.map(
      (T) =>
        ({
          name: T.name,
          type: T.type,
          credits: T.credits,
          alloted: 0,
          instructor: T.instructor!,
        } as weeklyScheduleStructure)
    );
    // 1.2 count number Subject credits for the week
    let subjectCredit: number = 0;
    // 1.3 count number lab credits for the week
    let labCredit: number = 0;

    // 1.4 counting Credits
    weeklySchedule.forEach((T) => {
      if (T.type === "class") subjectCredit += T.credits;
      if (T.type === "lab") labCredit += T.credits;
    });
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // 2. Assign Subject Proper slot
    if (subjectCredit > 0)
      for (let step = 0; step < subjectCredit; step++) {
        // 2.1 filter out subjects which have credit hours remaining
        const subjectList = weeklySchedule.filter(
          (T) => T.type === "class" && T.alloted < T.credits
        );
        // 2.2 Randomly selecting a subject
        const selectedSubject = subjectList[Randomizer(subjectList.length)];
        // 2.3 Pick and Assign a Random Slot
        this.RandomSlotAssigner(selectedSubject);
        // 2.4 Increment in selectedSubject
        selectedSubject.alloted++;
      }
    // ---------------------------------------------------------------------

    // ---------------------------------------------------------------------
    // 3. Assign lab Proper slot
    if (labCredit > 0) for (let step = 0; step < labCredit; step++) {
      // 3.1 filter out subjects which have credit hours remaining
      const subjectList = weeklySchedule.filter(
        (T) => T.type === "lab" && T.alloted < T.credits
      );
      // 3.2 Randomly selecting a subject
      const selectedSubject = subjectList[Randomizer(subjectList.length)];
      // 3.3 Pick and Assign a Random Slot
      this.RandomSlotAssigner(selectedSubject);
      // 3.4 Increment in selectedSubject
      selectedSubject.alloted++;
    }
    // ---------------------------------------------------------------------
  }

  private RandomSlotAssigner(subject: weeklyScheduleStructure) {
    // 1. create available slot calender from Fn function.
    const availableSlots: availableSlots = this.createAvailabilityCalender(
      subject.type,
      subject.instructor
    );
    // 2. Pick Day, time & room Randomly.
    // 2.1 Create Days list from the properties present in available Slot
    const DayList = Object.getOwnPropertyNames(availableSlots) as Days[];
    const DAY = DayList[Randomizer(DayList.length)]; // Randomly Selected Day
    // 2.2 Randomly Selected time and room
    const [TIME, ROOM] =
      availableSlots[DAY]![Randomizer(availableSlots[DAY]!.length)];
    // 3. create Config Object for slot
    const SlotConfig: SetSlotConfigObject = {
      day: DAY,
      time: TIME,
      batch: this.batch,
      sections: this.section,
      subject: [subject.name, subject.type],
      instructor: subject.instructor.name,
      room: ROOM.roomNumber,
    };
    // 4. Updating Slots
    this.SetSlot(SlotConfig); // Section
    subject.instructor.SetSlot(SlotConfig); // Instructor
    ROOM.SetSlot(SlotConfig); // Room
  }

  private createAvailabilityCalender(
    type: SubjectType,
    instructor: Instructor
  ): availableSlots {
    // 1. create available slot calender from Fn function.
    const calender: availableSlots = {};
    // 2. Create Days list
    const day = Object.getOwnPropertyNames(this.calender) as Days[];
    // 3. Check if subject
    if (type === "class") {
      // 3.1 Fill Slots
      day.forEach((T) => {
        // Filter out time for the Slots
        const TimesSlots = this.calender[T]!.map((U) => U.time);
        // loop the Filtered timeSlots
        TimesSlots.forEach((U) => {
          // check if both section and instructor calender are free
          if (this.checkSlot(T, U) && instructor.checkSlot(T, U)) {
            // find the slot from section calender
            const slot = this.calender[T]!.find(
              (V) => V.day === T && V.time === U
            )!;

            // check if slot is found and respected day in availableSlot is not initialized then initialized as Array
            if (slot && !calender[T]) calender[T]! = [];

            // push the instance
            calender[T]!.push([slot.time, this.room]);
          }
        });
      });
    }
    // 3. Check if lab
    if (type === "lab") {
      // 3.1 Fill Slots
      day.forEach((T) => {
        // Filter out time for the Slots
        const TimesSlots = this.calender[T]!.map((U) => U.time);
        // loop the Filtered timeSlots
        TimesSlots.forEach((U) => {
          if (this.checkSlot(T, U) && instructor.checkSlot(T, U)) {
            if (this.labs) {
              const checkLabs: Room[] = [];
              this.labs.forEach((V) => {
                if (V.checkSlot(T, U)) checkLabs.push(V);
              });
              if (checkLabs.length >= 0) {
                const room = checkLabs[Randomizer(checkLabs.length - 1)];
                //  find the slot from section calender
                const slot = this.calender[T]!.find(
                  (V) => V.day === T && V.time === U
                )!;

                // check if slot is found and respected day in availableSlot is not initialized then initialized as Array
                if (slot && !calender[T]) calender[T]! = [];

                // push the instance
                calender[T]!.push([slot.time, room]);
              }
            } else {
              //  find the slot from section calender
              const slot = this.calender[T]!.find(
                (V) => V.day === T && V.time === U
              )!;

              // check if slot is found and respected day in availableSlot is not initialized then initialized as Array
              if (slot && !calender[T]) calender[T]! = [];

              // push the instance
              calender[T]!.push([slot.time, this.room]);
            }
          }
        });
      });
    }
    // 4. return calender
    return calender;
  }
}

export default Section;
