# 第四章 对象

1. 方法简写
``` js
// ES5
var person = {
  name: 'Nicholas',
  sayName: function() {
    console.log(this.name);
  }
}

// ES6
// sayName 具有 ES5 中写法的一切特征，另外简写的 sayName 还能被继承，而非简写的则不能
var person = {
  name: 'Nicholas',
  sayName() {
    console.log(this.name);
  }
}
```

2. Object.is()

Object.is() 在多数情况下与 `===` 得到的结果是一样的，只有以下两种情况会不一样
* Object.is(+0, -0) // true
* Object.is(NaN, NaN) // true
这两种情况在如果使用 === 进行比较，会返回 `false`

3. Object.assign()
``` js
var receiver = {},
supplier = {
  get name() {
    return "file.js"
  }
}

Object.assign(receiver, supplier);

var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");

console.log(descriptor.value); // "file.js"
console.log(descriptor.get); // undefined

```