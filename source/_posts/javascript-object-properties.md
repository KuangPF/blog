---
title: 面向对象版块之对象属性
date: 2018-03-02 13:41:46
tags: [javascript,Object-Oriented]
summary: 这是 javascript 面向对象版块的第二篇文章，主要讲解的是对象的属性，其中对象的属性可以分为两种：数据属性和访问器属性，在理解这些知识点之后对理解对象有很大地帮助。
---

这是 `javascript` 面向对象版块的第二篇文章，主要讲解的是对象的属性，首先先创建一个对象:

``` javascript
var person = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function () {
    console.log(this.name);
  }
};
```
上面的例子创建了一个名为 person 的对象，并为它添加了三个属性（ name 、 age 和 job ）和一个方法（ sayName() ）。其中， sayName() 方法用于显示 this.name （将被解析为 person.name ）的值。
ECMAScript 中有两种属性：数据属性和访问器属性。
### 数据属性
数据属性是可获取和设置值得属性，数据属性将 value 和 writable 属性包含在其描述符中。数据属性有4个描述其行为的特性:
* [[Configurable]]:表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
* [[Enumerable]]:表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
* [[Writable]]: 表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
* [[Value]]: 包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined 。

对于像前面例子中那样直接在对象上定义的属性，它们的 [[Configurable]] 、 [[Enumerable]]和 [[Writable]] 特性都被设置为 true ，而 [[Value]] 特性被设置为指定的值。例如：

``` javascript
var person = {
  name: "Nicholas",
};
```
这里创建了一个名为 name 的属性，为它指定的值是 "Nicholas" 。也就是说， [[Value]] 特性将被设置为 "Nicholas" ，而对这个值的任何修改都将反映在这个位置。
此时有这样一个想法，如果我不允许修改 name 属性的值，怎么办？或者说我要修改属性的默认特性，怎样才可以实现呢？要实现这些功能就要用到` Object.defineProperty()`方法，这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。其中，描述符（descriptor）对象的属性必须是： configurable 、 enumerable 、 writable 和 value 。设置其中的一或多个值，可以修改对应的特性值。例如：
``` javascript
var person = {};
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'Nicholas'
})
console.log(person.name); // Nicholas
person.name = 'Greg';
console.log(person.name); // Nicholas
```
这个例子创建了一个 name 属性，它的值 "Nicholas" 是只读的。这个属性不可修改，如果尝试修改这个值的话在非严格模式下会被忽略，但是如果在严格模式下，会抛出错误: 
Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
类似的规则也适用于不可配置的属性:

``` javascript
var person = {};
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'Nicholas'
})
console.log(person.name); // Nicholas
delete person.name;
console.log(person.name); // Nicholas
```
把 configurable 设置为 false ，表示不能从对象中删除属性。如果对这个属性调用 delete ，则在非严格模式下什么也不会发生，而在严格模式下会导致错误。而且一旦把属性定义为不可配置，就不能再把它变回可配置了。此时，再调用 Object.defineProperty() 方法修改特性，都会导致错误：
``` javascript
var person = {};
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'Nicholas'
})
console.log(person.name); // Nicholas
/* delete person.name;
console.log(person.name); // Nicholas */
Object.defineProperty(person, 'name', {
  writable: true
})
```
也就是说 可以多次调用 Object.defineProperty() 方法修改同一属性，但是当 configurable 设置为 false 后就不可以了。

<p class="tip">在《JavaScript 高级程序设计（第三版）》中写到：
“一旦把属性定义为不可配置的，就不能再把它变回可配置了。此时，再调用 Object.defineProperty() 方法修改除 writable 之外的特性，都会导致错误。”
但是我试了一些，即使修改的是 writable 属性，还是会报错。如果我描述的有错，还望各位大佬指出，以便交流。</p>

在调用 Object.defineProperty() 来定义属性时。如果不指定， configurable 、 enumerable 和writable 特性的默认值都是 false。其实在日常的开发中用到这种高级方法来定义属性的机会还是比较少，不过理解这部分对理解对象还是有很大的好处。

### 访问器属性

访问器属性不包含数据值，但包含一对儿 getter 和 setter 函数（不过，这两个函数都不是必需的）。在读取访问器属性的时候，会调用 getter 方法，这个函数复制返回有效的值；在写入访问器属性的时候，会调用 setter 函数，这个函数复制如果修改数据。访问器属性有如下 4 个特性：

* [[Configurable]] ：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true 。
* [[Enumerable]] ：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 true 。
* [[Get]] ：在读取属性时调用的函数。默认值为 undefined 。
* [[Set]] ：在写入属性时调用的函数。默认值为 undefined 。访问器属性不能直接定义，必须使用 Object.defineProperty() 来定义。请看下面的例子。

``` javascript
var book = {
  _year: 2004,
  edition: 1
}

Object.defineProperty(book, 'year', {
  get: function () {
    return this._year;
  },
  set: function (newVal) {
    if (newVal > this._year) {
      this._year = newVal;
      return this.edition += newVal - 2004;
    }
  }
})
book.year = 2005;
console.log(book.edition); // 2
```
以上代码代码创建了一个 book 对象，定义了两个属性，_year 和 edition。而访问器属性 year 包含了一个 geter 函数和 setter 函数。getter 函数返回 _year 的值，而 setter 函数返正确的版本。当把 year 属性修改成 2005 时,而 edition 变为 2,这是使用访问器属性的常见方式，即设置一个属性的值会导致其他属性发生变化。
不一定非要同时指定 getter 和 setter，如果只指定 getter ，表明该属性不能写，只能读取，尝试写入属性会被忽略，但在严格模式下会报错。如果只指定 setter ，表明该属性不能读取，如果尝试读取，在严格模式和非严格模式下都会返回 undefined。

<p class="tip">
在《JavaScript 高级程序设计（第三版）》中写到：
“只指定 setter 函数的属性也不能读，否则在非严格模式下会返回 undefined ，而在严格模式下会抛出错误。”
但在 chrome 中测试了一下，在严格模式下不会抛出错误，返回的也是 undefined 。如果我描述的有错，还望各位大佬指出，以便交流。
</p>

### 小结
本片博客主要介绍了两种属性：**数据属性**和**访问器属性**，介绍了这两种属性的定义以及这两种属性的特性，主要使用方法 Object.defineProperty()。其实这篇文章主要是加强对对象的理解。

<br>
上一篇：[javascript 面向对象版块之理解对象](https://kuangpf.github.io/blog/2018/03/02/javascript-understand-object/)

下一篇：[javascript 面向对象版块之定义多个对象属性以及读取属性特性 ](https://kuangpf.github.io/blog/2018/03/02/javascript-understand-object-more/)
