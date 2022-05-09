export class SetExt {
  public static createBySet<T>(values: Set<T>) : Set<T> {
    let r = new Set<T>();
    for (let v of values) {
      r.add(v);
    }
    return r;
  }

  public static addAll<T>(lhs : Set<T>, rhs : Set<T>) {
    for (let v of rhs) {
      lhs.add(v);
    }
  }

  public static removeAll<T>(lhs : Set<T>, rhs : Set<T>) {
    for (let v of rhs) {
      lhs.delete(v);
    }
  }
}