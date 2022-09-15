# Object类型

+ 创建对象 `let o = new Object();`  没有参数就是创建空对象
  + 空对象同等与 `Object(undefined) 、Object(null)`
  + 如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例
  + 如果是对象则返回对象
  + 使用 new 关键字 Object 的构造函数 Object 本身也是一个函数
+ `let person = { };`       使用对象字面量
  + 括号里不写属性方法，可以定义包含默认属性和方法的对象
  + 对象是键值对的集合：对象是由属性和方法构成的 (ps：也有说法为：对象里面皆属性，认为方法也是一个属性)
  + 在使用字面量创建时不会调用object构造函数
+ 数值的键名会被转化为字符串 symbol 值也可以作为键名
  + 对象的每个键又称为 `property`

+ 让对象保持被解释为表达式而不是语句块
  + `({foo:123})` 将对象包裹在圆括号里， 因为圆括号的里面，只能是表达式

+ `Constructor` 属性保存着创建当前对象的构造函数

+ 清空对象
  + person={};      //person对象不再具有任何属性
  + person=null;    //表示将person变量的值赋为null，从此以后person是一个空的对象指针

+ 属性是否存在： in 运算符
+ 属性的遍历：for...in 循环

---

+ 对象实例的基础属性和方法
  + constructor -> 用于创建当前对象的方法
  + hasOwnProperty(propertyName:String) -> 判断当前实例上是否拥有指定属性
  + isPrototypeof(Object) -> 判断当前对象是否为另一个对象的原型
  + propertyIsEnumerable(propertyName:String) -> 用于判断指定属性是否可用
  + toLocaleString() -> 返回对象的字符串表示(本地)
  + toString()
  + valueOf() -> 返回对象对应的字符串、数值或布尔值

## 对象属性操作

+ 方式一:  . 语法
  + student.name      获取到name属性的值，为："李白"
  + student.say       获取到一个函数
  + 数值键名不能使用点语法

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

+ `student["gender"]="男"`    等价于：    `student.gender="男"`
  - 含义：如果student对象中没有gender属性，就添加一个gender属性，值为"男"
  - 如果student对象中有gender属性，就修改gender属性的值为"男"

## 删除属性

+ delete student["gender"]
+ delete student.gender
+ delete 只能删除对象中的属性,不能删除变量
+ 只有一种情况，delete命令会返回false，那就是该属性存在，且不得删除。

## Object 的静态方法

+ Object 对象的本身方法
  + 就是直接定义在 Object 对象的方法

+ 由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。
  + `Object.keys(obj).length`
  + `Object.getOwnPropertyNames(obj).length`

+ 对象属性模型的相关方法
  + Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
  + Object.defineProperty()：通过描述对象，定义某个属性。
  + Object.defineProperties()：通过描述对象，定义多个属性。

+ 控制对象状态的方法
  + Object.preventExtensions()：防止对象扩展。
  + Object.isExtensible()：判断对象是否可扩展。
  + Object.seal()：禁止对象配置。
  + Object.isSealed()：判断一个对象是否可配置。
  + Object.freeze()：冻结一个对象。
  + Object.isFrozen()：判断一个对象是否被冻结。

+ 原型链相关方法
  + Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
  + Object.getPrototypeOf()：获取对象的Prototype对象。

### Object.keys()

+ Object.keys() 查看一个对象本身的所有属性
  + 该方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。
  + 只返回可枚举的属性

### Object.getOwnPropertyNames(obj)

+ Object.getOwnPropertyNames 方法用来遍历对象的属性。
  + 接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。
  + 该方法返回不可枚举的属性名。

+ 静态方法 `Reflect.ownKeys(obj)` 返回一个由目标对象自身的属性键组成的数组。
  + 如果目标不是对象则抛出错误

## Object的实例方法

+ Object 的实例方法
  + 就是定义在 Object 原型对象 Object.prototype 上的方法
  + 它可以被Object实例直接使用。

