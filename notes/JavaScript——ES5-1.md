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
+ 基本包装类型
+ 单体内置对象
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
+ JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。

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

+ 字符串是不可改变的，在修改某个变量中的字符串时，必须销毁原始的字符串
  + 也就是说，在改变字符串时，实际上是销毁了原来的字符串，在创建了一个新的

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
    + 对象可以重写该方法
    + `null和undefined`没有该方法
    + 大多数情况调用该方法不必传参数,但是在数字调用该方法时可以传递一个参数为进制数（如二进制传入 2）
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
```

  + `split()`
    + 传入一个字符串，按照传入的字符串将使用方法的字符串分割为数组并返回
  + `join`
    + 传入一个字符,按照传入的字符将数组连接为字符串
  + `replace` 替换
    + `replaceAll` 替换所有

### null 与 undefined

+ null 表示一个空对象指针
  + 使用： 推荐对将来要保存对象的变量使用 null 进行初始化

+ 对于其他比较，它们会先转换位数字：`null` 转换为 `0` ， `undefined` 转换为 `NaN` 。
+ `null 等于 undefined 但是不全等`

+ undefined类型		(变量或对象以声明但 	未被赋值 | 初始化	| 对象属性不存在)

## 引用类型
+ Object
+ Array
+ Date
+ RegExp
+ Function

### Object类型

+ 创建对象 `let o = new Object();` 使用new关键字   Object的构造函数
+ `let person = { };`       使用对象字面量
  + 括号里不写属性方法，可以定义包含默认属性和方法的对象
  + 对象是键值对的集合：对象是由属性和方法构成的 (ps：也有说法为：对象里面皆属性，认为方法也是一个属性)
  + 在使用字面量创建时不会调用object构造函数

+ `Constructor` 保存着创建当前对象的构造函数
+ `hasOwnProperty(propertyName)` 用于检车给定属性在当前对象的示例中是否存在,属性必须是字符串
+ `isPrototypeOf(object)` 用于检查传入的对象是否是另一个对象的原型
+ `propertyIsEnumerable(propertyName)` 用于检查给定属性是否能够使用 `for-in`语句来枚举,属性必须是字符串
+ `toLocaleString()` 返回对象的字符串表达式,该字符串与执行环境的地区对应
+ `toString()` 返回对象的字符串表示
+ `valueOf()` 返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值一样

+ 清空对象
  + person={};      //person对象不再具有任何属性
  + person=null;    //表示将person变量的值赋为null，从此以后person是一个空的对象指针

#### 对象属性操作

+ 方式一:  . 语法
  + student.name      获取到name属性的值，为："李白"
  + student.say       获取到一个函数

+ 方式二:  [] 语法
  + student["name"]   等价于student.name
  + student["say"]    等价于student.say

+ 两种方法的差异
  - .语法更方便，但是坑比较多(有局限性)，比如：
  - .后面不能使用js中的关键字、保留字、变量(class、this、function。。。)
    - 用 `obj.this` 没报错
  - .后面不能使用数字  使用会发生语法错误

  - []使用更广泛
  - [变量name] 可以使用变量 
  - ["class"]、["this"]都可以随意使用 `obj["this"]=10`
  - [0]、[1]、[2]也可以使用
    - `obj[3]=50 == obj["3"]=50`
    - 上面相等是因为,对象的属性都是字符串,数字也会被转化为字符串去找对象的属性
    - 因为:  3并不是变量,而是一个值,可以互相转换
  - 甚至还可以这样用：["[object Array]"]
    - jquery里面就有这样的实现
  - 也可以这样用：["{abc}"]
    - `obj["abc"] = 值;`
    - 给对象添加了{abc}属性

#### 设置属性

+ `student["gender"]="男"`    等价于：    `student.gender="男"`
  - 含义：如果student对象中没有gender属性，就添加一个gender属性，值为"男"
  - 如果student对象中有gender属性，就修改gender属性的值为"男"

#### 删除属性

+ delete student["gender"]
+ delete student.gender
+ delete 只能删除对象中的属性,不能删除变量

#### 操作方法

+ 每个对象都有一个 [[Prototype]]
+ 对象属性的描述
  + `configurable:false` 
    + 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为false
  + `enumerable:false`  
    + 对象属性是否可通过for-in循环，false为不可循环，默认值为false
  + `writable:false`  
    + 对象属性是否可修改,false为不可修改，默认值为false
  + `value:'小明'`  
    + 对象属性的默认值，默认值为undefined
  + `get、set` 函数，不设置默认为 undefined

+ `Object.getOwnPropertySymbols(obj);` 在给定对象自身上找到的所有 Symbol 属性的数组
+ `Object.getOwnPropertyDescriptor(obj,property)` 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
+ `Object.getOwnPropertyNames(obj)` 返回指定对象上自身属性对应的字符串数组
+ 静态方法 `Reflect.ownKeys(obj)` 返回一个由目标对象自身的属性键组成的数组。
  + 如果目标不是对象则抛出错误



+ `Object.defineProperties();`  方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
  + `Object.defineProperties(obj, props)`
  + 参数： 目标对象 ， 一个或多个属性名称以及描述

+ `Object.defineProperty();`   作用同上
  + `Object.defineProperty(obj, prop, descriptor)`
  + 参数： 目标对象 ， 属性名称 ， 属性描述

```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  '其他描述属性'：{
    configurable:false,//能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为false
    enumerable:false,//对象属性是否可通过for-in循环，false为不可循环，默认值为false
    writable:false,//对象属性是否可修改,false为不可修改，默认值为false
    value:'小明', //对象属性的默认值，默认值为undefined
    get(){ return bValue;},
      // es6缩写，等价于 get:function(){ return bValue;}
    set(newValue){ bValue = newValue;}
    /*
    * get 和 set 默认值都为 undefined
    * get : 当访问该属性时会调用此函数，会传入 this 对象， 由于继承关系， 这里的 this 并不一定是定义该属性的对象
    * set : 当属性被修改时会调用此函数，接收一个参数（也就是被赋予的新值），会传入赋值时的 this 对象
    */
  }
});


