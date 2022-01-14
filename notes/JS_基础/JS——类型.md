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

# 基本类型

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

## Boolean

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

## Number

+ js中可以存在`正零(+0) 和 负零(-0)  `被认为相等  `(1 / +0) === (1 / -0) // false`
+ JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。
+ JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算

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
  //0.1 + 0.2 === 0.3  false
  //0.3 / 0.1  2.9999999999999996
  //(0.3 - 0.2) === (0.2 - 0.1)  false
  if(a + b == 0.3){
      alert("不要做这样的测试");
  }
  这是使用基于IEEE754数值的浮点计算的通病  64位从最左边开始，是这样组成的。
  第1位：符号位，0表示正数，1表示负数  //任何一个数都有一个对应的负值，就连0也不例外。
  第2位到第12位（共11位）：指数部分
  第13位到第64位（共52位）：小数部分（即有效数字）
```

+ isFinite()
  + 返回一个布尔值，表示某个值是否为正常的数值。
```js
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```

### 数值范围

  + JavaScript 能够表示的数值范围为21024到2-1023（开区间），超出这个范围的数无法表示。
```js
  Math.pow(2, -1075) // 0
  Math.pow(2, 1024) // Infinity
```

  + js能够表示的最小值保存在`Number.MIN_VALUE`中
    + 大多数浏览器中这个值是`5e-324`

  + 能够表示的最大值保存在`Number.MAX_VALUE`中
    + 大多数浏览器中这个值是`1.7976931348623157e+308`

  + 超过范围的数值将被自动转换成特殊的`Infinity`值
    + 负值转换成`-Infinity`(负无穷)
    + 正值转换成`Infinity`(正无穷)
    + `Infinity`不能参与计算 可以比大小
    + 确定一个数是不是位于最大值和最小值之间,可以使用`isFinite()`函数
      + 这个函数在参数位于最小与最大值之间时会返回`true`
    + Infinity与NaN比较，总是返回false

```js
  1 / 0 // Infinity
  let result = Number.MAX_VALUE + Number.MAX_VALUE;
  alert(isFinite(result));  //false
  Infinity === -Infinity // false
  1 / -0 // -Infinity
  -1 / -0 // Infinity
```

+ NaN
  + `NaN 即非数值(Not a Number)`是一个特殊的数值
  + 这个数值用于表示一个本来要返回数值的操作数未返回数值的情况
  + 任何涉及`NaN`的操作都会返回`NaN`  `+、-、*、/...`
  + `isNaN()` 函数接受一个参数,该数值可以是任何类型,
  + 判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断。
  + `value !== value;`

```js
  //`NaN与任何值都不相等包过本身`    只有在使用`Object.is(NaN,NaN) 时在相等`
  //数组的indexOf方法内部使用的是严格相等运算符，所以该方法对NaN不成立
  [NaN].indexOf(NaN) // -1

  alert(isNaN(NaN));   //true
  alert(isNaN(10));   //false
  alert(isNaN('10'));   //false
  alert(isNaN('blue'));   //true    不能被转化成数值
  alert(isNaN(true));   //false
  isNaN({}) // true  //等同于  isNaN(Number({})) // true
  isNaN(['xzy']) // true  // 等同于  isNaN(Number(['xzy'])) // true
  isNaN([]) // false  // 转化数字为 0 ；
  isNaN([123]) // false
  isNaN(['123']) // false
  Math.acos(2) // NaN
  Math.log(-1) // NaN
  Math.sqrt(-1) // NaN

  //任何数值除以0会返回`NaN`
  0 / 0 // NaN
```

### 数值类型转换

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
      + 对象方法返回的不是原始类型的值，会报错
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

## String

+ 字符串是不可改变的，在修改某个变量中的字符串时，必须销毁原始的字符串
  + 也就是说，在改变字符串时，实际上是销毁了原来的字符串，在创建了一个新的
+ 字符集
  + Unicode 字符集  `var s = '\u00A9'`
```js
var longString = 'Long \
long \
long \
string';

longString  // 换行书写字符串  ·\·
// "Long long long string"

(function () { /*
line 1
line 2
line 3
*/}).toString().split('\n').slice(1, -1).join('\n')
// "line 1
// line 2
// line 3"

