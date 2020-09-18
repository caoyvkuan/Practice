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
+ 引用类型
+ 内置特殊类型
+ 相等性判断

## 基本类型

+ `Boolean、Number、String、null、undefined`

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
        + `""` 空字符串
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

  + `Number()`

    + `Boolean`值,`true和false转换成 1 和 0`

    + 如果是数值,只是简单的传入和返回

    + `null` 返回`0`

    + `undefined` 返回 `NaN`

    + 对象就调用  valueOf()方法    转换为NaN则调用对象的toString() 方法

    + 如果是字符串

      + 字符串只包含数字(包括前面带正号或符号的情况),按十进制转换,前导的0会被忽略

      + 小数转换为浮点数

      + 十六进制也会转化为相同大小的十进制数

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
    + 在不知道值是不是 `null 或 undefined` 时可以调用该函数
    + 这个函数能将任何类型的值转换为字符串 
    + 规则如下:
      + 如果值有 `toString()`方法,则调用该方法(没有参数)并返回相应的结果
      + 如果是null 就返回 "null"
      + 如果是undefined 则返回 "undefined"
  + `split()`
    + 传入一个字符串，按照传入的字符串将使用方法的字符串分割为数组并返回
  + `join`
    + 传入一个字符,按照传入的字符将数组连接为字符串
  + `replace` 替换
    + `replaceAll` 替换所有



## Object类型

+ 创建对象 `let o = new Object();`
  + `Constructor` 保存着创建当前对象的构造函数
  + `hasOwnproprety(propertyName)` 用于检车给定属性在当前对象的示例中是否存在,属性必须是字符串
  + `isPrototypeOf(object)` 用于检查传入的对象是否是另一个对象的原型
  + `propertyIsEnumerable(propertyName)` 用于检查给定属性是否能够使用 `for-in`语句来枚举,属性必须是字符串
  + `toLocaleString()` 返回对象的字符串表达式,该字符串与执行环境的地区对应
  + `toString()` 返回对象的字符串表示
  + `valueOf()` 返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值一样

# 操作符

+ 数据类型判断操作符
+ 一元操作符

## 数据类型判断操作符

+ **typeof** 操作符

  + 适用于基本数据类型判断
  + `undefined` 如果这个值未定义
  + `boolean` 如果这个值是布尔值
  + `string` 如果这个值是字符串
  + `number` 如果这个值是数值
  + `object` 如果这个值是对象或是null
  + `function` 如果这个值是函数

+ typeof 对初始化的变量使用会返回  `undefined` 

+ 对未声明的变量使用同样会返回 `undefined`

+ `null` 表示一个空的对象指针, 这也是使用`typeof` 检测会返回`object`的原因

+ 如果定义的对象在将来准备用来保存对象,那么将该变量初始化未`null`而不算其他值,这样只要检测`null`值就可以知道相应的变量是否已经保存了一个对象的引用

```js
  null == undefined  /* true */
```

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

## 赋值操作符 （=）18

+ 乘/赋值（*=）
+ 除/赋值（/=）
+ 模/赋值（%=）
+ 加、减、左移、有符号右移、无符号右移

## 逗号操作符

+ 使用逗号除了可以在一条语句执行多个操作外
+ 还能用于赋值 ， 总是会返回表达式中的最后一项
+ `let num = (5, 1 ,4 ,8 ,0);  //num 的值为0`

# 语句

+ 条件判断语句
+ 循环语句
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

## do-while

+ 至少执行一次

## while

+ 先判断条件在执行

## for语句

+ for循环只是while循环的变体
+ 将循环控制的表达式全部省略就会创建一个无线循环 `for(;;){ code }`
+ 只给控制表达式实际上就把for循环转换成了while循环 `for(;i < count;){ code }`

## for-in

+ `for-in` 语句是一种精确的迭代语句，可以用来枚举对象的属性
+ `for (property in expression) statement`
+ `for(let propName in window){ document.write(propName) }`
+ 在使用`for-in`循环前，先检测确认该对象的值不是`null`或`undefined`

## lable语句

+ ![lable](E:/Github/Practice/notes/images/lable.png)

## break和continue

+ `break和continue`语句用于在循环中精确的控制代码的执行
  + `break` 会立即退出循环
  + `continue` 会退出当前循环过程，返回循环顶部继续执行

## with语句

+ 作用是将代码的作用域设置到一个特定的对象中
+ 语法： `with (expression) statement;`
+ ![with语句](E:/Github/Practice/notes/images/with语句.png)
+ 严格模式下不允许使用
+ 大量使用会导致性能下降，同时也会给代码调试造成滚男，因此在开发大型应用程序时，不建议使用