+ Object实例对象的方法，主要有以下六个
  + Object.prototype.valueOf()
  + Object.prototype.toString()
  + Object.prototype.toLocaleString()
    - 返回当前对象对应的本地字符串形式。
  + Object.prototype.hasOwnProperty(propertyName)
    - 判断某个属性是否为当前对象自身的属性，而不是继承自原型对象的属性。
  + Object.prototype.isPrototypeOf(object)
    - 判断当前对象是否为另一个对象的原型。
  + Object.prototype.propertyIsEnumerable(propertyName)
    - 判断某个属性是否可枚举。
    - 用于检查给定属性是否能够使用 `for-in`语句来枚举,属性必须是字符串

### valueOf()

+ valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。
+ valueOf方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法
+ 返回当前对象对应的值。
  - 返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值一样

### toString()

+ toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
+ 数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。

+ Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型。
+ 由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，
+ 所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。
+ 通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
```js
var obj = {};
obj.toString() // "[object Object]"
//结果返回一个字符串object Object，其中第二个Object表示该值的构造函数

Object.prototype.toString.call(value)
数值：返回[object Number]。
字符串：返回[object String]。
布尔值：返回[object Boolean]。
undefined：返回[object Undefined]。
null：返回[object Null]。
数组：返回[object Array]。
arguments 对象：返回[object Arguments]。
函数：返回[object Function]。
Error 对象：返回[object Error]。
Date 对象：返回[object Date]。
Math 对象：返回[object Math]。
RegExp 对象：返回[object RegExp]。
其他对象：返回[object Object]。

Object.prototype.toString.call(undefined) === '[object Undefined]' // true

let type = function (o){
  let s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
console.log(type(/abcd/));  // "regexp"

在上面这个type函数的基础上，还可以加上专门判断某种类型数据的方法。

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

### toLocaleString()

+ Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。
+ 这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。

+ 目前，主要有三个对象自定义了toLocaleString方法。
  + Array.prototype.toLocaleString()
  + Number.prototype.toLocaleString()
  + Date.prototype.toLocaleString()

### hasOwnProperty()

+ Object.prototype.hasOwnProperty方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。

## 属性描述对象

+ 每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。每个属性都有一个 [[Prototype]]

```js
//属性描述对象提供6个元属性。
{
  // 属性描述对象的各个属性称为“元属性”，因为它们可以看作是控制属性的属性.
  value: 123,
  writable: false, // 是否可以写入改变，禁止修改后，修改不会生效，但是也不会报错
  enumerable: true, // 是否允许遍历
  configurable: false, // 是否可以配置，
  get: undefined,
  set: undefined
}
```

+ 对象属性的描述
  + `configurable:false` 
    - configurable是一个布尔值，表示可配置性，
    - 默认为true。
    - 如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。
    - 也就是说，configurable属性控制了属性描述对象的可写性。
  + `enumerable:false`  
    - enumerable是一个布尔值，表示该属性是否可遍历，
    - 默认为true。
    - 如果设为false，会使得某些操作（比如for...in循环、Object.keys()、JSON.stringify方法）跳过该属性。
  + `writable:false`  
    - writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），
    - 默认为 true。
  + `value:'小明'`  
    - value是该属性的属性值，
    - 默认为undefined。
  + `get`
    - get是一个函数，表示该属性的取值函数（getter），
    - 默认为undefined。
  + `set`
    - set是一个函数，表示该属性的存值函数（setter），
    - 默认为undefined。

+ 注意，一旦定义了取值函数get（或存值函数set），就不能将 writable 属性设为 true，或者同时定义 value 属性，否则会报错。

+ 存取器
  - 除了直接定义以外，属性还可以用存取器定义。
  - 其中，存值函数称为setter，使用属性描述对象的set属性；
  - 取值函数称为getter，使用属性描述对象的get属性。
  - 一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数
```js
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});

obj.p // "getter"
obj.p = 123 // "setter: 123"

// 写法二
var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};

上面两种写法，虽然属性p的读取和赋值行为是一样的，但是有一些细微的区别。
第一种写法，属性p的configurable和enumerable都为false，从而导致属性p是不可遍历的；
第二种写法，属性p的configurable和enumerable都为true，因此属性p是可遍历的。
实际开发中，写法二更常用。