因为js只能识别2字节字符，而这是4字节字符，所以长度会被认为是2
'𝌆'.length // 2
```

+ 字符串数组
  + 字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）。
  + length 属性可以获取字符串长度
```js
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"
```

+ 转义符
  + \0 ：null（\u0000）
  + \b ：后退键空格（\u0008）
  + \f ：换页符（\u000C）
  + \n ：换行符（\u000A）
  + \r ：回车键（\u000D）
  + \t ：制表符（\u0009）
  + \v ：垂直制表符（\u000B）
  + \' ：单引号（\u0027）
  + \" ：双引号（\u0022）
  + \\ ：反斜杠（\u005C）
  + `\xnn`  以十六进制代码`nn`表示一个字符
  + `u---` 一十六进制代码`---`表示一个`Unicode`(其中n为0~F)

+ 字符串方法
  + `toString()`
    + 数值、布尔值、对象和字符串都有该方法，返回一个字符串的副本
    + 对象可以重写该方法
    + `null和undefined`没有该方法
    + 大多数情况调用该方法不必传参数,但是在数字调用该方法时可以传递一个参数为进制数（如二进制传入 2）
  + `String()`   字符串转化
    + 将 **「其他类型数据（任何类型的数字，字母，布尔值，对象）」** 转换为 String 类型
      + 对象返回一个类型字符串，数组返回该数组的字符串形式
    + 在不知道值是不是 `null 或 undefined` 时可以调用该函数
    + 这个函数能将任何类型的值转换为字符串 
    + 规则如下:
      + 如果值有 `toString()`方法,则调用该方法(没有参数)并返回相应的结果
      + `valueOf() 、 toString()` 都返回对象则报错
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

## null 与 undefined

+ null 表示一个空对象指针
  + 使用： 推荐对将来要保存对象的变量使用 null 进行初始化

+ 对于其他比较，它们会先转换位数字：`null` 转换为 `0` ， `undefined` 转换为 `NaN` 。
+ `null 等于 undefined 但是不全等`

+ undefined类型		(变量或对象以声明但 	未被赋值 | 初始化	| 对象属性不存在)

# 引用类型

+ Object 单独记录
+ Array 单独记录
+ Date
+ RegExp
+ Function

## Date类型

+ Date 类型使用 UTC 1970年1月1日午夜（零时）开始经过的毫秒数来保存日期
+ Date 类型保存的日期能精确到 1970年1月1日 之前或之后的285616年
+ `let now = new Date()` 没有参数,默认为当前时间

+ `Date.parse()`接受表示日期的字符串,如果字符串不能表示日期则返回`NaN`
  + `let someDate = new Date(Date.parse("2015-5-5"))`
  + 直接像`Date()`构造函数传递参数,也会在后台调用`Date.parse()`方法

+ `Date.UTC()` 方法同样返回毫秒数,但是月份、每月中的日期、小时数都是**从0开始计数**
  + 同样的`2015-5-5` 用`Date.UTC`表示为`new Date(2015,4,4)` 小时分秒都用逗号隔开向后输入

+ `Date.now()`返回调用这个方法时的日期时间的毫秒数
  + 可以在脚本运行时取一次，脚本结束时取一次，相减就可以得出脚本的运行消耗时间

+ 日期的运算
  + 减法运算，返回的是它们间隔的毫秒数
  + 加法运算，拼接字符串

+ 继承的方法
  + 与其他引用类型一样，Date类型也重写了`toLocaleString()、toString()和valueOf()`方法
  + `toLocaleString()` 方法会按照与浏览器设置的地区相适应的格式返回日期和时间
  + `toString()` 方法通常返回带有时区信息的日期和时间
  + `valueOf()` 返回日期的毫秒表示，因此可以方便使用比较操作符来比较日期值

+ to 类方法
  + Date.prototype.toString()
    - toString方法返回一个完整的日期字符串。
  + Date.prototype.toUTCString()
    - toUTCString方法返回对应的 UTC 时间，也就是比北京时间晚8个小时。
  + Date.prototype.toISOString()
    - toISOString方法返回对应时间的 ISO8601 写法。
  + Date.prototype.toJSON()
    - toJSON方法返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同。
  + Date.prototype.toDateString()
    - toDateString方法返回日期字符串（不含小时、分和秒）。
  + Date.prototype.toTimeString()
    - toTimeString方法返回时间字符串（不含年月日）。

+ get 类方法
  + Date对象提供了一系列get*方法，用来获取实例对象某个方面的值。
  + getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
  + getDate()：返回实例对象对应每个月的几号（从1开始）。
  + getDay()：返回星期几，星期日为0，星期一为1，以此类推。
  + getFullYear()：返回四位的年份。
  + getMonth()：返回月份（0表示1月，11表示12月）。
  + getHours()：返回小时（0-23）。
  + getMilliseconds()：返回毫秒（0-999）。
  + getMinutes()：返回分钟（0-59）。
  + getSeconds()：返回秒（0-59）。
  + getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。
  + get*方法返回的都是当前时区的时间，Date对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间。

+ set 类方法
  + Date对象提供了一系列set*方法，用来设置实例对象的各个方面。
  + setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
  + setFullYear(year [, month, date])：设置四位年份。
  + setHours(hour [, min, sec, ms])：设置小时（0-23）。
  + setMilliseconds()：设置毫秒（0-999）。
  + setMinutes(min [, sec, ms])：设置分钟（0-59）。
  + setMonth(month [, date])：设置月份（0-11）。
  + setSeconds(sec [, ms])：设置秒（0-59）。
  + setTime(milliseconds)：设置毫秒时间戳。
  + set 系列方法除了setTime()，都有对应的 UTC 版本，即设置 UTC 时区的时间。

## RegExP 类型

+ 创建方法
  + 构造函数
    + ` let regex = new RegExp('xyz','i'); `
  + 正则字面量
    + ` let regex = /xyz/i `

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
  + 转义符号 （'\'）
  + `( [ { \ ^ $ | ) ? * + . ] }`
+ 如果想匹配字符串中包含的这些字符，就必需对它们进行转义
+ `let pattern2 = /\[bc\]at/i;` 匹配第一个“[bc]at”,不区分大小写
+ `let pattern3 = /\.at/gi;` 匹配所有以“.at”，不区分大小写
+ 以RegExp构造函数创建正则表达式，它接受两个参数，一个是要匹配的字符串模式，另一个是可选的标志字符串
  + `let pattern2 = new RegExp("[bc]at","i");` 因为参数是字符串，所以在转义元字符时需要双重转义

### RegExp实例属性

+ 正则对象的实例属性分成两类。

+ 一类是修饰符相关，用于了解设置了什么修饰符。
  + RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了i修饰符。
  + RegExp.prototype.global：返回一个布尔值，表示是否设置了g修饰符。
  + RegExp.prototype.multiline：返回一个布尔值，表示是否设置了m修饰符。
  + RegExp.prototype.flags：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。
  + 上面四个属性都是只读的。

+ 另一类是与修饰符无关的属性，主要是下面两个。
  + RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文。
  + RegExp.prototype.source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

### RegExp 实例方法

+ RegExp.prototype.test()
  + 正则实例对象的 test 方法返回一个布尔值，表示当前模式是否能匹配参数字符串。
  + 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
```js
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false
//带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置。
//注意，带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。
//lastIndex属性只对同一个正则表达式有效
```

+ RegExp.prototype.exec()
  + 正则实例对象的exec()方法，用来返回匹配结果。
  + 如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回 null。
  + exec()方法的返回数组还包含以下两个属性：
    + input：整个原字符串。
    + index：模式匹配成功的开始位置（从0开始计数）。
  + 如果正则表达式加上g修饰符，则可以使用多次exec()方法，下一次搜索的位置从上一次匹配成功结束的位置开始。

### 字符串的实例方法

+ String.prototype.match()：返回一个数组，成员是所有匹配的子字符串。
+ String.prototype.search()：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
+ String.prototype.replace()：按照给定的正则表达式进行替换，返回替换后的字符串。
+ String.prototype.split()：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。

+ String.prototype.match()
  + 字符串实例对象的match方法对字符串进行正则匹配，返回匹配结果。
  + 字符串的match方法与正则对象的exec方法非常类似：匹配成功返回一个数组，匹配失败返回null。
  + 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果。
  + 设置正则表达式的lastIndex属性，对match方法无效，匹配总是从字符串的第一个字符开始。

+ String.prototype.search()
  + 字符串对象的search方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1。

+ String.prototype.replace()
  + 字符串对象的`replace`方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。
  + 正则表达式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。
  + replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容。
    + $&：匹配的子字符串。
    + $`：匹配结果前面的文本。
    + $'：匹配结果后面的文本。
    + $n：匹配成功的第n组内容，n是从1开始的自然数。
    + $$：指代美元符号$。
  + replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。
```js
//replace方法的一个应用，就是消除字符串首尾两端的空格。
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```

+ String.prototype.split()
  + 字符串对象的split方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。
  + 该方法接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。

+ RegExp实例继承的`toLocaleString() 和 toString()` 方法都会返回正则表达式的字面量，与创建的方式无关

### RegExp 构造函数属性

+ $1-9 可以访问捕获组的匹配项
  + `RegExp.$1`
+ input -> $_ : 最后搜索的字符串
+ lastMatch -> $& : 最后匹配的文本
+ lastParen -> $+ : 最后匹配的捕获组
+ leftContext -> S` : input 字符串中出现在 lastMatch 前面的文本
+ rightContext -> S' : input 字符串中出现在 lastMatch 后面的文本

### 模式的局限性
+ 不支持的特性：
  + 匹配字符串开始和结尾的\A 和\Z 但是支持以插入符号(^)和美元符号($)来匹配字符串的开始和结尾
  + 向后查找（lookbehind） 但支持向前查找（lookahead）
  + 并集和交集类
  + 原子组（atomic grouping）
  + Unicode 支持 （单个支付除外，如\uFFFF）
  + 命名的捕获组   但支持编号的捕获组
  + S(single, 单行) 和 x(free-spacing,无间隔) 匹配模式
  + 条件匹配
  + 正则表达式注释

## Function 函数部分

## 基本包装类型

+ 总结一下，这三个对象作为构造函数使用（带有new）时，可以将原始类型的值转为对象；
+ 作为普通函数使用时（不带有new），可以将任意类型的值，转为原始类型的值。

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

## Boolean 类型 不建议使用(new)

+ 当成函数调用可以进行布尔类型的转换

## Number 类型

### 静态属性

+ Number对象拥有以下一些静态属性（即直接定义在Number对象上的属性，而不是定义在实例上的属性）。
+ Number.POSITIVE_INFINITY：正的无限，指向Infinity。
+ Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
+ Number.NaN：表示非数值，指向NaN。
+ Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
+ Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
+ Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。
```js
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991
```

### 实例方法

+ Number.prototype.toString()
  + Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。
  + toString方法可以接受一个参数，表示输出的进制。
  + 如果省略这个参数，默认将数值先转为十进制，再输出字符串；
  + 否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。

+ Number.prototype.toFixed()
  + toFixed()方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
  + `let num = 10; num.toFixed(2); //"10.00" ` 转化为有两位小数的字符串
  + 小数位多时能自动舍入

+ Number.prototype.toExponential()
  + toExponential方法用于将一个数转为科学计数法形式。
  + `(10).toExponential()  // "1e+1"`
  + `(10).toExponential(2) // "1.00e+1"`
  + toExponential方法的参数是小数点后有效数字的位数，范围为0到100
  + 超出这个范围，会抛出一个 RangeError 错误。

+ Number.prototype.toPrecision()
  + Number.prototype.toPrecision()方法用于将一个数转为指定位数的有效数字。
```js
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

+ Number.prototype.toLocaleString() 
  + Number.prototype.toLocaleString()方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。

## String 类型

+ String类型的实例，都有一个length属性，表示字符串中包含多少个字符

### 实例方法
#### charAt()、charCodeAt()

+ String.prototype.charAt()
  + charAt方法返回指定位置的字符，参数是从0开始编号的位置。
```js
var s = new String('abc');
s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"
'abc'.charAt(1) // "b"
'abc'[1] // "b"
```

+ String.prototype.charCodeAt()
  + charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示）
  + 相当于String.fromCharCode()的逆操作。
```js
'abc'.charCodeAt(1) // 98
//上面代码中，abc的1号位置的字符是b，它的 Unicode 码点是98。
```

#### concat()、split()、join()、replace()

+ String.prototype.concat()
  + concat 方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
  + 该方法可以接受多个参数。
  + 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。
  + `let str = "hello ";   let result = str.concat("world","!");`

+ String.prototype.split(',') 
  + split 方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
  + 传入一个字符串，按照传入的字符串将使用方法的字符串分割为数组并返回
  + 如果省略参数，则返回数组的唯一成员就是原字符串。
  + split方法还可以接受第二个参数，限定返回数组的最大成员数。
  + ``str.split('').reverse().join('');`` 倒转字符串
  + `join`
    + 传入一个字符,按照传入的字符将数组连接为字符串
  + `replace` 替换
    + 替换符号
      + `$1-99` 匹配的子表达式
      + `$&` 匹配的字符串
      + `` $` `` 匹配字符串左侧文本
      + `$'` 匹配字符串右侧文本
      + `$$` 直接量符号
    + `replaceAll` 替换所有

