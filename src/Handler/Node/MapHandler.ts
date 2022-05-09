import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";

export class MapHandler {
  public static expandOpenMap(stateMgr: StateMgr, nodeToRun: any) {
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    for (let key in nodeToRun) {
      stateMgr.addOp(OpCode.Node_RunNode, key);
      stateMgr.addOp(OpCode.Node_RunNode, nodeToRun[key]);
    }

    stateMgr.addOp(OpCode.Node_MakeMap);

    stateMgr.opBatchCommit();
  }

  public static runMakeMap(stateMgr: StateMgr, opContState : OperationContState) {
    let evaledNodes = stateMgr.valueStack.popFrameAllValues();
    let result = {};
    for (let i = 0; i < evaledNodes.length; i = i + 2) {
      let key = evaledNodes[i];
      let val = evaledNodes[i + 1];
      result[key] = val;
    }
    stateMgr.addOpDirectly(OpCode.ValStack_PushValue, result);
  }
}