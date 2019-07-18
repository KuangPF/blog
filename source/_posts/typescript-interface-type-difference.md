---
title: TypeScript 中，interface 和 Type 的区别
summary:
date: 2019-07-18
issuesLink: https://github.com/KuangPF/blog/issues/13
---

在 `TypeScript` 中，`interface` 和 `type` 主要用于类型的声明，它们的相同点以及区别如下：

### 相同点

✅ 都可以描述一个对象或者函数

```ts
/* interface */
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): string
}
```

```ts
/* type */
type User = {
  name: string
  age: number
}

type SetUser = {
  (name: string, age: number): string
}
```

✅ 都可以进行拓展

```ts
interface User {
  name: string
  age: number
}
type VipUserType = {
  readonly vip: boolean
}

interface ProUser extends User {
  email: string
}

/* interface 和 type 拓展*/
interface VipUserInterfce extends VipUserType {
  member: boolean
}
```

```ts
type User = {
  name: string
  age: number
}

type ProUser = User & {
  email: string
}

interface VipUserInterfce {
  readonly vip: boolean
}

/* type 与 interface 拓展 */
type VipUserType = VipUserInterfce & {
  member: boolean
}
```

### 区别

⚠️`type` 可以声明基本类型别名，联合类型，元组类型，而 `interface` 不可以

```ts
/* 基本类型 */
type Name = string

/* 联合类型 */
interface Dog {}
interface Cat {}

type Pet = Dog | Cat

/* 元组类型 */

type PetList = [Dog, Cat]
```

⚠️`interface` 可以进行类型合并，而 `type` 不可以

[关于 declaration-merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
```ts
interface Cloner {
  clone(animal: Animal): Animal
}

interface Cloner {
  clone(animal: Sheep): Sheep
}

interface Cloner {
  clone(animal: Dog): Dog
  clone(animal: Cat): Cat
}

// 以上三个 interface 会被合并成一个声明
interface Cloner {
  clone(animal: Dog): Dog
  clone(animal: Cat): Cat
  clone(animal: Sheep): Sheep
  clone(animal: Animal): Animal
}
```
