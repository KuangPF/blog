function Person() {}
Person.prototype = {
	name: "Nicholas",
	age: 29,
	job: "Software Engineer",
	sayName: function () {
		console.log(this.name);
	}
};

var friend = new Person();
Person.prototype.sayHi = function () {
	console.log("hi");
};
friend.sayHi(); //"hi"（没有问题！）

Person.prototype.sayName = function () {
	console.log('changed')
}
friend.sayName();