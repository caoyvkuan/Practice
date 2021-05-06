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

### EventTarget.xxx()
### addEventListener()

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



### removeEventListener()

+ EventTarget.removeEventListener 方法用来移除 addEventListener 方法添加的事件监听函数。该方法没有返回值。
+ removeEventListener 方法的参数，与 addEventListener 方法完全一致。它的第一个参数“事件类型”，大小写敏感。
+ removeEventListener 方法移除的监听函数，必须是 addEventListener 方法添加的那个监听函数，而且必须在同一个元素节点，否则无效。
+ 无法清除匿名函数，参数必须完全一致

### dispatchEvent()

+ EventTarget.dispatchEvent 方法在当前节点上触发指定事件，从而触发监听函数的执行。
+ 该方法返回一个布尔值，只要有一个监听函数调用了 Event.preventDefault()，则返回值为false，否则为 true。
+ ``target.dispatchEvent(event)``
+ dispatchEvent 方法的参数是一个 Event 对象的实例
+ 若果参数为空或不是一个有效的事件对象，将报错
+ 返回值可以确定事件是否被取消了
+ 原生的操作事件，如：鼠标点击，可能需要用 MouseEvent 构造函数才能正确触发点击事件

```js
//给元素添加事件
para.addEventListener('click', hello, false);
//创建点击事件
var event = new Event('click');
//触发元素的点击事件
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

+ 事件发生以后，会产生一个事件对象，作为参数传给监听函数。
+ 浏览器原生提供一个 Event 对象，所有的事件都是这个对象的实例，或者说继承了 Event.prototype 对象。
+ 创建的事件，可以用 dispatchEvent 触发
+ 原生的操作事件，如：鼠标点击，可能需要用 MouseEvent 构造函数才能正确触发点击事件
```js
// Event 对象本身就是一个构造函数，可以用来生成新的实例。
event = new Event(type, options);
/**
 * Event构造函数接受两个参数。
 * 第一个参数type是字符串，表示事件的名称；
 * 第二个参数options是一个对象，表示事件对象的配置。
 * 该对象主要有下面两个属性。
 *    bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
 *    cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault() 取消这个事件。
 * 	  composed:布尔值，可选，用来指示该事件是否可以从 Shadow DOM 传递到一般的 DOM。
 * 一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
*/
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
//上面代码新建一个look事件实例，然后使用dispatchEvent方法触发该事件。
//注意，如果不是显式指定 bubbles 属性为 true，生成的事件就只能在“捕获阶段”触发监听函数。
div.addEventListener('click', callback, false);
//div.addEventListener 方法指定在冒泡阶段监听，因此监听函数不会触发。
//如果写成 div.addEventListener('click', callback, true)，那么在“捕获阶段”可以监听到这个事件。
var click = new Event('click');
div.dispatchEvent(click); //如果这个事件在 div 元素上触发。
//不管 div 元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。
//因为这时 div 元素是事件的目标，不存在是否冒泡的问题，div 元素总是会接收到事件，因此导致监听函数生效。
```

+ 这个事件对象中包含着所有与事件有关的信息，包括导致事件的元素，事件的类型，以及其他与特定事件相关的信息，
+ 例如鼠标导致的事件对象中，会包含鼠标的位置信息，键盘也一样
+ 事件执行完毕，event对象就会被销毁

### 实例属性

+ Event 的实例属性
+ Event.PropertyName

+ bubbles       布尔类型    只读    表明事件是否冒泡
+ eventPhase    整数常量    只读    表示事件目前所处阶段
+ cancelable    布尔类型    只读    表示事件是否可以取消

#### bubbles，eventPhase

+ Event.bubbles 属性返回一个布尔值，表示当前事件是否会冒泡。
+ 该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。
+ 除非显式声明，Event 构造函数生成的事件，默认是不冒泡的。

+ Event.eventPhase 属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。
  + 0，事件目前没有发生。
  + 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
  + 2，事件到达目标节点，即 Event.target 属性指向的那个节点。
  + 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。

#### cancelable，cancelBubble，defaultPrevented

+ Event.cancelable 
  + 属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。
  + 大多数浏览器的原生事件是可以取消的，除非显式声明，Event构造函数生成的事件，默认是不可以取消的。
  + 当 Event.cancelable 属性为 true 时，调用 Event.preventDefault() 就可以取消这个事件，阻止浏览器对该事件的默认行为。

+ 如果事件不能取消，调用 Event.preventDefault() 会没有任何效果。
+ 所以使用这个方法之前，最好用 Event.cancelable 属性判断一下是否可以取消。

+ Event.cancelBubble 
  + 属性是一个布尔值，如果设为 true，相当于执行 Event.stopPropagation()，可以阻止事件的传播。

+ Event.defaultPrevented 
  + 属性返回一个布尔值，表示该事件是否调用过 Event.preventDefault() 方法。该属性只读。

#### currentTarget，target

+ 在事件处理程序内部，this 对象始终等于 currentTarget
  + 由于监听函数只有事件经过时才会触发，所以 e.currentTarget 总是等同于监听函数内部的 this。

+ 事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。
+ 因此，任意时点都有两个与事件相关的节点，一个是事件的原始触发节点（Event.target）
+ 另一个是事件当前正在通过的节点（Event.currentTarget）。前者通常是后者的后代节点。

+ Event.currentTarget 属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

+ Event.target 属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

#### type,view

+ Event.type 属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。

+ view 只读 与事件关联的抽象视图。同等与发生事件的 window 对象

#### timeStamp

+ Event.timeStamp 属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。
```js
var evt = new Event('foo');
evt.timeStamp // 3683.6999999995896
//它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置。

//计算鼠标移动速度的例子，显示每秒移动的像素数量。
var previousX;
var previousY;
var previousT;

window.addEventListener('mousemove', function(event) {
  if (
    previousX !== undefined &&
    previousY !== undefined &&
    previousT !== undefined
  ) {
    var deltaX = event.screenX - previousX;
    var deltaY = event.screenY - previousY;
    var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    var deltaT = event.timeStamp - previousT;
    console.log(deltaD / deltaT * 1000);
  }

  previousX = event.screenX;
  previousY = event.screenY;
  previousT = event.timeStamp;
});
```

#### isTrusted

+ Event.isTrusted 属性返回一个布尔值，表示该事件是否由真实的用户行为产生。
+ 比如，用户点击链接会产生一个 click 事件，该事件是用户产生的；Event 构造函数生成的事件，则是脚本产生的。

#### detail

+ Event.detail 属性只有浏览器的 UI （用户界面）事件才具有。
+ 该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关
+ 比如，对于 click 和 dblclick 事件，Event.detail 是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；
+ 对于鼠标滚轮事件，Event.detail 是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

### 实例方法

+ Event 的实例方法

+ Event.composedPath()
  + Event.composedPath() 返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

#### 停止行为

1. preventDefault()
   + Event.preventDefault 方法取消浏览器对当前事件的默认行为。
   + 比如取消链接点击的跳转行为
   + 或取消按键的默认输入

2. stopPropagation()
   + stopPropagation 方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。
   + 也就是取消事件的进一步捕获或冒泡，但是如果当前节点定义了多个同类型的监听函数还会触发

3. stopImmediatePropagation()
   + Event.stopImmediatePropagation 方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。
   + 不会触发其他定义当前节点的同类型监听函数，相对于 stopPropagation() 将传播断绝得更彻底
   + 如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。
   + 只要其中有一个监听函数调用了 Event.stopImmediatePropagation 方法，其他的监听函数就不会再执行了。

## 事件委托

+ 事件处理程序添加太多会占用内存影响性能

+ 解决"事件处理程序过多" 问题的方法就是事件委托,事件委托利用了事件冒泡
+ 只指定一个事件处理程序,就可以管理某一个类型的所有事件
+ 例如 click 事件会一直冒泡到 document 层次
+ 也就是说可以为整个页面指定一个 onclick 事件处理程序
+ 而不必给每个可单击的元素分别添加事件处理程序,

+ document 添加一个事件处理程序,将特定的事件委托给它
  + 由于document 对象很快就可以访问,而且可以在页面的生命周期的任何时间点为它添加事件处理程序,也就是说只要可单击的元素呈现在页面上,就可以立刻具备适当的功能
  + 在页面中设置事件处理程序所需的时间更少,只添加一个时间处理程序所需的 DOM 引用更少,所花时间也更短
  + 整个页面占用内存空间更少,能够提升整体性能

```jsx
<ul id="myLinks">
  <li data-id="1"> 需添加点击事件</li>
  <li data-id="2"> 需添加点击事件</li>
  <li data-id="3"> 需添加点击事件</li>
