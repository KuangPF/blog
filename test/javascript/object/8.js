/* 原型链继承 */



/* 父类 */
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function () {
	return this.property;
}

/* 子类 */
function SubType() {
	this.subProperty = false;
}

SubType.prototype = new SuperType();


// 添加新方法
SubType.prototype.getSubValue = function() {
	return this.subProperty;
}

// 重写父类的方法
SubType.prototype.getSuperValue = function() {
	return false;
}
var instance = new SubType();
var instanceSuper = new SuperType();
console.log(instance.getSuperValue());
console.log(instanceSuper.getSuperValue());