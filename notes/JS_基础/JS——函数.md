# 函数

+ 函数是 JavaScript 的第一等公民
+ 在 ECMAScript 中函数在定义时不必指定是否返回值
+ 函数的返回值
  + 函数在执行完 return 语句后会立刻停止退出 ， 位于之后的代码都不会被执行
  + 在函数任意位置，指定 `return` 指令来停止函数的执行，并返回函数指定的返回值。
  + 默认空值的 return 或没有 return 的函数返回值为 undefined 。
---
+ 理解参数 -> 所有的参数都是按值传递
  + 不论是引用类型还是原始值都会被复制到函数的局部变量(形参中)
  + 外部的引用类型会受影响是因为,外部变量和函数的形参指向的是同一个对象(而不是因为按引用传递)
+ 没有重载
  + 在两个函数名相同参数不同的情况下并不会有重载
  + 同名函数会被覆盖，相当于给变量函数名重新赋值
---
+ 严格模式对函数有一些限制
+ 函数和参数都不能命名为 `eval、arguments`, 参数不能同名
+ 每个函数都是 Function 类型的实例，和其他引用类型一样都具有属性和方法
+ 由于函数是对象，因此函数名实际上也是一个指向函数对象的指针
+   `let func = function(){};`
---
+ 函数声明方式
+ 函数内部也会发生变量和函数的提升
```js
//函数声明定义      函数声明会提升      提升到作用域顶部
function print(s){
   console.log(s);
}


//函数表达式    函数表达式不会提升，所以不能在声明前调用
var print = s => console.log(s)；
// 通过函数表达式声明函数，要像声明变量一样以分号结尾
// 通过赋值创建的函数也叫匿名函数，因为function关键字后面没有标识符
// 匿名函数有时也叫拉姆达函数，匿名函数的 name 属性是空字符串
// 把函数当作返回值时，可以使用匿名函数

//构造函数    函数声明，还能通过`Function`的构造函数声明  但是不推荐
var add = new Function(
   'x',
   'y',
   'return x + y'
);
//方便递归
let fun = function f(){
   return n < 3 ? 1 : n * f(n - 1);
}
```
---

+ 立即调用的函数表达式 IIFE
+ 立即调用 在声明函数后立即调用
  + `(function $(a){})(a);`  这里需要用括号括起来，因为语句不应该以圆括号结尾所以会报错
  + `let $ = function(a){}(a);`  这里不报错是因为这里是作为表达式被解析的 （函数定义被引擎当做一个值）
  + 通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
  + 推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，
```js
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);
// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

## 函数本身的作用域

+ 函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。
+ 总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

## 作为值的函数
  + 因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用，
  + 不仅可以将函数作为参数传递，还能作为返回结果

## 函数内部属性
  + 函数内部有两个特殊对象： `arguments 和 this`
  + `arguments` 是一个类数组对象，里面包含传入函数的参数
    + 对象还有一个callee的属性，是一个指针，指向拥有这个`arguments`对象的函数
    + 在递归时使用 `arguments.callee` 可以指向函数本身, 这样无论函数名怎么变化都可以完成递归操作
  + `this` 引用的是函数-据以执行的环境对象，——this的值（当在网页的全局作用域中调用函数this对象引用的就是window）
  + 函数调用位置的环境对象
  + 因为函数名仅仅是一个指针，所以尽管如此调用，仍然用的是同一个函数
  + ES5 规范的函数对象属性： caller  保存着调用当前函数的函数的引用，在全局作用域中调用当前函数，他的值为null
  + 在严格模式中无法使用 arguments以及其属性

## 函数属性和方法

+ name 属性 返回函数名， 匿名函数表达式返回变量名

+ 每个函数都包含两个属性： `length 和 prototype`

+ `length` 表示希望接收的命名参数的个数  `function sum(sum1,sum2){}   // sum.length  的值为2`
+ `prototype` 属性对于ES中的引用类型而言，是保存他们所有实例方法的真正所在
  + 该属性不可枚举的  ， 因此无法使用 for-in 发现
+ 每个函数都包含两个非继承而来的方法：`apply()  和  call()`
  + 这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值
  + `apply()` 方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组，可以是`Array`的实例也可以是`arguments`对象
  + `call()`  方法接收的参数, 第一个为在其中运行函数的作用域, 其他为传入参数
+ ES5还定义了一个 `bind()` 方法, 这个方法会创建一个函数的实例,其 this 值会被绑定到传给 `bind()` 函数的值
  + `func.bind(o);`

+ toString() 返回函数的字符串，值为函数的源码
```js
//利用这个实现多行字符串
var multiline = function (fn) {
    console.log(fn.toString());
    var arr = fn.toString().split('\n');
    console.log(arr);
    return arr.slice(1, arr.length - 1).join('\n');
};
function f() {/*
    这是一个
    多行注释
*/}
console.log(multiline(f));
```

## 理解参数

+ 函数的原始类型参数是按值传递(数值，字符串，布尔值)
  + 这意味着，在函数体内修改参数值，不会影响到函数外部。
+ 复合类型的值(数组，对象，其他函数)，传递方式是传址传递
  + 也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。
```js
//按值传递
var p = 2;
function f(p) {
  p = 3;
}
f(p); // p // 2
//传址传递
var obj = { p: 1 };
function f(o) {
  o.p = 2;
}
f(obj);  //obj.p // 2
//注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。
```
+ 如果有同名的参数，则取最后出现的那个值。

+ ECMAScript函数不介意传递的参数有多少个，或是什么类型
+ 即便定义的函数只接收两个参数，在调用时未必一定要传两个参数，可以传递一个、三个甚至不传，而不会出现解析错误
+ 因为在ECMAScript中的参数在内部是用一个数组来表示的，函数接收的始终都是这个数组，而不关心数组中包含哪些参数

+ 在函数内部可以通过 `arguments`对象来访问这个数组，从而获取传递给函数的每一个参数
  + `arguments`对象只是与数组类似,并不是`array`的实例,因为可以使用方括号语法访问它的每一个元素,使用`length`属性来确定传进来多少个参数
  + callee 属性 指向自身函数 在严格模式禁用

+ `arguments`可以和命名参数一起使用
  + 值永远同对应的命名参数保持一致
  + 但是对应的内存空间是独立的,并不是同一个内存空间
  + 如果只传入一个参数,`arguments[1]`设置的值并不会反应到命名参数中,因为`arguments`对象的长度是由传入参数个数决定的,不是由定义函数时的命名参数的个数决定的
  + 没有传递值的命名参数将自动被赋予`undefined`值

+ 严格模式对`arguments`对象做出了限制
  + arguments对象与函数参数不具有联动关系。也就是说，修改arguments对象不会影响到实际的函数参数。
  + 赋值无效
  + 重写值会导致语法错误

## 递归

+ 递归是在一个函数通过名字调用自身的情况下构成的
```js
function factorial(num){
  if(num <= 1){
    return 1;
  }else{
    return num * arguments.callee(num - 1); //通过内部指向自身的指针调用自己，避免函数名改变后报错
  }
}
//在严格模式下，不能通过脚本访问 arguments.callee  可以通过匿名函数的方式达成同样的效果
let factorial = (function f(num){
  if(num <= 1){
    return 1;
  }else{
    return num * f(num - 1);
  }
});
//这种方式把函数f()赋值给了factorial但是函数名仍然有效，所以递归能正确完成
```

# 继承

## 拷贝继承(混入继承：mixin)

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

## 原型式继承：(道格拉斯在蝴蝶书中提出来的)

+ 场景：
  - a、创建一个纯洁的对象：对象什么属性都没有
  - b、创建一个继承自某个父对象的子对象
```js
function object(o) {
function F(){}
F.prototype = o;
return new F();
}
/* 在函数内部创建一个临时的构造函数，然后将传入的对象作为这个构造函数的原型，
   * 最后返回这个临时类型的一个新实例，从本质上讲object()对传入其中的对象执行了一次浅复制
   */

let person = {
name:"Nicholas",
friends:["Shelby", "Court", "Van"]
};

let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);    //"Shelby,Court,Van,Rob,Barbie"

/* 这种原型继承模式，要求必须有一个对象可以作为另一个对象的基础
* ES5 新增的Object.create()方法规范了原型式继承，接受两个参数，
* 一个作为新对象的原型，一个为新对象定义额外属性的对象
* 在传入一个参数情况下，Object.create()与Object()方法的行为相同
*/

var parent = { age:18, gender:"男"};
var student = Object.create(parent);
   在不使用构造函数的情况下拷贝对象
   //student.__proto__===parent
```

+ 使用方式：
  - 空对象：Object.create(null)
```js
var o1={ say:function(){} }
var o2=Object.create(o1);
```

## 借用构造函数实现继承

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

## 组合继承

+ 也叫做伪经典继承
+ 指的是将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式。
+ 使用原型链实现对原型属性和方法的继承，而又借用构造函数来实现对实例属性的继承
+ 这样，即通过在原型上定义方法实现了函数复用，有能够保证每个实例都有它自己的属性
```js
function SuperType(name){
this.name = name;
this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
alert(this.name);
};
function SubType(name, age) {
SuperType.call(this,name);            //第二次调用SuperType()
this.age = age;  
}
SubType.prototype = new SuperType();    //第一次调用SuperType()
SubType.prototype.sayAge = function() {
alert(this.age);
}

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);      //"red,blue,green,black"
instance1.sayName();      //"Nicholas"
instance1.sayAge();       //29

let instance2 = new SubType("Greg", 27);
alert(instance2.colors);       //"red,blue,green"
instance2.sayName();      //"Greg"
instance2.sayAge();       //27
```
+ 组合继承最大的问题就是无论什么情况下,都会调用两次超类型构造函数:
  + 一次是在创建子类型原型的时候,一次是在子类型构造函数内部
  + 子类型最终会包含超类型的全部实例属性,但我们不得不在调用子类型构造函数时重写这些属性
  + 两次的调用使SubType有了两组一样的属性,一组的实例上,一组在SubType原型中

