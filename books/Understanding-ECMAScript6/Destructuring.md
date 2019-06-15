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
> 这里需要使用圆括号包裹解构赋值语句，因为暴露的花括号会被解析成代码块语句。

2. 结构默认值
当使用解构赋值语句时，如果指定的变量在对象中没有找到同名属性，那么该对象则为 `undefined`

``` js
let node = {
  type: 'Identifier',
  name: 'foo'
}

let { type, name, value } = node
console.log(type) // 'Identifier'
console.log(name) // 'foo'
console.log(value) // undefined
```

3. 赋值给不同的变量名

```js
let node = {
        type: "Identifier",
        name: "foo"
    };

let { type: localType, name: localName} = node;

console.log(localType);     // "Identifier"
console.log(localName);     // "foo"
```

4. 互换两个变量的值

``` js
let a = 1,
    b = 2;
[a, b] = [b, a]
console.log(a) // 2
console.log(b) // 1
```

5. 参数解构

```js
function setCookie(name, value, {secure, path, domain, expires} = {}) {
  // setCookie
}

setCookie('type', 'js', {
  secure: true,
  expires: 6000
})
```