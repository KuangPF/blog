let node = {
  type: 'Identifier',
  name: 'foo'
}

let { type, name, value } = node
console.log(type) // 'Identifier'
console.log(name) // 'foo'
console.log(value) // undefined
