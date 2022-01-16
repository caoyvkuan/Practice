# ECMAScript - JavaScript

+ javascript简称js , 是在1995年 , 由美国人布莱登艾奇用10天时间研发
+ js诞生的目的解决表单验证是否合法
+ JS组成
  + 核心 `ECMAScript`		提供核心语言功能
  + 文档对象模型 `DOM`      提供访问和操作网页内容的方法和接口
    + 元素的属性可以作为 独一无二 的变量使用  如：（ Element.aaa ）
  + 浏览器对象模型 `BOM`   提供与浏览器交互的方法和接口

+ 规定了语法的组成部分
  + 语法
  + 类型
  + 语句
  + 关键字
  + 保留字
  + 操作符
  + 对象

# 浏览器端的JS

+ ECMAScript：基础语法(数据类型、运算符、函数。。。JS语法标准 )
+ BOM(浏览器对象模型)：window、location、history、navigator。。。
+ DOM(文档对象模型)：div、p、span。。。

# 语言特性

+ JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。
+ 分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
+ 表达式不需要分号结尾。一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。

## 代码规范

+ 关键字和保留字
  + 不能用来变量命名或函数命名
+ 统一缩进风格
+ 行尾的分号
+ 用大写字母表示全局变量名
+ 分清全等和相等的使用情况
+ 使用大括号表示区块
+ 起首大括号紧跟关键字跟不容易出错
```js
function aa(){

}
//这种方式容易出错
function aa()
{

}
```

+ 圆括号
  + 圆括号（parentheses）在 JavaScript 中有两种作用，一种表示函数的调用，另一种表示表达式的组合（grouping）。
```js
// 圆括号表示函数的调用
console.log('abc');
// 圆括号表示表达式的组合
(1 + 2) * 3
//为了区分，在调用方法时括号与关键字中间加一个空格
foo ();
```

## 严格模式

+ `"use strict"` 严格模式声明
  + 指令将浏览器引擎转换为“现代”模式，改变一些内建特性的行为
  + 通过在脚本文件/函数开头添加 `"use strict";` 声明，即可启用严格模式。全局/局部开启严格模式：
  + `"use strict"` 需要定义在脚本最顶部（函数内除外），否则严格模式可能无法启用。一旦进入了严格模式，就无法关闭严格模式。
  + 启用 `"use strict"` 后，为未定义元素赋值将抛出异常：
```js
   "use strict";
   leo = 17; // Uncaught ReferenceError: leo is not defined
```
  + 启用 `"use strict"` 后，试图删除不可删除的属性时会抛出异常：
```js
   "use strict";
   delete Object.prototype; // Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
```

+ 严格模式是从 ES5 进入标准的，主要目的有以下几个。
  + 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
  + 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
  + 提高编译器效率，增加运行速度。
  + 为未来新版本的 JavaScript 语法做好铺垫。

+ 启用方法
  + 进入严格模式的标志，是一行字符串 "use strict" 。
  + 严格模式可以用于全局也可以用于单个函数
  + 全局在脚本开头使用，函数在函数内开头使用

+ 显示报错
  + 只读属性不可写
  + 只设置了取值器的属性不可写
  + 禁止扩展的对象不可扩展
  + eval、arguments 不可用作标识名
  + 函数不能有重名的参数
  + 禁止八进制的前缀0表示法

+ 增强的安全措施
  + 全局变量显式声明  （也就是无法隐式声明全局变量）
  + 禁止 this 关键字指向全局对象
  + 禁止使用 fn.callee、fn.caller、fn.arguments
  + 禁止使用 arguments.callee、arguments.caller
  + 禁止删除变量

+ 静态绑定
  + 禁止使用 with 语句
  + 创设 eval 作用域   eval语句拥有单独的作用域
  + arguments 不再追踪参数的变化

+ 向下一个版本的 JavaScript 过渡
  + 非函数代码块不得声明函数   ES5不能在块级作用域声明函数  ES6可以
  + 保留字 : implements、interface、let、package、private、protected、public、static、yield等

## 变量函数提升机制

+  (var  function 不包括函数表达式)

1. 执行过程
   1. 从第二次宏任务开始每次执行宏任务前会清空微任务

2. 预编译
   + 页面产生便创建了GO全局对象（Global Object）（也就是window对象）
   + 脚本文件加载
   + 脚本加载完毕后，分析语法是否合法
   + 开始预编译
     - 查找变量声明，作为GO属性，值赋予undefined
     - 查找函数声明，作为GO属性，值赋予函数体
   + 函数变量的提升
```javascript
   // 1. 变量声明、函数声明都会被提升到作用域顶处；
   //  2. 当出现相同名称时,同名变量会被赋值为同名函数
   var func;
   function func(){ return 1}
   alert(func); //-> f func(){ return 1}  整个方法
   alert(func()) // -> 1   方法的返回值 / 无返回值为 undefined
   // 所有赋值保留原位 , 隐式变量同意保留原位
   var a =1;//->a会被提升赋值的1保留原位  
   b = 1; // ->b于1都保留原位


//伪代码
GO/window = {
   //页面加载创建GO同时，创建了document、navigator、screen等等属性，此处省略
   a: undefined,
   c: undefined，
   b: function(y){
      var x = 1;
      console.log('so easy');
   }
}
```
---
+ 解释执行代码（直到执行函数b）
```javascript
//伪代码
GO/window = {
   //变量随着执行流得到初始化
   a: 1,
   c: function(){
         //...
   },
   b: function(y){
         var x = 1;
         console.log('so easy');
   }
}
```
---
+ 执行函数b之前，发生预编译
   + 创建AO活动对象（Active Object）
   + 查找形参和变量声明，值赋予undefined
   + 实参值赋给形参
   + 函数与变量的提升
   + 查找函数声明，值赋予函数体


