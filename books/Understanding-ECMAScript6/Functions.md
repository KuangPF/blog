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
