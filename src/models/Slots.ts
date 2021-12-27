import { Days, SlotType, Times, SlotStructure, SectionNames, SubjectType } from '../types/types';
import Instructor from './Instructor';
import Room from './Room';
import Subject from './Subject';

class Slot implements SlotStructure {
    type: SlotType;
    day: Days;
    time: Times;
    batch?: number;
    sections?: SectionNames;
    subject?: [string, SubjectType];
    instructor?: string;
    room?: string;

    constructor(type: SlotType, day: Days, time: Times) {
        this.type = type;
        this.day = day;
        this.time = time;
    }
}

export default Slot;
