/**
 * 工厂模式创建对象
 * 
 * @param {any} name 
 * @param {any} age 
 * @param {any} job 
 * @returns 
 */
function creatPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayHello = function () {
		console.log('hello,this is factory mode ----' + this.name);
	}

	return o;
}
// 创建一个对象
var person1 = new creatPerson('jack', 24, 'pilot');
person1.sayHello();


/**
 * 构造函数模式
 * 
 * @param {any} name 
 * @param {any} age 
 * @param {any} job 
 */
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayHello = function () {
		console.log('hello,this is Constructor mode ----' + this.name);
	}
}

// 创建一个对象
var person2 = new Person('Greg', 24, 'Doctor');
var person3 = new Person("Nicholas", 29, "Software Engineer");
person2.sayHello();
// console.log(person2.sayHello === person3.sayHello); // person2  的constructor （构造函数）属性指向 Person
// console.log(Person.prototype.isPrototypeOf(person2));


/**
 * 原型链创建对象
 * 
 */
function PersonPrototype() {};
PersonPrototype.prototype.name = 'Nicholas';
PersonPrototype.prototype.age = 29;
PersonPrototype.prototype.job = "Software Engineer";
PersonPrototype.prototype.sayName = function () {
	console.log(this.name);
};

var person4 = new PersonPrototype();
console.log(Object.getPrototypeOf(person4).name)