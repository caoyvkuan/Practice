# SPA and 路由

+ 单页 Web 应用 (single page web application , SAP)
+ 整个应用只有一个完整的页面
+ 不会刷新页面,只会局部刷新
+ 所有的数据都通过 ajax 来获取,并异步呈现

## 路由

+ 什么是路由
  + 路由 key - value 的映射关系
  + path - component 的对应关系
  + key 一直都为路径, value 可能是 function 或是 component

+ 路由的分类
1. 后端路由
   + value 就是 function 用来处理客户端的请求
   + 注册路由 : `router.get(path,function(req,res){})`
   + 当 node 接受到一个请求,会根据请求的路径来对路由进行匹配,调用对应路由中的函数来进行处理

2. 前端路由
   + 浏览器路由, value 是 component , 用来展示页面内容
   + 注册路由 : `<Router path='/test' component={Test}>`
   + 当路径改变时,就会调用对应的组件来进行展示
+ 利用了浏览器的 BOM 对象中的 history 来进行实现
+ history 是一个栈的结构,每一次路径变化都会被推入栈中
+ 前进就会推入 , 后退就会取出 , 还有一个替换的动作, 替换后就无法回退了

+ 在使用路由时要注意相对路径的问题
+ 相对路径可能会导致路径层级错误,请求资源错误
+ 解决方式
  1. 使用绝对路径
     + 将 './path' 改为 '/path' 这样就是绝对路径了
  2. 使用 '%PUBLIC_URL%/path'
  3. 使用 HashRouter , 因为路径 #号 后的都不会向服务器请求


# React 路由

+ react-router 有三种实现方式,针对不同的使用场景
  + react-router : 通用
  + react-router-dom : 针对 web 的路由实现
  + react-router-native : 针对移动端
  + react-router-config : 路由配置
+ `yarn add react-router-dom`

## 路由匹配规则

+ Link 给路径 to : path
+ Route 匹配路径 path : path

+ 精准匹配 `<Route exact>` exact 开启严格匹配
+ 需要时在开启,有时候会影响 二级路由 的使用
+ path : '/home'
  + to : '/home/a/b' path : 不能匹配
  + to : '/home' path : 能够匹配

+ 模糊匹配 path : '/home'
  + to : '/home/a/b'  path : 能够匹配到
  + to : '/a/home/b'  path : 不能匹配到, 路径的顺序要对

## 嵌套路由

+ 多级导航的应用,如:
+ Home       : '/Home'
  + about    : '/Home/about'
    + react  : '/Home/about/react'
    + router : '/Home/about/router'
  + message  : '/Home/message'
    + news   : '/Home/message/news'
    + dome   : '/Home/message/dome'
+ Page     : '/Page'
  + main   : '/Page/main'
  + header : '/Page/header'

+ react 路由匹配规则
  + 由 Route 注册的路由组件是有先后顺序的
  + 每次点击 Link 链接都会从一开始注册的路由组件进行匹配

+ 使用多级路由时 : 
  + 导向路径需要加上一级的路径 path
  + 且需要进行模糊匹配

## 路由跳转模式

+ push : 将当前的路径存入历史记录中
  + 当前页面的路径就在历史记录的最上方
  + 默认的路由模式

+ replace : 替换当前的路径,不会压入历史记录中
  + 设置 Link 的 replace 属性开启 replace 模式

## 编程式路由导航

+ 只有路由组件才有 history 对象
+ 也就是利用 history 对象中的方法来操作路由
```jsx
<Link to="/Home/id/name">自动跳转</Link>

const {history:{replace}} = props;
props.history.replace('/Home/id/name',{state : '参数'});
// 使用 history 中的方法进行跳转
```

# react-router-dom

