---
title: javascript 面试题收集中...
date: 2018-03-05 13:35:13
tags: [javascript,interview]
summary: 本片博客旨在收集一些 javascript 的面试问题，有些来自于网络社区，有些来自于自身经历，持续更新
---
本片博客旨在收集一些 javascript 的面试问题，有些来自于网络社区，有些来自于自身经历，持续更新
#### 1.交换两个变量的值
利用 ES6 的解构实现，写法简单，语义非常清晰。
``` javascript
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x,y); // 2 1
```

#### 2.数组去重
利用ES6 的 Set 数据解构实现
``` javascript
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
