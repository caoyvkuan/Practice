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


## let 和 const 命令

+ 共同特点
  + 作用于块级作用域
  + 不存在变量提升
  + 暂时性死区
  + 不允许重复声明
  + 不会成为顶层对象的属性

+ const 命令
  + 在声明时必须初始化，基本类型值不可更改，应用类型不可更改起指向，但可以更改其内容
  + 代表常量
  + 其他基本与 let 相同
  + const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
  + 如需声明冻结的对象，可以这样 `const foo = Object.freeze({});`
```js
//特性
const foo = {};
foo.prop=123;//为foo添加一个属性
foo.prop;//123
foo={}//将foo指向另一个对象,就会报错
//可以修改其内容,但是不可修改其本身,也就是将它指向另一个对象

//彻底冻结对象的函数
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

+ do表达式

  + 块级作用域是一个语句，将多个操作封装在一起，没有返回值。使用do表达式,使得块级作用域可以变为表达式，也就是说可以返回值；

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
  + 该函数不能用构造函数的方式调用 想要使用符号的包装对象 `Object(Symbol());`
  + Symbol 函数前不能使用 new 命令，否则会报错。
  + Symbol 值不能与其他类型的值进行运算，会报错。
  + 在调用该函数时可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码，但这个字符串并与符号定义或标记完全无关
  + 创建 Symbol 的时候，可以添加一个描述。
```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
- Symbol 值可以显式转为字符串。
- 另外，Symbol 值也可以转为布尔值，但是不能转为数值。
let sym = Symbol();
Boolean(sym) // true



const sym = Symbol('foo');
// sym 的描述就是字符串 foo。
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
+ 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
+ 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```

+ Symbol.for() 与 Symbol() 这两种写法，都会生成新的 Symbol。
+ 它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
+ Symbol.for() 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。
+ 比如，如果你调用 Symbol.for("cat") 30 次，每次都会返回同一个 Symbol 值，但是调用 Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
```js
Symbol.for("bar") === Symbol.for("bar"); //登记
// true

Symbol("bar") === Symbol("bar"); //未登记
// false
```

+ Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key。
+ 注意，Symbol.for() 为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
+ Symbol.for() 的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

```

### 实例：模块的 Singleton 模式

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
// MyClass 是一个类，new MyClass() 会返回一个实例。
// 该实例的 Symbol.hasInstance 方法，会在进行 instanceof 运算时自动调用，判断左侧的运算子是否为 Array 的实例。

// 例子
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

### 2. Symbol.isConcatSpreadable

+ 对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于 Array.prototype.concat() 时，是否可以展开。
+ 数组的默认行为是可以展开。
+ 类似数组的对象正好相反，默认不展开。
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
      string.substr(0, index),
      string.substr(index + this.value.length)
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

## string

### 模板字符串

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

+ 模板字面量标签函数
  + 第一个参数为字符串数组，数组长度为插入值个数加 1 ， 也就是参数个数 `n` ，长度为 `n+1`
```js
//如果需要引用模板字符串本身，在需要时执行，可以写成函数。
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
//模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。

//模板字面量标签函数，调用
simple`我${s}是${y}NiceYuan${n}`;
//这个调用的第一个参数 strings 数组：['我'，'是', 'NiceYuan', '']

//第一个参数字符串数组的组成
let ac = str`（数组一：如果为空就是空字符串）${a}（+，二）${b}（=，三）${a + b}（四，规则都一样）`;

function simple(strings, ...expressions){
  for(const expression of expressions){
    console.log(expression);
  }
  return 'foobar';
}
```

+ 模板字符串甚至还能嵌套。
```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

# 操作符

## 相等性操作

+ 相等性判断 Object.is()
+ Object.is 方法判断两个值是否相同，语法如下: `Object.is(value1, value2);`
+ 以下任意项成立则两个值相同：

- 两个值都是 `undefined`

- 两个值都是 `null`

- 两个值都是 `true` 或者都是 `false`

- 两个值是由相同个数的字符按照相同的顺序组成的字符串

- 两个值指向同一个对象

- 两个值都是数字并且

- 都是正零 `+0`
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

    //兼容性 Polyfill 处理：
    if (!Object.is) {
        Object.is = function (x, y) {
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

# Proxy

+ Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
+ 代理器，在目标前拦截操作，外部访问该目标都必须通过代理器，可以对外界的访问进行过滤和改写
```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});

