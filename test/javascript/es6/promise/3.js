let promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error('fail'))
	}, 3000)
})

let promise2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(promise1)
	}, 1000);
})

promise2
	.then(res => {
		console.log(res);
	})
	.catch(error => {
		console.log(error);
	})

// promise2 在 1s 后变成 resolve 状态，但是 promise2 的返回值是另一个Promise对象 promise1 ，所以造成 promise2 无效，由 promise1 的状态决定 promise2的状态，后面的then语句都变成针对promise1，3s后promise2的状态变成 reject ，导致触发catch方法指定的回调函数。