const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1); //42
```

### Array类型

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

+ 操作方法

  + `concat()` 方法在数组的基础上创建一个副本，
    + 连接一个或多个数组
    + 如果传递参数，就会将参数加在数组末尾，不影响原数组

  + `slice()`方法数组截取，数组位数同样从0开始计数
    + 不会修改原数组
    + 一个参数，返回起始位置到数组末尾的项组成新的数组
    + 两个参数，返回起始位置到结束位置**前**的项
    + `arr.slice(1,4);` 截取1到4位，但不包括4，也就是说返回1-3；

  + `splice(index,delete,插入或替换)`方法
    + 返回被删除的项
    + 删除,起始位置,删除个数
    + 插入,起始位置,删除0个,插入的一个或多个参数
    + 替换,起始位置,删除个数,插入的一个或多个参数

+ 位置方法
  + ES5 为数组实例添加了两个位置方法：`indexOf()`和 `lastIndexOf()`
  + 两个方法都接收两个参数：要查找的项和（可选的）查找的起点位置

+ 迭代方法
+ `array.forEach(function(item,index,array){ })`
+ 对数组中的每一项运行给定函数
  + `every()` 如果该函数对每一项都返回 true , 则返回 true
  + `filter()` 返回该函数会返回true的项组成的数组
  + `forEach()` 这个方法没有返回值
  + `map()` 返回每次函数调用的结果组成的数组
  + `some()` 如果该函数任意一项返回 true , 则返回 true

+ 缩小方法
  + ES5 中新增了两个缩小数组的方法： `reduce()`和 `reduceRight()`.这两个方法都会迭代数组的所有项
  + 一个从头开始迭代，一个从末尾开始迭代
  + 都接收4个参数：前一个值，当前值，项的索引，和数组对象
  + 第一次的前一个值为索引0的值   当前值为索引 1 的值
  + 往后的迭代前一个值为上次的返回值,如无返则为`undefined`
```js
  //reduce() 方法求和
  let values = [1, 2, 3, 4, 5, 6];
  let sum = values.reduce(function(prev, cur, index, array){
    return prev + cur;
  });   // 21
