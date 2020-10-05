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

# 语法

+ JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。
+ 分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
+ 表达式不需要分号结尾。一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。

## 代码规范

+ 统一缩进风格
+ 行尾的分号
+ 用大写字母表示全局变量名
+ 分清全等和相等的使用情况
+ 
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
### 概念

+ 构造函数的概念
  + 任何函数都可以当成构造函数  一般构造函数首字母大写
  + 只要把一个函数通过new的方式来进行调用，我们就把这一次函数的调用方式称之为：构造函数的调用
  + 通过 new 调用的方法是构造函数
  + 直接调用的不是构造函数

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

### 原型链

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
+ 别忘记默认的原型
  + 所有的引用类型默认都继承了`Object`，而这个继承也是通过原型链实现的， 所有函数的默认原型都是`Object`，
  + 因此默认原型都会有一个内部指针指向 `Object.prototype` 这也是所有自定义类型都会继承`toString() 、 valueOf()`等默认方法的原因
  + 引用类型实际上在调用 `toString()` 等方法时是调用的是保存在 `Object.prototype` 中的方法 

+ 原型链的问题
  + 继承后的属性共享问题，
  + 在创建子类型的实例时，不能向超类型的构造函数中传递参数，实际上应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。
  + 所以基本上不会单独使用原型链

### 借用构造函数

