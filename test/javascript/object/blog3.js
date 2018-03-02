'use strict'
var book = {
	_year: 2004,
	edition: 1
}

Object.defineProperty(book, 'year', {
	get: function () {
		return this.year;
	},
	set: function (newVal) {
		if (newVal > this._year) {
			this._year = newVal;
			return this.edition += newVal - 2004;
		}
	}
})
book.year = 2005;
console.log(book.edition); // 2
console.log(book.year);