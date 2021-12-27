import Batch from "../models/Batch";
import Instructor from "../models/Instructor";
import Subject from "../models/Subject";
import {
  SectionNames,
  sectionParameter,
  SemestersOptions,
  SubjectType,
} from "../types/types";
import _import from "./_import";
import instructorList from "./instructor";
import RoomList from "./room";
import SubjectList from "./subjects";
import Room from "../models/Room";

type ImportPattern = {
  year: number;
  semester: SemestersOptions;
  labs?: String[];
  sections: {
    name: SectionNames;
    room: string;
    subjects: [string, SubjectType, string][];
  }[];
};

// -------------------------------------------------------
// All the Batch objects will go in the data Array
// Each Batch object should be in the following Structure
// {
//  name: instructor name as string,
// },
// -------------------------------------------------------

// ------------------------------------------------------
const DATA: ImportPattern[] = [
  {
    year: 2019,
    semester: 4,
    sections: [
      {
        name: "A",
        room: "BBA01",
        subjects: [
          ["English-IV", "class", "instructor-11"],
          ["Principles of Marketing", "class", "instructor-13"],
          ["Environmental Science", "class", "instructor-14"],
          ["Financial Accounting-II", "class", "instructor-12"],
          ["Organizational behavior", "class", "instructor-09"],
          ["Business Finance", "class", "instructor-15"],
        ],
      },
    ],
  },
  {
    year: 2020,
    semester: 3,
    sections: [
      {
        name: "A",
        room: "BBA02",
        subjects: [
          ["English-III", "class", "instructor-11"],
          ["Mathematics-II", "class", "instructor-06"],
          ["Macroeconomics", "class", "instructor-10"],
          ["Financial Accounting-I", "class", "instructor-12"],
          ["Introduction to HRM", "class", "instructor-08"],
          ["Sociology", "class", "instructor-07"],
        ],
      },
    ],
  },
  {
    year: 2021,
    semester: 2,
    sections: [
      {
        name: "A",
        room: "BBA03",
        subjects: [
          ["English-II", "class", "instructor-01"],
          ["Arabic/Chinese etc II", "class", "instructor-02"],
          ["Mathematics-I", "class", "instructor-06"],
          ["Human Psychology", "class", "instructor-07"],
          ["Introduction to Management", "class", "instructor-08"],
          ["Microeconomics", "class", "instructor-10"],
        ],
      },
    ],
  },
  {
    year: 2022,
    semester: 1,
    labs: ["Software-lab", "IT-Lab"],
    sections: [
      {
        name: "A",
        room: "BBA04",
        subjects: [
          ["English-I", "class", "instructor-01"],
          ["Arabic/Chinese etc I", "class", "instructor-02"],
          ["Introduction to Computer", "class", "instructor-03"],
          ["Introduction to Computer", "lab", "instructor-03"],
          ["Contemporary World", "class", "instructor-09"],
          ["Pakistan Studies", "class", "instructor-04"],
          ["Islamic Studies", "class", "instructor-05"],
        ],
      },
      {
        name: "B",
        room: "BBA05",
        subjects: [
          ["English-I", "class", "instructor-01"],
          ["Arabic/Chinese etc I", "class", "instructor-02"],
          ["Introduction to Computer", "class", "instructor-03"],
          ["Introduction to Computer", "lab", "instructor-03"],
          ["Contemporary World", "class", "instructor-09"],
          ["Pakistan Studies", "class", "instructor-04"],
          ["Islamic Studies", "class", "instructor-05"],
        ],
      },
    ],
  },
];
// ------------------------------------------------------

const batchList: Batch[] = _import("batch", DATA, (ROW) => {
  return ROW.map((T) => {
    // .......................................................
    // 1. Set up sections from DATA object
    const section: sectionParameter = T.sections.map((section) => {
      // 1.1. find specific room
      const roomInstance = RoomList.find(
        (room) => room.roomNumber === section.room
      )!;
      // 1.2. return tuple [section name, roomInstance]
      return [section.name, roomInstance];
    });

    const LabInstances: Room[] = [];
    if (T.labs) {
      T.labs.forEach((U) => {
        const room = RoomList.find((V) => V.roomNumber === U);
        if (room) LabInstances.push(room);
      });
    }

    // .......................................................
    // 2. create new instances of the Batch class
    const batchInstance = new Batch(
      T.year,
      T.semester,
      section,
      SubjectList,
      T.labs && LabInstances
    );

    // .......................................................
    // 3. Set up subject Teachers object in subjectArray with structure of
    // {
    //     section: SectionNames;
    //     subjects: [Subject, SubjectType, Instructor][];
    // }
    const subjectArray = T.sections.map((section) => {
      const name = section.name;
      // assignmentObject tulip contains subject instances, subject type, Instructor instance
      const assignmentObject: [Subject, SubjectType, Instructor][] =
        section.subjects.map((obj) => {
          // obj contains:
          // obj[0] -> Subject name
          // obj[1] -> Subject type
          // obj[2] -> instructor name

          // find subject instance
          const subjectInstance = SubjectList.find(
            (U) => U.name === obj[0] && U.type === obj[1]
          )!;
          // find instructor instance
          const instructorInstance = instructorList.find(
            (U) => U.name === obj[2]
          )!;
          return [subjectInstance, obj[1], instructorInstance];
        });
      // return as a object
      return {
        section: name,
        subjects: assignmentObject,
      };
    });

    // .......................................................
    // 4. Add subject teacher to their respected Section
    subjectArray.forEach((U) => {
      // 4.1 find section
      const section = batchInstance.sections.find(
        (V) => U.section === V.section
      )!;
      // 4.2 loop all subjects and assign instructors to section
      U.subjects.forEach((V) => {
        // V tulip contains
        // V[0] -> subject instance
        // V[1] -> subject type
        // V[2] -> instructor instance
        section.assignInstructor(V[0], V[1], V[2]);
      });
    });

    // .......................................................
    // 5. Return batch instances
    return batchInstance;
  });
});

export default batchList;
