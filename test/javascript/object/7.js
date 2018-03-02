function Person() {}
Person.prototype = {
	constructor: Person,
	name: 'nick',
	age: 24,
	job: 'Software Engineer',
	friends: ['bush', 'obama'],
	sayName: function () {
		console.log(this.name);
	}
}

var person1 = new Person();
var person2 = new Person();
person1.name = 'kdkdkd';
person1.friends.push('tepurun');
console.log(person2.constructor);
// person1.sayName();