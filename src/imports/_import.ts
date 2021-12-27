import jsonfile from "jsonfile";

const _import = <T, U>(file: string, data: T[], FN: (T: T[]) => U[]): U[] => {
  const Path = `DB/${file}.json`; // Path where File will be stored...
  let DB: T[] = [];

  // Reading the file if have some record present and stored in "DB"
  jsonfile.readFile(Path, (_, obj) => {
    if (Array.isArray(obj)) {
      DB = [...obj];
    }
  });

  // DB variable have some records then append the new data
  if (DB.length > 0) DB = [...DB, ...data];
  // No previous record found just append new data
  else DB = [...data];

  // Write Data
  jsonfile.writeFile(Path, DB, (err) => {
    if (err) console.error(err);
  });

  const instances = FN(DB); // function that will custom create instances from the data

  return instances;
};

export default _import;