```

### Date类型

+ Date类型使用UTC 1970年1月1日午夜（零时）开始经过的毫秒数来保存日期
+ Date类型保存的日期能精确到1970年1月1日之前或之后的285616年
+ `let now = new Date()`
+ `Date.parse()`接受表示日期的字符串,如果字符串不能表示日期则返回`NaN`
  + `let someDate = new Date(Date.parse("2015-5-5"))`
  + 直接像`Date()`构造函数传递参数,也会在后台调用`Date.parse()`方法
+ `Date.UTC()` 方法同样返回毫秒数,但是月份、每月中的日期、小时数都是从0开始计数
  + 同样的`2015-5-5` 用`Date.UTC`表示为`new Date(2015,4,4)` 小时分秒都用逗号隔开向后输入
+ `Date.now()`返回调用这个方法时的日期时间的毫秒数
  + 可以在脚本运行时取一次，脚本结束时取一次，相减就可以得出脚本的运行消耗时间

+ 继承的方法
  + 与其他引用类型一样，Date类型也重写了`toLocaleString()、toString()和valueOf()`方法

  + `toLocaleString()` 方法会按照与浏览器设置的地区相适应的格式返回日期和时间
  + `toString()` 方法通常返回带有时区信息的日期和时间
  + `valueOf()` 返回日期的毫秒表示，因此可以方便使用比较操作符来比较日期值

+ 日期格式化
  + ![日期格式化](./images/日期格式化.png)

+ 日期/时间组件方法
  + ![日期方法1](./images/日期方法1.png)

### RegExP类型

+ ECMAScript 通过 RegExp类型来支持正则表达式
  + `let expression = / pattern / flags;`
  + 每个正则表达式都可带有一个或多个标指（`flags`）
    + 表达式的匹配支持下列3个标指
    + g : 表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立刻停止
    + i : 表示不区分大小写（case-insensitive）模式
    + m : 表示多行（multiline）模式 ， 即在到达一行文本末尾时还会继续查找下一行中是否存在于模式匹配的项
  + `let pattern1 = /at/g;`  匹配字符串中所有“at”的实例
  + `let pattern2 = /[bc]at/i;`  匹配第一个“bat”或"cat"，不区分大小写
  + `let pattern3 = /.at/gi;`   匹配所有以“at”结尾的3个字符的组合，不区分大小写
  + 与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义，元字符包括：
  + `( [ { \ ^ $ | ) ? * + . ] }`
  + 如果想匹配字符串中包含的这些字符，就必需对它们进行转义
  + `let pattern2 = /\[bc\]at/i;` 匹配第一个“[bc]at”,不区分大小写
  + `let pattern3 = /\.at/gi;` 匹配所有以“.at”，不区分大小写
+ 以RegExp构造函数创建正则表达式，它接受两个参数，一个是要匹配的字符串模式，另一个是可选的标志字符串
  + `let pattern2 = new RegExp("[bc]at","i");` 因为参数是字符串，所以在转义元字符时需要双重转义
  + ![正则转义](./images/正则转义.png)

#### RegExp实例属性
  + ![RegExp实例属性](./images/RegExp实例属性.png)

#### RegExp 实例方法
  + RegExp对象的主要方法是`exec()`   返回匹配到的字符
  + 正则表达式的第二个方法是`test()` 接受一个字符串参数
  + 在模式与参数匹配的情况下返回`true` 否则就返回 `false`
  + RegExp实例继承的`toLocaleString() 和 toString()` 方法都会返回正则表达式的字面量，与创建的方式无关
  + search() 方法使用表达式来搜索匹配，然后返回匹配的位置。
  + replace() 方法返回模式被替换处修改后的字符串。
  + search() 方法也接受字符串作为搜索参数。
  + match()  找到一个或多个正则表达式的匹配。
  + split()   把字符串分割为字符串数组。

#### RegExp 构造函数属性

#### 模式的局限性
+ 不支持的特性：
  + 匹配字符串开始和结尾的\A 和\Z 但是支持以插入符号（^）和美元符号（$)来匹配字符串的开始和结尾
  + 向后查找（lookbehind） 但支持向前查找（lookahead）
  + 并集和交集类
  + 原子组（atomic grouping）
  + Unicode 支持 （单个支付除外，如\uFFFF）
  + 命名的捕获组   但支持编号的捕获组
  + S(single, 单行) 和 x(free-spacing,无间隔) 匹配模式
  + 条件匹配
  + 正则表达式注释

### Function

+ 每个函数都是Function类型的实例，和其他引用类型一样都具有属性和方法
+ 由于函数是对象，因此函数名实际上也是一个指向函数对象的指针
+ 通过函数表达式生命函数，要像声明变量一样以分号结尾  `let func = function(){};`
+ 函数声明，还能通过`Function`的构造函数声明  但是不推荐
  + `let func = new Function("num1","num2","return num1 + num2");`
+ 没有重载，同名函数会被覆盖，相当于给变量函数名重新赋值

#### 函数声明与函数表达式
  + 函数声明会提升
  + 函数表达式不会

#### 作为值的函数
  + 因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用，
  + 不仅可以将函数作为参数传递，还能作为返回结果

#### 函数内部属性
  + 函数内部有两个特殊对象： `arguments 和 this`
  + `arguments` 是一个类数组对象，里面包含传入函数的参数
    + 对象还有一个callee的属性，是一个指针，指向拥有这个`arguments`对象的函数
    + 在递归时使用 `arguments.callee` 可以指向函数本身, 这样无论函数名怎么变化都可以完成递归操作
  + `this` 引用的是函数-据以执行的环境对象，——this的值（当在网页的全局作用域中调用函数this对象引用的就是window）
  + 函数调用位置的环境对象
  + 因为函数名仅仅是一个指针，所以尽管如此调用，仍然用的是同一个函数
  + ES5 规范的函数对象属性： caller  保存着调用当前函数的函数的引用，在全局作用域中调用当前函数，他的值为null
  + 在严格模式中无法使用 arguments以及其属性

#### 函数属性和方法
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

## 基本包装类型

+ 特殊的引用类型：`Boolean、Number、String`
  + 每读取一个基本类型值的时候，后台就创建一个对应的基本类型的包装类型的对象，从而能够调用一些方法来操作这些数据
```js
  let s1 = "some text";
  let s2 = "s1.substring(2)"
  /*在第二行访问s1时，是一种读取模式，也就是从内存中读取这个字符串的值，在读取模式访问字符串是，后台都会自动完成下列读取模式
  * 1.创建String类型的一个实例；
  * 2.在实例上调用指定方法
  * 3.销毁这个实例
  * let s1 = new String("some text");
  * let s2 = s1.substring(2);
  * s1 = null;
  * 以上三个步骤也适用与 Boolean 和 Number 类型对应的数字值和布尔值
  */
