import { OperationContState } from "../StateManagement/OperationStack";
import { StateMgr } from "../StateMgr";

export class ValueStackHandler {
  public static runPushFrame(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.valueStack.pushFrame();
  }

  public static runPushValue(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.valueStack.pushValue(opContState.memo);
  }

  public static runPopValue(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.valueStack.popValue();
  }

  public static runPopFrameAndPushTopVal(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.valueStack.popFrameAndPushTopVal();
  }

  public static runPopFrameIgnoreResult(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.valueStack.popFrameAllValues();
  }
}