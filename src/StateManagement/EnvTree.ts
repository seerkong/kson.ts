import { Env } from "../StateManagement/Env";
import { SingleEntryGraphNode } from "../Algo/SingleEntryGraphNode";
import { SingleEntryGraph } from "../Algo/SingleEntryGraph";
import { ArrayExt } from "../Util/ArrayExt";

export class EnvTree extends SingleEntryGraph<Env, number> {
  // env是个数，所以prev节点只有一个
  public getParentEnv(envId : number) : Env {
    let prevIdSet : Set<number> = this.getPrevVertexIds(envId);
    let prevIdArr : number[] = ArrayExt.fromSet(prevIdSet);
    if (prevIdArr.length > 0) {
      return this.getVertexDetail(prevIdArr[0]);
    }
    else {
      return null;
    }
  }
}