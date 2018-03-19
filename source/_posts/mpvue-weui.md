---
title: 用 vue 写小程序，基于 mpvue 框架重写 weui
date: 2018-03-20 00:01:30
tags: [mpvue,vue,小程序]
summary: 上周美团开源了 mpvue 框架，他基于 Vue.js 的小程序开发框架，从底层支持 Vue.js 语法和构建工具体系。what，小程序可以用 vue 写了？简直有点不太敢确定，看了一下简介，没错，真的可以用 vue 开发小程序。真的是**限制了我的想象力，明白又该学写了，于是就开始准备利用这个框架写一点项目，感受一下他的魅力(其实是踩坑)。
---
# [mpvue-weui](https://github.com/KuangPF/mpvue-weui)

## 前言
上周美团开源了 [mpvue](https://github.com/Meituan-Dianping/mpvue) 框架，他基于` Vue.js` 的小程序开发框架，从底层支持 `Vue.js` 语法和构建工具体系。what，小程序可以用`vue`写了？简直有点不太敢确定，花了[5分钟](http://mpvue.com/mpvue/quickstart/)看了一下简介，没错，真的可以用`vue`开发小程序。真的是**限制了我的想象力，明白又该学写了，于是就开始准备利用这个框架写一点项目，感受一下他的魅力(其实是踩坑)。

## 重写 `WeUI`
俗话说，**第一个吃螃蟹的人，总要踩一些坑**（俗话有这么说过？）。[WeUI](https://weui.io/)是微信的官方 UI 库，在小程序中或者移动端使用的非常多，那么就有了一些想法:用 `mpvue` 重写 `WeUI`。

##  `mpvue-weui`是什么
也许 `mpvue-weui` 的内容不像它的名字那么高大上，它不是一个UI库（原谅我霸占了这么好的名字），其实它就是一个 `WeUI`的 demo 库，就像 [WeUI](https://weui.io/)一样，只不过是基于 `mpvue` 框架重写了一下。

## 重写目的
其实重写的目的就是看看`mpvue`好不好用，里面有哪些坑，然后将它写成[文档](https://kuangpf.github.io/mpvue-weui/#/)的形式，从而避免基于`mpvue`框架开发的人再次踩坑。

## 重写感受
当重写完了以后，发现最大的感受就是：

* 开发体验很棒，VSCode(IDE 自选)写代码，小程序开发工具开效果；
* 对小程序官方组件和 API 支持的非常完美；
* 快捷的 webpack 构建机制，开发过程中热更新.
* ...

这次主要是重写 `Weui`，可能在自定义组件交互方面还没涉及，比如可以使用`vuex`进行状态管理，或者将来要支持`vue-router`。总之很好用，为美团点赞。

## 重写效果

![](https://user-gold-cdn.xitu.io/2018/3/14/16224e73e631622d?w=381&h=670&f=png&s=12631)
![](https://user-gold-cdn.xitu.io/2018/3/14/16224e7707ec3aac?w=378&h=670&f=png&s=14440)
![](https://user-gold-cdn.xitu.io/2018/3/14/16224e7fae68699b?w=376&h=669&f=png&s=6951)
![](https://user-gold-cdn.xitu.io/2018/3/14/16224e81004b17b2?w=377&h=670&f=png&s=8907)

## 踩坑文档
[mpvue-weui 踩坑文档](https://kuangpf.github.io/mpvue-weui/#/)

tip: 文档会随着`mpvue`新语法或者新特性的更新而继续完善。

## 相关申明

1. 本项目[mpvue-weui](https://github.com/KuangPF/mpvue-weui)主要使用了 [weui-wxss](https://github.com/Tencent/weui-wxss) 中的相关文件，主要目的在于交流学习，如果冒犯了相关的开源协议，实属抱歉。
2. 这篇文档是自己在重写了 `WeUI` 以后记录的，如果有说的不对的地方还希望各位大佬指出，一起学习。



