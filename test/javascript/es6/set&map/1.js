/* let s = new Set();
[1, 2, 3, 4, 5, 23, 1, 2, 5, 78, 2, 1, 2].forEach(x => {
	s.add(x);
})
console.log(s); */

/* const set = new Set([1, 2, 3, 4, 4, 3]);
console.log(Array.from(set)); // [1, 2, 3, 4] */

/* let s = new Set();
s.add(5);
s.add('5');
console.log(s); */

const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
console.log(map);