## 寄生式继承

+ 寄生式继承是与原型式继承紧密相关的一种思路,寄生式继承思路与寄生构造函数和工厂模式类似,
+ 即创建一个仅用于封装继承过程的函数
```js
function createAnother(original){
let clone = object(original);   //通过调用函数创建一个新对象
clone.sayHi = function(){       //以某种方式来增强这个对象
   alert("hi");
};
return clone;                   //返回这个对象
}
//在这个例子中,createAnother()函数接收了一个参数,也就是将要作为新对象基础的对象.
let person = {friends : ["shelby", "Court", "Van"]};
let anotherPerson = createAnother(person);
anotherPerson.sayHi();  //"hi"
```
+ 不能做到函数复用而降低效率

## 寄生组合式继承

+ 寄生式继承解决了组合式继承的缺点
  + 寄生组合继承,即通过借用构造函数来继承属性,通过原型链的混成形式来继承方法.
  + 不必伪类指定子类型的原型而调用超类型的构造函数
```js
function inheritPrototype(subType, superType){
let prototype = Object(superType.prototype);     //创建对象
prototype.constructor = subType;                //增强对象
subType.prototype = prototype;          //指定对象
}
//inheritPrototype() 函数实现了寄生组合式继承的最简单形式,这个函数接收两个参数
//子类型构造函数和超类型构造函数,

function SuperType(name){
this.name = name;
this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
alert(this.name);
};
function SubType(name, age) {
SuperType.call(this,name);
this.age = age;  
}
inheritPrototype(SubType, SuperType);
SubType.prototype.say.Age = function(){
alert(this.age);
}
//这个例子的高效率体现在它只调用了一次 SuperType 构造函数,
//因此避免了在 SubType.prototype上面创建不必要的、多余的属性。同时还能让原型链保持不变
//还能够正常使用instanceof 和 isPrototypeOf()
```

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

+ 错误的理解：万物继承自 Object ？
  + 因为万物都继承自 Object.prototype

# 闭包

+ 闭包是指由权访问另一个函数作用域中的变量的函数
+ 在一个作用域访问另一个函数作用域中的变量
+ 创建闭包的常见方式，就是在一个函数内部创建另一个函数

+ this对象通常是在运行时基于函数的执行环境绑定的

## 变量作用域

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

## 作用域链

+ 由于作用域是相对于变量而言的，而如果存在多级作用域，这个变量又来自于哪里？这个问题就需要好好地探究一下了，我们把这个变量的查找过程称之为变量的作用域链
+ 作用域链的意义：查找变量（确定变量来自于哪里，变量是否可以访问）
+ 简单来说，作用域链可以用以下几句话来概括：(或者说：确定一个变量来自于哪个作用域)
  - 查看当前作用域，如果当前作用域声明了这个变量，就确定结果
    - 查找当前作用域的上级作用域，也就是当前函数的上级函数，看看上级函数中有没有声明
      - 再查找上级函数的上级函数，直到全局作用域为止
        - 如果全局作用域中也没有，我们就认为这个变量未声明(xxx is not defined)
+ 多查找作用域链中的一个层次,就会在一定程度上影响查找速度.而这正是使用闭包和私有变量的一个明显的不足之处
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

## 词法作用域和动态作用域

+ 词法作用域
  + 简单地说，词法作用域就是定义在词法阶段的作用域，是由写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变
  + 无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定
