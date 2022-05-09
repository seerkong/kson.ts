import { StackMachine } from "../Algo/StackMachine";
import { OpCode } from "../OpCode";
export class OperationContState {
    public opCode : OpCode;
    public envId : number;
    public memo : any;

    constructor(opCode : OpCode, envId : number, memo = null) {
        this.opCode = opCode;
        this.envId = envId;
        this.memo = memo;
    }
}

export class OperationStack extends StackMachine<OperationContState> {
    constructor() {
        super(true);
    }
}