const array = [1, 2, 3, 4, 2, 34, 53, 2]

var arrayUnique = array.reduce((unique, item) => {
  return unique.includes(item) ? unique : [...unique, item]
}, [])

// console.log(arrayUnique)

var unique = function(array) {
  return array.filter(function(value, index) {
    return array.indexOf(value) === index
  })
}

const uniqueES6 = array => {
  return array.filter((value, index) => {
    return array.indexOf(value) === index
  })
}

console.log(unique(array))
console.log(uniqueES6(array))
