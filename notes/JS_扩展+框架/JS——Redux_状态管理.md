# Redux

+ 用于集中式状态管理

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

+ 所有 Redux 文件应该放在根目录的 redux 文件夹

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
    + 因为只有函数里面才可以开启异步任务,setTimeOut
    + 使用函数类型的 function 需要利用中间件, 因为 store 对象只接收对象类型的 action
    + 中间件 : redux-thunk , 需要引用这个库
    + 异步的 action 不是必要的,只有特定需要 store 帮助执行异步任务时才需要
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

## store

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

```js
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