import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";

export class SetEnvHandler {
  public static expandSetEnv(stateMgr: StateMgr, nodeToRun: any) {
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    let varName = nodeToRun.next.core;
    let varExpr = nodeToRun.next.next.core;
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.Node_RunNode, varExpr);
    stateMgr.addOp(OpCode.Ctrl_RunSetEnv, varName);

    stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);

    stateMgr.opBatchCommit();
  }

  public static runSetEnv(stateMgr: StateMgr, opContState: OperationContState) {
    let varName = opContState.memo;
    let varValue = stateMgr.valueStack.peekTop();
    let declareEnv = stateMgr.envStore.lookupDeclareEnv(varName);
    if (declareEnv) {
      declareEnv.define(varName, varValue);
    } else {
      let curEnv = stateMgr.getCurEnv();
      curEnv.define(varName, varValue);
    }
  }
}