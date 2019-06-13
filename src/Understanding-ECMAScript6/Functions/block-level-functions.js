/* 块级函数 */

if (true) {
  console.log(typeof doSomething) // throw error，访问暂时性死区里面的变量会导致运行时错误
  let doSomething = function() { // 执行到这里才会将 doSomething 变量从暂时性死区中移除
    // ...
  }
  doSomething()
}
console.log(typeof doSomething) // undefined