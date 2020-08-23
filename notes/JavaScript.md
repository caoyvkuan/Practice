# JavaScript

+ javascript简称js , 是在1995年 , 由美国人布莱登艾奇用10天时间研发
+ js诞生的目的解决表单验证是否合法
+ js如今能做什么
  + 表单验证
  + 网页动态效果
  + 服务器端开发(nodejs)
  + 做游戏
  + 交互

## 浏览器端的JS

+ ECMAScript：基础语法(数据类型、运算符、函数。。。JS语法标准 )
+ BOM(浏览器对象模型)：window、location、history、navigator。。。
+ DOM(文档对象模型)：div、p、span。。。

+ `srcipt`标签属性

  + `src` ：指定外部脚本的URI， 如果设置了 `src` 特性，script 标签内容将会被忽略;

  + type : 指定引用脚本的语言，属性值为 MIME 类型

    + 包括`text/javascript`, `text/ecmascript`, `application/javascript`, 和`application/ecmascript`。如果没有定义这个属性，脚本会被视作JavaScript。
    + ES6 新增了属性值 `module` ，代码会被当做 JavaScript 模块

  + async

    + `async`规定一旦脚本可用，则会异步执行   async 属性仅适用于外部脚本

      + 表示应该立即下载脚本,但不应该妨碍页面的其他操作,比如下载其他资源或加载其他脚本

    + 都设置了这个属性不一定会按照顺序加载,   后面的可能比前面的先加载, 因此确保两者之间互不依赖非常重要

    + 如果不使用 `async` 且 `defer="defer"` ：脚本将在页面完成解析时执行

    + 如果既不使用 `async` 也不使用 `defer` ：在浏览器继续解析页面之前，立即读取并执行脚本；

    + ```html
      <script async="async"></script>
      ```

  + defer

    + 都设置了这个属性会按照顺序加载

    + 属性规定是否对脚本执行进行延迟，直到页面加载为止。

    + 如果您的脚本不会改变文档的内容，可将 defer 属性加入到 `<script>` 标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。
    
    + ```html
      <script defer="defer"></script>
      ```

+ `"use strict"`

  + 指令将浏览器引擎转换为“现代”模式，改变一些内建特性的行为

  + 通过在脚本文件/函数开头添加 `"use strict";` 声明，即可启用严格模式。全局/局部开启严格模式：

  + `"use strict"` 需要定义在脚本最顶部（函数内除外），否则严格模式可能无法启用。一旦进入了严格模式，就无法关闭严格模式。

  + 启用 `"use strict"` 后，为未定义元素赋值将抛出异常：

  + ```js
    "use strict";
    leo = 17; // Uncaught ReferenceError: leo is not defined
    ```

  + 启用 `"use strict"` 后，试图删除不可删除的属性时会抛出异常：

  + ```js
    "use strict";
    delete Object.prototype; // Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
    ```

## 变量和常量

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

