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