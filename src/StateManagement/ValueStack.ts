import { StackMachine } from "../Algo/StackMachine";

export class ValueStack extends StackMachine<any> {
    constructor() {
        super(true);
    }
}