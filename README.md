安装依赖包
```
npm install
```

开发调试时，使用ts-node运行mocha，所以也需要安装ts-node:
```
npm install -g ts-node
```

运行全部测试case
```
npm run test
```

运行单个测试case:
修改 .vscode/launch.json中的args中-g后面的参数
比如要运行case名：AddWith4Args
```
"args": [
    "test/Interpreter.test.ts",
    "-g",
    "'AddWith4Args'",
    "--no-timeouts"
],

```

解释器
src/Interpreter.ts

指令定义
src/OpCode.ts

对map, array等节点求值
src/Handler/Node

语言的关键字实现配置
src/KeywordOpExpanders

解释器思路：
待执行一个节点时，通过expandXXX方法，将动作展开分解为多个指令
通过while循环依次执行这些指令
遇到复杂指令时，再次通过expandXXX方法 ，将动作展开分解为多个指令
一致循环到结束指令 OpStack_Land
