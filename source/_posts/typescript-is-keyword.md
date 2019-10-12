---
title: TypeScript is 关键字
summary:
date: 2019-10-12
issuesLink: https://github.com/KuangPF/blog/issues/14
---

TypeScript 中 `is` 关键字表示是否属于某个类型，可以有效地缩小类型范围。可以看以下例子：

``` TypeScript
const isString = (val: any): val is String => {
  return typeof val === 'string'
}
```
`isString` 是一个判断传入参数是否为 String 类型的函数，用 `is String` 限定了返回值类型，这里估计有人会有这样的疑问：用 Boolean 类型也可以限制函数的返回类型。Boolean 的确可以限制 `isString` 函数的返回类型，但是用 `is String` 可以更好地缩小类型范围，避免一些隐藏的错误。

当用 `Boolean` 来限制 `isString()` 函数返回类型，以下代码会不会有编译错误，但会有运行错误，因为 `toExponential()` 是 Number 类型的一个方法，在 String 类型上不存在。

``` TypeScript
function example(val:any) {
  if (isString(val)) {
    console.log(val.length)
    console.log(val.toExponential(2))
  }
}

example('test') // Uncaught TypeError: val.toExponential is not a function

```
另外，如果将 `val.toExponential(2)` 放在 `isString` 外面，也会是编译时不会出现错误，运行时会报错误：

``` TypeScript
function example(val:any) {
  if (isString(val)) {
    console.log(val.length)
  }
  console.log(val.toExponential(2))
}

example('test') // Uncaught TypeError: val.toExponential is not a function
```

但如果用 `is String` 来限定 `isString()` 函数返回值类型，此时会直接报编译错误，当然运行时肯定也会抛出错误：

``` TypeScript
function example(val:any) {
  if (isString(val)) {
    console.log(val.length)
    console.log(val.toExponential(2)) // Property 'toExponential' does not exist on type 'String'.
  }
}
```
根据上面的例子，就会理解 TypeScript 中 `is` 关键字可以缩小类型范围，可以帮助开发者在编辑阶段发现错误，从而避免一些隐藏的运行时错误，其实这就是 TypeScript 的优势所在。

参考文章：
[what-does-the-is-keyword-do-in-typescript](https://stackoverflow.com/questions/40081332/what-does-the-is-keyword-do-in-typescript)
