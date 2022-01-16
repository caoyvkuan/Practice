# Array类型 

+ ECMAScript中数组是动态可调的，可以随着数据的添加自动增长以容纳新增数据

+ 创建方法
  + `let colors = new Array()`  也可省略new关键字
    + 构造函数创建传参
      - 不传参创建空数组
      - 整数创建整数长度的空数组，小数报错
      - 单个非数值或多个参数（包括整数）都是返回新数组成员
  + `let colors = ["red","blue","green"]` 使用数组字面量表示法
    + 在使用字面量创建时不会调用Array构造函数
  + 任何类型的数据都可以放入数组

+ 数组的本质
  + 本质上，数组属于一种特殊的对象。typeof运算符会返回数组的类型是object。
  + Object.keys(arr); 可以获取数组的键
  + 数组的键名其实也是字符串
  + 对于数值的键名不能使用点结构
```js
var a = [];
a[1.00] = 6;  //由于1.00转成字符串是1，所以通过数字键1可以读取值。
a[1] // 6
arr.0 // SyntaxError
```

+ 特点
  + 使用超过数组长度的索引时数组会自动增加到对应的长度
  + length属性不是只读的，可以向数组末尾移除向或添加新项
    + `arr.length = 4;` 设置数组的长度会把多的项删除，少的话就会新增空项undefined值
    + 数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1
    + 如将只有三个值的数组，第四个键值设置为 10 那么 数组的长度就是 11 而不是数组包含值的真实个数
    + 如果数组的键名是添加超出范围的数值，该键名会自动转为字符串。
    + 清空数组的有效方法就是将 length 属性设置为0
  + 数组最多可以包含4294967295个项

+ 数组的空位，空元素也不会影响 length 属性， 最后一个元素后面有逗号也一样
+ delete 命令删除数组元素会形成空位， 空位返回 undefined
+ forEach 方法、for-in 结构、Object.keys 方法 进行遍历数组，空位都会跳过
+ 如果某个位置是 undefined 遍历的时候不会被跳过

+ in 操作符也适用于数组
+ for-in 循环会遍历数组的所有键，包括非数字的键

+ 类数组对象   本质上还是对象而不是数组
  + 典型的“类似数组的对象”是 函数的 arguments 对象， 以及大多数 DOM 元素集，还有字符串。
  + 数组的slice方法可以将“类似数组的对象”变成真正的数组。
```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

var arr = Array.prototype.slice.call(arrayLike);
//也可以通过call直接调用数组的方法，但是这种方法比数组原生的要慢
//所以最好先将之转化为数组，在调用数组的方法
```

## 静态方法

+ 检测数组
+ 对于一个网页或者一个全局作用域， `instanceof`操作符就能得到结果
  + 但对于2个或以上，因为存在不同版本的Array构造函数就得不到想要的结果
+ Array.isArray()
  + 该方法检测某个值到底是不是数组，而不管是在那个全局环境创建的
  + `Array.isArray(value)`
  + Array.isArray方法返回一个布尔值，表示参数是否为数组。它可以弥补typeof运算符的不足。

## 实例方法


### valueOf()，toString()、toLocaleString()

+ 数组的valueOf方法返回数组本身。
+ 数组的toString方法返回数组的字符串形式,每个值以逗号分隔。
+ `toLocaleString()`方法返回类似 toString()

### push()、pop()、shift()、unshift()

+ 栈方法
  + ECMAScript为数组提供了 `push() 和 pop()`方法
  + 栈的访问规则是LIFO(Last-In-First-Out,后进先出)的数据结构，也就是最新添加的项最早被移除,栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部
  + `push()` 可以接受任意数量的参数，把他们添加到数组结尾，并返回修改后数组的长度
  + `pop()` 方法则从数组末尾移除最后一项，减少数组的length值，返回返回移除的项
+ 队列方法
  + 队列的数据结构访问规则是FIFO(First-In-First-Out,先进先出)。队列在列表的末端添加项，从列表的前端移除项
  + `shift()` 方法移除数组的第一个元素，并返回该元素
  + `unshift()` 方法能在数组前端添加任意个项并返回数组长度。
  + 同时使用`unshift() 和 pop()` 方法可以从相反的方向来模拟队列
+ 这四个方法都会改变原数组

### join()、concat()

+ join(',') 
  + join 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。
  + 如果不提供参数，默认用逗号分隔。
  + 如果数组成员是undefined或null或空位，会被转成空字符串。
  + 通过 call() 方法这可方法可以用于字符串或类似数组的对象。

+ `concat()` 
  + concat 方法用于多个数组的合并。
  + 它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
  + 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。
  + 所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。
```js
var obj = { a: 1 };
var oldArray = [obj];
var newArray = oldArray.concat();
obj.a = 2;
newArray[0].a // 2
```

### slice()、splice()

+ slice()
  + slice()方法用于截取目标数组的一部分，返回一个新数组，原数组不变。
  + `arr.slice(start,end)`
  + 第一个参数为起始位置（从0开始，会包括在返回的新数组之中）
  + 第二个参数为终止位置（但该位置的元素本身不包括在内）
  + 如果省略第二个参数，则一直返回到原数组的最后一个成员。
  + 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。
