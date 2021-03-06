import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";

// (if expr (do truebranch))
// eg: (if (gt 5 4) (do 5))
// (if expr (do truebranch) (else_do elsebranch))
export class IfElseHandler {
  public static expandIfElse(stateMgr: StateMgr, nodeToRun: any) {
    
    let exprAndBlockPairs = [];
    let conditionExpr = nodeToRun.next.core;
    let ifTrueBranch = nodeToRun.next.next.core;
    let ifFalseBranch = null;
    if (nodeToRun.next.next.next != null) {
      ifFalseBranch = nodeToRun.next.next.next.core;
    }
    exprAndBlockPairs.push({
      expr: conditionExpr,  // condition expr
      block: ifTrueBranch,  // condition true block
    });
    
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.Ctrl_ConditionPair, {
      exprAndBlockPairs: exprAndBlockPairs,
      pairIdx: 0,
      fallbackBlock: ifFalseBranch
    });

    stateMgr.addOp(OpCode.ValStack_PopFrameAndPushTopVal);

    stateMgr.opBatchCommit();
  }
}