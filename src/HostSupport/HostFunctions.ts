import { HostFunction } from './../Model/HostFunction';
import { Env } from "../StateManagement/Env";
import { IOFunctions } from "./IOFunctions";

export class HostFunctions {
  public static import(env : Env) {
    HostFunctions.define(env, 'writeln', IOFunctions.writeln);
  }

  public static define(env : Env, name: string, funcImpl) {
    let func = new HostFunction(name, function(args) {
      return funcImpl.apply(null, args);
    });
    env.define(name, func);
  }
}