+ 在子类型构造函数的内部调用超类型构造函数，通过 `apply() 和 call()` 方法
```js
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

### 组合继承

+ 

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

# 变量和常量

+ 常量 (值不可以改变的) 和 变量
+ 变量
  + 变量是数据的“命名存储”。
  + 程序被CPU执行    程序被读取到内存中,被cpu运行
  + 计算机的组成 (`磁盘  内存  CPU/GPU`)
  + 在声明变量但是赋值前,默认值为`undefined` 
+ **定义变量可以使用三种关键字：var / let / const**
  + 变量名称必须仅包含**「字母，数字，符号」** `$` 和 `_`。
  + 首字符必须**「非数字」**。变量命名还有一些建议：
  + 常量一般用全大写，如 `const PI = 3.141592` ；
  + 使用易读的命名，比如 `userName` 或者 `shoppingCart`。

## let 关键字 和 const 关键字

+ let命令用来声明变量，他的作用类似于var，

+ 但是所声明的变量只在let命令所在的代码块内部有效，**不像var那样，会发生变量提升现象**；

+ 所以在初始化前访问会报错

+ let 和 const 声明的变量不会成为顶级属性

+ `const` 命令

  + const声明一个只读的常量。一旦声明，常量的值就不能改变。

  + const一旦声明常量就必须立即初始化，不能留到后面赋值

  + ```js
    const PI = 3.1415;
    PI // 3.1415
    PI = 3;
    // TypeError: Assignment to constant variable.
    
    const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。const foo; // SyntaxError: Missing initializer in const declaration
    ```

  + const的作用域与let命令相同：只在声明所在的块级作用域内有效。const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

  + const实际上保证的，并不是变量的值不得改动,而是变量指向的那个内存地址不得改动，**对于简单数据类型（数值，字符串，布尔值）**,值就保存在变量指向的那个内存地址，因此等同于常量，

  + **但是对于复合类型的数据（对象和数组）**变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于他指向的数据结构是不是可变的,就完全不能控制了；

  + ```js
    const foo = {};
    foo.prop=123;//为foo添加一个属性
    foo.prop;//123
    foo={}//将foo指向另一个对象,就会报错
    
    常量foo储存的是一个地址,这个地址指向一个对象,不可变的只是这个地址,
    即不能把foo指向另一个地址,但是对象本身是可变的,所以依然可以为其添加新属性；
    const a = [];
    a.push("hello");
    a.length = 0;
    a=["world"];//报错
    ```

+ 暂时性死区

  + ```js
    var name="MGT360124";
    if(true){
    name = "YSS360124";//ReferenceError
    let name;
    }
    /*全局变量name,但是块级作用域内有let又声明了一个局部变量name；导致后者绑定这个块级作用域,所以在let声明变量前，对name赋值会报错；所以在代码块内，使用let命令声明变量之前，该变量都是不可用的，在语法上称为"暂时性死区"（TDZ）；*/
    
    ’暂时性的死区‘’也意味着typeof不再是一个百分之百安全的操作;
    typeof name;//ReferenceError
    let name;
    ```

+ ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

  + 第一种场景，内层变量可能会覆盖外层变量。

  + ```js
    var name = "MGT360124";
    function getName(){
    	console.log(name);
    	var name="YSS360124"
    }
    getName();//undefined
    ```

  + 第二种场景，用来计数的循环变量泄露为全局变量。

  + ```js
    for(var i=0;i<5;i++){
    }
    console.log(i);//5
    ```

+ ES6的块级作用域

  + ```js
    {let name = "MGT360124";}
    name;
    ```

  + ES6 允许块级作用域的任意嵌套

  + ```js
    {{{{
      {let insane = 'Hello World'}
      console.log(insane); // 报错
    }}}};
    ```

+ do表达式

  + 块级作用域是一个语句，将多个操作封装在一起，没有返回值。使用do表达式,使得块级作用域可以变为表达式，也就是说可以返回值；

  + ```js
    let x = do{
     let t = f();
      t * t + 1;
    }//变量x会得到整个块级作用域的返回值
    ```

+ 顶层对象的属性

  + 顶层对象，在浏览器环境指的是window对象,在node指的是global对象；

  + ```js
    /*	顶层对象的属性和全局变量挂钩，被认为是js中最大的失败;
    ES6为了改变这一点，并保持兼容性,var 命令和function命令声明的全局变量，依旧是顶层对象,
    另一方面规定：let命令和const命令,class命令声明的全局变量不再属于顶层对象的属性,也就是说：从ES6开始，全局变量将逐渐与顶层对象的属性脱钩;	*/
    
    var name="MGT360124";
    window.name;//MGT360124
    
    let age=18;
    window.age;//undefined
    
    ES5的顶层对象，本身也是个问题,因为他在各种实现里面是不统一的;
    1，浏览器里面，顶层对象是window，但是node和web workers(Web Workers 是 HTML5 提供的一个javascript多线程解决方案)没有window
    2，浏览器和web Workers里面，self也是指向顶层对象,但是node没有self
    3，node里面顶层对象是global，但是其他环境都不支持;
    同一段代码为了能够在各种环境，都能取得到顶层对象,一般用this变量，但是也有局限性。
    1， 全局环境中，this会返回顶层对象。但是node模块和ES6模块中this返回的是当前模块;
    2，函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，那么this会指向顶层对象，但是在严格模式this会返回undefined;
    ```

# 正则表达式

+ 元字符
+ 语法

## 元字符

+ .	点	
  + 查找单个字符除了换行和行结束符
+ \w  查找单词字符
+ \W  查找非单词字符
+ \d   数字
+ \D  非数字
+ \s   空白
+ \S  非空白
+ \b   匹配单词边界
+ \B  非单词边界
+ \0   NUL字符
+ \n   换行符
+ \f    换页符
+ \r    回车符
+ \t    制表符tab
+ \v   垂直制表符
+ \xxx    以八进制数 xxx 规定的字符
+ \xdd    以十六进制数 dd  规定的字符
+ \uxxxx   以十六进制  xxxx  规定的 Unicode 字符
+ 前缀添加  \x  表示用的是 ASCII 字符
+ 十六进制需要添加 \x   八进制不需要

## [  方括号表示字符范围 ] 

+ [abc]   查找括号内任意字符
+ [^abc]   不在括号内的字符        ^ 反义
+ [0-9]    0~9的数字
+ [a-z]     小写字母
+ [A-Z]     大写字母
+ [A-z]     大小写字母

+  |  表示或  `/\w+|\d+/`  任意字母或数字     

  + `/(abc)|(efg)|(123)|(456)/` 
  + 为了避免歧义，应该为选择操作的多个子模式加上小括号

## 重复匹配

+ { 大括号匹配数量 } 

  + `/go{3}/g  匹配3个 o`   `/go{3,5}/g  匹配3~5个o`
  + `/go*a/g  匹配所有`       `/go{1,}/g   最少一次最多无限`

+ |      **量词**       |                   **描述**                    |
  | :-----------------: | :-------------------------------------------: |
  |   n+        {1，}   |   匹配任何包含至少一个 n 的字符串  最多无限   |
  |   n*           *    |       匹配任何包含零个或多个 n 的字符串       |
  | n?          {0，1}  |       匹配任何包含零个或一个 n 的字符串       |
  |  n{x}         {3}   |        匹配包含 x 个 n 的序列的字符串         |
  | n{x,y}      {3，2}  | 匹配包含最少 x 个、最多 y 个 n 的序列的字符串 |
  | n{x,}         {3，} |      匹配包含至少 x 个 n 的序列的字符串       |

+ ```js
  var s = "ggle goggle google g0...gle(多个o个数不一样的)";
  仅匹配单词 ggle 和 goggle
  var r = /go?gle/g;    同等于 /go{0,1}gle/g;
  var a = s.match(r)
  ```

## **贪婪匹配和惰性匹配**

+ 重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符
  + ?、{n} 和 {n,m} 重复类具有弱贪婪性，表现为贪婪的有限性。
  + *、+ 和 {n,} 重复类具有强贪婪性，表现为贪婪的无限性。
+ 惰性
+ {n,m}?：尽量匹配 n 次，但是为了满足限定条件也可能最多重复 m 次。
+ {n}?：尽量匹配 n 次。
+ {n,}?：尽量匹配 n 次，但是为了满足限定条件也可能匹配任意次。
+ ??：尽量匹配，但是为了满足限定条件也可能最多匹配 1 次，相当于 {0,1}?。
+ +?：尽量匹配 1 次，但是为了满足限定条件也可能匹配任意次，相当于 {1,}?。
+ *? ：尽量不匹配，但是为了满足限定条件也可能匹配任意次，相当于 {0,}?。

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

## 边界量词

+   ^  匹配开头，在多行检测中，会匹配一行的开头
+   $  匹配结尾，在多行检测中，会匹配一行的结尾

```js
var s = "how are you";
var r = /\w+$/;
var a = s.match(r);  //返回数组["you"]
var r = /^\w+/;
var a = s.match(r);  //返回数组["how"]
var r = /\w+/g;
var a = s.match(r);  //返回数组["how","are","you"]
```

## 声明词量

+ 正向声明

  + 指定匹配模式后面的字符必须被匹配，但又不返回这些字符。语法格式如下

    + `匹配模式  (?= 匹配条件)    ?=n`     匹配任何其后紧接指定字符串 n 的字符串。

  + ```js
    var s = "one : 1; two : 2";
    var r = /\w*(?= : 2)/;  //使用正前向声明，指定执行匹配必须满足的条件
    var a = s.match(r);  //返回数组["two"]
    ```

+ 反向声明

  + 与正向声明匹配相反，指定接下来的字符都不必被匹配。语法格式如下：

  + `匹配模式  (?! 匹配条件)    ?!n`    匹配任何其后没有紧接指定字符串 n 的字符串。

  + ```js
    var s = "one : 1; two : 2";
    var r = /\w*(?! : 2)/;  //使用正前向声明，指定执行匹配必须满足的条件
    var a = s.match(r);  //返回数组["one"]
    console.log(a);
    ```

## 子表达式

+ 使用小括号可以对字符模式进行任意分组，在小括号内的字符串表示子表达式，也称为子模式。子表达式具有独立的匹配功能，保存独立的匹配结果；同时，小括号后的量词将会作用于整个子表达式。

```js
var s = "ab=21, bc=45, cd=43";
var r = /(\w+)=(\d*)/g;
while (a = r.exec(s)) {
    console.log(a);  //返回类似["ab=21","bc=45","cd=43"]三个数组
}

