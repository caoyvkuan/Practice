# 数据类型

+ `bigint` 用于任意长度的整数。
+ `symbol` 用于唯一的标识符。
+ `string` 

## symbol

+ 符号是原始值，且符号实例是唯一的、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突

+ 符号的使用
  + 符号需要使用 `Symbol()` 函数初始化 ， 因为符号本身是原始类型， 所以 typeof 操作符对符号返回 symbol
  + 该函数不能用构造函数的方式调用 想要使用符号的包装对象 `Object(Symbol());`
  + 在调用该函数时可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码，但这个字符串并与符号定义或标记完全无关
```js
let sym = Symbol('description');

//使用全局符号注册表
//在运行时的不同部分需要共享和重用符号实例，那么可以用一个字符串作为键
不使用该方法，不会将实例添加入注册表中
重用也需要用该方法调用才可以重用符号实例
let a = Symbol.for('foo'); //在全局符号注册表中创建并重用符号，需要使用该方法
//在第一次使用某个字符串调用时，会检查全局运行时注册表，发现不存在对应的符号，就会生成一个新的符号实例并添加到注册表中，后续查找发现与该字符串对应的符号，然后就会返回该符号实例
//传入该方法的所有值都会被转化为字符串当做键来使用，同时也是符号的描述

Symbol.keyFor(a);   //接收字符参数，在全局中查询该字符，并返回字符对应的键（描述）
```
+ 使用符号作为属性
  + 凡是可以使用字符串或数值作为属性的地方，都可以是用符号
  + `obj[Symbol('foo')] = 'foo bar';`

### 常用内置符号

+ 可以直接访问、重写或模拟这些行为
+ 这些内置符号都以 Symbol 工厂函数字符串属性的形式存在
+ 内置符号最重要的用途之一是重新定义他们，从而改变原生结构的行为
  + for-of 循环会在相关对象上使用 Symbol.iterator 属性，那么就可以通过在自定义对象上重新定义 Symbol.iterator 的值来改变 for-of 在迭代该对象时的行为

+ 这些内置符号也没有什么特别之处，他们就是全局函数 Symbol 的普通字符串属性，指向一个符号的实例，``所有内置符号属性都是不可写，不可枚举，不可配置的。``
+ 符号在规范中的名称，前缀为 @@ ， @@iterator  指的就是 Symbol.iterator

+ Symbol.asyncIterator
  + 这个符号作为一个属性表示：“ 一个方法，该方法返回对象默认的 AsyncIterator（异步迭代器）。由 for-await-of 语句使用。“ 这个符号表示实现异步迭代器 API 的函数

+ Symbol.hasInstance
  + 这个符号作为一个属性表示： 一个方法决定一个构造器对象是否认可一个对象是它的实例， 由 instanceof 操作符使用。
  + 在ES6中 instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系
  + 这个属性定义在 `Function` 的原型上，因此默认在所有函数和类上都可以调用
  + 因为 instanceof 操作符会在原型链上寻找这个属性的定义，所以可以在继承的类上通过静态方法重新定义这个函数
```js
function Foo(){}
let f = new Foo();
f instanceof Foo; //true
Foo[Symbol.hasInstance](f);  // true

//重新定义该函数
class Bar{}
class Baz extends Bar{
  static [Symbol.hasInstance]){
    return false;
  }
}
```

+ Symbol.isConcatSpreadable
  + 这个符号作为属性表示：一个布尔值，如果是true，则意味着对象应该用 Array.prototype.concat() 打平其数组元素， 默认会被打平到已有数组
```js
let initial = ['foo'],array = ['bar'],o = {length:1, 0:'baz'};
console.log(array[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(array)); // ['foo', 'bar']   打平后
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array)); // ['foo', Array(1) ]   为打平直接将数组加入了该数组中.
//且 Array(1) 数组中包含了 ['bar'] 和 Symbol(Symbol.isConcatSpreadable): false

console.log(initial.concat(o)); // ['foo', {...}] 对象被追加在数组中
o[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(o)); //['foo', 'baz'] 对象被展开，需要有 length 属性才会被追加如数组，length 为2  则会将对象中的 0、1 的属性追加入数组，没有则会填入 empty (空，值为 undefined)
```

