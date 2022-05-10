import { HostFunction } from './../../Model/HostFunction';
import { OpCode } from "../../OpCode";
import { Env } from "../../StateManagement/Env";
import { OperationContState } from "../../StateManagement/OperationStack";
import { StateMgr } from "../../StateMgr";
import { NodeHelper } from "../../Util/NodeHelper";
import { KsonType } from "../../Model/KsonType"
import { LambdaFunction } from "../../Model/LambdaFunction";

// define func name: (func name [arg1, arg2, ...] funcbody)
// anonymous: (func [arg1, arg2, ...] funcbody)
export class FuncHandler {
  public static expandDeclareFunc(stateMgr: StateMgr, nodeToRun: any) {
    let funcName = null;
    let paramWordArr = [];
    let funcBody = null;

    if (NodeHelper.getType(nodeToRun.next.core) == KsonType.Word) {
      funcName = NodeHelper.getWordInner(nodeToRun.next.core);
      paramWordArr = nodeToRun.next.next.core;
      funcBody = nodeToRun.next.next.next;
    } else {
      paramWordArr = nodeToRun.next.core;
      funcBody = nodeToRun.next.next;
    }
    let paramWordStrArr = []
    for (let paramWord of paramWordArr) {
      paramWordStrArr.push(NodeHelper.getWordInner(paramWord))
    }
    let curEnv = stateMgr.getCurEnv();
    let func = new LambdaFunction(paramWordStrArr, funcBody, curEnv, funcName);
    stateMgr.addOp(OpCode.ValStack_PushValue, func);
    if (funcName) {
      curEnv.define(funcName, func);
    }
    
  }

  // 对函数名和函数参数求值
  public static expandEvalFuncArgs(stateMgr: StateMgr, nodeToRun: any) {
    let funcName = nodeToRun.core;
    let args = [];
    let iter = nodeToRun.next;
    while (iter != null) {
      args.push(iter.core);
      iter = iter.next;
    }
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.ValStack_PushFrame);
    stateMgr.addOp(OpCode.Node_RunNode, args);
    stateMgr.addOp(OpCode.Node_RunNode, funcName);
    stateMgr.addOp(OpCode.Ctrl_ApplyToFunc);
    stateMgr.opBatchCommit(); 
  }

  // stack frame layout: [[arg1 arg2 arg3] func]
  public static runApplyToFunc(stateMgr: StateMgr, opContState : OperationContState) {
    let evaledNodes = stateMgr.valueStack.popFrameAllValues();
    let func = evaledNodes.pop();
    let args = evaledNodes.pop();
    let funcType = NodeHelper.getType(func);
    if (funcType === 'HostFunc') {
      let hostFunc = func as HostFunction;
      let applyResult = hostFunc.func.apply(null, [args]);
      stateMgr.valueStack.pushValue(applyResult);
      return;
    }
    let lambdaFunc = func as LambdaFunction;
    let paramTable = lambdaFunc.paramTable;
    let childEnv = stateMgr.envStore.diveToNewChildEnv();
    for (let i  = 0; i < paramTable.length; i++) {
      childEnv.define(paramTable[i], args[i]);
    }
    stateMgr.opBatchStart();
    stateMgr.addOp(OpCode.Node_RunBlock, lambdaFunc.funcBody);
    stateMgr.addOp(OpCode.EnvStack_Rise);
    stateMgr.opBatchCommit(); 
  }
}