# 数组的扩展

## 扩展运算符

+ 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
+ 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
```js
console.log(...[1, 2, 3]);   // 1 2 3
console.log(1, ...[2, 3, 4], 5);    // 1 2 3 4 5
[...document.querySelectorAll('div')];    // [<div>, <div>, <div>]

//该运算符主要用于函数调用。
function push(array, ...items) {
  array.push(...items);
}
function add(x, y) {
  return x + y;
}
const numbers = [4, 38];
add(...numbers) // 42
/**
 * array.push(...items) 和 add(...numbers) 这两行，都是函数的调用，它们都使用了扩展运算符。
 * 该运算符将一个数组，变为参数序列。
*/

//扩展运算符与正常的函数参数可以结合使用，非常灵活。
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

//扩展运算符后面还可以放置表达式。
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];

//如果扩展运算符后面是一个空数组，则不产生任何效果。
[...[], 1]
// [1]

//报错，不在函数调用时，不允许放入圆括号中
(...[1, 2])
// Uncaught SyntaxError: Unexpected number
console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number
console.log(...[1, 2])
// 1 2
```

### 替代函数的 apply 方法

+ 由于扩展运算符可以展开数组，所以不再需要 apply 方法，将数组转为函数的参数了。
```js
// ES5 的写法
function f(x, y, z) {/**/}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {/**/}
let args = [0, 1, 2];
f(...args);

//下面是扩展运算符取代 apply 方法的一个实际的例子，应用 Math.max 方法，简化求出一个数组最大元素的写法。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

//另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

//例子
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```

### 扩展运算符的应用

+ 扩展运算符（...）也可以将某些数据结构转为数组。
+ 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。

### 复制数组

+ 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
```js
const a1 = [1, 2];

//直接赋值进行克隆是无效的
const a2 = a1;
a2[0] = 2;
a1 // [2, 2]  两个指向的还是同一个数组，修改对双方都生效

//ES5 通过变通的方法克隆数组
const a2 = a1.concat();
a2[0] = 2;
a1 // [1, 2]  成功克隆，不会对原数组造成影响

//扩展运算符
// 写法一
const a2 = [...a1];
// 写法二  利用了解构
const [...a2] = a1;
```

### 合并数组

+ 扩展运算符提供了数组合并的新写法。
```js
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

//不过，这两种方法都是浅拷贝，使用的时候需要注意。
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];
const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];
a3[0] === a1[0] // true
a4[0] === a1[0] // true
/**
 * a3 和 a4 是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。
 * 如果修改了引用指向的值，会同步反映到新数组。
*/
```

### 与解构赋值结合

+ 扩展运算符可以与解构赋值结合起来，用于生成数组。
```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

//如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

### 字符串

+ 扩展运算符还可以将字符串转为真正的数组。
```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
//上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
//上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。

//正确返回字符串长度
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3

//凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
```

### 实现了 Iterator 接口的对象

+ 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
+ 没有 Iterator 接口的对象使用扩展运算符会报错
```js
let nodeList = document.querySelectorAll('div');  //返回的是 NodeList 对象 是一个类数组对象
let array = [...nodeList];    // 转为真数组，原因就在于 NodeList 对象实现了 Iterator 。

Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}
//先定义了 Number 对象的遍历器接口，扩展运算符将 5 自动转成 Number 实例以后，就会调用这个接口，就会返回自定义的结果。
console.log([...5]) // [0, 1, 2, 3, 4]

//对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
//这时，可以改为使用 Array.from 方法将 arrayLike 转为真正的数组。
```

### Map 和 Set 结构，Generator 函数

+ 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]

//Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
/**
 * 变量 go 是一个 Generator 函数
 * 执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。
*/

//如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。
const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

## Array.from()

+ Array.from 方法用于将两类对象转为真正的数组
  + 类似数组的对象（array-like object）
  + 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
+ 常见的类似数组的对象是 DOM 操作返回的 NodeList 集合
+ 以及函数内部的 arguments 对象
+ 利用 Array.from 都可以转为真正的数组
+ 只要是部署了 Iterator 接口的数据结构，Array.from 都能将其转为数组。
+ 如果参数是一个真正的数组，Array.from 会返回一个一模一样的新数组。

+ Array.from 方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有 length 属性。
+ 任何有 length 属性的对象，都可以通过 Array.from 方法转为数组，而此时扩展运算符就无法转换。

```js
//对于还没有部署该方法的浏览器，可以用 Array.prototype.slice 方法替代。
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

+ Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

//取出一组 DOM 节点的文本内容。
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

+ 如果 map 函数里面用到了 this 关键字，还可以传入 Array.from 的第三个参数，用来绑定 this。
+ Array.from() 的另一个应用是，将字符串转为数组，然后返回字符串的长度。
+ 因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于 \uFFFF 的 Unicode 字符，算作两个字符的 bug。

## Array.of()

+ Array.of 方法用于将一组值，转换为数组。
+ Array.of 基本上可以用来替代 Array() 或 new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
+ Array.of 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

//这个方法的主要目的，是弥补数组构造函数 Array() 的不足。因为参数个数的不同，会导致 Array() 的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
//Array方法没有参数、一个参数、三个参数时，返回结果都不一样。
//只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。
//参数个数只有一个时，实际上是指定数组的长度。

//Array.of 方法可以用下面的代码模拟实现。
function ArrayOf(){
  return [].slice.call(arguments);
}
```

## 数组实例的
## copyWithin()

+ 数组实例的 copyWithin() 方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
+ 也就是说，使用这个方法，会修改当前数组。
```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
+ 它接受三个参数。
  + target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  + start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  + end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
+ 这三个参数都应该是数值，如果不是，会自动转为数值。
```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

## find() 和 findIndex()

+ 数组实例的 find 方法，用于找出第一个符合条件的数组成员。
+ 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。
+ 如果没有符合条件的成员，则返回 undefined。
```js
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
// find 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```