#### slice()、substring()

+ String.prototype.slice()
  + slice() 方法用于从原字符串取出子字符串并返回，不改变原字符串。
  + 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
  + 省略第二个参数，则表示子字符串一直到原字符串结束。
  + 参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。
  + 第一个参数大于第二个参数（正数情况下），slice()方法返回一个空字符串。

+ String.prototype.substring()
  + substring 方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。
  + 它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）。
  + 省略第二个参数，则表示子字符串一直到原字符串的结束。
  + 第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
  + 参数是负数，substring方法会自动将负数转为0。

#### indexOf()、lastIndexOf()、trim()

+ String.prototype.indexOf()、String.prototype.lastIndexOf()
  + `indexOf() 和 lastIndexOf()`  查找指定字符串，返回索引位置，没找到返回`-1`
  + indexOf 方法用于确定一个字符串在另一个字符串中第一次出现的位置
  + 返回结果是匹配开始的位置。
  + indexOf 方法还可以接受第二个参数，表示从该位置开始向后匹配。
  + lastIndexOf() 从尾部开始匹配

+ String.prototype.trim()
  + trim 方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。
  + 该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。

#### toLowerCase()、toUpperCase()

+ String.prototype.toLowerCase()，String.prototype.toUpperCase()
  + toLowerCase 方法用于将一个字符串全部转为小写，
  + toUpperCase 则是全部转为大写。它们都返回一个新字符串，不改变原字符串。
  + `toLocaleLowerCase()`   针对特定地区实现
  + `toLocaleUpperCase()`   针对特定地区实现

#### match()、search()、replace()

+ String.prototype.match()
  + match 方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。
  + 如果没有找到匹配，则返回null。
  + 返回的数组还有 index 属性和 input 属性，分别表示匹配字符串开始的位置和原始字符串。
  + 可以利用正则匹配
```js
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null

var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"
```

+ String.prototype.search()，String.prototype.replace()
  + search 方法的用法基本等同于 match，但是返回值为匹配的第一个位置。
  + 如果没有找到匹配，则返回-1。
  + 可以利用正则匹配
  + replace 方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。


+ `localeCompare()` 方法
  + 比较两个字符串,并返回下列值中的一个
  + 如果字符串在字母表中应该排在字符串参数之前,则返回一个负数(大多情况下是 -1 )
  + 如果字符串等于字符串参数,则返回 0;
  + 如果字符串在字母表中应该排在字符串参数之后,则返回一个正数(大多情况下是 1 )
  + `let str = "yellow"; str.localeCompare("brick");  // 1 `

### 实例属性

+ String.prototype.length
  + 字符串实例的length属性返回字符串的长度。

### 静态方法

+ String.fromCharCode()
  + 接收一个或多个字符编码，转换为一个字符串

+ Base64 转码
  + 有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符
  + 所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。
  + `btoa()` 任意值转为 Base64 编码
  + `atob()` Base64 编码转为原来的值
  + 这两个方法不适合非 ASCII 码的字符，会报错。 `btoa('你好') // 报错`
```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

### 实例方法

+ valueOf()
  + valueOf()方法返回包装对象实例对应的原始类型的值。
+ toString()
  + toString()方法返回对应的字符串形式。
```js
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true

new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
```

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
  + ``值 = Math.floor(Math.random() * 96 + 5);`` 取5到100的数
  + 封装
```js
  function selectFrom(lowerValue,upperValue){
    let choices = upperValue - lowerValue + 1;
    return Math,floor(Math.random() * choices + lowerValue);
  }
  //数组随机排序
  arr.sort(function () { return 0.5 - Math.random() });
  ////创建1-50的随机整数
  parseInt(Math.random()*(50-1+1),10) 
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

# ES6 Number 的扩展

## 二进制和八进制表示法


+ ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b（或0B）和 0o（或0O）表示。
+ 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀 0 表示，ES6 进一步明确，要使用前缀0o表示。
+ 如果要将 0b 和 0o 前缀的字符串数值转为十进制，要使用 Number 方法。
```js
0b111110111 === 503 // true
0o767 === 503 // true
```

## Number.xxx
## isFinite(),isNaN()

+ ES6 在 Number 对象上，新提供了 Number.isFinite() 和 Number.isNaN() 两个方法。
+ Number.isFinite() 用来检查一个数值是否为有限的（finite），即不是 Infinity。
  + 如果参数类型不是数值，Number.isFinite 一律返回 false。

+ Number.isNaN() 用来检查一个值是否为 NaN。
  + 如果参数类型不是 NaN，Number.isNaN 一律返回 false。

+ 它们与传统的全局方法 isFinite() 和 isNaN() 的区别在于
+ 传统方法先调用 Number() 将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，
```js
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```

## parseInt(),parseFloat()

+ ES6 将全局方法 parseInt() 和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。
+ 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

## isInteger()

+ Number.isInteger() 用来判断一个数值是否为整数。
+ JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

+ 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，
+ 数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。
+ 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger 可能会误判。
+ `Number.isInteger(3.0000000000000002) // true`
+ 类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），
+ 即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger 也会误判。
```js
//总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
```

## EPSILON

+ ES6 在 Number 对象上面，新增一个极小的常量 Number.EPSILON。
+ 根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
+ Number.EPSILON 的实质是一个可以接受的最小误差范围。
```js
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

## 安全整数和 isSafeInteger()

+ JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点）
+ 超过这个范围，无法精确表示这个值。

+ ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量
+ 用来表示这个范围的上下限。
+ Number.isSafeInteger() 则是用来判断一个整数是否落在这个范围之内。
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

//函数的实现
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}
//实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
//因为超过安全范围的数值会以安全数极点进行储存，导致运算结果出错
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
```

# ES6 字符串的扩展

## 新增用法
### 字符的 Unicode 表示法

+ ES6 加强了对 Unicode 的支持，允许采用\U---形式表示一个字符，其中---表示字符的 Unicode 码点。
```js
"\u0061"  // "a"
//但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

"\uD842\uDFB7"  // "𠮷"

"\u20BB7" // " 7"
//上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），
//JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
```

+ ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
+ 大括号表示法与四字节的 UTF-16 编码是等价的。
```js
"\u{20BB7}" // "𠮷"
"\u{41}\u{42}\u{43}"  // "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

+ 有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。
```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

### 字符串的遍历器接口

+ ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"  // "o"  // "o"
```

+ 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"

//字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。
```

### 直接输入 U+2028 和 U+2029

+ JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。
```js
//“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式\u4e2d，两者是等价的。
'中' === '\u4e2d' // true

//JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）

//这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。
//这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
const json = '"\u2028"';
JSON.parse(json); // 可能报错

//JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
const PS = eval("'\u2029'");
//注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。
```

## JSON.stringify() 的改造

+ JSON 数据必须是 UTF-8 编码。
+ JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。

+ ES2019 改变了JSON.stringify()的行为。
+ 如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
```js
//改变前
JSON.stringify('\u{D834}') // "\u{D834}"

//改变后
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串
### 实例：模板编译

+ 生成正式模板
+ 该模板使用 <%...%> 放置 JavaScript 代码
+ 使用 <%= ... %> 输出 JavaScript 表达式。
```js
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

//一种思路是将其转换为 JavaScript 表达式字符串,进行模板的编译
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');
//使用正则的方式
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';

