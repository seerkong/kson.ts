import { FuncHandler } from './Handler/Ctrl/FuncHandler';
import { ConditionHandler } from './Handler/Ctrl/ConditionHandler';
import { SetEnvHandler } from './Handler/Ctrl/SetEnvHandler';
import { DeclareVarHandler } from './Handler/Ctrl/DeclareVarHandler';
import { MapHandler } from './Handler/Node/MapHandler';
import { EnvTreeHandler } from './Handler/EnvTreeHandler';
import { OpCode } from "./OpCode";
import { Env } from "./StateManagement/Env";
import { StateMgr } from "./StateMgr";
import { NodeHandler } from "./Handler/Node/NodeHandler";
import { OperationContState } from "./StateManagement/OperationStack";
import { OpStackHandler } from "./Handler/OpStackHandler";
import { ValueStackHandler } from "./Handler/ValueStackHandler";
import { BlockHandler } from './Handler/Node/BlockHandler';
import { ArrayHandler } from './Handler/Node/ArrayHandler';
import { JumpIfFalseHandler } from './Handler/Ctrl/JumpIfFalse';
import { ForeachHandler } from './Handler/Ctrl/ForeachHandler';
import { HostFunctions } from './HostSupport/HostFunctions';


export class Interpreter {
    public exec(nodeToRun: any) : any {
        let stateMgr: StateMgr = new StateMgr();
        let rootEnv = stateMgr.getRootEnv();
        HostFunctions.import(rootEnv);
        stateMgr.envStore.diveToNewChildEnv();
        return this.execNode(stateMgr, nodeToRun);
    }

    public execNode(stateMgr: StateMgr, nodeToRun: any) : any {
        stateMgr.addOpDirectly(OpCode.OpStack_Land);
        stateMgr.addOpDirectly(OpCode.Node_RunNode, nodeToRun);

        let opContState : OperationContState = stateMgr.operationStack.popValue();
        
        while (opContState.opCode != OpCode.OpStack_Land) {
            this.dispatchOp(stateMgr, opContState);
            opContState = stateMgr.operationStack.popValue();
        }
        let r = stateMgr.valueStack.peekBottomOfAllFrames();
        return r;
    }

    private dispatchOp(stateMgr: StateMgr, opContState : OperationContState) {
        switch (opContState.opCode) {
            case OpCode.OpStack_Pop:
                OpStackHandler.runPop(stateMgr, opContState);
                break;
            case OpCode.OpStack_RemoveNextNext:
                OpStackHandler.runRemoveNextNext(stateMgr, opContState);
                break;
            case OpCode.ValStack_PushFrame:
                ValueStackHandler.runPushFrame(stateMgr, opContState);
                break;
            case OpCode.ValStack_PushValue:
                ValueStackHandler.runPushValue(stateMgr, opContState);
                break;
            case OpCode.ValStack_PopValue:
                ValueStackHandler.runPopValue(stateMgr, opContState);
                break;
            case OpCode.ValStack_PopFrameAndPushTopVal:
                ValueStackHandler.runPopFrameAndPushTopVal(stateMgr, opContState);
                break;
            case OpCode.ValStack_PopFrameIgnoreResult:
                ValueStackHandler.runPopFrameIgnoreResult(stateMgr, opContState);
                break;
            case OpCode.EnvStack_Dive:
                EnvTreeHandler.runDive(stateMgr, opContState);
                break;
            case OpCode.EnvStack_Rise:
                EnvTreeHandler.runRise(stateMgr, opContState);
                break;
            case OpCode.EnvStack_BindEnvByMap:
                EnvTreeHandler.runBindEnvByMap(stateMgr, opContState);
                break;
            case OpCode.Node_RunNode:
                NodeHandler.runNode(stateMgr, opContState);
                break;
            case OpCode.Node_RunLastVal:
                NodeHandler.runLastVal(stateMgr, opContState);
                break;
            case OpCode.Node_RunBlock:
                BlockHandler.runBlock(stateMgr, opContState);
                break;
            case OpCode.Node_MakeArray:
                ArrayHandler.runMakeArray(stateMgr, opContState);
                break;
            case OpCode.Node_MakeMap:
                MapHandler.runMakeMap(stateMgr, opContState);
                break;
            case OpCode.Ctrl_ApplyToFunc:
                FuncHandler.runApplyToFunc(stateMgr, opContState);
                break;
            case OpCode.Ctrl_RunDeclareVar:
                DeclareVarHandler.runDeclareVar(stateMgr, opContState);
                break;
            case OpCode.Ctrl_RunSetEnv:
                SetEnvHandler.runSetEnv(stateMgr, opContState);
                break;
            case OpCode.Ctrl_JumpIfFalse:
                JumpIfFalseHandler.runJumpIfFalse(stateMgr, opContState);
                break;
            case OpCode.Ctrl_ConditionPair:
                ConditionHandler.runConditionPair(stateMgr, opContState);
                break;
            case OpCode.Ctrl_ForEachLoop:
                ForeachHandler.runForeachLoop(stateMgr, opContState);
                break;
            default:
                break;
        }
    }
}