</ul>
//利用事件委托
//将子元素的事件都通过冒泡委托给父元素处理
let list = document.querySelector("#myLinks");
list.addEventListener("click",function(){
  //获取被点击的目标元素的自定义属性ID
  let elementID = parseInt(event.target.dataset.id);
  //判断是哪个子元素被点击了,处理该元素的对应触发事件
  switch(elementID){
    case 1:{
      //触发事件的功能代码
    }
      break;
    case 2:{
      //触发事件的功能代码
    }
      break;
    case 3:{
      //触发事件的功能代码
    }
      break;
    default:
      alert("没有委托");
      break;
  }
},false);
```

### 移除事件处理程序

+ 在带有事件处理程序的元素被删除时,先移除该元素的事件处理程序,
+ 删除按钮也能阻止事件冒泡,目标元素在文档中是事件冒泡的前提
+ 在页面卸载前通过,onunload 事件移除所有事件处理程序

# 事件类型

+ 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
+ 键盘事件，键盘输入
+ 进度事件，资源请求加载
+ 表单事件，值的变化
+ 触摸事件，触摸屏
+ 拖拉事件，拖拽
+ session 历史事件，页面的前进后退
+ 网页状态事件，页面的加载显示隐藏
+ 窗口事件，窗口大小滚动条
+ 剪贴板事件，复制剪切粘贴
+ 焦点事件，获取失去焦点
+ 设备事件
+ 其他事件，复合、变动

## 鼠标事件

+ 鼠标事件指与鼠标相关的事件，继承了 MouseEvent 接口。

+ 具体事件
  + click：按下鼠标（通常是按下主按钮）时触发。
  + dblclick：在同一个元素上双击鼠标时触发。
  + mousedown：按下鼠标键时触发。
  + mouseup：释放按下的鼠标键时触发。
  + mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
  + mouseenter：鼠标进入一个节点时触发，进入子节点不会触发这个事件
    + 不冒泡
  + mouseover：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件
  + mouseout：鼠标离开一个节点时触发，离开父节点也会触发这个事件
  + mouseleave：鼠标离开一个节点时触发，离开父节点不会触发这个事件
    + 不冒泡
  + contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发。
  + wheel：滚动鼠标的滚轮时触发，该事件继承的是 WheelEvent 接口。

+ 注意
  + 页面上的所有元素都支持鼠标事件
  + 除了 mouseenter 和 mouseleave 所有鼠标事件都会冒泡
  + 在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件，如果其中一个被取消就不会触发 click 事件
  + dblclick 双击事件需要触发两次 click 后才会触发

+ 触发顺序
  + click 事件 mousedown 首先触发，mouseup 接着触发，click 最后触发。
  + dblclick 事件 mousedown、mouseup、click 之后触发。
  1. mousedown
  2. mouseup
  3. click
  4. mousedown
  5. mouseup
  6. click
  7. dblclick

+ 鼠标移入移出事件的区别
  + mouseover 事件和 mouseenter 事件，都是鼠标进入一个节点时触发。
  + 两者的区别是，mouseenter 事件只触发一次，而只要鼠标在节点内部移动，mouseover 事件会在子节点上触发多次。
  + mouseout 事件和 mouseleave 事件，都是鼠标离开一个节点时触发。
  + 两者的区别是，在父元素内部离开一个子元素时，mouseleave 事件不会触发，而 mouseout 事件会触发。

### MouseEvent 接口概述

+ MouseEvent 接口代表了鼠标相关的事件
+ 滚轮事件和拖拉事件也是 MouseEvent 实例。

+ MouseEvent 接口继承了 Event 接口，所以拥有 Event 的所有属性和方法。它还有自己的属性和方法。
+ 浏览器原生提供一个 MouseEvent 构造函数，用于新建一个 MouseEvent 实例。
```js
var event = new MouseEvent(type, options);
// MouseEvent 构造函数接受两个参数。
// 第一个参数是字符串，表示事件名称；
// 第二个参数是一个事件配置对象，该参数可选。
```
+ 除了Event接口的实例配置属性，该对象可以配置以下属性，所有属性都是可选的。

+ 鼠标位置配置属性
  + screenX：数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
  + screenY：数值，鼠标相对于屏幕的垂直位置（单位像素），其他与 screenX 相同。
  + clientX：数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
  + clientY：数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与 clientX 相同。

+ 同时按下的键盘按钮
  + ctrlKey：布尔值，是否同时按下了 Ctrl 键，默认值为 false。
  + shiftKey：布尔值，是否同时按下了 Shift 键，默认值为 false。
  + altKey：布尔值，是否同时按下 Alt 键，默认值为 false。
  + metaKey：布尔值，是否同时按下 Meta 键，默认值为 false。
    + （相当于 window 的 window 键，苹果的 cmd 键）

+ 鼠标按键
  + button：数值，表示按下了哪一个鼠标按键，默认值为0,
    + 0 : 鼠标左键
    + 1 : 鼠标中键
    + 2 : 鼠标右键
  + buttons：数值，表示按下了鼠标的哪些键，是一个三个比特位的二进制值，默认为 0。（没有按下任何键）
    + 1（二进制001）表示按下主键（通常是左键）
    + 2（二进制010）表示按下次要键（通常是右键）
    + 4（二进制100）表示按下辅助键（通常是中间键）
    + 因此，如果返回3（二进制011）就表示同时按下了左键和右键。

+ relatedTarget：节点对象，表示事件的相关节点，默认为 null。
  + mouseenter 和 mouseover 事件时，表示鼠标刚刚离开的那个元素节点
  + mouseout 和 mouseleave 事件时，表示鼠标正在进入的那个元素节点。


+ options 对象不可配置的其他属性
  + which 属性对应鼠标按键`[1,2,3,4,5] 分别对应 [左键,中键,右键,侧键,侧键]`

### MouseEvent 接口的实例属性

1. MouseEvent.altKey、ctrlKey、metaKey、shiftKey
   + 这四个属性都返回一个布尔值，表示事件发生时，是否按下对应的键，都是只读属性
   + altKey 属性：Alt 键
   + ctrlKey 属性：Ctrl 键
   + metaKey 属性：相当于 window 的 window 键，苹果的 cmd 键
   + shiftKey 属性：Shift 键

2. MouseEvent.button、buttons
   + MouseEvent.button 属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
     + 0 : 鼠标左键
     + 1 : 鼠标中键
     + 2 : 鼠标右键
   + MouseEvent.buttons 属性返回一个三个比特位的值，表示同时按下了哪些键。
   + 它用来处理同时按下多个鼠标键的情况。该属性只读。
     + 1：二进制为001（十进制的1），表示按下左键。
     + 2：二进制为010（十进制的2），表示按下右键。
     + 4：二进制为100（十进制的4），表示按下中键或滚轮键。
     + 因此，如果返回3（二进制011）就表示同时按下了左键和右键。

3. MouseEvent.clientX、clientY
   + 返回鼠标位置相对于浏览器窗口的位置
   + 这两个属性还分别有一个别名 MouseEvent.x 和 MouseEvent.y。

4. MouseEvent.movementX、movementY
   + MouseEvent.movementX 属性返回当前位置与上一个 mousemove 事件之间的水平距离（单位像素）。
   + Y 返回垂直距离距离
   + 都为只读属性
```js
//数值相当于这样计算
currentEvent.movementX = currentEvent.screenX - previousEvent.screenX
```

5. MouseEvent.screenX、screenY
   + 返回鼠标相对于屏幕的位置像素单位，都为只读

6. MouseEvent.offsetX、offsetY
   + MouseEvent.offsetX 属性返回鼠标位置与目标节点左侧的 padding 边缘的水平距离（单位像素）
   + MouseEvent.offsetY 属性返回与目标节点上方的 padding 边缘的垂直距离。
   + 大致相当于鼠标在元素中的位置
   + 这两个属性都是只读属性。

7. MouseEvent.pageX、pageY
   + MouseEvent.pageX 属性返回鼠标位置与文档左侧边缘的距离（单位像素）
   + MouseEvent.pageY 属性返回与文档上侧边缘的距离（单位像素）
   + 它们的返回值都包括文档不可见的部分。这两个属性都是只读。
   + 鼠标在整个网页中的位置，包括滚动条

8. MouseEvent.relatedTarget
   + MouseEvent.relatedTarget 属性返回事件的相关节点。
   + 对于那些没有相关节点的事件，该属性返回 null。该属性只读。
   + 下表列出不同事件的 target 属性值和 relatedTarget 属性值义。
|  事件名称  |  target 属性  |  relatedTarget 属性  |
|  :-------:  | :--------: | :-------------: |
|  focusin  |  接受焦点的节点  |  丧失焦点的节点  |
|  focusout  |  丧失焦点的节点  |  接受焦点的节点  |
|  mouseenter  |  将要进入的节点  |  将要离开的节点  |
|  mouseleave  |  将要离开的节点  |  将要进入的节点  |
|  mouseout  |  将要离开的节点  |  将要进入的节点  |
|  mouseover  |  将要进入的节点  |  将要离开的节点  |
|  dragenter  |  将要进入的节点  |  将要离开的节点  |
|  dragexit  |  将要离开的节点  |  将要进入的节点  |

9. MouseEvent.detail
   + detail 中包含了一个值，表示在给定位置上发生了多少次单击
   + 在同一个元素上相继发生一次 mousedown 和 mouseup 事件算一次单击 
   + detail 属性从 1 开始计数，如果鼠标在 mousedown 和 mouseup 之间移动了位置，则会重置为 0。

### MouseEvent 接口的实例方法

1. MouseEvent.getModifierState()
   + MouseEvent.getModifierState 方法返回一个布尔值，表示有没有按下特定的功能键。
   + 它的参数是一个表示功能键的字符串。
```js
//是否按下了大写键。
document.addEventListener('click', function (e) {
  console.log(e.getModifierState('CapsLock'));
}, false);
```

### WheelEvent 接口

+ WheelEvent 接口继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。
+ 鼠标滚轮相关的事件只有一个 wheel 事件，用户滚动鼠标的滚轮，就生成这个事件的实例。
+ 浏览器原生提供 WheelEvent() 构造函数，用来生成 WheelEvent 实例。
```js
var wheelEvent = new WheelEvent(type, options);
/**
 * WheelEvent()构造函数可以接受两个参数
 * 第一个是字符串，表示事件类型，对于滚轮事件来说，这个值目前只能是wheel。
 * 第二个参数是事件的配置对象。
 * 该对象的属性除了Event、UIEvent的配置属性以外，还可以接受以下几个属性，所有属性都是可选的。
 * deltaX：数值，表示滚轮的水平滚动量，默认值是 0.0。
 * deltaY：数值，表示滚轮的垂直滚动量，默认值是 0.0。
 * deltaZ：数值，表示滚轮的 Z 轴滚动量，默认值是 0.0。
 * deltaMode：数值，表示相关的滚动事件的单位，适用于上面三个属性。0表示滚动单位为像素，1表示单位为行，2表示单位为页，默认为 0。
*/
```

+ 实例属性
  + 都是只读属性，就是构造函数可以选的属性
  + wheelDelta 属性
    + 当滚动滚轮时，该属性是120的倍数 先前滚动为 120    向后滚动为  -120

### 触摸设备

+ 不支持 dblclick 事件
+ 轻击元素会触发 mousemove 事件，如果此事件导致内容变化，将不再有其他事件发生，如果无变化，依次发生 mousedown 、mouseup、click 事件
+ mousemove 事件也会触发 mouseover 、 mouseout 事件
+ 两个手指放在屏幕上且页面随手指移动而滚动时会触发 mousewheel、scroll 事件

## 键盘事件

+ 键盘事件由用户击打键盘触发，主要有 keydown、keypress、keyup 三个事件
+ 它们都继承了KeyboardEvent接口。

+ keydown：按下键盘时触发。
+ keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
+ keyup：松开键盘时触发该事件。

+ 触发顺序
  1. keydown
  2. keypress
  3. keydown
  4. keypress
  5. ...（重复以上过程）
  6. keyup

### KeyboardEvent 接口概述

+ KeyboardEvent 接口用来描述用户与键盘的互动。
+ 这个接口继承了 Event 接口，并且定义了自己的实例属性和实例方法。

+ 浏览器原生提供 KeyboardEvent 构造函数，用来新建键盘事件的实例。
```js
new KeyboardEvent(type, options)
```
+ KeyboardEvent 构造函数接受两个参数。
+ 第一个参数是字符串，表示事件类型；
+ 第二个参数是一个事件配置对象，该参数可选。
+ 除了 Event 接口提供的属性，还可以配置以下字段，它们都是可选。
  + key：字符串，当前按下的键，默认为空字符串。
  + code：字符串，表示当前按下的键的字符串形式，默认为空字符串。
  + location：整数，当前按下的键的位置，默认为0。
  + ctrlKey：布尔值，是否按下 Ctrl 键，默认为false。
  + shiftKey：布尔值，是否按下 Shift 键，默认为false。
  + altKey：布尔值，是否按下 Alt 键，默认为false。
  + metaKey：布尔值，是否按下 Meta 键，默认为false。
  + repeat：布尔值，是否重复按键，默认为false。

### KeyboardEvent 的实例属性

1. KeyboardEvent.altKey、ctrlKey、metaKey、shiftKey
   + 是否按下了某个按键

2. KeyboardEvent.code
   + KeyboardEvent.code 属性返回一个字符串，表示当前按下的键的字符串形式。该属性只读。
   + 数字键 0 - 9：返回 digit0 - digit9
   + 字母键 A - z：返回 KeyA - KeyZ
   + 功能键 F1 - F12：返回 F1 - F12
   + 方向键：返回 ArrowDown、ArrowUp、ArrowLeft、ArrowRight
   + Alt 键：返回 AltLeft 或 AltRight
   + Shift 键：返回 ShiftLeft 或 ShiftRight
   + Ctrl 键：返回 ControlLeft 或 ControlRight

3. KeyboardEvent.key
   + KeyboardEvent.key 属性返回一个字符串，表示按下的键名。该属性只读。
   + 如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。
   + 如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift。
   + 如果同时按下一个控制键和一个符号键，则返回符号键的键名。
   + 比如，按下 Ctrl + a，则返回 a；按下 Shift + a，则返回大写的 A。
   + 如果无法识别键名，返回字符串Unidentified。

4. KeyboardEvent.location
   + KeyboardEvent.location 属性返回一个整数，表示按下的键处在键盘的哪一个区域。它可能取以下值。
   + 0：处在键盘的主区域，或者无法判断处于哪一个区域。
   + 1：处在键盘的左侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
   + 2：处在键盘的右侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
   + 3：处在数字小键盘。

5. KeyboardEvent.repeat
   + KeyboardEvent.repeat 返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发 keydown 和 keypress 事件，直到用户松开手为止。

6. KeyboardEvent.char
   + char 为按下的字符名称，非字符时为 null

+ textInput 事件
  + 在可编辑区域输入时就会触发
  + 且只有能够实际输入字符的键才会触发
  + event对象包含data属性，为用户输入的字符
  + event对象还有inputMethod 属性 表示把文本输入到文本框中的方法
    + 0 ： 表示浏览器不确定输入方式
    + 1 ：键盘输入
    + 2 ：粘贴
    + 3 ：拖放
    + 4 ： 使用IME输入
    + 5 ： 通过表单选择某一项输入
    + 6 ： 手写
    + 7 ： 语音
    + 8 ： 几种方式组合输入
    + 9 ： 脚本输入

### KeyboardEvent 的实例方法

1. KeyboardEvent.getModifierState()
   + KeyboardEvent.getModifierState() 方法返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。
   + Alt：Alt 键
   + CapsLock：大写锁定键
   + Control：Ctrl 键
   + Meta：Meta 键
   + NumLock：数字键盘开关键
   + Shift：Shift 键

## 进度事件

+ 进度事件用来描述资源加载的进度，主要由 AJAX 请求、<img>、<audio>、<video>、<style></style>、<link>等外部资源的加载触发，继承了 ProgressEvent 接口。
+ 它主要包含以下几种事件。
  + abort：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
  + error：由于错误导致外部资源无法加载时触发。
  + load：外部资源加载成功时触发。
  + loadstart：外部资源开始加载时触发。
  + loadend：外部资源停止加载时触发，发生顺序排在 error、abort、load 等事件的后面。
  + progress：外部资源加载过程中不断触发。
  + timeout：加载超时时触发。

+ error 事件有一个特殊的性质，就是不会冒泡。
+ 所以，子元素的 error 事件，不会触发父元素的 error 事件监听函数。

+ loadend 事件的监听函数，可以用来取代 abort 事件、load 事件、error 事件的监听函数，因为它总是在这些事件之后发生。

+ 除了资源下载，文件上传也存在这些事件。
```js
image.addEventListener('load', function (event) {
  image.classList.add('finished');
});

