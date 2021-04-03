# 原理

+ 变量函数提升机制 预编译
+ 变量、作用域和内存的问题
+ 闭包

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

   + ```javascript
     // 1. 变量声明、函数声明都会被提升到作用域顶处；
     //  2. 当出现相同名称时,同名变量会被赋值为同名函数
     var func;
     function func(){ return 1}
     alert(func); //-> f func(){ return 1}  整个方法
     alert(func()) // -> 1   方法的返回值 / 无返回值为 undefined
     // 所有赋值保留原位 , 隐式变量同意保留原位
     var a =1;//->a会被提升赋值的1保留原位  
     b = 1; // ->b于1都保留原位
     ```

     

   + ```javascript
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

   + 解释执行代码（直到执行函数b）

   + ```javascript
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

# 语法

+ JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。
+ 分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
+ 表达式不需要分号结尾。一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。

## 代码技巧

+ 元素的属性可以作为 独一无二 的变量使用  如：（ Element.aaa ）

## 代码规范

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

## JSON

+ JSON 以一个 {} 包裹

+ 每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。
+ 总之，只能是一个值，不能是两个或更多的值。
+ JSON 对值的类型和格式有严格的规定。
  + 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
  + 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
  + 字符串必须使用双引号表示，不能使用单引号。
  + 对象的键名必须放在双引号里面。
  + 数组或对象最后一个成员的后面，不能加逗号。

### JSON 对象

+ JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。
+ 它有两个静态方法：JSON.stringify()和JSON.parse()。

#### JSON.stringify()

+ 基本用法
  + JSON.stringify()方法用于将一个值转为 JSON 字符串。
  + 该字符串符合 JSON 格式，并且可以被JSON.parse()方法还原。
  + 注意，对于原始类型的字符串，转换结果会带双引号。
  + 如果对象的属性是 undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤。
  + 如果数组的成员是 undefined、函数或 XML 对象，则这些值被转成null。
  + 正则对象会被转成空对象。
  + JSON.stringify()方法会忽略对象的不可遍历的属性。
```js
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'
//上面代码将各种类型的值，转成 JSON 字符串。

JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
//上面代码中，字符串foo，被转成了"\"foo\""。这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。

//如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤。
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"

//如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"

//正则对象会被转成空对象。
JSON.stringify(/foo/) // "{}"
```

+ 第二个参数
  + JSON.stringify()方法还可以接受一个数组，作为第二个参数，
  + 指定参数对象的哪些属性需要转成字符串。(只转换数组中包含的属性)
  + 这个类似白名单的数组，只对对象的属性有效，对数组无效。
  + 第二个参数还可以是一个函数，用来更改JSON.stringify()的返回值。
```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"

//函数
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
//如果处理函数返回undefined或没有返回值，则该属性会被忽略。
```

+ 第三个参数
  + JSON.stringify()还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。
  + 默认返回的是单行字符串，对于大型的 JSON 对象，可读性非常差。
  + 第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）。
```js
// 默认输出
JSON.stringify({ p1: 1, p2: 2 })
// JSON.stringify({ p1: 1, p2: 2 })

// 分行输出
JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
// {
// 	"p1": 1,
// 	"p2": 2
// }
//上面例子中，第三个属性\t在每个属性前面添加一个制表符，然后分行显示。
//第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。
```

+ 参数对象的 toJSON() 方法
  + 如果参数对象有自定义的toJSON()方法
  + 那么JSON.stringify()会使用这个方法的返回值作为参数，而忽略原对象的其他属性。
  + Date对象就有一个自己的toJSON()方法。
  + toJSON()方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify()默认不能转换正则对象，但是设置了toJSON()方法以后，就可以转换正则对象了。
```js
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
//上面代码中，JSON.stringify()发现参数对象有toJSON()方法
//就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。
```

#### JSON.parse()

+ JSON.parse()方法用于将 JSON 字符串转换成对应的值。
+ 如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错。
+ 为了处理解析错误，可以将JSON.parse()方法放在try...catch代码块中。
+ JSON.parse()方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify()方法类似。
```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

## 严格模式

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

+ 概念

### 概念

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
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
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

+ 

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
+ `function Person(){}     Person.prototype = { constructor:Person，  name:"name"}`
  + 重写`constructor`属性是因为这样构建相当于重新创建了构造函数的`prototype`原型对象，默认自动获取的`constructor`属性指向的构造函数也变成了指向`Object`构造函数，所以需要重新给`constructor`属性赋值为，原来的构造函数

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
    this.subproperty = false;
  }

  //继承了 SuperType
  SubType.prototype = new SuperType();

  SubType.prototype.getSubValue = function(){
    return this.subproperty;
  }

  //再次使用对象字面量添加新方法，  会使继承无效
  SubType.prototype = {
    getSubValue : function() {
        return this.subproperty;
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

# 异步操作

## 单线程模式

+ 单线程模型指的是，JavaScript 只在一个线程上运行。
+ 也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。

+ 注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。
+ 事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。

+ 将一些等待返回结果在执行的任务，挂起处于等待中的任务，等到结果返回后，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的“事件循环”机制（Event Loop）。
+ 单线程模型虽然对 JavaScript 构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果用得好，JavaScript 程序是不会出现堵塞的，这就是为什么 Node 可以用很少的资源，应付大流量访问的原因。

+ 为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 同步任务和异步任务

+ 程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。
+ 同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。
+ 只有前一个任务执行完毕，才能执行后一个任务。

+ 异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。

+ 举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的回调函数。

## 任务队列和事件循环

+ JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）

+ 首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

+ 异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

+ JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。维基百科的定义是：“事件循环是一个程序结构，用于等待和发送消息和事件（a programming construct that waits for and dispatches events or messages in a program）”。

+ 同步任务 ， 异步任务
  + 同步任务执行完了，执行异步任务，
  + 将有回调函数的异步任务加入同步队列，再执行同步任务队列，
  + 如此重复，直到程序运行完毕
+ 微任务相当于异步任务，但是执行早于异步任务 如（ then ）
  + 因为 then 相当于本轮的事件循环，而异步任务属于下一轮的事件循环

## 异步操作

### 回调函数

+ 回调函数是异步操作最基本的方法。
```js
//下面是两个函数f1和f2，编程的意图是f2必须等到f1执行完成，才能执行。
function f1() {
  // ...
}

function f2() {
  // ...
}
f1();
f2();
//上面代码的问题在于，如果f1是异步操作，f2会立即执行，不会等到f1结束再执行。
//这时，可以考虑改写f1，把f2写成f1的回调函数。
function f1(callback) {
  // ...
  callback();
}

function f2() {
  // ...
}

