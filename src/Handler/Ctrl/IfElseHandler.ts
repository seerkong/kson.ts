import { OpCode } from "../../OpCode";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";

// (if expr truebranch elsebranch)
export class IfElseHandler {
  public static expandIfElse(stateMgr: StateMgr, nodeToRun: any) {
    
    let exprAndBlockPairs = [];
    let conditionExpr = nodeToRun.next.core;
    let ifTrueBranch = nodeToRun.next.next.core;
    let ifFalseBranch = nodeToRun.next.next.next.core;
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