//将template封装在一个函数里面返回
let script =
`(function parse(data){
  let output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;

//将上面的内容拼装成一个模板编译函数compile
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

//compile函数的用法如下
let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

### 标签模板

+ 模板字符串的功能，不仅仅是上面这些。
+ 它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。
+ 这被称为“标签模板”功能（tagged template）。
+ 模板处理函数的第一个参数（模板字符串数组），还有一个raw属性。
  + raw 属性，保存的是转义后的原字符串。
```js
alert`hello`
// 等同于
alert(['hello'])
```
+ 标签模板其实不是模板，而是函数调用的一种特殊形式。
+ “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
+ 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
```js
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
//模板字符串前面有一个标识名tag，它是一个函数。
//整个表达式的返回值，就是 tag 函数处理模板字符串后的返回值。
//函数tag依次会接收到多个参数。
function tag(stringArr, value1, value2){
  // ...
}
// 等同于
function tag(stringArr, ...values){
  // ...
}
//tag函数的第一个参数是一个数组，成员是模板字符串中的字符部分   ['Hello ', ' world ', '']
//tag函数的其他参数，都是模板字符串各个变量被替换后的值     15, 50

function passthru(literals, ...values) {
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}

//例子
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}

msg // "The total is 30 (31.5 with tax)"
```

+ “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
```js
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
//sender变量往往是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义。
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
```

### 模板字符串的限制

+ ES2018 中放宽了转义的限制
+ 只在标签模板解析字符串时生效
+ 在无法转义时返回 undefined ，并且从 raw 属性中可以取到原始字符串

## 字符串的新增方法

### String.fromCodePoint()

+ ES5 提供 String.fromCharCode() 方法，用于从 Unicode 码点返回对应字符
+ 但是这个方法不能识别码点大于 0xFFFF 的字符。

+ ES6 提供了 String.fromCodePoint() 方法，可以识别大于 0xFFFF 的字符
+ 弥补了 String.fromCharCode() 方法的不足。

+ 如果 String.fromCodePoint 方法有多个参数，则它们会被合并成一个字符串返回。
```js
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

+ 注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

### String.raw()

+ 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
```js
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

//如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。
String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true
```

+ String.raw() 本质上是一个正常的函数,只是专用于模板字符串的标签函数
```js
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"

//作为函数，String.raw()的代码实现基本如下。
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

### 实例方法

### codePointAt()

+ JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
+ 对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

+ 这个方法用于正确的处理4个字节的字符，返回一个字符的码点。
+ codePointAt() 方法的参数，是字符在字符串中的位置（从 0 开始）
+ https://wangdoc.com/es6/string-methods.html#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Acodepointat

### normalize()

+ https://wangdoc.com/es6/string-methods.html#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Anormalize

### includes(), startsWith(), endsWith()

+ JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。
+ ES6 又提供了三种新方法。

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```js
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

//这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

### repeat()

+ repeat 方法返回一个新字符串，表示将原字符串重复n次。
+ 如果 repeat 的参数是负数或者 Infinity，会报错。
+ 如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。
+ 0 到-1 之间的小数，取整以后等于 -0，repeat 视同为 0。
+ NaN 等同于 0
+ 如果repeat的参数是字符串，则会先转换成数字。
```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
//参数如果是小数，会被取整。
'na'.repeat(2.9) // "nana"
```

### padStart()，padEnd()

+ ES2017 引入了字符串补全长度的功能。
+ 如果某个字符串不够指定长度，会在头部或尾部补全。
+ padStart() 用于头部补全
+ padEnd() 用于尾部补全。
+ 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
+ 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
+ 如果省略第二个参数，默认使用空格补全长度。

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

//padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

//另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### trimStart()，trimEnd()

+ ES2019 对字符串实例新增了 trimStart() 和 trimEnd() 这两个方法。
+ 它们的行为与 trim() 一致
+ trimStart() 消除字符串头部的空格
+ trimEnd() 消除尾部的空格。
+ 它们返回的都是新字符串，不会修改原始字符串。
+ 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
+ 浏览器还部署了额外的两个方法，trimLeft() 是 trimStart() 的别名，trimRight() 是trimEnd() 的别名。

### matchAll()

+ matchAll() 方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

### replaceAll()

+ 历史上，字符串的实例方法 replace() 只能替换第一个匹配。
```js
'aabbcc'.replace('b', '_')
// 'aa_bcc'
//如果要替换所有的匹配，不得不使用正则表达式的g修饰符。
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```

+ ES2021 引入了 replaceAll() 方法，可以一次性替换所有匹配。
+ 它的用法与 replace() 相同，返回一个新字符串，不会改变原字符串。
+ 如果 searchValue(搜索模式，匹配模式) 是一个不带有 g 修饰符的正则表达式，replaceAll() 会报错。

+ replaceAll() 的第二个参数 replacement 是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
  + $&：匹配的子字符串。
  + $`：匹配结果前面的文本。
  + $'：匹配结果后面的文本。
  + $n：匹配成功的第 n 组内容，n 是从 1 开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
  + $$：指代美元符号$。

+ replaceAll() 的第二个参数 replacement 除了为字符串，也可以是一个函数
该函数的返回值将替换掉第一个参数 searchValue 匹配的文本。
```js
//这个替换函数可以接受多个参数。
//第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'
//此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456



// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```

# ES6 Math 对象的扩展

+ ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

## Math.xxx
## trunc()

+ Math.trunc 方法用于去除一个数的小数部分，返回整数部分。
+ 对于非数值，Math.trunc 内部使用 Number 方法将其先转为数值。
+ 对于空值和无法截取整数的值，返回 NaN。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

## sign()

+ Math.sign 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
+ 它会返回五种值。
  + 参数为正数，返回 +1；
  + 参数为负数，返回 -1；
  + 参数为 0，返回 0；
  + 参数为 -0，返回 -0;
  + 其他值，返回 NaN。
+ 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回 NaN。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
```

## cbrt()

+ Math.cbrt() 方法用于计算一个数的立方根。
+ 对于非数值，Math.cbrt() 方法内部也是先使用 Number() 方法将其转为数值。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};
```

## clz32()

+ Math.clz32() 方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

//左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
//对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```

## imul()

+ Math.imul 方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
```js
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

//Math.imul方法可以返回正确的低位数值。
(0x7fffffff * 0x7fffffff)|0 // 0
/**
 * 上面这个乘法算式，返回结果为 0。
 * 但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，
 * 因为根据二进制乘法，计算结果的二进制最低位应该也是 1。
 * 这个错误就是因为它们的乘积超过了 2 的 53 次方，
 * JavaScript 无法保存额外的精度，就把低位的值都变成了 0。
 * */
//Math.imul方法可以返回正确的值 1。
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

## fround()

+ Math.fround 方法返回一个数的32位单精度浮点数形式。
+ 对于 NaN 和 Infinity，此方法返回原值。
+ 对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。
+ 如果参数的绝对值大于 224，返回的结果便开始丢失精度。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};
```

## hypot()

+ Math.hypot 方法返回所有参数的平方和的平方根。
+ 如果参数不是数值，Math.hypot 方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。

## 对数方法

+ ES6 新增了 4 个对数相关方法。

1. Math.expm1()
   + Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
```js
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
//模拟
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
```

2. Math.log1p()
   + Math.log1p(x) 方法返回 1 + x 的自然对数，即 Math.log(1 + x)。如果 x 小于 -1，返回 NaN。
```js
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
//模拟
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
```

3. Math.log10()
   + Math.log10(x) 返回以 10 为底的x的对数。如果 x 小于 0，则返回 NaN。
```js
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
//模拟
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
```

4. Math.log2()
   + Math.log2(x) 返回以 2 为底的 x 的对数。如果 x 小于 0，则返回 NaN。
```js
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29
//模拟
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
```

## 双曲函数方法

+ ES6 新增了 6 个双曲函数方法。

1. Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
2. Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
3. Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
4. Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
5. Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
6. Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

# ES6 RegExP 的扩展

+ RegExp.prototype.flags
+ 会返回正则表达式的修饰符。

## RegExp 构造函数

+ 在 ES5 中 RegExp 构造函数的参数有两种情况
```js
//第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

//第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

//ES5 不允许此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

//ES6 改变了这种行为。
new RegExp(/abc/ig, 'i').flags
// "i"
//原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
```

## 字符串的正则方法

+ 字符串对象共有 4 个方法，可以使用正则表达式：
  + match()、replace()、search() 和 split()。

+ ES6 将这 4 个方法，在语言内部全部调用 RegExp 的实例方法
+ 从而做到所有与正则相关的方法，全都定义在 RegExp 对象上。

+ String.prototype.match 调用 RegExp.prototype[Symbol.match]
+ String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
+ String.prototype.search 调用 RegExp.prototype[Symbol.search]
+ String.prototype.split 调用 RegExp.prototype[Symbol.split]

## u 修饰符

+ ES6 增加了 u 修饰符 ，含义为“Unicode 模式”。 用来正确处理大于\uFFFF的 Unicode 字符。
+ 可以正确处理四个字节的 UTF-16 编码

