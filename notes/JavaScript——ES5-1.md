# ECMAScript

+ 规定了语法的组成部分
  + 语法
  + 类型
  + 语句
  + 关键字
  + 保留字
  + 操作符
  + 对象

# 数据类型

+ 基本类型
  + `number` 
  + `bigint` 
  + `string` 
  + `boolean` 
  + `null` 
  + `undefined` 
+ 引用类型
  + `object`
+ 内置特殊类型
+ 相等性判断
+ 数据类型判断

+ 复杂数据类型
  + Array
  + RegExp
  + Date
  + Function

+ `symbol` 

+ JavaScript 是一种 **「弱类型」** 或者说 **「动态语言」**。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据

## 基本类型

+ `Boolean、Number、String、null、undefined`

+ `number` 用于任何类型的数字：整数或浮点数，在 ±2 范围内的整数。
+ `string` 用于字符串：一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
+ `boolean` 用于 `true` 和 `false`。
+ `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
+ `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。

+ 前三种基本类型都有类型对象，既可以通过类型对象创建对应的数据类型

+ ```js
  let bool = Boolean(true);
  let num = Number(123);
  let str = String("Hello World");
  ```

### Boolean

+ 可以使用`Boolean()`函数将任何类型转换为`Boolean`值 
    + 转换为`true`
        + 任何非空字符串
        + 任何非零数值(包括无穷大)
        + 任何对象
    
    + 转换为`false`
        + `""` 空字符串  注意空格不属于空字符串
        + `0 和 NaN` 
        + `null`
        + `undefined`

### Number

+ js中可以存在`正零(+0) 和 负零(-0)  `被认为相等

+ ```js
  let floatNum = 1.;   // 解析为1
  let floatNum2 = 10.0;  //解析为10
  let floatNum3 = 3.125e7; //等于31250000   e代表科学计数法  10的幂指数
  ```

+ js会将小数点后带有6个零以上的浮点数值转换为以e表示法表示的数值(`0.0000003会被转换成3e-7`)

  + 浮点数值的最高精确度是17位小数,但在计算其精确度是远远不如整数.

    + 例如: `0.1 + 0.2的结果不是0.3,而是0.30000000000000004`

    + 这个舍入误差会导致无法测试特定的浮点数值

```js
  if(a + b == 0.3){
      alert("不要做这样的测试");
  }
  这是使用基于IEEE754数值的浮点计算的通病
```

+ 数值范围

  + js能够表示的最小值保存在`Number.MIN_VALUE`中

    + 大多数浏览器中这个值是`5e-324`

  + 能够表示的最大值保存在`Number.MAX_VALUE`中

    + 大多数浏览器中这个值是`1.7976931348623157e+380`

  + 超过范围的数值将被自动转换成特殊的`Infinity`值

    + 负值转换成`-Infinity`(负无穷)

    + 正值转换成`Infinity`(正无穷)

    + `Infinity`不能参与计算

    + 确定一个数是不是位于最大值和最小值之间,可以使用`isFinite()`函数

      + 这个函数在参数位于最小与最大值之间时会返回`true`

```js
  let result = Number.MAX_VALUE + Number.MAX_VALUE;
  alert(isFinite(result));  //false
```

+ NaN

  + `NaN 即非数值(Not a Number)`是一个特殊的数值

  + 这个数值用于表示一个本来要返回数值的操作数未返回数值的情况

  + 任何数值除以0会返回`NaN`

  + 任何涉及`NaN`的操作都会返回`NaN`

  + `NaN与任何值都不相等包过本身`    只有在使用`Object.is(NaN,NaN) 时在相等`

  + `isNaN()` 函数接受一个参数,该数值可以是任何类型,

```js
  alert(isNaN(NaN));   //true
  alert(isNaN(10));   //false
  alert(isNaN('10'));   //false
  alert(isNaN('blue'));   //true    不能被转化成数值
  alert(isNaN(true));   //false
```