f1(f2);
```

+ 回调函数的优点是简单、容易理解和实现
+ 缺点是不利于代码的阅读和维护，各个部分之间高度耦合（coupling）
+ 使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况）
+ 而且每个任务只能指定一个回调函数。

### 事件监听

+ 另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
+ 也就是在需要执行某个函数时，内部绑定的某个函数，相当于自定义事件
```js
//还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的 jQuery 的写法）。
f1.on('done', f2);
//上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
//上面代码中，f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。
//这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（decoupling），有利于实现模块化。
//缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。
```

### 发布/订阅

+ 事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。
+ 这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。
+ 也就是说把需要触发的函数交给，一个集中管理人，在要执行时告诉管理人，要执行了。js高级程序设计中的自定义事件
```js
//这个模式有多种实现，下面采用的是 Ben Alman 的 Tiny Pub/Sub，这是 jQuery 的一个插件。
//首先，f2向信号中心jQuery订阅done信号。
jQuery.subscribe('done', f2);

function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
  }, 1000);
}
//上面代码中，jQuery.publish('done')的意思是
//f1执行完成后，向信号中心jQuery发布done信号，从而引发f2的执行。
//f2完成执行后，可以取消订阅（unsubscribe）。
jQuery.unsubscribe('done', f2);
```

## 异步操作的流程控制

+ 嵌套的回调函数不仅写起来麻烦，容易出错，而且难以维护
```js
async(1, function (value) {
  async(2, function (value) {
    async(3, function (value) {
      async(4, function (value) {
        async(5, function (value) {
          async(6, final);
        });
      });
    });
  });
});
```

### 串行执行

+ 我们可以编写一个流程控制函数，让它来控制异步任务，一个任务完成以后，再执行另一个。
+ 这就叫串行执行。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final(results[results.length - 1]);
  }
}

series(items.shift());

// 上面代码中，函数series就是串行函数，它会依次执行异步任务，所有任务都完成后，才会执行final函数。items数组保存每一个异步任务的参数，results数组保存每一个异步任务的运行结果。
```

### 并行执行

+ 流程控制函数也可以是并行执行，即所有异步任务同时执行，等到全部完成以后，才执行final函数。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length === items.length) {
      final(results[results.length - 1]);
    }
  })
});
//上面代码中，forEach方法会同时发起六个异步任务，等到它们全部完成以后，才会执行final函数。

//相比而言，上面的写法只要一秒，就能完成整个脚本。
//这就是说，并行执行的效率较高，比起串行执行一次只能执行一个任务，较为节约时间。
//但是问题在于如果并行的任务较多，很容易耗尽系统资源，拖慢运行速度。
//因此有了第三种流程控制方式。
```

### 并行与串行的结合

+ 所谓并行与串行的结合，就是设置一个门槛，每次最多只能并行执行n个异步任务，这样就避免了过分占用系统资源。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher(); //通过递归使循环被条件运行数量截断时，还能继续执行没执行完的任务
      } else if(running == 0) {
        final(results);
      }
    });
    running++;
  }
}

launcher();
//上面代码中，最多只能同时运行两个异步任务。
//变量running记录当前正在运行的任务数，只要低于门槛值，就再启动一个新的任务，如果等于0，就表示所有任务都执行完了，这时就执行final函数。

//这段代码需要三秒完成整个脚本，处在串行执行和并行执行之间。通过调节limit变量，达到效率和资源的最佳平衡。
```

## 定时器

+ JavaScript 提供定时执行代码的功能，叫做定时器（timer），主要由setTimeout()和setInterval()这两个函数来完成。它们向任务队列添加定时任务。

### setTimeout()

+ setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。
+ 它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。
+ 第一个参数直接执行代码时，需要以字符串的形式传入，不推荐
+ 省略第二个参数默认为 0 

+ 如果回调函数是对象的方法(obj.y)，那么setTimeout使得方法内部的this关键字指向全局环境，而不是定义时所在的那个对象。
+ 为了防止出现这个问题，一种解决方法是将obj.y放入一个函数。
+ 另一种解决方法是，使用bind方法，将obj.y这个方法绑定在obj上面。
```js
var timerId = setTimeout(func|code, delay);
//setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码
//第二个参数delay是推迟执行的毫秒数。

setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
//setTimeout共有4个参数。最后那两个参数，将在1000毫秒之后回调函数执行时，作为回调函数的参数。
```

### setInterval()

+ setInterval 函数的用法与 setTimeout 完全一致
+ 区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

+ 因为 setInterval 指定的是"开始执行"之间的间隔，并不考虑每次任务执行本身所消耗的事件
+ 因此 setInterval 的执行间隔并不固定

```js
//setInterval的一个常见用途是实现轮询。下面是一个轮询 URL 的 Hash 值是否发生变化的例子。
var hash = window.location.hash;
var hashWatcher = setInterval(function() {
  if (window.location.hash != hash) {
    updatePage();
  }
}, 1000);

//为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间。
var i = 1;
var timer = setTimeout(function f() {
  // ...
  timer = setTimeout(f, 2000);
}, 2000);
```

### clearTimeout()，clearInterval()

+ setTimeout和setInterval函数，都返回一个整数值，表示计数器编号。
+ 将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。
```js
//利用定时器返回的编号，取消当前所有的setTimeout定时器
(function() {
  // 每轮事件循环检查一次
  var gid = setInterval(clearAllTimeouts, 0);

  function clearAllTimeouts() {
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();
```

### （防抖动）debounce 函数

+ 不希望回调函数被频繁调用，可以使用定时器，定时执行
+ 在规定时间内重复调用时取消上一次执行，然后在新建一个定时器
+ 这样就保证了回调函数之间的调用间隔，至少是规定的时间。

+ debounce 是“防抖”，要连续操作结束后再执行。

```js
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

### （节流） throttle 函数

+ throttle 是“节流”，确保一段时间内只执行一次

```js
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```

### 运行机制

+ setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。
+ 如果到了，就执行对应的代码；如果不到，就继续等待。
+ 这意味着，setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。
+ 由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。
```js
setTimeout(someTask, 100);
veryLongTask();
//上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，才轮到它执行。

//setInterval的例子
setInterval(function () {
  console.log(2);
}, 1000);

sleep(3000);

function sleep(ms) {
  var start = Date.now();
  while ((Date.now() - start) < ms) {
  }
}
//上面代码中，setInterval要求每隔1000毫秒，就输出一个2。
//但是，紧接着的sleep语句需要3000毫秒才能完成，那么setInterval就必须推迟到3000毫秒之后才开始生效。
//注意，生效后setInterval不会产生累积效应，即不会一下子输出三个2，而是只会输出一个2。
```

### setTimeout(f, 0)

+ 含义
  + setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，即setTimeout(f, 0)，那么会立刻执行吗？
  + 答案是不会。因为上一节说过，必须要等到当前脚本的同步任务，全部处理完以后，才会执行setTimeout指定的回调函数f。
  + 也就是说，setTimeout(f, 0)会在下一轮事件循环一开始就执行。
  + 总之，setTimeout(f, 0)这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。

+ 应用
  + setTimeout(f, 0)有几个非常重要的用途。
  + 它的一大应用是，可以调整事件的发生顺序。
  + 比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数
  + 会早于父元素的事件回调函数触发。
  + 如果，想让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)。
```js
// HTML 代码如下
// <input type="button" id="myButton" value="click">

