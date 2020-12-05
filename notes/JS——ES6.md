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

+ 由于每一个 Symbol 值都不相等，所以可以作为标识符，用于对象的属性名，保证不会出现同名的属性，防止不小型被篡改，或覆盖
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

# Set 和 Map 数据结构

## Set 结构

+ ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
+ Set 本身是一个构造函数，用来生成 Set 数据结构。
+ Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。同样会去除重复的值。
```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
//表明 set 结构不会添加重复的值

//例子
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56
// 类似于
const set = new Set();
document.querySelectorAll('div').forEach(div => set.add(div));
set.size // 56

// 去除数组的重复成员
[...new Set(array)]
[...new Set('ababbc')].join('');  // "abc"
```

+ 向 Set 加入值的时候，不会发生类型转换，所以 5 和 "5" 是两个不同的值
+ Set 内部判断两个值是否不同，使用的算法叫做 “Same-value-zero equality” 
+ 它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为NaN不等于自身。
+ 两个对象总是不相等的
```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
// 向 Set 实例添加了两次NaN，但是只会加入一个。这表明，在 Set 内部，两个NaN是相等的。

//对象不相等
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

+ Array.from方法可以将 Set 结构转为数组。
```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

//数组去重方法
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

### Set 实例的属性和方法

+ Set 结构的实例有以下属性。
  + Set.prototype.constructor：构造函数，默认就是 Set 函数。
  + Set.prototype.size：返回 Set 实例的成员总数。

+ Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）

+ 四个操作方法
  + Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
  + Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  + Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
  + Set.prototype.clear()：清除所有成员，没有返回值。

+ 四个遍历方法
  + Set.prototype.keys()：返回键名的遍历器
  + Set.prototype.values()：返回键值的遍历器
  + Set.prototype.entries()：返回键值对的遍历器
  + Set.prototype.forEach()：使用回调函数遍历每个成员，没有返回值
    + 该函数的参数与数组的 forEach 一致，依次为键值、键名、集合本身
    + Set 结构的键名就是键值
+ Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
+ Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 values 方法。
+ 可以省略 values 方法，直接用 for...of 循环遍历 Set。
```js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {//values()类似
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 遍历的应用

+ 扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Set 结构。
```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']

//扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]


- 数组的 map 和 filter 方法也可以间接用于 Set 了。
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}


+ 因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

+ 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
+ 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用 Array.from 方法。
```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
//上面代码提供了两种方法，直接在遍历操作中改变原来的 Set 结构。
```

## WeakSet

+ WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
  + 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
  + WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
  + 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

+ 这些特点同样适用于 WeakMap 结构。

### 语法

+ WeakSet 是一个构造函数，可以使用 new 命令，创建 WeakSet 数据结构。
```js
const ws = new WeakSet(); //作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。
// （实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）
// 该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
/**
 * a 是一个数组，它有两个成员，也都是数组。将 a 作为 WeakSet 构造函数的参数，a 的成员会自动成为 WeakSet 的成员。
 * 注意，是 a 数组的成员成为 WeakSet 的成员，而不是 a 数组本身。这意味着，数组的成员只能是对象。
*/
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
// 数组b的成员不是对象，加入 WeakSet 就会报错。
```

+ WeakSet 结构有以下三个方法。
  + WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
  + WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
  + WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
+ WeakSet 没有 size 属性，没有办法遍历它的成员。
```js
const ws = new WeakSet();
ws.add(window);
ws.has(window); // true
ws.delete(window);
ws.has(window);    // false
```

+ WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
// 上面代码保证了 Foo 的实例方法，只能在 Foo 的实例上调用。
// 这里使用 WeakSet 的好处是，foos 对实例的引用，不会被计入内存回收机制
// 所以删除实例的时候，不用考虑 foos，也不会出现内存泄漏。
```

## Map

+ JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
+ 这给它的使用带来了很大的限制。
```js
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
// 上面代码原意是将一个 DOM 节点作为对象data的键，
// 但是由于对象只接受字符串作为键名，所以 element 被自动转为字符串 [object HTMLDivElement] 。
```

+ 为了解决这个问题 ES6 提供的 Map 解构， 它雷士与对象，也是一个键值对集合，但是键的范围不在局限于字符串
+ 各种类型的值都甚至是对象都可以作为键。
+ 也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
+ 如果你需要“键值对”的数据结构，Map 比 Object 更合适。
+ 如果对同一个键多次赋值，后面的值将覆盖前面的值。
+ 如果读取一个未知的键，则返回 undefined。
+ 只有对同一个对象的引用，Map 结构才将其视为同一个键
+ 键值对解构的数据都可以作为参数创建新的 Map 结构
+ 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
  + 比如 0 和 -0 就是一个键，布尔值 true 和字符串 true 则是两个不同的键。
  + 另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。
```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([ //在新建 Map 实例时，就指定了两个键 name 和 title。
  ['name', '张三'],
  ['title', 'Author']
]);