+ 数值类型转换

  + 一元运算符 `+`		`const age = +"22"; // 22`
  + `Number()`
    + `const age = Number("22"); // 22`
    + `Number.parseFloat("22");  // 22`
    + `Number.parseInt("22");  // 22`

    + `Boolean`值,`true和false转换成 1 和 0`
    + 转换日期 `Number(date) 和 date.getTime() 效果一样`
    + 如果是数值,只是简单的传入和返回
    + `null` 返回`0`
    + `undefined` 返回 `NaN`
    + 对象就调用  valueOf()方法    转换为NaN则调用对象的toString() 方法
    + 如果是字符串
      + 字符串只包含数字(包括前面带正号或符号的情况),按十进制转换,前导的0会被忽略
      + 小数转换为浮点数
      + 十六进制也会转化为相同大小的十进制数
      + 自动转换 加号连接字符串 ， 减号转化数值计算

```js
  Number("Hello world!");    //NaN
  Number("");				//0
  Number("000011");		//11
  Number(true);			//1
```

  + `parseInt()`

    + 第二个参数决定转化的进制解析  (2 二进制  8 八进制  10 十进制  16 十流进制)

    + 在转换字符串时,会忽略字符串前的空格,直到找到第一个非空格字符.如果第一个字符不是数字字符或负号,就会返回`NaN`

    + `parseInt()`空字符串会返回`NaN` ,`Number()`会返回`0`

    + 如果第一个字符是数字字符,会继续解析第二个,直到解析完字符串或者遇到一个非数字字符

    + 例如:`"1234blue" 会被转换成 1234 ,  blue会被忽略    "22.5"会被转换成 22 因为小数点不是有效的数字字符`

```js
  parseInt('1234blue');   //1234
  parseInt(''); 		//NaN
  parseInt('0xA'); 	//10  十六进制数
  parseInt('22.5'); 	//22
  parseInt('070'); 	//56  八进制
  parseInt('70'); 	//70  十进制
```

  + `parseFloat()`

    + 根  parseInt()  转换规则一样,但是可以转换出浮点数

### String

+ 字符字面量
  + `\n`  换行
  + `\t`  制表
  + `\b`  空格
  + `\r`  回车
  + `\f`  进纸
  + `\\`  斜杠
  + **\\`** 单引号
  + **\\"** 双引号
  + `\xnn`  以十六进制代码`nn`表示一个字符
  + `unnnn` 一十六进制代码`nnnn`表示一个`Unicode`(其中n为0~F)

+ 字符串方法
  + `toString()`
    + 数值、布尔值、对象和字符串都有该方法，返回一个字符串的副本
    + `null和undefined`没有该方法
    + 大多数情况调用该方法不必传参数,但是在数字调用该方法时可以传递一个参数为进制数
  + `String()`   字符串转化
    + 将 **「其他类型数据（任何类型的数字，字母，布尔值，对象）」** 转换为 String 类型
    + 在不知道值是不是 `null 或 undefined` 时可以调用该函数
    + 这个函数能将任何类型的值转换为字符串 
    + 规则如下:
      + 如果值有 `toString()`方法,则调用该方法(没有参数)并返回相应的结果
      + 如果是null 就返回 "null"
      + 如果是undefined 则返回 "undefined"
```js
  String(123);   // "123"
  // Number方法toString()/toExponential()/toFixed()/toPrecision() 也有同样效果。
  String(false); // "false"
  // Boolean方法 toString() 也有同样效果。
  String(new Date()); // "Sun Jun 07 2020 21:44:20 GMT+0800 (中国标准时间)"
  // Date方法 toString() 也有同样效果。
  String(leo);