var input = document.getElementById('myButton');

input.onclick = function A() {
  //让 input 的事件触发晚于 body
  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};

document.body.onclick = function C() {
  input.value += ' body'
};

//另一个应用是，用户自定义的回调函数，通常在浏览器的默认动作之前触发。
//比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。
//因此，下面的回调函数是达不到目的的。

// HTML 代码如下
// <input type="text" id="input-box">
document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
}
//上面代码想在用户每次输入文本后，立即将字符转为大写。
//但是实际上，它只能将本次输入前的字符转为大写，因为浏览器此时还没接收到新的文本，所以this.value取不到最新输入的那个字符。
//只有用setTimeout改写，上面的代码才能发挥作用。
document.getElementById('input-box').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
//上面代码将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发。
//由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行。
var div = document.getElementsByTagName('div')[0];

// 写法一
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二
var timer;
var i=0x100000;

function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
/*
* 上面代码有两种写法，都是改变一个网页元素的背景色。
* 写法一会造成浏览器“堵塞”，因为 JavaScript 执行速度远高于 DOM，
* 会造成大量 DOM 操作“堆积”，而写法二就不会，这就是setTimeout(f, 0)的好处。
*/

/*
* 另一个使用这种技巧的例子是代码高亮的处理。如果代码块很大，一次性处理，可能会对性能造成很大的* 压力，那么将其分成一个个小块，一次处理一块，比如写成setTimeout(highlightNext, 50)的
* 样子，性能压力就会减轻。
*/
```

## Promise 对象

+ Promise 是第一个对象，也是一个构造函数。
+ 可以使异步操作可以和同步操作一样书写，易读，

+ ES6 原生支持 Promise 对象

+ Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。
+ Promise 实例有一个then方法，用来指定下一步的回调函数。

+ Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程清除

+ Promise 的回调函数属于异步任务，会在同步任务之后执行
  + 也就是 then 属于微任务
  + 但是，Promise 的回调函数不是正常的异步任务，而是微任务。
  + 它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。
  + 这意味着，微任务的执行时间一定早于正常任务。

### Promise 对象的状态

+ Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。
  + 异步操作未完成（pending）
  + 异步操作成功（fulfilled）
  + 异步操作失败（rejected）
  + 上面三种状态里面，fulfilled和rejected合在一起称为resolved（已定型）。

+ 因为这三种状态只有两种变化，从未完成到成功或失败
+ 因此，Promise 的最终结果只有两种。
  + 异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled。
  + 异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected。

### Promise 构造函数

+ JavaScript 提供原生的Promise构造函数，用来生成 Promise 实例。
```js
var promise = new Promise(function (resolve, reject) {
  // ...

  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
/*
  Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
  它们是两个函数，由 JavaScript 引擎提供，不用自己实现。

  resolve函数的作用是，将Promise实例的状态从“未完成”变为“成功”（即从pending变为fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
  reject函数的作用是，将Promise实例的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
*/
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100);
//上面代码中，timeout(100)返回一个 Promise 实例。100毫秒以后，该实例的状态会变为fulfilled。
```

### Promise.prototype.then()

+ Promise 实例的then方法，用来添加回调函数。
+ then方法可以接受两个回调函数
+ 第一个是异步操作成功时（变为fulfilled状态）的回调函数
+ 第二个是异步操作失败（变为rejected）时的回调函数（该参数可以省略）。
+ 一旦状态改变，就调用相应的回调函数。
+ then方法可以链式使用。
```js
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error);
// "成功"

var p2 = new Promise(function (resolve, reject) {
  reject(new Error('失败'));
});
p2.then(console.log, console.error);
// Error: 失败

p1
  .then(step1)    //如果step1的状态变为rejected,那么后面将不会执行
  .then(step2)    //Promise 开始寻找，接下来第一个为rejected的回调函数
  .then(step3)    //在代码中是console.error
  .then(          //这就是说，Promise 对象的报错具有传递性。
    console.log,
    console.error
  );
//p1后面有四个then，意味依次有四个回调函数。只要前一步的状态变为fulfilled，就会依次执行紧跟在后面的回调函数。
//最后一个then方法，回调函数是console.log和console.error，用法上有一点重要的区别。console.log只显示step3的返回值，而console.error可以显示p1、step1、step2、step3之中任意一个发生的错误。
```

### then()用法辨析

+ Promise 的用法，简单说就是一句话：使用then方法添加回调函数。
+ 但是，不同的写法有一些细微的差别
```js
// 写法一
f1().then(function () {
  return f2();
}).then(f3);  //f3回调函数的参数，是f2函数的运行结果。

// 写法二
f1().then(function () {
  f2();
  return;
}).then(f3);  //f3回调函数的参数是undefined。

// 写法三
f1().then(f2())
  .then(f3);    //f3回调函数的参数，是f2函数返回的函数的运行结果。

// 写法四
f1().then(f2)
  .then(f3);    //f2会接收到f1()返回的结果。f3回调函数的参数，是f2函数的运行结果。
```

### 实例：图片加载

```js
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
//image是一个图片对象的实例。它有两个事件监听属性，onload属性在图片加载成功后调用，onerror属性在加载失败调用。

//调用
preloadImage('https://example.com/my.jpg')
  .then(function (e) { document.body.append(e.target) })
  .then(function () { console.log('加载成功') });
//图片加载成功以后，onload属性会返回一个事件对象，因此第一个then()方法的回调函数，会接收到这个事件对象。
//该对象的target属性就是图片加载后生成的 DOM 节点。
```

# console 对象与控制台

+ console 对象
+ console 对象的静态方法
+ 控制台命令行 API
+ debugger 语句  debugger语句主要用于除错，作用是设置断点。

## console 对象

+ console 对象是 js 的原生对象
+ console的常见用途有两个。
  + 调试程序，显示网页代码运行时的错误信息。
  + 提供了一个命令行接口，用来与网页代码互动。

+ console对象的所有方法，都可以被覆盖.
```js
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

## console 对象的静态方法

+ console.log()
  + 该方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
  + 该方法会自动在每次输出的结尾，添加换行符。
  + 如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。
    + %s  字符串
    + %d  %i  整数    %f  浮点数
    + %o  对象链接
    + %c  CSS格式字符串

+ console.info()
  + 与console.log()用法一样
  + console.info方法会在输出信息的前面，加上一个蓝色图标。

+ console.debug()
  + 与console.log方法类似,会在控制台输出调试信息。
  + 但是，默认情况下，console.debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示。

+ console.warn()、console.error()
  + warn方法和error方法也是在控制台输出信息，
  + 它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；
  + error方法输出信息时，在最前面加一个红色的叉，表示出错。
  + 同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都同log一样。

