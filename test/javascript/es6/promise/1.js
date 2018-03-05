/* let a = false;
let promise = new Promise((resolve, reject) => {
	if (a) {
		resolve('done');
	} else {
		reject('...')
	}
})

promise.then((res) => {
	console.log('done' + res);
}, (res) => {
	console.log('...' + res);
}); */

function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
}

timeout(1000).then((value) => {
	console.log(value);
});