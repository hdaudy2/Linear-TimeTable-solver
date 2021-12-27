import {
  InitializerConfig,
  ClassInitializerStructure,
  CalenderStructure,
  Times,
  Days,
  DisplayConfigObject,
  SetSlotConfigObject,
} from "../types/types";
import ID from "../util/GetID";
import Room from "./Room";
import Slot from "./Slots";

class ClassInitializer implements ClassInitializerStructure {
  ID: string;
  calender: CalenderStructure;

  constructor(config: InitializerConfig, id: string) {
    this.ID = ID.new(id);
    this.calender = {};

    const daysList: Days[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    for (const day of daysList) {
      if (day in config) {
        const timeStamps = config[day]!;
        this.calender[day] = this.AddSlots(day, timeStamps);
      }
    }
  }

  private AddSlots(day: Days, slots: Times[]) {
    const Data = slots.map((timeSlot) => new Slot(`unoccupied`, day, timeSlot));
    return Data;
  }

  checkSlot(day: Days, timeFrame: Times) {
    if (!(day in this.calender)) throw new Error(`${day}\'s off...`);

    const slot = this.calender[day]!.find((slot) => slot.time === timeFrame);

    if (!slot) throw new Error(`No class at ${timeFrame} on ${day}`);

    return slot.type === "unoccupied";
  }

  availableSlots(): CalenderStructure {
    const calender: CalenderStructure = {};
    const daysList: Days[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    for (const day of daysList) {
      if (day in this.calender) {
        const slots = this.calender[day as Days]!.filter((T) => {
          if (T.type === "unoccupied") return T;
        });
        if (slots.length >= 0) {
          calender[day as Days] = slots;
        }
      }
    }

    return calender;
  }

  SetSlot(object: SetSlotConfigObject) {
    const { day, time, batch, sections, subject, instructor, room } = object;

    if (!(day in this.calender)) throw new Error(`${day}\'s off...`);

    const slot = this.calender[day]!.find((slot) => slot.time === time);

    if (!slot) throw new Error(`No class at ${time} on ${day}`);
    if (slot.type === "occupied")
      throw new Error(`There another class at ${time}.`);

    slot.type = "occupied";

    if (batch) slot.batch = batch;
    if (sections) slot.sections = sections;
    if (subject) slot.subject = subject;
    if (instructor) slot.instructor = instructor;
    if (room) slot.room = room;
  }

  display(Fn: () => void) {
    // Display addition information
    Fn();
    const daysList = Object.getOwnPropertyNames(this.calender) as Days[];
    daysList.forEach((T) => {
      const DisplayObject: DisplayConfigObject = {};
      this.calender[T]!.forEach((U) => {
        if (U.type === "occupied") {
          DisplayObject[U.time] = {
            subject: U.subject![0],
            type: U.subject![1],
            instructor: U.instructor!,
            room: U.room!,
          };
        } else {
          DisplayObject[U.time] = {
            subject: "-",
            type: "-",
            instructor: "-",
            room: "-",
          };
        }
      });
      console.table([{ DAY: T }]);
      console.table(DisplayObject);
    });
  }
}

export default ClassInitializer;