image.addEventListener('error', function (event) {
  image.style.display = 'none';
});
//有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能 load 和 error 事件的监听函数根本不会执行。所以，比较可靠的方式，是用 complete 属性先判断一下是否加载完成。
function loaded() {
  // ...
}

if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}
//由于 DOM 的元素节点没有提供是否加载错误的属性，所以 error 事件的监听函数最好放在<img> 元素的 HTML 代码中，这样才能保证发生加载错误时百分之百会执行。
<img src="/wrong/url" onerror="this.style.display='none';" />
```

### ProgressEvent 接口

+ ProgressEvent 接口主要用来描述外部资源加载的进度，比如 AJAX 加载、<img>、<video>、<style></style>、<link>等外部资源加载。
+ 进度相关的事件都继承了这个接口。

+ 浏览器原生提供了ProgressEvent()构造函数，用来生成事件实例。
```js
new ProgressEvent(type, options)
```
+ ProgressEvent() 构造函数接受两个参数。
+ 第一个参数是字符串，表示事件的类型，这个参数是必须的。
+ 第二个参数是一个配置对象，表示事件的属性，该参数可选。
+ 配置对象除了可以使用Event接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的。
  + lengthComputable：布尔值，表示加载的总量是否可以计算，默认是 false。
  + loaded：整数，表示已经加载的量，默认是0。
  + total：整数，表示需要加载的总量，默认是0。
  + 同是也是实例属性

```js
//下载
var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', updateProgress, false);
xhr.addEventListener('load', transferComplete, false);
xhr.addEventListener('error', transferFailed, false);
xhr.addEventListener('abort', transferCanceled, false);

