/* Promise 内部的错误不会影响到外部代码的运行，即我们通常说的 Promise 会吃掉错误 */

let catchSomeErr = function () {
	return new Promise((resolve, reject) => {
		resolve(x + 2);
	})
}

catchSomeErr()
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})

setTimeout(() => {
	console.log('err is gone')
}, 3000);