## 变量、作用域和内存的问题

+ 基本类型和引用类型
+ 执行环境及作用域
+ 垃圾收集

### 基本类型和引用类型

+ 变量可能包含两种不同数据类型	
  + 基本类型指的是简单的数据段
  + 引用类型指的是那些可能有多个值构成的对象

+ 在将一个值给变量时,解析器必需确定这个值是基本类型值还是引用类型值
  + 基本数据类型`Undefined、Null、Boolean、Number 和 String` 这5中数据类型是按值访问的，因为可以操作保存在变量中的实际值
  + 引用类型的值保存在内存中的对象，js不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间，在操作对象时，实际上操作的是对象的引用而不是实际的对象，为此，引用类型的值是按引用访问的

+ 动态属性
  + 对于引用类型的值，可以为其添加属性和方法，也可以删除其属性和方法

+ 复制变量值
  + 将一个变量基本类型的值赋值给另一个变量时，两个变量虽然值相同，但是是完全独立的，只是创建了一个副本，这两个变量的任何操作都不会相互影响
  + 当从一个变量向另一个变量赋值引用类型的值时，同样也会将储存在变量对象中的值复制一份放到新变量分配的空间中，不同的是，这个值的副本实际上是一个指针，而指针指向储存在堆中的一个对象，两个变量实际上将引用同一个对象，因此改变其中一个变量，就会影响另一个变量

+ 传递参数
  + js中所有函数的参数都是按值传递的，也就是说把函数外部的值赋值给函数内部的参数，就和把值从一个变量复制到另一个变量一样
  + 证明函数的参数是按值传递的，而不是按引用传递的
```js
  function setName(obj){
    obj.name = 'Nice';
    obj = new Object();
    obj.name = 'Yuan';
  }
  let person = new Object();
  setName(person);  //证明函数是值传递，原有的引用在new了新对象后还保留着
  console.log(person.name);    //Nice
```
### 执行环境及作用域（闭包）

+ 执行环境定义了变量或是函数有权访问的其他数据，决定了他们各自的行为，每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中，虽然编写的代码无法访问这个对象，但是解析器在处理数据时会在后台使用它

+ 全局执行环境是最外围的一个执行环境，在Web浏览器中，全局执行环境被认为是`window`对象，因此所有的全局变量和函数都是作为`window`对象的属性和方法创建的。 

+ 某个执行环境中的所有代码执行完成后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出——例如关闭网页或浏览器——时才会被销毁）

+ 每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈就将其环境弹出，把控制权返回给之前的执行环境

+ 当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问，作用域链的前端，始终都是当前执行的代码所在环境的变量对象，如果这个环境是函数，则将其活动对象（`activation object`）作为变量对象，活动对象在最开始时只包含一个变量，即`arguments`对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来至外部作用域，全局执行环境的变量对象始终都是作用域链中的最后一个对象（即作用域的最外层）

+ 延长作用域链
  + 虽然执行环境的类型只有两种——全局和局部（函数），但是还有其他方法来延长作用域链
  + 有些语句可以在作用域链的前端临时增加一个变量对象，该变量会在代码执行后被移除
    + `try-catch 语句的 catch块 `
    + `with`语句
    + 这两个语句都会在作用域链的前端添加一个变量对象对`with`语句来说，会将指定的对象添加到作用域链中。对`catch`语句来说，会创建一个全新的变量对象，其中包含的是被抛出的错误对象的声明
+ ES6前没有块级作用域
  + 也就是`if  或 for `等语句中声明的变量外部也能访问，而不会被销毁
  + 初始化变量没有使用let声明，会自动被添加到全局环境中

### 垃圾收集

+ js具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存
+ 函数中局部变量的正常生命周期，局部变量只在函数执行的过程中存在，而在这个过程中，会位局部变量在栈或堆内存上分配相应的空间，以便存储它们的值，在函数执行结束后，局部变量也就没有了存在的必要，因此可以释放它们的内存以供将来使用，这种情况下很容易判断变量是否还有存在必要，但并非所有情况度这么容易，垃圾收集必须跟踪哪个变量有用哪个没用，对不再有用的变量打上标记，以备将来收回其占用内存

+ 标记清除
  + js中最常用的垃圾收集方式就是标记清除，当变量进入环境时（例如在函数中声明一个变量时），就将这个变量标记位“进入环境”。从逻辑上将，永远不能释放进入环境的变量所占用的内存，当变量离开环境时，则将其标记位“离开环境”
  + 垃圾收集在运行时会给储存在内存中的所有变量都加上标记，然后会清楚掉环境中的变量以及被环境中的变量引用的变量的标记，之后再被加上标记的变量将被视为准备删除的变量，最后垃圾收集完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间
+ 引用计数（垃圾收集策略之一）
+ 性能问题（垃圾收集的触发条件会影响性能）
+ 管理内存
  + 确保占用最少的内存可以让页面获得更好的性能
  + 而优化内存在最佳方式，就是为执行中的代码只保存必要的数据，一旦有数据不再有用，最好通过将其值设置为`null`来释放其引用——这个做法叫做解除引用
  + 解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收

### 小结

+ 基本类型值在内存中占据固定大小，因此被保存在栈内存中
+ 从一个变量向另一个变量中复制基本类型的值，会创建这个值的一个副本；
+ 引用类型的值是对象，保存在堆内存中；
+ 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针
+ 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象
+ 确定一个基本类型的值可以使用 typeof ，引用类型用 instanceof

+ 所有变量都存在于一个执行环境（作用域）当中，这个作用域决定了变量的生命周期，以及那一部分代码可以访问
  + 执行环境有全局和函数执行环境之分
  + 每次进入一个新的执行环境，都会创建一个用于搜索变量和函数的作用域链
  + 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问包含其的（也叫父）环境，乃至全局环境；
  + 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据
  + 变量的执行环境有助于确定应该何时释放内存

