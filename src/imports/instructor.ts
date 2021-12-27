import Instructor from "../models/Instructor";
import _import from "./_import";

type ImportPattern = { name: string };

// -------------------------------------------------------
// All the Instructor objects will go in the data Array
// Each Instructor object should be in the following Structure
// {
//  name: instructor name as string,
// },
// -------------------------------------------------------

// ------------------------------------------------------
const DATA: ImportPattern[] = [
  { name: "instructor-01" },
  { name: "instructor-02" },
  { name: "instructor-03" },
  { name: "instructor-04" },
  { name: "instructor-05" },
  { name: "instructor-06" },
  { name: "instructor-07" },
  { name: "instructor-08" },
  { name: "instructor-09" },
  { name: "instructor-10" },
  { name: "instructor-11" },
  { name: "instructor-12" },
  { name: "instructor-13" },
  { name: "instructor-14" },
  { name: "instructor-15" },
];
// ------------------------------------------------------

const instructorList: Instructor[] = _import("instructor", DATA, (ROW) => {
  return ROW.map((T) => new Instructor(T.name));
});

export default instructorList;
