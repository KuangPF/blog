var pageHander = {
  id: 123456,
  init: function() {
    console.log(this.id)
  }
}

function createArrowFunctionReturningFirstArgument() {
  return () => arguments[0]
}

var arrowFunction = createArrowFunctionReturningFirstArgument(5)
console.log(arrowFunction())