```
+ 引用类型和基本包装类型的主要区别就是生存期
  + 使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中
  + 而基本包装类型只存在于一行代码执行的瞬间，然后立即被销毁，  不能在运行时为基本类型添加属性和方法， 因为就算添加，也会在添加完后被立即销毁
  + 可以显示的调用基本包装类型,但是应该在绝对必要的情况下再这样做,因为这样做很容易弄混
  + 对基本包装类型的实例调用 typeof 会返回 "object", 而且所有基本包装类型的对象都会被转换为布尔值true
  + object 构造函数也会想工厂方法一样,根据传入值的类型返回相应基本包装类型的实例
    + `let obj = new Object("some text"); alert(obj instanceof String); //true`

### Boolean 类型 不建议使用

### Number 类型

+ 数值格式化字符串方法`let num = 10; num.toFixed(2); //"10.00" ` 转化为有两位小数的字符串，  小数位多时能自动舍入
+ 格式化数值的方法： `toExponential()`,(e表示法，或科学计数)
+ 自动确认格式： `toPrecision()` 方法
+ 同样不建议使用

### String 类型

+ String类型的实例，都有一个length属性，表示字符串中包含多少个字符

+ 字符方法
  + 访问字符串中特定字符的方法：`charAt() 和 charCodeAt()` 都接收一个参数
    + `charAt(0)` 返回指定位置的那个字符
    + `charCodeAt(0)` 返回指定位置字符的字符编码

