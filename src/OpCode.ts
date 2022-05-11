export enum OpCode {
    OpStack_Land,
    OpStack_Pop,
    OpStack_RemoveNextNext,
    OpStack_RemoveNextNextNext,

    ValStack_PushFrame,
    ValStack_PushValue,
    ValStack_PopValue,
    ValStack_PopFrameAndPushTopVal,
    ValStack_PopFrameIgnoreResult,


    EnvStack_Dive,
    EnvStack_Rise,
    EnvStack_ChangeEnvById,
    EnvStack_BindEnvByMap,

    Node_RunNode,
    Node_RunLastVal,
    

    Node_RunBlock,

    Node_MakeArray,
    Node_MakeMap,

    Ctrl_ApplyToFunc,
    
    Ctrl_RunDeclareVar,
    Ctrl_RunSetEnv,
    Ctrl_Jump,
    Ctrl_JumpIfFalse,
    Ctrl_ConditionPair,
    Ctrl_ForEachLoop,
}