# 第 7 章 Set 与 Map

1. Object.create(null)
使用 `Object.create(null)` 创建了一个空对象，该对象上没有任何继承属性，比如没有 `toString` 方法，因此可以当作一个干净且高度可定制的对象来使用，例如在 ES5 中用它来模拟 `Set` 与 `Map`。

2. Set 方法
* add()：添加一个项目
* delete()：删除一个项目
* has()：检测某个值是否存在于 Set 中
* clear()：清空 Set

```js
let set = new Set()
set.add(5)
set.add('5')

console.log(set.size) // 2
console.log(set.has(5)) // true

set.delete(5)

console.log(set.has(5)) // false

set.clear()

console.log(set.size) // 0
```

3. Set 上的 forEach 方法
Set 上的 forEach 方法会传递一个回调函数，该函数有三个参数：
* Set 中下个位置的值
* 与第一个参数相同的值
* 目标 Set 本身

> 第二个参数和第一个参数相同的原因是 ES6 制定者本可以将 `Set` 版本的 `forEach` 方法设置为两个参数，但这样的话就与 `Map` 和数组这两个版本的 `forEach` 方法的参数不一致了，因此就想到一个解决办法：将 `Set` 的每一项同时认定为键和值。于是为了让 `Set` 的 `forEach` 方法与 `Map` 和数组的 `forEach` 方法保持一直，该回调函数的前两个参数据相同了。