import ClassInitializer from "./ClassInitializer";
import Subject from "./Subject";
import {
  InitializerConfig,
  InstructorStructure,
  SectionNames,
  SubjectInInstructor,
} from "../types/types";

const calenderConfig: InitializerConfig = {
  Monday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Tuesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Wednesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Thursday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Friday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
};

class Instructor extends ClassInitializer implements InstructorStructure {
  name: string;
  subjects: SubjectInInstructor[];

  constructor(name: string) {
    super(calenderConfig, 'instructor');

    this.name = name;
    this.subjects = [];
  }

  setSubject(
    subject: Subject | Subject[],
    batch: number,
    section: SectionNames,
    room: string
  ) {
    if (Array.isArray(subject)) {
      subject.forEach((sub) => {
        const object: SubjectInInstructor = {
          ...sub,
          batch,
          section,
          room,
        };
        this.subjects.push(object);
      });
    } else {
      const object: SubjectInInstructor = {
        ...subject,
        batch,
        section,
        room,
      };
      this.subjects.push(object);
    }
  }
}

export default Instructor;