+ console.table()
  + 将复合类型的数据转为表格输出

+ console.count() 
  + count方法用于计数，输出它被调用了多少次。
  + 该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。

+ console.dir()，console.dirxml()
  + dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
    + 该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。
    + Node 环境之中，还可以指定以代码高亮的形式输出。
    + `console.dir(obj, {colors: true})`
  + dirxml方法主要用于以目录树的形式，显示 DOM 节点。
  + 如果参数不是 DOM 节点，而是普通的 JavaScript 对象，console.dirxml等同于console.dir。

+ console.assert()
  + console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
  + 它接受两个参数，第一个参数是表达式，第二个参数是字符串。
  + 只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

+ console.time()，console.timeEnd()
  + 这两个方法用于计时，可以算出一个操作所花费的准确时间。
```js
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，控制台会显示“计时器名称: 所耗费的时间”。
```

+ console.group()，console.groupEnd()，console.groupCollapsed()
  + console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
```js
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束

console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
```

+ console.trace()，console.clear() 
  + console.trace方法显示当前执行的代码在堆栈中的调用路径。
  + console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，console.clear方法将不起作用。

## 控制台命令行 API

+ $_属性返回上一个表达式的值。
+ 控制台保存了最近5个在 Elements 面板选中的 DOM 元素，$0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。

+ $(selector)  返回第一个匹配的元素，等同于document.querySelector()。
+ `$$(selector)` 返回选中的 DOM 对象，等同于document.querySelectorAll。

+ $x(path)
  + $x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。
  + `$x("//p[a]")`  返回所有包含a元素的p元素。

+ inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节。
  + DOM 元素在Elements面板中显示，比如inspect(document)会在 Elements 面板显示document元素。JavaScript 对象在控制台面板Profiles面板中显示，比如inspect(window)。

+ getEventListeners(object)
  + getEventListeners(object)方法返回一个对象，该对象的成员为object登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。

+ keys(object)，values(object)
  + keys(object)方法返回一个数组，包含object的所有键名。
  + values(object)方法返回一个数组，包含object的所有键值。

+ monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
  + monitorEvents(object[, events])方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。
  + monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。
  + `mouse` : "mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
  + `key` : "keydown", "keyup", "keypress", "textInput"
  + `touch` : "touchstart", "touchmove", "touchend", "touchcancel"
  + `control` : "resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

+ 命令行 API 还提供以下方法。
  + clear()：清除控制台的历史。
  + copy(object)：复制特定 DOM 元素到剪贴板。
  + dir(object)：显示特定对象的所有属性，是console.dir方法的别名。
  + dirxml(object)：显示特定对象的 XML 形式，是console.dirxml方法的别名。

# 错误处理

+ 错误处理机制

## 错误处理机制

+ Error 实例对象
  + JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
  + Error构造函数接受一个参数，表示错误提示，可以从实例的message属性读到这个参数。
  + 抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。
  + Error 属性
    + message：错误提示信息
    + name：错误名称（非标准属性）
    + stack：错误的堆栈（非标准属性）

+ throw 语句
  + throw语句的作用是手动中断程序执行，抛出一个错误。
  + throw可以抛出任何类型的值。也就是说，它的参数可以是任何值。
  + ` throw new Error('错误信息！');`

+ try...catch 结构
  + 一旦发生错误，程序就中止执行了。JavaScript 提供了try...catch结构，允许对错误进行处理，选择是否往下执行。
  + try代码块抛出错误。JavaScript 引擎就立即把代码的执行，转到catch代码块，或者说错误被catch代码块捕获了。
  + catch接受一个参数，表示try代码块抛出的值。
  + catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。
  + 在明明白白知道自己代码会发生错误时，不应该使用该语句

+ finally 代码块
  + try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。
  + 尽管 try 语句使用 return 返回后， finally 代码块仍然会执行

```js
try{
  //可能导致错误的代码
  throw new Error('出错了……');
}catch(error){
  //在错误发生时怎么处理
  console.log(error.message);
  console.log(error.name);
}finally{
  //无论是否出错都会执行
  console.log('完成清理工作');
}
//try语句块中的任何代码发生错误，就会立刻退出代码执行
//接着运行catch语句块
//catch块会接收到一个包含错误信息的对象，必需给错误对象取名字
//错误对象中保存着错误信息的message属性
//保存错误类型的name属性

//try...catch...finally这三者之间的执行顺序。
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}
var result = f();   // 0  // 1  // 3
result    // false

//抛出错误的时机
function process(values){
    if(!(values instanceof Array)){
        throw new Error("process(): Argument must be an array.");
    }
    values.sort();
    for(let i = 0, len = values.length; i < len; i++){
        if(values[i] > 100){
            return values[i];
        }
    }
    return -1;
}
//判断values不是数组后将错误抛出
```
+ 捕获错误，目的是避免浏览器以默认方式处理错误
+ 抛出错误，目的在于提供错误发生的具体原因

```js
//取消浏览器默认错误事件
window.onerror = function(message, url, line){
    alert(message);
    return false;//取消默认行为
}
//该函数可以捕获文档中所有的错误
图片也支持error事件,当src中的URL不能返回可以识别的图像格式,就会触发
```

## 原生错误类型

+ SyntaxError 对象
  + SyntaxError对象是解析代码时发生的语法错误。

+ ReferenceError 对象 
  + ReferenceError对象是引用一个不存在的变量时发生的错误。  找不到对象
  + 另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。

+ RangeError 对象
  + RangeError对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
  + 数值超出相应范围

+ TypeError 对象
  + TypeError对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。
  + 变量的类型不符合要求

+ URIError 对象
  + URIError对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
  + URI格式不正确

+ EvalError 对象
  + eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

## 常见错误

+ 类型转换错误
  + 使用某个操作符,或使用其他可能自动转换值的数据类型的语言结构时发生错误
  + 使用`全等(===) 和不全等 ( !==)` 避免类型的转换
  + `if for while`  等语句更要注意     if语句的自动转换布尔值

+ 数据类型错误
  + 检测数据类型,确保类型正确
  + 可以通过 `instanceof` 来检测数据类型

+ 通信错误
  + 最常见的错误是没有使用`encodeURIComponent()` 对数据进行编码
  + 服务器响应的数据不正确

+ 区分致命错误和非致命错误
  + 非致命错误
    + 不影响用户的主要任务
    + 只影响页面的一部分
    + 可以恢复
    + 重复相同操作可以消除错误
  + 致命错误
    + 应用程序根本无法继续运行
    + 错误明显影响到了用户的主要操作
    + 会导致其他连带错误
  + 可以用try-catch语句拦截非致命错误,使程序能够继续运行

+ 把错误记录到服务器
  + 将错误记录日志传入服务器集中管理

## 自定义错误

