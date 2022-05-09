export class ArrayExt {
  public static addAll<T>(lhs: T[], rhs: Set<T>) {
    for (let v of rhs) {
      lhs.push(v);
    }
  }

  public static fromSet<T>(set: Set<T>) {
    let r : T[] = [];
    for (let v of set) {
      r.push(v);
    }
    return r;
  }
}