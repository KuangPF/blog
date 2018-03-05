/*  
对象的操作实际上操作的是对象的引用，然后 obj2 = obj1 令 obj2 指向 obj1 同一块内存，因此当 obj1.name 发生改变时，obj2.name 也会发生改变
*/

// 基本类型

let a = 'baseString';
let b = a;
a = 'baseStringPro';
console.log(a, b); // baseStringPro baseString

// 引用类型

let obj1 = {
	name: 'testName'
}

let obj2 = obj1;
obj1.name = 'testNamePro';
console.log(obj1.name, obj2.name);