xhr.open();

function updateProgress(e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total;
  } else {
    console.log('不能计算进度');
  }
}

//上传
var xhr = new XMLHttpRequest();

xhr.upload.addEventListener('progress', updateProgress, false);
xhr.upload.addEventListener('load', transferComplete, false);
xhr.upload.addEventListener('error', transferFailed, false);
xhr.upload.addEventListener('abort', transferCanceled, false);

xhr.open();
```

## 表单事件

+ 表单事件的种类

### input 事件

+ input 事件当<input>、<select>、<textarea>的值发生变化时触发。
+ 复选框和单选框，在改变选项时也会触发
+ 对于打开 contenteditable 属性的元素，只要值发生变化，也会触发 input 事件。
+ input 事件的一个特点，就是会连续触发，比如用户每按下一次按键，就会触发一次 input 事件。
+ input 事件对象继承了 InputEvent 接口。

+ 该事件跟 change 事件很像，不同之处在于 input 事件在元素的值发生变化后立即发生，而change在元素失去焦点时发生，而内容此时可能已经变化多次。也就是说，如果有连续变化，input事件会触发多次，而change事件只在失去焦点时触发一次。

### select 事件

+ select事件当在 <input>、<textarea> 里面选中文本时触发。
+ 选中的文本可以通过 event.target 元素的 selectionDirection、selectionEnd、selectionStart 和 value 属性拿到。

### change 事件

+ change 事件当<input>、<select>、<textarea>的值发生变化时触发。
+ 它与 input 事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，另一方面 input 事件必然伴随 change 事件。
+ 具体来说，分成以下几种情况。
  + 激活单选框（radio）或复选框（checkbox）时触发。
  + 用户提交时触发。比如，从下列列表（select）完成选择，在日期或文件输入框完成选择。
  + 当文本框或<textarea>元素的值发生改变，并且丧失焦点时触发。

### invalid 事件

+ 用户提交表单时，如果表单元素的值不满足校验条件，就会触发 invalid 事件。
```js
<form>
  <input type="text" required oninvalid="console.log('invalid input')" />
  <button type="submit">提交</button>
</form>
//上面代码中，输入框是必填的。
//如果不填，用户点击按钮提交时，就会触发输入框的 invalid 事件，导致提交被取消。
```

### reset 事件，submit 事件

+ 这两个事件发生在表单对象<form>上，而不是发生在表单的成员上。
+ reset 事件当表单重置（所有表单成员变回默认值）时触发。
+ submit 事件当表单数据向服务器提交时触发。
  + 注意，submit 事件的发生对象是<form>元素，而不是<button>元素，因为提交的是表单，而不是按钮。

### InputEvent 接口

+ InputEvent 接口主要用来描述 input 事件的实例。该接口继承了 Event 接口，还定义了一些自己的实例属性和实例方法。
```js
new InputEvent(type, options)
```
+ InputEvent 构造函数可以接受两个参数。
+ 第一个参数是字符串，表示事件名称，该参数是必需的。
+ 第二个参数是一个配置对象，用来设置事件实例的属性，该参数是可选的。
+ 配置对象的字段除了 Event 构造函数的配置属性，还可以设置下面的字段，这些字段都是可选的。
  + inputType：字符串，表示发生变更的类型
  + data：字符串，表示插入的字符串。如果没有插入的字符串（比如删除操作），则返回 null 或空字符串。
  + dataTransfer：返回一个 DataTransfer 对象实例，该属性通常只在输入框接受富文本输入时有效。
+ InputEvent 的实例属性主要就是上面三个属性，这三个实例属性都是只读的。

1. InputEvent.data
   1. InputEvent.data 属性返回一个字符串，表示变动的内容。
   2. 如输入框，输入一个 a 就返回 a ，删除就返回空字符串或 null

2. InputEvent.inputType
   + InputEvent.inputType 属性返回一个字符串，表示字符串发生变更的类型。
     + 手动插入文本：insertText
     + 粘贴插入文本：insertFromPaste
     + 向后删除：deleteContentBackward
     + 向前删除：deleteContentForward

3. InputEvent.dataTransfer
   + InputEvent.dataTransfer 属性返回一个 DataTransfer 实例。
   + 该属性只在文本框接受粘贴内容（insertFromPaste）或拖拽内容（insertFromDrop）时才有效。

## 触摸事件

+ 浏览器的触摸 API 由三个部分组成。
  + Touch：一个触摸点
  + TouchList：多个触摸点的集合
  + TouchEvent：触摸引发的事件实例

+ Touch 接口的实例对象用来表示触摸点（一根手指或者一根触摸笔），包括位置、大小、形状、压力、目标元素等属性。
+ 有时，触摸动作由多个触摸点（多根手指）组成，多个触摸点的集合由 TouchList 接口的实例对象表示。
+ TouchEvent 接口的实例对象代表由触摸引发的事件，只有触摸屏才会引发这一类事件。

+ 很多时候，鼠标事件和触摸事件同是触发，即使这个时候没用鼠标
+ 这是为了让定义了鼠标事件没定义触摸事件的代码，在触摸屏的情况下仍然能用
+ 用 event.preventDefault 方法阻止发出鼠标事件。

### Touch 接口

+ Touch 接口代表单个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。
+ 浏览器原生提供Touch构造函数，用来生成Touch实例。
```js
var touch = new Touch(touchOptions);
```
+ Touch构造函数接受一个配置对象作为参数，它有以下属性。
  + identifier：必需，类型为整数，表示触摸点的唯一 ID。
  + target：必需，类型为元素节点，表示触摸点开始时所在的网页元素。
  + clientX：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的水平距离，默认为0。
  + clientY：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的垂直距离，默认为0。
  + screenX：可选，类型为数值，表示触摸点相对于屏幕左上角的水平距离，默认为0。
  + screenY：可选，类型为数值，表示触摸点相对于屏幕左上角的垂直距离，默认为0。
  + pageX：可选，类型为数值，表示触摸点相对于网页左上角的水平位置（即包括页面的滚动距离），默认为0。
  + pageY：可选，类型为数值，表示触摸点相对于网页左上角的垂直位置（即包括页面的滚动距离），默认为0。
  + radiusX：可选，类型为数值，表示触摸点周围受到影响的椭圆范围的 X 轴半径，默认为0。
  + radiusY：可选：类型为数值，表示触摸点周围受到影响的椭圆范围的 Y 轴半径，默认为0。
  + rotationAngle：可选，类型为数值，表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间，默认值为0。
  + force：可选，类型为数值，范围在 0 到 1 之间，表示触摸压力。0 代表没有压力，1 代表硬件所能识别的最大压力，默认为 0。

#### Touch 接口的实例属性

1. Touch.identifier
   + Touch.identifier 属性返回一个整数，表示触摸点的唯一 ID。
   + 这个值在整个触摸过程保持不变，直到触摸事件结束。

2. Touch.screenX，Touch.screenY，Touch.clientX，Touch.clientY，pageX，pageY
   + Touch.screenX 属性和 Touch.screenY 属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。
   + Touch.clientX 属性和 Touch.clientY 属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。
   + Touch.pageX 属性和 Touch.pageY 属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。

3. Touch.radiusX，Touch.radiusY，Touch.rotationAngle
   + Touch.radiusX 属性和 Touch.radiusY 属性，分别返回触摸点周围受到影响的椭圆范围的 X 轴半径和 Y 轴半径，单位为像素。乘以 2 就可以得到触摸范围的宽度和高度。
   + Touch.rotationAngle 属性表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间。
   + 上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。
   + 指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。

4. Touch.force
   + Touch.force 属性返回一个 0 到 1 之间的数值，表示触摸压力。
   + 0 代表没有压力，1 代表硬件所能识别的最大压力。

5. Touch.target
   + Touch.target 属性返回一个元素节点，代表触摸发生时所在的那个元素节点。
   + 即使触摸点已经离开了这个节点，该属性依然不变。

### TouchList 接口

+ TouchList 接口表示一组触摸点的集合。
+ 它的实例是一个类似数组的对象，成员是Touch的实例对象，表示所有触摸点。
+ 用户用三根手指触摸，产生的TouchList实例就会包含三个成员，每根手指的触摸点对应一个 Touch 实例对象。

+ 它的实例主要通过触摸事件的 TouchEvent.touches、TouchEvent.changedTouches、TouchEvent.targetTouches 这几个属性获取。

+ 它的实例属性和实例方法只有两个。
  + TouchList.length：数值，表示成员数量（即触摸点的数量）。
  + TouchList.item()：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）。

### TouchEvent 接口

+ TouchEvent 接口继承了 Event 接口，表示由触摸引发的事件实例，通常来自触摸屏或轨迹板。
+ 除了被继承的属性以外，它还有一些自己的属性。
+ 浏览器原生提供TouchEvent()构造函数，用来生成触摸事件的实例。
```js
new TouchEvent(type, options)
```
+ TouchEvent() 构造函数可以接受两个参数，第一个参数是字符串，表示事件类型；
+ 第二个参数是事件的配置对象，该参数是可选的，对象的所有属性也是可选的。
+ 除了Event接口的配置属性，该接口还有一些自己的配置属性。
  + touches：TouchList 实例，代表所有的当前处于活跃状态的触摸点，默认值是一个空数组[]。
  + targetTouches：TouchList 实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点，默认值是一个空数组[]。
  + changedTouches：TouchList 实例，代表本次触摸事件的相关触摸点，默认值是一个空数组[]。
  + ctrlKey：布尔值，表示 Ctrl 键是否同时按下，默认值为 false。
  + shiftKey：布尔值，表示 Shift 键是否同时按下，默认值为 false。
  + altKey：布尔值，表示 Alt 键是否同时按下，默认值为 false。
  + metaKey：布尔值，表示 Meta 键（或 Windows 键）是否同时按下，默认值为 false。
  + 这些同时也是实例属性

+ 实例属性
  1. TouchEvent.changedTouches
     + TouchEvent.changedTouches 属性返回一个 TouchList 实例，成员是一组 Touch 实例对象，表示本次触摸事件的相关触摸点。
     + 对于不同的时间，该属性的含义有所不同。
       + touchstart 事件：被激活的触摸点
       + touchmove 事件：发生变化的触摸点
       + touchend 事件：消失的触摸点（即不再被触碰的点）
  2. TouchEvent.touches
     + TouchEvent.touches 属性返回一个 TouchList 实例，成员是所有仍然处于活动状态（即触摸中）的触摸点。
     + 一般来说，一个手指就是一个触摸点。
  3. TouchEvent.targetTouches
     + TouchEvent.targetTouches 属性返回一个 TouchList 实例，成员是触摸事件的目标元素节点内部、所有仍然处于活动状态（即触摸中）的触摸点。

### 触摸事件的种类

+ 触摸引发的事件，有以下几种。可以通过 TouchEvent.type 属性，查看到底发生的是哪一种事件。
  + touchstart：用户开始触摸时触发，它的 target 属性返回发生触摸的元素节点。
  + touchend：用户不再接触触摸屏时
  + touchmove：用户移动触摸点时触发
  + touchcancel：触摸点取消时触发

## 拖拉事件

+ 让元素节点可拖拉，可以将该节点的 draggable 属性设为 true。
```html
<div draggable="true">
  此区域可拖拉