### let 关键字 和 const 关键字

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
    2，函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，那么this会指向顶层对象，但是在严格模式下，this会返回undefined;
    ```

## 运算符

### 条件运算符：if 和 '?' 和 switch

+  **if 语句**

  + 当 if 语句当条件表达式，会将表达式转换为布尔值，当为 truthy 时执行里面代码。转换规则如：
  + 数字 `0`、空字符串 `""`、`null`、`undefined` 和 `NaN` 都会被转换成 `false`。因为他们被称为 “falsy” 值。
  + 其他值被转换为 `true`，所以它们被称为 “truthy”。

+ **三元运算符**

  + ```js
    //A为条件结果为ture/false   B:A为ture就执行B否则就执行C    
    //	A ？ B ：C (如果A为真执行B否则执行C)
    var A = 1;
    alert(A?B:C);
    alert(A==1?A:"第三");	//输出1
    ```

+ **`switch`** 语句至少包含一个 `case` 代码块和一个可选的 `default` 代码块：

  + ```js
    let a = 2;
    switch (a) {
      case 1: // (*) 下面这两个 case 被分在一组
      case 2:
        console.log('case is 1 or 2!');
        break;
      case 3:{/* 包裹在大括号里可以避免 多个case中的let处于一个作用域内重复声明报错	*/
        console.log('case is 3!');
        break;
      }
      default:
        console.log('The result is default.');
        break;
    }
    ```

+ 逻辑运算符

  + 逻辑与，AND（`&&`）  逻辑或，OR（`||`）  逻辑非，NOT（`!`）
  + `null`；     `NaN`；     `0`；
  + 空字符串（`""` or `''` or ````）；
  + `undefined`。尽管 `&&` 和 `||` 运算符能够使用非布尔值的操作数, 但它们依然可以被看作是布尔操作符，因为它们的返回值总是能够被转换为布尔值。
  + 如果要显式地将它们的返回值（或者表达式）转换为布尔值，请使用双重非运算符（即`!!`）或者Boolean构造函数。JavaScript 里有三个逻辑运算符：`||`（或），`&&`（与），`!`（非）。

+ 逻辑与（&&） 所有条件都为 true 才返回 true，否则为 false。

  + ```js
    a1 = true  && true      // t && t 返回 true
    a2 = true  && false     // t && f 返回 false
    a3 = false && true      // f && t 返回 false
    a4 = false && (3 == 4)  // f && f 返回 false
    a5 = "Cat" && "Dog"     // t && t 返回 "Dog"
    a6 = false && "Cat"     // f && t 返回 false
    a7 = "Cat" && false     // t && f 返回 false
    a8 = ''    && false     // f && f 返回 ""
    a9 = false && ''        // f && f 返回 false
    ```

+ 逻辑或（ || ） 所有条件有一个为 true 则返回 true，否则为 false。

  + ```js
    o1 = true  || true      // t || t 返回 true
    o2 = false || true      // f || t 返回 true
    o3 = true  || false     // t || f 返回 true
    o4 = false || (3 == 4)  // f || f 返回 false
    o5 = "Cat" || "Dog"     // t || t 返回 "Cat"
    o6 = false || "Cat"     // f || t 返回 "Cat"
    o7 = "Cat" || false     // t || f 返回 "Cat"
    o8 = ''    || false     // f || f 返回 false
    o9 = false || ''        // f || f 返回 ""
    ```

+ 逻辑非（ ! ）

  + ```js
    n1 = !true              // !t 返回 false
    n2 = !false             // !f 返回 true
    n3 = !''                // !f 返回 true
    n4 = !'Cat'             // !t 返回 false
    ```

+ 双重非运（ !! ）

  + ```js
    n1 = !!true                   // !!truthy 返回 true
    n2 = !!{}                     // !!truthy 返回 true: 任何 对象都是 truthy 的…
    n3 = !!(new Boolean(false))   // …甚至 .valueOf() 返回 false 的布尔值对象也是！
    n4 = !!false                  // !!falsy 返回 false
    n5 = !!""                     // !!falsy 返回 false
    n6 = !!Boolean(false)         // !!falsy 返回 false
    ```

+ ** 布尔值转换规则**

  + 将 && 转换为 ||

    + ```js
      condi1 && confi2
      // 转换为
      !(!condi1 || !condi2)
      ```

  + 将 || 转换为 &&

    + ```js
      condi1 || condi2
      // 转换为
      !(!condi1 && !condi2)
      ```

### **短路取值**

+ 与运算 `&&` 的优先级比或运算 `||` 要高。所以代码 `a && b || c && d` 完全跟 `&&` 表达式加了括号一样：`(a && b) || (c && d)`。

+ 由于逻辑表达式的运算顺序是从左到右，也可以用以下规则进行"短路"计算：

+ `(some falsy expression) && (_expr)_` 短路计算的结果为假。

+ `(some truthy expression) || _(expr)_` 短路计算的结果为真。短路意味着上述表达式中的expr部分**「不会被执行」**，因此expr的任何副作用都不会生效（举个例子，如果expr是一次函数调用，这次调用就不会发生）。造成这种现象的原因是，整个表达式的值在第一个操作数被计算后已经确定了。看一个例子：

+ ```js
  function A(){ console.log('called A'); return false; }
  function B(){ console.log('called B'); return true; }
  console.log( A() && B() );
  // logs "called A" due to the function call,
  // then logs false (which is the resulting value of the operator)
  console.log( B() || A() );
  // logs "called B" due to the function call,
  // then logs true (which is the resulting value of the operator)
  ```

### while 和 for

+ **while 循环**

  + **「while 语句」**可以在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为真时结束循环

  + ```js
    var n = 0;
    var x = 0;
    while (n < 3) {
      n++;
      x += n;
    }
    
    当循环体为单行时，可以不写大括号
    let i = 3;
    while(i) console.log(i --);
    
    /*	do...while 循环	*/
    var result = '';
    var i = 0;
    do {
       i += 1;
       result += i + ' ';
    } while (i < 5);
    ```

+ **可选的 for 表达式**

  + `for` 语句头部圆括号中的所有三个表达式都是可选的。

  + ```js
    var i = 0;
    for (; i < 3; i++) {
        console.log(i);
    }
    
    不指定表达式中条件块，这就必须要求在循环体中结束循环，否则会出现死循环
    for (var i = 0;; i++) {
       console.log(i);
       if (i > 3) break;
    }
    
    不指定所有表达式，也需要在循环体中指定结束循环的条件
    
    var i = 0;
    for (;;) {
      if (i > 3) break;
      console.log(i);
      i++;
    }
    ```

### break语句 和 **continue 语句**

+ break 语句中止当前循环，`switch`语句或`label` 语句，并把程序控制流转到紧接着被中止语句后面的语句。在 while 语句中：

  ```js
  function testBreak(x) {
    var i = 0;
    while (i < 6) {
      if (i == 3) {
        break;
      }
      i += 1;
    }
    return i * x;
  }
  
  
  另外，也可以为代码块做标记，并在 break 中指定要跳过的代码块语句的 label：
  
  outer_block:{
    inner_block:{
      console.log ('1');
      break outer_block;      // breaks out of both inner_block and outer_block
      console.log (':-(');    // skipped
    }
    console.log ('2');        // skipped
  }
  
  需要注意的是：break 语句需要内嵌在它所应用的标签或代码块中，否则报错：
  
  block_1:{
    console.log ('1');
    break block_2;            // SyntaxError: label not found
  }
  block_2:{
    console.log ('2');
  }
  ```

+ continue 声明终止当前循环或标记循环的当前迭代中的语句执行，并在下一次迭代时继续执行循环。与 `break` 语句的区别在于， continue 并不会终止循环的迭代，而是：

  + 在 `while` 循环中，控制流跳转回条件判断；
  + 在 `for` 循环中，控制流跳转到更新语句。注意：continue 也必须在对应循环内部，否则报错。

+ **(i > 5) ? console.log(i) : continue;      // continue 不允许在这个位置**

### 常见运算符

+ 常见运算符如加法 `+` 、减法 `-` 、乘法 `*` 和除法 `/` 

+ ```js
  let sum = 1 + 2;
  let age = +18;
  加法运算 1 + 2 中， 1 和 2 为 2 个运算元，左运算元 1 和右运算元 2 ，即「运算元就是运算符作用的对象。」
  1 + 2 运算式中包含 2 个运算元，因此也称该运算式中的加号  + 为 「二元运算符。」
  在 +18 中的加号 + 对应只有一个运算元，则它是 「一元运算符」 。
  ```

+ **+ 号运算符**

+ ```js
  let msg = "hello " + "leo"; // "hello leo"
  let total = 10 + 20;  // 30
  let text1 = "1" + "2"; // "12"
  let text2 = "1" + 2;   // "12"
  let text3 = 1 + "2";   // "12"
  let text4 = 1 + 2 + "3";  // "33"
  let num = +text1; //  12 转换为 Number 类型
  ```

+ **运算符优先级**

+ 运算符的优先级决定了表达式中运算执行的先后顺序，优先级高的运算符最先被执行。下面的表将所有运算符按照优先级的不同从高（20）到低（1）排列。

+ ```js
  3 > 2 && 2 > 1
  // return true
  3 > 2 > 1
  // 返回 false，因为 3 > 2 是 true，并且 true > 1 is false
  // 加括号可以更清楚：(3 > 2) > 1
  ```

  

+ | 优先级   | 运算类型                    | 关联性        | 运算符           |
  | :------- | :-------------------------- | :------------ | :--------------- |
  | 20       | `圆括号`                    | n/a（不相关） | `( … )`          |
  | 19       | `成员访问`                  | 从左到右      | `… . …`          |
  |          | `需计算的成员访问`          | 从左到右      | `… [ … ]`        |
  |          | `new` (带参数列表)          | n/a           | `new … ( … )`    |
  |          | 函数调用                    | 从左到右      | `… ( … )`        |
  |          | 可选链（Optional chaining） | 从左到右      | `?.`             |
  | 18       | new (无参数列表)            | 从右到左      | `new …`          |
  | 17       | 后置递增(运算符在后)        | n/a           |                  |
  | `… ++`   |                             |               |                  |
  |          | 后置递减(运算符在后)        |               | `… --`           |
  | 16       | 逻辑非                      | 从右到左      | `! …`            |
  |          | 按位非                      |               | `~ …`            |
  |          | 一元加法                    |               | `+ …`            |
  |          | 一元减法                    |               | `- …`            |
  |          | 前置递增                    |               | `++ …`           |
  |          | 前置递减                    |               | `-- …`           |
  |          | typeof                      |               | `typeof …`       |
  |          | void                        |               | `void …`         |
  |          | delete                      |               | `delete …`       |
  |          | await                       |               | `await …`        |
  | 15       | 幂                          | 从右到左      | `… ** …`         |
  | 14       | 乘法                        | 从左到右      |                  |
  | `… * …`  |                             |               |                  |
  |          | 除法                        |               | `… / …`          |
  |          | 取模                        |               | `… % …`          |
  | 13       | 加法                        | 从左到右      |                  |
  | `… + …`  |                             |               |                  |
  |          | 减法                        |               | `… - …`          |
  | 12       | 按位左移                    | 从左到右      | `… << …`         |
  |          | 按位右移                    |               | `… >> …`         |
  |          | 无符号右移                  |               | `… >>> …`        |
  | 11       | 小于                        | 从左到右      | `… < …`          |
  |          | 小于等于                    |               | `… <= …`         |
  |          | 大于                        |               | `… > …`          |
  |          | 大于等于                    |               | `… >= …`         |
  |          | in                          |               | `… in …`         |
  |          | instanceof                  |               | `… instanceof …` |
  | 10       | 等号                        | 从左到右      |                  |
  | `… == …` |                             |               |                  |
  |          | 非等号                      |               | `… != …`         |
  |          | 全等号                      |               | `… === …`        |
  |          | 非全等号                    |               | `… !== …`        |
  | 9        | 按位与                      | 从左到右      | `… & …`          |
  | 8        | 按位异或                    | 从左到右      | `… ^ …`          |
  | 7        | 按位或                      | 从左到右      | `… | …`          |
  | 6        | 逻辑与                      | 从左到右      | `… && …`         |
  | 5        | 逻辑或                      | 从左到右      | `… || …`         |
  | 4        | 条件运算符                  | 从右到左      | `… ? … : …`      |
  | 3        | 赋值                        | 从右到左      | `… = …`          |
  |          |                             |               | `… += …`         |
  |          |                             |               | `… -= …`         |
  |          |                             |               | `… *= …`         |
  |          |                             |               | `… /= …`         |
  |          |                             |               | `… %= …`         |
  |          |                             |               | `… <<= …`        |
  |          |                             |               | `… >>= …`        |
  |          |                             |               | `… >>>= …`       |
  |          |                             |               | `… &= …`         |
  |          |                             |               | `… ^= …`         |
  |          |                             |               | `… |= …`         |
  | 2        | yield                       | 从右到左      | `yield …`        |
  |          | yield*                      |               | `yield* …`       |
  | 1        | 展开运算符                  | n/a           | `...` …          |
  | 0        | 逗号                        | 从左到右      | `… , …`          |

## 值的比较

+ **常见比较**

+ 大于/小于/大于等于/小于等于：`a>b` / `a<b` / `a>=b` / `a<=b` ；

+ 判断相等：

  ```js
  // 使用 ==，非严格等于，不关心值类型
  // == 运算符会对比较的操作数做隐式类型转换，再比较
  '1' == 1; // true
  // 使用 ===，严格相等，关心值类型
  // 将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。
  '1' === 1; // false
  ```

+ ![640](./images/640.webp)

### **相等性判断（Object.is()）**

+ ES6 新增 Object.is 方法判断两个值是否相同，语法如下:

  + ```js
    Object.is(value1, value2);
    ```

  以下任意项成立则两个值相同：

  - 两个值都是 `undefined`

  - 两个值都是 `null`

  - 两个值都是 `true` 或者都是 `false`

  - 两个值是由相同个数的字符按照相同的顺序组成的字符串

  - 两个值指向同一个对象

  - 两个值都是数字并且

  - - 都是正零 `+0`
    - 都是负零 `-0`
    - 都是 `NaN`
    - 都是除零和 `NaN` 外的其它同一个数字 使用示例：

  ```js
  Object.is('foo', 'foo');     // true
  Object.is(window, window);   // true
  Object.is('foo', 'bar');     // false
  Object.is([], []);           // false
  var foo = { a: 1 };
  var bar = { a: 1 };
  Object.is(foo, foo);         // true
  Object.is(foo, bar);         // false
  Object.is(null, null);       // true
  // 特例
  Object.is(0, -0);            // false
  Object.is(0, +0);            // true
  Object.is(-0, -0);           // true
  Object.is(NaN, 0/0);         // true
  ```

+ 兼容性 Polyfill 处理：

+ ```js
  if (!Object.is) {
    Object.is = function(x, y) {
      // SameValue algorithm
      if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    };
  }
  ```

### **null 与 undefined 比较**

+ 对于相等性判断比较简单：

+ ```js
  null == undefined;  // true
  null === undefined; // false
  ```

+ 对于其他比较，它们会先转换位数字：`null` 转换为 `0` ， `undefied` 转换为 `NaN` 。

+ ```js
  null > 0;  // false 1
  null >= 0; // true  2
  null == 0; // false 3
  null < 1;  // true  4
  ```

+ 需要注意：`null == 0; // false` 这里是因为：`undefined` 和 `null` 在相等性检查 `==` 中**「不会进行任何的类型转换」**，它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值。

