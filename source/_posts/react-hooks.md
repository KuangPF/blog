---
title: React Hooks 讲解
summary: Ract Hooks 基本语法介绍 && 简单 demo 展示
date: 2020-04-25
issuesLink: https://github.com/KuangPF/blog/issues/16
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


### useContext

`useContext` 是为了在 function 组件中使用类组件的 [context](https://reactjs.org/docs/context.html) API，使用方法很简单，首先创建一个 context：
``` ts
const local = '🇨🇳'
const ThemeContext = React.createContext(local)
```
然后在 `useContext` hook 使用 context

``` ts
function UseContextDemo() {
  const local = useContext(ThemeContext)
  return (
    <div>
      <p>local: {local}</p>
    </div>
  )
}
// render: 🇨🇳
```
在 class 组件中，如果想要修改 context 的值，我们会使用 Provider 来首先，同样，在 function 组件中也可以：
``` ts
const ThemeContext = React.createContext('🇨🇳')

function Context() {
  const local = useContext(ThemeContext)
  return <p>local: {local}</p>
}

function App() {
  return (
    <ThemeContext.Provider value={'🇺🇸'}>
      <Context />
    </ThemeContext.Provider>
  )
}
// render: 🇺🇸
```

## Additional Hooks

### useReducer
useReducer 是` useState` 的一种代替方案，用于 state 之间有依赖关系或者比较复杂的场景。useReducer 接收三个参数：

- reducer：`(state, action) => newState`
- initialArg： 初始化参数
- Init： 惰性初始化,返回初始化数据

返回当前 state 以及配套的 dispatch 方法。首先看下 useReducer 处理简单的 state：

```ts
function UseReducerDemo() {
  const [count, dispatch] = useReducer(state => {
    return state + 1
  }, 0)

  return (
    <div>
      <p>count: {count}</p>
      <button
        onClick={() => {
          dispatch()
        }}
      >
        add
      </button>
    </div>
  )
}
```

这个例子和使用 `useState` 一样，都达到了计数的效果。 该例子中，useReducer 初始化了 `count` 值为 0，传入的 reducer 很简单，当接收到一个 dispatch 时，将 `count` 的值增加 1。

接下来我们看 useReducer 如何处理 state 有相互依赖的场景，还是从一个 demo 开始：

```ts
const CountApp = () => {
  const [count, setCount] = useState(0)
  const [frozen, setFrozen] = useState(false)

  const increase = () => {
    setCount(prevCount => {
      if (frozen) {
        return prevCount
      }
      return prevCount + 1
    })
  }

  useEffect(() => {
    increase()
    setFrozen(true)
    increase()
  }, [])

  return <p>count {count}</p>
}
```

在副作用中，我们执行 `increase` 先将 `count` 的值增加 1，然后执行 `setFrozen` 将 `count` 的值 "冻住"，再执行 `increase` 将 `count` 的值增加 1，由于在 `setCount` 进行了判断，如果 `frozen` 为 `true`，则直接返回，否则增加 1，按照这样的思路，最后 count 的值应该为 1，但是事实上屏幕输出的是 2，为什么会出现这样的结果？

原因在于 function 组件的更新机制，当引入 hooks 以后，function 组件也拥有了 state 的功能，当我们 setState 时，UI 会重新渲染，但在这个过程中，有一点需要我们注意是：
**function 组件中，state 以及 props 都是静态值，不存在引用，或者也可以理解为 state 和 props 是一个 capture value，每次渲染的 state 和 props 都是独立的。**

关于这点，可以查看 [a-complete-guide-to-useeffect](https://overreacted.io/a-complete-guide-to-useeffect) 了解更多。

在这个例子中，由于 `useEffect` 传入的依赖为 `[]`，即该副作用只会在 UI 第一次渲染结束后执行一次。而在这次 `render` 中，`count` 的值为 0， `frozen` 值为 `false`，所以第二次执行 `increase` 时，`frozen` 值依然为 `false`， `setCount` 返回的 `prevCount` 为 1 ，然后增加 1，这也就是为什么最后 `render` 的结果为 2，而不是 1。

对于 state 有相互依赖的情况，我们可以用 useReducer 来处理

```ts
const INCREASE = 'INCREASE'
const SET_FROZEN = 'SET_FROZEN'

const initialState = {
  count: 0,
  frozen: false
}

const CountApp = () => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case INCREASE:
        if (state.frozen) {
          return state
        }
        return {
          ...state,
          count: state.count + 1
        }

      case SET_FROZEN:
        return {
          ...state,
          frozen: action.frozen
        }
      default:
        return state
    }
  }
  const [state, dispath] = useReducer(reducer, initialState)

  useEffect(() => {
    dispath({ type: INCREASE })
    dispath({ type: SET_FROZEN, frozen: true })
    dispath({ type: INCREASE })
  }, [])

  return <p>current count: {state.count}</p>
}
```
当我们使用 useReducer 后，将 `count` 和 `frozen` 关联起来，执行 `dispath({ type: SET_FROZEN, frozen: true })` 修改了 `frozen` 值 ，紧接着执行 `dispath({ type: INCREASE })` 时，此时获取到的 `frozen` 值为 `true`，当然最后 `render` 结果就为 1 。

前面说了 useReducer 是 useState 的一种代替方案，那么如何使用 useState 实现呢，思路一样，只要将 count 与 frozen 放在一个 state 中即可解决：

``` ts
const CountApp = () => {
  const [state, setState] = useState({
    count: 0,
    frozen: false,
  });

  const increase = () => {
    setState(prevState => {
      if (prevState.frozen) {
        return prevState;
      }
      return {
        ...prevState,
        count: state.count + 1,
      };
    });
  };

  const setFrozen = () => {
    setState(prevState => {
      return {
        ...prevState,
        frozen: true,
      };
    });
  };

  useEffect(() => {
    increase();
    setFrozen();
    increase();
  }, []);

  return <p>current count: {state.count}</p>;
  // render：1
};
```
useReducer 和 useState 相比，优势在于可以将使用 render 将一些逻辑进行抽离，进行集中化管理。


### useCallback

useCallback 可以理解为将函数进行了缓存，它接收一个回调函数和一个依赖数组，只有当依赖数组中的值发生改变时，该回调函数才会更新。

```ts
function UseCallbackDemo() {
  const [count, setCount] = useState(0)

  const handleResize = useCallback(() => {
    console.log(`the current count is: ${count}`)
  }, [count])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        click
      </button>
      <p>current count: {count}</p>
    </div>
  )
}
```
该例子中，当改变 count 后，然后改变浏览器窗口大小，可以获取到最新的 count 。如果传入的依赖为 []，handleResize 不会更新，则改变浏览器窗口时， count 的值始终为 0 。