/*
  上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。
  对设置了拦截行为的对象 obj，去读写它的属性，就会得到下面的结果。
  Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。
*/
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

+ ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
+ 注意，要使得 Proxy 起作用，必须针对 Proxy 实例（上例是 proxy 对象）进行操作，
```js
var proxy = new Proxy(target, handler);
/* 
  Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。
  new Proxy() 表示生成一个 Proxy 实例
  target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

  下面是另一个拦截读取属性行为的例子。
  Proxy 接受两个参数。第一个参数是所要代理的目标对象
  第二个参数是一个配置对象,对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作
  配置对象有一个 get 方法，用来拦截对目标对象属性的访问请求
*/
var proxy = new Proxy({}, {
  // get 方法的两个参数分别是目标对象和所要访问的属性。
  get: function(target, propKey) {
    return 35;
  }
});
proxy.time // 35
proxy.name // 35
proxy.title // 35

// 如果 handler 没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
// handler 是一个空对象，没有任何拦截效果，访问 proxy 就等同于访问 target。
```

+ 一个技巧是将 Proxy 对象，设置到 object.proxy 属性，从而可以在 object 对象上调用。
```js
var object = { proxy: new Proxy(target, handler) };

// Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
// proxy 对象是 obj 对象的原型，obj 对象本身并没有 time 属性，所以根据原型链，会在 proxy 对象上读取该属性，导致被拦截。

// 同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true

// 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。
```

## Proxy 支持的拦截操作

+ get(target, propKey, receiver)
  + 拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。

+ set(target, propKey, value, receiver)
  + 拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

+ has(target, propKey)
  + 拦截 propKey in proxy 的操作，返回一个布尔值。

+ deleteProperty(target, propKey)
  + 拦截 delete proxy[propKey] 的操作，返回一个布尔值。

+ ownKeys(target)
  + 拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环
  + 返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys() 的返回结果仅包括目标对象自身的可遍历属性。

+ getOwnPropertyDescriptor(target, propKey)
  + 拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

+ defineProperty(target, propKey, propDesc)
  + 拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

+ preventExtensions(target)
  + 拦截 Object.preventExtensions(proxy)，返回一个布尔值。

+ getPrototypeOf(target)
  + 拦截 Object.getPrototypeOf(proxy)，返回一个对象。

+ isExtensible(target)
  + 拦截 Object.isExtensible(proxy)，返回一个布尔值。

+ setPrototypeOf(target, proto)
  + 拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
  + 如果目标对象是函数，那么还有两种额外操作可以拦截。

+ apply(target, object, args)
  + 拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

+ construct(target, args)
  + 拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

## Proxy 实例的方法

### 1. get()

+ get 方法用于拦截某个属性的读取操作，可以接受三个参数
+ 依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象）
+ 其中最后一个参数可选。
+ 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
```js
// 例子
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

// get 方法可以继承。
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

+ 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
```js
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

+ get 方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
```js
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
// proxy 对象的 getReceiver 属性是由 proxy 对象提供的，所以 receiver 指向 proxy 对象。
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});

const d = Object.create(proxy);
d.a === d // true
```

### 2. set()

+ set 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
+ 假定 Person 对象有一个 age 属性，该属性应该是一个不大于 200 的整数，那么可以使用 Proxy 保证 age 的属性值符合要求。
```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错

// 由于设置了存值函数 set，任何不符合要求的 age 属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。
// 利用 set 方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。
```

+ 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。
+ 结合 get 和 set 方法，就可以做到防止这些内部属性被外部读写。
```js
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

// 只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
```

+ set方法第四个参数的例子。
```js
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy // true

// set 方法的第四个参数 receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身
```

### 3. apply()

