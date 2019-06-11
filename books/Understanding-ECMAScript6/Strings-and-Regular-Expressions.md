# 第二章 字符串与正则表达式

1. include startWith endWith
* `include()`: returns true if the given text is found anywhere within the string. It returns false if not.
* `startsWith()`: method returns true if the given text is found at the beginning of the string. It returns false if not.
* `endWith()`: returns true if the given text is found at the end of the string. It returns false if not.

这三个函数都接受两个参数：需搜索的文本，以及可选的搜索位置起始的索引。当提供第二个参数时，`include` 和 `startsWith` 方法将会以参数值作为起点开始匹配，而 `endWith` 则会将用字符串的长度减去该参数，然后以此为起点开始匹配。
``` js
var msg = "Hello world!";

console.log(msg.startsWith("Hello"));       // true
console.log(msg.endsWith("!"));             // true
console.log(msg.includes("o"));             // true

console.log(msg.startsWith("o"));           // false
console.log(msg.endsWith("world!"));        // true
console.log(msg.includes("x"));             // false

console.log(msg.startsWith("o", 4));        // true
console.log(msg.endsWith("o", 8));          // true
console.log(msg.includes("o", 8));          // false
```