+ 数组实例的 findIndex 方法的用法与 find 方法非常类似
+ 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 -1。
```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

+ 这两个方法都可以接受第二个参数，用来绑定回调函数的 this 对象。
```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
// find 函数接收了第二个参数 person 对象，回调函数中的 this 对象指向 person 对象。
```

+ 另外，这两个方法都可以发现 NaN，弥补了数组的 indexOf 方法的不足。
```js
[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
// 0
//indexOf 方法无法识别数组的 NaN 成员，但是 findIndex 方法可以借助 Object.is 方法做到。
```

## fill()

+ fill 方法使用给定值，填充一个数组。
```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

// fill 方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
```

+ fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

+ 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
```js
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

## entries()，keys() 和 values()

+ ES6 提供三个新的方法
  + entries()
  + keys()
  + values()
+ 用于遍历数组,它们都返回一个遍历器对象（详见《Iterator》一章）
+ 可以用 for...of 循环进行遍历，
+ 唯一的区别是 
+ keys() 是对键名的遍历
+ values() 是对键值的遍历
+ entries() 是对键值对的遍历。
```js
let a = ['a', 'b'];

for (let index of a.keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of a.values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of a.entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

//如果不使用 for...of 循环，可以手动调用遍历器对象的 next 方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## includes()

+ Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。
+ ES2016 引入了该方法。
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

//不支持时的简易版部署
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

+ 该方法的第二个参数表示搜索的起始位置，默认为 0。
+ 如果第二个参数为负数，则表示倒数的位置
+ 如果这时它大于数组长度（比如第二个参数为 -4，但数组长度为 3），则会重置为从 0 开始。

+ 没有该方法之前，我们通常使用数组的 indexOf 方法，检查是否包含某个值。
+ indexOf 方法有两个缺点，一是不够语义化
+ 它内部使用严格相等运算符（===）进行判断，这会导致对 NaN 的误判。

+ 另外，Map 和 Set 数据结构有一个 has 方法，需要注意与 includes 区分。
  + Map 结构的 has 方法，是用来查找键名的，
    + 比如 Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
  + Set 结构的 has 方法，是用来查找值的，
    + 比如 Set.prototype.has(value)、WeakSet.prototype.has(value)。

## flat()，flatMap()

+ 数组的成员有时还是数组，Array.prototype.flat() 用于将嵌套的数组“拉平”，变成一维的数组。
+ 该方法返回一个新数组，对原数据没有影响。
```js
[1, 2, [3, 4]].flat();   // [1, 2, 3, 4]
//原数组的成员里面有一个数组，flat() 方法将子数组的成员取出来，添加在原来的位置。
```

+ flat() 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组
+ 可以将 flat() 方法的参数写成一个整数，表示想要拉平的层数，默认为 1 。
+ 如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数。
+ 如果原数组有空位，flat() 方法会跳过空位。

+ flatMap() 方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()）
+ 然后对返回值组成的数组执行 flat() 方法。该方法返回一个新数组，不改变原数组。
+ flatMap() 只能展开一层数组。
```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
//遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此 flatMap() 返回的还是一个嵌套数组。
```

+ flatMap() 方法的参数是一个遍历函数
+ 该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

+ flatMap() 方法还可以有第二个参数，用来绑定遍历函数里面的 this。

## 数组的空位

+ 数组的空位指，数组的某一个位置没有任何值。比如，Array 构造函数返回的数组都是空位。
```js
Array(3) // [, , ,]
// Array(3) 返回一个具有 3 个空位的数组。
//注意，空位不是 undefined，一个位置的值等于 undefined，依然是有值的。
//空位是没有任何值，in 运算符可以说明这一点。
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
//上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。
```

+ ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
  + forEach(), filter(), reduce(), every() 和 some() 都会跳过空位。
  + map() 会跳过空位，但会保留这个值
  + join() 和 toString() 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。
```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

+ ES6 则是明确将空位转为 undefined。
+ Array.from 方法会将数组的空位，转为 undefined，也就是说，这个方法不会忽略空位。
+ `` Array.from(['a',,'b'])     // [ "a", undefined, "b" ] ``
+ 扩展运算符（...）也会将空位转为 undefined。
+ ``[...['a',,'b']];     // [ "a", undefined, "b" ]``
+ copyWithin()会连空位一起拷贝。
+ ``[,'a','b',,].copyWithin(2,0)    // [,"a",,"a"]``
+ fill() 会将空位视为正常的数组位置。
+ ``new Array(3).fill('a')    // ["a","a","a"]``
+ for...of 循环也会遍历空位。
```js
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
//数组 arr 有两个空位，for...of 并没有忽略它们。如果改成 map 方法遍历，空位是会跳过的。
```

+ entries()、keys()、values()、find() 和 findIndex() 会将空位处理成 undefined。
```js
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```

+ 由于空位的处理规则非常不统一，所以建议避免出现空位。

## Array.prototype.sort() 的排序稳定性

+ 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。
```js
const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
/**
 * 上面代码对数组 arr 按照首字母进行排序。
 * 排序结果中，straw 在 spork 的前面，跟原始顺序一致，所以排序算法 stableSorting 是稳定排序。
*/

const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// ["apple", "peach", "spork", "straw"]
/**
 * 排序结果是 spork 在 straw 前面，跟原始顺序相反，所以排序算法 unstableSorting 是不稳定的。
*/
```

+ 常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的
+ 堆排序、快速排序等是不稳定的

+ 不稳定排序的主要缺点是，多重排序时可能会产生问题
+ 假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序
+ 开发者可能会先按名字排序，再按姓氏进行排序

+ 如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。

+ 早先的 ECMAScript 没有规定，
+ Array.prototype.sort() 的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。
+ ES2019 明确规定，Array.prototype.sort() 的默认排序算法必须稳定。这个规定已经做到了

# 对象的扩展

## 属性的简洁表示法

+ ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
+ 注意，简写的对象方法不能用作构造函数，会报错。
```js
const foo = 'bar';
const baz = {foo};    // {foo: "bar"}
// 等同于
const baz = {foo: foo};
//变量 foo 直接写在大括号里面。这时，属性名就是变量名, 属性值就是变量值。

//下面是另一个例子。
function f(x, y) {
  return {x, y};
}//这种写法用于函数的返回值，将会非常方便。
// 等同于
function f(x, y) {
  return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}

- 方法也可以简写。

const o = {
  method() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};
```

## 属性名表达式

+ JavaScript 定义对象的属性，有两种方法。
+ 属性名表达式与简洁表示法，不能同时使用，会报错。
+ 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 [object Object] ，这一点要特别小心。
```js
// 方法一  直接用标识符作为属性名
obj.foo = true;
// 方法二  用表达式作为属性名，这时要将表达式放在方括号之内
obj['a' + 'bc'] = 123;

//如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
};

//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

## 方法的 name 属性

+ 函数的 name 属性，返回函数名。对象方法也是函数，因此也有 name 属性。
+ 对象中的一般方法依旧返回方法名
+ 如果对象的方法使用了取值函数（getter）和存值函数（setter），
+ 则 name 属性不是在该方法上面，而是该方法的属性的描述对象的 get 和 set 属性上面，
+ 返回值是方法名前加上 get 和 set。
```js
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name
// TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

//有两种特殊情况：bind 方法创造的函数，name 属性返回 bound 加上原函数的名字；
//Function 构造函数创造的函数，name 属性返回 anonymous。
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

//如果对象的方法是一个 Symbol 值，那么 name 属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

## 属性的可枚举性和遍历

### 可枚举性

+ 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
+ Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。
```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

//描述对象的 enumerable 属性，称为“可枚举性”，如果该属性为 false，就表示某些操作会忽略当前属性。
//目前，有四个操作会忽略enumerable为false的属性。
/**
 * for...in 循环：只遍历对象自身的和继承的可枚举的属性。
 * Object.keys()：返回对象自身的所有可枚举的属性的键名。
 * JSON.stringify()：只串行化对象自身的可枚举的属性。
 * Object.assign()： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。
 * 这四个操作之中，前三个是 ES5 就有的，最后一个 Object.assign() 是 ES6 新增的。
 * 其中，只有 for...in 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。
 * 设置这个属性的目的就是让部分方法不会被遍历到，如：toString 方法，和 length 属性
*/
```

+ ES6 规定，所有 Class 的原型的方法都是不可枚举的。
```js
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```
+ 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。
+ 所以，尽量不要用 for...in 循环，而用 Object.keys() 代替。

### 属性的遍历

+ ES6 一共有 5 种方法可以遍历对象的属性。

1. for...in
   + for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2. Object.keys(obj)
   + Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3. Object.getOwnPropertyNames(obj)
   + Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性
   + （不含 Symbol 属性，但是包括不可枚举属性）的键名。

4. Object.getOwnPropertySymbols(obj)
   + Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5. Reflect.ownKeys(obj)
   + Reflect.ownKeys 返回一个数组，包含对象自身的（不含继承的）所有键名，
   + 不管键名是 Symbol 或字符串，也不管是否可枚举。

+ 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
  + 首先遍历所有数值键，按照数值升序排列。
  + 其次遍历所有字符串键，按照加入时间升序排列。
  + 最后遍历所有 Symbol 键，按照加入时间升序排列。
```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

## super 关键字

+ this 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 super，指向当前对象的原型对象。
+ 注意，super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
```js
const proto = {foo: 'hello'};

const obj = {foo: 'world',
  find() {
    return super.foo;
  }
};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
/**
 * 对象 obj.find() 方法之中，通过 super.foo 引用了原型对象proto的foo属性。
*/

//报错
// super 用在属性里面
const obj = {
  foo: super.foo
}

// super 用在一个函数里面，然后赋值给 foo 属性
const obj = {
  foo: () => super.foo
}

//super 用在一个函数里面，然后赋值给 foo 属性
const obj = {
  foo: function () {
    return super.foo
  }
}
// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。
// JavaScript 引擎内部，super.foo 等同于 Object.getPrototypeOf(this).foo（属性）
//  或 Object.getPrototypeOf(this).foo.call(this)（方法）。

const proto = {x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);
obj.foo() // "world"
// super.foo 指向原型对象 proto 的 foo 方法，但是绑定的 this 却还是当前对象 obj，因此输出的就是 world。
```

## 对象的扩展运算符

### 解构赋值

+ 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。
+ 所有的键和它们的值，都会拷贝到新对象上面。
+ 解构赋值必须是最后一个参数，否则会报错。
+ 解构赋值浅拷贝，拷贝的属性如果是对象，那么指向的还是同一个对象
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

//由于解构赋值要求等号右边是一个对象，所以如果等号右边是 undefined 或 null，就会报错，因为它们无法转为对象。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误

//另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

//例子
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
/**
 * 变量 x 是单纯的解构赋值，所以可以读取对象 o 继承的属性；
 * 变量 y 和 z 是扩展运算符的解构赋值，只能读取对象 o 自身的属性，所以变量 z 可以赋值成功，变量 y 取不到值
 * ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，
 * 而不能是一个解构赋值表达式，所以上面代码引入了中间变量 newObj，如果写成下面这样会报错。
*/
let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts
```

+ 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
```js
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}
```

### 扩展运算符

+ 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

- 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

- 如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1}
// { a: 1 }