```js
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
```js
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
```js
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

## 模仿块级作用域

+ `(function(){ //块级作用域 })();` 双括号的这种语法表示函数创建后立即调用该函数，后面的括号传入参数
+ 用括号将函数包裹是为了将函数声明转换为函数表达式，函数表达式function后面可以跟括号
+ 而函数声明function后直接跟括号会导致语法错误
```js
function outputNumbers(count){
(function(){
   for(var i = 0; i < count; i++){
      alert(i);
   }
})();
alert(i);   //报错
}
//通过这种方式模仿块级作用域
//ES6因为有let 变量声明方式所以不用
```

## 私有变量

+ 严格来说js中没有私有成员的概念，所有对象属性都是公有的。
+ 但是有私有变量的概念，在任何函数中定义的变量，都可以认为是私有变量，不能在函数外部访问这些变量
+ 私有变量包含函数的参数、局部变量、和在函数内部定义的其他函数
+ 利用闭包可以，可以通过闭包的作用域链访问到私有变量，
+ 把有权访问私有变量和私有函数的公有方法称为特权方法(privileged method)，有两种在对象上创建特权方法的方式，
+ 第一种是在构造函数中定义特权方法
```js
function MyObject(){
  //私有变量加私有函数
  let privateVariable = 10;

  function PrivateFunction(){
    return false;
  }

  //特权方法
  this.publicMethod = function(){
    privateVariable++;
    return PrivateFunction();
  };
}
```

## 闭包的问题

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

## 闭包问题的产生原因

+ 函数执行完毕后，作用域中保留了最新的a变量的值

## 闭包的应用场景

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
  var datePicker=(function(){
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

# 高级函数

+ 安全的类型检测
  + javaScript 内置的类型检测机制并非完全靠谱
  + typeof  和 instanceof  都会由检测错误的情况发生
```js
  /* 在任何值上调用Object 原生的 toString() 方法都会返回一个
  *  [object NativeConstructorName] 格式的字符串,每个类在内部都有一个
  *  [[CLass]]属性,这个属性中就指定了上述字符串中的构造函数名
  */
  alert(Object.prototype.toString.call(value));   // "[objecct Array]"
  
  //利用者一点可以检测是否属于原生
  function isArray(value){
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function isFunction(value){
    return Object.prototype.toString.call(value) === "[object Function]";
  }
  
  function isRegExp(value){
    return Object.prototype.toString.call(value) === "[object RegExp]";
  }
  
  let isNativeJSON = window.JOSN && Object.prototype.toString.call(JSON) === "[object JSON]";
```

## 作用域安全的构造函数

+ 使用 new 关键字创建的实例, this会指向该实例
+ 如果不适用 new 关键字创建实例,  使用 this 赋值的属性在全局作用域中调用,会把属性添加在window对象上

```js
  //使用这个模式就锁定了可以调用构造函数的环境,不会应为忘记new关键字导致的赋值错误
  function Person(name, age, job) {
  	if (this instanceof Person) {
  		this.name = name;
  		this.age = age;
  		this.jon = job;
  	} else {
  		return new Person(name, age, job);
  	}
  }
  //使用构造函数窃取模式的继承且不适用原型链,那么这个继承很可能被破坏;例如:
  function Polygon(sides) {
  	if (this instanceof Polygon) {
  		this.sides = sides;
  		this.getArea = function () {
  			return 0;
  		};
  	} else {
  		return new Polygon(sides);
  	}
  }
  function Rectangle(width, height) {
  	Polygon.call(this, 2);
  	this.width = width;
  	this.height = height;
  	this.getArea = function () {
  		return this.width * this.height;
  	};
  }
  
  let rect = new Rectangle(5, 10);
  alert(rect.sides);		//undefined
  //因为Polygon的作用域是安全的,所以利用Polygon.call();获取到的并不是属性,而是Polygon的实例,    所以在Rectangle的实例中并没有sides属性
  //Rectangle构造函数中的this并没有得到增长,Polygon.call();返回的值也没有用到
  
  //配合使用原型链或寄生组合可以解决这个问题   在创建构造函数前使用
  Rectangle.prototype = new Polygon();
  
  let rect = new Rectangle(5, 10);
  alert(rect.sides);		//2
  //但是此时rect的constructor属性指向 Polygon 而不是 Rectangle
```

## 惰性载入函数

+ 因为浏览器的差异大多于用if语句来做跨浏览器兼容,导致代码中包含了大量的if语句

+ 该该方法主要用来避免重复执行不必要的代码

+ ```js
  //第一种实现惰性载入方式
  function createXHR() {
      if (typeof XMLHttpRequest != "undefined") {
          createXHR = function () {
              return new XMLHttpRequest();
          };
      }else if (typeof ActiveXObject != "undefined") {
          createXHR = function () {
              if (typeof arguments.callee.activeXString != "string") {
                  let versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                      i, len;
                  for (i = 0, len = versions.length; i < len; i++){
                      try {
                          new ActiveXObject(versions[i]);
                          arguments.callee.activeXString = versions[i];
                          break;
                      } catch (ex) {
                          //skip
                      }
                  }
              }
              return new ActiveXObject(arguments.callee.activeXString);
          };
      } else {
          createXHR = function () {
              throw new Error("NO XHR object available.");
          };
      }
      return createXHR();
  }
  //在这个惰性载入的createXHR()中,每个分支都会为createXHR变量赋值,有效覆盖了原有的函数.当调用后createXHR会被新的函数覆盖,那么之后在调用的话,就不会在执行if判断了,
  
  
  //第二种方式
  //创建一个匿名的自执行的函数,用以确定用哪一个函数实现
  let createXHR = (function () {
      if (typeof XMLHttpRequest != "undefined") {
          return function () {
              return new XMLHttpRequest();
          }
      } else if (typeof ActiveXObject != "undefined") {
          return function () {
              if (typeof arguments.callee.activeXString != "string") {
                  let versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                      i, len;
                  for (i = 0, len = versions.length; i < len; i++) {
                      try {
                          new ActiveXObject(versions[i]);
                          arguments.callee.activeXString = versions[i];
                          break;
                      } catch (ex) {
                          //skip
                      }
                  }
              }
              return new ActiveXObject(arguments.callee.activeXString);
          };
      } else {
          return function () {
              throw new Error("NO XHR object available.");
          };
      }
  })();
  ```

## 函数绑定

+ 函数绑定要创建一个函数,可以在特定的this环境中已指定参数调用另一个函数,该技巧常常和回调函数于事件处理程序一起使用,以便在将函数作为变量传递的同时保留代码执行环境

+ ```js
  //这个事件触发的提示为 undefined  而不是 "Event Handled",因为this指向的是按钮
  //而不是handler   所以需要保存handler.handleClick 的环境
  let handler = {
      message: "Event Handled",
  
      handleClick: function (e) {
          alert(this.message);
      }
  };
  
  let btn = document.querySelector("my-btu");
  //直接将方法赋值给按钮
  btn.addEventListener("click", handler.handleClick, false);
  
  //这个解决方案  使用了一个闭包直接调用handler.handleClick().
  btn.addEventListener("click", function(event){
      //间接调用该方法
      handler.handleClick(event)
  }, false);
  
  //控制台版
  let handler = {
      message: "Event Handled",
      handleClick: function (e) {
          console.log(this.message);
      }
  };
  
  let func = handler.handleClick;
  func(); //undefined
  let func = function (event) {
      handler.handleClick(event);
  };
  func();	//"Event Handled"
  ```

+ 创建多个闭包可能会令代码变得难于理解和调试

+ 使用bind()方法,接收一个函数和一个环境

  + ```js
    function bind(fn, context) {
    	return function () {
    		return fn.apply(context, arguments);
    	};
    }
    //在 bind() 中创建了一个闭包, 闭包使用apply()调用传入的函数,并给apply()传递context对象和参数, 这里使用的  arguments 对象是内部函数的,而非bind方法的,当调用返回的函数时,它会在给定环境中执行被传入的函数并给出所有参数
    btn.addEventListener("click", bind(handler.handleClick, handler), false);
    
    //ES5原生的bind方法
    btn.addEventListener("click", handler.handleClick.bind(handler), false);
    
    //会占用更多内存,同时也因为多重函数调用速度会慢一点
    ```

## 函数柯里化

+ 用于创建已经设置好了一个或多个参数的函数,基本方法于函数绑定一样,利用闭包,

+ 创建一个或多个参数固定的函数

+ 区别在于,被函数调用时,返回的函数还需要设置一些传入的参数

```js
function add(num1, num2) {
   return num1 + num2;
}

function curriedAdd(unm2) {
   return add(5, num2);
}
//这段代码定义了两个函数: add ()和curriedAdd()。后者本质上是在任何情况下第一个参数为5的add()版本。尽管从技术上来说curriedAdd()并非柯里化的函数,但它很好地展示了其概念。柯里化函数通常由以下步骤动态创建:调用另一个函数并为它传人要柯里化的函数和必要参数。
//下面是创建柯里化函数的通用方式。
function curry(fn) {
   //截取索引为1以后的      获取第一个参数之后的所有参数
   //args 包含了来自外部函数的参数
   let args = Array.prototype.slice.call(arguments, 1);
   return function () {
         //空数组        内部函数的参数数组包含了传入的参数
         let innerArgs = Array.prototype.slice.call(arguments);
         //拼接外部固定参数和内部传入参数
         let finalArgs = args.concat(innerArgs);
         //不改变this指向,向fn传入finalArgs参数数组
         //不考虑执行环境
         return fn.apply(null, finalArgs);
   };
}
curry函数的主要工作就是将被返回函数的参数进行排序,curry()第一个参数是要进行柯里化的函数,其他参数是要传入的值,

function add(num1, num2) {
return num1 + num2;
}
var curriedAdd = curry(add, 5);
//curriedAdd 此时是curry方法返回的匿名函数, 执行的方法和第一个参数已经固定
console.log(curriedAdd(7));	//12

//Array.prototype.slice.call(); 方法  arguments 为Array.prototype.slice方法执行的对象, 后面接的是参数
function test(a,b,c,d) { 
   var arg = Array.prototype.slice.call(arguments, 1,2); 
   console.log(arguments);
   console.log(arg);
} 
test("a","b","c","d"); //b
```

## 结合函数绑定和柯里化

```js
function bind(fn, context) {
   let args = Array.prototype.slice.call(arguments, 2);
   return function () {
         let innerArgs = Array.prototype.slice.call(arguments);
         let finalArgs = args.concat(innerArgs);
         return fn.apply(context, finalArgs);
   };
}
btn.addEventListener("click", bind(handler.handleClick, handler, "my-btn"), false);

//ES5原生的bind方法     ES5的bind函数也实现了柯里化
btn.addEventListener("click", handler.handleClick.bind(handler, "my-btn"), false);
```

## 高级定时器

+ 因为js是单线程的运行环境
  + js在执行时,会有一个执行队列,需要执行的代码都会被加入执行队列中等待执行
+ 所以定时器定在150ms后执行,这只是在150ms后将代码插入到了执行队列中,并不是立刻就会执行
  + 这也是导致js定时器并不准确的原因
+ 定时器指定是时间表示何时将代码插入执行队列,而不是实际执行代码

+ 重复的定时器
  + 使用`setInterval ()`创建的定时器确保了定时器代码规则地插入队列中。这个方式的问题在于,定时器代码可能在代码再次被添加到队列之前还没有完成执行,结果导致定时器代码连续运行好几次，而之间没有任何停顿。幸好，JavaScript 引擎够聪明，能避免这个问题。当使用`setInterval()`时,仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加人到队列中的最小时间间隔为指定间隔
  + 缺点有二
    + 某些间隔会被跳过
    + 多个定时器的代码执行之间的间隔可能会比预期的小
  + 避免缺点  使用链式`setTimeout()`
```js
//这种方式确保了在代码执行完前不会向队列插入新的定时器代码,确保不会有任何缺失的间隔,而且还可以保证在下次定时器代码执行前,至少要等待指定的间隔,避免了连续的运行
setTimeout(function () {
   setTimeout(arguments.callee, interval);
}, interval);
```

+ `Yielding Processes`
  + js一旦超过浏览器限制的执行时间或特定的语句数量,就会给用户警告,是否继续执行代码
  + 定时器是绕开此限制的方法之一
  + 一般脚本长时间运行的问题通常是由:过长的 ,过深嵌套的函数调用或是大量处理的循环导致的
    + 由于js执行是一个阻塞操作,脚本运行时间越长,用户无法于页面交互的时间也越长
    + 在展开循环前,的问题
      + 该处理是否必需同步完成
      + 数据是否必需按顺序完成
    + 如果不必需就可以使用定时器分割这个循环,数组分块技术
```js
setTimeout(function () {
//取除下一个条目并处理
let item = array.shift();
process(item);//处理

//若还有条目,再设置另一个定时器
if (array.length > 0) {
   setTimeout(arguments.callee, 100);
}
}, 100);

//封装函数  三个参数:要处理的项目的数组,用于处理项目的函数, 以及可选的该函数的执行环境
//这样就不会因为循环时间过长而影响用户操作或报错
function chunk(array, process, context) {
setTimeout(function () {
         //此操作在改变数组的条目,想保持数组不变,需将该数组的克隆传入
   let item = array.shift();
   process.call(context, item);
   if (array.length > 0) {
      setTimeout(arguments.callee, 100);
   }
}, 100);
}
//可利用数组的concat()方法克隆数组
chunk(data.concat(),func);
```

+ 函数节流
  + DOM操作比起DOM交互需要更多的内存和CPU时间,过多的DOM相关操作可能会导致浏览器挂起,甚至崩溃
  + 比如在浏览器调整大小时操作DOM元素,可能就会崩溃
  + 可以使用定时器对该函数进行节流
    + 基本思想,某些代码不可以在没有间断的情况下连续重复执行
    + 第一次调用函数创建一个定时器
    + 第二次调用清除前一次的定时器,并设置另一个
    + 如果前一个定时器尚未执行,就替换为一个新的定时器
    + 目的是只有在执行函数的请求停止了一段时间才后执行
```js
let processor = {
   timeoutId: null,
   //实际执行处理的方法
   performProcessing: function () {
      //实际执行的代码
   },
   
   //初始处理调用的方法
   process: function () {
      clearTimeout(this.timeoutId);
      let that = this;
      this.timeoutId = setTimeout(function () {
            that.performProcessing();
      }, 100);
   }
}
//这就实现了在100ms内不管调用多少次process方法performProcessing方法都只会执行一遍

//利用函数进行优化   两个参数: 要执行的函数,以及在哪个作用域种执行
function throttle(method, context) {
clearTimeout(method.tId);
method.tId = setTimeout(function () {
   method.call(context);
}, 100);
}
```

# ES6
# 函数的扩展

## 函数参数的默认值

+ ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
```js
//ES5设置默认参数的方法
function log(x, y) {
  y = y || 'World';
  //这种写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用
  //为了避免这个问题，通常需要先判断一下参数 y 是否被赋值，如果没有，再等于默认值。
  //若函数没有传入参数，则参数默认值为`undefined`
  if (typeof y === 'undefined') {
    y = 'World';
  }
}
```

+ ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
+ 参数变量是默认声明的，所以不能用 let 或 const 再次声明。
+ 使用参数默认值时，函数不能有同名参数。
```js
function log(x, y = 'World') {
  let x = 1; // error   不能重复声明
  console.log(x, y);
}

//一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
//每次调用都会重新计算 p 的值，而不是 p 默认等于 100
foo() // 100
foo() // 100
x = 100;
foo() // 101
```

### 与解构赋值默认值结合使用

+ 参数默认值可以与解构赋值的默认值，结合起来使用。
```js
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

//只有当函数 foo 的参数是一个对象时，变量 x 和 y 才会通过解构赋值生成。
//如果函数 foo 调用时没提供参数，变量 x 和 y 就不会生成，从而报错。
function foo({x, y = 5} = {}) {
  console.log(x, y);
}
foo() // undefined 5
```

+ 双重默认值
```js
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错
/** 上面代码中，如果函数fetch的第二个参数是一个对象，就可以为它的三个属性设置默认值。
 * 这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。
 * 这时，就出现了双重默认值。
 * */
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com')
// "GET"
//上面代码中，函数 fetch 没有第二个参数时，函数参数的默认值就会生效
//然后才是解构赋值的默认值生效，变量 method 才会取到默认值 GET。
```

+ 区别
```js
// 写法一:既设置了解构的默认值，也设置了函数的默认值，形成了双重默认值
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二:只设置了函数的默认值，避免了设置双重默认值
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

### 参数默认值的位置

+ 通常情况下，定义了默认值的参数，应该是函数的尾参数。
+ 因为这样比较容易看出来，到底省略了哪些参数。
+ 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
```js
//不是尾参数，无法进行省略，只能显式输入 undefined , null 无法触发默认值
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

### 函数的 length 属性

+ 指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。
+ 也就是说，指定了默认值后，length 属性将失真。
```js
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
//如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```
+ 这是因为 length 属性的含义是，该函数预期传入的参数个数。
+ 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。
+ 同理，后文的 rest 参数也不会计入 length 属性。

### 作用域

+ 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
+ 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
```js
var x = 1;
//在初始化时单独形成了一个作用域，所以 y 引用的是最接近自己的初始化时的作用域，而不是全局作用域中的 x = 1 .
function f(x, y = x) {
  console.log(y);
}
f(2) // 2

//在这个初始化作用域中也存在 变量的暂时性死区，所以不能在变量声明前使用
var x = 1;
function foo(x = x) {}//在这里因为作用域中声明了 x 所以不会在引用外部的 x ，造成死区
foo() // ReferenceError: x is not defined
```

+ 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则
```js
let foo = 'outer';

function bar(func = () => foo) {//引用的 foo 为函数声明时借用的全局变量 foo
  let foo = 'inner';
  console.log(func()); // 而不是调用时函数内部的 foo ， 引用的还是声明时引用的全局变量 foo
}
bar(); // outer

var x = 1; // 1 不受函数运行的影响，因为内部重新声明了变量 x ， 不会再引用全局变量
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y(); // 更改的是初始化作用域中 x 的值
  console.log(x);  // 3  因为引用的是 var 重新声明的 x 变量
}
```

### 应用

+ 可以将参数默认值设为undefined，表明这个参数是可以省略的。
+ 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```js
function foo(optional = undefined) { ··· }

function throwIfMissing() {//函数一般只用来抛出错误，处理错误在调用目标函数外
  try { throw new Error('Missing parameter');//这里在内部处理错误只是方便测试
  } catch (e) {log(e.message)}
}

function foo(mustBeProvided = throwIfMissing()) {//在没有传入参数时，就会调用默认值，从而抛出错误
  return mustBeProvided;
}
foo() //Missing parameter
```

## rest 参数

+ ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。
+ rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
+ 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
+ 函数的 length 属性，不包括 rest 参数。
```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}
//上面代码的 add 函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。
add(2, 5, 3) // 10

//下面是一个 rest 参数代替 arguments 变量的例子。
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
  //arguments对象不是数组，而是一个类似数组的对象。
  //所以为了使用数组的方法，必须使用 Array.prototype.slice.call 先将其转为数组。
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
//rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。
//利用 rest 参数改写数组 push 方法的例子。
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}
var a = [];
push(a, 1, 2, 3)
```

## 严格模式

+ 从 ES5 开始，函数内部可以设定为严格模式。
+ ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
+ 那么函数内部就不能显式设定为严格模式，否则会报错。
```js
// ES5
function doSomething(a, b) {
  'use strict';
  // code
}

// ES6
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```
+ 这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。
+ 但是，函数执行的时候，先执行函数参数，然后再执行函数体。
+ 这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
+ 这是为了避免已经执行了错误的代码，然后在报错，也为了避免增加不必要的复杂性

+ 两种方法可以规避这种限制。
+ 第一种是设定全局性的严格模式，这是合法的。
+ 第二种是把函数包在一个无参数的立即执行函数里面。
```js
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```

## name 属性

+ 函数的 name 属性，返回该函数的函数名。
```js
function foo() {}
foo.name // "foo"
//这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。
/**
 * 需要注意的是，ES6 对这个属性的行为做出了一些修改。
 * 如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串
 * 而 ES6 的name属性会返回实际的函数名。
*/
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"

//如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的 name 属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

//Function 构造函数返回的函数实例，name 属性的值为 anonymous。
(new Function).name // "anonymous"
//bind 返回的函数，name 属性值会加上 bound 前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

## 箭头函数

+ ES6 允许使用“箭头”（=>）定义函数。
+ **「函数箭头表达式」**是ES6新增的函数表达式的语法，也叫 **「胖箭头函数」**，变化：更简洁的函数和`this`
```js
//一个参数
var f = v => v;
// 等同于
var f = function (v) {return v;};
```

+ 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
```js
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {return num1 + num2;};
```

+ 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来
+ 并且使用 return 语句返回。
```js
var sum = (num1, num2) => { return num1 + num2; }
//由于大括号被解释为代码块
//所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

+ 下面是一种特殊情况，虽然可以运行，但会得到错误的结果。
```js
let foo = () => { a: 1 };
foo() // undefined

/**
 * 上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句 a: 1。
 * 这时，a 可以被解释为语句的标签，因此实际执行的语句是 1;，然后函数就结束了，没有返回值。
*/

//如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn = () => void doesNotReturn();
```

### 箭头函数可以与变量解构结合使用。

```js
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}

//箭头函数使得表达更加简洁。
const isEven = n => n % 2 === 0;
const square = n => n * n;


//箭头函数的一个用处是简化回调函数。
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);

//例子
// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});
// 箭头函数写法
var result = values.sort((a, b) => a - b);

//rest 参数与箭头函数结合的例子。
const numbers = (...num_s) => num_s;
numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5);    // [1,[2,3,4,5]]
```

### 使用注意点

+ 箭头函数有几个使用注意点
  + 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
    + (因为箭头函数没有自己的 this , 同时也没有 arguments、super、new.target。)
    + 由于箭头函数没有自己的 this，所以当然也就不能用 call()、apply()、bind() 这些方法去改变 this 的指向。
  + 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
  + 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  + 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

+ 上面四点中，第一点尤其值得注意。this 对象的指向是可变的，但是在箭头函数中，它是固定的。
```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
//普通函数会 this 会指向全局对象 从而输出 21
foo.call({ id: 42 });
// id: 42

//箭头函数可以让 setTimeout 里面的 this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
/**
 * Timer 函数内部设置了两个定时器，分别使用了箭头函数和普通函数。
 * 前者的 this 绑定定义时所在的作用域（即 Timer 函数），后者的 this 指向运行时所在的作用域（即全局对象）。
 * 所以，3100 毫秒之后，timer.s1 被更新了 3 次，而 timer.s2 一次都没更新。
*/

- 箭头函数可以让 this 指向固定化，这种特性很有利于封装回调函数。
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};

- 上面代码的 init 方法中，使用了箭头函数，这导致这个箭头函数里面的 this，总是指向 handler 对象。
- 否则，回调函数运行时，this.doSomething 这一行会报错，因为此时 this 指向 document 对象。
```

+ this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制
+ 实际原因是箭头函数根本没有自己的 this，导致内部的 this 就是外层代码块的 this。
+ 正是因为它没有 this，所以也就不能用作构造函数。
```js
//所以，箭头函数转成 ES5 的代码如下。
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}

//这串代码中只有一个 this 那就是 foo 的 this
//因为箭头函数都没有 this 所以都指向了 foo 的 this
//除了 this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

### 不适用场合

+ 由于箭头函数使得 this 从“动态”变成“静态”，下面两个场合不应该使用箭头函数。
  + 第一个场合是定义对象的方法，且该方法内部包括this。
```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
/**
 * cat.jumps() 方法是一个箭头函数，这是错误的。
 * 调用 cat.jumps() 时，如果是普通函数，该方法内部的 this 指向 cat；
 * 如果写成上面那样的箭头函数，使得 this 指向全局对象，因此不会得到预期结果。
 * 这是因为对象不构成单独的作用域，导致 jumps 箭头函数定义时的作用域就是全局作用域。
*/
```

  + 第二个场合是需要动态 this 的时候，也不应使用箭头函数。
```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
//点击按钮会报错，因为 button 的监听函数是一个箭头函数，导致里面的 this 就是全局对象。
//如果改成普通函数，this 就会动态指向被点击的按钮对象。
```

+ 如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，
+ 这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

### 嵌套的箭头函数

+ 箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。
```js
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]
//箭头函数改写
let insert = value => ({into: array => ({after: afterValue => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]

//面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5);  // 12
//改写
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12

//箭头函数还有一个功能，就是可以很方便地改写 λ 演算。
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
//几乎是一一对应的。由于 λ 演算对于计算机科学非常重要，这使得我们可以用 ES6 作为替代工具，探索计算机科学。
```

## 尾调用优化

+ 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，就是指某个函数的最后一步是调用另一个函数。
```js
function f(x){
  return g(x);
}
//函数f的最后一步是调用函数 g，这就叫尾调用。

- 以下三种情况，都不属于尾调用。

// 情况一 调用后还有操作
function f(x){
  let y = g(x);
  return y;
}

// 情况二 同一
function f(x){
  return g(x) + 1;
}

// 情况三 相当于函数后还有一句 return undefined;
function f(x){
  g(x);
}

// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
//函数 m 和 n 都属于尾调用，因为它们都是函数 f 的最后一步操作。
```

### 尾调用优化

+ 尾调用之所以与其他调用不同，就在于它的特殊的调用位置。
+ 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。
+ 如果在函数 A 的内部调用函数 B，那么在 A 的调用帧上方，还会形成一个 B 的调用帧。
+ 等到 B 运行结束，将结果返回到 A，B 的调用帧才会消失。
+ 如果函数 B 内部还调用函数 C，那就还有一个 C 的调用帧，以此类推。
+ 所有的调用帧，就形成一个“调用栈”（call stack）。

+ 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
+ 因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
/**
 * 如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、g 的调用位置等信息。
 * 但由于调用 g 之后，函数 f 就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。
*/
```

+ 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
+ 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
+ 这就是“尾调用优化”的意义。
+ 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
// 不会进行尾调优化，因为在尾调函数中引用了外层变量
```

### 尾递归

+ 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
+ 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
+ 但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
//上面代码是一个阶乘函数，计算 n 的阶乘，最多需要保存 n 个调用记录，复杂度 O(n) 。

//如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
  //每次都将结果直接传入下一次递归，从而达到不需要依靠外层实现递归
}
factorial(5, 1) // 120

//还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。
//非尾递归的 Fibonacci 数列实现如下。
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

//尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

### 递归函数的改写

+ 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。
+ 做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
+ 比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total，那就把这个中间变量改写成函数的参数。
+ 这样做的缺点就是不太直观，第一眼很难看出来，为什么计算 5 的阶乘，需要传入两个参数 5 和 1 ？

+ 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
```

+ 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
```js
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
//上面代码通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial。

//第二种方法就简单多了，就是采用 ES6 的函数默认值。
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

+ 递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。
+ 只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

### 严格模式

+ ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
+ 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
  + func.arguments：返回调用时函数的参数。
  + func.caller：返回调用当前函数的那个函数。
+ 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。
+ 严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

### 尾递归优化的实现

+ 尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？
+ 回答是可以的，就是自己实现尾递归优化。
+ 它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。
+ 怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。
```js
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}
sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)

// 蹦床函数（trampoline）可以将递归执行转为循环执行。
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
//上面就是蹦床函数的一个实现，它接受一个函数 f 作为参数。
//只要 f 执行后返回一个函数，就继续执行。
//注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
//现在，使用蹦床函数执行 sum，就不会发生调用栈溢出。
trampoline(sum(1, 100000))
// 100001

//蹦床函数并不是真正的尾递归优化，下面的实现才是。
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
/**
 * tco 函数是尾递归优化的实现，它的奥妙就在于状态变量 active。
 * 默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。
 * 然后，每一轮递归 sum 返回的都是 undefined，所以就避免了递归执行
 * 而 accumulated 数组存放每一轮 sum 执行的参数，总是有值的，这就保证了 accumulator 函数内部的 while 循环总是会执行。
 * 这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
*/
```

## 函数参数的尾逗号

+ ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。
+ 此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。
```js
function clownsEverywhere(
  param1,
  param2
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar'
);
//上面代码中，如果在 param2 或 bar 后面加一个逗号，就会报错。
//如果像上面这样，将参数写成多行（即每个参数占据一行）
//以后修改代码的时候，想为函数 clownsEverywhere 添加第三个参数或者调整参数的次序
//就势必要在原来最后一个参数后面添加一个逗号。
//这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。
//这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
//这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
```

## Function.prototype.toString()

+ ES2019 对函数实例的 toString() 方法做出了修改。
+ toString() 方法返回函数代码本身，以前会省略注释和空格。
+ 修改后的 toString() 方法，明确要求返回一模一样的原始代码。

## catch 命令的参数省略

+ JavaScript 语言的 try...catch 结构
+ 以前明确要求 catch 命令后面必须跟参数，接受 try 代码块抛出的错误对象。
+ 很多时候，catch 代码块可能用不到这个参数。
+ 但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许 catch 语句省略参数。
```js
try {
  // ...
} catch {
  // ...
}
```


# Generator 函数的语法

+ Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

+ Generator 函数有多种理解角度。
+ 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

+ 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
+ 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

+ 形式上，Generator 函数是一个普通函数，但是有两个特征。
+ 一是，function 关键字与函数名之间有一个星号；``function* name(){}``
+ 二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
/**
 * 一个 Generator 函数 helloWorldGenerator，它内部有两个 yield 表达式（hello和world），
 * 即该函数有三个状态：hello，world 和 return 语句（结束执行）
*/
```
+ 然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
+ 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。

+ 下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。
+ 也就是说，每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。
+ 换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。
```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
+ 第一次调用，Generator 函数开始执行，直到遇到第一个 yield 表达式为止。
+ next 方法返回一个对象，它的 value 属性就是当前 yield 表达式的值 hello，done 属性的值 false，表示遍历还没有结束。

+ 第二次调用，Generator 函数从上次 yield 表达式停下的地方，一直执行到下一个 yield 表达式。
+ next 方法返回的对象的 value 属性就是当前 yield 表达式的值 world，done 属性的值 false，表示遍历还没有结束。

+ 第三次调用，Generator 函数从上次 yield 表达式停下的地方，一直执行到 return 语句（如果没有 return 语句，就执行到函数结束）。
+ next 方法返回的对象的 value 属性，就是紧跟在 return 语句后面的表达式的值（如果没有 return 语句，则 value 属性的值为 undefined），done 属性的值 true，表示遍历已经结束。

+ 第四次调用，此时 Generator 函数已经运行完毕，next 方法返回对象的 value 属性为 undefined，done 属性为 true。以后再调用 next 方法，返回的都是这个值。


+ 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
+ 以后，每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。
+ value 属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值；done 属性是一个布尔值，表示是否遍历结束。

+ ES6 没有规定，function 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```
+ 由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在 function 关键字后面.

## yield 表达式

+ 由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。
+ yield 表达式就是暂停标志。

+ 遍历器对象的 next 方法的运行逻辑如下。

1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
2. 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
3. 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。
4. 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

+ 需要注意的是，yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行，
+ 因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
```js
function* gen() {
  yield  123 + 456;
}
// yield 后面的表达式 123 + 456，不会立即求值，只会在 next 方法将指针移到这一句时，才会求值。
```

+ yield 表达式与 return 语句既有相似之处，也有区别.
+ 相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
+ 区别在于每次遇到 yield，函数暂停执行，下一次再从该位置继续向后执行，而 return 语句不具备位置记忆的功能。
+ 一个函数里面，只能执行一次（或者说一个）return 语句，但是可以执行多次（或者说多个）yield 表达式。
+ 正常函数只能返回一个值，因为只能执行一次 return；
+ Generator 函数可以返回一系列的值，因为可以有任意多个 yield。
+ 从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。

+ Generator 函数可以不用 yield 表达式，这时就变成了一个单纯的暂缓执行函数。
```js
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
/**
 * 函数 f 如果是普通函数，在为变量 generator 赋值时就会执行。
 * 但是，函数 f 是一个 Generator 函数，就变成只有调用 next 方法时，函数 f 才会执行。
*/
```

### 注意

+ 另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

+ yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。
+ yield 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK

  // 参数、或赋值的右边
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

## 与 Iterator 接口的关系

+ 任意一个对象的 Symbol.iterator 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

+ 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使得该对象具有 Iterator 接口。
```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
// Generator 函数赋值给 Symbol.iterator 属性，从而使得 myIterable 对象具有了 Iterator 接口，可以被 ... 运算符遍历了。
```

+ Generator 函数执行后，返回一个遍历器对象。该对象本身也具有 Symbol.iterator 属性，执行后返回自身。
```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true

/**
 * gen 是一个 Generator 函数，调用它会生成一个遍历器对象 g 。
 * 它的 Symbol.iterator 属性，也是一个遍历器对象生成函数，执行后返回它自己。
*/
```

## next 方法的参数

+ yield 表达式本身没有返回值，或者说总是返回 undefined。
+ next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
```js
// 定义了一个可以无限循环的 Generator 函数 f() 
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;// next 不传入参数，变量 reset 将一直都保持是 undefined
    if(reset) { i = -1; } // next 传入参数 true 将重置计数
  }
}
var g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

+ 这个功能有很重要的语法意义。
+ Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
+ 通过 next 方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。
+ 也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
```js
function* foo(x) {
  var y = 2 * (yield (x + 1)); // 传入 12 后 y 会被赋值成 24，
  var z = yield (y / 3);  // 传入 13 后 z 会被赋值为 13
  return (x + y + z);  // 因为传入值所以才不会返回 NAN
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```
+ 注意，由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。
+ V8 引擎直接忽略第一次使用 next 方法时的参数，只有从第二次使用 next 方法开始，参数才是有效的。
+ 从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。
```js
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}
let genObj = dataConsumer();
genObj.next();  // Started
genObj.next('a'); // 1. a
genObj.next('b'); // 2. b

// 如果想要第一次调用 next 方法时，就能够输入值，可以在 Generator 函数外面再包一层。
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!

// 上面代码中，Generator 函数如果不用 wrapper 先包一层，是无法第一次调用 next 方法，就输入参数的。
```

## for...of 循环

+ for...of 循环可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法。
```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
// 使用 for...of 循环，依次显示 5 个 yield 表达式的值。
for (let v of foo()) {
  console.log(v);
}// 1 2 3 4 5

// 这里需要注意，一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会中止，且不包含该返回对象，所以上面代码的 return 语句返回的 6，不包括在 for...of 循环之中。


// 利用 Generator 函数和 for...of 循环，实现斐波那契数列的例子。
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
// 使用 for...of 语句时不需要使用 next 方法。
for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

+ 利用 for...of 循环，可以写出遍历任意对象（object）的方法。
+ 原生的 JavaScript 对象没有遍历接口，无法使用 for...of 循环，通过 Generator 函数为它加上这个接口，就可以用了。
```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

/**
 * 对象 jane 原生不具备 Iterator 接口，无法用 for...of 遍历。
 * 这时，我们通过 Generator 函数 objectEntries 为它加上遍历器接口，就可以用 for...of 遍历了。
 * 加上遍历器接口的另一种写法是，将 Generator 函数加到对象的 Symbol.iterator 属性上面。
*/
// 通过赋值给对象原型，让所有对象都可以遍历
Object.prototype[Symbol.iterator] = objectEntries;

jane[Symbol.iterator] = objectEntries;
for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
```

+ 除了 for...of 循环以外，扩展运算符（...）、解构赋值和 Array.from 方法内部调用的，都是遍历器接口。
+ 这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
```js
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

## Generator.prototype.xxx
## 1. throw()

+ Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

/**
 * 遍历器对象 i 连续抛出两个错误。
 * 第一个错误被 Generator 函数体内的 catch 语句捕获。
 * i 第二次抛出错误，由于 Generator 函数内部的 catch 语句已经执行过了，不会再捕捉到这个错误了，
 * 所以这个错误就被抛出了 Generator 函数体，被函数体外的 catch 语句捕获。
*/
```

+ throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。
```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了！(…)
```
+ 注意，不要混淆遍历器对象的 throw 方法和全局的 throw 命令。
+ 如果 Generator 函数内部没有部署 try...catch 代码块，那么 throw 方法抛出的错误，将被外部 try...catch 代码块捕获。
+ 如果 Generator 函数内部和外部，都没有部署 try...catch 代码块，那么程序将报错，直接中断执行。
+ throw 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 next 方法。

+ next 方法一次都没有执行过。
+ 这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。
+ 这种行为其实很好理解，因为第一次执行 next 方法，等同于启动执行 Generator 函数的内部代码，
+ 否则 Generator 函数还没有开始执行，这时 throw 方法抛错只可能抛出在函数外部。

+ throw 方法被捕获以后，会附带执行下一条 yield 表达式。也就是说，会附带执行一次 next 方法。
+ 只要 Generator 函数内部部署了 try...catch 代码块，那么遍历器的 throw 方法抛出的错误，不影响下一次遍历。

+ Generator 函数体外抛出的错误，可以在函数体内捕获；
+ 反过来，Generator 函数体内抛出的错误，也可以被函数体外的 catch 捕获。

+ 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
+ 如果此后还调用 next 方法，将返回一个 value 属性等于 undefined、done 属性等于 true 的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

## 2. return()

+ Generator 函数返回的遍历器对象，还有一个 return() 方法，可以返回给定的值，并且终结遍历 Generator 函数。
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

/**
 * 遍历器对象 g 调用 return() 方法后，返回值的 value 属性就是 return() 方法的参数 foo。
 * 并且，Generator 函数的遍历就终止了，返回值的 done 属性为 true，
 * 以后再调用 next() 方法，done 属性总是返回 true。
*/
```
+ 如果 return() 方法调用时，不提供参数，则返回值的 value 属性为 undefined。

+ 如果 Generator 函数内部有 try...finally 代码块，且正在执行 try 代码块，
+ 那么 return() 方法会导致立刻进入 finally 代码块，执行完以后，整个函数才会结束。
```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

## next()、throw()、return() 的共同点

+ next()、throw()、return() 这三个方法本质上是同一件事，可以放在一起理解。
+ 它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

+ next(1) 是将 yield 表达式替换成一个值。
  + `` 相当于将 let result = yield x + y  替换成 let result = 1;``

+ throw(new Error('出错了')) 是将 yield 表达式替换成一个 throw 语句。
  + `` 相当于将 let result = yield x + y  替换成 let result = throw(new Error('出错了')); ``

+ return(2) 是将 yield 表达式替换成一个 return 语句。
  + `` 相当于将 let result = yield x + y   替换成 let result = return 2; ``

## yield* 表达式

+ 如果在 Generator 函数内部，调用另一个 Generator 函数。
+ 需要在前者的函数体内部，自己手动完成遍历。
```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y
```

+ 上面代码中，foo 和 bar 都是 Generator 函数，在 bar 里面调用 foo，就需要手动遍历 foo。
+ 如果有多个 Generator 函数嵌套，写起来就非常麻烦。

+ ES6 提供了 yield* 表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 例子
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner(); // 不用 yield* 会直接返回遍历器对象 ， 使用 yield* 才能顺利返回 'hello!'
  yield 'close';
}
```
+ 从语法角度看，如果 yield 表达式后面跟的是一个遍历器对象，需要在 yield 表达式后面加上星号，
+ 表明它返回的是一个遍历器对象。这被称为 yield* 表达式。

+ yield* 后面的 Generator 函数（没有 return 语句时），等同于在 Generator 函数内部，部署一个 for...of 循环。
+ 在有 return 语句时，则需要用 ``var value = yield* iterator`` 的形式获取 return 语句的值。

+ 如果 yield* 后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
```js
function* gen(){
  yield* ["a", "b", "c"];
}
gen().next() // { value:"a", done:false }
```
+ 任何数据结构只要有 Iterator 接口，就可以被 yield* 遍历。

+ 如果被代理的 Generator 函数有 return 语句，那么就可以向代理它的 Generator 函数返回数据。
```js
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}


// 例子
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]// 值为 [ 'a', 'b' ]
// The result
// 值为 [ 'a', 'b' ]
```

+ yield* 命令可以很方便地取出嵌套数组的所有成员。
```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a  // b  // c  // d  // e

// 由于扩展运算符 ... 默认调用 Iterator 接口，所以上面这个函数也可以用于嵌套数组的平铺。
[...iterTree(tree)] // ["a", "b", "c", "d", "e"]
```

+ 使用 yield* 语句遍历完全二叉树。
```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

## 作为对象属性的 Generator 函数

+ 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
// myGeneratorMethod 属性前面有一个星号，表示这个属性是一个 Generator 函数。
// 它的完整形式如下，与上面的写法是等价的。
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

## Generator 函数的 this

+ Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，
+ 也继承了 Generator 函数的 prototype 对象上的方法。
```js
function* g() {}
g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'

// 如果把 g 当作普通的构造函数，并不会生效，因为 g 返回的总是遍历器对象，而不是 this 对象。
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```
+ Generator 函数也不能跟 new 命令一起用，会报错。

+ 那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用 next 方法，又可以获得正常的 this？
+ 下面是一个变通方法。
+ 首先，生成一个空对象，使用 call 方法绑定 Generator 函数内部的 this。
+ 这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj); // 使 F 的内部对象 this 绑定 obj

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

