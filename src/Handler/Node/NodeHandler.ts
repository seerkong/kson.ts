import { FuncHandler } from './../Ctrl/FuncHandler';
import { MapHandler } from './MapHandler';
import { ArrayHandler } from '../../Handler/Node/ArrayHandler';
import { NodeHelper } from '../../Util/NodeHelper';
import { StateMgr } from "../../StateMgr";
import { OpCode } from '../../OpCode';
import { KsonType } from '../../Model/KsonType';
import { OperationContState } from '../../StateManagement/OperationStack';
import { KeywordOpExpanders } from '../../KeywordOpExpanders';

export class NodeHandler {
    public static expandNode(stateMgr: StateMgr, nodeToRun: any, lookupWord : boolean = true) {
      let nodeType = NodeHelper.getType(nodeToRun);
      if (NodeHelper.isEvaluated(nodeToRun)) {
        stateMgr.addOpDirectly(OpCode.ValStack_PushValue, nodeToRun);
      }
      else if (nodeType === KsonType.Word) {
        if (lookupWord) {
          let wordStr = NodeHelper.getWordStr(nodeToRun);
          let valInEnv = stateMgr.envStore.lookup(wordStr);
          stateMgr.addOpDirectly(OpCode.ValStack_PushValue, valInEnv);
        }
        else {
          stateMgr.addOpDirectly(OpCode.ValStack_PushValue, nodeToRun);
        }
      }
      else if (nodeType === KsonType.Array) {
        ArrayHandler.expandOpenArray(stateMgr, nodeToRun);
      }
      else if (nodeType === KsonType.Map) {
        MapHandler.expandOpenMap(stateMgr, nodeToRun);
      }
      else if (nodeType === KsonType.List) {
        let firstVal = nodeToRun.core;
        let firstValType = NodeHelper.getType(firstVal);
        if (firstValType === KsonType.Word
            && KeywordOpExpanders.isKeyWord(NodeHelper.getWordInner(firstVal))) {
          let keywordStr = NodeHelper.getWordInner(firstVal);
          KeywordOpExpanders.getExpander(keywordStr).apply(null, [stateMgr, nodeToRun]);
        } else {
          FuncHandler.expandEvalFuncArgs(stateMgr, nodeToRun);
        }
      }
    }

    public static runNode(stateMgr: StateMgr, opContState : OperationContState) {
      let nodeToRun = opContState.memo;
      stateMgr.opBatchStart();
      NodeHandler.expandNode(stateMgr, nodeToRun);
      stateMgr.opBatchCommit();
    }

    public static runLastVal(stateMgr: StateMgr, opContState : OperationContState) {
      let nodeToRun = stateMgr.valueStack.popValue();
      stateMgr.opBatchStart();
      NodeHandler.expandNode(stateMgr, nodeToRun);
      stateMgr.opBatchCommit();
    }
}