+ 字符串操作方法
  + `concat()` 用于将一个或多个字符串拼接起来，返回新字符串
    + `let str = "hello ";   let result = str.concat("world","!");`
  + `slice() 、 substr() 、 substring()` 第一个参数都是起始位置    返回新字符串    没传第二个参数默认到字符串末尾
    + slice() 截取 第二个参数  结束位置
      + 负参数会从后面开始截取, `a.slice(3,-3)` 从倒数第三个字符截取到整数第三个字符
    + substring() 第二个参数  结束位置
      + 所有负值参数会转换为 0,  `a.slice(3,-3)` 无论负几,都从索引3往前截取所有
    + substr()  第二个参数   截取长度
      + 将负的第二个参数转换为 0  ,负数将不截取

+ 字符串位置方法
  + `indexOf() 和 lastIndexOf()`  查找指定字符串，返回索引位置，没找到返回`-1`
  + 都接收可以接收2个参数，开始查找位置，查找字符
  + 找到第一个目标后就会返回

+ `trim()` 方法
  + 创建以个字符串副本，删除前置及后缀的所有空格

+ 字符串大小写转换
  + `toLowerCase()`         小写
  + `toLocaleLowerCase()`   针对特定地区实现
  + `toUpperCase()`         大写
  + `toLocaleUpperCase()`   针对特定地区实现

+ 字符串的模式匹配方法
  + `match()` 本质上与RegExp的exec()方法相同
  + `search()` 参数正则表达式，同match一样， 没查找到就返回-1， 找到则返回第一次匹配出现的位置
  + `replace()` 替换子字符串；两个参数，第一个参数是正则或是一个字符串，（这个字符串不会被转换成正则），第二个参数可以是一个字符串或是一个函数，，想替换全局，只能用正则而且需要指定全局（g）标志

+ `localeCompare()` 方法
  + 比较两个字符串,并返回下列值中的一个
  + 如果字符串在字母表中应该排在字符串参数之前,则返回一个负数(大多情况下是 -1 )
  + 如果字符串等于字符串参数,则返回 0;
  + 如果字符串在字母表中应该排在字符串参数之后,则返回一个正数(大多情况下是 1 )
  + `let str = "yellow"; str.localeCompare("brick");  // 1 `

+ `fromCharCode()` 方法
  + 接收一个或多个字符编码，转换为一个字符串

## 单体内置对象

+ Global 对象
+ Math 对象

### Global 对象

+ URI 编码方法
+ `eval()` 方法
  + 接收一个参数： 要执行的js代码字符串
  + `eval("alert('hi')");`

+ Global 对象属性
  + 特殊值
    + undefined
    + NaN
    + Infinity
  + 构造函数
    + Object
    + Array
    + Function
    + Boolean
    + String
    + Number
    + Date
    + RegExp
    + Error
    + EvalError
    + RangError
    + ReferenceError
    + SyntaxError
    + TypeError
    + URIError

+ window 对象

### Math 对象

+ Math 对象的属性
  + Math.E             自然对数的底数,即常量e的值
  + Math.LN10          10的自然对数
  + Math.LN2           2的自然对数
  + Math.LOG2E         以2为低e的对数
  + Math.LOG10E        以10为低e的对数
  + Math.PI            派的值
  + Math.SQRT1_2       1/2的平方根(即2的平方根的倒数)
  + Math.SQRT2         2的平方根

