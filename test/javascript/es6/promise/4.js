let p1 = new Promise((resolve, reject) => {
	return resolve(1);
})

p1.then(res => {
	console.log(res);
})