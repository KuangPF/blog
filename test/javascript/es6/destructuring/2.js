// 对象解构

/* let {
  foo,
  bar
} = {
  bar: 'bbb',
  foo: 'aaa'
};
console.log(foo, bar); */

// 变量名与属性名不一致

/* let {foo:f,bar:b} = {foo:'aaa',bar:'bbb'};
console.log(f); */

let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x,y);