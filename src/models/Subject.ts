import { SubjectType, SubjectStructure } from "../types/types";
import ID from "../util/GetID";

class Subject implements SubjectStructure {
  ID: string;
  name: string;
  semester: number;
  credits: number;
  department: string;
  type: SubjectType;

  constructor(
    department: string,
    name: string,
    semesterNumber: number,
    credits: number,
    type: SubjectType
  ) {
    this.ID = ID.new('subject');
    this.name = name;
    this.semester = semesterNumber;
    this.credits = credits;
    this.department = department;
    this.type = type;
  }
}

export default Subject;