```

  + `split()`
    + 传入一个字符串，按照传入的字符串将使用方法的字符串分割为数组并返回
  + `join`
    + 传入一个字符,按照传入的字符将数组连接为字符串
  + `replace` 替换
    + `replaceAll` 替换所有

### null 与 undefined
+ 对于其他比较，它们会先转换位数字：`null` 转换为 `0` ， `undefied` 转换为 `NaN` 。
+ `unll 等于 undefined 但是不全等`

+ undefined类型		(变量或对象以声明但 	未被赋值 | 初始化	| 对象属性不存在)

## 引用类型
+ Object
+ Array

### Object类型

+ 创建对象 `let o = new Object();` 使用new关键字   Object的构造函数
+ `let person = { };`       使用对象字面量
  + 括号里不写属性方法，可以定义包含默认属性和方法的对象
  + 在使用字面量创建时不会调用object构造函数

+ `Constructor` 保存着创建当前对象的构造函数
+ `hasOwnproprety(propertyName)` 用于检车给定属性在当前对象的示例中是否存在,属性必须是字符串
+ `isPrototypeOf(object)` 用于检查传入的对象是否是另一个对象的原型
+ `propertyIsEnumerable(propertyName)` 用于检查给定属性是否能够使用 `for-in`语句来枚举,属性必须是字符串
+ `toLocaleString()` 返回对象的字符串表达式,该字符串与执行环境的地区对应
+ `toString()` 返回对象的字符串表示
+ `valueOf()` 返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值一样

### Array

+ ECMAScript中数组是动态可调的，可以随着数据的添加自动增长以容纳新增数据

+ 创建方法

  + `let colors = new Array()`  也可省略new关键字
  + `let colors = ["red","blue","green"]` 使用数组字面量表示法
    + 在使用字面量创建时不会调用Array构造函数

+ 特点

  + 使用超过数组长度的索引时数组会自动增加到对应的长度
  + length属性不是只读的，可以向数组末尾移除向或添加新项
    + `arr.length = 4;` 设置数组的长度会把多的项删除，少的话就会新增空项undefined值
  + 数组最多可以包含4294967295个项

+ 检测数组

  + 对于一个网页或者一个全局作用域， `instanceof`操作符就能得到结果
    + 但对于2个或以上，因为存在不同版本的Array构造函数就得不到想要的结果
  + ES5 提供了 `Array.isArray()`方法检测某个值到底是不是数组，而不管是在那个全局环境创建的
    + `Array.isArray(value)`

+ 转化方法

  + 所有对象都具有 `toLocaleString()、toString()、valueOf()`方法
    + 数组的 `toString()`方法会返回由数组中每个值的字符串拼接而成的一个以逗号分隔的字符串
    + `valueOf()` 方法返回的还是数组
    + `toLocaleString()`方法返回类似
    + `join( " | " )` 方法可以设置分隔符

+ 栈方法

  + ECMAScript为数组提供了 `push() 和 pop()`方法
  + 栈的访问规则是LIFO(Last-In-First-Out,后进先出)的数据结构，也就是最新添加的项最早被移除
  + 栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部
  + `push()` 可以接受任意数量的参数，把他们添加到数组结尾，并返回修改后数组的长度
  + `pop()` 方法则从数组末尾移除最后一项，减少数组的length值，返回返回移除的项

+ 队列方法

  + 队列的数据结构访问规则是FIFO(First-In-First-Out,先进先出)。队列在列表的末端添加项，从列表的前端移除项
  + `push()`方法还是完成添加的工作
  + `shift()` 方法移除数组的第一个项并返回该项
  + `unshift()` 方法能在数组前端添加任意个项并返回数组长度。
  + 同时使用`unshift() 和 pop()` 方法可以从相反的方向来模拟队列

+ 重排序方法

  + `reverse() 和 sort()`

    + `reverse()`可以反转数组项的顺序

    + `sort()` 方法按升序排列数组项——即最小的值位于最前面,最大值排在后面
      + 此方法可以接收一个比较函数作为参数
      + 该函数 接收两个参数, 第一个参数位于应该位于第二个 `之前` 则返回一个负数,相等返回 0 , `之后` 返回一个正数

```js
  `sort()` 方法会调用每个数组项的 `toString()`转型方法，然后比较得到的字符串，即使数组的每一项都是数值，该方法比较的也是字符串
  升序排列
  arr.sort(function(a,b){return a - b});
  //升序函数
  function(a,b){
    if(a < b){
      return -1;
    }else if(a > b){
      return 1;
    }else{
      return 0;
    }
  }
  降序排列
  arr.sort(function(a,b){return b - a});
