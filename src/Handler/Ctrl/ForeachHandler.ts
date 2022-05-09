import { OpCode } from "../../OpCode";
import { Env } from "../../StateManagement/Env";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";
// (foreach x in items (writeline x))
export class ForeachHandler {
  public static expandForeach(stateMgr: StateMgr, nodeToRun: any) {
    let itemVarName = NodeHelper.getWordInner(nodeToRun.next.core);
    let collectionVarWord = nodeToRun.next.next.next.core;
    let loopBody = nodeToRun.next.next.next.next;

    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.EnvStack_Dive);
    stateMgr.addOp(OpCode.Node_RunNode, collectionVarWord);
    stateMgr.addOp(OpCode.Ctrl_ForEachLoop, {
      index: 0,
      loopBody: loopBody,
      itemVarName: itemVarName
    });
    stateMgr.addOp(OpCode.EnvStack_Rise);
    stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);

    stateMgr.opBatchCommit();
  }

  public static runForeachLoop(stateMgr: StateMgr, opContState : OperationContState) {
    let lastMemo = opContState.memo;
    let index = lastMemo.index;
    let loopBody = lastMemo.loopBody;
    let itemVarName = lastMemo.itemVarName;
    let collection: any[] = stateMgr.valueStack.peekTop();

    stateMgr.opBatchStart();
    if (index <= (collection.length - 1)) {
      let currentEnv : Env = stateMgr.getCurEnv();
      currentEnv.define(itemVarName, collection[index]);
      stateMgr.addOp(OpCode.Node_RunBlock, loopBody);
      stateMgr.addOp(OpCode.ValStack_PopValue);
      stateMgr.addOp(OpCode.Ctrl_ForEachLoop, {
        index: index + 1,
        loopBody: loopBody,
        itemVarName: itemVarName
      });
    }
    stateMgr.opBatchCommit();
  }
}