+ ```js
  undefined > 0;  // false  1
  undefined > 1;  // false  2
  undefined == 0; // false  3
  
  第 1、2 行都返回 false 是因为 undefined 在比较中被转换为了 NaN，而 NaN 是一个特殊的数值型值，它与任何值进行比较都会返回 false。第 3 行返回 false 是因为这是一个相等性检查，而 undefined 只与 null 相等，不会与其他值相等。
  ```

## 数据类型

+ JavaScript 是一种**「弱类型」**或者说**「动态语言」**。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

+ `typeof` 判断对象的数据类型 

+ 八大数据类型 

  + `number` 用于任何类型的数字：整数或浮点数，在 ±2 范围内的整数。
  + `bigint` 用于任意长度的整数。
  + `string` 用于字符串：一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
  + `boolean` 用于 `true` 和 `false`。
  + `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
  + `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
  + `symbol` 用于唯一的标识符。
  + `object` 用于更复杂的数据结构.

+ 通过 `typeof` 运算符**检测数据类型**

  + 两种形式：`typeof x` 或者 `typeof(x)`。		以字符串的形式返回类型名称，例如 `"string"`。

  + `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。

  + ```js
    typeof "leo" // "string"
    typeof undefined    // "undefined"
    typeof 0     // "number"
    typeof NaN   // "number"
    typeof 10n   // "bigint"
    typeof true  // "boolean"
    typeof Symbol("id") // "symbol"
    typeof [1,2,3,4]    // "object"
    typeof Math  // "object"  (1) Math 是一个提供数学运算的内建 object。
    typeof null  // "object"  (2) JavaScript 语言的一个错误，null 不是一个 object。null 有自己的类型，它是一个特殊值。
    typeof alert // "function"  (3) alert 在 JavaScript 语言中是一个函数。
    ```

+ JavaScript 变量可以转换为新变量或其他数据类型：

  + **字符串转换**

    + 通过全局方法 `String()` 将 **「其他类型数据（任何类型的数字，字母，布尔值，对象）」** 转换为 String 类型：

    + ```js
      String(123);   // "123"
      // Number方法toString()/toExponential()/toFixed()/toPrecision() 也有同样效果。
      String(false); // "false"
      // Boolean方法 toString() 也有同样效果。
      String(new Date()); // "Sun Jun 07 2020 21:44:20 GMT+0800 (中国标准时间)"
      // Date方法 toString() 也有同样效果。
      String(leo);
      ```

  + **数值转换**

    + 一元运算符 `+`		`const age = +"22"; // 22`

    + `Number` 方法

    + ```js
      const age = Number("22"); // 22
      Number.parseFloat("22");  // 22
      Number.parseInt("22");  // 22
      ```

    + 其他方式转 Number 类型

    + ```js
      
      // 布尔值
      Number(false)     // 返回 0
      Number(true)      // 返回 1
      // 日期
      const date = new Date();
      Number(date);     // 返回 1591537858154
      date.getTime();   // 返回 1591537858154，效果一致。
      // 自动转换
      5 + null    // 返回 5         null 转换为 0
      "5" + null  // 返回"5null"   null 转换为 "null"
      "5" + 1     // 返回 "51"      1 转换为 "1" 
      "5" - 1     // 返回 4         "5" 转换为 5
      ```

  + **布尔值转换**

    + 直观上为“空”的值（如 `0`、空字符串、`null`、`undefined` 和 `NaN`）将变为 `false`。

    + 其他值变成 `true`。

    + ```js
      Boolean(1); // true
      Boolean(0); // false
      Boolean("hello"); // true
      Boolean(""); // false
      Boolean("0"); // true
      Boolean(" "); // 空白, 也是 true (任何非空字符串是 true)
      ```

  + ![640](./images/640.png)

