---
title: javascript 遍历方法汇总
date: 2018-02-11 16:02:54
tags: javascript
---
对于数组中的遍历也许再熟悉不过，感觉从最开始接触`C`语言的时候就遇到了遍历...下面就一起来说说`javascript`中的遍历方法，以及他们之间的性能比较
## for 循环语句
``` javascript
let tempArry = [1, 2, 3, 4, 5];

// for 循环语句
for (let i = 0; i < tempArry.length; i++) {
  console.log(tempArry[i]);
}
```
> 性能解读：这是我们最熟悉的一种遍历方式，也是最简单，使用频率最高的。他的性能虽然不弱，但是由于每次遍历都需要重新定义变量，因此还可以进行改进

####  for 循环语句 改进
``` javascript
let tempArry = [1, 2, 3, 4, 5];
for (let i = 0, len = tempArry.length; i < len; i++) {
  console.log(tempArry[i]);
}
```
> 减少了变量的定义，提高了遍历的性能，而且这种遍历方式性能最优。

## forEach
``` javascript
let tempArry = [1, 2, 3, 4, 5];
tempArry.forEach((value, key, arry) => {
  console.log(value); // 依次输出 1,2,3,4,5，
  console.log(key); // 依次输出 0,1,2,3,4
  console.log(arry); // 始终输出 [1,2,3,4,5]
})
```
> `forEach`方法是数组内置方法，他的好处在于不用重新定义一系列变量，便于使用，但是从效率以及性能角度来说它是劣于原始for循环,而且`forEach`不支持`return`。

## map
``` javascript
let tempArry = [1, 2, 3, 4, 5];
let tempArryMap = tempArry.map((value, key, arry) => {
  console.log(value);
  console.log(key);
  console.log(arry);
  return value + 1;
})
console.log(tempArry); // 结果为 [1, 2, 3, 4, 5]
console.log(tempArryMap); // 结果为 [2, 3, 4, 5, 6]
```
> `map`也是数组的内置方法，写法与`forEach`没有什么不一样的，不同点在于`map`可以改变当前循环的值，而`forEach`则不可以。因此`map`一般用来处理需要修改某一个数组的值，在效率以及性能上也不如原始的`for`循环。

## filter
``` javascript
let tempArry = [1, 2, 3, 4, 5];
let tempArryFilter = tempArry.filter((value, key, arry) => {
  console.log(value);
  console.log(key);
  console.log(arry);
  if (value === 5) {
    return false;
  }
  return true;
})
console.log(tempArry); // 结果为 [1, 2, 3, 4, 5]
console.log(tempArryFilter); // 结果为 [1, 2, 3, 4]
```
> `filter`也是数组内置的方法，`filter`和`map`不同，`map`目的是为了改变值，而`filter`目的是为了去掉不要的值，在循环的时候如果返回的是`false`那么就表示本次循环的不添加该值，返回`true`则相反是表示要添加到新建的数组中

## reduce
``` javascript
let tempArry = [1, 2, 3, 4, 5];
let tempArryReduce = tempArry.reduce((count, value,key,arry)=> {
  console.log(count);  // 依次为  0,1,3,6,10
  console.log(value);  // 依次为 1,2,3,4,5
  console.log(key);  // 0,1,2,3,4
  console.log(arry)  // 始终为 [1,2,3,4,5]
  return count + value;
},0);
console.log(tempArry); // 结果为 [1, 2, 3, 4, 5]
console.log(tempArryReduce)  // 结果为 16
```
> `reduce`的不同之处在于累加，和其他几个内置方法不同的地方，它的第二个参数不是`this`对象，而是初始累加值（如果不设置的话数组会乱掉），而且回调函数的的个数也不同，比其他的多了一个，而且还在在开始的多加了一个参数，第一个参数记录的是上一次循环的累加值

## some
``` javascript
let tempArry = [1, 2, 3, 4, 5];
let tempArrySome = tempArry.some((value,key,arry)=> {  
  console.log(value);  // 依次为 1,2,3 
  console.log(key);   // 0,1,2
  console.log(arry) // 始终为[1, 2, 3, 4, 5]
  return value === 3;
});
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArrySome)  // true
```
> `some`的不同之处在它返回的布尔值，它的作用有点像filter，不过它的目的不是为了筛选返回数组，而是为了筛选该数组是否有满足你要的值，而且找到符合条件的值返回了一次`true`之后就不会再继续执行了

## every
``` javascript
// [...].every(ck)函数,某一个为false，则返回false,如果全部返回true，则返回true  
let tempArry = [1, 2, 3, 4, 5];
let tempArryEvery = tempArry.every((value,key,arry)=> {  
  console.log(value);  // 1
  console.log(key);   // 0
  console.log(arry) // 始终为[1, 2, 3, 4, 5]
  return value === 3;
});
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArryEvery)  // false
```
> 每个数组元素都执行一次`ck`函数，直到某个元素执行函数`ck`返回`false`,如果返回`false`则直接返回`false`,如果全部返回`true`，则返回`true`

## indexOf
``` javascript
let tempArry = [1, 2, 3, 4, 5];
let tempArryIndexOf = tempArry.indexOf(3);
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArryIndexOf)  // 2
```
> 对于`indexOf`方法来说，在数组循环过程中会和传入的参数比对，如果是比对成功，那么终止循环，返回对比成功的下标。

## lastIndexOf
``` javascript
let tempArry = [1,2,3,4,5,4,3,4,5]
let tempArryLastIndexOf = tempArry.lastIndexOf(5);
console.log(tempArry); // [1,2,3,4,5,4,3,4,5]
console.log(tempArryLastIndexOf)  // 8
```
> lastIndexOf方法和indexOf作用一致，但查找方向不同，indexOf是正向查找，lastIndexOf是逆向查找，找到之后返回成功的下标

<p class="tip">小结：对于以上8个数组的内置方法，forEach方法仅仅只是为了循环，并不可以帮你做额外的事情；map方法相当于在循环的时候你告诉数组当前遍历的这个值需要改成什么样，那么它就会最后给什么样的数组；filter方法相当于在循环的时候数组遍历一个个对象，并问你这个是不是你要找的值，如果你说是，他就会给你返回一个到新的数组中，不是他就会剔除；reduce方法相当于循环遍历对象做统计（累加或者累减之类的）;some和every方法相当于在遍历的时候拿着一个个对象问你这个是不是你找的，只要你说了一遍是，那么他就会给你分别返回的是true和false；indexOf和lastIndexOf方法相当于你告诉它你要找什么值，找到之后立马返回给你它的门牌号。</p>

## for...in
``` javascript
let tempArry = [1, 2, 3, 4, 5];
for (let key in tempArry) {
  console.log(key); // 依次输出 0,1,2,3,4
}

let tempArryIn = {
  '1': 'a',
  '2': 'b',
  '3': 'c'
};
for (let key in tempArryIn) {
 console.log(key); // 依次输出 1,2,3
```
> 从结果得知,for...in遍历数组的时候是遍历数组的下标值，而在遍历对象的时候遍历的是key值

<p class="tip">在进行遍历的时候不推荐使用`for...in`</p>

## for...of
``` javascript
let tempArry = [1, 2, 3, 4, 5];
for(let value of tempArry) {
  console.log(value); // 依次输入 1,2,3,4,5
}
```
> `for...of`语句遍历的是值，而不是下标，但`for...of`不支持循环对象。

<p class="tip">总结：通过上面几种遍历方法可以看出，原始`for`的循环的效率和性能最高，尤其是在数据越多的时候它的优势体现的越明显，其他的方法可以根据需求灵活的选择。</p>