+ RegExp.prototype.unicode 属性
+ 正则实例对象新增 unicode 属性，表示是否设置了u 修饰符。

+ 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。

1. 点字符
   + 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。
   + 对于码点大于 0xFFFF 的 Unicode 字符，点字符不能识别，必须加上 u 修饰符。
   + 如匹配 UTF-16 的汉字时不加就无法识别， 在 UTF-16 中汉字占4个字节  UTF-8 占三个字节同样无法识别

2. Unicode 字符表示法
   + ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上 u 修饰符，才能识别当中的大括号，否则会被解读为量词。
```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
//如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。
```

3. 量词
   + 使用 u 修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
```js
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
```

4. 预定义模式
   + u 修饰符也影响到预定义模式，能否正确识别码点大于 0xFFFF 的 Unicode 字符。
   + \S 是预定义模式，匹配所有非空白字符。
   + 只有加了u修饰符，它才能正确匹配码点大于 0xFFFF 的 Unicode 字符。
```js
//利用这一点，可以写出一个正确返回字符串长度的函数。
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
var s = '𠮷𠮷';
s.length // 4
codePointLength(s) // 2
```

5. i 修饰符
   + 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B 与 \u212A 都是大写的 K。
   + 不加u修饰符，就无法识别非规范的 K 字符。

6. 转义
   + 没有 u 修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在 u 模式会报错。
```js
/\,/ // /\,/
/\,/u // 报错
//没有u修饰符时，逗号前面的反斜杠是无效的，加了u修饰符就报错。
```

## y 修饰符

+ ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。

+ RegExp.prototype.sticky 属性
+ 表示是否设置了 y 修饰符。

+ y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
+ 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]
r1.exec(s) // ["aa"]
r2.exec(s) // null
//保证每次都能头部匹配，y修饰符就会返回结果了。
var r = /a+_/y;
r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
```

+ y 修饰符同样遵守 lastIndex 属性，但是要求必须在 lastIndex 指定的位置发现匹配。

## s 修饰符：dotAll 模式

+ 行终止符
  + 就是该字符表示一行的终结。以下四个字符属于“行终止符”。
  + U+000A 换行符（\n）
  + U+000D 回车符（\r）
  + U+2028 行分隔符（line separator）
  + U+2029 段分隔符（paragraph separator）
+ ES2018 引入s修饰符，使得.可以匹配任意单个字符。
+ 这被称为 dotAll 模式，即点（dot）代表一切字符。
+ 所以，正则表达式还引入了一个 dotAll 属性，返回一个布尔值，表示该正则表达式是否处在 dotAll 模式。
+ /s 修饰符和多行修饰符 /m 不冲突，两者一起使用的情况下，. 匹配所有字符，而 ^ 和 $ 匹配每一行的行首和行尾。

## 后行断言

+ JavaScript 语言的正则表达式，只支持先行断言
+ ES2018 引入后行断言
+ “先行断言”指的是，x 只有在 y 前面才匹配，必须写成 /x(?=y)/。
+ 比如，只匹配百分号之前的数字，要写成 /\d+(?=%)/
+ “先行否定断言”指的是 x 只有不在 y 前面才匹配，必须写成/x(?!y)/。
+ 只匹配不在百分号之前的数字，要写成 /\d+(?!%)/。

+ “后行断言”正好与“先行断言”相反，x 只有在 y 后面才匹配，必须写成/(?<=y)x/。
+ 只匹配美元符号之后的数字，要写成 /(?<=\$)\d+/
+ “后行否定断言”则与“先行否定断言”相反，x 只有不在 y 后面才匹配必须写成 /(?<!y)x/
+ 比如，只匹配不在美元符号后面的数字，要写成 /(?<!\$)\d+/。

## Unicode 属性类

+ ES2018 引入了一种新的类的写法 \p{...} 和 \P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。
+ \p{Script=Greek} 指定匹配一个希腊文字母，所以匹配 π 成功。
+ \p{Number} 甚至能匹配罗马数字。
+ \P{…} 是 \p{…} 的反向匹配，即匹配不满足条件的字符。
+ 注意，这两种类只对 Unicode 有效，所以使用的时候一定要加上u修饰符。如果不加u修饰符，正则表达式使用\p和\P会报错，ECMAScript 预留了这两个类。
```js
//例子
// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
```

## 具名组匹配

+ 正则表达式使用圆括号进行组匹配。
```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
//正则表达式里面有三组圆括号。使用exec方法，就可以将这三组匹配结果提取出来。
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

+ 组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如matchObj[1]）引用，要是组的顺序变了，引用的时候就必须修改序号。
+ ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
+ 如果具名组没有匹配，那么对应的 groups 对象属性会是 undefined。
+ 设置的键名始终存在
```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
//“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>）
//然后就可以在 exec 方法返回结果的 groups 属性上引用该组名。
//同时，数字序号（matchObj[1]）依然有效。
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

### 解构赋值和替换

+ 有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。
```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

//字符串替换时，使用$<组名>引用具名组。
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
//replace方法的第二个参数是一个字符串，而不是正则表达式。

/**
 * replace方法的第二个参数也可以是函数，该函数的参数序列如下。
 * */
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = groups;
 return `${day}/${month}/${year}`;
});
```

## 引用

+ 如果要在正则表达式内部引用某个“具名组匹配”，可以使用 [\k<组名>] 的写法。
```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/; //数字引用（\1）依然有效。可以同时使用
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

## 正则匹配索引

+ 正则匹配结果的开始位置和结束位置，目前获取并不是很方便。
+ 正则实例的 exec() 方法，返回结果有一个 index 属性，可以获取整个匹配结果的开始位置，但是如果包含组匹配，每个组匹配的开始位置，很难拿到。
+ 现在有一个第三阶段提案，为 exec() 方法的返回结果加上 indices 属性，在这个属性上面可以拿到匹配的开始位置和结束位置。
```js
const text = 'zabbcdef';
const re = /ab/;
const result = re.exec(text);

result.index // 1
result.indices // [ [1, 3] ]
//注意，开始位置包含在匹配结果之中，但是结束位置不包含在匹配结果之中。
//比如，匹配结果为ab，分别是原始字符串的第1位和第2位，那么结束位置就是第3位。

//如果正则表达式包含组匹配，那么indices属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置。
const re = /ab+(cd)/;
const result = re.exec(text);

result.indices // [ [ 1, 6 ], [ 4, 6 ] ]
//正则表达式包含一个组匹配，那么indices属性数组就有两个成员
//第一个成员是整个匹配结果（abbcd）的开始位置和结束位置，第二个成员是组匹配（cd）的开始位置和结束位置。

//如果正则表达式包含具名组匹配，indices属性数组还会有一个groups属性。该属性是一个对象，可以从该对象获取具名组匹配的开始位置和结束位置。
const re = /ab+(?<Z>cd)/;
const result = re.exec(text);

result.indices.groups // { Z: [ 4, 6 ] }
```

## String.prototype.matchAll()

+ 如果一个正则表达式在字符串里面有多个匹配，现在一般使用 g 修饰符或 y 修饰符，在循环里面逐一取出。
```js
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
//while循环取出每一轮的正则匹配，一共三轮。
```

+ ES2020 增加了 String.prototype.matchAll() 方法，可以一次性取出所有匹配。
+ 不过，它返回的是一个遍历器（Iterator），而不是数组。
```js
const string = 'test1test2test3';
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// 由于string.matchAll(regex)返回的是遍历器，所以可以用 for...of 循环取出。
//相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。
//遍历器转为数组是非常简单的，使用...运算符和Array.from()方法就可以了。

// 转为数组的方法一
[...string.matchAll(regex)]

// 转为数组的方法二
Array.from(string.matchAll(regex))
```

# 类型变换

## 自动转换

+ 有三种情况 js 会完成自动转换
  + 第一种情况，不同类型的数据互相运算。
  + 第二种情况，对非布尔值类型的数据求布尔值。
  + 第三种情况，对非数值类型的值使用一元运算符（即 + 和 - ）。

+ 自动转换规则
  + 预期什么类型的值，就调用该类型的转换函数
  + 比如，某个位置预期为字符串，就调用String函数进行转换
  + 由于自动转换具有不确定性，而且不易除错，
  + 在预期为布尔值、数值、字符串的地方，全部使用Boolean、Number和String函数进行显式转换。

## 数据类型判断

+ typeof
  + 主要用于判断基本类型
