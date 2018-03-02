let obj = {
	name: 'name',
	a: () => {
		console.log('this is a function');
	},
	c: {
		age: 24
	}
}
// obj.a();

function fn() {

}

fn.a = () => {
	console.log('this is a');
}
// console.log(fn instanceof Object);

function fnObj() {
	this.name = 'fnObj';
	this.age = 24;
}

let fn1 = new fn();
console.log(fn1.a);

/* console.log(fnObj.prototype);
console.log(Object.prototype.toString.call(fnObj)); */

/* let fn2 = function() {

}
let fns = new fn2();
fn2.a = function() {
	return 'aaa'
}
console.log(fn2.a()); */

function Fn() {
	
}
Fn.prototype.name = '王福朋';
Fn.prototype.getYear = function () {
	return 1988;
};

var fn = new Fn();

console.log(fn.constructor);