+ 基本数据类型——值类型：(数字、字符串、布尔值、null、undefined) NaN  (`不是一个数字`) 

  + undefined类型		(变量或对象以声明但 	未被赋值 | 初始化	)

  + ```javascript
    //a变量没有声明过——>如果获取变量的值，是会产生语法错误的
    //console.log(a);//undefined：错误
    
    //1、一个变量声明了，但是没有赋值，值默认为undefined
    var b;
    console.log(b);//b就是一个undefined类型的值 
    
    //2、一个变量声明了，并且赋值了一个undefined的值
    var c=undefined;
    console.log(c);//c也是一个undefined类型的值
    
    //3、一个对象中，获取某个不存在的属性，值也是undefined
    var d={};
    console.log(d.age);//由于d对象没有age属性，值：undefined
    ```

+ 复杂数据类型——引用类型：(对象)

  + 数组
  + 函数
  + 正则表达式
  + Date

## BOM

### window对象

+  alert / prompt / confirm

  + **alert**

    + 显示一个警告对话框，上面显示有指定的文本内容以及一个“确定”按钮**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**

    + ```js
      // 语法
      window.alert(message);
      alert(message);
      // 示例
      alert('hello leo!');
      ```

  + **prompt**

    + 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**当点击确定返回文本，点击取消或按下 Esc 键返回 `null`。语法如下：

    + ```css
      let result = window.prompt(text, value);
      ```

    + `result` 用来存储用户输入文字的字符串，或者是 null。

    + `text` 用来提示用户输入文字的字符串，如果没有任何提示内容，该参数可以省略不写。

    + `value` 文本输入框中的默认值，该参数也可以省略不写。不过在 Internet Explorer 7 和 8 中，省略该参数会导致输入框中显示默认值"undefined"。

  + **confirm**

    + `Window.confirm()` 方法显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框。**「注意：弹出模态框，并暂停脚本，直到用户点击“确定”按钮。」**语法如下：

    + ```js
      let result = window.confirm(message);
      ```

    + message 是要在对话框中显示的可选字符串。

    + result 是一个布尔值，表示是选择确定还是取消 (true表示OK)。

