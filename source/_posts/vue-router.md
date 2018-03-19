---
title: vue-router 的一些记录
date: 2018-02-24 17:38:06
tags: [vue]
summary: 一直对 vue-router 有点敬畏之心，因为总感觉对他的理解模模糊糊的，今天看了一下官网文档，有了一点点的理解，时来兴起，就有了这篇文章。
---
一直对**vue-router**有点敬畏之心，因为总感觉对他的理解模模糊糊的，今天看了一下官网文档，有了一点点的理解，时来兴起，就有了这篇文章。
### vue-router 传参
在使用 vue-router 进行页面跳转的时候，有以下两种方式可以实现：
* `<router-link>Home</router-link>`---声明式

``` html
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```
* `router.push(...)`---编程式

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

``` javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
<p class="tip">注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：</p>

``` javascript
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

这两种方式传递参数的方式其实是一样的，从写法也可以大致看出，下面就对参数的传递方式进行介绍
首先创建一个Router实例
``` javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
```
#### 1.使用params方式
``` javascript
router.push({ name: 'user', params: { userId: 123 }}) // -> /user
```
获取参数:
``` javascript
router.params.userId  //123
```
<p class="tip">这种方式看上去不错，对于传递的参数没有在浏览器的地址栏显示，而是隐藏了。但是当我们再次刷新的时候,`router.params.userId`就变成了`undefined`，对于这个解决方法如下:</p>
修改Router实例，在路由路径上增加该参数
``` javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
此时，浏览器的地址栏就会变成:/user/123,然后不管怎么刷新也会取到参数。其实使用`query`方式传递参数也可以避免这个问题。

#### 2.使用query方式

``` javascript
router.push({ path: '/user', query: { userId: 123 }}) // ->/user?userId=123
```
获取参数:
``` javascript
router.query.userId  //123
```