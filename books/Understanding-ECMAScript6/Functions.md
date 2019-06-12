# 第三章 函数
1. 函数传参默认值

``` js
function  makeRequest(url, timeout = 3000, callback = function() {}) {
  
}

// 使用默认的 timeout 和 callback
makeRequest('/foo')

// 使用默认的 timeout 和 callback
makeRequest('/foo', undefined)

// 使用默认的 callback
makeRequest('/foo', null) // 在默认参数中，`null` 值是被认为有效的
```

2. 函数暂时性死区
与 `let` 声明相似，函数的每个参数都会创建一个新的标识符绑定，在初始化之前不允许访问。

``` js
function add(first = second, second) {
  return first + second
}
console.log(add(1, 2)) // 3
console.log(add(undefined, 2)) // throws error
console.log(add(null, 2)) // 2
```
`调用 add(undefined, 2)` 之所以报错，相当于执行了一下代码：
``` js
let first = second
let second
```
对应调用 `add(1, 2)` 执行一下代码
``` js
let first = 1
let second = 2
```

3. 定义函数的两种方式
* 声明式函数
``` js
function Fn() {
  // ...
}
```
* 匿名表达式
``` js
var Fn = function() {
  // ...
}
```
匿名表达式存变量提升与暂时性死区
```js
// 由于 Fn 使用 var 声明，因此发生了变量提升
Fn() // throw errr: Fn is not a function
var Fn = function() {
  // ...
}
```
``` js
// 使用 let 声明，存在块级作用域，js 引擎在检视代码时会吧 Fn 放在暂时性死区，直到执行到 Fn 变量声明时才会将 Fn 移除暂时性死区
Fn() // throw error: Cannot access 'Fn' before initialization
let Fn = function() {
  // ...
}
```
> 在执行 js 代码之前，js 引擎会有一个预处理阶段，这个阶段会对所有的变量和函数进行处理，此时就有可能出现变量提升和暂时性死区的情况。