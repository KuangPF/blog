---
title: 面向对象版块之定义多个对象属性以及读取属性特性
date: 2018-03-02 17:02:18
tags: [javascript,Object-Oriented]
summary: 这是 `javascript` 面向对象版块的第三篇文章，主要讲解的是多个属性的定义以及读取属性的特性。前面这几章内容目的在于加深对对象的理解，这样可以利于理解后面的原型链以及继承方面的知识，或者你也可以了解一下不一样的 `javascript` 对象的定义。
---

这是 `javascript` 面向对象版块的第三篇文章，主要讲解的是多个属性的定义以及读取属性的特性。前面这几章内容目的在于加深对对象的理解，这样可以利于理解后面的原型链以及继承方面的知识，或者你也可以了解一下不一样的 `javascript` 对象的定义。

### 定义多个属性
在上一篇博客中已经讲解了定义一个属性的方法，那就是 `Object.defineProperty`，那么在日常开发中如果要定义多个属性呢，该使用什么样的方法，其实可以联想到使用 `Object.defineProperties`,对，就是这个方法，ECMAScript 5 定义了 Object.defineProperties() 方法，利用这个方法可以通过描述符一次定义多个属性。这个方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。例如：
``` javascript
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2017
  },
  edition: {
    value: 1,
    writable: true,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newVal) {
      if (newVal > this._year) {
        this.edition += newVal - this._year;
      }
    }
  }
})
book.year = 2018;
console.log(book.edition); // 2

```
以上代码在 book 对象上定义了两个数据属性（ _year 和 edition ）和一个访问器属性（ year ），这里的属性都是在同一时间创建的。
<p class="tip">一样的，在调用 `Object.defineProperties()` 方法时，如果不指定， configurable 、 enumerable 和writable 特性的默认值都是 false 。<P>

### 读取属性的特性

对于读取属性的特性可以使用 `Object.getOwnPropertyDescriptor()`方法，这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有 configurable 、 enumerable 、 get 和 set ；如果是数据属性，这个对象的属性有 configurable 、 enumerable 、 writable 和 value 。例如：

``` javascript
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2017
  },
  edition: {
    value: 1,
    writable: true,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newVal) {
      if (newVal > this._year) {
        this.edition += newVal - this._year;
      }
    }
  }
})

var descriptor1 = Object.getOwnPropertyDescriptor(book, '_year');
console.log(descriptor1.value); // 2017
console.log(descriptor1.configurable); // false
console.log(typeof descriptor1.get); // undefined

var descriptor2 = Object.getOwnPropertyDescriptor(book, 'edition');
console.log(descriptor2.value); // 1
console.log(descriptor2.configurable); // false
console.log(descriptor2.writable); // true

var descriptor3 = Object.getOwnPropertyDescriptor(book, 'year');
console.log(typeof descriptor3.value); // undefined
console.log(descriptor3.enumerable); // false
console.log(typeof descriptor3.get); // function
console.log(typeof descriptor3.set); // function
```
对于数据属性 _year ， value 等于最初的值， configurable 是 false ，而 get 等于 undefined 。对于访问器属性 year ， value 等于 undefined ， enumerable 是 false ，而 get 是一个指向 getter 函数的指针。

### 小结
这篇文章主要讲解了**定义多个属性**和**读取属性的特性**，分别使用了 `Object.defineProperties()` 和`Object.getOwnPropertyDescriptor`，了解了这种定义属性和读取属性的方法之后，相信对于对象会有更加深刻的理解。


上一篇：[javascript 面向对象版块之对象属性](https://kuangpf.github.io/blog/2018/03/02/javascript-object-properties/)

下一篇：[javascript 面向对象版块之创建对象 ](https://kuangpf.github.io/blog/2018/03/06/javascript-object-create/)