```

    + 

## 内置特殊类型
+ Array
+ RegExp
+ Date
+ Function

## 数据类型判断

+ typeof
  + 主要用于判断基本类型
+ instanceof

### typeof

+ **typeof** 操作符 **检测数据类型**
+ 两种形式：`typeof x` 或者 `typeof(x)`。		以字符串的形式返回类型名称，例如 `"string"`。
+ `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。
  + 适用于基本数据类型判断
  + `undefined` 如果这个值未定义  对初始化的变量使用会返回  `undefined` 
  + `boolean` 如果这个值是布尔值
  + `string` 如果这个值是字符串
  + `number` 如果这个值是数值
  + `object` 如果这个值是对象或是null
  + `function` 如果这个值是函数

```js
  NaN 会返回 namber
  typeof 10n   // "bigint"
  typeof Symbol("id") // "symbol"
  typeof [1,2,3,4]    // "object"
  typeof Math  // "object"  (1) Math 是一个提供数学运算的内建 object。
  typeof null  // "object"  (2) JavaScript 语言的一个错误，null 不是一个 object。null 有自己的类型，它是一个特殊值。
  typeof alert // "function"  (3) alert 在 JavaScript 语言中是一个函数。
```



+ `null` 表示一个空的对象指针, 这也是使用`typeof` 检测会返回`object`的原因

+ 如果定义的对象在将来准备用来保存对象,那么将该变量初始化未`null`而不算其他值,这样只要检测`null`值就可以知道相应的变量是否已经保存了一个对象的引用

```js
  null == undefined  /* true */
```

### instanceof

+ 判断对象的构造函数 来确定类型
+ `result = letiable instanceof constructor`
+ 如果变量给定引用类型的实例，那么`instanceof`操作符就会返回`true`
+ 所有引用类型的值都是 Object 的实例， 所以判断 Object 是构造函数时都会返回 true
+ 判断基本类型始终会返回 false 因为基本类型不是对象
+ 但有两个全局作用域的情况判断不会很准确

# 操作符

+ 一元操作符
+ 1 + 2 运算式中包含 2 个运算元，因此也称该运算式中的加号  + 为 「二元运算符。」
+ 在 +18 中的加号 + 对应只有一个运算元，则它是 「一元运算符」 。
+ 运算优先级

## 一元操作符

+ 只能操作一个值的操作符叫做一元操作符

+ 递增和递减 `++   --`

  + 前置和后置
  + 前置先计算在用
  + 后置先用在计算
  + `let a,b=1;  a = b++; //a=1     a = ++b ;  // a = 2`
  + 会将数字字符串先转换为数值在计算
  + 不包含有效数字字符的字符串将转换为 `NaN`
  + 布尔值也会转换为数字计算 `true 为 1  false 为 0 `
  + 应用于对象时，先调用对象的 `valueOf()方法` 取得一个可供操作的值，然会对值应用前述规则，如果是 `NaN` 则在调用 `toString()` 方法后再应用前述规则

```js
  var s1 = "2"; 			s1++;    // 值变成数值3
  var s2 = "z"; 			s1++;    // 值变成数值NaN
  var b = false; 			s1++;    // 值变成数值1
  var f = 1.1; 			f--;    // 值变成0.10000000000000009(由于浮点舍入错误所致)
  var o = {valueOf:function() {return -1;}}; 			o--;    // 值变成数值-2
```

