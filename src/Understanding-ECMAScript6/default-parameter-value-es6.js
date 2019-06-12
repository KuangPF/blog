// ES6 中，arguments 反映函数初始调用状态
function mixArgs(first, second = 'b') {
  console.log(first === arguments[0]) // true
  console.log(second === arguments[1]) // false
  first = 'c'
  second = 'd'
  console.log(first === arguments[0]) // false
  console.log(second === arguments[1]) // false
}

mixArgs('a')