+ apply 方法拦截函数的调用、call 和 apply 操作。
+ apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
```js
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};

// 例子
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
// 变量 p 是 Proxy 的实例，当它作为函数调用时（p()），就会被 apply 方法拦截，返回一个字符串。

// 例子
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// 每当执行 proxy 函数（直接调用或 call 和 apply 调用），就会被 apply 方法拦截。
// 另外，直接调用 Reflect.apply 方法，也会被拦截。

Reflect.apply(proxy, null, [9, 10]) // 38
```

### 4. has()

+ has() 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
+ has() 方法可以接受两个参数，分别是目标对象、需查询的属性名。
+ 下面的例子使用 has() 方法隐藏某些属性，不被 in 运算符发现。
+ 如果原对象不可配置或者禁止扩展，这时 has() 拦截会报错。
+ 值得注意的是，has() 方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即 has() 方法不判断一个属性是对象自身的属性，还是继承的属性。
+ 虽然 for...in 循环也用到了 in 运算符，但是 has() 拦截对 for...in 循环不生效。
```js
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false

// 如果原对象的属性名的第一个字符是下划线，proxy.has() 就会返回 false，从而不会被 in 运算符发现。
```

### 5. construct()

+ construct() 方法用于拦截 new 命令，下面是拦截对象的写法。
```js
const handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
```

+ construct() 方法可以接受三个参数。
  + target：目标对象。
  + args：构造函数的参数数组。
  + newTarget：创造实例对象时，new 命令作用的构造函数（下面例子的p）。
+ construct() 方法返回的必须是一个对象，否则会报错。
+ 由于 construct() 拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。
```js
const p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10

// construct() 方法中的 this 指向的是 handler，而不是实例对象。
const handler = {
  construct: function(target, args) {
    console.log(this === handler);
    return new target(...args);
  }
}

let p = new Proxy(function () {}, handler);
new p() // true
```

### 6. deleteProperty()

+ deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除。
+ 注意，目标对象自身的不可配置（configurable）的属性，不能被 deleteProperty 方法删除，否则报错。
```js
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
// deleteProperty 方法拦截了 delete 操作符，删除第一个字符为下划线的属性会报错。
```

### 7. defineProperty()

+ defineProperty() 方法拦截了 Object.defineProperty() 操作。
```js
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
/*
  defineProperty() 方法内部没有任何操作，只返回 false，导致添加新属性总是无效。
  注意，这里的 false 只是用来提示操作失败，本身并不能阻止添加新属性。
  注意，如果目标对象不可扩展（non-extensible），则 defineProperty() 不能增加目标对象上不存在的属性，否则会报错。
  另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty() 方法不得改变这两个设置。
*/
```

### 8. getOwnPropertyDescriptor()

+ getOwnPropertyDescriptor() 方法拦截 Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者 undefined。
```js
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```
+ handler.getOwnPropertyDescriptor() 方法对于第一个字符为下划线的属性名会返回 undefined。

### 9. getPrototypeOf()

+ getPrototypeOf() 方法主要用来拦截获取对象原型。
+ 具体来说，拦截下面这些操作。
  + Object.prototype.__proto__
  + Object.prototype.isPrototypeOf()
  + Object.getPrototypeOf()
  + Reflect.getPrototypeOf()
  + instanceof
```js
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true

/*
  getPrototypeOf() 方法拦截 Object.getPrototypeOf()，返回 proto 对象。
  注意，getPrototypeOf() 方法的返回值必须是对象或者 null，否则报错。
  另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf() 方法必须返回目标对象的原型对象。
*/
```

### 10. isExtensible()

