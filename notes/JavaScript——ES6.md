# 数据类型

+ `bigint` 用于任意长度的整数。
+ `symbol` 用于唯一的标识符。
+ `string` 

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
  + 还可以插入当前变量  ``let str = `${str}vlaue`;``

+ 模板字符串特性
  + 字符串保留字符字面量 （即空格或换行等制表符）

+ 模板字面量标签函数

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




