</div>
```

+ 图片和 a 链接默认可拖动， 将 draggable 属性设置为 false 可以防止拖动
+ 元素节点设置为可拖动后，就无法选择该元素内部的文本了

+ 当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。

  + drag：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。

  + dragstart：用户开始拖拉时，在被拖拉的节点上触发，该事件的 target 属性是被拖拉的节点。
  + 通常应该在这个事件的监听函数中，指定拖拉的数据。

  + dragend：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的 target 属性是被拖拉的节点。它与 dragstart 事件，在同一个节点上触发。
  + 不管拖拉是否跨窗口，或者中途被取消，dragend 事件总是会触发的。

  + dragenter：拖拉进入当前节点时，在当前节点上触发一次，该事件的 target 属性是当前节点。
  + 通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。
  + 如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。
  + 在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。

  + dragover：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的 target 属性是当前节点。
  + 该事件与 dragenter 事件的区别是，dragenter 事件在进入该节点时触发，然后只要没有离开这个节点，dragover 事件会持续触发。

  + dragleave：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的 target 属性是当前节点。
  + 如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。

  + drop：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。
  + 注意，如果当前节点不允许 drop，即使在该节点上方松开鼠标键，也不会触发该事件。
  + 如果用户按下 ESC 键，取消这个操作，也不会触发该事件。
  + 该事件的监听函数负责取出拖拉数据，并进行相关处理。

+ 触发顺序
  + dragstart
  + drag
  + dragend
+ 当拖动元素被放置到有效的放置目标上时，会依次触发以下事件
  + dragenter
  + dragover
  + dragleave 或 drop


```js
//HTML 代码
<div class="dropzone">
  <div id="draggable" draggable="true">
    该节点可拖拉 疯狂拖动
  </div>
</div>
<div class="dropzone"></div>
<div class="dropzone"></div>
<div class="dropzone"></div>

//被拖动的节点
var dragged;

document.addEventListener('dragstart', function (event) {
  // 保存被拖拉节点
  dragged = event.target;
  // 被拖拉节点的背景色变透明
  event.target.style.opacity = 0.5;
}, false);

document.addEventListener('dragend', function (event) {
  // 被拖拉节点的背景色恢复正常
  event.target.style.opacity = '';
}, false);

document.addEventListener('dragover', function (event) {
  // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
  event.preventDefault();
}, false);

document.addEventListener('dragenter', function (event) {
  // 目标节点的背景色变紫色
  // 由于该事件会冒泡，所以要过滤节点
  if (event.target.className === 'dropzone') {
    event.target.style.background = 'purple';
  }
}, false);

document.addEventListener('dragleave', function( event ) {
  // 目标节点的背景色恢复原样
  if (event.target.className === 'dropzone') {
    event.target.style.background = '';
  }
}, false);

