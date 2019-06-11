# 第一章 块级绑定

1. const 只是阻止对变量绑定的修改，不会阻止对成员值的修改。
``` js
const person = {
  name: 'KuangPF'
}

// 正常工作
person.name = 'Grey'

// 抛出错误
person = {
  name: 'Grey'
}
```

2. 暂时性死区
先看段代码：
``` js
if (condition) {
  console.log(typeof(value)) // 引用错误
  let value = 'bule'
}
```

``` js
console.log(typeof(value)) // "undefined"
if (condition) {
  let value = 'bule'
}
```
上述代码之所以发生错误，是因为当 js 引擎检视接下来的代码块并发现有变量声明时，它会在面对 var 的情况下将声明提升到函数或者全局作用域的顶部，也就是常说的变量提升，而针对于 let 或者 const 的情况，则会将变量放在暂时性死区内，任何访问在暂时性死区内的变量都会导致运行时错误，只有当执行到变量声明语句时，该变量才会从暂时性死区移除，并安全使用。

3. 全局块级绑定
在全局作用域使用 `let` 或者 `const` 声明一个变量，该变量是不会成为 `window` 对象的一个属性，但如果使用 `var` 声明，则会将变量会成为 `window`对象的一个属性。
``` js
var RegExp = 'Hello'
console.log(window.RegExp) // Hello

var ncz = 'Hi'
console.log(window.ncz) // Hi
```

```js
let RegExp = 'Hello'
console.log(RegExp in window) // false

const ncz = 'Hi'
console.log(ncz in window) // false
```