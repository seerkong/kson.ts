import { KsonType } from "../Model/KsonType"
export class HostFunction {
  public __type = KsonType.HostFunc;
  public func: (args: any) => any;
  public name: string;

  constructor(name, func) {
    this.name = name;
    this.func = func;
  }
}