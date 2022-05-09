import { Env } from "../StateManagement/Env";
import { KsonType } from "../Model/KsonType"
export class LambdaFunction {
  public __type = KsonType.LambdaFunc;
  public paramTable: string[];
  public funcBody: any;
  public env: Env;
  public name: string;

  constructor(paramTable: string[], funcBody: any, env: Env, name: string = null) {
    this.paramTable = paramTable;
    this.funcBody = funcBody;
    this.env = env;
    this.name = name;
  }
}