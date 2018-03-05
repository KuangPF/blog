/* let [a, b, c] = [1, 2, 3];
console.log(a); */


// 解构可以进行默认赋值，但前提是 数组成员严格等于 undefined 
/* let [a = 1] = [];
console.log(a); // 1

let [b = 1] = [null];
console.log(b); // null */

function f() {
	console.log('aaaa');
}

let [x = f()] = [];