+ instanceof
  + 判断对象原型

## typeof

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

## instanceof

+ 判断对象的构造函数 来确定类型
+ `result = target instanceof constructor`
+ 如果变量给定引用类型的实例，那么`instanceof`操作符就会返回`true`
+ 所有引用类型的值都是 Object 的实例， 所以判断 Object 是构造函数时都会返回 true
+ 判断基本类型始终会返回 false 因为基本类型不是对象
+ 但有两个全局作用域的情况判断不会很准确

# 变量和常量

+ 常量 (值不可以改变的) 和 变量
+ 变量
  + 变量是数据的“命名存储”。
  + 在声明变量但是赋值前,默认值为`undefined` 
+ **定义变量可以使用三种关键字：var / let / const**
  + 变量名称必须仅包含 **「字母，数字，符号」** `$` 和 `_`。
  + 首字符必须 **「非数字」**。
  + 常量一般用全大写，如 `const PI = 3.141592` ；
  + 使用易读的命名，比如 `userName` 或者 `shoppingCart`。

## let 和 const 命令

+ 共同特点
  + 作用于块级作用域
  + 不存在变量提升
  + 暂时性死区
  + 不允许重复声明
  + 不会成为顶层对象的属性

+ const 命令(常量)
  + 在声明时必须初始化，不可对其重新赋值(也就是不可修改变量所指向的内存地址)
  + 如需声明冻结的对象，可以这样 `const foo = Object.freeze({});`
```js
//特性
const foo = {};
foo.prop=123; // 为foo添加一个属性
foo={}// 将 foo 指向另一个对象, ! 报错
//可以修改其内容,但是不可修改其本身,也就是将它指向另一个对象

//彻底冻结对象的函数
var AllFreeze = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      AllFreeze( obj[key] );
    }
  });
};
```

+ do 表达式
  + 块级作用域是一个语句，将多个操作封装在一起，没有返回值。使用 do 表达式,使得块级作用域可以变为表达式，也就是说可以返回值；
  + ```js
    let x = do{
     let t = f();
      t * t + 1;
    }//变量x会得到整个块级作用域的返回值
    ```

## 为什么需要块级作用域

+ 防止在代码块中声明变量覆盖局部变量
+ 避免计数的循环变量泄露为全局变量
```js
//内层变量可能会覆盖外层变量。
var name = "MGT360124";
  function getName(){
    console.log(name);
    var name="YSS360124"
}
getName();//undefined

//用来计数的循环变量泄露为全局变量。
for(var i=0;i<5;i++){
}
console.log(i);//5
```

## ES6中的块级作用域

+ let 实际上为 JavaScript 新增了块级作用域。
+ 块级作用域可以随意嵌套
+ 不在需要使用立即执行函数的 IIFE 写法  `(function(){}());`
+ 允许在块级作用域中声明函数，不推荐，如需声明应使用函数表达式的形式
+ 块级作用域必须使用大括号{}
```js
{let name = "MGT360124";}
name; //报错   这就是块级作用域

//作用域嵌套
  {{{{
    {let insane = 'Hello World'}
    console.log(insane); // 报错
  }}}};
```

## 在ES6中有六中变量声明的方式

+ var
+ function
+ let
+ const
+ import
+ class

## 暂时性死区（TDZ）

+ 因为 let 命令和 const 命令声明的变量不会发生变量提升，所以在声明前使用都会报错，
+ 这种情况一般发生在，外部作用域声明了一个变量，而内部作用域也声明了一个同样的变量
+ 因为内部的声明，外部作用域中声明的相同变量就无法在内部中生效
+ 如果此时在内部变量声明前调用该变量就会出错，该变量声明前的区域就称为暂时性死去（TDZ）。

+ 在死区中使用 typeof 操作符也会导致报错。
+ 如在声明之前就对变量使用 typeof 操作符

+ 死区例子
```js
function bar(x = y, y = 2) {
  return [x, y];
}
//x 在赋值时 y 还没有被声明,所以报错
bar(); // 报错

function bar(x = 2, y = x) {
  return [x, y];
}
//y 在赋值时 x 已经声明所以可以运行
bar(); // [2, 2] // 不报错

var x = x;
// 报错
let x = x;
// ReferenceError: x is not defined
```

## 顶层对象属性

+ 顶层对象在浏览器中指的是 window 对象
+ 在 Node 中指的是 global 对象

+ 在 ES5 中顶层对象的属性与全局变量是等价的。
+ 隐式声明的变量也会成为顶层对象的属性。

+ ES6 中为了保持兼容性，var 和 function 声明的全局变量依旧会成为顶层对象的属性，
+ 但是 let 、 const 、 class 命令声明的全局变量不会成为顶层对象的属性
+ 也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
```js
var name="MGT360124";
window.name;//MGT360124

let age=18;
window.age;//undefined
```

## globalThis 对象

+ JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。
+ 但是，顶层对象在各种实现里面是不统一的。
  + 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有window。
  + 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
  + Node 里面，顶层对象是 global，但其他环境都不支持。

+ 同一段代码要能够在各种环境中都能取到顶层对象，现在一般使用 this 变量。但是有局限性
  1. 全局环境中，this 会返回顶层对象。但是，Node.js 模块中 this 返回的是当前模块
  1. ES6 模块中 this 返回的是 undefined。
  2. 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。
  2. 但是，严格模式下，这时 this 会返回 undefined。
  3. 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。
  3. 但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 `eval、new Function`这些方法都可能无法使用。

+ ES2020 在语言标准的层面，引入 globalThis 作为顶层对象。
+ 也就是说，任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this。
+ 垫片库 global-this 模拟了这个提案，可以在所有环境拿到 globalThis。

```js
//都能取到顶层对象勉强可行的方法
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

# 变量的解构赋值

+ 解构失败的变量值等于 undefined
+ 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
+ 由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。
```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

## 数组的结构赋值

### 基本用法

+ ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
```js
//以前，为变量赋值，只能直接指定值。
let a = 1;
let b = 2;
let c = 3;

//ES6 允许写成下面这样。
let [a, b, c] = [1, 2, 3];

//嵌套
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
+ 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
+ 如果赋值不成功值就会等于 undefined
+ 不是数组解构就会报错，是数组但解构不完全相等也能成功

```js
//不成功的例子
let [foo] = [];
let [bar, foo] = [1];

//这种结构不完全相等的情况下解构依然成功
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

+ 对于 Set 结构，也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
//上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
```

### 默认值

+ 解构赋值允许指定默认值
+ es6 内部使用严格相(===)运算符，判断一个位置是否有值，所以，只有一个数组成员严格等于 undefined ，默认值才能生效
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

//严格等于 undefined
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

+ 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```js
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
//因为x能取到值，所以 f() 不会执行。
//上面代码等价于
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

+ 解构赋值可以引用其他变量，但该变量必须已经声明
```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

## 对象的解构赋值

+ 解构赋值也能够应用在对象上
```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```
+ 数组的解构是按照次序排列的，但是对象的属性没有次序，变量必须与属性同名才能够成功取到值。

+ 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
```js
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
```

+ 如果变量名与属性名不一致，必须写成下面这样。
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

//这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
//也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
//上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

//与数组一样，解构也可以用于嵌套结构的对象。
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
//注意，这时 p 是模式，不是变量，因此不会被赋值
//如果p也要作为变量赋值，可以写成下面这样。
let { p, p: [x, { y }] } = obj;
```
+ 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
+ 注意，对象的解构赋值可以取到继承的属性。
```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"
```

### 默认值

+ 对象的解构也可以指定默认值。
+ 默认值生效的条件是，对象的属性值严格等于undefined。
```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

+ 注意点
  + 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error

/** 上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
 * 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
 */

// 正确的写法
let x;
({x} = {x: 1});
```
  + 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
```js
({} = [true, false]);
({} = 'abc');
({} = []);
//上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
```
  + 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3

//上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。
//方括号这种写法，属于“属性名表达式”（参见《对象的扩展》一章）。
```

## 字符串的解构赋值

+ 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5
```

## 数值和布尔值的解构赋值

+ 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
//数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
```

## 函数参数的解构赋值

+ 函数的参数也可以使用解构赋值。
```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
//函数 add 的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量 x 和 y。
//对于函数内部的代码来说，它们能感受到的参数就是 x 和 y。

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

+ 函数参数的解构也可以使用默认值。
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
//上面代码中，函数 move 的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。
//注意，下面的写法会得到不一样的结果。
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
//上面代码是为函数 move 的参数指定默认值，而不是为变量 x 和 y 指定默认值，所以会得到与前一种写法不同的结果。