+ javascript 有自动垃圾收集回收机制，
  + 离开作用域的值将被标记为可以回收，因此将在垃圾收集期间被删除
  + ‘标记清除’是目前主流的垃圾收集算法，这种算法的思想是给当前不用使用的值加标记，然后再回收其内存。
  + 另一种垃圾收集算法是‘引用计数’，这种算法的思想是跟踪记录所有值被引用的次数，目前这种算法不在使用
  + 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用全局对象、全局对象属性以及循环引用变量的引用

## 闭包

+ 变量作用域
+ 执行环境

+ 闭包的另一个用处，是封装对象的私有属性和私有方法。

### 变量作用域

+ 全局作用域
  + web 浏览器中全局作用域为 window

+ 函数作用域
  + 每个函数都有自己的作用域

+ 作用域链
  + 在使用变量或调用方法时，都会首先在当前作用域查找，然后一级一级往上查找，最后找到全局作用域
```js
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

### 执行环境

+ 全局作用域  window 的作用环境 在应用程序退出 如 网页关闭，退出浏览器时销毁该作用环境
+ 函数作用域  在函数运行完毕或销毁
+ 闭包就是通过返回一个可以访问函数内部作用域（执行环境）的函数，使该函数不会在执行完毕后销毁
+ 且能通过返回的函数继续访问该函数内部的变量以及函数

## 事件循环

+ JS 是单线程的语言,所以是从上至下来执行代码的
+ 为了避免卡死的问题拥有可以异步执行的代码
+ JS 拥有一个名为事件队列的东西,这就是管理代码执行的东西
+ 一般将这个队列称为事件循环(event loop)
+ 主线程同步执行,而异步代码会被加入到事件队列中等待执行
+ 等到主线程空闲时就会将异步代码加入到主线程执行,往复循环

```js
setTimeout(() => console.log('代码开始执行'),0)
new Promise((resolve,reject) => {
  console.log('开始for循环');
  for(let i=0;i<10000;i++){
    i == 99 && resolve()
  }
}).then(() => console.log('执行then函数'))
console.log('代码执行结束');
// 预想中的结果: 开始for循环 -> 代码执行结束 -> 代码开始执行 -> 执行then函数
// 实际执行结果: 开始for循环 -> 代码执行结束 -> 执行then函数 -> 代码开始执行
/*
	出现问题的主要原因: setTimeout 属于宏任务
					而 then 属于微任务
*/
```
+ process.nextTick() -> 会在宏任务结束后微任务开启前执行
+ Promise.then() -> 在微任务开始时执行
+ setTimeout() -> 在下一次宏任务开始时执行

+ 更加准确的划分
  + `macro - task(宏任务): 包括整体 script 代码,setTimeout,setInterval`
  + `micro - task(微任务): promise,process.nextTick`
+ 执行顺序
  + 宏任务 -> 执行结束 -> 询问是否有微任务
  + 无微任务 -> 开始新的宏任务队列
  + 有微任务 -> 执行所有的微任务 -> 开始新的宏任务队列
+ 按照这种分类方式,JS 的执行机制是:
  + 执行一个宏任务,过程中如果遇到微任务,就将其放到微任务的[事件队列]里
  + 当前宏任务执行结束后,会查看微任务的[事件队列],并将里面全部的微任务依次执行完
+ 也就是说 event loop 是拥有两个循环队列的 
  + `macro - task(宏任务队列)和`micro - task(微任务队列)`
+ 准确的执行循序

```js
/*
宏任务执行 -> 遇到异步执行的宏任务将其加入下一次的循环中等待执行,微任务放到微任务队列中
宏任务执行完毕 -> 查看是否有微任务 -> 执行为任务,否则就开始下一次循环

需要注意的位置是 : setTimeout,setInterval 属于宏任务
			  : promise.then 是属于微任务,当然不包括自己重写的 then
*/
```

# 面向对象的程序设计

+ 对象的基本操作
+ 理解对象
+ 属性类型 ES5
  + 数据属性
  + 访问器属性
  + 读取属性特性

+ 构造函数
+ 对象的设计模式
+ 继承

## 构造函数

+ 构造函数的概念
  + 任何函数都可以当成构造函数
  + 为了与普通函数区别，构造函数名字的第一个字母通常大写。

+ 构造函数的特点有两个
  + 函数体内部使用了this关键字，代表了所要生成的对象实例。
  + 生成对象的时候，必须使用new命令。

+ 构造函数的执行过程
  + `var p1=new Person();`
  + 1、创建一个对象 (我们把这个对象称之为Person构造函数的实例)—— `p1`
  + 2、创建一个内部对象，`this`，将this指向该实例—— `p1`
  + 3、执行函数内部的代码，其中，操作this的部分就是操作了该实例 `p1`
  + 4、返回值：
    - a、如果函数没有返回值(没有return语句)，那么就会返回构造函数的实例 `p1`
    - b、如果函数返回了一个基本数据类型的值，那么本次构造函数的返回值是该实例 `p1`
    - c、如果函数返回了一个复杂数据类型的值，那么本次函数的返回值就是该值
```js
//如何判断一个数据是否是复杂数据类型？
  //使用排除法：
  //a、看它的值是不是：数字、字符串、布尔值、null、undefined，
  //b、如果不是以上5种值，那就是复杂数据类型

function F1() {
  this.name = 'f1';
}
console.log(new F1()); // {name: "f1"} 返回实例, 委托原型
console.log(new F1().name); // f1
console.log(F1()); // undefined

function F2() {
  this.name = 'f2';
  return {};
}

console.log(new F2()); // 引用类型值, 返回该值{} 
console.log(new F2().name); // undefined

// 这种情况，使用new调用就与调用正常函数一致
console.log(F2()); // {} 常规函数调用
console.log(F2().name); // undefined

function fn2(){
  return "abc";
}
var f2=new fn2();   //f2是fn2构造函数的实例

关于new Object()
new Object()等同于对象字面量{ }	跟构造函数不一样
```

