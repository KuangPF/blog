var receiver = {},
supplier = {
  get name() {
    return "file.js"
  }
}

Object.assign(receiver, supplier);

var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");

console.log(descriptor.value); // "file.js"
console.log(descriptor.get); // undefined