```js
//如果slice()方法的参数是负数，则表示倒数计算的位置。
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]

//slice()方法的一个重要应用，是将类似数组的对象转为真正的数组。
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

+ splice()  删除、插入、替换
  + splice()方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
  + `splice(index,delete,插入或替换的一个或多个参数)`方法
  + 返回被删除的项
  + 起始位置如果是负数，就表示从倒数位置开始删除。
  + 第一个参数是删除的起始位置（从0开始）
  + 第二个参数是被删除的元素个数,如果后面还有更多参数，则表示这些就是要被插入数组的新元素
  + 替换,起始位置,删除个数,插入的一个或多个参数
  + 插入，将删除个数设置为0
  + 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组
```js
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

### sort()、reverse()

+ 重排序

+ sort()
  + sort方法对数组成员进行排序，默认是按照字典顺序排序。
  + 排序后，原数组将被改变。
  + 数值会被转换为字符串后在按照字典顺序进行比较
  + 自定义方式排序
    + 可以传入一个函数作为参数。
    + sort的参数函数本身接受两个参数，表示进行比较的两个数组成员
    + 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面
    + 其他情况下，都是第一个元素排在第二个元素前面。
```js
  `sort()` 方法会调用每个数组项的 `toString()`转型方法，然后比较得到的字符串，即使数组的每一项都是数值，该方法比较的也是字符串
  升序排列
  arr.sort(function(a,b){return a - b});
  降序排列
  arr.sort(function(a,b){return b - a});

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
```

+ reverse()
  + reverse 方法用于颠倒排列数组元素，返回改变后的数组。
  + 注意，该方法将改变原数组。

### 迭代方法

+ map()
  + map 方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
  + map 方法接受一个函数作为参数。
    + 该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
  + 空位会被跳过
```js
[1, 2, 3].map(function(item, index, arr) {
  return item * index;
});    // [0, 2, 6]

//map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
  return this[e];
}, arr);    // ['b', 'c']
//上面代码通过map方法的第二个参数，将回调函数内部的this对象，指向arr数组。
```

+ forEach()
  + forEach 同 map 方法相似，但是没有返回值
  + forEach 方法无法中断执行，总是会将所有成员遍历完。
  + 如果希望符合某种条件时，就中断遍历，要使用for循环。
  + 空位会被跳过
```js
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);
// forEach方法也可以接受第二个参数，绑定参数函数的this变量。
var out = [];
[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);
out // [1, 4, 9]
//上面代码中，空数组out是forEach方法的第二个参数，结果，回调函数内部的this关键字就指向out。
```

+ filter()
  + filter 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。
  + 它的参数是一个函数，所有数组成员依次执行该函数，返回结果为true的成员组成一个新数组返回。
  + 该方法不会改变原数组。
```js
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
});    // [4, 5]
arr.filter(Boolean);    //filter方法返回数组arr里面所有布尔值为true的成员。

//filter方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});    // [1, 3, 5]

// filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量。
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```

+ some()，every()
  + 这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。
  + `every()` 如果该函数对每一项都返回 true , 则返回 true
    + `array.every(function(currentValue,index,arr), thisValue)`
    + thisValue 作用对象
  + `some()` 如果该函数任意一项返回 true , 则返回 true
+ 它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。
  
  + 同样接受第二个函数来绑定内部 this 变量
  
### 归并

+ reduce()，reduceRight()
  + reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。
  + 一个从头开始迭代，一个从末尾开始迭代
  + reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数。
    1. 累积变量，默认为数组的第一个成员
    2. 当前变量，默认为数组的第二个成员
    3. 当前位置（从0开始）
    4. 原数组
    - 这四个参数之中，只有前两个是必须的，后两个则是可选的。
  - 第一次迭代的累计变量为索引0的值   当前变量为索引 1 的值
  + 往后的迭代累计变量为上次的返回值,如无返则为`undefined
```js
//reduce() 方法求和
let values = [1, 2, 3, 4, 5, 6];
let sum = values.reduce(function(prev, cur, index, array){
  return prev + cur;
});   // 21

[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

//如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数。
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);    // 25
//上面的第二个参数相当于设定了默认值，处理空数组时尤其有用。
function add(prev, cur) {
  return prev + cur;
}

[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
```

### 位置方法

+ indexOf()，lastIndexOf()
  + 两个方法都接收两个参数：要查找的项和（可选的）查找的起点位置
  + 返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

# ES6 扩展

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
  'spore'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spore"]
/**
 * 上面代码对数组 arr 按照首字母进行排序。
 * 排序结果中，straw 在 spore 的前面，跟原始顺序一致，所以排序算法 stableSorting 是稳定排序。
*/

const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// ["apple", "peach", "spore", "straw"]
/**
 * 排序结果是 spore 在 straw 前面，跟原始顺序相反，所以排序算法 unstableSorting 是不稳定的。
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
