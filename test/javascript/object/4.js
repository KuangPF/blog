function Person() {
};
Person.prototype.name = 'nick';
Person.prototype.age = 24;
Person.prototype.job = 'teacher';
Person.prototype.sayHello = function () {
	console.log('hello' + this.name);
}

var keys = Object.keys(Person.prototype);
console.log(keys)

var person1 = new Person();
person1.name = 'Rob';
person1.age = 27;
var p1keys = Object.keys(person1);
// console.log(p1keys);
console.log(Object.getOwnPropertyNames(person1));