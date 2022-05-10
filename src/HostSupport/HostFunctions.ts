import { HostFunction } from './../Model/HostFunction';
import { Env } from "../StateManagement/Env";
import { IOFunctions } from "./IOFunctions";
import { MathFunctions } from './MathFunctions';

export class HostFunctions {
  public static import(env : Env) {
    HostFunctions.define(env, 'writeln', IOFunctions.writeln);
    HostFunctions.define(env, 'add', MathFunctions.add);
    HostFunctions.define(env, 'minus', MathFunctions.minus);
    HostFunctions.define(env, 'multiply', MathFunctions.multiply);
    HostFunctions.define(env, 'divide', MathFunctions.divide);
    HostFunctions.define(env, 'gt', MathFunctions.gt);
    HostFunctions.define(env, 'ge', MathFunctions.ge);
    HostFunctions.define(env, 'lt', MathFunctions.lt);
    HostFunctions.define(env, 'le', MathFunctions.le);
  }

  public static define(env : Env, name: string, funcImpl) {
    let func = new HostFunction(name, function(args) {
      return funcImpl.apply(null, args);
    });
    env.define(name, func);
  }
}