document.addEventListener('drop', function( event ) {
  // 防止事件默认行为（比如某些元素节点上可以打开链接），
  event.preventDefault();
  if (event.target.className === 'dropzone') {
    // 恢复目标节点背景色
    event.target.style.background = '';
    // 将被拖拉节点插入目标节点
    // dragged.parentNode.removeChild(dragged);
    event.target.appendChild( dragged );
  }
}, false);
```
+ 关于拖拉事件，有以下几个注意点。
  + 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
  + 将文件从操作系统拖拉进浏览器，不会触发 dragstart 和 dragend 事件。
  + dragenter 和 dragover 事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。
  + 由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。
  + 如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。
+ 自定义放置目标
  + 重写元素的 dragenter 和 dragover 事件的默认行为（取消默认行为），可以使元素变成可以放置的目标

### DragEvent 接口

+ 拖拉事件都继承了 DragEvent 接口，这个接口又继承了 MouseEvent 接口和 Event 接口。
+ 浏览器原生提供一个 DragEvent() 构造函数，用来生成拖拉事件的实例对象。
```js
new DragEvent(type, options)
```
+ DragEvent() 构造函数接受两个参数
+ 第一个参数是字符串，表示事件的类型，该参数必须；
+ 第二个参数是事件的配置对象，用来设置事件的属性，该参数可选。
+ 配置对象除了接受 MouseEvent 接口和 Event 接口的配置属性
+ 还可以设置 dataTransfer 属性要么是 null，要么是一个 DataTransfer 接口的实例。

### DataTransfer 接口概述

+ 所有拖拉事件的实例都有一个 DragEvent.dataTransfer 属性，用来读写需要传递的数据。
+ 这个属性的值是一个 DataTransfer 接口的实例。
+ 浏览器原生提供一个 DataTransfer() 构造函数，用来生成 DataTransfer 实例对象。
```js
var dataTrans = new DataTransfer();
```
+ DataTransfer()构造函数不接受参数。

+ 拖拉的数据分成两方面：数据的种类（又称格式）和数据的值。
+ 数据的种类是一个 MIME 字符串（比如text/plain、image/jpeg），数据的值是一个字符串。
+ 一般来说，如果拖拉一段文本，则数据默认就是那段文本；如果拖拉一个链接，则数据默认就是链接的 URL。

+ 拖拉事件开始时，开发者可以提供数据类型和数据值。
+ 拖拉过程中，开发者通过 dragenter 和 dragover 事件的监听函数，检查数据类型，以确定是否允许放下（drop）被拖拉的对象。
+ 比如，在只允许放下链接的区域，检查拖拉的数据类型是否为 text/uri-list。

+ 发生 drop 事件时，监听函数取出拖拉的数据，对其进行处理。

### DataTransfer 的实例属性

1. DataTransfer.dropEffect
   + DataTransfer.dropEffect 属性用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状。
   + 它可能取下面的值。
     + copy：复制被拖拉的节点
     + move：移动被拖拉的节点
     + link：创建指向被拖拉的节点的链接
     + none：无法放下被拖拉的节点
   + 除了上面这些值，设置其他的值都是无效的。
```js
target.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});
```
+ dropEffect 属性一般在 dragenter 和 dragover 事件的监听函数中设置
+ 对于 dragstart、drag、dragleave 这三个事件，该属性不起作用。
+ 因为该属性只对接受被拖拉的节点的区域有效，对被拖拉的节点本身是无效的。
+ 进入目标区域后，拖拉行为会初始化成设定的效果。

2. DataTransfer.effectAllowed
   + DataTransfer.effectAllowed 属性设置本次拖拉中允许的效果。它可能取下面的值。
     + copy：复制被拖拉的节点
     + move：移动被拖拉的节点
     + link：创建指向被拖拉节点的链接
     + copyLink：允许 copy 或 link
     + copyMove：允许 copy 或 move
     + linkMove：允许 link 或 move
     + all：允许所有效果
     + none：无法放下被拖拉的节点
     + uninitialized：默认值，等同于 all
   + 这个属性与 dropEffect 属性是同一件事的两个方面。
   + 前者设置被拖拉的节点允许的效果，后者设置接受拖拉的区域的效果，它们往往配合使用。
   + dragstart 事件的监听函数，可以用来设置这个属性。其他事件的监听函数里面设置这个属性是无效的。
   + 只要 dropEffect 属性和 effectAllowed 属性之中，有一个为 none，就无法在目标节点上完成 drop 操作。

3. DataTransfer.files
   + DataTransfer.files 属性是一个 FileList 对象，包含一组本地文件，可以用来在拖拉操作中传送。
   + 如果本次拖拉不涉及文件，则该属性为空的 FileList 对象。
   + 通过 dataTransfer.files 属性读取被拖拉的文件的信息。如果想要读取文件内容，就要使用 FileReader 对象。

4. DataTransfer.types
   + DataTransfer.types 属性是一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 MIME 值）。
   + 比如，如果拖拉的是文字，对应的成员就是 text/plain。

5. DataTransfer.items
   + DataTransfer.items 属性返回一个类似数组的只读对象（DataTransferItemList 实例），每个成员就是本次拖拉的一个对象（DataTransferItem 实例）。
   + 如果本次拖拉不包含对象，则返回一个空对象。
   + DataTransferItemList 实例具有以下的属性和方法。
     + length：返回成员的数量
     + add(data, type)：增加一个指定内容和类型（比如text/html和text/plain）的字符串作为成员
     + add(file)：add 方法的另一种用法，增加一个文件作为成员
     + remove(index)：移除指定位置的成员
     + clear()：移除所有的成员
   + DataTransferItem 实例具有以下的属性和方法。
     + kind：返回成员的种类（string还是file）。
     + type：返回成员的类型（通常是 MIME 值）。
     + getAsFile()：如果被拖拉是文件，返回该文件，否则返回 null。
     + getAsString(callback)：如果被拖拉的是字符串，将该字符传入指定的回调函数处理。该方法是异步的，所以需要传入回调函数。

### DataTransfer 的实例方法

1. DataTransfer.setData() 
   + 该方法用来设置拖拉事件所带有的数据。该方法没有返回值。
   + 如果是拖拉文本框或者拖拉选中的文本，会默认将对应的文本数据，添加到 dataTransfer 属性，不用手动指定。
   + 使用该方法可以替换原有数据
```js
event.dataTransfer.setData('text/plain', 'Text to drag');

//可以一次提供多种格式的数据。
var dt = event.dataTransfer;
dt.setData('application/x-bookmark', bookmarkString);
dt.setData('text/uri-list', 'http://www.example.com');
dt.setData('text/plain', 'http://www.example.com');
```
+ 该方法接受两个参数，都是字符串。
+ 第一个参数表示数据类型（比如text/plain），第二个参数是具体数据。
+ 如果指定类型的数据在 dataTransfer 属性不存在，那么这些数据将被加入，否则原有的数据将被新数据替换。

2. DataTransfer.getData()
   + DataTransfer.getData() 方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用setData方法添加的数据）。
   + 如果指定类型的数据不存在，则返回空字符串。通常只有 drop 事件触发后，才能取出数据。
```js
function onDrop(event) {
  var data = event.dataTransfer.getData('text/plain');
  event.target.textContent = data;
  event.preventDefault();
}
//注意，这时还必须取消浏览器的默认行为，因为假如用户拖拉的是一个链接，浏览器默认会在当前窗口打开这个链接。

//getData方法返回的是一个字符串，如果其中包含多项数据，就必须手动解析。
function doDrop(event) {
  var lines = event.dataTransfer.getData('text/uri-list').split('\n');
  for (let line of lines) {
    let link = document.createElement('a');
    link.href = line;
    link.textContent = line;
    event.target.appendChild(link);
  }
  event.preventDefault();
}
//getData方法返回的是一组链接，就必须自行解析。类型值指定为URL，可以取出第一个有效链接。
var link = event.dataTransfer.getData('URL');
//下面的例子是从多种类型的数据里面取出数据。
function doDrop(event) {
  var types = event.dataTransfer.types;
  var supportedTypes = ['text/uri-list', 'text/plain'];
  types = supportedTypes.filter(function (value) { types.includes(value) });
  if (types.length) {
    var data = event.dataTransfer.getData(types[0]);
  }
  event.preventDefault();
}
```

3. DataTransfer.clearData()
   + DataTransfer.clearData() 方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。
   + 如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。
```js
event.dataTransfer.clearData('text/uri-list');
//上面代码清除事件所带的text/uri-list类型的数据。
/**
 * 该方法不会移除拖拉的文件，因此调用该方法后，DataTransfer.types属性可能依然会返回Files类型（前提是存在文件拖拉）。
 * 注意，该方法只能在dragstart事件的监听函数之中使用，因为这是拖拉操作的数据唯一可写的时机。
*/
```

4. DataTransfer.setDragImage()
   + 拖动过程中（dragstart事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。
   + 这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。
   + DataTransfer.setDragImage() 方法可以自定义这张图片。
   + 它接受三个参数。第一个是<img>节点或者<canvas>节点，如果省略或为null，则使用被拖动的节点的外观；
   + 第二个和第三个参数为鼠标相对于该图片左上角的横坐标和纵坐标。
```js
/* HTML 代码如下
 <div id="drag-with-image" class="drag-demo" draggable="true">
   drag me
 </div>
*/

