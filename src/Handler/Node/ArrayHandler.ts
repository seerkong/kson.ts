import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHandler } from "./NodeHandler";

export class ArrayHandler {
  public static expandOpenArray(stateMgr: StateMgr, nodeToRun: any) {
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    for (let item of nodeToRun) {
      stateMgr.addOp(OpCode.Node_RunNode, item);
    }

    stateMgr.addOp(OpCode.Node_MakeArray);

    stateMgr.opBatchCommit();
  }

  public static runMakeArray(stateMgr: StateMgr, opContState : OperationContState) {
    let evaledNodes = stateMgr.valueStack.popFrameAllValues();
    stateMgr.addOpDirectly(OpCode.ValStack_PushValue, evaledNodes);
  }
}