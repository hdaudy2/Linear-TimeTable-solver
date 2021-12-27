import {
  SemestersOptions,
  sectionParameter,
  BatchStructure,
} from "../types/types";
import Room from "./Room";
import Section from "./Section";
import Subject from "./Subject";

class Batch implements BatchStructure {
  year: number;
  semester: SemestersOptions;
  sections: Section[];

  constructor(
    year: number,
    semester: SemestersOptions,
    sections: sectionParameter,
    subjects: Subject[],
    labs?: Room[]
  ) {
    this.year = year;
    this.semester = semester;
    this.sections = [];

    sections.forEach((T) =>
      this.sections.push(
        new Section(this.year, T[0], semester, T[1], subjects, labs && labs)
      )
    );
  }
}

export default Batch;