var div = document.getElementById('drag-with-image');
div.addEventListener('dragstart', function (e) {
  var img = document.createElement('img');
  img.src = 'http://path/to/img';
  e.dataTransfer.setDragImage(img, 0, 0);
}, false);
```

## 资源事件

### beforeunload 事件

+ beforeunload 事件在窗口、文档、各种资源将要卸载前触发。它可以用来防止用户不小心卸载资源。
+ 如果该事件对象的 returnValue 属性是一个非空字符串，那么浏览器就会弹出一个对话框，询问用户是否要卸载该资源。
+ 但是，用户指定的字符串可能无法显示，浏览器会展示预定义的字符串。如果用户点击“取消”按钮，资源就不会卸载。

+ 许多手机浏览器（比如 Safari）默认忽略这个事件，桌面浏览器也有办法忽略这个事件。所以，它可能根本不会生效，不能依赖它来阻止用户关闭浏览器窗口，最好不要使用这个事件。

### unload 事件

+ unload 事件在窗口关闭或者 document 对象将要卸载时触发。它的触发顺序排在 beforeunload、pagehide 事件后面。
+ unload 事件发生时，文档处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI 互动全部无效。这个事件是无法取消的，即使在监听函数里面抛出错误，也不能停止文档的卸载。

+ 手机上，浏览器或系统可能会直接丢弃网页，这时该事件根本不会发生。
+ 而且跟 beforeunload 事件一样，一旦使用了 unload 事件，浏览器就不会缓存当前网页，理由同上。
+ 因此，任何情况下都不应该依赖这个事件，指定网页卸载时要执行的代码，可以考虑完全不使用这个事件。
+ 多用来清除引用，避免内存泄漏

+ 该事件可以用pagehide代替。

### load 事件，error 事件

+ load 事件在页面或某个资源加载成功时触发。
+ 注意，页面或资源从浏览器缓存加载，并不会触发 load 事件。
+ error 事件是在页面或资源加载失败时触发。abort 事件在用户取消加载时触发。

+ 这三个事件实际上属于进度事件，不仅发生在document对象，还发生在各种外部资源上面。

+ 页面的load事件也可以用 pageshow 事件代替。

## session 历史事件

### pageshow 事件，pagehide 事件

+ 默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。
+ pageshow 事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。
+ 如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

+ 第一次加载时，它的触发顺序排在load事件后面。
+ 从缓存加载时，load 事件不会触发，因为网页在缓存中的样子通常是 load 事件的监听函数运行后的样子，所以不必重复执行。
+ 同理，如果是从缓存中加载页面，网页内初始化的 JavaScript 脚本（比如 DOMContentLoaded 事件的监听函数）也不会执行。

+ pageshow 事件有一个 persisted 属性，返回一个布尔值。
+ 页面第一次加载时，这个属性是 false；当页面从缓存加载时，这个属性是 true。

+ pagehide 事件与 pageshow 事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。
+ 它与 unload 事件的区别在于，如果在 window 对象上定义 unload 事件的监听函数之后，页面不会保存在缓存中，而使用 pagehide 事件，页面会保存在缓存中。

+ pagehide 事件实例也有一个 persisted 属性，将这个属性设为 true，就表示页面要保存在缓存中；
+ 设为 false，表示网页不保存在缓存中，这时如果设置了 unload 事件的监听函数，该函数将在 pagehide 事件后立即运行。

+ 如果页面包含<frame>或<iframe>元素，则<frame>页面的pageshow事件和pagehide事件，都会在主页面之前触发。

+ 注意，这两个事件只在浏览器的history对象发生变化时触发，跟网页是否可见没有关系。

### popstate 事件

+ popstate 事件在浏览器的 history 对象的当前记录发生显式切换时触发。
+ 调用 history.pushState() 或 history.replaceState()，并不会触发popstate事件。
+ 该事件只在用户在 history 记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用 history.back()、history.forward()、history.go() 时触发。

+ 该事件对象有一个 state 属性，保存 history.pushState 方法和 history.replaceState 方法为当前记录添加的 state 对象。
```js
window.onpopstate = function (event) {
  console.log('state: ' + event.state);
};
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}
```

### hashchange 事件

+ hashchange 事件在 URL 的 hash 部分（即#号后面的部分，包括#号）发生变化时触发。
+ 该事件一般在 window 对象上监听。
+ hashchange 的事件实例具有两个特有属性：oldURL 属性和 newURL 属性，分别表示变化前后的完整 URL。

## 网页状态事件

### DOMContentLoaded 事件

+ 网页下载并解析完成以后，浏览器就会在 document 对象上触发 DOMContentLoaded 事件。
+ 这时，仅仅完成了网页的解析（整张页面的 DOM 生成了），所有外部资源（样式表、脚本、iframe 等等）可能还没有下载结束。
+ 也就是说，这个事件比 load 事件，发生时间早得多。

+ 注意，网页的 JavaScript 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发 DOMContentLoaded 事件。

### readystatechange 事件

+ readystatechange 事件当 Document 对象和 XMLHttpRequest 对象的 readyState 属性发生变化时触发。
+ document.readyState 有三个可能的值：
  + loading（网页正在加载）
  + interactive（网页已经解析完成，但是外部资源仍然处在加载状态）
  + complete（网页和所有外部资源已经结束加载，load 事件即将触发）。
+ 这个事件可以看作 DOMContentLoaded 事件的另一种实现方法。

### visibilitychange 事件

+ 页面被最小化或切换，从最小化回到该页，或切回该页面都可以触发 visibilitychange 事件
+ 通可以 document 的 hidden 属性判断页面是否可见
+ 可以在页面不可见是减少网络请求暂停游戏，或改变页面标题等

## 窗口事件

### scroll 事件

+ scroll 事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。
```js
window.addEventListener('scroll', callback);
```
+ 该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。
+ 推荐的做法是使用 requestAnimationFrame 或 setTimeout 控制该事件的触发频率，然后可以结合 customEvent 抛出一个新事件。
```js
(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将 scroll 事件转为 optimizedScroll 事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log('Resource conscious scroll callback!');
});
/** 上面代码中，throttle() 函数用于控制事件触发频率，它有一个内部函数func()
 * 每次 scroll 事件实际上触发的是这个函数
 * func() 函数内部使用 requestAnimationFrame() 方法
 * 保证只有每次页面重绘时（每秒60次），才可能会触发optimizedScroll事件
 * 从而实际上将 scroll 事件转换为 optimizedScroll 事件，触发频率被控制在每秒最多60次。
 */