// Map 构造函数接受数组作为参数，实际上执行的是下面的算法。
const items = [
  ['name', '张三'],
  ['title', 'Author']
];
const map = new Map();
items.forEach(
  ([key, value]) => map.set(key, value)
);
// 不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构
// 都可以当作 Map 构造函数的参数。这就是说，Set 和 Map 都可以用来生成新的 Map。
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

### 实例的属性和操作方法

1. size 属性
  + size 属性返回 Map 结构的成员总数。

2. Map.prototype.set(key, value)
  + set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。
  + 如果 key 已经有值，则键值会被更新，否则就新生成该键。
  + set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
```js
let map = new Map().set(1, 'a').set(2, 'b').set(3, 'c');
```

3. Map.prototype.get(key)
   + get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。

4. Map.prototype.has(key)
   + has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

5. Map.prototype.delete(key)
   + delete 方法删除某个键，返回 true。如果删除失败，返回 false。

6. Map.prototype.clear()
   + clear 方法清除所有成员，没有返回值。

### 遍历方法

+ Map 结构原生提供三个遍历器生成函数和一个遍历方法。
  + Map.prototype.keys()：返回键名的遍历器。
  + Map.prototype.values()：返回键值的遍历器。
  + Map.prototype.entries()：返回所有成员的遍历器。
  + Map.prototype.forEach()：遍历 Map 的所有成员。
+ 需要特别注意的是，Map 的遍历顺序就是插入顺序。

+ Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
+ 结合数组的 map 方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]
// [1, 2, 3]
[...map.values()]
// ['one', 'two', 'three']
[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

+ forEach 方法，与数组的 forEach 方法类似，也可以实现遍历。
+ forEach 方法还可以接受第二个参数，用来绑定 this
```js
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);// forEach 方法的回调函数的 this，就指向 reporter。
```

### 与其他数据结构的互相转换

1. Map 转为数组
   + 使用扩展运算符（...）。

2. 数组 转为 Map
   + 将数组传入 Map 构造函数，就可以转为 Map。

3. Map 转为对象
   + 如果所有 Map 的键都是字符串，它可以无损地转为对象。
   + 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
   + 创建新对象,遍历添加

4. 对象转为 Map
   + 对象转为 Map 可以通过 Object.entries()。  `new Map(Object.entries(obj))`
   + 自己实现一个转换函数。
```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

5. Map 转为 JSON
   + Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
     + 先转换为对象，然后使用 JSON.stringify() 方法
   + 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
     + JSON.stringify([...map])

6. JSON 转为 Map
   + JSON 转为 Map，正常情况下，所有键名都是字符串。
   + 通过 JSON.parse(jsonStr) 转换为 js 对象，然后在遍历添加

## WeakMap

+ WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。
```js
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
```

+ WeakMap 与 Map 的区别有两点。
  + WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。
  + WeakMap 的键名所指向的对象，不计入垃圾回收机制。

+ WeakMap 的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
// e1 和 e2 是两个对象，我们通过 arr 数组对这两个对象添加一些文字说明。这就形成了 arr 对 e1 和 e2 的引用。
// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放 e1 和 e2 占用的内存。
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
// 上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。
```
+ WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
+ 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
+ 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
+ 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
+ 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。

+ 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
+ 若果键值引用对象，是正常引用，会造成内存泄漏

### WeakMap 的语法

+ WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有 keys()、values() 和 entries() 方法），也没有 size 属性。
+ 因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
+ 这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
+ 二是无法清空，即不支持 clear 方法。
+ 因此，WeakMap 只有四个方法可用：get()、set()、has()、delete()。

### WeakMap 的用途

+ 前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。
```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);

// document.getElementById('logo') 是一个 DOM 节点，每当发生 click 事件，就更新一下状态。
// 我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
```

+ WeakMap 的另一个用处是部署私有属性。
```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
// Countdown 类的两个内部属性 _counter 和 _action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
```