- 如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
{...1} // {}
//扩展运算符后面是整数1，会自动转为数值的包装对象 Number{1} 。由于该对象没有自身属性，所以返回一个空对象。
// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}

- 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

- 对象的扩展运算符等同于使用 Object.assign() 方法。
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

- 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// 写法一  __proto__ 属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

- 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

- 扩展运算符可以用于合并两个对象。
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

- 这用来修改现有对象部分的属性就很方便了。
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};
// newVersion 对象自定义了 name 属性，其他属性全部复制自 previousVersion 对象。

- 如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);

- 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};

- 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}

let aWithXGetter = { ...a }; // 报错  取值函数 get 在扩展 a 对象时会自动执行，导致报错。
```

## 链判断运算符

+ 编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。
+ 比如，要读取 message.body.user.firstName，安全的写法是写成下面这样。
+ 因为这些麻烦的判断所以 ES2020 引入了“链判断运算符”（optional chaining operator）[?.]，简化判断写法。
```js
// 错误的写法
const  firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

//三元运算符?:也常用于判断对象是否存在。
const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

- 链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value;
// 使用了 ?. 运算符，直接在链式调用的时候判断，左侧的对象是否为 null 或 undefined。
//如果是的，就不再往下运算，而是返回 undefined。

//判断对象方法是否存在，如果存在就立即执行的例子。
iterator.return?.()
//iterator.return 如果有定义，就会调用该方法，否则 iterator.return 直接返回 undefined，不再执行 ?. 后面的部分。
```

+ 链判断运算符有三种用法。
  + obj?.prop // 对象属性
  + obj?.[expr] // 同上
  + func?.(...args) // 函数或对象方法的调用

### 注意点

1. 短路机制
   + ?. 运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
```js
a?.[++x]
// 等同于 满足条件就会继续往下运行或是判断
a == null ? undefined : a[++x]
```

2. delete 运算符
   + 该语句使用链判断时可以先进行判断，失败者不会进行 delete 运算。

3. 括号的影响
   + 如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。
   + 一般来说，使用 ?. 运算符的场合，不应该使用圆括号。

4. 报错场合
```js
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c
```

5. 右侧不得为十进制数值
+ 为了保证兼容以前的代码，允许 `foo?.3:0`, 被解析成 `foo ? .3 : 0` 
+ 因此规定如果 ?. 后面紧跟一个十进制数字，那么 ?. 不再被看成是一个完整的运算符，而会按照三元运算符进行处理
+ 也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。

## Null 判断运算符

+ 读取对象属性的时候，如果某个属性的值是 null 或 undefined
+ 有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。
```js
const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300;
const showSplashScreen = response.settings.showSplashScreen || true;
/**
 * 上面的三行代码都通过||运算符指定默认值，但是这样写是错的。
 * 开发者的原意是，只要属性的值为 null 或 undefined
 * 默认值就会生效，但是属性的值如果为空字符串或 false 或 0，默认值也会生效。
*/