### new 命令 

+ 基本用法
  + new命令的作用，就是执行构造函数，返回一个实例对象。
  + new命令执行时，构造函数内部的this，就代表了新生成的实例对象
  + 使用new命令时，根据需要，构造函数也可以接受参数。
  + 为了保证构造函数必须与new命令一起使用，一个解决办法是，构造函数内部使用严格模式，即第一行加上 "use strict"。
  + 这样的话，一旦忘了使用new命令，直接调用构造函数就会报错。
    - 由于严格模式中，函数内部的this不能指向全局对象
    - 默认等于undefined，导致不加new调用会报错
    - （JavaScript 不允许对undefined添加属性）。

```js
//另一个解决办法，构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象。
function FunBar(foo, bar) {
  if (!(this instanceof FunBar)) {
    return new FunBar(foo, bar);
  }

  this._foo = foo;
  this._bar = bar;
}
```

+ new 命令的原理
  + 使用new命令时，它后面的函数依次执行下面的步骤。
    - 创建一个空对象，作为将要返回的对象实例。
    - 将这个空对象的原型，指向构造函数的prototype属性。
    - 将这个空对象赋值给函数内部的this关键字。
    - 开始执行构造函数内部的代码
  + 也就是说，构造函数内部，this指的是一个新生成的空对象，
    + 所有针对this的操作，都会发生在这个空对象上。
    + 构造函数之所以叫“构造函数”，就是说这个函数的目的，
    + 就是操作一个空对象（即this对象），将其“构造”为需要的样子。
  + 如果构造函数内部有return语句，而且return后面跟着一个对象，
    + new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。也可能是空对象
    + 如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。

+ new.target
  + 函数内部可以使用new.target属性。
  + 如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。

### Object.create() 创建实例对象

### 用构造函数的好处,以及创建构造函数

```js
var p1={age:100,gender:"女",say:function(){}}
var p1={age:100,gender:"女",say:function(){}}
var p1={age:100,gender:"女",say:function(){}}
//上述代码，
//a、存在很多冗余代码 
//b、所有的人对象都有say方法，并且功能相似，但是他们占据了不同的内存
//	-->会导致内存浪费（内存泄漏）

//创建构造函数
function Person(age,gender){
    this.age=age;
    this.gender=gender;
    //此时的内存依然浪费了-->原型
    this.say=function(){
    }
}
//使用这种方式创建对象，代码整洁了很多
var p1=new Person(5,"未知");    //实例
//Person是p1的构造函数
var p2=new Person(5,"未知");
var p3=new Person(5,"未知");

构造函数创建对象的例子:
var person = new Object()     -->   var person = {};  
var now = new Date() 
var rooms = new Array(1,3,5)    -->   var rooms = [1,3,5]
`var isMale=/123/;`   ==> `var isMale=new RegExp("123")`
  isMale是通过RegExp构造函数创建出来的对象
  isMale是RegExp构造函数的实例

以上例子中，Object、Date、Array都是内置的构造函数
```

### 理解构造函数返回值
```js
//为什么要理解构造函数的返回值？
//String是一个内置函数
//a、String(100)		"100"	字符串类型
//b、new String(100)		String("100")	对象类型

//结论：一个函数通过new调用，或者不通过new调用，很多时候会有截然不同的返回值

//我如何分辨出一个对象到底是不是某个构造函数的实例？	instanceof 判断一个是否是一个构造函数的实例
    //a、var isTrue=xxx instanceof Person
function Person(){}
var p1=new Person();
console.log(p1 instanceof Person);//true，p1 就是 Person 的实例

function Student(){
  return 100;
}
var s1=new Student();
console.log(s1 instanceof Student);//true，s1 就是 Student 的实例

function Programmer(){
  return [1,3,5];
}
var pro=new Programmer();//pro并不是Programmer的实例
console.log(pro instanceof Programmer);//false
console.log("是数组的实例吗？",pro instanceof Array);//true

//小技巧：如何通过肉眼识别xxx对象时哪个构造函数的实例？
    //xxx.__proto__属性，也是对象，该对象中一般都会有一个constructor属性，这个只要指向PPP函数，那么就可以认为：xxx是PPP构造函数的实例

//typeof运算符，只能判断：数字、字符串、布尔值、undefined、函数

//切记：千万不能使用typeof运算符来判断对象的构造函数

//typeof null === "object"
//typeof {}  === "object"
//typeof []  === "object"
//typeof function(){} === "function"
//typeof /abc/     === "object"
```

## this 关键字

+ this 的特点，总是返回一个对象。
+ 函数 f 内部使用了 this 关键字，随着 f 所在的对象不同，this 的指向也不同。
  + 只要函数被赋给另一个变量，this的指向就会变。

+ JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的，没有办法事先确定到底指向哪个对象。

### 实质

+ JavaScript 允许在函数体内部，引用当前环境的其他变量。
+ 由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）
+ 所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。
+ this 就是用来指向当前运行环境的

### 使用场合

+ 全局环境
  + 全局环境使用this，它指的就是顶层对象window。

+ 构造函数
  + 构造函数中的this，指的是实例对象。

+ 对象的方法
  + 如果对象的方法里面包含 this，this 的指向就是方法运行时所在的对象。
  + 将该方法赋值给另一个对象，就会改变this的指向。

### 使用注意点

+ 避免多层 this
  + 由于this的指向是不确定的，所以切勿在函数中包含多层的this。
  + JavaScript 提供了严格模式，也可以硬性避免这种问题。
    + 严格模式下，如果函数内部的this指向顶层对象，就会报错。
