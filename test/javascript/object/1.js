var book = {};
Object.defineProperties(book, { // configurable, enumerable, writable默认为 false
	_year: {
		value: 2004,
		writable: true
	},
	edition: {
		value: 1,
		writable: true
	},
	year: {
		get: function () {
			return this._year;
		},
		set: function (newValue) {
			console.log(newValue);
			if (newValue > 2004) {
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
})
book.year = 2005;
console.log(book.edition);
console.log(book._year);
console.log(book.year);


/* var book = {
	_year: 2004,
	edition: 1
}
Object.defineProperty(book, 'year', {
	get: function () {
		return this._year;
	},
	set: function (newValue) {
		if (newValue > 2004) {
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
})
book.year = 2005;
console.log(book.edition);
console.log(book._year); */