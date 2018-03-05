// 解构的应用

// 函数要返回多个值只能写在数组里，有了解构就可以很容易的取到这些值

/* function moreValue() {
	return [1, 2, 3];
}

let [a, b, c] = moreValue();
console.log(a, b, c); */

/* function f([x, y, z]) {
	console.log(x, y, z);
}
f([1, 2, 3]); */
function f({
	x,
	y,
	z
}) {
	console.log(x, y, z);
}
f({
	y: 2,
	x: 3,
	z: 6
});

let jsonData = {
	id: 42,
	status: "OK",
	data: [867, 5309]
};

let {
	id,
	status,
	data: number
} = jsonData;
// console.log(id,status,number)

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, val] of map) {
	console.log(key, val);
}