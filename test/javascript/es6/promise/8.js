/* Promise.race() */

let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('this is p1')
	}, 1000)
})

let p2 = new Promise((resolve, reject) => {
	resolve('this is p2')
})

let p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('this is p3')
	}, 3000)
})

let p4 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('err');
	}, 2000)
})
let p = Promise.race([p1, p2, p3, p4]);
p
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log('err' + err);
	})