+ isExtensible() 方法拦截 Object.isExtensible() 操作。
+ 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
+ 这个方法有一个强限制，它的返回值必须与目标对象的 isExtensible 属性保持一致，否则就会抛出错误。
```js
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});
// 设置了 isExtensible() 方法，在调用 Object.isExtensible 时会输出 called。
Object.isExtensible(p)
// "called"
// true

// 返回值保持一致
Object.isExtensible(proxy) === Object.isExtensible(target)

var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

### 11. ownKeys()

+ ownKeys() 方法用来拦截对象自身属性的读取操作。
+ 具体来说，拦截以下操作。
  + Object.getOwnPropertyNames()
  + Object.getOwnPropertySymbols()
  + Object.keys()
  + for...in循环
+ 注意，使用 Object.keys() 方法时，有三类属性会被 ownKeys() 方法自动过滤，不会返回。
  + 目标对象上不存在的属性
  + 属性名为 Symbol 值
  + 不可遍历（enumerable）的属性
+ ownKeys() 方法返回的数组成员，只能是字符串或 Symbol 值
+ 如果有其他类型的值，或者返回的根本不是数组，就会报错。
+ 如果目标对象是不可扩展的（non-extensible），这时 ownKeys() 方法返回的数组之中,
  + 必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
```js
// 拦截 Object.keys() 的例子。
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);
// 拦截了对于 target 对象的 Object.keys() 操作，只返回 a、b、c 三个属性之中的 a 属性。
Object.keys(proxy)
// [ 'a' ]
```

### 12. preventExtensions()

+ preventExtensions() 方法拦截 Object.preventExtensions()。
+ 该方法必须返回一个布尔值，否则会被自动转为布尔值。

+ 这个方法有一个限制，只有目标对象不可扩展时（即 Object.isExtensible(proxy) 为 false），proxy.preventExtensions 才能返回 true，否则会报错。
```JS
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible

// proxy.preventExtensions() 方法返回 true，但这时 Object.isExtensible(proxy) 会返回 true，因此报错。
// 为了防止出现这个问题，通常要在 proxy.preventExtensions() 方法里面，调用一次 Object.preventExtensions()。
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
```

### 13. setPrototypeOf()

+ setPrototypeOf() 方法主要用来拦截 Object.setPrototypeOf() 方法。
```JS
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden

// 只要修改 target 的原型对象，就会报错。
```

+ 注意，该方法只能返回布尔值，否则会被自动转为布尔值。
+ 另外，如果目标对象不可扩展（non-extensible），setPrototypeOf() 方法不得改变目标对象的原型。

## Proxy.revocable()

+ Proxy.revocable() 方法返回一个可取消的 Proxy 实例。
```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```
+ Proxy.revocable() 方法返回一个对象，该对象的 proxy 属性是Proxy实例， revoke 属性是一个函数，可以取消 Proxy 实例。
+ 上面代码中，当执行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。

+ Proxy.revocable() 的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## this 问题

+ 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
+ 主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。
```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true

// 一旦 proxy 代理 target，target.m() 内部的 this 就是指向 proxy，而不是 target。

// 由于 this 指向的变化，导致 Proxy 无法代理目标对象。
const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
/*
  目标对象 jane 的 name 属性，实际保存在外部 WeakMap 对象 _name 上面，通过 this 键区分。
  由于通过 proxy.name 访问时，this 指向 proxy，导致无法取到值，所以返回 undefined。
*/
```

+ 有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```
+ 上面代码中，getDate() 方法只能在 Date 对象实例上面拿到，如果 this 不是 Date 对象实例就会报错。
+ 这时，this 绑定原始对象，就可以解决这个问题。
```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

+ 另外，Proxy 拦截函数内部的 this，指向的是 handler 对象。
```js
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler);
    return 'Hello, ' + key;
  },
  set: function (target, key, value) {
    console.log(this === handler);
    target[key] = value;
    return true;
  }
};

const proxy = new Proxy({}, handler);

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true

// get() 和 set() 拦截函数内部的 this，指向的都是 handler 对象。
```

# Reflect

+ Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API。
+ Reflect 对象的设计目的有这样几个。

1. 更改内部方法的部署位置
  +  将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。
  +  现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。
  +  也就是说，从 Reflect 对象上可以拿到语言内部的方法。

2. 修改方法的一些行为，让其更合理
   +  修改某些 Object 方法的返回结果，让其变得更合理。
   +  比如，Object.defineProperty(obj, name, desc) 在无法定义属性时，会抛出一个错误
   +  而 Reflect.defineProperty(obj, name, desc) 则会返回 false。
```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

3. 让 Object 操作都变成函数行为
   + 某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]
   + 而 Reflect.has(obj, name) 和 Reflect.deleteProperty(obj, name) 让它们变成了函数行为。