```js
var o = {
  f1: function () {
    console.log(this);
    //let that = this;  //使用变量固定 this 的指向
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
//上面代码包含两层this，结果运行后，第一层指向对象o，第二层指向全局对象，因为实际执行的是下面的代码。
var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}
```

+ 避免数组处理方法中的 this
  + 数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。
  + 也是因为指向问题
  + 解决方法，同样是用变量固定 this
  + 另一种方法是将 this 当作 foreach 方法的第二个参数，固定它的运行环境。

+ 避免回调函数中的 this
  + 回调函数中的this往往会改变指向，最好避免使用。
```js
var o = new Object();
o.f = function () {
  console.log(this === o);
}

// jQuery 的写法
$('#button').on('click', o.f);
//上面代码中，点击按钮以后，控制台会显示false。
//原因是此时this不再指向o对象，而是指向按钮的 DOM 对象，
//因为f方法是在按钮对象的环境中被调用的。
//这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。
```

### 绑定 this 的方法

+ JavaScript 提供了call、apply、bind这三个方法，来切换/固定this的指向。

+ Function.prototype.call()
  + 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域）
  + 然后在所指定的作用域中，调用该函数(立即执行)。
  + call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
  + 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。
  + call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
  + `func.call(thisValue, arg1, arg2, ...)`
  + call方法的一个应用是调用对象的原生方法。

+ Function.prototype.apply()
  + apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。
  + 唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。
  + `func.apply(thisValue, [arg1, arg2, ...])`
```js
//找出数组最大元素
//JavaScript 不提供找出数组最大元素的函数。
//结合使用apply方法和Math.max方法，就可以返回数组的最大元素。
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15

//将数组的空元素变为undefined
//通过apply方法，利用Array构造函数将数组的空元素变成undefined。
Array.apply(null, ['a', ,'b'])
// [ 'a', undefined, 'b' ]
//空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。
//因此，遍历内部元素的时候，会得到不同的结果。

//转换类似数组的对象
//利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。
Array.prototype.slice.apply({0: 1, length: 1}) // [1]

//绑定回调函数的对象
//因为绑定作用域的函数会立即执行，所以需要写在一个函数体内
```

+ Function.prototype.bind()
  + bind()方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
```js
//bind()还可以接受更多的参数，将这些参数绑定原函数的参数。如同柯里化函数，固定参数
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);  // 固定参数 x
newAdd(5) // 20   新的add函数只需要传入参数 y 就行了， x已经被固定为 5

使用注意点
//（1）每一次返回一个新函数
//bind()方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。
element.removeEventListener('click', o.m.bind(o));
//上面代码中，click事件绑定bind()方法生成的一个匿名函数。这样会导致无法取消绑定，所以下面的代码是无效的。
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//应该写成这样

//（2）结合回调函数使用
//回调函数是 JavaScript 最常用的模式之一，但是一个常见的错误是，将包含this的方法直接当作回调函数。解决方法就是使用bind()方法，将counter.inc()绑定counter。
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1

// 结合 call() 方法使用
//将Function.prototype.bind方法绑定在Function.prototype.call上面，所以bind方法就可以直接使用，不需要在函数实例上使用。
```

## Object 对象的相关方法

+ Object.getPrototypeOf()
  + Object.getPrototypeOf 方法返回参数对象的原型。这是获取原型对象的标准方法。

+ Object.setPrototypeOf()
  + Object.setPrototypeOf 方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。
```js
//new命令可以使用Object.setPrototypeOf方法模拟。
var f = new F();
// 等同于
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
```

+ Object.prototype.isPrototypeOf()
  + 实例对象的isPrototypeOf方法，用来判断该对象是否为参数对象的原型。
  + 只要实例对象处在参数对象的原型链上，isPrototypeOf方法都返回true。
  + 由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true，只有直接继承自null的对象除外。

+ Object.prototype.__proto__
  + 实例对象的__proto__属性（前后各两个下划线），返回该对象的原型。该属性可读写。
  + 通过__proto__属性,可以改变对象的原型。
  + 根据语言标准，__proto__属性只有浏览器才需要部署，其他环境可以没有这个属性。
  + 它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。
  + 应该尽量少用这个属性，而是用Object.getPrototypeOf()和Object.setPrototypeOf()，进行原型对象的读写操作。

+ 获取原型对象方法的比较
  + __proto__属性指向当前对象的原型对象，即构造函数的prototype属性。
  + __proto__属性，指向构造函数（Object或obj.constructor）的prototype属性。
  + 获取实例对象obj的原型对象，有三种方法。
    + obj.__proto__
    + obj.constructor.prototype
    + Object.getPrototypeOf(obj)
    + 上面三种方法之中，前两种都不是很可靠。__proto__属性只有浏览器才需要部署，其他环境可以不部署。
    + 而obj.constructor.prototype在手动改变原型对象时，可能会失效。

+ Object.getOwnPropertyNames()
  + Object.getOwnPropertyNames 方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名。
  + Object.getOwnPropertyNames方法返回所有键名，不管是否可以遍历。
  + 只获取那些可以遍历的属性，使用Object.keys方法。

+ Object.prototype.hasOwnProperty()
  + 对象实例的hasOwnProperty方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。

+ in 运算符和 for...in 循环
  + in运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。
  + in运算符常用于检查一个属性是否存在。
  + 获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用for...in循环。
  + 为了在for...in循环中获得对象自身的属性，可以采用hasOwnProperty方法判断一下。
```js
//获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举）
function inheritedPropertyNames(obj) {
  var props = {};
  while(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}
```

+ 对象的拷贝
  + 如果要拷贝一个对象，需要做到下面两件事情。
    + 确保拷贝后的对象，与原对象具有同样的原型。
    + 确保拷贝后的对象，与原对象具有同样的实例属性。
