# 函数

## 继承

### 继承的第一种方式：原型链继承方式一

```js
    Person.prototype.say=function(){
        console.log("你好")
    }

    function Dog(){
    }
    var d1=new Dog();
    //为了让d1有一个叫的方法，
    //不行：d1.say=function(){}
    //正确：
    Dog.prototype.say=function(){
        console.log('汪汪汪');
    }
    //继承的第一种实现方式：原型链继承
```
+ 缺点：添加1、2个方法无所谓，但是如果方法很多会导致过多的代码冗余

### 继承的第二种方式：原型链继承方式二

```js
    Person.prototype={
        constructor:Person,
        say:function(){
            console.log("你好"); 
        },
        run:function(){
            console.log("正在进行百米冲刺");
        }
    }
//为什么要用上面这种方式
function Cat(name){
        this.name=name;
    }
    var tom=new Cat("汤姆");
    //目的：把say方法放在tom的原型对象中(Cat.prototype)
    Cat.prototype.say=function(){}
//问题：
    Cat.prototype.s1=function(){}
    Cat.prototype.s2=function(){}
    Cat.prototype.s3=function(){}
    //通过上面的方式，给tom的原型对象添加了好多方法，也就是让tom拥有了好多方法，但是代码产生了不少的冗余(重复)

    //-->为了减少这种重复，改良版：
    Cat.prototype = {
        a1:function(){},
        a2:function(){},
        a5:function(){}
    }
    console.log(tom.s1);    //可以访问
    console.log(tom.a1);    //undefined
	//原因：tom对象在创建的时候已经有了一个确定的原型对象，就是旧的Cat.prototype
	//由于Cat.prototype后面被重新赋值，但是tom对象的原型对象却没有改变，
	//所以tom对象并不能访问到新原型对象中的a1-a5方法

    //如何解决这个问题？
    //-->先改变原型、再创建对象	这样才能避免 先创建的实例对象 访问不了 新原型 的方法
    function Tiger(){
        }
    Tiger.prototype={
        constructor : Tiger,
        a:function(){
        },
        b:function(){
        }
    }
    //创建tiger实例，此时的tiger实例的原型对象是新原型，所以tiger可以访问到新原型中的属性和方法(a/b)
    var tiger=new Tiger();
    console.log(tiger.a);
    console.log(tiger.b);
```
+ 注意点：
+ a、一般情况下，应该先改变原型对象，再创建对象
+ b、一般情况下，对于新原型，会添加一个constructor属性，从而不破坏原有的原型对象的结构

### 继承的第三种方式：拷贝继承(混入继承：mixin)

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

### 函数的4种调用方式

+ this的指向以及函数的四种调用模式

+ 1、函数调用

```js
    var age=18;
    var p={
        age:15,
        say:function(){
            console.log(this.age);
        }
    }
    var s1=p.say();
    s1();       //函数调用
```

+ 2、方法调用

```js
    var age=18;
    var p={
        age:15,
        say:function(){
            console.log(this.age);
        }
    }
    p.say()//方法调用
```

+ 3、new调用(构造函数)

```js
    var age=18;
    var p={
        age:15,
        say:function(){
            console.log(this.age);
        }
    }
    new p.say()//构造函数调用
```

+ 4、上下文方式(call、apply、bind)

```js
    var length=21;
    function f1(){
        console.log(this.length);
    }
    f1.call([1,3,5])
    f1.apply(this)
    f1.call(5)
```

+ 在ES6的箭头函数之前的时代，想要判断一个函数内部的this指向谁，就是根据上面的四种方式来决定的

# ES6内容

+ 1、解构赋值   
+ 2、函数rest参数  
+ 3、箭头函数  
    - 箭头函数和普通函数有哪些不同？(4点)
+ 4、对象的Object.assign  
+ 5、promise 
+ 6、generator 
+ 7、async 
+ 8、class 
+ 9、module

### 原型

+ 原型很多人开发用不到？
    - 很多人都用es6/7/8开发，确实用的比较少
    - 如果你用es5之前的版本开发代码(IE8、IE7。。。)，可能天天都要写原型
    - 理解了原型，才是理解了JS面向对象的核心，没有理解原型，你就没有理解面向对象的核心
+ 类继承其实本质上还是用原型继承来(包装)的