+ 执行的是遍历器对象 f，但是生成的对象实例是 obj，有没有办法将这两个对象统一呢？
+ 一个办法就是将 obj 换成 F.prototype。
```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3

// 再将 F 改成构造函数，就可以对它执行 new 命令了。
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}
var f = new F();
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3
```

## 含义

### Generator 与状态机 

+ Generator 是实现状态机的最佳结构。比如，下面的 clock 函数就是一个状态机。
```js
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tack!');
  ticking = !ticking;
}
// clock 函数一共有两种状态（ Tick 和 Tack ），每运行一次，就改变一次状态。

// 这个函数如果用 Generator 实现，就是下面这样。
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tack!');
    yield;
  }
};
```
+ Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

### Generator 与协程

+ 协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。
+ 协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

1. 协程与子例程的差异
+ 传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。
+ 协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，
+ 其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。
+ 也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），
+ 等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

+ 从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，
+ 也就是说，协程是以多占用内存为代价，实现多任务的并行。


2. 协程与普通线程的差异
+ 不难看出，协程适合用于多任务运行的环境。
+ 在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。
+ 它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。
+ 此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

+ 由于 JavaScript 是单线程语言，只能保持一个调用栈。
+ 引入协程以后，每个任务可以保持自己的调用栈。
+ 这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。
+ 不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

