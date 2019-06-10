const array = [1, 2, 3, 4, 2, 34, 53, 2]

var arrayUnique = array.reduce((unique, item) => {
  console.log(unique)
  return unique.includes(item) ? unique : [...unique, item]
}, [])

console.log(arrayUnique)