# 第 8 章 迭代器与生成器

1. 生成器表达式

```js
function createIterator(array) {
  var nextIndex = 0
  return {
    next: function() {
      return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true }
    }
  }
}

var iterator = createIterator(['yo', 'ya'])
console.log(iterator.next().value) // 'yo'
console.log(iterator.next().value) // 'ya'
console.log(iterator.next().done) // true
```

2. 访问默认迭代器

```js
let values = [1, 2, 3]
let iterator = values[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

3. 检测一个对象能否进行迭代

```js
function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function'
}

console.log(isIterable([1, 2, 3])) // true
console.log(isIterable('Hello')) // true
console.log(isIterable(new Map())) // true
console.log(isIterable(new Set())) // true
console.log(isIterable(new WeakMap())) // false
console.log(isIterable(new WeakSet())) // false
```

4. 集合的迭代器

- entries(): 返回一个包含键值对的迭代器
- values(): 返回一个包含集合中值的迭代器
- keys(): 返回一个包含集合中键的迭代器

```js
let colors = ['red', 'green', 'blue']
let tracking = new Set([1234, 5678, 9012])
let data = new Map()
data.set('title', 'Understanding ECMAScript 6')
data.set('format', 'ebook')

// entries

for (let entry of colors.entries()) {
  console.log(entry)
}

for (let entry of tracking.entries()) {
  console.log(entry)
}

for (let entry of data.entries()) {
  console.log(entry)
}

/* 
[0, "red"]
[1, "green"]
[2, "blue"]
[1234, 1234]
[5678, 5678]
[9012, 9012]
["title", "Understanding ECMAScript 6"]
["format", "ebook"]
*/

// values

for (let value of colors.values()) {
  console.log(value)
}

for (let value of tracking.values()) {
  console.log(value)
}

for (let value of data.values()) {
  console.log(value)
}

/* 
"red"
"green"
"blue"
1234
5678
9012
"Understanding ECMAScript 6"
"ebook"
*/

// keys

for (let key of colors.keys()) {
  console.log(key)
}

for (let key of tracking.keys()) {
  console.log(key)
}

for (let key of data.keys()) {
  console.log(key)
}

/* 
0
1
2
1234
5678
9012
"title"
"format"
*/
```

5. 集合类型的默认迭代器
当集合类型没有显示的指定迭代器时，每种集合的类型都有默认的迭代器，values 是数据和 Set 的默认迭代器，而 entries 是 Map 的默认迭代器。

``` js
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");

// entries

for (let value of colors) {
  console.log(value)
}

for (let num of tracking) {
  console.log(num)
}

for (let entry of data) {
  console.log(entry)
}

// result

/* 
"red"
"green"
"blue"
1234
5678
9012
["title", "Understanding ECMAScript 6"]
["format", "print"] 
*/
```