import Instructor from "../models/Instructor";
import Room from "../models/Room";
import Section from "../models/Section";
import Slot from "../models/Slots";
import Subject from "../models/Subject";

export type IDstructure = { tag: string; iteration: number };
export type RoomType = "classroom" | "lab";
export type SubjectType = "class" | "lab";

export type SlotType = "free" | "unoccupied" | "occupied";
export type Days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
export type Times = "09:00" | "10:00" | "11:00" | "12:00" | "01:00" | "02:00";

export type SectionNames = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
export type SemestersOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type sectionParameter = [SectionNames, Room][];

export type SetSlotConfigObject = {
  day: Days;
  time: Times;
  batch?: number;
  sections?: SectionNames;
  subject?: [string, SubjectType];
  instructor?: string;
  room?: string;
};

export type CalenderStructure = {
  Monday?: Slot[];
  Tuesday?: Slot[];
  Wednesday?: Slot[];
  Thursday?: Slot[];
  Friday?: Slot[];
};

export interface SubjectInInstructor extends SubjectStructure {
  batch: number;
  section: SectionNames;
  room: string;
}
export interface SubjectInSection extends SubjectStructure {
  assigned: boolean;
  instructor?: Instructor;
}

export type weeklyScheduleStructure = {
  name: string;
  type: SubjectType;
  credits: number;
  alloted: number;
  instructor: Instructor;
};

export type DisplayConfigObject = {
  "09:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
  "10:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
  "11:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
  "12:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
  "01:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
  "02:00"?: {
    subject: string;
    type: string;
    instructor: string;
    room: string;
  };
};

export type InitializerConfig = {
  Monday?: Times[];
  Tuesday?: Times[];
  Wednesday?: Times[];
  Thursday?: Times[];
  Friday?: Times[];
};

export interface RoomStructure {
  roomNumber: string;
  type: RoomType;
}

export interface SubjectStructure {
  ID: string;
  name: string;
  semester: number;
  credits: number;
  department: string;
  type: SubjectType;
}

export interface SlotStructure {
  type: SlotType;
  day: Days;
  time: Times;
  batch?: number;
  sections?: string;
  subject?: [string, SubjectType];
  instructor?: string;
  room?: string;
}

export interface ClassInitializerStructure {
  ID: string;
  calender: CalenderStructure;
}

export interface InstructorStructure {
  name: string;
  subjects: Subject[];
}

export interface SectionStructure {
  batch: number;
  section: SectionNames;
  room: Room;
  subjects: SubjectInSection[];
  labs?: Room[];
}

export interface BatchStructure {
  year: number;
  semester: SemestersOptions;
  sections: Section[];
}