//undefined就会触发函数参数的默认值。
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

## 圆括号问题

+ 解构赋值虽然很方便，但是解析起来并不容易。
+ 对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

+ 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
+ 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 不得使用圆括号的情况

1. 变量声明语句
```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
// 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。
```

2. 函数参数
   + 函数参数也属于变量声明，因此不能带有圆括号。
```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

3. 赋值语句的模式
   + 对象解构中的模式
```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
//上面代码将整个模式放在圆括号之中，导致报错。

// 报错
[({ p: a }), { x: c }] = [{}, {}];
//上面代码将一部分模式放在圆括号之中，导致报错。
```

### 可以使用圆括号的情况

+ 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

## 用途

1. 交换变量的值
```js
let x = 1;
let y = 2;
//交换变量不需要在借助第三方变量
[x, y] = [y, x];
```

2. 从函数返回多个值
   + 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
   + 有了解构赋值，取出这些值就非常方便。
```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {foo: 1,bar: 2};
}
let { foo, bar } = example();
```

3. 函数参数的定义
   + 解构赋值可以方便地将一组参数与变量名对应起来
```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

4. 提取 JSON 数据
   + 解构赋值对提取 JSON 对象中的数据，尤其有用。
```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5. 函数参数的默认值
```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
//指定参数的默认值，就避免了在函数体内部再写 var foo = config.foo || 'default foo';这样的语句。
```

6. 遍历 Map 结构
   + 任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。
   + Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

//如果只想获取键名，或者只想获取键值，可以写成下面这样。
// 获取键名
for (let [key] of map) {/* ...*/}
// 获取键值
for (let [,value] of map) {/* ...*/}
```

7. 输入模块的指定方法
   + 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

# 数据类型

+ `bigint` 用于任意长度的整数。
+ `symbol` 用于唯一的标识符。
+ `string` 

## symbol

+ 符号是原始值，且符号实例是唯一的、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突

+ 符号的使用
  + 符号需要使用 `Symbol()` 函数初始化 ， 因为符号本身是原始类型， 所以 typeof 操作符对符号返回 symbol
  + Symbol 函数不能用*构造函数的方式*(new)调用,想要使用符号的包装对象 `Object(Symbol());`
  + Symbol 值不能进行运算
  + Symbol函数可以接受一个字符串参数作为返回符号的描述。将来可以通过这个字符串来调试代码，但这个字符串与符号定义或标记完全无关
```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2.toString() // "Symbol(bar)"
- Symbol 值可以显式转为字符串。
- 另外，Symbol 值也可以转为布尔值，但是不能转为数值。
let sym = Symbol();
Boolean(sym) // true


const sym = Symbol('foo');  // sym 的描述就是字符串 foo。
// 但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。
String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"
- 上面的用法不是很方便。ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。
sym.description // "foo"
```

### 作为属性名的 Symbol

+ 由于每一个 Symbol 值都不相等，所以可以作为标识符，用于对象的属性名，保证不会出现同名的属性，防止不小心被篡改，或覆盖
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```
+ 注意，Symbol 值作为对象属性名时，不能用点运算符。
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
// 因为点运算符后面总是字符串，所以不会读取 mySymbol 作为标识名所指代的那个值
// 导致 a 的属性名实际上是一个字符串，而不是一个 Symbol 值。

- 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
- Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
- Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
```

### 实例：消除魔术字符串

+ 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
+ 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
//字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
```

+ 常用的消除魔术字符串的方法，就是把它写成一个变量。
```js
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```
+ 我们把 Triangle 写成 shapeType 对象的 triangle 属性，这样就消除了强耦合。
+ 如果仔细分析，可以发现 shapeType.triangle 等于哪个值并不重要，只要确保不会跟其他 shapeType 属性的值冲突即可。
+ 因此，这里就很适合改用 Symbol 值。
```js
const shapeType = {
  triangle: Symbol()
};
```

### 属性名的遍历

+ Symbol 作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，
+ 也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。

+ 但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols() 方法，可以获取指定对象的所有 Symbol 属性名。
+ 该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
```js
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

+ Reflect.ownKeys() 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

+ 由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
```js
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
// 对象 x 的 size 属性是一个 Symbol 值，所以 Object.keys(x)、Object.getOwnPropertyNames(x) 都无法获取它。这就造成了一种非私有的内部方法的效果。
```

### Symbol.xxx()
### for(),keyFor()

+ 重新使用同一个 Symbol 值，Symbol.for() 方法可以做到这一点。
+ Symbol.for(string) 会将一个符号注册到**全局注册表**中,通过传入的 string 进行搜索
  + 运行时会检查注册表是否已经有对应的符号
  + 有则返回,无则新建一个符号添加到注册表中并返回
```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```

+ Symbol.keyFor(Symbol) 方法返回一个已登记的 Symbol 类型值的 key(描述)。
+ 注意，Symbol.for() 为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
+ Symbol.for() 的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

### 实例：模块的 Singleton(单例) 模式

+ Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
+ 对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？
+ 很容易想到，可以把实例放到顶层对象 global。
```js
// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;

// 加载上面的 mod.js
const a = require('./mod.js');
console.log(a.foo);
// 变量 a 任何时候加载的都是 A 的同一个实例。

// 但是，这里有一个问题，全局变量 global._foo 是可写的，任何文件都可以修改。
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);
// 上面的代码，会使得加载mod.js的脚本都失真。

// 为了防止这种情况出现，我们就可以使用 Symbol。
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
// 上面代码中，可以保证 global[FOO_KEY] 不会被无意间覆盖，但还是可以被改写。

global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');

// 如果键名使用 Symbol 方法生成，那么外部将无法引用这个值，当然也就无法改写。
// mod.js    每一次重新运行都会躲到不一样的值，虽然 Node 会缓存脚本的执行结果，但是用户可以手动清除，所以也不是绝对可靠的
const FOO_KEY = Symbol('foo');
```

### 内置的 Symbol 值

+ 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
+ 内置符号最重要的用途之一是重新定义他们，从而改变原生结构的行为
+ 符号在规范中的名称，前缀为 @@ ， @@iterator  指的就是 Symbol.iterator
+ Symbol.asyncIterator
  + 这个符号作为一个属性表示：“ 一个方法，该方法返回对象默认的 AsyncIterator（异步迭代器）。由 for-await-of 语句使用。“ 这个符号表示实现异步迭代器 API 的函数

### 1. Symbol.hasInstance

+ 对象的 Symbol.hasInstance 属性，指向一个内部方法。
+ 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。
+ 比如，foo instanceof Foo 在语言内部，实际调用的是 Foo[Symbol.hasInstance](foo)。
```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
[1, 2, 3] instanceof new MyClass() // true
// 该实例的 Symbol.hasInstance 方法，会在进行 instanceof 运算时自动调用，判断左侧的运算子是否为 Array 的实例。

// 例子
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

### 2. Symbol.isConcatSpreadable

+ 对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于 Array.prototype.concat() 时，是否可以展开。
+ 数组的默认行为是可以展开。类似数组的对象正好相反，默认不展开。
+ Symbol.isConcatSpreadable 属性也可以定义在类里面。
```js
let arr1 = ['c', 'd']; // 数组默认可以展开
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd']; // 不可展开
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// 定义在类中
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
// 类 A1 是可展开的，类 A2 是不可展开的，所以使用 concat 时有不一样的结果。
// Symbol.isConcatSpreadable 的位置差异，A1 是定义在实例上，A2 是定义在类本身，效果相同。
```

### 3. Symbol.species

+ 对象的 Symbol.species 属性，指向一个构造函数。创建衍生对象时，会使用该属性。
```js
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true
```
+ 子类 MyArray 继承了父类 Array，a 是 MyArray 的实例，b 和 c 是 a 的衍生对象。
+ b 和 c 都是调用数组方法生成的，所以应该是数组（ Array 的实例），但实际上它们也是 MyArray 的实例。
+ Symbol.species 属性就是为了解决这个问题而提供的。现在，我们可以为 MyArray 设置 Symbol.species 属性。
```js
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
// 由于定义了 Symbol.species 属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。

- 这个例子也说明，定义 Symbol.species 属性要采用 get 取值器。默认的 Symbol.species 属性等同于下面的写法。
static get [Symbol.species]() {
  return this;
}

class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
// a.map(x => x) 生成的衍生对象，就不是 MyArray 的实例，而直接就是 Array 的实例。

