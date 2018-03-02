function Super() {
	this.color = ['green', 'white'];
}

function Sub() {
}

Sub.prototype = new Super();
var instance1 = new Sub();
var instance2 = new Sub();
var instance3 = new Super();
instance1.color.push('black');
console.log(instance1.color);
console.log(instance2.color);
console.log(instance3.color);