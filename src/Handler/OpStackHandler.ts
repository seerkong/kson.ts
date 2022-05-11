import { NodeHelper } from "../Util/NodeHelper";
import { OperationContState } from "../StateManagement/OperationStack";
import { StateMgr } from "../StateMgr";

export class OpStackHandler {
  public static runPop(stateMgr: StateMgr, opContState : OperationContState) {
    stateMgr.operationStack.popValue();
  }

  public static runRemoveNextNext(stateMgr: StateMgr, opContState : OperationContState) {
    let top = stateMgr.operationStack.popValue();
    stateMgr.operationStack.popValue();
    stateMgr.operationStack.pushValue(top);
  }

  public static runSwapLeft2Left3(stateMgr: StateMgr, opContState : OperationContState) {
    // 此时 SwapLeft2Left3 指令已经被pop，curOpStackTopIdx 是SwapLeft2Left3的下一个
    let curOpStackTopIdx = stateMgr.operationStack.getCurTopIdx();
    stateMgr.operationStack.swapByIndex(curOpStackTopIdx - 1, curOpStackTopIdx - 2);
  }

  public static runJump(stateMgr: StateMgr, opContState : OperationContState) {
    let jumpToIdx = opContState.memo;
    stateMgr.operationStack.jumpTo(jumpToIdx);
  }

  public static runJumpIfFalse(stateMgr: StateMgr, opContState : OperationContState) {
    let jumpToIdx = opContState.memo;
    let lastVal = stateMgr.valueStack.popValue();
    let boolVal = NodeHelper.toBoolean(lastVal);
    if (!boolVal) {
      stateMgr.operationStack.jumpTo(jumpToIdx);
    }
  }
}