```js
//下面就是根据上面两点，实现的对象拷贝函数。
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}

//另一种更简单的写法，是利用 ES2017 才引入标准的Object.getOwnPropertyDescriptors方法。
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
```

### Object.create()

  + 该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。
  + 如果想要生成一个不继承任何属性（比如没有toString和valueOf方法）的对象，可以将Object.create的参数设为null。
  + 使用Object.create方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。
  + Object.create方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。
```js
//Object.create方法可以用下面的代码代替。
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

//下面三种方式生成的新对象是等价的
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
```

## 设计模式

+ 工厂模式
+ 构造函数模式
+ 原型模式
+ 组合使用构造函数模式和原型模式
+ 动态原型模式
+ 寄生构造函数模式
+ 稳妥构造函数模式

### 工厂模式

```js
//对象标识问题，即新创建的对象是什么类型
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
```

### 构造函数模式

+ 创建 构造函数 的实例， 必须使用 new 操作符， 以这种方式调用构造函数会经历以下步骤
  1. 创建一个新对象
  2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
  3. 执行构造函数中的代码（为这个对象添加属性）
  4. 返回新对象

+ 对象的 construction 属性最初是用来标识对象类型的，但是在检查对象类型上 instanceof 操作符更可靠
+ 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，这也是构造函数模式胜过工厂模式的原因

+ 构造函数与其他函数的唯一区别，就在与调用他们的方式不同，任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数，反之也一样
  + 但是在以普通函数的调用方式调用构造函数时需要注意 函数内 this 的指向

+ 构造函数的问题
  + 同一个构造函数的两个实例，两个实例继承到的同一个方法并不是同一个Function的实例
  + 因为js中函数是对象，每定义一个函数都是实例化了一个对象
  + 因此在构造函数内定义方法反而浪费，还不如定义在外面，然后赋值给函数内的属性，这样会出现新问题，会定义多个全局函数然后由对象来调用，导致自定义的引用类型没有封装性可言了
  + 但是这样还是有问题，可以用原型的方式来解决

### 原型模式

+ 每一个函数都有 `prototype(原型)属性`，这个属性是一个指针，指向一个对象，而这个对象的用途就是包含可以由特定类型的所有实例共享的属性和方法
  + 
```js
function Person(){}
Person.prototype = { constructor:Person, name:"name" };
// 重写`constructor`属性是因为这样构建相当于重新创建了构造函数的`prototype`原型对象
// 默认自动获取的`constructor`属性指向的构造函数也变成了指向`Object`构造函数
// 所以需要重新给`constructor`属性赋值为，原来的构造函数
```

+ 理解原型对象
  + 每创建一个新函数，就会为该函数创建一个 `prototype`属性，指向函数的原型对象，所有原型对象都会获取一个 `constructor` （构造函数）属性，这个属性包含一个指向 `prototype` 属性所在函数的指针

  + 虽然在所有实现中无法访问到 [[Prototype]] , 但可以通过 isPrototype() 方法来确定对象之间是否存在这种关系， 如果 [[Prototype]] 指向调用 isPrototype() 方法的对象(Person.prototype), 那么这个方法就返回true

  + ES5增加了一个新方法， Object.getPrototypeOf() ， 这个方法返回 [[Prototype]] 的值，完整的 prototype 对象；

  + `delete` 操作符可以删除实例属性，使实例可以重新访问原型中的属性
  + `hasOwnProperty()` 方法可以检测属性是存在于实例中，还是存在于原型中，这个方法（继承自Object）只在给定属性存在于对象实例中时才会返回true

+ 原型与 in 操作符
  + 两种使用方式：单独使用和在for-in循环中使用，in操作符会在通过对象能够访问给定属性时返回true
  + 通过`hasOwnProperty() 方法和 in 操作符` 就可以确定该属性到底是存在于对象中，还是存在于原型中
```js
function hasPrototypeProperty(object, name){
  return !object.hasOwnProperty(name) && (name in object);
}
```
  + `for-in`循环返回所有能够通过对象访问的、可枚举的属性

+ 原型的动态性
  + 在原型中查找值的过程是一次搜索,因此对原型所做的任何修改都能立刻从实例上反映出来——即便式是先创建了实例后修改也照样如此
  + 重写整个原型对象除外，重写原型对象应该在声明后立刻重写

+ 原生对象的原型
  + 原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的
  + 所有原生引用类型（Object、Array、String,等等）都在在其构造函数的原型上定义了方法。
  + `Array.prototype`中可以找到`sort()`方法
  + `alert(typeof Array.prototype.sort);  //"function" `  
  + 通过原生对象的原型，不仅可以获取所有默认方法的引用，而且也可以定义新方法，可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法

+ 原型对象的问题
  + 缺点：
  + 省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。
  + 所有实例修改属性的值会共享，修改一个实例继承的原型属性，所有实例继承的原型属性都会改变

### 组合使用构造函数模式和原型模式

+ 创建自定义类最常见的方式，就是组合使用构造函数模式和原型模式，构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性，结果每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存
```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["shelby", "Court"];
}

Person.prototype = {
  constructor : Person,
  sayName : function(){
    alert(this.name);
  }
}

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends);       //"Shelby,Count,Van"
alert(person2.friends);       //"Shelby,Count"
alert(person1.friends === person2.friends);       //false
alert(person1.sayName === person2.sayName);       //true

//这中方法使属性不共用，但方法公用，还能传入参数
```

### 动态原型模式

+ 通过检查某个应该存在的方法是否有效，来决定是否需要初始化
```js
function Person(name, age, job){
  //属性
  this.name = name;
  this.age = age;
  this.job = job;
  //方法
  if(typeof this.sayName != "function"){
    Person.prototype.sayName = function(){
      alert(this.name);
    };
  }
}
let friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();

//对于采用这种方式创建的对象，还可以用 instanceof 操作符确定它 类型
```

