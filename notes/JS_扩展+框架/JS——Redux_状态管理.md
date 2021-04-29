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

+ `applyMiddleware(...middlewares)`
+ 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。

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

## configureStore()