## 函数

+ **函数定义**

  + ```js
    function getUser(name){
     return 'hello ' + name;
    }
    getUser('leo"); // 函数调用
    ```

+ 函数表达式

  + ```js
    let getUser = function(name){
     return 'hello ' + name;
    }
    函数表达式也可以提供函数名，并用于函数内部指代函数本身：
    let fun = function f(n){
        return n < 3 ? 1 : n * f(n - 1);
    }
    fun(3);  // 3
    fun(5);  // 60
    
    「只要注意：」使用 「函数表达式」 定义函数时，调用函数的方法必须写在定义之后，否则报错：
    console.log(fun());  // Uncaught ReferenceError: fun is not defined
    let fun = function(){return 1};
    
    而使用 「函数声明」 则不会出现该问题:
    因为函数声明会发生  函数提升		而let关键字不会提升 且 赋值形式的函数声明也不会提升
    console.log(fun());  // 1
    function fun(){return 1};
    ```

### 函数参数

+ 默认参数

  + 若函数没有传入参数，则参数默认值为`undefined`，通常设置参数默认值是这样做的：

  + ```js
    // ES6 之前，没有设置默认值
    function f(a, b){
        b = b ? b : 1;
        return a * b;
    }
    f(2,3);  // 6
    f(2);    // 2
    // ES6，设置默认值
    function f(a, b = 1){
        return a * b;
    }
    f(2,3);  // 6
    f(2);    // 2
    ```

