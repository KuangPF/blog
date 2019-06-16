---
title: ES6 中如何数组去重
summary:
date: 2019-06-10
issuesLink: https://github.com/KuangPF/blog/issues/12
---

<p align="center" style="text-align: center"><img width="450px" style="width:450px" src="https://cdn-images-1.medium.com/max/800/1*Z1SU1atGbGMgY_jHaDyMGA.png" alt=""></p>

有三种方法可以从数组中过滤掉重复项，并且只返回唯一的值，我最喜欢的方式还是使用 `Set`，因为它最简洁并且最简单😁。

<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*tmEwK00Tgvo_MW1sWjZn4g.png" alt=""></p>

### 使用 Set
首先解释下什么是 `Set`
> `Set` 是 ES6 提供的一种新的数据结构，由于它只会存储唯一的值，因此当你传入数组时，他会删除重复的值。

Okay，我们现在看一下以下代码，分析下发生了什么，它做了两件事情：
1. 首先，我们创建一个 `Set` 数据结构，并传入一个数组，由于 `Set` 只会存在唯一的值，因此所有重复的值将会被删除
2. 当删除重复的值后，通过扩展运算符 `...` 将 `Set` 数据结构转化为数组

<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*f0io_19WfjiN42N2JKIZ0Q.png" alt=""></p>

#### 使用 `Array.from` 将 Set 转化为数组
另外，你也可以使用 `Array.from` 将 `Set` 转化为数组
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*MZgefa7Rur-RafdrT8OSpw.png" alt=""></p>

### 使用 filter

为了更好地理解这部分，我们先看下一下两种方法：`indexOf` and `filter`
#### indexOf
`indexOf` 方法返回它从数组中找到的所提供元素的第一个索引。
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*W1jHsgUou5frNHlbC-jVpw.png" alt=""></p>

#### filter

`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素，换句话说，如果元素满足过滤的条件，并且返回 `true`，那么这个元素就会被包含在过滤掉的数组中，如果一个元素不满足过滤条件，那么将不会在过滤掉的数组中。

下面我们看下使用 `filter` 遍历数组会发生什么。
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*gwrwc11agEuXo-CQ4mObxg.png" alt=""></p>

以下是控制台输出的日志，数组中重复项，它们的 `indexOf` 与 遍历时的 `index` 的值不相等，对于那些值，它们不会包含在过滤掉的数组中。
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*QCIsNc2xN7SPZc3dYhjReg.png" alt=""></p>

#### 找出重复项
我们也可以通过 `filter()` 方法找出数组中重复项，简单的改变下过滤条件既可以实现：
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*QWswjvxzLyhuycOQ8qzohA.png" alt=""></p>

同样，如果我们调试上面的代码可以看到如下输出：
<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*SqNQiboZ6Tk7M2GB_n_T5A.png" alt=""></p>


### 使用 reduce
`reduce()` 方法对数组中的每个元素执行一个由您提供的 `reducer` 函数(升序执行)，将其结果汇总为单个返回值。
在这种情况下，我们可以让 `reducer` 函数检测下最终数组中是否包含 `reduce` 回调中的当前值，如果不包含，则将该值添加到最终数组中，否则就忽略掉该元素，返回最终数组。
`Reduce` 函数稍微有点难以理解，下面通过例子来调试下，看下输出：

<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*g_TJT20Qtgwn_U-H42CBlA.png" alt=""></p>

下面是控制台的输出：

<p align="center" style="text-align: center"><img width="650px" style="width:650px" src="https://cdn-images-1.medium.com/max/1600/1*xxIRrX8Q8st2-uVOe5-T3A.png" alt=""></p>


### 参考
[MDN Web Docs — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
[MDN Web Docs — Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
[MDN Web Docs — Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
[GitHubGist: Remove duplicates from JS array](https://gist.github.com/telekosmos/3b62a31a5c43f40849bb)
[CodeHandbook: How to Remove Duplicates from JavaScript Array](https://codehandbook.org/how-to-remove-duplicates-from-javascript-array/)

文章来源：翻译 [How to Remove Array Duplicates in ES6](https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c)