import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";

export class DeclareVarHandler {
  public static expandDeclareVar(stateMgr: StateMgr, nodeToRun: any) {
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    let varName = nodeToRun.next.core;
    let varExpr = null;
    if (nodeToRun.next.next != null) {
      varExpr = nodeToRun.next.next.core;
    }
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.Node_RunNode, varExpr);
    stateMgr.addOp(OpCode.Ctrl_RunDeclareVar, varName);

    stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);

    stateMgr.opBatchCommit();
  }

  public static runDeclareVar(stateMgr: StateMgr, opContState : OperationContState) {
    let varName = opContState.memo;
    let varValue = stateMgr.valueStack.peekTop();
    let curEnv = stateMgr.getCurEnv();
    curEnv.define(varName, varValue);
  }
}