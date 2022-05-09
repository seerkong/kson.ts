import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";

export class JumpIfFalseHandler {
  public static runJumpIfFalse(stateMgr: StateMgr, opContState : OperationContState) {
    let jumpToIdx = opContState.memo;
    let lastVal = stateMgr.valueStack.popValue();
    let boolVal = NodeHelper.toBoolean(lastVal);
    if (!boolVal) {
      stateMgr.operationStack.jumpTo(jumpToIdx);
    }
  }
}