// 定时器节流写法
(function() {
  window.addEventListener('scroll', scrollThrottler, false);

  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        actualScrollHandler();
      }, 66);
    }
  }

  function actualScrollHandler() {
    // ...
  }
}());
```

### resize 事件

+ resize 事件在改变浏览器窗口大小时触发，主要发生在 window 对象上面。
+ 该事件也会连续地大量触发，所以最好像上面的 scroll 事件一样，通过 throttle 函数控制事件触发频率。

### fullscreenchange 事件，fullscreenerror 事件

+ fullscreenchange 事件在进入或退出全屏状态时触发，该事件发生在 document 对象上面。
+ fullscreenerror 事件在浏览器无法切换到全屏状态时触发。

## 剪贴板事件

+ 以下三个事件属于剪贴板操作的相关事件。
  + cut：将选中的内容从文档中移除，加入剪贴板时触发。
  + copy：进行复制动作时触发。
  + paste：剪贴板内容粘贴到文档后触发。
+ 主动触发 ``document.execCommand('copy');``

+ 这三个事件都是 ClipboardEvent 接口的实例。ClipboardEvent 有一个实例属性 clipboardData，是一个 DataTransfer 对象，存放剪贴的数据。
+ DataTransfer 记录在 拖拉事件的 DataTransfer 部分
```js
document.addEventListener('copy', function (e) {
  e.clipboardData.setData('text/plain', 'Hello, world!');
  e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  e.preventDefault();
});
```

## 焦点事件

+ 焦点事件发生在元素节点和 document 对象上面，与获得或失去焦点相关。
+ 它主要包括以下四个事件。
  + focus：元素节点获得焦点后触发，该事件不会冒泡。
  + blur：元素节点失去焦点后触发，该事件不会冒泡。
  + focusin：元素节点将要获得焦点时触发，发生在 focus 事件之前。该事件会冒泡。
  + focusout：元素节点将要失去焦点时触发，发生在 blur 事件之前。该事件会冒泡。

+ 这四个事件都继承了 FocusEvent 接口。FocusEvent 实例具有以下属性。
  + FocusEvent.target：事件的目标节点。
  + FocusEvent.relatedTarget：对于 focusin 事件，返回失去焦点的节点；
  + 对于 focusout 事件，返回将要接受焦点的节点；对于 focus 和 blur 事件，返回null。

+ 由于 focus 和 blur 事件不会冒泡，只能在捕获阶段触发，所以 addEventListener 方法的第三个参数需要设为 true。

## 设备事件

+ deviceorientation 事件  移动设备
  + 在window对象上触发
  + 设备的摆放方向，X、Y、Z 轴来表示 水平放置时都为0
  + 事件对象中包含以下属性
    + alpha ：围绕Z轴旋转时（即左右旋转时），Y轴的度数差，介于0~360之间的浮点数
    + beta ：围绕X轴（前后翻转），Z轴的度数差，介于-180 ~180 之间的浮点数
    + gamma ：围绕Y轴（扭转设备时），Z轴的度数差，介于-90~90之间的浮点数
    + absolute ：布尔值，表示设备是否返回一个绝对值
    + compassCalibrated ：布尔值，表示设备的指南针是否校准过
+ devicemotion 事件
  + 该事件告诉开发人员设备什么时候移动，不仅仅是设备方向如何改变，能够检测到设备是不是在往下掉，或者是不是被走着的人拿在手上
  + 事件对象中包含
    + acceleration ：包含X、Y、Z、属性的对象，在不考虑重力的情况下，告诉你每个方向上的加速度

## 其他事件

### 复合事件

+ 用于处理 IME 的输入序列，IME 通常需要同时按住多个键，但最终只输入一个字符

1. compositionstart：在 IME 的文本复合系统打开时触发
2. compositionupdate：在向输入字段插入新字符时触发
3. compositionend： 在 IEM 的文本复合系统关闭时触发，表示返回正常键盘输入模式

### 变动事件

+ 在文档 DOM 结构发生变化时发生

1. DOMSubtreeModified : 在 DOM 结构中发生任何变化时触发，这个事件在其他任何事件触发后都会触发
2. DOMNodeInserted : 在一个节点作为子节点被插入到另一个节点中时触发。
3. DOMNodeRemoved : 在节点从其父节点中被移除时触发
4. DOMNodeInsertedIntoDocument:在一个节点被直接插人文档或通过子树间接插入文档之后触发。这个事件在 DOMNodeInserted 之后触发。
5. DOMNodeRemovedFromDocument:在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在 DOMNodeRemoved 之后触发。
6. DOMAttrModified:在特性被修改之后触发。
7. DOMCharacterDataModified:在文本节点的值发生变化时触发。

## CustomEvent 接口

+ CustomEvent 接口用于生成自定义的事件实例。
+ 那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。
+ 如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象。
+ 浏览器原生提供 CustomEvent() 构造函数，用来生成 CustomEvent 事件实例。
```js
new CustomEvent(type, options)
```
+ CustomEvent() 构造函数接受两个参数。
+ 第一个参数是字符串，表示事件的名字，这是必须的。
+ 第二个参数是事件的配置对象，这个参数是可选的。
+ CustomEvent 的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。
  + detail：表示事件的附带数据，默认为 null。
```js
var myEvent = new CustomEvent('myEvent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});

document.addEventListener('myEvent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

document.dispatchEvent(myEvent);
```

## GlobalEventHandlers 接口

+ 指定事件的回调函数，推荐使用的方法是元素的 addEventListener 方法。
```js
div.addEventListener('click', clickHandler, false);
```
+ 除了之外，还有一种方法可以直接指定事件的回调函数。
```js
div.onclick = clickHandler;
```
+ 这个接口是由 GlobalEventHandlers 接口提供的。
+ 它的优点是使用比较方便，缺点是只能为每个事件指定一个回调函数，并且无法指定事件触发的阶段（捕获阶段还是冒泡阶段）。

+ HTMLElement、Document 和 Window 都继承了这个接口

1. GlobalEventHandlers.onabort
   + 某个对象的abort事件（停止加载）发生时，就会调用onabort属性指定的回调函数。
   + 一般用在 img 上

2. GlobalEventHandlers.onerror
   + error 事件发生时，就会调用 onerror 属性指定的回调函数。
   + error 事件分成两种。
   + 一种是 JavaScript 的运行时错误，这会传到 window 对象，导致 window.onerror()。
   + window.onerror 的处理函数共接受五个参数，含义如下。
     + message：错误信息字符串
     + source：报错脚本的 URL
     + lineno：报错的行号，是一个整数
     + colno：报错的列号，是一个整数
     + error： 错误对象
   + 另一种是资源加载错误，比如<img>或<script>加载的资源出现加载错误。这时，Error 对象会传到对应的元素，导致该元素的 onerror 属性开始执行。

3. GlobalEventHandlers.onload、GlobalEventHandlers.onloadstart
   + 元素完成加载时，会触发 load 事件，执行 onload()。
   + 它的典型使用场景是 window 对象和<img>元素。
   + 对于 window 对象来说，只有页面的所有资源加载完成（包括图片、脚本、样式表、字体等所有外部资源），才会触发 load 事件。
   + 对于<img>和<video>等元素，加载开始时还会触发 loadstart 事件，导致执行 onloadstart。

4. GlobalEventHandlers.onfocus，GlobalEventHandlers.onblur
   + 当前元素获得焦点时，会触发 element.onfocus；失去焦点时，会触发 element.onblur。
   + 注意，如果不是可以接受用户输入的元素，要触发 onfocus，该元素必须有 tabindex 属性。

5. GlobalEventHandlers.onscroll
   + 页面或元素滚动时，会触发 scroll 事件，导致执行 onscroll()

6. GlobalEventHandlers.oncontextmenu，GlobalEventHandlers.onshow
   + 用户在页面上按下鼠标的右键，会触发 contextmenu 事件，导致执行 oncontextmenu()。
   + 如果该属性执行后返回 false，就等于禁止了右键菜单。
   + document.oncontextmenu 与 window.oncontextmenu 效果一样。
   + 元素的右键菜单显示时，会触发该元素的 onshow 监听函数。

### 其他的事件属性

+ 鼠标的事件
  - onclick
  - ondblclick
  - onmousedown
  - onmouseenter
  - onmouseleave
  - onmousemove
  - onmouseout
  - onmouseover
  - onmouseup
  - onwheel

+ 键盘的事件属性。
  - onkeydown
  - onkeypress
  - onkeyup

+ 焦点的事件属性。
  - onblur
  - onfocus

+ 表单的事件属性。
  - oninput
  - onchange
  - onsubmit
  - onreset
  - oninvalid
  - onselect

+ 触摸的事件属性。
  - ontouchcancel
  - ontouchend
  - ontouchmove
  - ontouchstart

+ 拖动的事件属性分成两类：一类与被拖动元素相关，另一类与接收被拖动元素的容器元素相关。

+ 被拖动元素的事件属性。
  - ondragstart：拖动开始
  - ondrag：拖动过程中，每隔几百毫秒触发一次
  - ondragend：拖动结束

+ 接收被拖动元素的容器元素的事件属性。
  - ondragenter：被拖动元素进入容器元素。
  - ondragleave：被拖动元素离开容器元素。
  - ondragover：被拖动元素在容器元素上方，每隔几百毫秒触发一次。
  - ondrop：松开鼠标后，被拖动元素放入容器元素。

+ <dialog>对话框元素的事件属性。
  - oncancel
  - onclose

# JavaScript

## 本地储存

+ ```javascript
  ☞  localStorage：
  1. 永久生效
  2. 多窗口共享
  3. 容量大约为20M
  
  ◆window.localStorage.setItem(key,value)  设置存储内容
  ◆window.localStorage.getItem(key)  		 获取内容
  ◆window.localStorage.key(0)
  ◆window.localStorage.key
  ◆window.localStorage.removeItem(key)	 删除内容
  ◆window.localStorage.clear()			清空内容
  
  ☞ sessionStorage：
  1. 生命周期为关闭当前浏览器窗口
  2. 可以在同一个窗口下访问
  3. 数据大小为5M左右
  
  ◆window.sessionStorage.setItem(key,value)
  ◆window.sessionStorage.getItem(key)
  ◆window.sessionStorage.removeItem(key)
  ◆window.sessionStorage.clear()
  
  window.sessionStorage.setItem("name","123");
  
  var list=
  '[{"name":"zhans","age":"18","gender":"男"},
  {"name":"lis","age":"23","gender": "女"}]';
  window.sessionStorage.setItem("list",list);
  ```


## 获取网络状态

+ ```javascript
    ☞ 获取当前网络状态
    		 window.navigator.onLine 返回一个布尔值
    
    ☞ 网络状态事件
    		 1. window.ononline		网络链接时触发
    		 2. window.onoffline	网络断开是触发
  ```

## 获取当前位置

+ ```javascript
    ☞  获取一次当前位置
    	  window.navigator.geolocation.getCurrentPosition(success,error);
    
    1. coords.latitude   维度
        2. coords.longitude   经度
    
    ☞  实时获取当前位置
    	  window.navigator.geolocation.watchPosition(success,error);
  ```