// 例子
class T1 extends Promise {
}

class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

new T1(r => r()).then(v => v) instanceof T1 // true
new T2(r => r()).then(v => v) instanceof T2 // false
// T2 定义了 Symbol.species 属性，T1 没有。结果就导致了创建衍生对象时（then方法），T1 调用的是自身的构造方法，而 T2 调用的是 Promise 的构造方法。
```

+ Symbol.species 的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。
+ 它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

### 4. 正则方法

1. Symbol.match
   + 对象的 Symbol.match 属性，指向一个函数。当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值。
   + 表示：一个正则表达式方法，该方法用正则表达式去匹配字符串，由 String.prototype.match() 方法使用
```js
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

2. Symbol.replace
   + 对象的 Symbol.replace 属性，指向一个方法，当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回值。
```js
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
//Symbol.replace 方法会收到两个参数，第一个参数是 replace 方法正在作用的对象，上面例子是 Hello，第二个参数是替换后的值，上面例子是 World。
```

1. Symbol.search
   + 对象的 Symbol.search 属性，指向一个方法，当该对象被 String.prototype.search 方法调用时，会返回该方法的返回值。
```js
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

1. Symbol.split
   + 对象的 Symbol.split 属性，指向一个方法，当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值。
```js
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)

// 例子
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substring(0, index),
      string.substring(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'
```

### 5. Symbol.iterator

+ 对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法。
```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
// 对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器，
```

### 6. Symbol.toPrimitive

+ 对象的 Symbol.toPrimitive 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
+ Symbol.toPrimitive 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
  + Number：该场合需要转成数值
  + String：该场合需要转成字符串
  + Default：该场合可以转成数值，也可以转成字符串
```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

### 7. Symbol.toStringTag

+ 对象的 Symbol.toStringTag 属性，指向一个方法。
+ 在该对象上面调用 Object.prototype.toString 方法时，如果这个属性存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型。
+ 也就是说，这个属性可以用来定制 [object Object] 或 [object Array] 中 object 后面的那个字符串。
```js
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

+ ES6 新增内置对象的 Symbol.toStringTag 属性值如下。
  + JSON[Symbol.toStringTag]：'JSON'
  + Math[Symbol.toStringTag]：'Math'
  + Module 对象M[Symbol.toStringTag]：'Module'
  + ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
  + DataView.prototype[Symbol.toStringTag]：'DataView'
  + Map.prototype[Symbol.toStringTag]：'Map'
  + Promise.prototype[Symbol.toStringTag]：'Promise'
  + Set.prototype[Symbol.toStringTag]：'Set'
  + %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
  + WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
  + WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
  + %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
  + %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
  + %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
  + Symbol.prototype[Symbol.toStringTag]：'Symbol'
  + Generator.prototype[Symbol.toStringTag]：'Generator'
  + GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

### 8. Symbol.unscopables

+ 对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

## BigInt 数据类型

+ JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。
+ 一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），
+ 大于这个范围的整数，JavaScript 是无法精确表示的，
+ 这使得 JavaScript 不适合进行科学和金融方面的精确计算。
+ 二是大于或等于 2 的 1024 次方的数值，JavaScript 无法表示，会返回 Infinity。
```js
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
```

+ ES2020 引入了一种新的数据类型 BigInt（大整数）,来解决这个问题，这是 ECMAScript 的第八种数据类型。
+ BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
+ 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀 n。
+ BigInt 同样可以使用各种进制表示，都要加上后缀n。
+ typeof 运算符对于 BigInt 类型的数据返回 bigint。
+ JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。现在支持大整数了，就可以算了
```js
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n

//BigInt 与普通整数是两种值，它们之间并不相等。
42n === 42 // false

//BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n // 正确
+42n // 报错

const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000
```

### BigInt 对象

+ JavaScript 原生提供 BigInt 对象，可以用作构造函数生成 BigInt 类型的数值。
+ 转换规则基本与 Number() 一致，将其他类型的值转为 BigInt。
```js
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

//BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
//上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。
//参数如果是小数，也会报错。
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
```

+ BigInt 对象继承了 Object 对象的两个实例方法。
  + BigInt.prototype.toString()
  + BigInt.prototype.valueOf()
+ 还继承了 Number 对象的一个实例方法。
  + BigInt.prototype.toLocaleString()
+ 还提供了三个静态方法。 (^ 表示上标)
  + BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2^width - 1 之间对应的值。
  + BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2^width - 1 到 2^width - 1 - 1 之间对应的值。
  + BigInt.parseInt(string[, radix])：近似于 Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
```js
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max)
// 9223372036854775807n
BigInt.asIntN(64, max + 1n)
// -9223372036854775808n
BigInt.asUintN(64, max + 1n)
// 9223372036854775808n
//max是64位带符号的 BigInt 所能表示的最大值。
//如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。
//而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。
//max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃
```

### 转换规则

+ 可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。
+ 取反运算符（!）也可以将 BigInt 转为布尔值。
```js
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
//转为字符串时后缀n会消失。
```

### 数学运算

+ 数学运算方面，BigInt 类型的 `+、-、* 和**` 这四个二元运算符，与 Number 类型的行为一致。
+ 除法运算 `/` 会舍去小数部分，返回一个整数。
+ BigInt 不能与普通数值进行混合运算。

+ 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。
  + 不带符号的右移位运算符 >>>
  + 一元的求正运算符 +
+ 上面两个运算符用在 BigInt 会报错。
+ 前者是因为 >>> 运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符 >>。
+ 后者是因为一元运算符 + 在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定 +1n 会报错。

### 其他运算

+ BigInt 对应的布尔值，与 Number 类型一致，即 0n 会转为 false，其他值转为 true。
+ 比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。
+ BigInt 与字符串混合运算时，会先转为字符串，再进行运算。

## 模板字符串

+ 模板字符串通过 (`) 反引号来表示
+ 可以当做普通字符串使用，也可以用来定义多行字符串，或是字字符串总嵌入变量
+ 插入表达式或变量  （ ${value} ）
  + 不仅能够嵌入变量，还能够放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
  + 模板字符串之中还能调用函数。
  + 如果大括号中的值不是字符串，将按照一般的规则转为字符串。
  + 所有插入的值都会使用 `toString()` 强制转型为字符串   对象可以重写 `toString()` 方法
  + 嵌套的字符串不用转义
  + 插值表达式可以调用函数和方法
  + 还可以插入当前变量  ``let str = `${str}value`;``
  + 未声明的变量将报错

+ 在字符串中使用反引号需要使用反斜杠进行转义。
+ 多行字符串的空格和缩进都会被保留在输出中。
+ 如果不想保留缩进和换行可以使用  ``   `string`.trim()   ``  trim() 方法进行消除。

+ 模板字符串特性
  + 字符串保留字符字面量 （即空格或换行等制表符）

```js
//如果需要引用模板字符串本身，在需要时执行，可以写成函数。
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
//模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。
```

+ 模板字符串甚至还能嵌套。
```js
const tmpl = adds => `
  <table>
  ${adds.map(addr => `
    <tr><td>${add.first}</td></tr>
    <tr><td>${add.last}</td></tr>
  `).join('')}
  </table>
`;
```

## 模板字符标签函数

+ 模板字面量标签函数 ` simple(strings, ...expressions) `
  + 第一个参数为字符串数组，数组长度为插入值个数加 1 ， 也就是参数个数 `n` ，长度为 `n+1`
```js
//模板字面量标签函数，调用
function simple(strings, ...expressions) {
   log(strings);
   for (const expression of expressions) {
      log(expression);
   }
}
simple`我${6}是${9}NiceYuan${6 + 9}`;
//这个调用的第一个参数 strings 数组：['我'，'是', 'NiceYuan', '']
/*
[ '我', '是', 'NiceYuan', '' ]
6
9
15

ToDo 参数 strings 是一个数组 插入值个数为 n 则数组长度为 n+1
插入值在字符串两边没有字符的话会插入 '' 空字符串
// ${6}是${9}NiceYuan${6 + 9}
[ '', '是', 'NiceYuan', '' ]
// 我${6}是${9}NiceYuan
[ '我', '是', 'NiceYuan' ]
*/
```

---

+ 原始字符
  + 也就是不进行默认的转义显示,如 `\n` 为换行符 - 直接输出 `\n` 而不是换行符
  + 通过标签函数 `` String.raw`\n` `` 来进行输出
  + 也可通过标签函数中第一个参数字符串数组的 raw 属性来获取原始字符