+ Generator 函数是 ES6 对协程的实现，但属于不完全实现。
+ Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，
+ 才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

+ 如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，
+ 它们之间使用 yield 表达式交换控制权。

### Generator 与上下文

+ JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。
+ 然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，
+ 变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

+ 这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

+ Generator 函数不是这样，它执行产生的上下文环境，一旦遇到 yield 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。
+ 等到对它执行 next 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
```js
function* gen() {
  yield 1;
  return 2;
}

let g = gen();

console.log(
  g.next().value,
  g.next().value,
);
```
+ 第一次执行 g.next() 时，Generator 函数 gen 的上下文会加入堆栈，即开始运行 gen 内部的代码。
+ 等遇到 yield 1 时，gen 上下文退出堆栈，内部状态冻结。
+ 第二次执行 g.next() 时，gen 上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

## 应用

+ Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。

### 异步操作的同步化表达

+ Generator 函数的暂停执行的效果，意味着可以把异步操作写在 yield 表达式里面，等到调用 next 方法时再往后执行。
+ 这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 yield 表达式下面，反正要等到调用 next 方法时再执行。
+ 所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()

/**
 * 第一次调用 loadUI 函数时，该函数不会执行，仅返回一个遍历器。
 * 下一次对该遍历器调用 next 方法，则会显示 Loading 界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）
 * 等到数据加载完成，再一次使用 next 方法，则会隐藏 Loading 界面。
*/
```
+ 可以看到，这种写法的好处是所有 Loading 界面的逻辑，都被封装在一个函数，按部就班非常清晰。

+ Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。
```js
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();
/**
 * 上面代码的 main 函数，就是通过 Ajax 操作获取数据。
 * 可以看到，除了多了一个 yield，它几乎与同步操作的写法完全一样。
 * 注意，makeAjaxCall 函数中的 next 方法，必须加上 response 参数，
 * 因为 yield 表达式，本身是没有值的，总是等于 undefined 。
*/
```
+ 通过 Generator 函数逐行读取文本文件。
```js
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
// 上面代码打开文本文件，使用yield表达式可以手动逐行读取文件。
```

### 控制流管理

+ 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});

// 采用 Promise 改写上面的代码。
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();

// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。
// Generator 函数可以进一步改善代码运行流程。
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
// 然后，使用一个函数，按次序自动执行所有步骤。
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
// 上面这种做法，只适合同步操作，即所有的 task 都必须是同步的，不能有异步操作。
// 因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。
```

