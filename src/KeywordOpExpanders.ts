import { BlockHandler } from './Handler/Node/BlockHandler';
import { FuncHandler } from './Handler/Ctrl/FuncHandler';
import { StateMgr } from "./StateMgr";
import { ConditionHandler } from './Handler/Ctrl/ConditionHandler';
import { DeclareVarHandler } from './Handler/Ctrl/DeclareVarHandler';
import { SetEnvHandler } from './Handler/Ctrl/SetEnvHandler';
import { IfElseHandler } from './Handler/Ctrl/IfElseHandler';
import { ForeachHandler } from './Handler/Ctrl/ForeachHandler';

export class KeywordOpExpanders {
  private static expanderMap: { [key: string]: (stateMgr: StateMgr, nodeToRun: any) => any } = {
    'begin': function(stateMgr: StateMgr, nodeToRun: any) : any {
      BlockHandler.expandBlock(stateMgr, nodeToRun.next)
    },
    'do': function(stateMgr: StateMgr, nodeToRun: any) : any {
      BlockHandler.expandBlock(stateMgr, nodeToRun.next)
    },
    'else_do': function(stateMgr: StateMgr, nodeToRun: any) : any {
      BlockHandler.expandBlock(stateMgr, nodeToRun.next)
    },
    'func': FuncHandler.expandDeclareFunc,
    'cond': ConditionHandler.expandCondition,
    'if': IfElseHandler.expandIfElse,
    'var': DeclareVarHandler.expandDeclareVar,
    'setenv': SetEnvHandler.expandSetEnv,
    'foreach': ForeachHandler.expandForeach,
    
  }

  public static isKeyWord(name : string) {
    return KeywordOpExpanders.expanderMap[name] != null
  }

  public static getExpander(name: string) {
    return KeywordOpExpanders.expanderMap[name];
  }
}