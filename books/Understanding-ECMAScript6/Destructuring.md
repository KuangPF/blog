# 第 5 章 解构

1. 利用解构进行赋值
``` js
let node = {
    type: 'Identifier',
    name: 'foo'
  },
  type = 'Literal',
  name = 5;

({ type, name } = node)
console.log(type, name)
```