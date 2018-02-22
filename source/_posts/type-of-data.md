---
title: JavaScript 数据类型 以及背后的一些思考
date: 2018-02-22 13:24:21
tags: [javascript,面试]
summary: JavaScript 数据类型 以及背后的一些思考
---
`javascript`是一种**弱类型**或者说**动态**语言，这意味着你可以先不用提前申明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一变量保存不同类型的数据:
``` javascript
let foo = 18; // foo is a a Number now
let foo = 'babr'; // foo is a String now
let foo = true; // foo is a Boolean now
```
## 数据类型
最新的 ECMAScript 标准定义了 7 种数据类型:
### 6 种 原始类型:
* [Boolean](#Boolean)
* [Null](#Null)
* [Undefined](#Undefined)
* [Number](#Number)
* [String](#String)
* [Symbol (ECMAScript 6 新定义)](#Symbol)

#### Boolean
> In computer science, a boolean is a logical data type that can have only the values true or false. For example, in JavaScript, boolean conditionals are often used to decide which sections of code to execute (such as in if statements) or repeat (such as in for loops).

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Boolean),简单来说`boolean`的值只能是`ture`或者`false`。

#### Null
> In computer science, a null value represents a reference that points, generally intentionally, to a nonexistent or invalid object or address. The meaning of a null reference varies among language implementations.In JavaScript, null is one of the primitive values.

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Null),`null`表示"没有对象"，即该处不应该有值

#### Undefine
> A primitive value automatically assigned to variables that have just been declared or to formal arguments for which there are no actual arguments.

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Undefined),`undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义。

#### Number
> In JavaScript, Number is a numeric data type in the [double-precision 64-bit floating point format (IEEE 754)](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). In other programming languages different numeric types can exist, for examples: Integers, Floats, Doubles, or Bignums.

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Number),即在J`avaScript`中，`Number`是双精度64位浮点格式（IEEE 754）中的数字数据类型。在其他编程语言中，可以存在不同的数字类型，例如：整数，浮点数，双精度或Bignums。

#### String
> In any computer programming language, a string is a sequence of characters used to represent text.
> In JavaScript, a String is one of the primitive values and the String object is a wrapper around a String primitive.

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/String),即在任何计算机编程语言中，`String`都是用来表示文本的字符序列。

#### Symbol
> ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值

`Symbol`详细介绍可移步[Symbol](http://es6.ruanyifeng.com/#docs/symbol)

### 和 Object

#### Object
> Object refers to a data structure containing data and instructions for working with the data. Objects sometimes refer to real-world things, for example a car or map object in a racing game. JavaScript, Java, C++, Python, and Ruby are examples of object-oriented programming languages.

上面引用于[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Object),即对象是指包含数据和处理数据的指令的数据结构。

## 拓展
### null 与 undefined
大多数计算机语言，有且仅有一个表示"无"的值，比如，C语言的NULL，Java语言的null，Python语言的None，Ruby语言的nil。
有点奇怪的是，JavaScript语言居然有两个表示"无"的值：undefined和null。这是为什么？
#### 相似性
在JavaScript中，将一个变量赋值为undefined或null，老实说，几乎没区别。
``` javascript
let a = undefined;
let a = null;
```
上面代码中，a变量分别被赋值为undefined和null，这两种写法几乎等价。
undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。
``` javascript
if (!undefined) 
    console.log('undefined is false');
// undefined is false

if (!null) 
    console.log('null is false');
// null is false

undefined == null
// true
```
既然undefined和null的含义与用法都差不多，为什么要同时设置两个这样的值，这不是无端增加JavaScript的复杂度，令初学者困扰吗？Google公司开发的JavaScript语言的替代品Dart语言，就明确规定只有null，没有undefined！
#### 历史原因
最近，我在读新书《Speaking JavaScript》时，意外发现了这个问题的答案！
原来，这与JavaScript的历史有关。1995年JavaScript诞生时，最初像Java一样，只设置了null作为表示"无"的值。
根据C语言的传统，null被设计成可以自动转为0。
``` javascript
Number(null)
// 0

5 + null
// 5
```
但是，JavaScript的设计者Brendan Eich，觉得这样做还不够，有两个原因。
首先，null像在Java里一样，被当成一个对象。但是，JavaScript的数据类型分成原始类型（primitive）和合成类型（complex）两大类，Brendan Eich觉得表示"无"的值最好不是对象。
其次，JavaScript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误。
因此，Brendan Eich又设计了一个undefined。
#### 最初设计
JavaScript的最初版本是这样区分的：null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。
``` javascript
Number(undefined)
// NaN

5 + undefined
// NaN
```
#### 目前的用法
但是，上面这样的区分，在实践中很快就被证明不可行。目前，null和undefined基本是同义的，只有一些细微的差别。
null表示"没有对象"，即该处不应该有值。典型用法是：
* 作为函数的参数，表示该函数的参数不是对象。
* 作为对象原型链的终点。
``` javascript
Object.getPrototypeOf(Object.prototype)
// null
```
undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
* 变量被声明了，但没有赋值时，就等于undefined。
* 调用函数时，应该提供的参数没有提供，该参数等于undefined。
* 对象没有赋值的属性，该属性的值为undefined。
* 函数没有返回值时，默认返回undefined。
``` javascript
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```

### == 与 ===
简而言之，在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false );
###### 严格相等 ===
全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。
``` javascript
var num = 0;
var obj = new String("0");
var str = "0";
var b = false;

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num === obj); // false
console.log(num === str); // false
console.log(obj === str); // false
console.log(null === undefined); // false
console.log(obj === null); // false
console.log(obj === undefined); // false
```
在日常中使用全等操作符几乎总是正确的选择。对于除了数值之外的值，全等操作符使用明确的语义进行比较：一个值只与自身全等。对于数值，全等操作符使用略加修改的语义来处理两个特殊情况：第一个情况是，浮点数 0 是不分正负的。区分 +0 和 -0 在解决一些特定的数学问题时是必要的，但是大部分情况下我们并不用关心。全等操作符认为这两个值是全等的。第二个情况是，浮点数包含了 NaN 值，用来表示某些定义不明确的数学问题的解，例如：正无穷加负无穷。全等操作符认为 NaN 与其他任何值都不全等，包括它自己。（等式 (x !== x) 成立的唯一情况是 x 的值为 NaN）

###### 非严格相等 ==
相等操作符比较两个值是否相等，在比较前将两个被比较的值转换为相同类型。在转换后（等式的一边或两边都可能被转换），最终的比较方式等同于全等操作符 === 的比较方式。 相等操作符满足交换律。

``` javascript
var num = 0;
var obj = new String("0");
var str = "0";
var b = false;

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num == obj); // true
console.log(num == str); // true
console.log(obj == str); // true
console.log(null == undefined); // true
console.log(obj == null); // false
console.log(obj == undefined); // false
```
<p class="tip">还有一种比较方法:`Object.is`,Object.is的行为方式与三等号相同，但是对于NaN进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 true。</p>

* 参考 [undefined与null的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)
* 参考 [JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)




