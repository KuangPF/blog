/* 参数默认的暂时性死区 */

function add(first = second, second) {
  return first + second
}
console.log(add(1, 2)) // 3
console.log(add(undefined, 2)) // throws error
console.log(add(null, 2)) // 2