```js
//自定义错误对象
function UserError(message){
  this.message = message || '默认信息';
  this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
throw new UserError('自定义错误信息');

//自定义错误
Nice.Error = {
  MyError: function (type) {
    function my(message) {
      this.name = type;
      this.message = message;
      // this.line = line;
    }
    my.prototype = new Error();
    return my;
  }
};
//自定义错误类型
Nice.TypeError = {
  random: Nice.Error.MyError('随机错误'),
  type: Nice.Error.MyError('文件类型错误'),
  dataset: Nice.Error.MyError('自定义属性不存在'),
};
```

# 正则表达式

+ 元字符
+ 语法
+ [参考](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

## 匹配规则

### 字面量字符和元字符

+ .	点字符
  + 点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符。
  + 注意，对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是两个字符。

+ 位置字符
+  ^  匹配开头，在多行检测中，会匹配一行的开头
+  $  匹配结尾，在多行检测中，会匹配一行的结尾
```js
var s = "how are you";
var r = /\w+$/;
var a = s.match(r);  //返回数组["you"]
var r = /^\w+/;
var a = s.match(r);  //返回数组["how"]
var r = /\w+/g;
var a = s.match(r);  //返回数组["how","are","you"]
```

+ 选择符（|）
  + 竖线符号（|）在正则表达式中表示“或关系”（OR），即 cat|dog 表示匹配 cat 或 dog。
  + 选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或者cd，而不是指匹配b或者c。
  + 如果想修改这个行为，可以使用圆括号。
  + `/\w+|\d+/`  任意字母或数字     

+ 特殊字符
  + [\b] 匹配退格键(U+0008)，不要与\b混淆。
  + \cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
  + \0   null 字符
  + \n   换行符
  + \f   换页符
  + \r   回车符
  + \t   制表符tab
  + \v   垂直制表符
  + \xxx    以八进制数 xxx 规定的字符
  + \xdd    以十六进制数 dd  规定的字符
  + \uxxxx   以十六进制  xxxx  规定的 Unicode 字符
  + 前缀添加  \x  表示用的是 ASCII 字符
  + 十六进制需要添加 \x   八进制不需要

+ 预定义模式
  + \d 匹配0-9之间的任一数字，相当于[0-9]。
  + \D 匹配所有0-9以外的字符，相当于[^0-9]。
  + \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
  + \W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。
  + \s 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。
  + \S 匹配非空格的字符，相当于[^ \t\r\n\v\f]。
  + \b 匹配词的边界。
  + \B 匹配非词边界，即在词的内部。

### 转义符

+ 正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配+，就要写成\+。
+ 正则表达式中，需要反斜杠转义的，
+ 一共有12个字符：^ 、 . 、[ 、$ 、( 、) 、| 、* 、+ 、? 、{ 和 \ 。
+ 需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。

### 方括号

+ [  方括号表示字符范围 ] 

+ 字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。
+ 所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配。

+ 脱字符 （ ^ ） [[^abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset_not.asp)查找任何不在方括号之间的字符。
  + 如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。
  + 比如，[^xyz]表示除了x、y、z之外都可以匹配。
  + 如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。
  + 注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义。

+ 连字符（ - ）
  + 某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。
  + 比如，[abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母。
  + \u0128-\uFFFF表示匹配码点在0128到FFFF之间的所有字符。
  + [0-9]    0~9的数字
  + [a-z]     小写字母
  + [A-Z]     大写字母
  + [A-z]     大小写字母

  + `/(abc)|(efg)|(123)|(456)/` 
  + 为了避免歧义，应该为选择操作的多个子模式加上小括号

### 重复匹配

+ 模式的精确匹配次数，使用大括号（{}）表示。
+ {n}表示恰好重复n次，{n,}表示至少重复n次，最多无限
+ {n,m}表示重复不少于n次，不多于m次。
+ n+     同等  {1，}   匹配任何包含至少一个 n 的字符串  最多无限
+ n*     同等  *       匹配任何包含零个或多个 n 的字符串
+ n?     同等  {0，1}  匹配任何包含零个或一个 n 的字符串
+ n{x,y} 同等  {3，2}  匹配包含最少 x 个、最多 y 个 n 的序列的字符串
+ n{x,}  同等  {3，} |      匹配包含至少 x 个 n 的序列的字符串       |

+ ```js
  var s = "ggle goggle google g0...gle(多个o个数不一样的)";
  仅匹配单词 ggle 和 goggle
  var r = /go?gle/g;    同等于 /go{0,1}gle/g;
  var a = s.match(r)
  ```

### 量词符

+ 量词符用来设定某个模式出现的次数。
  - `?` 问号表示某个模式出现0次或1次，等同于{0, 1}。
  - `*` 星号表示某个模式出现0次或多次，等同于{0,}。
  - `+` 加号表示某个模式出现1次或多次，等同于{1,}。

### 贪婪匹配和惰性匹配

+ 模式是/a+/，表示匹配1个a或多个a，那么到底会匹配几个a呢？因为默认是贪婪模式，会一直匹配到字符a不出现为止。
+ 除了贪婪模式，还有非贪婪模式，即最小可能匹配。
  + 只要一发现匹配，就返回结果，不要往下检查。
  + 如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。

+ 重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符
  + ?、{n} 和 {n,m} 重复类具有弱贪婪性，表现为贪婪的有限性。
  + *、+ 和 {n,} 重复类具有强贪婪性，表现为贪婪的无限性。
+ 惰性
+ {n,m}?：尽量匹配 n 次，但是为了满足限定条件也可能最多重复 m 次。
+ {n}?：尽量匹配 n 次。
+ {n,}?：尽量匹配 n 次，但是为了满足限定条件也可能匹配任意次。
+ ?? ：表示某个模式出现0次或1次，匹配时采用非贪婪模式，相当于 {0,1}?。
+ +? ：表示某个模式出现1次或多次，匹配时采用非贪婪模式，相当于 {1,}?。
+ *? ：表示某个模式出现0次或多次，匹配时采用非贪婪模式，相当于 {0,}?。
+ /ab*/表示如果a后面有多个b，那么匹配尽可能多的b；/ab*?/表示匹配尽可能少的b，也就是0个b。

```js
越是排在左侧的重复类量词匹配优先级越高。下面示例显示当多个重复类量词同时满足条件时，会在保证右侧重复类量词最低匹配次数基础上，使最左侧的重复类量词尽可能占有所有字符。
var s = "<html><head><title></title></head><body></body></html>";
var r = /(<.*>)(<.*>)/;			/<.*?>/; //返回单个元素数组["<html>"]
var a = s.match(r);
//左侧表达式匹配"<html><head><title></title></head><body></body></html>"
console.log(a);
console.log(a[1]);  //<html><head><title></title></head><body></body>
console.log(a[2]);  //右侧表达式匹配“</html>”
```

### 修饰符

+ 修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。
+ 修饰符可以单个使用，也可以多个一起使用。
```js
// 单个修饰符
var regex = /test/i;

// 多个修饰符
var regex = /test/ig;
```

+ g 修饰符
  + 默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。
  + g修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。
  + 正则模式不含g修饰符，每次都是从字符串头部开始匹配。
  + 正则模式含有g修饰符，每次都是从上一次匹配成功处，开始向后匹配。

+ i 修饰符
  + 默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写（ignoreCase）。

+ m 修饰符
  + m修饰符表示多行模式（multiline）
  + 会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处
  + 加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
```js
/^b/m.test('a\nb') // true
//上面代码要求匹配行首的b，如果不加m修饰符，就相当于b只能处在字符串的开始处。
//加上m修饰符以后，换行符\n也会被认为是一行的开始。
```

+ `s` 修饰符 
  +  特殊字符圆点 `.` 中包含换行符 `\n`
  + 默认情况下的圆点 `.` 是 匹配除换行符`\n`之外的任何字符，加上 `s` 修饰符之后, `.` 中包含换行符 `\n`。

## 组匹配

### 括号分组

+ 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。
```js
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred') // true
//第一个模式没有括号，结果+只表示重复字母d，第二个模式有括号，结果+就表示匹配fred这个词。

//分组捕获
var m = 'abcabc'.match(/(.)b(.)/);
m   // ['abc', 'a', 'c']
//正则表达式/(.)b(.)/一共使用两个括号，第一个括号捕获a，第二个括号捕获c。

/(.)b(.)\1b\2/.test("abcabc");    // true
//\1表示第一个括号匹配的内容（即a），\2表示第二个括号匹配的内容（即c）

//匹配网页标签的例子。
var tagName = /<([^>]+)>[^<]*<\/\1>/;
// ([^>]+)  匹配标签名称
// [^<]*  匹配标签内的内容
tagName.exec("<b>bold</b>")[1]
// 'b'

//捕获带有属性的标签
var tag = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

var s = "a b c d e f g h i j k l m n";
var r = /(\w+)(\w)(\w)/;
r.test(s);
console.log(RegExp.$1);  //返回第1个子表达式匹配的字符a b c d e f g h i j k l m n
console.log(RegExp.$2);  //返回第2个子表达式匹配的字符m
console.log(RegExp.$3);  //返回第3个子表达式匹配的字符n
```

### 非捕获组

+ (?:x)称为非捕获组（Non-capturing group）
  + 表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

```js
  var s1 = "abc";
  var r = /(?:\w*?)|(?:\d*?)/;  在左括号的后面加上一个问号和冒号。

  //用来分解网址的正则表达式。
  // 正常匹配
  var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

  url.exec('http://google.com/');
  // ["http://google.com/", "http", "google.com", "/"]

  // 非捕获组匹配
  var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

  url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/"]
```

### 先行断言

+ x(?=y)称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果。
+ 比如，要匹配后面跟着百分号的数字，可以写成/\d+(?=%)/。
+ “先行断言”中，括号里的部分是不会返回的。
```js
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
//上面的代码使用了先行断言，b在c前面所以被匹配，但是括号对应的c不会被返回。
```

### 先行否定断言

+ x(?!y)称为先行否定断言（Negative look-ahead）
+ x只有不在y前面才匹配，y不会被计入返回结果。
+ 比如，要匹配后面跟的不是百分号的数字，就要写成/\d+(?!%)/。
+ “先行否定断言”中，括号里的部分是不会返回的。
```js
/\d+(?!\.)/.exec('3.14')
// ["14"]
//上面代码中，正则表达式指定，只有不在小数点前面的数字才会被匹配，因此返回的结果就是14。
```

## 例子

```js
/[\u0000-\u00ff]/g		匹配任意 ASCII 字符
/[^\u0000-\u00ff]/g		匹配任意双字节的汉字
/[a-zA-Z0-9]/g			匹配任意大小写字母和数字
/[\u0030-\u0039]/g		使用 Unicode 编码设计，匹配数字
/[\u0041-\u004A]/g		匹配任意大写字母
/[\u0061-\u007A]/g 		匹配任意小写字母
 
var s = "a b c d e z";  //字符串直接量
var r = /[abce-z]/g;  //字符a、b、c，以及从e~z之间的任意字符
var a = s.match(r);  //返回数组["a","b","c","e","z"]

var s = "abc4 abd6 abe3 abf1 abg7";  //字符串直接量
var r = /ab[c-g][1-7]/g;  //前两个字符为ab，第三个字符为从c到g，第四个字符为1~7的任意数字
var a = s.match(r);  //返回数组["abc4","abd6","abe3","abf1","abg7"]

var r = /[^0123456789]/g;  //使用反义字符范围可以匹配很多无法直接描述的字符，达到以少应多的目的。

var s = '<meta charset="utf-8">';  //待过滤的表单提交信息
var r = /\'|\"|\<|\>/gi;  //过滤敏感字符的正则表达式
function f(a) {  //替换函数
    ////把敏感字符替换为对应的网页显示的编码格式
    return "&#" + arguments[0].charCodeAt(0) + ";";
    return "&#" + a.charCodeAt(0) + ";";
}
var a =s.replace(r,f);  //执行过滤替换 
// document.write(a);  //在网页中显示正常的字符信息
console.log(a);   // &#60;meta charset=&#34;utf-8&#34;&#62;
```

# 函数

## 继承

### 继承的第三种方式：拷贝继承(混入继承：mixin)msjh.ttc

+ 场景：有时候想使用某个对象中的属性，但是又不能直接修改它，于是就可以创建一个该对象的拷贝
+ 实际运用：
  - jquery：$.extend：编写jquery插件的必经之路
    - 基于jquery封装一个表格控件

```js
    var o1={ age:2 };

    var o2 = o1;
    o2.age=18;      
    //1、修改了o2对象的age属性
    //2、由于o2对象跟o1对象是同一个对象
    //3、所以此时o1对象的age属性也被修改了
```

```js
    var o3={gender:"男",grade:"初三",group:"第五组",name:"张三"};
    var o4={gender:"男",grade:"初三",group:"第五组",name:"李四"};
    //上述代码中，如果使用拷贝继承对代码进行优化会非常和谐

    //实现拷贝继承：
    //1、已经拥有了o3对象
    //2、创建一个o3对象的拷贝(克隆)：for...in循环
    var o4={};

	//a、取出o3对象中的每一个属性
    for (var key in o3) {
        //key就是o3对象中的每一个属性
        //b、获取到对应的属性值
        var value = o3[key];
        //c、把属性值放到o4中
        o4[key] = value;
    }
 
    //3、修改克隆对象，把该对象的name属性改为"李四" 
	//3、修改克隆对象，把该对象的name属性改为"李四"
    o4.name="李四"
    console.log(o4);    //最终的目标对象的结果

    //。。。后续如果修改了o4对象中的相关属性，就不会影响到o3
```

+ 实现1：

```js
    var source={name:"李白",age:15}
    var target={};
    target.name=source.name
    target.age=source.age; 
```

+ 浅拷贝和深拷贝
  + 浅拷贝只是拷贝一层属性，没有内部对象
  + 深拷贝其实是利用了递归的原理，将对象的若干层属性拷贝出来

```js
   JSON.parse(JSON.parse(Object)); //最快的深拷贝方式?

	var students=[
        {name:"",age:""},
        {name:"",age:""}
    ]
```

+ 上面的方式很明显无法重用，实际代码编写过程中，很多时候都会使用拷贝继承的方式，所以为了重用，可以编写一个函数把他们封装起来：

```js
    function extend(target,source){
        for(let key in source){
            target[key]=source[key];
        }
        return target;
    }
    extend(target,source)
```

+ 由于拷贝继承在实际开发中使用场景非常多，所以很多库都对此有了实现
  - jquery：$.extend

+ es6中有了 <对象扩展运算符> 仿佛就是专门为了拷贝继承而生：
  - 优点：简单的令人发指

```js
    var source={name:"李白",age:15}
    //让target是一个新对象，同时拥有了name、age属性
    var target={ ...source }
    
    var target2={ ...source,age:18 }
```

### 继承的第四种方式：原型式继承：(道格拉斯在蝴蝶书中提出来的)

+ 场景：

  - a、创建一个纯洁的对象：对象什么属性都没有

  - b、创建一个继承自某个父对象的子对象

    ```js
        var parent={ age:18,gender:"男"};
        var student=Object.create(parent);
    	在不使用构造函数的情况下拷贝对象
        //student.__proto__===parent
    ```

+ 使用方式：

  - 空对象：Object.create(null)
  
```js
      var o1={ say:function(){} }
      var o2=Object.create(o1);
```

### 继承的第五种方式：借用构造函数实现继承

+ 场景：适用于2种构造函数之间逻辑有相似的情况
+ 原理：函数的call、apply调用方式

```js
function Animal(name,age,gender){
    this.name=name;
    this.age=age;
    this.gender=gender;
}
function Person(name,age,gender,say){
    this.name=name;
    this.age=age;
    this.gender=gender;
    //这段代码调用错误   为什么错误？
    //因为这种函数的调用方式，函数内部的this只能指向window
	//Animal(name,age,gender);
    
    //目的：将Animal函数内部的this指向Person的实例
    //Animal.call(this,name,age,gender)
    //-->等价于：Animal.apply(this,[name,age,gender])
    this.say=function(){

    }
}
```

+ 局限性：Animal(父类构造函数)的代码必须完全适用于Person(子类构造函数)

+ 以上代码用借用构造函数实现

```js
function Animal(name,age){
    this.name=name;
    this.age=age;
}
function Person(name,age,address){
    Animal.call(this,name,age);
    //Animal.apply(this,[name,age])
    //this.name=name;
    //this.age=age;
    this.address=address;
}
```

### 其他继承方式

+ 寄生继承、寄生组合继承

## 原型链(家族族谱)

+ 概念：JS里面的对象可能会有父对象，父对象还会有父对象，。。。。。祖先

+ 根本：继承

  - 属性：对象中几乎都会有一个`__proto__`属性，指向他的父对象
    - 意义：可以实现让该对象访问到父对象中相关属性

+ 根对象：Object.prototype

  - var arr=[1,3,5]
  - `arr.__proto__ === Array.prototype` true
  - `arr.__proto__.__proto__`找到了根对象

  ```js
      function Animal(){}
      var cat=new Animal();
      //cat.__proto__ ：Animal.prototype
      //cat.__proto__.__proto__:根对象
  ```

+ 错误的理解：万物继承自Object？

  + 因为万物都继承自Object.prototype

## 闭包

### 变量作用域

+ 变量作用域的概念：就是一个变量可以使用的范围
+ JS中首先有一个最外层的作用域：称之为全局作用域
+ JS中还可以通过函数创建出一个独立的作用域，其中函数可以嵌套，所以作用域也可以嵌套

```js
var age=18;     //age是在全局作用域中声明的变量：全局变量

function f1(){
    console.log(name);      //可以访问到name变量
    var name="周董" //name是f1函数内部声明的变量，所以name变量的作用域就是在f1函数内部

    console.log(name);      //可以访问到name变量

    console.log(age);       //age是全局作用域中声明的，所以age也可以访问
}

console.log(age);       //也可以访问
```

```js
    //多级作用域
    //-->1级作用域
    var gender="男";
    function fn(){
        //问题：
        //gender:可以访问
        //age:  可以访问
        //height:不能访问

        //-->2级作用域
        return function(){
            //问题：
            //gender:   通过一级一级作用域的查找，发现gender是全局作用域中声明的变量
            //age:
            //height：
            console.log(gender);

            //-->3级作用域
            var height=180;
        }
        var age=5;
    }
```

### 作用域链

+ 由于作用域是相对于变量而言的，而如果存在多级作用域，这个变量又来自于哪里？这个问题就需要好好地探究一下了，我们把这个变量的查找过程称之为变量的作用域链
+ 作用域链的意义：查找变量（确定变量来自于哪里，变量是否可以访问）
+ 简单来说，作用域链可以用以下几句话来概括：(或者说：确定一个变量来自于哪个作用域)
  - 查看当前作用域，如果当前作用域声明了这个变量，就确定结果
    - 查找当前作用域的上级作用域，也就是当前函数的上级函数，看看上级函数中有没有声明
      - 再查找上级函数的上级函数，直到全局作用域为止
        - 如果全局作用域中也没有，我们就认为这个变量未声明(xxx is not defined)

+ 举例1：

```js
    var name="张三";
    function f1(){
        var name="abc";
        console.log(name);
    }
    f1();
```

+ 举例2：

```js
    var name="张三";
    function f1(){
        console.log(name);
        var name="abc";
    }
    f1();
```

+ 举例3：

```js
    var name="张三";
    function f1(){
        console.log(name);
        var name="abc";
    }
    f1();
```

+ 举例4：

```js
    var name="张三";
    function f1(){
        return function(){
            console.log(name);
        }
        var name="abc";
    }
    var fn=f1();
    fn();
```

+ 举例5：

```js
    var name="张三";
    function f1(){
        return {
            say:function(){
                console.log(name);
                var name="abc";
            }
        }
    }
    var fn=f1();
```

+ 举例6

  ```js
  function fn(callback){
          
          var age=18;
          callback()
      }
      
  fn(function(){
      console.log(age);
      //分析：age变量：
      //1、查找当前作用域：并没有
      //2、查找上一级作用域：全局作用域
      //-->难点：看上一级作用域，不是看函数在哪里调用，而是看函数在哪里编写
      //-->因为这种特别，我们通常会把作用域说成是：词法作用域
  
  
  })
  ```

### 词法作用域和动态作用域

+ 词法作用域

  + 简单地说，词法作用域就是定义在词法阶段的作用域，是由写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变

  + 无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定

  + ```js
    /*	一级气泡	*/
    function foo(a) {
        var b = a * 2;/*	二级气泡	*/
        function bar(c) {
            /*	三级气泡	*/
            console.log( a, b, c );
        }
        bar(b * 3);
    }
    foo( 2 ); // 2 4 12
    
    在这个例子中有三个逐级嵌套的作用域。为了帮助理解，可以将它们想象成几个逐级包含的气泡
    
    气泡1包含着整个全局作用域，其中只有一个标识符：foo
    气泡2包含着foo所创建的作用域，其中有三个标识符：a、bar和b
    气泡3包含着bar所创建的作用域，其中只有一个标识符：c
    
    作用域气泡的结构和互相之间的位置关系给引擎提供了足够的位置信息，引擎用这些信息来查找标识符的位置
    
    在代码片段中，引擎执行console.log(...)声明，并查找a、b和c三个变量的引用。它首先从最内部的作用域，也就是bar(...)函数的作用域开始查找。引擎无法在这里找到a，因此会去上一级到所嵌套的foo(...)的作用域中继续查找。在这里找到了a，因此引擎使用了这个引用。对b来讲也一样。而对c来说，引擎在bar(...)中找到了它
    
    [注意]词法作用域查找只会查找一级标识符，如果代码引用了foo.bar.baz，词法作用域查找只会试图查找foo标识符，找到这个变量后，对象属性访问规则分别接管对bar和baz属性的访问
    
    foo = {
        bar:{
            baz: 1
        }
    };
    console.log(foo.bar.baz);//1
    ```

  + **遮蔽**

    + 作用域查找从运行时所处的最内部作用域开始，逐级向外或者说向上进行，直到遇见第一个匹配的标识符为止

    + 在多层的嵌套作用域中可以定义同名的标识符，这叫作“遮蔽效应”，内部的标识符“遮蔽”了外部的标识符

    + ```js
      var a = 0;
      function test(){
          var a = 1;
          console.log(a);//1
      }
      test();
      
      全局变量会自动为全局对象的属性，因此可以不直接通过全局对象的词法名称，而是间接地通过对全局对象属性的引用来对其进行访问
      
      var a = 0;
      function test(){
          var a = 1;
          console.log(window.a);//0
      }
      test();
      
      通过这种技术可以访问那些被同名变量所遮蔽的全局变量。但非全局的变量如果被遮蔽了，无论如何都无法被访问到
      ```

    + **动态作用域**

      + javascript使用的是词法作用域，它最重要的特征是它的定义过程发生在代码的书写阶段

      + 那为什么要介绍动态作用域呢？实际上动态作用域是javascript另一个重要机制this的表亲。作用域混乱多数是因为词法作用域和this机制相混淆，傻傻分不清楚

      + 动态作用域并不关心函数和作用域是如何声明以及在任何处声明的，只关心它们从何处调用。换句话说，作用域链是基于调用栈的，而不是代码中的作用域嵌套

      + ```js
        var a = 2;
        function foo() {
            console.log( a );
        }
        function bar() {
            var a = 3;
            foo();
        }
        bar();
        ```

      + 如果处于词法作用域，也就是现在的javascript环境。变量a首先在foo()函数中查找，没有找到。于是顺着作用域链到全局作用域中查找，找到并赋值为2。所以控制台输出2

      + 如果处于动态作用域，同样地，变量a首先在foo()中查找，没有找到。这里会顺着调用栈在调用foo()函数的地方，也就是bar()函数中查找，找到并赋值为3。所以控制台输出3

        两种作用域的区别，简而言之，词法作用域是在定义时确定的，而动态作用域是在运行时确定的

### 闭包的问题

```js
function fn(){
    var a=5;
    return function(){
        a++;
        console.log(a);		//a变量肯定是可以访问的
    }
}
//因为闭包,导致fn函数的作用域一直在被f1引用所以变量a不会被释放销毁
var f1=fn();		//f1指向匿名函数
f1();	//6
f1();	//7
f1();	//8
//把a变量的值放在f1函数可以访问到的地方

//代码执行到20行fn函数执行完毕，返回匿名函数
//      -->一般认为函数执行完毕，变量就会释放，但是此时由于js引擎发现匿名函数要使用a变量，所以a变量并不能得到释放，而是把a变量放在匿名函数可以访问到的地方去了
//      -->a变量存在于f1函数可以访问到的地方，当然此时a变量只能被f1函数访问

var f2=fn();
    f2();       //6
    f2();       //7
    f2();       //8
    //又一次执行了fn，又初始化了一个新的a变量，值为5；返回匿名函数f2，并且把新的a变量放在了f2可以访问到的地方

    var f3=fn();
    f3();       //6
    //又一次执行了fn，又初始化了一个新的a变量，值为5；返回匿名函数f2，并且把新的a变量放在了f2可以访问到的地方


function q1(){
    var a={};
    return a;
}
var r1=q1();
var r2=q1();
console.log(r1==r2);


function q2(){
    var a={}
    return function(){

        return a;
    }
}
var t3=q2();//创建一个新的a对象，把a对象放在t3可以访问到的位置

var o5=t3();    //返回值a就是那个a   并没有去创建新的a
var o6=t3();
console.log(o5 == o6)  //true


var w3=q2();//创建了一个新的a对象，把新的a对象放在w3可以访问到的位置

var o8=w3();//此时获取到的是一个新的a对象
console.log(o5==o8);    //false

```

### 闭包问题的产生原因

+ 函数执行完毕后，作用域中保留了最新的a变量的值

### 闭包的应用场景

+ 模块化

+ ```js
  //模块化思想：也是一种设计模式
  var ktv=(function KTV(){
      //为了保护leastPrice变量，将它放在函数内部
      var leastPrice=1000;
  
      var total=0;
  
      return {
          //购物
          buy:function(price){
              total+=price;
          },
          //结账
          pay:function(){
              if(total<leastPrice){
                  console.log('请继续购物');
              }else{
                  console.log('欢迎下次光临');
              }
          },
          //通过闭包修改保护的变量
          editLeast:function(id,price){
              if(id===888){
                  leastPrice=price;
                  console.log("现在最低消费金额为：",leastPrice);
              }else{
                  console.log('权限不足');
              }
          }
      }
  
  })()
  
  //有问题：来了一个工商局的朋友要来唱K
  //——>可能老板需要去修改最低消费的金额
  //-->但是并不能让老板直接去修改leastPrice，或者说不能把leastPrice作为全局变量
  
  
  //模块化开发思想
  var datepicker=(function(){
      var hour=3600*1000;
      return function(){
          console.log('日期控件初始化');
      }
  })();
  
  var common=(function(){
      return {
          isStr:function(){
  
          },
          isNumber:function(){
  
          }
      }
  })()
  ```

+ 防止变量被破坏
