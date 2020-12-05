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