import { Env } from "../StateManagement/Env";
import { OperationContState } from "../StateManagement/OperationStack";
import { StateMgr } from "../StateMgr";

export class EnvTreeHandler {
  public static runDive(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.envStore.diveToNewChildEnv();
  }

  public static runRise(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.envStore.riseToCurParentEnv();
  }

  public static runChangeEnvById(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.envStore.changeEnvById(opContState.memo);
  }

  public static runBindEnvByMap(stateMgr: StateMgr, opContState : OperationContState) {
    let curEnv : Env = stateMgr.envStore.getCurEnv();
    
    let lastVal = stateMgr.valueStack.popValue();
    // TODO lastVal should be a object
    for (let key of lastVal) {
      curEnv.define(key, lastVal[key]);
    } 
  }
}