+ 剩余参数

  + 可以将参数中不确定数量的参数表示成数组，如下：

  + ```js
    function f (a, ...b){
        console.log(a, b);
    }
    f(1,2,3,4); // a => 1 b => [2, 3, 4]
    
    ```

+ arguments 对象

  + 函数的实际参数会被保存在一个**「类似数组的arguments对象」**中。在函数内，我们可以使用 arguments 对象获取函数的所有参数：

  + ```js
    let fun = function(){
        console.log(arguments);
        console.log(arguments.length);
    }
    fun('leo'); 
    // Arguments ["leo", callee: ƒ, Symbol(Symbol.iterator): ƒ] 
    // 1
    
    以一个实际示例介绍，实现将任意数量参数连接成一个字符串，并输出的函数：
    
    let argumentConcat = function(separator){
     let result = '', i;
      for(i = 1; i < arguments.length; i ++){
       result += arguments[i] + separator;
      }
      return result;
    }
    argumentConcat(',', 'leo', 'pingan'); //"leo,pingan,"
    ```

+  **函数返回值**

  + 在函数任意位置，指定 `return` 指令来停止函数的执行，并返回函数指定的返回值。

  + ```js
    let sum = function(a, b){
     return a + b;
    };
    let res = sum(1, 2);
    console.log(res); // 3
    默认空值的 return 或没有 return 的函数返回值为 undefined 。
    ```