+ 加和减 `+   -`
  + 放在数值前不会产生任何影响
  + 在对非数字应用时，会像 `Number()转型函数`一样对值进行转换

```js
  var s1 = "01"; 			s1 = +s1;    // 值变成数值1
  var s2 = "1.1"; 		s2 = +s2;    // 值变成数值1.1
  var s3 = "z"; 			s3 = +s3;    // 值变成数值NaN
  var b = false; 			b = +b;    // 值变成数值0
  var f = 1.1; 			f = +f;    // 值未变,仍然是1.1
  var o = {valueOf:function() {return -1;}}; 			0 = +o;    // 值变成数值-1
```

+ `-`主要用于表示负数

## 位操作符

+ 按位非（NOT）
  + 用一个 `~` 表示，执行的结果就是返回数值的反码
  + ![按位非](./images/按位非NOT.png)
  + 按位非的本质：操作数的负值减 1 
  + ``let a num1 = 25; let num2 = -num1 - 1;  // num2 = -26`` 也能得到同样的结果
  + 虽然以上代码能返回同样的结果，但由于按位非是在数值表示的最底层执行操作，因此速度更快

+ 按位与（AND）

  + 用一个和号字符（&）表示，按位与操作就是将两个数值的每一位对齐，然后根据一下规则，相同位置上的两个操作数执行AND操作
  + ![按位与](E:/Github/Practice/notes/images/按位与AND.png)

+ 按位异或（XOR）

  + 用一个插入符号（`^`）表示，也有两个操作数
  + 以下是按位异或的真值表
  + ![按位异或](E:/Github/Practice/notes/images/按位异或XOR.png)

+ 左移

  + 用两个小于号（<<）表示，这个操作符会将数值的所有位向左移动指定的位数。

  + 列如，如果将数值2（二进制码为10）向做移动5位，结果就是64（二进制码为1000000），

```js
  let oldvalue = 2 ;                 //等于二进制的10
  let newvalue = oldvalue << 5 ;     //等于二进制的1000000，十进制的64
```

  + 在向左移位后，原数值的右侧多出了5个空位。左移操作会以0来填充这些空位，以便得到的结果是一个完整的32位二进制数

  + ![左移](E:/Github/Practice/notes/images/二进制左移.png)

+ 有符号的右移

  + 用两个大于号（>>）表示，这个操作数会将数值向右移动，保留符号位（即正负符号标记）
  + ![有符号右移](E:/Github/Practice/notes/images/有符号右移.png)

+ 无符号右移

  + 无符号右移用3个大于号表示（>>>），这个操作符会将数值的所有32位都向右移动。对正数来说和和有符号右移是相同的
  + 对负数来说，无符号右移是以0来填充空位，而不是向有符号右移那样以符号位来填充空位
  + ![无符号右移](E:/Github/Practice/notes/images/无符号右移.png)

## 布尔操作符

+逻辑运算符

+ 逻辑与，AND（`&&`）  逻辑或，OR（`||`）  逻辑非，NOT（`!`）
+ `null`；     `NaN`；     `0`；
+ 空字符串（`""` or `''` or ````）；
+ `undefined`。尽管 `&&` 和 `||` 运算符能够使用非布尔值的操作数, 但它们依然可以被看作是布尔操作符，因为它们的返回值总是能够被转换为布尔值。
+ 如果要显式地将它们的返回值（或者表达式）转换为布尔值，请使用双重非运算符（即`!!`）或者Boolean构造函数。JavaScript 里有三个逻辑运算符：`||`（或），`&&`（与），`!`（非）。
+ 双重非运（ !! ）相当于进行布尔转换

### 逻辑非（!）
  + 可以应用与任何值，无论这个值是什么数据类型，都会返回一个布尔值，这个操作符会将它的操作数转换成一个布尔值，在求反

