---
title: Why React Hooks
summary: Why React Hooks
date: 2020-05-04
issuesLink: https://github.com/KuangPF/blog/issues/17
order: 5
---
React Hooks 是 React 16.8 版本的新增特性，那么为什么会有 Hooks 产生？任何一项新的技术总是为了解决当前开发中的某一些痛点，而不是无故地重复造轮子，下面我们从两个场景来进行一定的讲解，本文中所有代码均可在 [react-hooks-demo](https://github.com/KuangPF/react-hooks-demo) 查看。

### 场景
#### API 请求
在实际开发过程中，我们有这样一个需求，页面请求一个详情接口，并将 UI 渲染出来：
``` ts
class GithubProfile extends React.PureComponent<IProps, IStates> {
  state: IStates = {
    profile: {}
  }

  componentDidMount() {
    fetch('https://api.github.com/users/gaearon')
      .then(response => {
        return response.json()
      })
      .then(res => {
        this.setState({
          profile: res
        })
      })
  }
  
  render() {
    const { profile } = this.state
    return (
      <div className="profile">
        <img src={profile.avatar_url} alt="avatar" width="200px" />
        <div>name: {profile.name}</div>
        <div>company: {profile.company}</div>
        <div>bio: {profile.bio}</div>
      </div>
    )
  }
}
```
我们可以得到这样的结果：
![github-profile](https://user-images.githubusercontent.com/20694238/80940985-d2c6fb00-8e13-11ea-9d49-7a164724844b.png)
我们进一步思考一个问题：如果其它页面也有相同的需求，或者数据一样，仅仅 UI 不一样，那么我们该怎么处理？其实这个问题目的很简单，那就是：**如何实现代码复用**。
在 Hooks 之前，我们对于代码复用的解决办法一般有两种，[高阶组件(HOC)](https://zh-hans.reactjs.org/docs/higher-order-components.html) 和 [Render Props](https://zh-hans.reactjs.org/docs/render-props.html)。我们先用已有技术来解决，首先用 HOC 实现：
``` ts
// withGithubProfile
const withGithubProfile = (WrappedComponent:any) => {
  return class extends React.Component<IProps, IStates> {
    constructor(props:IProps) {
      super(props)
      this.state = {
        profile: {}
      }
    }
    
    componentDidMount() {
      fetch('https://api.github.com/users/gaearon')
        .then(response => {
          return response.json()
        })
        .then(res => {
          this.setState({
            profile: res
          })
        })
    }
    
    render() {
      const { profile } = this.state
      return <WrappedComponent profile={profile} {...this.props} />
    }
  }
}
```
引入高阶组件，使用其 `profile` Props：
``` ts
class GithubProfileHoc extends React.Component<IProps, IStates> {
  render() {
    const { profile } = this.props
    return (
      <div className="profile">
        <img src={profile.avatar_url} alt="avatar" width="200px" />
        <div>name: {profile.name}</div>
        <div>followers: {profile.followers}</div>
        <div>following: {profile.following}</div>
      </div>
    )
  }
}

export default WithGithubProfile(GithubProfileHoc)
```
然后使用 Render Props 实现：
``` ts
// Render Props
class Profile extends React.Component<IProps, IStates> {
  constructor(props:IProps) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users/gaearon')
      .then(response => {
        return response.json()
      })
      .then(res => {
        this.setState({
          profile: res
        })
      })
  }

  render() {
    const { profile } = this.state
    return <React.Fragment>{this.props.children(profile)}</React.Fragment>
  }
}

```
定义 props 渲染函数：
``` ts
class ProfileRenderProps extends React.PureComponent {
  render() {
    return (
      <Profile>
        {(profile:any) => (
          <div className="profile">
            <img src={profile.avatar_url} alt="avatar" width="200px" />
            <div>name: {profile.name}</div>
            <div>company: {profile.company}</div>
            <div>bio: {profile.bio}</div>
          </div>
        )}
      </Profile>
    )
  }
}
```
以上两种方式的确可以实现代码复用，但这两种方式也存在一定的缺点：
HOC：
* 使用多个高阶组件时，无法确定 props 来源
* 相同的 props 会存在覆盖的情况
* 增加调试难度

Render Props
* 地狱回调

除此之外，这两种方式都应引入了复杂的编程模式，在代码维护以及理解方面不是很友好。

#### input 输入
紧接着我们看另外一个场景，有一个 input 框，`onChange` 时获取输入框的值，使用 `Class` 实现如下：
``` ts
class Input extends React.Component<IProps, IStates> {
  state: IStates = {
    name: ''
  }

  handleOnchange = (e:any) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <p>input name: {name}</p>
        <input value={name} onChange={this.handleOnchange} />
      </div>
    )
  }
}
```
我们又继续扩展，如果还有一个类似的 input 框，那么怎么实现呢？代码复制还是使用 Hooks 呢 😊

### why hooks

以上两种场景或者类似场景在开发过程中比较比较常见，我们有没有更好的方式来实现代码复用。我们很容易想到使用函数来实现代码复用，例如在项目中我们会将一公共的方法抽离出来，例如封装 api 请求的 `request.js`。有同学可能就会有疑问，React 不是提供了 function 组件？React 的确提供了 function 组件，但在 React 16.8 之前 function 有两个问题：
* function 组件不得不返回一些 UI 信息，即 JSX 代码
* function 组件内部不能拥有 state

正是由于这些问题，React 团队提出了 Hooks 思想，并在 React 16.8 中新增了 React Hooks 特性。说了这么久，那么到底什么是 React Hooks？简单总结一下有以下两点：
* Hooks 让函数式组件拥有类组件一样的功能，state ，lifecycle 以及 context。
* Hooks 不是 React 的新功能，可以将它理解为一个“钩子”，可以让你在不写类组件的情况下“勾住”React 的所有功能。

### 使用 React Hooks 实现
> 这篇文章不会讲解 hooks 具体内容，详细内容可在[React Hooks 讲解](https://kuangpf.com/blog/2020/04/25/react-hooks/)中查看。

#### usePropfile
使用 Hooks 实现 API 请求：[useProfile](https://kuangpf.com/react-hooks-demo/#/custom-hooks/useProfile)
``` ts
// usePropfile
const usePropfile = () => {
  const [profile, setProfile] = useState({} as TProfile)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.github.com/users/gaearon')
      .then(response => {
        return response.json()
      })
      .then(res => {
        setProfile(res as TProfile)
        setIsError(false)
        setLoading(false)
      }).catch(()=> {
        setIsError(true)
        setLoading(false)
      })
  }, [])

  return { profile, loading,isError }
}
```
使用 `usePropfile` Hooks：
``` ts
const UseProfilePage = () => {
  const { profile, loading, isError } = useProfile()
  return (
    <React.Fragment>
      {isError ? (
        <div>Network Error...</div>
      ) : (
        <div className="profile">
          {loading ? (
            <div>loading profile...</div>
          ) : (
            <React.Fragment>
              <img src={profile.avatar_url} alt="avatar" width="200px" />
              <div>name: {profile.name}</div>
              <div>company: {profile.company}</div>
              <div>bio: {profile.bio}</div>
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  )
}
```
`usePropfile` hooks 返回了请求结果 `profile`，请求状态 `loading`，以及网络状态 `isError`。然后以函数调用的方式使用 Hooks，这样代码结构看起来很清晰，后期维护也很方便。

#### useInput
继续使用 Hooks 实现 input 输入逻辑：[useInput](https://kuangpf.com/react-hooks-demo/#/custom-hooks/useInput)
``` ts
const useInput = (initialValue:string) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e:any) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}
```
引入 `useInput`：
``` ts
const useInputDemo = () => {
  const value = useInput('KuangPF')

  return (
    <div className="use-input">
      <p>current name: {value.value}</p>
      <input {...value} />
    </div>
  )
}
```
通过以上两个 Hooks可以看出，React Hooks 功能的确强大，在逻辑复用方面比 HOC 以及 Render Props 更具优势，在代码维护上也更加清晰。