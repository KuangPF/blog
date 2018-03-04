/* 组合继承
 */

// 原型链继承

function SuperPerson(name, age) {
  this.name = name;
  this.age = age;
  this.color = ['white', 'gray'];
}

SuperPerson.prototype.sayName = function () {
  console.log(this.name);
}

function SubPerson(name, age) {
  // console.log(this);
  SuperPerson.call(this, name, age);
}

SubPerson.prototype = new SuperPerson();

var subperson1 = new SubPerson('dd', 29);
var subperson2 = new SubPerson('dddd', 24);

// subperson1.color.push('black');
console.log(subperson1.name);
console.log(subperson2.name);