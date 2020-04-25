---
title: React Hooks 讲解
summary: Ract Hooks 基本语法介绍 && 简单 demo 展示
date: 2020-04-25
issuesLink: https://github.com/KuangPF/blog/issues/11
order: 5
---
## 前言
这篇文章主要是对 React Hooks 基本的语法进行简单介绍，已经会用一些简单的 demo 来展示 React Hooks 的奇妙之处。

## Basic Hooks
### useState
`useState` 是为了让 function component 具有 class component `state` 功能，使用方法如下：
``` ts
function useStateDemo() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        click
      </button>
    </div>
  )
}
```
`useState` 接收一个初始化 `state` 值的参数，返回值为当前 `state` 以及更新 `state` 的函数。[demo](https://kuangpf.com/react-hooks-demo/#/basic/useState)

### useEffect

`useEffect` 的作用是执行一些副作用代码，比如 api 请求，DOM 元素修改等，它接收一个包含副作用代码的函数，该函数的返回值用于清除副作 `useEffect` 是 UI 已经渲染到屏幕上以后才会执行，因此副作用里面的代码是不会阻碍屏幕的渲染，与类组件相比，使用 `useEffect` 处理副作用后，屏幕会渲染地更快。

```ts
function useEffectDemo() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return <p>the innerWidth is {width}px</p>
}
```

上述例子监听浏览器窗口大小，当浏览器窗口发生改变时，将浏览器 innerWidth 的值显示在屏幕上。但这个例子存在一个问题：每当浏览器窗口发生改变，会调用 setWidth 从而引起 `render`，每次 `render` 后， React 都会清除上一次的 effect，并且运行本次渲染的 effect。相当于每次 `render` 的时候都会执行一遍 `useEffect` 中的副作用代码。显然我们不希望有这样无效的开销,那么怎么处理呢？
`useEffect` 第二个参数接收一个依赖数组，只有当依赖数组中的一项或者多项发生改变时才会重新执行 `useEffect` 中的副作用代码。那么可以这样修改：

```ts
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```
当传入一个 `[]` 时，表示 `useEffect` 只会执行一次，类似于 `componentDidMount`，但两者并不完全相等。[demo](https://kuangpf.com/react-hooks-demo/#/basic/useEffect)

## Additional Hooks