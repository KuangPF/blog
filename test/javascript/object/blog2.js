
var person = {};
Object.defineProperty(person, 'name', {
	configurable: false,
	value: 'Nicholas'
})
console.log(person.name); // Nicholas
/* delete person.name;
console.log(person.name); // Nicholas */
Object.defineProperty(person, 'name', {
	writable: true
})