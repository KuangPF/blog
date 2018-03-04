/* 组合继承
 */

function SuperPerson() {
  this.name = 'testName';
  this.age = {
    name: 'kdkd'
  };
  this.color = ['white', 'gray'];
}

SuperPerson.prototype.sayName = function () {
  console.log(this.name);
}

function SubPerson() {}

SubPerson.prototype = new SuperPerson();

var subperson1 = new SubPerson();
var subperson2 = new SubPerson();

//subperson1.color.push('black');

subperson1.color = ["white", "gray", "black"];

console.log(subperson1.color);
console.log(subperson2.color);