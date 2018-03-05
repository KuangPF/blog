let promise = new Promise((resolve, reject) => {
	console.log('1');
	console.log('resolve1');
	resolve('resolve2');
	console.log(5);
})

let promise1 = new Promise((resolve, reject) => {
	console.log('1');
	console.log('resolve2');
	resolve('resolve33');
	console.log(5);
})

console.log(2);

promise.then(val => {
	setTimeout(() => {
		console.log(val);
	}, 10);
})
promise1.then(val => {
	setTimeout(() => {
		console.log(val);
	}, 10);
})
console.log(3);
console.log('promise');
//console.log(4);
/* setTimeout(()=> {
	console.log(4);
},11); */

/* let a = [1,2,3,4,5];
for(let val of a) {
	console.log(val);
} */

let arr = [];
for(let i=0;i<1000;i++) {
	arr.push(i);
}
console.log(arr);