- 为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符 ??。
+ 它的行为类似 ||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;

// 这个运算符的一个目的，就是跟链判断运算符 ?. 配合使用，为 null 或 undefined 的值设置默认值。
const animationDuration = response.settings?.animationDuration ?? 300;

//这个运算符很适合判断函数参数是否赋值。
function Component(props) {
  const enable = props.enabled ?? true;
  // …
}

// ?? 有一个运算优先级问题，它与 && 和 || 的优先级孰高孰低。
// 现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。
// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs

(lsh && middle) ?? rhs  //必需这样写
```

# 对象的新增方法 Object.xxx

## Object.is()

+ ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
+ 它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于自身，以及 +0 等于 -0。
+ JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

+ ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。
+ Object.is 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

- 不同之处只有两个：一是 +0 不等于 -0，二是 NaN 等于自身。
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

+ ES5 可以通过下面的代码，部署 Object.is
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对 +0 不等于 -0 的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

## assign()

+ Object.assign() 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
+ 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
+ 如果只有一个参数，Object.assign() 会直接返回该参数。
+ 如果该参数不是对象，则会先转成对象，然后返回。
+ 由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。
+ 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。
  + 首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果 undefined 和 null 不在首参数，就不会报错。
+ 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。
  + 但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
+ Object.assign() 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
+ 属性名为 Symbol 值的属性，也会被 Object.assign() 拷贝。
```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// Object.assign() 方法的第一个参数是目标对象，后面的参数都是源对象。
```

### 注意点

1. 浅拷贝
  + Object.assign() 方法实行的是浅拷贝，而不是深拷贝。
  + 也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
  + 一些函数库提供 Object.assign() 的定制版本（比如 Lodash 的 _.defaultsDeep() 方法），可以得到深拷贝的合并。

2. 同名属性的替换
   + 对于这种嵌套的对象，一旦遇到同名属性，Object.assign() 的处理方法是替换，而不是添加。

3. 数组的处理
   + Object.assign() 可以用来处理数组，但是会把数组视为对象。
   + ``Object.assign([1, 2, 3], [4, 5])   // [4, 5, 3]``

4. 取值函数的处理
   + Object.assign() 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
```js
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

