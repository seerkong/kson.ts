import { SingleEntryGraphNode } from "../Algo/SingleEntryGraphNode";

export class Env implements SingleEntryGraphNode<number> {
    private static nextEnvId = 1;
    public id : number;
    public variables : Map<string, any> = new Map();

    constructor() {
        this.id = Env.nextEnvId;
        Env.nextEnvId += 1;
    }

    public define(key : string, value : any) {
        this.variables.set(key, value);
    }
    
    public getVertexId(): number {
        return this.id;
    }    
}