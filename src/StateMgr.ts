import { OpCode } from "./OpCode";
import { Env } from "./StateManagement/Env";
import { EnvStore } from "./StateManagement/EnvStore";
import { OperationContState, OperationStack } from "./StateManagement/OperationStack";
import { ValueStack } from "./StateManagement/ValueStack"; 


export class StateMgr {
    public envStore = new EnvStore();
    public operationStack = new OperationStack();
    public valueStack = new ValueStack();

    constructor() {
    }

    public getRootEnv() {
        return this.envStore.getRootEnv();
    }

    public getCurEnvIdx() {
        return this.envStore.currentEnvId;
    }

    public getCurEnv() : Env {
        return this.envStore.getCurEnv();
    }

    private opBatchStack : OperationContState[][] = [];

    public opBatchStart() {
        this.opBatchStack.push([]);
    }

    public addOp(opCode : OpCode, memo: any = null) {
        let top = this.opBatchStack[this.opBatchStack.length - 1];
        top.push(new OperationContState(opCode, this.getCurEnvIdx(), memo));
    }

    public opBatchCommit() {
        let opList = this.opBatchStack.pop();
        if (this.opBatchStack.length > 0 && opList.length > 0) {
            let top = this.opBatchStack[this.opBatchStack.length - 1];
            for (let i = 0; i < opList.length; i++) {
                top.push(opList[i]);
            }
        }
        else {
            this.operationStack.pushItems(opList);
        }
    }

    public addOpDirectly(opCode : OpCode, memo: any = null) {
        this.operationStack.pushValue(new OperationContState(opCode, this.getCurEnvIdx(), memo));
    }
}