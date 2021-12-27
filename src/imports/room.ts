import Room from "../models/Room";
import { RoomType } from "../types/types";
import _import from "./_import";

type ImportPattern = { name: string; type: RoomType };

// -------------------------------------------------------
// All the Room objects will go in the data Array
// Each Room object should be in the following Structure
// {
//  name: room name as string,
//  type: classroom | lab
// },
// -------------------------------------------------------

// ------------------------------------------------------
const DATA: ImportPattern[] = [
  { name: "BBA01", type: "classroom" },
  { name: "BBA02", type: "classroom" },
  { name: "BBA03", type: "classroom" },
  { name: "BBA04", type: "classroom" },
  { name: "BBA05", type: "classroom" },
  { name: "Software-lab", type: "lab" },
  { name: "IT-Lab", type: "lab" },
];
// ------------------------------------------------------

const RoomList: Room[] = _import("room", DATA, (ROW) => {
  return ROW.map((T) => new Room(T.name, T.type));
});

export default RoomList;