+ 函数表达式

  + 函数表达式是一种函数定义方式，在前面章节中已经介绍到了，这个部分将着重介绍 **「函数表达式」** 和 **「函数声明」** 的区别：

  + 语法差异

    + ```js
      // 函数表达式
      let fun = function(){};
      // 函数声明
      function fun(){}
      ```

  + **创建时机差异**

    + ```js
      // 函数表达式
      fun();  // Uncaught ReferenceError: fun is not defined
      let fun = function(){console.log('leo')};
      // 函数声明
      fun();  // "leo"
      function fun(){console.log('leo')};
      ```

  + **使用建议**

    + 建议优先考虑函数声明语法，它能够为组织代码提供更多灵活性，因为我们可以在声明函数前调用该函数。

### 箭头函数

+ **「函数箭头表达式」**是ES6新增的函数表达式的语法，也叫**「胖箭头函数」**，变化：更简洁的函数和`this`

+ ```js
  // 有1个参数
  let f = v => v;
  // 等同于
  let f = function (v){return v};
  // 有多个参数
  let f = (v, i) => {return v + i};
  // 等同于
  let f = function (v, i){return v + i};
  // 没参数
  let f = () => 1;
  // 等同于
  let f = function (){return 1};
  let arr = [1,2,3,4];
  arr.map(ele => ele + 1);  // [2, 3, 4, 5]
  ```

+ **注意点**

  + 箭头函数不存在`this`；
  + 箭头函数不能当做**「构造函数」**，即不能用`new`实例化；
  + 箭头函数不存在`arguments`对象，即不能使用，可以使用`rest`参数代替；
  + 箭头函数不能使用`yield`命令，即不能用作Generator函数。一个简单的例子：

  ```js
  function Person(){
    this.age = 0;
    setInterval(() => {
      this.age++;
    }, 1000);
  }
  var p = new Person(); // 定时器一直在执行 p的值一直变化
  ```

## 对象的基本使用

### 创建一个对象

```js
var stu = {} //对象自变量
var student={ 
    name:"李白" , //student有一个name属性，值为"李白"
    grade:"初一" ,
    //a、student有一个say属性，值为一个函数
    //b、student有一个say方法
    say:function(){
        console.log("你好");
    },
    run:function(speed){
        console.log("正在以"+speed+"米/秒的速度奔跑");
    }
}
//对象是键值对的集合：对象是由属性和方法构成的 (ps：也有说法为：对象里面皆属性，认为方法也是一个属性)

name是属性    grade是属性
say是方法     run是方法
```

### 对象属性操作

#### 获取属性：

#### 第一种方式：.	语法

+ student.name      获取到name属性的值，为："李白"
+ student.say       获取到一个函数

  #### 第二种方式：[ ]	语法

+ student["name"]   等价于student.name
+ student["say"]    等价于student.say

#### 号外：2种方式的差异：

+ .语法更方便，但是坑比较多(有局限性)，比如：
    - .后面不能使用js中的关键字、保留字、变量(class、this、function。。。)
    - .后面不能使用数字
```js
    var obj={};
    obj.this=5; //没报错
    obj.0=10;   //语法错误
```

+ []使用更广泛
    - o1[变量name] 
    - ["class"]、["this"]都可以随意使用 `obj["this"]=10`
    - [0]、[1]、[2]也可以使用       
        - `obj[3]=50 = obj["3"]=50`     
        - 思考：为什么obj[3]=obj["3"]
        - 因为:  3并不是变量,而是一个值,可以互相转换
    - 甚至还可以这样用：["[object Array]"]
        - jquery里面就有这样的实现
    - 也可以这样用：["{abc}"]
        - `obj["abc"] = 值;`
        - 给对象添加了{abc}属性

#### 设置属性
+ `student["gender"]="男"`    等价于：    `student.gender="男"`
    - 含义：如果student对象中没有gender属性，就添加一个gender属性，值为"男"
    -      如果student对象中有gender属性，就修改gender属性的值为"男"