```js
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

4. Reflect 对象的方法与 Proxy 对象的方法一一对应
   + 只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。
   + 这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。
   + 也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。
```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
// Proxy 方法拦截 target 对象的属性赋值行为
// 它采用 Reflect.set 方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

// 例子
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
/**
 * 每一个 Proxy 对象的拦截操作（get、delete、has），
 * 内部都调用对应的 Reflect 方法，保证原生行为能够正常执行。
 * 添加的工作，就是将每一个操作输出一行日志。
*/
```

+ 有了 Reflect 对象以后，很多操作会更易读。
```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

## 静态方法

+ Reflect 对象一共有 13 个静态方法。
  - Reflect.apply(target, thisArg, args)
  - Reflect.construct(target, args)
  - Reflect.get(target, name, receiver)
  - Reflect.set(target, name, value, receiver)
  - Reflect.defineProperty(target, name, desc)
  - Reflect.deleteProperty(target, name)
  - Reflect.has(target, name)
  - Reflect.ownKeys(target)
  - Reflect.isExtensible(target)
  - Reflect.preventExtensions(target)
  - Reflect.getOwnPropertyDescriptor(target, name)
  - Reflect.getPrototypeOf(target)
  - Reflect.setPrototypeOf(target, prototype)
+ 大部分与 Object 对象的同名方法的作用都是相同的，而且它与 Proxy 对象的方法是一一对应的。

### 1. get(target, name, receiver)

+ Reflect.get 方法查找并返回 target 对象的 name 属性，如果没有该属性，则返回 undefined。
+ 如果第一个参数不是对象，Reflect.get 方法会报错。
+ 参数
  + 目标对象  target
  + 属性名称  name
  + 扩展对象（可以替换使用的方法） receiver
```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```
+ 如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver。
```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

### 2. set(target, name, value, receiver)

+ Reflect.set 方法设置 target 对象的 name 属性等于 value。
+ 如果第一个参数不是对象，Reflect.set 会报错。
```js
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

+ 如果 name 属性设置了赋值函数，则赋值函数的 this 绑定 receiver。
```js
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject); // 改变了 this 的指向
myObject.foo // 4
myReceiverObject.foo // 1
```

+ 注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为
+ 而且传入了 receiver，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。
```js
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver);// 传入 receiver 导致触发拦截
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
/**
 * Proxy.set 拦截里面使用了 Reflect.set，而且传入了 receiver , 导致触发 Proxy.defineProperty 拦截。
 * 这是因为 Proxy.set 的 receiver 参数总是指向当前的 Proxy 实例（即上例的 obj）
 * 而 Reflect.set 一旦传入 receiver，就会将属性赋值到 receiver 上面（即 obj）,导致触发 defineProperty 拦截。
 * 如果 Reflect.set 没有传入 receiver，那么就不会触发 defineProperty 拦截。
*/
```

### 3. has(obj, name)

+ Reflect.has 方法对应 name in obj 里面的 in 运算符。
+ 如果 Reflect.has() 方法的第一个参数不是对象，会报错。
```js
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

### 4. deleteProperty(obj, name)

+ Reflect.deleteProperty 方法等同于 delete obj[name]，用于删除对象的属性。
+ 该方法返回一个布尔值。
  + 如果删除成功，或者被删除的属性不存在，返回 true；
  + 删除失败，被删除的属性依然存在，返回 false。
+ 如果 Reflect.deleteProperty() 方法的第一个参数不是对象，会报错。
```js
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

### 5. construct(target, args)

+ Reflect.construct 方法等同于 new target(...args)，这提供了一种不使用 new，来调用构造函数的方法。
+ 如果 Reflect.construct() 方法的第一个参数不是函数，会报错。
```js
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```

### 6. getPrototypeOf(obj)

+ Reflect.getPrototypeOf 方法用于读取对象的 __proto__ 属性，对应 Object.getPrototypeOf(obj) 。
```js
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
```
+ Reflect.getPrototypeOf 和 Object.getPrototypeOf 的一个区别是，如果参数不是对象
+ Object.getPrototypeOf 会将这个参数转为对象，然后再运行
+ 而 Reflect.getPrototypeOf 会报错。

