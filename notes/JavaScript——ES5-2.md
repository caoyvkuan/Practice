# 事件
onmouseover //鼠标悬停
onmouseout //鼠标移出
onmousedown //按下鼠标
onmouseenter    //鼠标输入
onmouseleave    //鼠标离开
onmousemove //鼠标移动
onmouseup   //鼠标向上
onmousewheel    //鼠标滚轮

## EventTarget 接口

+ DOM 的事件操作（监听和触发），都定义在EventTarget接口。
+ 所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象
+ （比如，XMLHttpRequest、AudioNode、AudioContext）也部署了这个接口。

+ 该接口主要提供三个实例方法。
  - addEventListener：绑定事件的监听函数
  - removeEventListener：移除事件的监听函数
  - dispatchEvent：触发事件

1. EventTarget.addEventListener()
   + EventTarget.addEventListener()用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。
   + ``target.addEventListener(type, listener, useCapture);``
   + 该方法接受三个参数
     1. type：事件名称，大小写敏感。
     2. listener：监听函数。事件发生时，会调用该监听函数。
     3. useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为false。
     4. 第三个参数除了布尔值 useCapture，还可以是一个属性配置对象。该对象有以下属性。
        1. capture：布尔值，表示该事件是否在捕获阶段触发监听函数。
        2. once：布尔值，表示监听函数是否只触发一次，然后就自动移除。
        3. passive：布尔值，表示监听函数不会调用事件的 preventDefault 方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。
   + 第二个参数还可以是一个具有 handleEvent 方法的对象
+ 注意
+ addEventListener 方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。
+ 这些函数按照添加顺序触发，即先添加先触发。
+ 如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除
+ 如果需要传递参数，可以使用匿名函数包装一下监听事件
+ 监听函数内部的this，指向当前事件所在的那个对象。
```js
// 对象拥有 handleEvent 方法的对象
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    console.log('click');
  }
});

//只执行一次 的属性配置对象
element.addEventListener('click', function (event) {
  // 只执行一次的代码
}, {once: true});
```

2. EventTarget.removeEventListener()
   + EventTarget.removeEventListener 方法用来移除 addEventListener 方法添加的事件监听函数。该方法没有返回值。
   + removeEventListener 方法的参数，与 addEventListener 方法完全一致。它的第一个参数“事件类型”，大小写敏感。
   + removeEventListener 方法移除的监听函数，必须是 addEventListener 方法添加的那个监听函数，而且必须在同一个元素节点，否则无效。
   + 无法清除匿名函数，参数必须完全一致

3. EventTarget.dispatchEvent()
   + EventTarget.dispatchEvent 方法在当前节点上触发指定事件，从而触发监听函数的执行。
   + 该方法返回一个布尔值，只要有一个监听函数调用了 Event.preventDefault()，则返回值为false，否则为true。
   + ``target.dispatchEvent(event)``
   + dispatchEvent 方法的参数是一个 Event 对象的实例
   + 若果参数为空或不是一个有效的事件对象，将报错
   + 根据返回值可以确定事件是否被取消了
```js
para.addEventListener('click', hello, false);
var event = new Event('click');
para.dispatchEvent(event);
```

## 事件模型

### 监听函数

+ 浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。
+ 事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。
+ 这是事件驱动编程模式（event-driven）的主要编程方式。

+ 有三种方式，为事件绑定监听函数

1. HTML 的 on- 属性
   + 使用这个方法指定的监听代码，只会在冒泡阶段触发。
   + 每种事件都可以用一个与相应事件处理程序同名的HTML属性来指定
   + 在事件中this指向事件的目标元素
```html
<body onload="doSomething()">
<div onclick="console.log('触发事件')">
```

2. 元素节点的事件属性
   + 使用这个方法指定的监听函数，也是只会在冒泡阶段触发。
   + 删除事件只需将之赋值为 null
```js
window.onload = doSomething;

div.onclick = function (event) {
  console.log('触发事件');
};
div.onclick = null;  // 删除事件
```

3. EventTarget.addEventListener()

### this 的指向

+ 监听函数内部的this指向触发事件的那个元素节点。
+ 这几种写法指向都一样
```js
// HTML 代码如下
// <button id="btn">点击</button>
var btn = document.getElementById('btn');

// 写法一
btn.onclick = function () {
  console.log(this.id);
};

// 写法二
btn.addEventListener(
  'click',
  function (e) {
    console.log(this.id);
  },
  false
);
```

### 事件的传播

+ 一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。
+ 第一阶段：从 window 对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
  + 从最上层一级一级传递到目标对象，称为事件捕获
+ 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
+ 第三阶段：从目标节点传导回 window 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。
  + 从目标对象一级一级传递到最上层，称为事件冒泡
+ 这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

+ 在捕获阶段，实际的目标不会接收到事件

### 事件的代理（委托）

+ 由于事件的冒泡机制
+ 因此可以吧子节点的监听函数定义在父节点上，由父节点统一处理多个子元素的事件，这种方法叫做事件代理
+ 这种方法也有利于节约内存，减少事件处理函数的数量。

## Event对象
