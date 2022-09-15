# Redux

+ 用于集中式状态管理
+ 可以与多种不同的框架进行协作
+ 与 react 协作可以安装 yarn add react-redux

![原理图](./images/Redux-原理图.png)
+ React Components : React 组件
+ Action Creators : 创建行动对象
+ dispatch(action) : 派遣分发动作对象
+ Store : 状态管理的指挥者 -> 状态的储存者
+ (previousState, action) : 之前的状态,行动 
  + 初始化时
  + previousState : undefined
  + action : type -> @@init@@ , data 可以不传
+ Reducers : 数据加工 -> 工具人 (不仅可以加工状态,还可以初始化状态)

+ 所有 Redux 文件应该放在根目录的 redux 文件夹中
+ [生态协作库](https://www.redux.org.cn/docs/introduction/Ecosystem.html)

## 三个核心概念

+ action : object -> 动作对象
  + 包含两个属性
    - type : string -> 标识属性,唯一值,必要属性
    - data : any -> 数据属性,可选属性

+ reducer -> 用于初始化状态,加工状态
  + 加工时,根据旧的 state 和 action , 产生新的 state 的(纯函数)

+ store -> 将 state、action、reducer 联系在一起的对象

## action

+ action 有两种可能的值
  + object : {type,data}  -> 一般为同步 action
  + function : func -> 一般为异步 action
    + 因为只有函数里面才可以开启异步任务,如 : setTimeOut
    + 使用函数类型的 function 需要利用中间件, 因为 store 对象只接收对象类型的 action
    + 中间件 : redux-thunk , 需要引用这个库
    + 异步的 action 不是必要的,只有特定需要 store 帮助执行异步任务时才需要

+ action 是 store 的唯一数据来源, 一般通过 store.dispatch() 来派遣 action 对象.
  + action 对象中的 type 字段是必须要的,其他的字段可以随意的进行设计
  + 可以将 action 对象和 dispatch() 方法一起写为函数
  + react-redux 会自动进行 dispatch ,所以不用手动设置
```js
const addTodo = data => {
   const action = {
      type:'ADD_TODO',
      data
   }
   dispatch(action); // dispatch() 需要引用 store 来获取
}
```

+ 异步 action 例子
```js
import { createStore, applyMiddleware } from 'redux'
// 引入 reducer
import { calcReducer } from './reducers'
// 引入 redux-thunk 来使用异步 action
import thunk from 'redux-thunk'
// 暴露 store
export default createStore(calcReducer, applyMiddleware(thunk))

// 异步任务,里面同样需要调用同步 action
export const createAsyncAction = (data, time = 100) => {
   return (dispatch) => {
      setTimeout(() => {
         dispatch(createAction(data));
      }, time)
   }
}
```

## reducer

+ 一个状态对应一个 reducer ,且可以对状态进行初始化操作
+ Reducers 指定应用如何响应 action 并将状态交给 store ,
+ (previousState, action) => newState
+ 这个处理函数会接受到两个参数 :
  + previousState : 之前的状态
  + action : {type,data} 动作对象,
  + 设置初始化值 : (previousState = initState, action) => newState
  + newState : 将返回的新状态交给 store

+ previousState : 不要修改这个对象,而是返回一个合并或操作后的新对象
+ 返回新对象也有利于 store 进行状态更新,如果是同一个对象,因为进行的是浅层的比较,所以给判断对象没有改变而不进行更新
+ 通过 combineReducers() 函数来集中管理所有的 reducer
```js
// combineReducers 这个函数需要从 redux 库中引入
const todoApp = combineReducers({
  state_one:reducer_one, // 一个 reducer 函数只能管理对应的状态
  state_two:reducer_two
})
```

+ reducer 函数的大概书写方式
```js
function todoApp(state = initialState, action) {
  const {type,...data} = action;

  switch (type) {
    case SET_VISIBILITY:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default: return state; // 默认返回状态非常重要
    /*
      在这里不默认返回 previousState(之前的状态),
      在 switch 没有匹配上任何操作时就没有返回值
      没有返回值的函数,默认返回值是 undefined
      这样就会导致 store 将状态更新为 undefined
      所以在没有匹配到对应操作时返回 previousState 是一个非常不错的选择
      不仅仅是多个 Reducer 函数时会出现这样的错误, 单个也会出现
      且这样有利于在多个 Reducer 函数时,保护 state 不会错误更新
      在多个 Reducer 函数时, store 收到一个 action 会执行所有的 Reducer 函数
      虽然每一个 Reducer 函数都只对应一个状态, 
      但是会导致没匹配到 action type 的 Reducer 函数都将进行默认返回
      这是如果默认返回不是 previousState , 则会导致 store 将 Reducer 对应的状态修改为 Reducer 函数的默认返回值
      store 会将 Reducer 函数的返回值和 previousState 进行对比, 不一样就会更新
      有了 default: return previousState; 像这样返回就不会出现这样的问题了
      利用 if(){}else{} 判断的 Reducer 同样如此,需要注意匹配不上时的默认返回
    */
  }
}
```

+ 纯函数
  + 特别的函数,接收到同样的参数(实参),输出同样的结果(返回)
  + 不得改写参数数据,执行有任何副作用,
    + 如 : 网络请求,或一些输入输出的设备,这些操作的结果不确定.
  + 不能调用如 : Date.now() 或者 Math.random() 等非纯函数
  + redux 的 reducer 函数必须是一个纯函数

## store

+ 整个应用中只有一个 store 对象,且对象为只读的,只有通过 action 对象才可以改变
+ Store 就是把 action 和 reducer 联系在对象。
+ Store 有以下职责：
  + 维持应用的 state；
  + 提供 getState() 方法获取 state；
  + 提供 dispatch(action) 方法更新 state；
  + 通过 subscribe(listener) 注册监听器;
  + 通过 subscribe(listener) 返回的函数注销监听器。

```js
// 引入用来创建 store 的方法
import { createStore } from 'redux'
/* 
   createStore 的第一个参数是 reducer ,
   第二个参数用来初始化 state,如利用服务端的数据初始化 state
*/
import allReducer from './reducers'
let store = createStore(allReducer) // 通过传入 allReducer 来进行创建 store 对象
export default store; // 暴露 store 对象
```

## 数据流

+ Redux 采用了严格的单向数据流
+ 所有的数据都拥有生命周期
1. 调用 store.dispatch(action) 描述一个行为
2. Redux store 调用传入的 reducer 函数。执行处理函数
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树
   + 提供了原生的 combineReducers() 函数来进行辅助合并
4. Redux store 保存了根 reducer 返回的完整 state 树
   + 所有订阅 store.subscribe(listener) 的监听器都将被调用

## Redux DevTools

+ 安装浏览器扩展插件 Redux DevTools
+ 使用这个开发者工具需要加载一个辅助库 -> redux-devtools-extension
```js
yarn add redux-devtools-extension

// store 文件中
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(calcReducer,
   // 第二个参数传入 composeWithDevTools 方法来启用 Redux DevTools
   composeWithDevTools( 
      applyMiddleware(thunk) // 不用异步 action 就可以不传
   )
)
// 因为开发者工具挂载在浏览器上,所以也可以这样设置第二个参数
window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
```

## API

### createStore

+ `const store = createStore(reducer, [preloadedState], enhancer)`
+ 创建一个 Redux store 来以存放应用中所有的 state
+ 应用中应有且仅有一个 store。

1. reducer (Function): 
   1. 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。

2. `[preloadedState]` (any): 初始时的 state。 
   1. 在同构应用中，你可以决定是否把服务端传来的 state 整合后传给它，或者从之前保存的用户会话中恢复一个传给它。
   2. 如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。
   3. 否则，你可以自由传入任何 reducer 可理解的内容。

3. enhancer (Function): 
   1. Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。
   2. 这与 middleware 相似，它也允许你通过复合函数改变 store 接口。

### Store

+ Store 就是用来维持应用所有的 state 树 的一个对象。
+ 改变 store 内 state 的惟一途径是对它 dispatch 一个 action。
+ Store 方法
  + getState() : 返回应用当前的 state 树。
  + dispatch(action) : 分发 action。这是触发 state 变化的惟一途径。
  + subscribe(listener)
  + replaceReducer(nextReducer) : 替换 store 当前用来计算 state 的 reducer。

+ subscribe(listener)
  + 一般使用协同库,不需要手动进行监听
  + 添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。
  + 可以在回调函数里调用 getState() 来拿到当前 state。
  + listener : function -> 每当 dispatch action 的时候都会执行的回调。

### combineReducers

+ `combineReducers(reducers)`
+ 作用是将复数的 reducers 合并成一个根 reducer
```js
// 一一对应的数据管理模式
combineReducers({
  state_one:reducer_one,
  state_two:reducer_two
})
```

### applyMiddleware

+ `applyMiddleware(...middleware)`
+ 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
```js
const fetchMiddleware =
StoreAPI =>
next =>
action => {
  if (action.type === 'fetch') {
    // 发送 API
    client.get('todo').then(todo => {
      // 使用获取到的 todo 数据来 dispatch 一个 action
      dispatch({ type: 'Loaded', payload: todo })
    })
  }

  return next(action)
}
```

### bindActionCreators

+ bindActionCreators(actionCreators, dispatch)
+ 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。
+ 同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。

### compose

+ compose(...functions)
+ 从右到左来组合多个函数。
+ 需要把多个 store 增强器 依次执行的时候，需要用到它。
```js
createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )
)
```

# react-redux

+ 专为 react 打造的 redux
+ 不需要在自己来检测 store 中 state 的改变来更新组件,容器会自动完成
+ 通过 API 中的 Provider 组件可以直接给所有的容器传递 store 对象
+ 组件放 component
+ 容器组件放 container
![原理图](./images/react-redux模型图.png)
+ 容器组件用来连接 Redux 和 component
+ 容器组件中的 store 需要依靠 props 传入,而不是在 组件中引入

+ useSelector
+ useDispatch

## 基本使用

```jsx
// 引用连接 redux 的 connect 容器函数
import { connect } from 'react-redux'
// 引入 UI 组件
import ReactRedux from './ReactRedux'
// 引入返回 action 对象的方法
import action from '../../redux/actions'

// 创建并暴露容器组件
export default connect(
   state => ({ count: state }),

   // mapDispatchToProps 一般写法
   /* dispatch => ({
      increment: data => dispatch(action(data)),
      decrement: data => dispatch(action(data)),
      asyncIncrement: (data, time) => dispatch(action(data, time))
   }) */

   // mapDispatchToProps 精简写法
   /**
    * 这个精简写法,API 就帮助在次封装了 传入的方法
    * 在调用方法后会自动的进行 dispatch 动作
    * 传入的函数需要返回一个 action 对象
    * function increment(dispatch,action){
    *    // API 帮助执行了一个类似这样的简单封装
    * return (...parameter){
    *    dispatch(action(...parameter));
    *    }
    * }
    */
   {
      increment: action,
      decrement: action,
      asyncIncrement: action
   }
)(ReactRedux);

// connect(a,b)(UI组件) 返回一个 容器组件
/**
 * mapStateToProps(sate)=>{return {state}}
 * 在渲染容器时已经引入了 store , connect 会自动将 state 传入 a 函数中
 * mapStateToProps : func -> 状态
 *   -> 返回一个 key - value 形式的对象 , 因为 props 也是 key - value 的形式
 *   -> 返回值会作为 props 传递给 UI组件 , 当做状态
 *
 * mapDispatchToProps(dispatch)=>{return {func}}
 * mapDispatchToProps 会接受到用来发布 action 的方法 dispatch(action)
 * mapDispatchToProps : func -> 操作状态的方法
 *   -> 返回值一个 key - value 的对象
 *   -> 返回值会作为 props 传递给 UI组件 , 当做状态的操作方法
 */
```

## API

## Provider

+ 为所有的容器分发 store 对象
+ `<Provider store>`
```jsx
ReactDOM.render(// 在这里引入全局唯一的 store 对象
  <Provider store={store}>
    <Connect />
  </Provider>,
  rootEl
)
```

## connect

+ `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`
+ 连接 React 组件与 Redux store。
+ ownProps 就是传递给 connect 组件的 props , 不传递 mergeProps 会默认传递给 UI 组件
```js
const APP = connect(
   mapStateToProps,
   mapDispatchToProps,
)(/* component */) // 通过第二次调用传入需要链接的 react Component
```
+ 根据配置信息，返回一个注入了 state 和 action creator 的 React 组件

+ `mapStateToProps(state, [ownProps]): stateProps` : function
+ 该函数的返回值将作为 UI 组件的 props
+ 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
+ state 为 传入的 Redux 中 store 内保存的 state
  + 如果定义该参数，组件将会监听 Redux store 的变化
  + 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
  + 如果省略了这个参数，组件将不会监听 Redux store。
  + 如果指定了该回调函数中的第二个参数 ownProps , 则该参数的值为传递到组件的 props
  + 而且只要组件接收到新的 props，mapStateToProps 也会被调用

+ `mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)`
+ 该函数的返回值将作为 UI 组件的 props 且都将被当作 Redux action creator
+ 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator ,每个方法将返回一个新的函数
+ 函数中 dispatch 方法会将 action creator 的返回值作为参数执行

+ mergeProps(stateProps, dispatchProps, ownProps): props
+ mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。
+ 该回调函数返回的对象将作为 props 传递到被包装的组件中。
+ 如果你省略这个参数，默认情况下返回 
+ `Object.assign({}, ownProps, stateProps, dispatchProps)` 的结果。

+ `[options] (Object) ` : 如果指定这个参数，可以定制 connector 的行为。
  + `[pure = true] (Boolean)`: 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，
    + 前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true。
  + `[withRef = false] (Boolean)`: 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得。默认值为 false。
  + withRef -> 被删除了

# Redux Toolkit

+ 工具集,简化 Redux 的使用
+ 获取数据和 dispatch 方式不变

## configureStore()

```js
import { configureStore } from '@reduxjs/toolkit'

import {
   pageInfoReducer,
   userInfoReducer,
   blogInfoReducer
} from './index'

// store
export default configureStore({
    // reducer 数据管理
   reducer: {
      page: pageInfoReducer,
      user: userInfoReducer,
      blog: blogInfoReducer
   },
   devTools: true,
   // preloadedState: {}
})
```

## createSlice()

```js
import { createSlice } from '@reduxjs/toolkit'
const pageInfo = createSlice({
   name: 'pageInfo',
   initialState: {/*初始化数据*/},
   reducers: {
       // 操作数据
      setPageInfo: (state, action) => void (state = action.payload),
      setEffect: (state, action) => {
          state = action.payload
      }
   }
});
// 导出操作方法
export const { setPageInfo, setEffect } = pageInfo.actions;
// 导出 reducer 对象将其附加给 store j
export const pageInfoReducer = pageInfo.reducer;
```

## 异步操作

+ 使用 redux-thunk 提供的中间件, 默认包含
```js
// trunk 函数, 带参数可以在包裹一层函数, 返回此函数
const Fetch =  async (dispatch, getState) {
  const response = await client.get('/fakeApi')
  dispatch({ type: 'Loaded', payload: response.todo })
}

// 使用, 传入 trunk 函数, 中间件会帮助调用
dispatch(Fetch)
```

# 使用 immer 优化性能

+ 需要使用到的库
	+ `yarn add immer`
	+ `yarn add use-immer`

## immer

+ 基本函数
+ ` produce(currentState, producer: (draftState) => void): nextState `

```js
import produce from "immer"
// 基础数据
const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]
// 传输基础数据,在模拟数据上进行修改,即可得到最新的数据
const nextState = produce(baseState, draftState => {
    draftState.push({todo: "Tweet about it"})
    draftState[1].done = true
})
```



## use-immer

+ `yarn add use-immer`

```jsx
import React from "react";
import { useImmer, useImmerReducer } from "use-immer";

const initialState = { count: 0 };

function reducer(draft, action) {
  switch (action.type) {
    case "reset":
      return initialState;
  }
}

function Counter() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [age, setAge] = useImmer(20);
  function(){
	// 方式一
      setAge(age + 1);
      // 方式二 次方式只适用于对象, 不是对象的还是使用 useState 直接
      setAge(draft =>{draft++});
      setAge(draft =>void(draft++));
  }
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
```



# 组件通信

## PubSub-JS

+ 消息订阅-发布机制 : 工具库
	+ PubSubJS  :  `yarn add pubsub-js`
	+ `import PubSub from 'pubsub-js'`

+ 基本思路
	+ 在订阅消息时,将需要执行的函数加入到消息名的执行数组中
	+ 发布消息时将执行指定 消息名数组中的所有函数,且传入消息名与数据
	+ 设定消息名专用的数据保存位置

### 消息的订阅

```js
// msg : 为消息名     data : 为数据
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};
// 订阅名为 MY TOPIC 的消息    mySubscriber 为有消息时需要执行的函数
var token = PubSub.subscribe('MY TOPIC', mySubscriber);
// token 用来取消订阅

```

### 消息的发布

```js
// 发布消息  异步
// MY TOPIC : 消息名字
// hello world! : 为发布出去的数据
PubSub.publish('MY TOPIC', 'hello world!');

// 同步
PubSub.publishSync('MY TOPIC', 'hello world!');
```

### 取消订阅

```js
// 利用订阅返回的 ID 进行取消
PubSub.unsubscribe(token);

// 取消对指定函数的所有订阅
PubSub.unsubscribe(mySubscriber);

// 取消指定消息名的订阅
PubSub.subscribe('a', myFunc1);
PubSub.subscribe('a.b', myFunc2);
PubSub.subscribe('a.b.c', myFunc3);
// 取消 a.b 和 a.b.c 消息名的订阅, 消息名为 a 的依旧有效
PubSub.unsubscribe('a.b');

// 清楚所有订阅
PubSub.clearAllSubscriptions();
```

### 错误处理

```js
// isPublished是一个布尔值，表示是否有任何订阅者注册了此主题
var isPublished = PubSub.publish('a');

// 如果出现错误且订阅者未注册，令牌将为假
var token = PubSub.subscribe('MY TOPIC', mySubscriber); 
```



### 其他

```js
// 获取指定 id 的订阅
PubSub.getSubscriptions('token');

// 订阅数量
PubSub.countSubscriptions('token');

// 多层级发布与订阅
PubSub.subscribe('car', car);
PubSub.subscribe('car.drive', carDrive);
// 发布这样三个消息
PubSub.publish('car.purchase', {name: 'my new car'});
PubSub.publish('car.drive', {speed: '14'});
PubSub.publish('car.sell', {newOwner: 'someone else'});
// car 会被执行 三次, 因为这三个都发布了 car 这个消息名,且这个消息名相当于这三个消息的父级
// carDrive 只会执行一次 , 因为只发布了一次,
```

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

### \<BrowserRouter\>

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

### \<HashRouter\>

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

### \<Link\>

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

### \<NavLink\>

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

### \<Route\>

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

### \<Redirect\>

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
	{/* 显示默认组件一 */}
   <Route exact path="/" render={() => <Redirect to="/Learning" />} /> 
   <Route path="/nav" component={Nav} />
   <Route path="/content" component={Content} />
     {/* 显示默认组件二 */}
   <Redirect to="/nav" />
</Switch>
```

+ to: string : 重定向到的 URL
+ to: object : 重定向到的 location

+ push: bool : 当 true 时，重定向会将新地址推入 history 中，而不是替换当前地址。

+ from: string : 重定向 from 的路径名。
+ exact: bool : 完全匹配 from；相当于 Route.exact。
+ strict: bool : 严格匹配 from；相当于 Route.strict。

### \<Switch\>

+ 渲染与该地址匹配的第一个子节点 `<Route>` 或者 `<Redirect>`。
+ 利用 `<Switch>` 包裹 `<Route>` 在匹配到第一个后不在继续向下匹配,浪费性能
+ 还可以在众多 `<Route>` 的最后渲染一个不带链接的 `<Route>` 当做默认的 404 页面

+ location: object
  + 用于匹配子元素而不是当前历史位置（通常是当前浏览器 URL ）的 location。

+ children: node
  + `<Switch>` 的所有子级都应该是 `<Route>` 或 `<Redirect>` 元素。
  + 将渲染当前位置匹配的第一个子级。

### \<Router\>

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

### \<Prompt\>

+ 从核心(react-router)重新导出 Prompt。

# React 常用库

+ [精品推荐](https://ant.design/docs/react/recommendation-cn)

## Ant Design

+ [UI 组件库](https://ant.design/docs/react/introduce-cn)
+ yarn add antd

+ [自定义主题](https://ant.design/docs/react/use-with-create-react-app-cn#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)
+ [配置文档](https://ant.design/docs/react/customize-theme-cn)

### @craco/craco

+ 按需引入 antd 样式
+ 安装  yarn add  @craco/craco
```js
/* 修改 package.json */
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test",
}
```
+ 在项目根目录创建一个 craco.config.js 用于修改默认配置。
+ 使用 : babel-plugin-import 安装 : yarn add babel-plugin-import
+ 安装 : craco-less 修改主题样式
```js
const { resolve} = require('path');
const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
   webpack: {
      // 别名
      alias: {
         '@': resolve('src'),
         '@EXAMPLE': resolve('src/example'),
         '@PAGES': resolve('src/pages'),
      },
   },
   babel: {
      plugins: [
         // antd css 按需引入
         ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true}],
      ]
   },
   plugins: [
      {
         plugin: CracoLessPlugin,
         options: {
            lessLoaderOptions: {
               lessOptions: {
                  modifyVars: getThemeVariables({
                     // dark: true,
                     compact: true,
                  }),
                  javascriptEnabled: true,
               },
            }
         }
      }
   ]
};
```

### webpack

+ 按需加载使用 : babel-plugin-import 安装 : yarn add babel-plugin-import
+ 定制主题 : less , less-loader@6
```js
// webpack.config.js
{
   test: /\.less$/,
   include: /[node_module\/antd|src]/,
   // exclude: /node_module\//,
   use: [
      ...getStyleLoaders({
      importLoaders: 1,
      sourceMap: isEnvProduction
         ? shouldUseSourceMap
         : isEnvDevelopment,
      }),
      {
         loader: 'less-loader',
         options: {
            lessOptions: { // 定制主题
               modifyVars: {
               'primary-color': 'red',
               'link-color': '#1DA57A',
               'border-radius-base': '2px',
               },
               javascriptEnabled: true,
            }
         }
      }
   ],
},

// babel-loader
{
   loader:'babel-loader',
   options:{
      plugins:[
         ...plugins,
         [ // 按需引入 antd
         'import',
            {
               libraryName: 'antd',
               libraryDirectory: 'es',
               style: true
            }
         ],
      ]
   }
}
```

## styled-components

+ 样式组件

## use-immer

+ 不可变数据

## 虚拟滚动

+ react-window 和 react-virtualized 
+ 在有限的时间内仅渲染有限的内容

## 富文本

+ TinyMCE