### 7. setPrototypeOf(obj, newProto)

+ Reflect.setPrototypeOf 方法用于设置目标对象的原型（prototype）
+ 对应 Object.setPrototypeOf(obj, newProto) 方法。它返回一个布尔值，表示是否设置成功。
+ 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf 方法返回 false。
+ 如果第一个参数不是对象，Object.setPrototypeOf 会返回第一个参数本身，而 Reflect.setPrototypeOf 会报错。
+ 如果第一个参数是 undefined 或 null，Object.setPrototypeOf 和 Reflect.setPrototypeOf 都会报错。
```js
const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);

myObj.length // 0
```

### 8. apply(func, thisArg, args)

+ Reflect.apply 方法等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定 this 对象后执行给定函数。

+ 一般来说，如果要绑定一个函数的 this 对象，可以这样写 fn.apply(obj, args)
+ 但是如果函数定义了自己的 apply 方法，就只能写成 Function.prototype.apply.call(fn, obj, args)
+ 采用 Reflect 对象可以简化这种操作。
```js
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

### 9. defineProperty(target, propertyKey, attributes)

+ Reflect.defineProperty 方法基本等同于 Object.defineProperty，用来为对象定义属性。
+ 未来，后者会被逐渐废除，请从现在开始就使用 Reflect.defineProperty 代替它。
+ 如果 Reflect.defineProperty 的第一个参数不是对象，就会抛出错误，比如 Reflect.defineProperty(1, 'foo')。
+ 
```js
function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
```
+ 这个方法可以与 Proxy.defineProperty 配合使用。
```js
const p = new Proxy({}, {
  defineProperty(target, prop, descriptor) {
    console.log(descriptor);
    return Reflect.defineProperty(target, prop, descriptor);
  }
});

p.foo = 'bar';
// {value: "bar", writable: true, enumerable: true, configurable: true}

p.foo // "bar"
// 上面代码中，Proxy.defineProperty 对属性赋值设置了拦截，然后使用 Reflect.defineProperty 完成了赋值。
```

### 10. getOwnPropertyDescriptor(target, propertyKey)

+ Reflect.getOwnPropertyDescriptor 基本等同于 Object.getOwnPropertyDescriptor
+ 用于得到指定属性的描述对象，将来会替代掉后者。
```js
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
```
+ Reflect.getOwnPropertyDescriptor 和 Object.getOwnPropertyDescriptor 的一个区别是
+ 如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo') 不报错，返回 undefined
+ 而 Reflect.getOwnPropertyDescriptor(1, 'foo') 会抛出错误，表示参数非法。

### 11. isExtensible (target)

+ Reflect.isExtensible 方法对应 Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
+ 如果参数不是对象，Object.isExtensible 会返回 false，因为非对象本来就是不可扩展的
+ 而 Reflect.isExtensible 会报错。
```js
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true
```

### 13. preventExtensions(target)

+ Reflect.preventExtensions 对应 Object.preventExtensions 方法，用于让一个对象变为不可扩展。
+ 它返回一个布尔值，表示是否操作成功。
```js
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true
```
+ 如果参数不是对象，Object.preventExtensions 在 ES5 环境报错，在 ES6 环境返回传入的参数
+ 而 Reflect.preventExtensions 会报错。

### 13. ownKeys (target)

+ Reflect.ownKeys 方法用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和。
+ 如果 Reflect.ownKeys() 方法的第一个参数不是对象，会报错。
```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

## 实例：使用 Proxy 实现观察者模式

+ 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
```js
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
// 数据对象 person 是观察目标，函数 print 是观察者。一旦数据对象发生变化，print 就会自动执行。
```

+ 使用 Proxy 写一个观察者模式的最简单实现，即实现 observable 和 observe 这两个函数。
+ 思路是 observable 函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
```js
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
/**
 * 先定义了一个 Set 集合，所有观察者函数都放进这个集合
 * 然后，observable 函数返回原始对象的代理，拦截赋值操作
 * 拦截函数 set 之中，会自动执行所有观察者
*/
```