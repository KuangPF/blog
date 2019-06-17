# 第 7 章 Set 与 Map

1. Object.create(null)
使用 `Object.create(null)` 创建了一个空对象，该对象上没有任何继承属性，比如没有 `toString` 方法，因此可以当作一个干净且高度可定制的对象来使用，例如在 ES5 中用它来模拟 `Set` 与 `Map`。