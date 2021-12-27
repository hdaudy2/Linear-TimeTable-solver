import Subject from "../models/Subject";
import { SemestersOptions, SubjectType } from "../types/types";
import _import from "./_import";

type ImportPattern = {
  name: string;
  semester: SemestersOptions;
  credits: number;
  department: string;
  type: SubjectType;
};

// -------------------------------------------------------
// All the Subject objects will go in the data Array
// Each Subject object should be in the following Structure
// {
//   name: Subject Name as String;
//   semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 as number;
//   credits: credit hours as number;
//   department: department name as string;
//   type: class | lab as string;
// },
// -------------------------------------------------------

const DATA: ImportPattern[] = [
  {
    name: "English-I",
    semester: 1,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Arabic/Chinese etc I",
    semester: 1,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Introduction to Computer",
    semester: 1,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Introduction to Computer",
    semester: 1,
    credits: 2,
    department: "BBA",
    type: "lab",
  },
  {
    name: "Contemporary World",
    semester: 1,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Pakistan Studies",
    semester: 1,
    credits: 2,
    department: "BBA",
    type: "class",
  },
  {
    name: "Islamic Studies",
    semester: 1,
    credits: 2,
    department: "BBA",
    type: "class",
  },
  {
    name: "English-II",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Arabic/Chinese etc II",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Mathematics-I",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Human Psychology",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Introduction to Management",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Microeconomics",
    semester: 2,
    credits: 3,
    department: "BBA",
    type: "class",
  },

  {
    name: "English-III",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Mathematics-II",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Macroeconomics",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Financial Accounting-I",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Introduction to HRM",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Sociology",
    semester: 3,
    credits: 3,
    department: "BBA",
    type: "class",
  },

  {
    name: "English-IV",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Principles of Marketing",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Environmental Science",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Financial Accounting-II",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Organizational behavior",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
  {
    name: "Business Finance",
    semester: 4,
    credits: 3,
    department: "BBA",
    type: "class",
  },
];

const SubjectList: Subject[] = _import("subject", DATA, (ROW) => {
  return ROW.map(
    (T) => new Subject(T.department, T.name, T.semester, T.credits, T.type)
  );
});

export default SubjectList;