+ `min() 和 max()` 方法

  + 取出一组数值的最大值或最小值
+ 舍入方法

  + `Math.ceil() 、Math.floor() 、 Math.round()`
  + `Math.ceil()` 向上舍入
  + `Math.floor()` 向下舍入
  + `Math.round()` 四舍五入

+ `random()` 方法
  + 返回介于0和1之间一个随机数，不包括0和1
  + 随机值 `值 = Math.floor(Math.random() * 可能的值总数 + 第一个可能的值);`
  + `值 = Math.floor(Math.random() * 96 + 5);` 取5到100的数
  + 封装
```js
  function selectFrom(lowerValue,upperValue){
    let choices = upperValue - lowerValue + 1;
    return Math,floor(Math.random() * choices + lowerValue);
  }
  //数组随机排序
  arr.sort(function () { return 0.5 - Math.random() });
```

+ 其他方法
  + Math.abs(num)           返回num的绝对值
  + Math.exp(num)           返回Math.E的num次幂
  + Math.log(num)           返回num的自然对数
  + Math.pow(num,power)     返回num的power次幂
  + Math.sqrt(num)          返回num的平方根
  + Math.acos(x)            返回x的反余弦值
  + Math.asin(x)            返回x的反正弦值
  + Math.atan(x)            返回x的反正切值
  + Math.atan2(y,x)         返回y/x的反正切值
  + Math.cos(x)             返回x的余弦值
  + Math.sin(x)             返回x的正弦值
  + Math.tan(x)             返回x的正切值

## 数据类型判断

+ typeof
  + 主要用于判断基本类型
+ instanceof

### typeof

+ **typeof** 操作符 **检测数据类型**
+ 两种形式：`typeof x` 或者 `typeof(x)`。		以字符串的形式返回类型名称，例如 `"string"`。
+ `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。
  + 适用于基本数据类型判断
  + `undefined` 如果这个值未定义  对未初始化的变量使用也会返回  `undefined` 
  + `boolean` 如果这个值是布尔值
  + `string` 如果这个值是字符串
  + `number` 如果这个值是数值
  + `object` 如果这个值是对象或是null
  + `function` 如果这个值是函数
  + `Symbol` 符号

```js
  NaN 会返回 number
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
+ `result = target instanceof constructor`
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
  + `~~` 两个的作用是将操作数转化为 number 整数， 
    + 不是数字的字符串会转化为 0

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
  let oldValue = 2 ;                 //等于二进制的10
  let newValue = oldValue << 5 ;     //等于二进制的1000000，十进制的64
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
  + 一个是对象,则调用对象的 `valueOf()` 方法,得到基本类型在比较
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

| +        | 优先级                      | 运算类型      | 关联性           | 运算符 |
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
+ label语句

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
  //A为条件结果为true/false   B:A为true就执行B否则就执行C    
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

## label语句

+ JavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。
+ 标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句。
+ 标签通常与break语句和continue语句配合使用，跳出特定的循环。
+ 如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。
+ continue 也一样
```js
  label:
    语句

  top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      // if (i === 1 && j === 1) continue  top;
      console.log('i=' + i + ', j=' + j);
    }
  }
  foo: {
  console.log(1);
  break foo;
  console.log('本行不会输出');
  }
```
+ ![label](E:/Github/Practice/notes/images/label.png)

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
```js
//函数定义    会发生函数提升
function getUser(name){
  return 1;
}
//函数表达式   不会发生函数提升,所以不能在生命前调用
let getUser = function(){
  return 1;
}
//方便递归
let fun = function f(){
  return n < 3 ? 1 : n * f(n - 1);
}
```

+ 函数的返回值
  + 在函数任意位置，指定 `return` 指令来停止函数的执行，并返回函数指定的返回值。
  + 默认空值的 return 或没有 return 的函数返回值为 undefined 。

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