```js
  //规则如下
  操作数是一个                  , 	返回	 ,	 原来是
    对象                      ,   false	 ,	 true
    空字符串   	               ,   true	  ,	  false
    非空字符串  	             ,   false	,	  true
    数值0		                  ,   true	 ,	 false
    任意非0数值(包括Infinity)	  ,	  false	 ,	 true
    null	                   ,	 true	  ,	  false
    NaN		                   ,	 true	  ,	  false
    undefined	               ,	 true	  ,   false

  n1 = !true              // !t 返回 false
  n2 = !false             // !f 返回 true
  n3 = !''                // !f 返回 true
  n4 = !'Cat'             // !t 返回 false
  ```
  + 逻辑非也可以用于将一个值转换位与其对应的布尔值，同时使用两个逻辑非操作符，就会模拟 `Boolean()`转型函数的行为
```js
  alert(!!"blue");	//true
  alert(!!0);     	//false
  alert(!!NaN);   	//false
  alert(!!"");    	//false
  alert(!!12345); 	//true
  ```

### 逻辑与（&&）
```js
  //操作数不是布尔值的情况
  操作数                  返回
    第一个是对象              第二个操作数
    第二个是对象              只有在第一个求值结果为true的情况才会返回该对象
    两个都是对象              第二个操作数
    有一个是null             null
    有一个是NaN              NaN
    如果有一个是undefined     undefined
  
  //逻辑与（&&） 所有条件都为 true 才返回 true，否则为 false。
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
  + 逻辑与属于短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值
  + 返回第一个碰到的求值为false的操作数
  + 对于逻辑与操作而言，如果第N个操作数是 `false` 则无论而已个操作数是什么值，结果都不再可能是 `true` 了
  + 执行到的操作数未定义则会报错

### 逻辑或（||）
```js
  //操作数不是布尔值的情况
  操作数                  返回
    第一个是对象              第一个操作数
    第一个操作数求值为false    第二个操作数
    两个都是对象              第一个操作数
    两个都是null             null
    两个都是NaN              NaN
    两个都是undefined     undefined

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
  + 逻辑或也是短路操作符。也就是说，如果第一个操作数的求值位 `true` ，就不会对第二个操作数求值了
  + 可以利用逻辑或的这一行为来避免变量赋 `null 或 undefined` 值

### 短路取值

+ 与运算 `&&` 的优先级比或运算 `||` 要高。所以代码 `a && b || c && d` 完全跟 `&&` 表达式加了括号一样：`(a && b) || (c && d)`。

+ 由于逻辑表达式的运算顺序是从左到右，也可以用以下规则进行"短路"计算：

+ `(some falsy expression) && (_expr)_` 短路计算的结果为假。

+ `(some truthy expression) || _(expr)_` 短路计算的结果为真。短路意味着上述表达式中的expr部分**「不会被执行」**，因此expr的任何副作用都不会生效（举个例子，如果expr是一次函数调用，这次调用就不会发生）。造成这种现象的原因是，整个表达式的值在第一个操作数被计算后已经确定了。看一个例子：
```js
  function A(){ console.log('called A'); return false; }
  function B(){ console.log('called B'); return true; }
  console.log( A() && B() );
  // logs "called A" due to the function call,
  // then logs false (which is the resulting value of the operator)
  console.log( B() || A() );
  // logs "called B" due to the function call,
  // then logs true (which is the resulting value of the operator)
```

## 乘性操作符

+ ECMAScript定义了3个乘性操作符：乘法、除法和求模,在操作数为非数值的情况下会执行自动的类型转换
+ 如果参与乘法计算的某个操作数不是数值，后台会先调用 `Number()`转型函数将其转换为数值
+ 正无穷或负无穷,与0相乘结果是 `NaN` 其他数位正无穷或负无穷

+ 乘法（*）

+ 除法（/）
  + 最后一条规则同乘法

+ 求模（%）
  + 余数

## 加性操作符

