export class MapExt {
  public static copySetValue<T>(map : Map<T, Set<T>>, key : T) : Set<T> {
    let r = new Set<T>();
    if (map.has(key)) {
      let valueOfKey : Set<T> = map.get(key);
      for (let id of valueOfKey) {
        r.add(id);
      }
    }
    return r;
  }

  public static newValuesSet<K, V>(map : Map<K, V>) {
    let r = new Set<V>();
    for (let v of map.values()) {
      r.add(v);
    }
    return r;
  }

  public static getOrDefault<K, V>(map : Map<K, V>, key : K, defaultValue: V) {
    if (map.has(key)) {
      return map.get(key);
    }
    return defaultValue;
  }

  public static computeIfAbsent<K, V>(map : Map<K, V>, key : K, defaultProvider : (k: K) => V) {
    if (map.has(key)) {
      return map.get(key);
    }
    let v = defaultProvider(key);
    map.set(key, v);
    return v;
  }
}