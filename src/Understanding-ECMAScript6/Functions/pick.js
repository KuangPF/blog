/* pick */
function pick(obj, ...keys) {
  let result = Object.create(null)
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = obj[keys[i]]
  }
  return result
}

let book = {
  title: 'understanding ES6',
  author: 'nzakas',
  year: 2015
}

console.log(pick(book, 'year', 'author'))

// arguments 总能正确反映函数调用时传入的参数，不受剩余参数的影响
function checkArgs(...args) {
  console.log(args.length)
  console.log(arguments.length)
  console.log(args[0], arguments[0])
  console.log(args[1], arguments[1])
}

checkArgs(1, 2)
