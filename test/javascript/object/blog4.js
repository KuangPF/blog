var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2017
  },
  edition: {
    value: 1,
    writable: true,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newVal) {
      if (newVal > this._year) {
        this.edition += newVal - this._year;
      }
    }
  }
})
book.year = 2018;
console.log(book.edition); // 2
