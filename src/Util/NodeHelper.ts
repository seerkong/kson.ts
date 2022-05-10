import { KsonType } from "../Model/KsonType"

export class NodeHelper {
  public static getType(node : any) : string {
    if (Array.isArray(node)) {
      return KsonType.Array;
    }
    else if (typeof node == 'number' || typeof node == 'bigint') {
      return KsonType.Number;
    }
    else if (typeof node == 'string') {
      return KsonType.String;
    }
    else if (typeof node == 'boolean') {
      return KsonType.Boolean;
    }
    else if (node == null) {
      return KsonType.Null;
    }
    else {
      let innerType = node.__type;
      if (innerType === 'Word') {
        return KsonType.Word;
      }
      else if (innerType === 'List') {
        return KsonType.List;
      }
      else if (innerType === 'LambdaFunc') {
        return KsonType.LambdaFunc;
      }
      else if (innerType === 'HostFunc') {
        return KsonType.HostFunc;
      }
      else {
        return KsonType.Map;
      }
    }
  }

  public static isEvaluated(node : any) {
    let type = NodeHelper.getType(node);
    return (type === KsonType.Number
      || type === KsonType.Boolean
      || type === KsonType.String
      || type === KsonType.Null
      || type === KsonType.LambdaFunc
      || type === KsonType.HostFunc
    )
  }

  public static getWordStr(node : any) {
    return node.value;
  }

  public static toBoolean(node : any) : boolean {
    let type = NodeHelper.getType(node);
    if (type === KsonType.Null || node == false) {
      return false;
    } else {
      return true;
    }
  }

  public static getWordInner(node : any) : string {
    let type = NodeHelper.getType(node);
    if (type === KsonType.Word) {
      return node.value;
    }
    else {
      return null;
    }
  }

  public static isWordStr(node : any, wordStr : string) {
    let wordInner = NodeHelper.getWordInner(node);
    return (wordInner === wordStr);
  }
}