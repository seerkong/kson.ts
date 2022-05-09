import { Env } from "./Env";
import { EnvTree } from "./EnvTree";

export class EnvStore {
    private envTree_: EnvTree = new EnvTree();
    private currentEnvId_ = 0;

    constructor() {
        let r = this.makeRootEnv();
        this.currentEnvId_ = r.id;
    }

    public get currentEnvId() {
        return this.currentEnvId_;
    }

    public set currentEnvId(envId: number) {
        if (this.envTree_.getVertexDetail(envId) == null) {
            throw new Error("");
        }
        if (this.currentEnvId_ !== envId) {
            this.onChangeEnv(this.currentEnvId_, envId)
        }
        this.currentEnvId_ = envId;
    }

    private onChangeEnv(fromEnvId, toEnvId) {
        // TODO
    }

    private makeRootEnv() : Env {
        let r : Env  = new Env();
        this.envTree_.addVertex(r);
        this.envTree_.setEntryVertexId(r.id);
        
        return r;
    }

    public makeCurChildEnv() {
        let r : Env  = new Env();
        this.envTree_.addVertex(r);
        this.envTree_.addEdge(this.currentEnvId_, r.id)
        return r;
    }

    public diveToNewChildEnv() {
        let r : Env  = this.makeCurChildEnv();
        this.currentEnvId = r.id;
        return r;
    }

    public riseToCurParentEnv() {
        let parentEnv = this.envTree_.getParentEnv(this.currentEnvId_);
        this.currentEnvId = parentEnv.id;
    }

    public changeEnvById(envId : number) {
        this.currentEnvId = envId;
    }

    public getByEnvId(envId : number) {
        return this.envTree_.getVertexDetail(envId);
    }

    public getCurEnv() : Env {
        return this.getByEnvId(this.currentEnvId_);
    }

    public getRootEnv() {
        return this.getByEnvId(this.envTree_.getEntryVertexId());
    }


    
    public lookup(key : string) {
        let declareEnv : Env = this.lookupDeclareEnv(key);
        if (declareEnv == null) {
            return null;
        } else {
            return declareEnv.variables.get(key);
        }
    }

    public lookupDeclareEnv(key : string) : Env {
        let envCursor : Env = this.getByEnvId(this.currentEnvId_);

        while (envCursor != null) {
            if (envCursor.variables.has(key)) {
                return envCursor;
            }
            envCursor = this.envTree_.getParentEnv(envCursor.id);
        }
        return null;
    }

}