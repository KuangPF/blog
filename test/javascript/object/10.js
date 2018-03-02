/* 构造函数继承 */
function Super(name) {
	this.color = ['yellow', 'white'];
	this.name = name;
}
Super.prototype.sayHello = function () {
	console.log('hello,this is ' + this.name);
}

function Sub(name, age) {
	Super.call(this, name);
	this.age = age;
}

var instance1 = new Sub();
instance1.color.push('black');
// console.log(instance1.color);
var instance2 = new Sub();
// console.log(instance2.color);

var instance3 = new Sub('jack', 25);
console.log(instance3.name);
console.log(instance3.age);