### 寄生构造函数模式

+ 这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象
```js
function Person(name, age, job){
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    alert(this.name);
  };
  return o;
}
let friend = new Person("Nicholas" 29, "Software Engineer");
friend.sayName();   //Nicholas

/*这个模式可以在特殊的情况下用来对对象创建构造函数。
* 假设要创建一个具有额外方法的特殊数组。
* 由于不能直接修改Array构造函数，因此可以使用这个模式
*/
function SpecialArray(){
  //创建数组
  let values = new Array();
  values.push.apply(values, arguments);

  //添加方法
  values.toPipedString = function(){
    return this.join("|");
  };

  //返回数组
  return values;
}

let colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString());    //"red|blue|green"
alert(colors instanceof SpecialArray);
```
+ 这种模式返回的对象与构造函数或者构造函数的原型属性之间没有关系 ， 也就是说构造函数返回的对象与在构造函数外部创建的对象没有什么不同，
+ 所以不能依赖 `instanceof` 操作符来确定对象类型

### 稳妥构造函数模式

+ 指的是没有公共属性， 而且其方法也不引用`this`的对象
  + 适合在安全环境中（这些环境会禁止使用 `this` 和 `new`），或者在防止数据被其他应用程序改动时使用，

+ 该模式和寄生构造函数类似，但有两点不同
  + 一是新创建对象的实例方法不引用`this`
  + 二是不使用`new`操作符调用构造函数
```js
function Person(name, age, job){
  //创建要返回的对象
  let o = new Object();
  //可以在这里定义私有变量和函数

  //添加方法
  o.sayName = function (){
    alert(name);
  };

  //返回对象
  return o;
}

let friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName();   //Nicholas
```

## 继承

+ JS中继承的概念
  + 通过【某种方式】让一个对象可以访问到另一个对象中的属性和方法，我们把这种方式称之为继承  `并不是所谓的xxx extends yyy`

+ 原型链
+ 借用构造函数
+ 组合继承
+ 原型式继承
+ 寄生式继承
+ 寄生组合式继承

### 为什么要使用继承？

+ 有些对象会有方法(动作、行为)，而这些方法都是函数，如果把这些方法和函数都放在构造函数中声明就会导致内存的浪费
```js
function Person(){
    this.say=function(){
        console.log("你好")
    }
}
var p1=new Person();
var p2=new Person();
console.log(p1.say === p2.say);   //false

//由于say方法可能功能相似，但是不是同一个方法(没有指向同一块内存，会造成内存浪费)
//解决方案：把say方法写在他们共同的(父对象)中
//其实他们共同的父对象，就可以通过：Person.prototype来获取

//-->只要把say方法写在Person.prototype中，那么say方法就是同一个方法
    Person.prototype.run=function(){
        console.log('时速500KM');
    }
    //此时p1和p2都可以访问到run方法
    p1.run();
    p2.run();
    //验证p1.run和p2.run是否是同一个方法？
    console.log(p1.run === p2.run); //指向同一个方法，这种方法避免了内存的浪费
    console.log(p1.run === Person.prototype.run);	//true

    var p3=new Person();
    console.log(p3.run == p1.run); //true
    console.log(p3.run === p1.run);//true
    //结论：只要往某个构造函数的prototype对象中添加某个属性、方法，那么这样的属性、方法都可以被所有的构造函数的实例所共享
    //==>这里的【构造函数的prototype对象】称之为原型对象
    //  Person.prototype是 p1 p2 p3 的原型对象
    //  Person.prototype是Person构造函数的【实例】的原型对象

	//  Person的原型对象是谁呢？		所有函数都是Function类的实例
    //  -->首先要知道Person的构造函数：-->Function
    //  -->所以Person的原型对象是：Function.prototype

    //  p1的原型对象是谁呢？
    //  -->首先要知道p1是谁创建的？    -->Person
    //  -->所以p1的原型对象时：     Person.prototype

//所有对象最终都继承自Object		但是并不是直接创建的
```

### prototype 属性的作用

+ JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
+ 也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。
+ JavaScript 规定，每个函数都有一个prototype属性，指向一个对象。
+ 对于普通函数来说，该属性基本无用。
+ 但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。
+ 原型对象上添加一个color属性，结果，实例对象都共享了该属性。
+ 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。

+ constructor 属性
  + prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
  + 由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。
  + constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。
  + constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。
  + 如果不能确定constructor属性是什么函数，还有一个办法：通过name属性，从实例得到构造函数的名称。

+ instanceof 运算符
  + instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
  + 由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true。

### 原型链

+ JavaScript 规定，所有对象都有自己的原型对象（prototype）。
+ 一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”
+ 如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。
+ 也就是说，所有对象都继承了Object.prototype的属性。
+ 这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。
+ 那么，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。
+ null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

+ 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。
+ 如果直到最顶层的Object.prototype还是找不到，则返回undefined。
+ 如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”。
+ 注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

+ 如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法。

+ 确定原型和实例的关系
  + 这两种方法来确认原型和实例之间的关系 
  + `instanceof`
    + `instance instanceof Object   // true`
  + `isPrototypeOf()`
    + `Object.prototype.isPrototypeOf(instance)  //true`

+ 原型链作为实现继承的主要方法。基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法
+ 每个构造函数都有一个原型对象，原型对象中都包含一个指向构造函数的指针，每一个实例都包含一个指向原型对象的内部指针
+ 谨慎地定义方法
  + 在实例替换原型之后再定义方法
  + 在实现继承时不能使用对象字面量创建原型方法