+ 利用 for...of 循环会自动依次执行 yield 命令的特性，提供一种更一般的控制流管理的方法。
```js
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}
// 数组 steps 封装了一个任务的多个步骤，Generator 函数 iterateSteps 则是依次为这些步骤加上 yield 命令。

// 将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务
let jobs = [job1, job2, job3];

function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}
// 数组 jobs 封装了一个项目的多个任务，Generator 函数 iterateJobs 则是依次为这些任务加上 yield* 命令。

// 最后，就可以用 for...of 循环一次性依次执行所有任务的所有步骤。
for (var step of iterateJobs(jobs)){
  console.log(step.id);
}

// 上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。

// for...of 的本质是一个 while 循环，所以上面的代码实质上执行的是下面的逻辑。
var it = iterateJobs(jobs);
var res = it.next();

while (!res.done){
  var result = res.value;
  // ...
  res = it.next();
}
```

### 部署 Iterator 接口

+ 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

+ 下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。
```js
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
```

### 作为数据结构

+ Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
```js
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
// 上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```
+ 实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。
```js
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
```

# Generator 函数的异步应用

## 传统的异步编程方法

+ ES6 诞生以前，异步编程的方法，大概有下面四种。
  + 回调函数
  + 事件监听
  + 发布/订阅
  + Promise 对象

+ Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。

## 基本概念

### 异步

+ 所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。
+ 比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。
+ 然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。
+ 这种不连续的执行，就叫做异步。
+ 相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着。

### 回调函数 和 Promise

+ Promise 就是为了防止回调函数的多种嵌套，导致代码无法管理，形成强耦合。

+ JavaScript 语言对异步编程的实现，就是回调函数。
+ 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。
+ 回调函数的英语名字 callback，直译过来就是"重新调用"。

+ 读取文件进行处理，是这样写的。
```js
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
// readFile 函数的第三个参数，就是回调函数，也就是任务的第二段。
// 等到操作系统返回了 /etc/passwd 这个文件以后，回调函数才会执行。
```
+ 一个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，必须是错误对象 err（如果没有错误，该参数就是 null）？
+ 原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。
+ 在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。

## Generator 函数

+ 让 Promise 的多重 then 方法调用更加合理清晰

### 协程

+ 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
+ 其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

+ 协程有点像函数，又有点像线程。它的运行流程大致如下。
  + 第一步，协程 A 开始执行。
  + 第二步，协程 A 执行到一半，进入暂停，执行权转移到协程 B。
  + 第三步，（一段时间后）协程 B 交还执行权。
  + 第四步，协程 A 恢复执行。
+ 上面流程的协程 A，就是异步任务，因为它分成两段（或多段）执行。

+ 举例来说，读取文件的协程写法如下。
```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
/**
 * 函数 asyncJob 是一个协程，它的奥妙就在其中的 yield 命令。
 * 它表示执行到此处，执行权将交给其他协程。
 * 也就是说，yield 命令是异步两个阶段的分界线。
*/
```
+ 协程遇到 yield 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
+ 它的最大优点，就是代码的写法非常像同步操作，如果去除 yield 命令，简直一模一样。

### 协程的 Generator 函数实现

+ Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

+ 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
+ 异步操作需要暂停的地方，都用 yield 语句注明。Generator 函数的执行方法如下。
```js
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```
+ 上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）g 。
+ 这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。
+ 调用指针 g 的 next 方法，会移动内部指针（即执行异步任务的第一段），
+ 指向第一个遇到的 yield 语句，上例是执行到 x + 2 为止。

+ 换言之，next 方法的作用是分阶段执行 Generator 函数。
+ 每次调用 next 方法，会返回一个对象，表示当前阶段的信息（value 属性和 done 属性）。
+ value 属性是 yield 语句后面表达式的值，表示当前阶段的值；
+ done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

### Generator 函数的数据交换和错误处理

+ Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
+ 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

+ next 返回值的 value 属性，是 Generator 函数向外输出数据；
+ next 方法还可以接受参数，向 Generator 函数体内输入数据。
```js
function* gen(x){ // 因为赋值运算是先运算等号右边的，所以在还没有复制的时候就函数的运行就被暂停了
  var y = yield x + 2; // 这里第二个 next 不传入值的话 y 就得不到值，因为 yield 本身并没有值
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

+ Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
```js
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了

/**
 * Generator 函数体外，使用指针对象的 throw 方法抛出的错误，可以被函数体内的 try...catch 代码块捕获。
 * 这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。
*/
```

### 异步任务的封装

+ 使用 Generator 函数，执行一个真实的异步任务。
```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
/**
 * Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。
 * 就像前面说过的，这段代码非常像同步操作，除了加上了 yield 命令。
 * 执行这段代码的方法如下。
*/
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
+ 首先执行 Generator 函数，获取遍历器对象，然后使用 next 方法（第二行），执行异步任务的第一阶段。
+ 由于 Fetch 模块返回的是一个 Promise 对象，因此要用 then 方法调用下一个 next 方法。
+ 可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

## Thunk 函数

+ Thunk 函数是自动执行 Generator 函数的一种方法。

### 参数的求值策略

+ 函数的参数到底应该何时求值。
```js
var x = 1;

function f(m) {
  return m * 2;
}

f(x + 5)
// 上面代码先定义函数 f，然后向它传入表达式 x + 5。请问，这个表达式应该何时求值？
```
+ 一种意见是"传值调用"（call by value），即在进入函数体之前，就计算 x + 5 的值（等于 6 ），再将这个值传入函数 f。
+ C 语言就采用这种策略。  ` f(x + 5) // 传值调用时，等同于 f(6) `

+ 一种意见是“传名调用”（call by name），即直接将表达式 x + 5 传入函数体，只在用到它的时候求值。
+ Haskell 语言采用这种策略。` f(x + 5) // 传名调用时，等同于 (x + 5) * 2`

+ 两种方法各有利弊
+ 传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

### Thunk 函数的含义

+ 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
+ 这个临时函数就叫做 Thunk 函数。
```js
function f(m) {
  return m * 2;
}
f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
}
```
+ 函数 f 的参数 x + 5 被一个函数替换了。凡是用到原参数的地方，对 Thunk 函数求值即可。
+ 这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。

### JavaScript 语言的 Thunk 函数

+ JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
+ 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
```js
// 正常版本的 readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk 版本的 readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);

/**
 * fs 模块的 readFile 方法是一个多参数函数，两个参数分别为文件名和回调函数。
 * 经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。
*/
```
+ 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。
```js
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

// 使用上面的转换器，生成 fs.readFile 的 Thunk 函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

// 完整的例子。
function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);

ft(1)(console.log) // 1
```

### Thunkify 模块

+ 生产环境的转换器，建议使用 Thunkify 模块。
+ 首先是安装。 ` $ npm install thunkify `
+ 使用方式如下
```js
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
```
+ Thunkify 的源码与上一节那个简单的转换器非常像。
```js
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```
+ 它的源码主要多了一个检查机制，变量 called 确保回调函数只运行一次。
+ 这样的设计与下文的 Generator 函数相关。请看下面的例子。
```js
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
```
+ 由于 thunkify 只允许回调函数执行一次，所以只输出一行结果。

### Generator 函数的流程管理

+ 你可能会问， Thunk 函数有什么用？
+ 回答是以前确实没什么用，但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。

+ Generator 函数可以自动执行。
```js
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
// Generator 函数 gen 会自动执行完所有步骤。

/**
 * 但是，这不适合异步操作。
 * 如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。
 * 这时，Thunk 函数就能派上用处。
 * 以读取文件为例。下面的 Generator 函数封装了两个异步操作。
*/
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```
+ yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。
+ 这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。
+ 为了便于理解，我们先看如何手动执行上面这个 Generator 函数。
```js
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
```
+ 变量 g 是 Generator 函数的内部指针，表示目前执行到哪一步。
+ next 方法负责将指针移动到下一步，并返回该步的信息（ value 属性和 done 属性）。

+ 仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 next 方法的 value 属性。
+ 这使得我们可以用递归来自动完成这个过程。

### Thunk 函数的自动流程管理

+ Thunk 函数真正的威力，在于可以自动执行 Generator 函数。
+ 下面就是一个基于 Thunk 函数的 Generator 执行器。
```js
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

function* g() {
  // ...
}

run(g);
```
+ 上面代码的 run 函数，就是一个 Generator 函数的自动执行器。
+ 内部的 next 函数就是 Thunk 的回调函数。
+ next 函数先将指针移到 Generator 函数的下一步（ gen.next 方法），
+ 然后判断 Generator 函数是否结束（ result.done 属性），如果没结束，
+ 就将 next 函数再传入 Thunk 函数（ result.value 属性），否则就直接退出。

+ 有了这个执行器，执行 Generator 函数方便多了。
+ 不管内部有多少个异步操作，直接把 Generator 函数传入 run 函数即可。
+ 当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在 yield 命令后面的必须是 Thunk 函数。
```js
var g = function* (){
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);
```
+ 上面代码中，函数 g 封装了 n 个异步的读取文件操作，只要执行 run 函数，这些操作就会自动完成。
+ 这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

+ Thunk 函数并不是 Generator 函数自动执行的唯一方案。
+ 因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
+ 回调函数可以做到这一点，Promise 对象也可以做到这一点。

## co 模块

+ co 模块是著名程序员 TJ 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

```js
//  Generator 函数，用于依次读取两个文件。
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// co 模块可以让你不用编写 Generator 函数的执行器。
var co = require('co');
co(gen);
```
+ Generator 函数只要传入 co 函数，就会自动执行。
+ co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数。
```js
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

### co 模块的原理

+ 为什么 co 可以自动执行 Generator 函数？
+ Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
+ 两种方法可以做到这一点。
  + 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
  + Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

+ co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。
+ 使用 co 的前提条件是，Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。
+ 如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co 。

### 基于 Promise 对象的自动执行

+ 还是沿用上面的例子。首先，把 fs 模块的 readFile 方法包装成一个 Promise 对象。
```js
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 然后，手动执行上面的 Generator 函数。
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
// 手动执行其实就是用 then 方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
// 只要 Generator 函数还没执行到最后一步，next 函数就调用自身，以此实现自动执行
```

### co 模块的源码

+ co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。

+ 首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
```js
function co(gen) {
    var ctx = this;

    return new Promise(function(resolve, reject) {
        // co 先检查参数 gen 是否为 Generator 函数
        // 如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为 resolved。
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        // 接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
        onFulfilled();
        function onFulfilled(res) {
        var ret;
        try {
            ret = gen.next(res);
        } catch (e) {
            return reject(e);
        }
        next(ret);
        }
  });
}
// 最后，就是关键的 next 函数，它会反复调用自身。
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
/**
 * next 函数的内部代码，一共只有四行命令。
 * 第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。
 * 第二行，确保每一步的返回值，是 Promise 对象。
 * 第三行，使用 then 方法，为返回值加上回调函数，然后通过 onFulfilled 函数再次调用 next 函数。
 * 第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为 rejected，从而终止执行。
*/
```

### 处理并发的异步操作

+ co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。

+ 这时，要把并发的操作都放在数组或对象里面，跟在 yield 语句后面。
```js
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);

