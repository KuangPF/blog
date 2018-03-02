/* 原型链和构造函数组合继承 */

/* 父类 */
function Super(name) {
	this.name = name;
	this.color = ['yellow', 'white', 'black'];
}

Super.prototype.sayName = function () {
	console.log('I am ' + this.name);
}

/* 子类 */

function Sub(name, age) {
	this.age = age;
	Super.call(this, name);
}

// 继承
Sub.prototype = new Super();

// 重写父类的方法或者添加一个父类不存在的方法，一定要放在替换原型之后
Sub.prototype.sayHello = function () {
	console.log('hello:' + this.name);
}

var instance1 = new Sub('jack', 27);
var instance2 = new Sub('obma',50);
instance1.color.push('green');
instance1.sayName();
instance1.sayHello();
console.log(instance1.color);
console.log(instance2.color);
console.log(instance1.age);
console.log(instance2.age);