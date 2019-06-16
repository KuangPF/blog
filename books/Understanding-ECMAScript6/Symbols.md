# 第 六 章  符号与符号属性

1. js 基本数据类型
* `string`
* `number`
* `boolean`
* `null`
* `undefined`
* `Symbol`

> js 原始数据类型除了上面提到的 6 种基本数据类型外，还有一种引用数据类型： `object`

2. 创建一个符号值

``` js
let firstName = Symbol()
let person = {}

person[firstName] = 'Nicholas'
console.log(person[firstName])
```

3. 检索符号属性

The `Object.keys()` 和 `Object.getOwnPropertyNames()` 都不可以检索出符号属性，因为要保持它们在 ES5 的功能中不发生变化。在 ES6 中新增了了 `Object.getOwnPropertySymbols()` 来检索符号属性。

``` js
let uid = Symbol('uid')
let object = {
  [uid]: '12345'
}

let symbols = Object.getOwnPropertySymbols(object)
console.log(symbols.length) // 1
console.log(symbols[0]) // Symbol(uid)
console.log(object[uid]) // '12345'
```