var s = "a b c d e f g h i j k l m n";
var r = /(\w+)(\w)(\w)/;
r.test(s);
console.log(RegExp.$1);  //返回第1个子表达式匹配的字符a b c d e f g h i j k l m n
console.log(RegExp.$2);  //返回第2个子表达式匹配的字符m
console.log(RegExp.$3);  //返回第3个子表达式匹配的字符n

var s = "aa11bb22c3  d4e5f6";
var r = /(\w+?)(\d+)/g;
var b = s.replace(r,"$2$1");//更换子表达式的顺序， 可以改变字符串的顺序
console.log(b);  //返回字符串"11aa22bb3c  4d5e6f"

var s = "abc";
var r = /(a(b(c)))/;
var a = s.match(r);  //返回数组["abc","abc","bc","c"]
```



## 反向引用

+ `\+ 数字` 

+ 数字指定了子表达式在字符模式中的顺序。如“\1”引用的是第 1 个子表达式，“\2”引用的是第 2 个子表达式

+ ```js
  var s = "<h1>title</h1><p>text</p>";
  var r = /((<\/?\w+>).*(<\/?\w+>))/g;
  var a = s.match(r);  //返回数组["<h1>title</h1>","<p>text</p>"]
  ```

  

## 禁止引用

+ ```js
  var s1 = "abc";
  var r = /(?:\w*?)|(?:\d*?)/;  在左括号的后面加上一个问号和冒号。
  ```

  








```js
/[\u0000-\u00ff]/g		匹配任意 ASCII 字符
/[^\u0000-\u00ff]/g		匹配任意双字节的汉字
/[a-zA-Z0-9]/g			匹配任意大小写字母和数字
/[\u0030-\u0039]/g		使用 Unicode 编码设计，匹配数字
/[\u0041-\u004A]/g		匹配任意大写字母
[\u0061-\u007A]/g 		匹配任意小写字母
 
var s = "a b c d e z";  //字符串直接量
var r = /[abce-z]/g;  //字符a、b、c，以及从e~z之间的任意字符
var a = s.match(r);  //返回数组["a","b","c","e","z"]

var s = "abc4 abd6 abe3 abf1 abg7";  //字符串直接量
var r = /ab[c-g][1-7]/g;  //前两个字符为ab，第三个字符为从c到g，第四个字符为1~7的任意数字
var a = s.match(r);  //返回数组["abc4","abd6","abe3","abf1","abg7"]

var r = /[^0123456789]/g;  使用反义字符范围可以匹配很多无法直接描述的字符，达到以少应多的目的。

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