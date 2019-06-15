let node = {
    type: 'Identifier',
    name: 'foo'
  },
  type = 'Literal',
  name = 5;

({ type, name } = node)
console.log(type, name)