### 常见用途

1. 为对象添加属性
```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

2. 为对象添加方法
```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
//直接将两个函数放在大括号中，再使用 assign() 方法添加到 SomeClass.prototype 之中。
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

3. 克隆对象
```js
function clone(origin) {
  return Object.assign({}, origin);
}
// 将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
//不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。
//如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

4. 合并多个对象
```js
// 将多个对象合并到某个对象。
const merge =
  (target, ...sources) => Object.assign(target, ...sources);

// 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge =
  (...sources) => Object.assign({}, ...sources);
```

5. 为属性指定默认值
```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
// DEFAULTS 是设定的对象默认值
// 注意，由于存在浅拷贝的问题，DEFAULTS 对象和 options 对象的所有属性的值，最好都是简单类型，不要指向另一个对象。
// 否则，DEFAULTS 对象的该属性很可能不起作用。
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
```

## getOwnPropertyDescriptors()

+ ES5 的 Object.getOwnPropertyDescriptor() 方法会返回某个对象属性的描述对象（descriptor）。
+ ES2017 引入了 Object.getOwnPropertyDescriptors() 方法，返回指定对象所有自身属性（非继承属性）的描述对象。
```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

// 该方法的实现非常容易。
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}


+ 该方法的引入目的，主要是为了解决 Object.assign() 无法正确拷贝 get 属性和 set 属性的问题。
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }

/**
 * source 对象的 foo 属性的值是一个赋值函数，Object.assign 法将这个属性拷贝给 target1 对象，结果该属性的值变成了 undefined。
 * 这是因为 Object.assign 方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
 * 这时，Object.getOwnPropertyDescriptors() 方法配合 Object.defineProperties() 方法，就可以实现正确拷贝。
*/
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }

