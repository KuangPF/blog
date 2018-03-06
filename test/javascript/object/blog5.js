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

/* var descriptor1 = Object.getOwnPropertyDescriptor(book, '_year');
console.log(descriptor1.value); // 2017
console.log(descriptor1.configurable); // false
console.log(typeof descriptor1.get); // undefined */

var descriptor2 = Object.getOwnPropertyDescriptor(book, 'edition');
console.log(descriptor2.value); // 1
console.log(descriptor2.configurable); // false
console.log(descriptor2.writable); // true

/* var descriptor3 = Object.getOwnPropertyDescriptor(book, 'year');
console.log(typeof descriptor3.value); // undefined
console.log(descriptor3.enumerable); // false
console.log(typeof descriptor3.get); // function
console.log(typeof descriptor3.set); // function */