+ 案例1：`student.isFemale=true`
+ 案例2：`student["children"]=[1,2,5]`
+ 案例3：
```js
    student.toShanghai=function(){   
        console.log("正在去往上海的路上")   
    }
```

#### 删除属性

+ delete student["gender"]      

+ delete student.gender

+ ```js
  delete person.gender;
  delete person.a;        //这段代码没有意义，也不会报错
  
  //delete关键字只能删除对象中的属性，不能删除变量
  // var a=100;
  // delete a;//错误的理解
  ```

#### 清空对象

```js
person={};      //person对象不再具有任何属性
person=null;    
//表示将person变量的值赋为null，从此以后person不再是一个对象了
```



## 通过构造函数创建对象

### 用构造函数的好处

```js
jsvar p1={age:100,gender:"女",say:function(){}}
var p1={age:100,gender:"女",say:function(){}}
var p1={age:100,gender:"女",say:function(){}}
//上述代码，
//a、存在很多冗余代码 
//b、所有的人对象都有say方法，并且功能相似，但是他们占据了不同的内存
//	-->会导致内存浪费（内存泄漏）

//构造函数
function Person(age,gender){
    this.age=age;
    this.gender=gender;
    //此时的内存依然浪费了-->原型
    this.say=function(){
    }
}
//使用这种方式创建对象，代码整洁了很多
var p1=new Person(5,"未知");
//Person是p1的构造函数
var p2=new Person(5,"未知");
var p3=new Person(5,"未知");
//还有一个未解决的问题：
```

### 构造函数创建对象的例子：

+ var xiaoming = new Object()     -->   var xiaoming = {};  
+ var now = new Date() 
+ var rooms = new Array(1,3,5)    -->   var rooms = [1,3,5]
+ `var isMale=/123/;`   ==> `var isMale=new RegExp("123")`
    - isMale是通过RegExp构造函数创建出来的对象
    - isMale是RegExp构造函数的实例

+ 以上例子中，Object、Date、Array都是内置的构造函数

## 自定义一个构造函数来创建对象

+ 构造函数
```js
function Person(name,age){
    this.name=name;
    this.age=age;
}
var p1=new Person("赵云",18)
```
+ 说明：`p1就是根据【Person构造函数】创建出来的对象`

### 构造函数的概念
+ 任何函数都可以当成构造函数
    `function CreateFunc(){ }`
+ 只要把一个函数通过new的方式来进行调用，我们就把这一次函数的调用方式称之为：构造函数的调用
    - new CreateFunc(); 此时CreateFunc就是一个构造函数
    - CreateFunc();     此时的CreateFunc并不是构造函数

### 构造函数的执行过程

`var p1=new Person();`

+ 1、创建一个对象 (我们把这个对象称之为Person构造函数的实例)- 	`_p1 `

+ 2、创建一个内部对象，`this`，将this指向该实例(_p1)

+ 3、执行函数内部的代码，其中，操作this的部分就是操作了该实例(_p1)

+ 4、返回值：
  
    - a、如果函数没有返回值(没有return语句)，那么就会返回构造函数的实例(p1)
    ```js
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
    ```
    
    
    
    - b、如果函数返回了一个基本数据类型的值，那么本次构造函数的返回值是该实例(_p1)
    ```js
    	function fn(){
        }
        var f1=new fn();    //f1就是fn的实例
    
    function fn2(){
            return "abc";
        }
        var f2=new fn2();   //f2是fn2构造函数的实例
    
    关于new Object()
    new Object()等同于对象字面量{ }	跟构造函数不一样
    ```
    - c、如果函数返回了一个复杂数据类型的值，那么本次函数的返回值就是该值
    ```js
    	function fn3(){
            return [1,3,5]; 
            //数组是一个对象类型的值，
            //所以数组是一个复杂数据类型的值
            //-->本次构造函数的真正返回值就是该数组
            //-->不再是fn3构造函数的实例
            
            //如何判断一个数据是否是复杂数据类型？
            //使用排除法：
            //a、看它的值是不是：数字、字符串、布尔值、null、undefined，
            //b、如果不是以上5种值，那就是复杂数据类型
        }
        var f3=new fn3();   //f3还是fn3的实例吗？错
        //f3值为[1,3,5]
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
        return [1,3,5]
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

## 继承

### JS中继承的概念：

+ 通过【某种方式】让一个对象可以访问到另一个对象中的属性和方法，我们把这种方式称之为继承  `并不是所谓的xxx extends yyy`

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