+ Symbol.iterator
  + 表示： 一个方法，该方法返回对象默认的迭代器，由 for-of 语句使用。 实现迭代器 API 的函数

+ Symbol.match
  + 表示：一个正则表达式方法，该方法用正则表达式去匹配字符串，由 String.prototype.match() 方法使用

+ Symbol.replace
  + 表示：一个正则表达式方法，该方法替换一个字符串中匹配的子串， 由 String.prototype.replace() 方法使用

+ Symbol.search
  + 表示：一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引， 由 String.prototype.search() 方法使用

+ Symbol.species
  + 表示：一个函数值，该函数作为创建派生对象的构造函数

+ Symbol.split
  + 表示：一个正则表达式方法, 该方法在匹配正则表达式的索引位置拆分字符串， 由 String.prototype.split() 方法使用

+ Symbol.toPrimitive
  + 表示：一个方法，该方法将对象转换为相应的原始值， 由 ToPrimitive

+ Symbol.toStringTag
  + 表示：一个字符串，该字符串用于创建对象的默认字符串描述， 由 Object.prototype.toString() 使用，
  + 通过 toString() 方法获取对象标识时， 会检索由 Symbol.toStringTag 指定的实例标识符， 默认为 "Object" ，内置类型已经指定了这个值，但自定义类实例还需要明确定义
```js
class Bar{
  constructor(){
    this[Symbol.toStringTag] = 'Bar';
  }
}
```

+ Symbol.unscopables
  + 表示：一个对象，该对象所有的以及继承的属性，都会从关联对象的 with 环境绑定中排除

## string

### 模板字符串

+ 模板字符串也是一种特殊的 JavaScript 语句表达式，只不过求值后得到的是字符串
  + 模板字符串在定义时立刻求值并转换为字符串实例，任何插入的值也会从他们最接近的作用域中取值

+ 标识符号 （`）反引号
+ 插入表达式或变量  （ ${value} ）
  + 插入的值
  + 所有插入的值都会使用 `toString()` 强制转型为字符串   对象可以重写 `toString()` 方法
  + 嵌套的字符串不用转义
  + 插值表达式可以调用函数和方法
  + 还可以插入当前变量  ``let str = `${str}value`;``

+ 模板字符串特性
  + 字符串保留字符字面量 （即空格或换行等制表符）

+ 模板字面量标签函数
  + 第一个参数为字符串数组，数组长度为插入值个数加 1 ， 也就是参数个数 `n` ，长度为 `n+1`
```js
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

+ 原始字符串
```js
//模板字符同原始字符一样会输出转义后的制表符或 Unicode字符 如: \n 为 换行， \u00A9 为 ©
//如果不想转义可以使用 String.raw`\u00A9`  标签函数
String.raw`\u00A9`；    // "\u00A9“
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

# 函数

+ 箭头函数
+ 理解参数

## 箭头函数

+ **「函数箭头表达式」**是ES6新增的函数表达式的语法，也叫 **「胖箭头函数」**，变化：更简洁的函数和`this`
```js
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
+ 注意点
  + 箭头函数不存在 `this` ；
  + 箭头函数不能当做 **「构造函数」**，即不能用 `new` 实例化；
  + 箭头函数不存在 `arguments` 对象，即不能使用，可以使用 `rest` 参数代替；
  + 箭头函数不能使用 `yield` 命令，即不能用作 Generator 函数。一个简单的例子：
```js
function Person(){
  this.age = 0;
  setInterval(() => {
    this.age++;
  }, 1000);
}
var p = new Person(); // 定时器一直在执行 p的值一直变化
```

## 理解参数

+ 默认参数
  + 若函数没有传入参数，则参数默认值为`undefined`，通常设置参数默认值是这样做的：
```js
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
```js
function f (a, ...b){
    console.log(a, b);
}
f(1,2,3,4); // a => 1 b => [2, 3, 4]
```




















