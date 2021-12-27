import { randomBytes } from "crypto";
import { IDstructure } from "../types/types";

class IDGenerate {
  private static instance: IDGenerate;
  private IDStorage: IDstructure[] = [];

  private constructor() {}

  static getInstance() {
    if (IDGenerate.instance) {
      return this.instance;
    }
    return (this.instance = new IDGenerate());
  }

  new(tag: string): string {
    const newID: IDstructure = {
      tag,
      iteration: 1,
    };

    const check = this.IDStorage.find((ID) => ID.tag === tag);

    if (check) {
      check.iteration++;
      newID.iteration = check.iteration;
    } else {
      this.IDStorage.push(newID);
    }

    return newID.tag + "-" + newID.iteration;
  }

  random(tag: string) {
    return tag + "-" + randomBytes(2).toString("hex");
  }
}

const ID = IDGenerate.getInstance();

export default ID;