+ 加法
  + 有一个操作数为NaN结果就是NaN
  + 正无穷(Infinity)或负无穷
    + 正正为正
    + 负负为负
    + 正负为NaN
  + `+0 + +0 = +0`
  + `-0 + -0 = -0`
  + `+0 + -0 = +0`
  + 字符串
    + 字符串拼接
    + 有一个操作数为字符串则转换另一个为字符串在拼接
    + 对象、数值、布尔值调用`toString()`方法取得相应的字符串，`undefined、null` 调用 `String()` 函数取得转换为字符串

+ 减法
  + 有一个操作数为NaN结果就是NaN
  + 正无穷(Infinity)或负无穷
    + 正正为NaN
    + 负负为NaN
    + 正负为正
    + 负正为负
  + `+0 - +0 = +0`
  + `+0 - -0 = -0`
  + `-0 - -0 = +0`
  + 字符串、布尔值、null、undefined，则先在后台调用 `Number()函数`转化为数值，在根据规则运算
  + 对象调用对象的`valueOf()`方法取得该对象的数值，如果对象没有 `valueOf()` 方法就调用 `toString()` 方法并将得到的字符串转化为数值

## 关系操作符

+ 小于（<）、大于（>）、小于等于（<=）、大于等于（>=）
+ 数值进行比较
+ 字符串比较对应的字符编码
+ 有一个数值，就将另一个转换为数值比较
+ 有一个是对象，则调用对象的 `valueOf()` 方法在比较，没有该方法就调用 `toString()` 方法在比较
+ 一个操作数是布尔值，则先将其转换为数值在比较

## 相等操作符

+ 相等和不相等 （==） （!=）

+ 先转换在比较
+ 规则
  + 有布尔值则在比较前转换数值
  + 字符串和数值将字符串转换为数值
  + 一个是对象,则调用对象的 `vlaueOf()` 方法,得到基本类型在比较
  + `null 、 undefined 相等` 比较前不能将这两个值转换为其他任何值
  + `两个 NaN 不相等`     都是对象比较是不是同一个对象，指向同一个内存

+ 全等和不全等 `（===）  （!==）`
  + 仅比较而不转换

![640](./images/640.webp)

## 赋值操作符 （=）18

+ 乘/赋值（*=）
+ 除/赋值（/=）
+ 模/赋值（%=）
+ 加、减、左移、有符号右移、无符号右移

## 逗号操作符

+ 使用逗号除了可以在一条语句执行多个操作外
+ 还能用于赋值 ， 总是会返回表达式中的最后一项
+ `let num = (5, 1 ,4 ,8 ,0);  //num 的值为0`

## 运算符优先级

+ 运算符的优先级决定了表达式中运算执行的先后顺序，优先级高的运算符最先被执行。下面的表将所有运算符按照优先级的不同从高（20）到低（1）排列。
```js
  3 > 2 && 2 > 1
  // return true
  3 > 2 > 1
  // 返回 false，因为 3 > 2 是 true，并且 true > 1 is false
  // 加括号可以更清楚：(3 > 2) > 1
```
+ 

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

# 语句

+ 条件判断语句
+ 循环语句
+ 语句中断
+ with语句
+ lable语句

## 条件判断语句

+ if 判断
+ 三元表达式
+ switch 判断

### if 语句

+ 在if语句中始终推荐使用代码块  即：{ code }
+ 会对不是布尔值的判断条件进行隐式转换,调用 `Boolean(条件)` 该方法进行转换
+ 转换规则同该方法一致
+ 数字 `0`、空字符串 `""`、`null`、`undefined` 和 `NaN` 都会被转换成 `false`。因为他们被称为 “falsy” 值。
+ 其他值被转换为 `true`，所以它们被称为 “truthy”。

### 三元表达式

```js
  //A为条件结果为ture/false   B:A为ture就执行B否则就执行C    
  //	A ？ B ：C (如果A为真执行B否则执行C)
  var A = 1;
  alert(A?B:C);
  alert(A==1?A:"第三");	//输出1
```

