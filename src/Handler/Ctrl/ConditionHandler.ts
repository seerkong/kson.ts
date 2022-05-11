import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";

export class ConditionHandler {
  public static expandCondition(stateMgr: StateMgr, nodeToRun: any) {
    let iter = nodeToRun.next;
    let exprAndBlockPairs = [];
    let fallbackBlock = null;
    while (iter != null) {
      let pair = iter.core;
      if (NodeHelper.isWordStr(pair.core, "else")) {
        fallbackBlock = pair.next;
      }
      else {
        exprAndBlockPairs.push({
          expr: pair.core,  // condition expr
          block: pair.next,  // condition true block
        });
      }
      iter = iter.next;
    }
    
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.Ctrl_ConditionPair, {
      exprAndBlockPairs: exprAndBlockPairs,
      pairIdx: 0,
      fallbackBlock: fallbackBlock
    });

    stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);

    stateMgr.opBatchCommit();
  }

  public static runConditionPair(stateMgr: StateMgr, opContState : OperationContState) {
    let lastContMemo = opContState.memo;
    let exprAndBlockPairs : any[] = lastContMemo.exprAndBlockPairs;
    let pairIdx = lastContMemo.pairIdx;
    let fallbackBlock = lastContMemo.fallbackBlock;
    let condition = exprAndBlockPairs[pairIdx].expr;
    let ifTrueClause = exprAndBlockPairs[pairIdx].block;

    let curOpStackTopIdx = stateMgr.operationStack.getCurTopIdx();

    stateMgr.opBatchStart();
    // eval condition
    stateMgr.addOp(OpCode.Node_RunNode, condition);
    // 如果条件判断失败，调到下个条件判断，或者是else分支
    stateMgr.addOp(OpCode.Ctrl_JumpIfFalse, curOpStackTopIdx + 1);
    // 如果条件判断成功，运行对应的判断成功的分支后，跳转到curOpStackTopIdx,即ValStack_PopFrameAndPushTopVal
    stateMgr.addOp(OpCode.Node_RunBlock, ifTrueClause);
    stateMgr.addOp(OpCode.Ctrl_Jump, curOpStackTopIdx);
    // 上面两个指令，也可以实现为
    // stateMgr.addOp(OpCode.OpStack_RemoveNextNext);
    // stateMgr.addOp(OpCode.Node_RunBlock, ifTrueClause);


    // 如果条件判断失败，会执行下面的指令
    if (pairIdx < (exprAndBlockPairs.length - 1)) {
      lastContMemo.pairIdx = pairIdx + 1;
      stateMgr.addOp(OpCode.Ctrl_ConditionPair, lastContMemo);
    }
    else {
      stateMgr.addOp(OpCode.Node_RunBlock, fallbackBlock);
    }
    stateMgr.opBatchCommit();    
  }
}