// 例子
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
// 允许并发三个 somethingAsync 异步操作，等到它们全部完成，才会进行下一步。
```

### 实例：处理 Stream

+ Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，就好像“数据流”一样。
+ 这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。
  + data  事件：下一块数据块已经准备好了。
  + end   事件：整个“数据流”处理完了。
  + error 事件：发生错误。

+ 使用 Promise.race() 函数，可以判断这三个事件之中哪一个最先发生，只有当 data 事件最先发生时，才进入下一个数据块的处理。
+ 从而，我们可以通过一个 while 循环，完成所有数据的读取。
```js
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_ms.txt');
let variableCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    variableCount += (res.toString().match(/variable/ig) || []).length;
  }
  console.log('count:', variableCount); // count: 1120
});
/**
 * 对于每个数据块都使用 stream.once 方法，在 data、end、error 三个事件上添加一次性回调函数。
 * 变量 res 只有在 data 事件发生时才有值，然后累加每个数据块之中 variable 这个词出现的次数。
*/
```
# async 函数

+ ES2017 标准引入了 async 函数，使得异步操作变得更加方便。是 Generator 函数的语法糖。

+ 一个 Generator 函数，依次读取两个文件。
```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 写成 async 函数
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
+ 一比较就会发现，async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，仅此而已。

+ async 函数对 Generator 函数的改进，体现在以下四点。
1. 内置执行器
   + Generator 函数的执行必须靠执行器，所以才有了 co 模块，而 async 函数自带执行器。
   + 也就是说，async 函数的执行，与普通函数一模一样，只要一行。
   + ` asyncReadFile(); `
   +  上面的代码调用了 asyncReadFile 函数，然后它就会自动执行，输出最后结果。
   +  这完全不像 Generator 函数，需要调用 next 方法，或者用 co 模块，才能真正执行，得到最后结果。

2. 更好的语义
   + async 和 await，比起星号和 yield，语义更清楚了。
   + async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

3. 更广的适用性
   + co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，
   + 可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

4. 返回值是 Promise
   + async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。
   + 你可以用 then 方法指定下一步的操作。

+ 进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。

## 笔记

+ async 函数的返回值就是一个 promise 对象
  + 返回 promise 对象的状态由返回值决定
+ await 右侧的表达式一般为 promise 对象,但也可以是其他的值或是表达式.
  + 如果表达式是 promise 对象, await 返回的是 promise 成功的值
  + 如果表达式是其他的值,直接将此值作为 await 的返回值
  + await 只能写在 async 函数中,其他位置没有这个关键字
  + 如果 await 的 promise 失败了就会抛出异常,需要通过 try...catch 进行捕获

```js
let fs = require('fs');

function mineReadFile(url) {
	return new Promise((r, j) => {
		fs.readFile(url, (err, data) => {
			if (err) j(data);
			r(data);
		})
	})
}
async function main(){
    try{
        let data1 = await mineReadFile('./1.tet');
        let data2 = await mineReadFile('./2.tet');
    }catch(e){
        console.log(e)
    }
}
```



## 基本用法

+ async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
+ 当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
```js
// 例子
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
// 函数前面的 async 关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个 Promise 对象。

// 例子
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms); // 等待定时器执行结束后才会继续执行
  console.log(value);
}

asyncPrint('hello world', 50);
// 上面代码指定 50 毫秒以后，输出 hello world。
```
+ 由于 async 函数返回的是 Promise 对象，可以作为 await 命令的参数。所以，上面的例子也可以写成下面的形式。
```js
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

+ async 函数有多种使用形式。
```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

## 语法

+ async 函数的语法规则总体上比较简单，难点是错误处理机制。

### 返回 Promise 对象

+ async 函数返回一个 Promise 对象。
+ async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
```js
async function f() {
  return 'hello world';
}
// 函数 f 内部 return 命令返回的值，会被 then 方法回调函数接收到。
f().then(v => console.log(v))
// "hello world"
```

+ async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。
+ 抛出的错误对象会被 catch 方法回调函数接收到。
```js
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了
```

### Promise 对象的状态变化

+ async 函数返回的 Promise 对象，必须等到内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误。
+ 也就是说，只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数。
```js
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
// 函数 getTitle 内部有三个操作：抓取网页、取出文本、匹配页面标题。
// 只有这三个操作全部完成，才会执行 then 方法里面的 console.log。
```

### await 命令

+ 正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。
+ 如果不是 Promise 对象，就直接返回对应的值。
```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
// await 命令的参数是数值 123，这时等同于 return 123。
```

+ 另一种情况是，await 命令后面是一个 thenable 对象（即定义了 then 方法的对象），那么 await 会将其等同于 Promise 对象。
```js
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
/**
 * await 命令后面是一个 Sleep 对象的实例。
 * 这个实例不是 Promise 对象，但是因为定义了 then 方法，await 会将其视为 Promise 处理。
*/
```

+ 这个例子还演示了如何实现休眠效果。
+ JavaScript 一直没有休眠的语法，但是借助 await 命令就可以让程序停顿指定的时间。下面给出了一个简化的 sleep 实现。
```js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
// await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。

async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
/**
 * await 语句前面没有 return，但是 reject 方法的参数依然传入了 catch 方法的回调函数。
 * 这里如果在 await 前面加上 return，效果是一样的。
*/
```
+ 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行。
+ 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
+ 这时可以将第一个 await 放在 try...catch 结构里面，这样不管这个异步操作是否成功，第二个 await 都会执行。
```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```
+ 另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误。
```js
Promise.reject('出错了').catch(e => console.log(e));
```

### 错误处理

+ 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject。
```js
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了
/**
 * async 函数 f 执行后，await 后面的 Promise 对象会抛出一个错误对象，
 * 导致 catch 方法的回调函数被调用，它的参数就是抛出的错误对象。
*/
```
+ 防止出错的方法，也是将其放在 try...catch 代码块之中。
+ 如果有多个 await 命令，可以统一放在 try...catch 结构中。
```js
// 例子使用 try...catch 结构，实现多次重复尝试。
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
// 如果 await 操作成功，就会使用 break 语句退出循环；如果失败，会被 catch 语句捕捉，然后进入下一轮循环。
```

### 使用注意点

+ await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
```

+ 多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
```js
let foo = await getFoo();
let bar = await getBar();
// 上面代码中，getFoo 和 getBar 是两个独立的异步操作（即互不依赖），被写成继发关系。
// 这样比较耗时，因为只有 getFoo 完成以后，才会执行 getBar，完全可以让它们同时触发。
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

+ await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
+ async 函数可以保留运行堆栈。
```js
const a = () => {
  b().then(() => c());
};
/**
 * 上面代码中，函数 a 内部运行了一个异步任务 b()。
 * 当 b() 运行的时候，函数 a() 不会中断，而是继续执行。
 * 等到 b() 运行结束，可能 a() 早就运行结束了，b() 所在的上下文环境已经消失了。
 * 如果 b() 或 c() 报错，错误堆栈将不包括 a()。
*/

const a = async () => {
  await b();
  c();
};
/**
 * b() 运行的时候，a() 是暂停执行，上下文环境都保存着。
 * 一旦 b() 或 c() 报错，错误堆栈将包括 a()。
*/
```

## async 函数的实现原理

+ async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
// 所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。
```

+ spawn 函数的实现，基本就是前文自动执行器的翻版。
```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## 与其他异步处理方法的比较

+ 通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。
+ 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。
+ 如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

+ Promise 的写法。
```js
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  let ret = null;

  // 新建一个空的Promise
  let p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}
/**
 * 虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（then、catch 等等），操作本身的语义反而不容易看出来。
*/
```

+ Generator 函数的写法。
```js
function chainAnimationsGenerator(elem, animations) {

  return spawn(function*() {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });

}
/**
 * 用户定义的操作全部都出现在 spawn 函数的内部。这个写法的问题在于，
 * 必须有一个任务运行器，自动执行 Generator 函数，上面代码的 spawn 函数就是自动执行器，
 * 它返回一个 Promise 对象，而且必须保证 yield 语句后面的表达式，必须返回一个 Promise。
*/
```

+ async 函数的写法。
```js
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
/**
 * 它将 Generator 写法中的自动执行器，改在语言层面提供，不暴露给用户，
 * 因此代码量最少。如果使用 Generator 写法，自动执行器需要用户自己提供。
*/
```

## 实例：按顺序完成异步操作

+ 依次远程读取一组 URL，然后按照读取的顺序输出结果。
+ Promise 的写法如下。
```js
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
/**
 * 使用 fetch 方法，同时远程读取一组 URL。
 * 每个 fetch 操作都返回一个 Promise 对象，放入 textPromises 数组。
 * 然后，reduce 方法依次处理每个 Promise 对象，然后使用 then，将所有 Promise 对象连起来，因此就可以依次输出结果。
*/
```

+ async 函数实现。
```js
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
/**
 * 所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，
 * 这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
*/
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
/**
 * 虽然 map 方法的参数是 async 函数，但它是并发执行的，因为只有 async 函数内部是继发执行，外部不受影响。
 * 后面的 for..of 循环内部使用了 await，因此实现了按顺序输出。
*/
```

## 顶层 await

+ 根据语法规格，await 命令只能出现在 async 函数内部，否则都会报错。
+ 目前，有一个语法提案，允许在模块的顶层独立使用await命令，使得在全局环境下使用不会出现错误。
+ 这个提案的目的，是借用 await 解决模块异步加载的问题。
+ 详细参考
+ https://wangdoc.com/es6/async.html#%E9%A1%B6%E5%B1%82-await

# 异步遍历器

+ https://wangdoc.com/es6/async-iterator.html