### switch 语句

+ 条件与结果为全等
+ **`switch`** 语句至少包含一个 `case` 代码块和一个可选的 `default` 代码块：
+ ECMAScript中switch中可以使用任何数据类型，无论是字符串还是对象
+ 多个`case`也可共用一段执行语句
+ 每一个case的值不一定是常量，可以是变量，甚至是表达式
  + ` case 'Hello' + 'World':{}`

```js
var num = 25;
// 可以这样使用表达式
switch(true){
    case num == 1: //共用执行语句
    case num < 0:{
        break;
    }
    case num >= 0 && num <= 10:{
        break;
    }
    default:{
        break;
    }
}
```
## 循环语句

+ do-while
+ while
+ for
+ for-in

### do-while

+ 至少执行一次

### while

+ 先判断条件在执行
+ **「while 语句**可以在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为真时结束循环

### for语句

+ for循环只是while循环的变体
+ `for` 语句头部圆括号中的所有三个表达式都是可选的。
+ 将循环控制的表达式全部省略就会创建一个无线循环 `for(;;){ code }`
+ 只给控制表达式实际上就把for循环转换成了while循环 `for(;i < count;){ code }`

### for-in

+ `for-in` 语句是一种精确的迭代语句，可以用来枚举对象的属性
+ `for (property in expression) statement`
+ `for(let propName in window){ document.write(propName) }`
+ 在使用`for-in`循环前，先检测确认该对象的值不是`null`或`undefined`

## 语句中断
+ break和continue

+ `break和continue`语句用于在循环中精确的控制代码的执行
+ `break` 会立即退出当前执行的语句  如 `if、for`
+ `continue` 会退出当前循环过程，返回循环顶部继续执行
  + 只能用于循环内部
  + 判断语句中无法使用

## lable语句

+ ![lable](E:/Github/Practice/notes/images/lable.png)

## with语句

+ 作用是将代码的作用域设置到一个特定的对象中
+ 语法： `with (expression) statement;`
+ ![with语句](E:/Github/Practice/notes/images/with语句.png)
+ 严格模式下不允许使用
+ 大量使用会导致性能下降，同时也会给代码调试造成滚男，因此在开发大型应用程序时，不建议使用

# 函数

+ 理解参数
+ 没有重载

+ 在ECMAScript中函数在定义时不必指定是否返回值
+ 函数在执行完 return 语句后会立刻停止退出 ， 位于之后的代码都不会被执行
+ 严格模式对函数有一些限制
+ 函数和参数都不能命名为 `eval、arguments`, 参数不能同名

## 理解参数

+ ECMAScript函数不介意传递的参数有多少个，或是什么类型
+ 即便定义的函数只接收两个参数，在调用时未必一定要传两个参数，可以传递一个、三个甚至不传，而不会出现解析错误
+ 因为在ECMAScript中的参数在内部是用一个数组来表示的，函数接收的始终都是这个数组，而不关心数组中包含哪些参数
+ 在函数内部可以通过 `arguments`对象来访问这个数组，从而获取传递给函数的每一个参数
+ `arguments`对象只是与数组类似,并不是`array`的实例,因为可以使用方括号语法访问它的每一个元素,使用`length`属性来确定传进来多少个参数
+ `arguments`可以和命名参数一起使用
  + 值永远同对应的命名参数保持一致
  + 但是对应的内存空间是独立的,并不是同一个内存空间
  + 如果只传入一个参数,`arguments[1]`设置的值并不会反应到命名参数中,因为`arguments`对象的长度是由传入参数个数决定的,不是由定义函数时的命名参数的个数决定的
  + 没有传递值的命名参数将自动被赋予`undefined`值
+ 严格模式对`arguments`对象做出了限制
  + 赋值无效
  + 重写值会导致语法错误

## 没有重载

+ 在两个函数名相同参数不同的情况下并不会有重载
+ 而是后定义的函数覆盖先前定义的函数