```js
  function SuperType(){
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function(){
    return this.property;
  }

  function SubType(){
    this.subProperty = false;
  }

  //继承了 SuperType
  SubType.prototype = new SuperType();

  SubType.prototype.getSubValue = function(){
    return this.subProperty;
  }

  //再次使用对象字面量添加新方法，  会使继承无效
  SubType.prototype = {
    getSubValue : function() {
        return this.subProperty;
    }
  }

  let instance = new SubType();
  alert(instance.getSuperValue());  //true

  /*以上代码定义了两个类型：SuperType 和 SubType，
  * 实现的本质是重写了原型对象，代之以一个新类型的实例
  * SubType原型对象的内部构造函数（constructor）指针也发生了变化  原因是原型被重写了
  * instance.constructor 现在指向 SuperType
  */
  通过实现原型链，原型搜索机制，当以读取模式访问一个实例属性时，会首先在实例中搜索该属性
  ，如果没找到，则会继续搜索实例的原型，在通过原型链实现继承的情况下，搜索过程就得以沿着
  原型链继续向上搜索。
  上面的例子 调用 instance.getSuperValue() 会历经三个搜索步骤：
  1.搜索实例
  2.搜索 SubType.prototype
  3.搜索 SuperType.prototype 最后一步才会找到该方法
  在找不到的情况，搜索过程要一环一环的前行到原型链末端才会停下来
```

+ 原型链的问题
  + 继承后的属性共享问题，
  + 在创建子类型的实例时，不能向超类型的构造函数中传递参数，实际上应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。
  + 所以基本上不会单独使用原型链

### 借用构造函数

+ 在子类型构造函数的内部调用超类型构造函数，通过 `apply() 和 call()` 方法
```js
+ 让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
- Sub是子类的构造函数，this是子类的实例。在实例上调用父类的构造函数Super，就会让子类实例具有父类实例的属性。
+ 第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
- Sub.prototype是子类的原型，要将它赋值为Object.create(Super.prototype)，
- 而不是直接等于Super.prototype。否则后面两行对Sub.prototype的操作，
- 会连父类的原型Super.prototype一起修改掉。

+ 另外一种写法是Sub.prototype等于一个父类实例。
Sub.prototype = new Super();
+ 上面这种写法也有继承的效果，但是子类会具有父类实例的方法。有时，这可能不是我们需要的，所以不推荐使用这种写法。

//单个方法继承
ClassB.prototype.print = function() {
  ClassA.prototype.print.call(this);
  // some code
}

//例子
  function SuperType(name) {
    this.colors = ["red", "blue", "green"];
    this.name = name;
  }
  function SubType() {
    //继承
    SuperType.call(this,'Nicholas');
    this.age = 29;
  }

  let instance1 = new SubType();
  instance1.colors.push("black");
  alert(instance1.colors);      // "red,blue,green,black"
  let instance2 = new SubType();
  alert(instance2.colors);      //"red,blue,green"
  
  //解决了属性共享的问题
  let instance = new SubType();
  alert(instance.name);      // "Nicholas"
  alert(instance.age);      //29
  //为了确保子类型的属性不被重写，可以在调用超类型构造函数后，在添加子类型的属性
```

### 多重继承

+ JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。
```js
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
//上面代码中，子类S同时继承了父类M1和M2。这种模式又称为 Mixin（混入）。
```

### 模块

+ 但是，JavaScript 不是一种模块化编程语言，ES6 才开始支持“类”和“模块”。下面介绍传统的做法，如何利用对象实现模块的效果。

#### 基本的实现方法

+ 模块是实现特定功能的一组属性和方法的封装。
+ 简单的做法是把模块写成一个对象，所有的模块成员都放到这个对象里面。
```js
var module1 = new Object({
　_count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
  　//...
　}
});
//上面的函数m1和m2，都封装在module1对象里。使用的时候，就是调用这个对象的属性。
//但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。
```

#### 封装私有变量：构造函数的写法

+ 我们可以利用构造函数，封装私有变量。
```js
function StringBuilder() {
  var buffer = [];

  this.add = function (str) {
     buffer.push(str);
  };

  this.toString = function () {
    return buffer.join('');
  };

}
//上面代码中，buffer是模块的私有变量。一旦生成实例对象，外部是无法直接访问buffer的。
//但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除。
//这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保存在实例对象以外）。
//同时，非常耗费内存。

function StringBuilder() {
  this._buffer = [];
}

StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join('');
  }
};
//这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全。
```

#### 封装私有变量：立即执行函数的写法

+ 另一种做法是使用“立即执行函数”,将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。
```js
var module1 = (function () {
　var _count = 0;
　var m1 = function () {
　  //...
　};
　var m2 = function () {
　　//...
　};
　return {
　　m1 : m1,
　　m2 : m2
　};
})();
//使用上面的写法，外部代码无法读取内部的_count变量。
//上面的module1就是 JavaScript 模块的基本写法。下面，再对这种写法进行加工。
```

#### 模块的放大模式

+ 如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”.
```js
var module1 = (function (mod){
　mod.m3 = function () {
　　//...
　};
　return mod;
})(module1);
//上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

//在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。
//如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"
var module1 = (function (mod) {
　//...
　return mod;
})(window.module1 || {});
```

#### 输入全局变量

+ 独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
+ 为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
```js
var module1 = (function ($, YAHOO) {
　//...
})(jQuery, YAHOO);
//上面的module1模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

//立即执行函数还可以起到命名空间的作用。
(function($, window, document) {

  function go(num) {
  }

  function handleEvents() {
  }

  function initialize() {
  }

  function dieCarouselDie() {
  }

  //附加到全局范围
  window.finalCarousel = {
    init : initialize,
    destroy : dieCarouselDie
  }

})( jQuery, window, document );
//上面代码中，finalCarousel对象输出到全局，对外暴露init和destroy接口，内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的。
```




# 事件捕获

+ IE特有方法
  + `setCapture()`  将事件拦截到自己身上
  + `releaseCapture()` 取消捕获