注意，取值函数 get 不能接受参数，存值函数 set 只能接受一个参数（即属性的值）。

存取器往往用于，属性的值依赖对象内部数据的场合。
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw new Error('新的值必须大于当前值');
  }
};
obj.next // 5
obj.next // 6
obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

### Object.getOwnPropertyDescriptor()

+ `Object.getOwnPropertyDescriptor(obj,property)` 
  - 只能用于对象自身的属性，不能用于继承的属性。
  - 可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

+ `Object.getOwnPropertySymbols(obj);` 在给定对象自身上找到的所有 Symbol 属性的数组

### Object.prototype.propertyIsEnumerable()

+ 实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。
+ 注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false。

### Object.defineProperty()，Object.defineProperties()

+ `Object.defineProperties();`  方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
  + `Object.defineProperties(obj, props)`
  + 参数： 目标对象 ， 一个或多个属性名称以及描述

+ `Object.defineProperty();`   作用同上
  + `Object.defineProperty(obj, prop, descriptor)`
  + 参数： 目标对象 ， 属性名称 ， 属性描述对象

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

## 对象的拷贝

```js
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })

//上面代码中，hasOwnProperty那一行用来过滤掉继承的属性，否则可能会报错，
//因为Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象。
```

## 控制对象状态 防篡改对象

+ 手工设置对象的属性

```js
  [[Configurable]]
  [[Writable]]
  [[Enumerable]]
  [[Value]]
  [[Get]]
  [[Set]]
```

+ 冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，
+ 最弱的一种是Object.preventExtensions，其次是Object.seal，最强的是Object.freeze。

+ 一旦把对象设定为防篡改就无法撤销

+ 不可扩展对象
  + `Object.preventExtensions(obj)` 方法可以禁止给对象添加属性和方法
  + 在严格模式下给不可扩展对象添加属性或方法会报错
  + 但可以修改和删除已经存在的对象成员
  + `Object.isExtensible()` 确定对象是否可扩展
    + 检测密封对象也会返回 `false`  因为密封对象不可扩展

+ 密封的对象
  + 密封对象,将已有的成员的 `[[Configurable]]`  属性设置为`false`, 这意味着不能删除属性和方法,因为不能使用`Object.defineProperty()`把数据属性修改为访问器属性,或者相反,属性值是可以修改的.
  + 密封对象 `Object.seal(obj)`方法
  + 在严格模式下添加删除都会报错
  + 使用`Object.isSealed()` 确定对象是否被密封

+ 冻结的对象
  + 最严格的防篡改级别是冻结对象( frozen object),冻结的对象既不可扩展，又是密封的，而且对象数据属性的`[[Writable]]`特性会被设置为`false`。
  + 如果定义`[[Set]]`函数,访问器属性仍然是可写的。
  + EC5定义的`object.freeze(obj)`方法可以用来冻结对象。
  + `Object.isFrozen()` 方法用于检测冻结对象

+ 局限性
  + 可以通过改变原型对象，来为对象增加属性。
  + 另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。
```js
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
//无法改变指向其他值，但是可以改变其指向的数组
```

# ES6 扩展

## 属性的简洁表示法

+ ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
+ 注意，简写的对象方法不能用作构造函数，会报错。
+ 变量名和对象属性名相同就可以简写,函数也一样
```js
const foo = 'bar';
const baz = {foo};    // {foo: "bar"}

// 方法也可以简写。

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
const proto = {foo: 'hello',obj:{a:1,name:{age:18}}};
// 解构赋值连续使用
const {obj:{a}} = proto; // a == 1 , 被声明的只有 a, 对象 obj 并未声明,可以多层连续使用
const {obj:{name:{age}}} // age == 18
const {obj:{name:{age:data}}} // 改名 data == age == 18

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

## 可选链操作符

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

## 空值判断运算符

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

- 为了避免这种情况，ES2020 引入了一个新的 空值判断运算符 ??。
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

# ES6 Object.xxx
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
Object.setPrototypeOf(undefined, {})
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
