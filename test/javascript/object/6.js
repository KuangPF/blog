function Person() {};
var person1 = new Person();

// 写法一
Person.prototype = {
	name: 'nick',
	sayHello: function () {
		console.log(this.name);
	}
}

// 写法二
/* Person.prototype.name = 'nick';
Person.prototype.sayHello = function () {
	console.log(this.name);
} */

person1.sayHello();