// 上面代码中，两个对象合并的逻辑可以写成一个函数。
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
```

+ Object.getOwnPropertyDescriptors() 方法的另一个用处，是配合 Object.create() 方法，将对象属性克隆到一个新对象。这属于浅拷贝。
```js
const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));

// 或者

const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

// 另外，Object.getOwnPropertyDescriptors() 方法可以实现一个对象继承另一个对象。
// 以前，继承另一个对象，常常写成下面这样。
const obj = {
  __proto__: prot,
  foo: 123,
};

// ES6 规定 __proto__ 只有浏览器要部署，其他环境不用部署。如果去除 __proto__，上面代码就要改成下面这样。
const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

// 有了 Object.getOwnPropertyDescriptors()，我们就有了另一种写法。
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);

// Object.getOwnPropertyDescriptors() 也可以用来实现 Mixin（混入）模式。
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"

// 上面代码返回一个新的对象 d，代表了对象 a 和 b 被混入了对象 c 的操作。
- 出于完整性的考虑，Object.getOwnPropertyDescriptors() 进入标准以后，以后还会新增 Reflect.getOwnPropertyDescriptors() 方法。
```

## __proto__属性，setPrototypeOf(),getPrototypeOf()

+ JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

### __proto__属性

+ __proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。
+ 目前，所有浏览器（包括 IE11）都部署了这个属性。
```js
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
/**
 * 该属性没有写入 ES6 的正文，而是写入了附录，原因是 __proto__ 前后的双下划线，说明它本质上是一个内部属性
 * 而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。
 * 尽量不要使用该属性，而是使用以下的方法
 * Object.setPrototypeOf()（写操作）
 * Object.getPrototypeOf()（读操作）
 * Object.create()（生成操作）代替
*/

// 实现上，__proto__ 调用的是 Object.prototype.__proto__，具体实现如下。
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});

function isObject(value) {
  return Object(value) === value;
}

// 如果一个对象本身部署了 __proto__ 属性，该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })
// null
```

### setPrototypeOf()

+ Object.setPrototypeOf 方法的作用与 __proto__ 相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。
+ 它是 ES6 正式推荐的设置原型对象的方法。
```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

//该方法等同于下面的函数。
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// 例子
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
// 上面代码将 proto 对象设为 obj 对象的原型，所以从 obj 对象可以读取 proto 对象的属性。

Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

// 由于 undefined 和 null 无法转为对象，所以如果第一个参数是 undefined 或 null，就会报错。
bject.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
```

### getPrototypeOf()

+ 该方法与 Object.setPrototypeOf 方法配套，用于读取一个对象的原型对象。
```js
Object.getPrototypeOf(obj);

// 例子
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false

// 如果参数不是对象，会被自动转为对象

// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

// 如果参数是 undefined 或 null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
```

## keys(),values(),entries()

### Object.keys()

+ ES5 引入了 Object.keys 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

+ ES2017 引入了跟 Object.keys 配套的 Object.values 和 Object.entries
+ 作为遍历一个对象的补充手段，供 for...of 循环使用。
```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

### Object.values()

+ Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
// 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]
//上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是 b、c、a。
- Object.values 只返回对象自身的可遍历属性。
- Object.values 会过滤属性名为 Symbol 值的属性。
- 如果Object.values 方法的参数是一个字符串，会返回各个字符组成的一个数组。
- 如果参数不是对象，Object.values 会先将其转为对象。
- 由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values 会返回空数组。
Object.values(42) // []
Object.values(true) // []
```

### Object.entries()

+ Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
+ 除了返回值不一样，该方法的行为与 Object.values 基本一致。
+ 如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]


// Object.entries 的基本用途是遍历对象的属性。
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

// 自己实现Object.entries方法，非常简单。
// Generator 函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非 Generator 函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}
```

## fromEntries()

+ Object.fromEntries() 方法是 Object.entries() 的逆操作，用于将一个键值对数组转为对象。
```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

+ 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
```js
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

// 该方法的一个用处是配合 URLSearchParams 对象，将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
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

# Iterator


# for...of 循环
