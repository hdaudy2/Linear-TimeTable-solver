import { RoomType, RoomStructure, InitializerConfig } from "../types/types";
import ClassInitializer from "./ClassInitializer";

const calenderConfig: InitializerConfig = {
  Monday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Tuesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Wednesday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Thursday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
  Friday: ["09:00", "10:00", "11:00", "01:00", "02:00"],
};

class Room extends ClassInitializer implements RoomStructure {
  roomNumber: string;
  type: RoomType;
  allotted: boolean;

  constructor(roomNumber: string, type: RoomType) {
    super(calenderConfig, 'room');

    this.type = type;
    this.roomNumber = roomNumber;
    this.allotted = false;
  }

  allot() {
    this.allotted = true;
  }
}

export default Room;
