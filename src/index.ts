#!/usr/bin/env node
import batchList from "./imports/batches";

console.log("App started...");
batchList.forEach(T => T.sections.forEach(U => {
    U.createTimetable();
    U.display(() => {
      const obj = [
        {
          BATCH: U.batch,
          SECTION: U.section,
          SEMESTER: T.semester
        },
      ];
      console.table(obj);
    });
}));