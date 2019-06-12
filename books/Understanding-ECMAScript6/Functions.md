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