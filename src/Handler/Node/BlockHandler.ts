import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";

export class BlockHandler {
  public static expandBlock(stateMgr: StateMgr, nodeToRun: any) {
    stateMgr.opBatchStart();
    
    let sentences = [];
    let iter = nodeToRun;
    while (iter != null) {
      sentences.push(iter.core);
      iter = iter.next;
    }

    if (sentences.length > 0) {
      stateMgr.addOp(OpCode.ValStack_PushFrame);
      for (let i = 0; i < sentences.length - 1; i++) {
        stateMgr.addOp(OpCode.Node_RunNode, sentences[i]);
        stateMgr.addOp(OpCode.ValStack_PopValue)
      }
      // 使用最后一个语句的值作为block的结果
      stateMgr.addOp(OpCode.Node_RunNode, sentences[sentences.length - 1]);
      stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);
    }
    else {
      stateMgr.addOp(OpCode.Node_RunNode, null);
    }

    stateMgr.opBatchCommit();
  }

  public static runBlock(stateMgr: StateMgr, opContState : OperationContState) {
    let nodeToRun = opContState.memo;
    BlockHandler.expandBlock(stateMgr, nodeToRun);
  }
}