+ [参考链接](https://react-router.docschina.org/web/guides/philosophy)
```js
// using ES6 modules
import { BrowserRouter, Route, Link } from "react-router-dom";

// using CommonJS modules
const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Link = require("react-router-dom").Link;
```

+ 在 router 中利用路由链接来切换组件

+ 有两种路由器 底层原理不一样
  + HashRouter  哈希值路由 : 在链接后会有 # 号, # 号后的数据不会发送给服务器
    + 静态文件服务器使用 HashRouter
    + 利用锚点 和 URL的哈希值实现
    + 刷新会造成 state 数据丢失,因为 state 利用 history PAI 保存数据
    + 可以解决一些路劲错误的问题
  + BrowserRouter  浏览器路由
    + 可以响应请求的服务器使用 BrowserRouter
    + 使用的是 H5 的 history API 实现,不兼容 IE9 以下的版本
    + 刷新不会造成 state 数据丢失

+ 两种路由的匹配组件： `<Route> 和 <Switch>` 。
+ `<Route>`
  + 路由匹配是通过比较 `<Route>` 的 path 属性和当前地址的 pathname 来实现的。
  + 当一个 `<Route>` 匹配成功时，它将渲染其内容，当它不匹配时就会渲染 null。
  + 没有路径的 `<Route>` 将始终被匹配。
  + 在 BrowserRouter 路由器内部可以在任何位置定义 `<Route>` ,且可以并列定义多个
+ `<Switch>`
  + `<Switch>` 用于将 `<Route>` 分组。分组不是必须的,但是通常会很有用
  + 一个 `<Switch>` 会遍历其所有的子 `<Route>` 元素，并仅渲染与当前地址匹配的第一个元素。
  + 这有助于多个路由的路径匹配相同的路径名，当动画在路由之间过渡，且没有路由与当前地址匹配（所以你可以渲染一个 “404” 组件）。
  + 也就是可以在 `<Switch>` 最后定义一个 动画过渡组件
```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* 当路由路径没有匹配的时候就会显示最后一个没有设置路径的 当做 404 使用 */}
  <Route component={NoMatch} />
</Switch>
```

## 基本使用

```js
// 引入方式
import { BrowserRouter, Route, Link } from "react-router-dom";

// 因为只有 路由链接和路由组件使用同一个路由器才能够实现路由跳转
<BrowserRouter>
   {/* 利用路由器包裹 app */}
   <App />
</BrowserRouter>

// 路由链接
<Link to="/nav">Nav</Link>
<Link to="/content">Content</Link>

// 路由组件
<Route path="/nav" component={Nav} />
<Route path="/content" component={Content} />

// 一般组件
<Nav />
// 路由组件一般放在 pages 文件夹中
// 一般组件就放在 component 文件夹中
```

## 路由组件和一般组件的区别

1.写法不同:
   + 一般组件: `<Nav />`
   + 路由组件: `<Route path="/nav" component={Nav} />`

2.存放位置不同:
  + 一般组件: 存放在 component 文件夹中
  + 路由组件: 存放在 pages 文件夹中

3.接受到的 props 不同:
  + 一般组件: 在写标签时传递了什么,就能接受到什么
  + 路由组件: 会接受到三个固定的属性
    + 三个属性的一些重要参数
    + history :
      + go : f go(n)  // n:number : 1 前进一步, -1 后退一步
      + goBack : f goBack()
      + goForWard : f goForWard()
      + push : f push(path, state)
      + replace : f replace(path, state)
    + location :
      + pathname : "/about"
      + search : ""
      + state : undefined
    + match :
      + params : {}
      + path : "/about"
      + url : "about"

## 传递参数

+ 使用 BrowserRouter 时
  + 三个方式传递的参数在页面刷新时都不会丢失
  + 因为页面的 history 会帮助记录历史记录

1. 方式一 : 向路由组件传递 params
   + ``<Link to={`/home/${id}/${参数}`}>``
   + `<Link to="/home/id/title">`
   + 声明接收 params 参数
   + `<Route path"/home/:id/:title" component={Home}>`
   + 这样就可以在 props 中接收到参数
   + 数据储存在 : 'props.match.params' 对象中

2. 方式二 : 传递 search 参数
   + search 无需声明接收
   + 数据储存在 : `props.location.search`
   + 采用字符串分割的方式 : 利用 & 分割每一个数据,利用 = 分割 key 和 value
   + 或是利用 : querystring js库 自动转化为对象
```jsx
import qs from 'querystring';

<Link to={`/home/?id=${id}&title=${参数}`} />
// ?id=value&title=value  这种格式是 urlencoded

// 取出数据 : slick(1) 用来吧多余的 ? 删除
const {id,title} = qs.parse(props.location.search.slick(1))
```

3. 方式三 : 传递 state 参数 , 不会吧数据暴露在地址栏中
   + state 无需声明接收
```jsx
<Link to={{
   pathname:'/home',
   state:{id:1,name:'nice'}
}} />

// 接收 state 参数
const {id, name} = props.location.state || {}; 
// || {} 是为了防止页面清除缓存后对象丢失取值失败而报错
```

## router API

### <BrowserRouter>

+ 使用 HTML5 history API 记录（ pushState，replaceState 和 popstate 事件）的 `<Router>` 使您的UI与URL保持同步。
```jsx
// 引入
import { BrowserRouter as router } from 'react-router-dom'
<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={getConfirmation}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```
+ basename: string
  + 所有地址的基本网址。如果您的应用程序是从服务器上的子目录提供的，则需要将其设置为子目录。
  + 格式正确的基本名应该有一个前导斜线，但是结尾不能有斜线。

+ getUserConfirmation: func
  + 用于确认导航的功能。默认使用 window.confirm。
```js
// 默认行为
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}
```

+ forceRefresh: bool
  + 如果为 true，则路由器将在页面导航中使用整页刷新。
  + 一般只在不支持 HTML5 history API 的浏览器中使用.

+ keyLength: number
  + location.key 的长度。默认为 6。

+ children: node
  + 一个用于渲染的基本元素

### <HashRouter>

+ 和 BrowserRouter 基本一样,不过只拥有三个属性
+ 适用于静态文件服务器 
```jsx
<HashRouter
   basename="/calendar"
   getUserConfirmation={getConfirmation}
   hashType="string"
>
  <App/>
</HashRouter>
```
+ hashType: string      默认为"slash"。
  + 用于 window.location.hash 的编码类型。可用的值是：
  + "slash" - 创建像 #/ 和的 #/sunshine/lollipops hash 表
  + "noslash" - 创建像 # 和的 #sunshine/lollipops hash 表
  + "hashbang" - 创建 “ajax crawlable” （由Google弃用）hash，如 #！/ 和 #！/sunshine/lollipops

### <Link>

+ 提供一个可访问的链接。
+ `<Link to="/about">About</Link>`
+ ID、className 也是可以传入的

+ to: string
  + 一个链接字符串,一般以 `/name` 开头, 后接路径位置 name
  + `<Link to='/courses?sort=name'/>`

+ to: object
  + 一个可以具有以下任何属性的对象：
  + pathname: 表示要链接到的路径的字符串。
  + search: 表示查询参数的字符串形式。
  + hash: 放入网址的 hash，例如 #a-hash。
  + state: 传递到路由组件的 props.location 中。
```jsx
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true } // 携带参数
}}/>
```

+ replace: bool
  + 如果为 true，则单击链接将替换历史堆栈中的当前入口，而不是添加新入口。
  + 也是就无法通过退回,回到上一个导航
  + `<Link to="/courses" replace />`

+ innerRef: function
  + 允许访问 ref 组件的底层
  + `innerRef={node=>{/* 操作 node */}}`

### <NavLink>

+ 一个特殊版本的 Link，当它与当前 URL 匹配时，为其渲染元素添加样式属性。
+ 基础属性与 `<Link>` 一样

+ activeClassName: string
  + 要给出的元素的类处于活动状态时。
  + 默认的给定类是 active。
  + 它将与 className 属性一起使用。

+ activeStyle: object
  + 当元素处于 active 时应用于元素的样式。
  + `{{color:'red'}}`

+ exact: bool
  + 如果为 true，则仅在位置完全匹配时才应用 active 的类/样式。

+ strict: bool
  + 当情况为 true，要考虑位置是否匹配当前的URL时，pathname 尾部的斜线要考虑在内。

+ isActive: func
  + `(match, location) => { return bool}`
  + 确定链接是否处于活动状态的额外逻辑函数

### <Route>

+ 在 location 与 Route 的 path 匹配时呈现一些 UI。
+ `<Route>` 有三种渲染的方法： 每一个 Router 都只能使用一种
  + `<Route component>`
  + `<Route render>`
  + `<Route children>`

+ Route props : 所有三种渲染方法都将通过相同的三个 Route 属性。
  + match
  + location
  + history

+ component : 只有当位置匹配时才会渲染的 React 组件。
  + `<Route path="/user/:username" component={User}/>`
  + User 为一个组件

+ render: func
  + 接受一个返回组件的函数 : `render={props=>{ return component}}`

+ children: func
  + 有时你需要渲染路径是否匹配位置。
  + `children={({match}) => {return component}}`

+ path: string : 任何 path-to-regexp 可以解析的有效的 URL 路径
  + 没有 path 属性则始终匹配

+ exact: bool : 如果为 true，则只有在路径完全匹配 location.pathname 时才匹配。

+ strict: bool : 匹配规则 当路径为: '/one/'
  + 为 true 时
  + '/one'  不匹配
  + '/one/' 匹配
  + '/one/two' 匹配

+ location: object
+ sensitive: bool : 如果路径区分大小写，true 为不区分

### <Redirect>

+ 渲染 `<Redirect>` 将使导航到一个新的地址。相当于重新定向
+ 可以用来设置默认显示的路由组件
```jsx
// 通过相对的规则来进行重新定向对应的组件和位置
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/> // 重新定向路由
  ) : (
    <PublicHomePage/>
  )
)}/>

// 默认 显示的组件
<Switch>
   <Route path="/nav" component={Nav} />
   <Route path="/content" component={Content} />
   <Redirect to="/nav" />
</Switch>
```

+ to: string : 重定向到的 URL
+ to: object : 重定向到的 location

+ push: bool : 当 true 时，重定向会将新地址推入 history 中，而不是替换当前地址。

+ from: string : 重定向 from 的路径名。
+ exact: bool : 完全匹配 from；相当于 Route.exact。
+ strict: bool : 严格匹配 from；相当于 Route.strict。

### <Switch>

+ 渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。
+ 利用 `<Switch>` 包裹 `<Route>` 在匹配到第一个后不在继续向下匹配,浪费性能
+ 还可以在众多 `<Route>` 的最后渲染一个不带链接的 `<Route>` 当做默认的 404 页面

+ location: object
  + 用于匹配子元素而不是当前历史位置（通常是当前浏览器 URL ）的 location。

+ children: node
  + `<Switch>` 的所有子级都应该是 `<Route>` 或 `<Redirect>` 元素。
  + 将渲染当前位置匹配的第一个子级。

### <Router>

+ Router 是所有路由组件共用的底层接口。
+ 通常，我们的应用程序将使用其中一个高级路由器代替：
  + <BrowserRouter>
  + <HashRouter>
  + <MemoryRouter>
  + <NativeRouter>
  + <StaticRouter>
+ history: object

### withRouter

+ 接受一般组件,让一般组件拥有路由组件身上的 API
+ `withRouter(Home)`
+ 高阶组件

### <Prompt>

+ 从核心(react-router)重新导出 Prompt。

