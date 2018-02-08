---
title: vue 组件间通信
date: 2018-02-08 10:04:27
tags: vue
summary: 最近在学习vue方面的的知识，毫无疑问，对于vue来说，组件化是其一个很大的特点，一方面可以提高代码的可读性，另一方面可以少写很多的代码，利于代码的维护。对于组件之间数据通信是一个必须要掌握的知识点，通信之间的方式一共可以分为三种，父组件与子组件，子组件与父组件，同级组件间通信。
---
最近在学习vue方面的的知识，毫无疑问，对于vue来说，组件化是其一个很大的特点，一方面可以提高代码的可读性，另一方面可以少写很多的代码，利于代码的维护。对于组件之间数据通信是一个必须要掌握的知识点，通信之间的方式一共可以分为三种，父组件与子组件，子组件与父组件，同级组件间通信。
### 父组件与子组件
在vue中，父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。
<img src="/img/vue-components-bus-01.png">
父组件
``` vue
<template> 
     <div class="components-bus-container">
        <children-one :fatherDataOne="fatherDataOne"></children-one>
     </div> 
</template>

<script>
export default {
    data() {
        return {
            fatherDataOne: '',
        };
    },
}
</script>
```
子组件
``` vue
<template>
    <div class="children-one-content">
        <div>{{fatherDataOne}}</div>
    </div>
</template>

<script>
export default {
    data() {
    },
    props: ['fatherDataOne']
}
</script>
```
<p class='tip'>`:fatherDataOne`为数据绑定写法，可以灵活的进行数据设置，如果直接绑定数据，写成`fatherDataOne="someData"`即可</p>
### 子组件与父组件通信
对于子组件将数据传给父组件，是通过`$emit`事件来实现的，在图中也可以体现，具体实现如下：
子组件
``` vue
<template>
    <div class="children-one-content">
        <div>{{fatherDataOne}}</div>
        <div @click="tellParent">点击传递数据</div>
    </div>
</template>

<script>
export default {
    data() {
    },
    props: ['fatherDataOne']，
    methods: {
        tellParent() {
          this.$emit('listenOne', 'from childrenOne');
        }
    }
}
</script>
```
父组件
``` vue
<template> 
     <div class="components-bus-container">
        <children-one :fatherDataOne="fatherDataOne" @listenOne='getCompomentOne'></children-one>
     </div> 
</template>

<script>
export default {
  data() {
      return {
          fatherDataOne: '',
      };
  },
  methods: {
    getCompomentOne(param) {
      console.log(param);
    }
  }
}
</script>
```
在父组件中绑定一个`listenOne`的事件，然后给这个事件添加`getCompomentOne`方法，当子组件children-one通过点击事件`tellParent`触发`listenOne`的时候，父组件里面的`getCompomentOne`方法就会执行，并且数据通过参数的形式传递给父组件，从而实现通信的功能。

### 同级组件间通信
对于同级间组件进行通信处理的方法是，新建一个Vue实例作为事件总线，具体实现如下：
1.需要进行通信的同级组件引入`event.js`
``` javascript
	import Vue from 'vue'; 
	let bus = new Vue(); 
	export default bus; 
```
2.组件`children-one`通过点击事件`sendMsgToTwo`触发`dataFromOne`
children-one
``` vue
<template>
    <div class="children-one-content">
        <div>{{fatherDataOne}}</div>
        <div @click="tellParent">点击向父组件通信</div>
        <div @click="tellChildTwo">点击向子组件2通信</div>
    </div>
</template>

<script>
import bus from 'path/event'
export default {
  data() {
  },
  props: ['fatherDataOne']，
  methods: {
    tellParent() {
      this.$emit('listenOne', 'from childrenOne');
    },
    tellChildTwo() {
      bus.$emit('dataFromOne', 'dataFromOne');
    }
  }
}
</script>
```
3.组件`children-two`中监听事件 `dataFromOne`
children-two
``` vue
<template>
    <div class="children-two-content">
    </div>
</template>

<script>
import bus from 'path/event'
export default {
  data() {
  },
  methods: {
    getMsgFromOne() {
      bus.$on('dataFromOne', data => {
        console.log(data);
      });
    }
  },
  mounted() {
    this.getMsgFromOne();
  }
}
</script>
```
当`children-one`触发`dataFromOne`时，组件`children-two`中的监听事件`dataFromOne`就会被触发，数据通过参数的形式传入，从而实现同级组件间通信。

### 扩展
##### 1.父组件操作子组件的方法
利用$refs实现这个功能
父组件
``` vue
<children-one :fatherDataOne="fatherDataOne" @listenOne='getCompomentOne' ref="childrenOne"></children-one>
```
那么就可以通过`this.$refs.childrenOne.childenFunction()`来操作子组件中的方法。
##### 2.父组件将数据传给子组件，出现`undefined`情况
当父组件传递的数据是异步取值的时候，可能出现首先传过去是空值，然后异步刷新。对于这种情况处理的方法是`v-if`，当父组件拿到数据后，将其设置为true，从而避免undefined的情况。
 
### 高级用法
对于一些简单的组件间的通信个人觉得这些方式够用了，如果一个页面涉及到很多的组件，那么也许这种方法不是那么简洁了，这是就需要用到`vue`中很重要的一个插件了`vuex`,以下为官网对`vuex`的介绍：
[vuex](https://vuex.vuejs.org/)是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：

> Flux 架构就像眼镜：您自会知道什么时候需要它。

本文简单介绍了`vue`组件间的通信方式，如有错误，还望指出，大家一起交流学习。



