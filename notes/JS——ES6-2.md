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

# Promise 对象

+ Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
+ 它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

+ 所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
+ 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
+ Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

+ Promise 对象有以下两个特点。

1. 对象的状态不受外界影响。
   + Promise 对象代表一个异步操作，有三种状态
     + pending（进行中）、fulfilled（已成功）和rejected（已失败）
   + 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
   + 这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果
   + Promise 对象的状态改变，只有两种可能：
     + 从 pending 变为 fulfilled 和 
     + 从 pending 变为 rejected。
   + 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
   + 如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。
   + 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

+ resolved 统一只指 fulfilled 状态，不包含 rejected 状态。(方便学习，都代表成功)

+ 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
+ 此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

+ Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
+ 其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
+ 第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

+ 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署 Promise 更好的选择。

## 基本用法

+ 详情
  + https://wangdoc.com/es6/promise.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95

+ ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
+ Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。
+ 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

+ resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
+ reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

+ Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。
```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

+ then 方法可以接受两个回调函数作为参数。
+ 第一个回调函数是 Promise 对象的状态变为 resolved 时调用
+ 第二个回调函数是 Promise 对象的状态变为 rejected 时调用
+ 其中，第二个函数是可选的，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。

```js
//例子
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});

// timeout 方法返回一个 Promise 实例，表示一段时间以后才会发生的结果。
// 过了指定的时间（ms参数）以后，Promise 实例的状态变为 resolved，就会触发 then 方法绑定的回调函数。
```

+ Promise 新建后就会立即执行。
```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved

/**
 * Promise 新建后立即执行，所以首先输出的是 Promise
 * 然后，then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以 resolved 最后输出。
*/
```

+ 异步加载图片的例子
```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
// 使用 Promise 包装了一个图片加载的异步操作。
// 如果加载成功，就调用 resolve 方法，否则就调用 reject 方法。
```

+ Promise 对象实现的 Ajax 操作的例子
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

/**
 * getJSON 是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个 Promise 对象
 * 需要注意的是，在 getJSON 内部，resolve 函数和 reject 函数调用时，都带有参数。
 * 如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数.
 * reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；
 * resolve 函数的参数除了正常的值以外，还可能是另一个 Promise 实例
 * 比如像下面这样。
*/
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
// p1 和 p2 都是 Promise 的实例，但是 p2 的 resolve 方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。
```
+ 注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。
+ 如果 p1 的状态是 pending，那么 p2 的回调函数就会等待 p1 的状态改变
+ 如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会立刻执行。
```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
+ 上面代码中，p1 是一个 Promise，3 秒之后变为 rejected
+ p2 的状态在 1 秒之后改变，resolve 方法返回的是 p1
+ 由于 p2 返回的是另一个 Promise，导致 p2 自己的状态无效了，由 p1 的状态决定 p2 的状态。
+ 所以，后面的 then 语句都变成针对后者（p1）。
+ 又过了 2 秒，p1 变为 rejected，导致触发 catch 方法指定的回调函数。

+ 注意，调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行。
```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2); // 尽管已经执行了状态，但是还是会执行
}).then(r => {
  console.log(r);
});
// 2
// 1

/**
 * 调用 resolve(1) 以后，后面的 console.log(2) 还是会执行，并且会首先打印出来。
 * 这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
*/
```

+ 一般来说，调用 resolve 或 reject 以后，Promise 的使命就完成了，
+ 后继操作应该放到 then 方法里面，而不应该直接写在 resolve 或 reject 的后面。
+ 所以，最好在它们前面加上 return 语句，这样就不会有意外。
```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## Promise.prototype.xxx
## 1. then()

+ Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。
+ 它的作用是为 Promise 实例添加状态改变时的回调函数。
+ then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

+ then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。
+ 因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。
```js
// getJSON 方法在 ajax 例子中
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
/**
 * 上面的代码使用 then 方法，依次指定了两个回调函数。
 * 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
*/
```

+ 采用链式的 then，可以指定一组按照次序调用的回调函数。
+ 这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），
+ 这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。
```js
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
/**
 * 第一个 then 方法指定的回调函数，返回的是另一个 Promise 对象。
 * 这时，第二个 then 方法指定的回调函数，就会等待这个新的 Promise 对象状态发生变化。
 * 如果变为 resolved，就调用第一个回调函数，如果状态变为 rejected，就调用第二个回调函数。
*/
// 采用箭头函数
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

## 2. catch()

+ Promise.prototype.catch() 方法是 
+ .then(null, rejection) 或 .then(undefined, rejection) 的别名，用于指定发生错误时的回调函数。
```js
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
/**
 * getJSON() 方法返回一个 Promise 对象，如果该对象状态变为 resolved，
 * 则会调用 then() 方法指定的回调函数；
 * 如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch() 方法指定的回调函数，处理这个错误。
*/
```
+ then() 方法指定的回调函数，如果运行中抛出错误，也会被 catch() 方法捕获。
```js
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));

// 例子
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test

// promise 抛出一个错误，就被 catch() 方法指定的回调函数捕获。
// 注意，上面的写法与下面两种写法是等价的。
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
// 比较上面两种写法，可以发现 reject() 方法的作用，等同于抛出错误。
```

+ 如果 Promise 状态已经变成 resolved，再抛出错误是无效的。
```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
// Promise 在 resolve 语句后面，再抛出错误，不会被捕获，等于没有抛出。
// 因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
```

+ Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
+ 也就是说，错误总是会被下一个 catch 语句捕获。
```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

/**
 * 上面代码中，一共有三个 Promise 对象：一个由 getJSON() 产生，两个由 then() 产生。
 * 它们之中任何一个抛出的错误，都会被最后一个 catch() 捕获。
*/
```

+ 一般来说，不要在 then() 方法里面定义 Reject 状态的回调函数（即 then 的第二个参数），
+ 总是使用 catch 方法。

+ 跟传统的 try/catch 代码块不同的是，如果没有使用 catch() 方法指定错误处理的回调函数，
+ Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
+ 即使报错也不会影响程序的继续运行，也就是 Promise 中存在的错误不会影响代码的运行
```js
// Promise 指定在下一轮“事件循环”再抛出错误。
// 到了那个时候，Promise 的运行已经结束了，
// 所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0);// 结束后才抛出的错误
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

+ 一般总是建议，Promise 对象后面要跟 catch() 方法，这样可以处理 Promise 内部发生的错误。
+ catch() 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then() 方法。
```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on

/**
 * 上面代码运行完 catch() 方法指定的回调函数，会接着运行后面那个 then() 方法指定的回调函数。
 * 如果没有报错，则会跳过 catch() 方法。
 * 但是在跳过后的 then 方法中再次报错，就跟前面的 catch 无关了
*/
```

+ catch() 方法之中，还能再抛出错误。提供给后续的 catch() 捕获。

## 3. finally()

+ finally() 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
+ 该方法是 ES2018 引入标准的。
```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
// 不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

// 例子，服务器使用 Promise 处理请求，然后使用 finally 方法关掉服务器。
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```
+ finally 方法的回调函数不接受任何参数，这意味着没有办法知道，
+ 前面的 Promise 状态到底是 fulfilled 还是 rejected。
+ 这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
+ finally 本质上是 then 方法的特例。相当于将 then 方法成功和错误都要执行的代码只写一遍

+ 实现
```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
// 不管前面的 Promise 是 fulfilled 还是 rejected，都会执行回调函数 callback。
```
+ 从上面的实现还可以看到，finally 方法总是会返回原来的值。
```js
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})
```

## Promise.xxx
## 1. all()

+ Promise.all() 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
const p = Promise.all([p1, p2, p3]);
```
+ Promise.all() 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，
+ 就会先调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理.
+ 另外，Promise.all() 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

+ p 的状态由 p1、p2、p3决定，分成两种情况。
  1. 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
  2. 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。
```js
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});

/**
 * promises 是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成 fulfilled，
 * 或者其中有一个变为 rejected，才会调用 Promise.all 方法后面的回调函数。
*/
```
+ 注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，
+ 并不会触发 Promise.all() 的 catch 方法。

## 2. race()

+ Promise.race() 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
const p = Promise.race([p1, p2, p3]);
```
+ 上面代码中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。
+ 那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

+ Promise.race() 方法的参数与 Promise.all() 方法一样，如果不是 Promise 实例，
+ 就会先调用 Promise.resolve() 方法，将参数转为 Promise 实例，再进一步处理。

+ 例子：如果指定时间内没有获得结果，就将 Promise 的状态变为 reject，否则变为 resolve。
```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);

// 如果 5 秒之内 fetch 方法无法返回结果，变量 p 的状态就会变为 rejected，
// 从而触发 catch 方法指定的回调函数。
```

## 3. allSettled()

+ Promise.allSettled() 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
+ 只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束。该方法由 ES2020 引入。
```js
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
// 上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。
```

+ 该方法返回的新的 Promise 实例，一旦结束，状态总是 fulfilled，不会变成 rejected。
+ 状态变成 fulfilled 后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入 Promise.allSettled() 的 Promise 实例。
```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]

/**
 * Promise.allSettled() 的返回值 allSettledPromise，状态只可能变成 fulfilled
 * 它的监听函数接收到的参数是数组 results。
 * 该数组的每个成员都是一个对象，对应传入 Promise.allSettled() 的两个 Promise 实例。
 * 每个对象都有 status 属性，该属性的值只可能是字符串 fulfilled 或字符串 rejected。
 * fulfilled 时，对象有 value 属性，rejected 时有 reason 属性，对应两种状态的返回值。
*/

const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
```
+ 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。
+ 这时，Promise.allSettled() 方法就很有用。
+ 如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all() 方法无法做到这一点。
```js
const urls = [ /* ... */ ];
const requests = urls.map(x => fetch(x));

try {
  await Promise.all(requests);
  console.log('所有请求都成功。');
} catch {
  console.log('至少一个请求失败，其他请求可能还没结束。');
}
// 上面代码中，Promise.all() 无法确定所有请求都结束。
// 想要达到这个目的，写起来很麻烦，有了 Promise.allSettled()，这就很容易了。
```

## 4. any()

+ ES2021 引入了 Promise.any() 方法。
+ 该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
+ 只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；
+ 如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

+ Promise.any() 跟 Promise.race() 方法很像，只有一点不同，就是不会因为某个 Promise 变成 rejected 状态而结束。
```js
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
// Promise.any() 方法的参数数组包含三个 Promise 操作。
// 其中只要有一个变成 fulfilled，Promise.any() 返回的 Promise 对象就变成fulfilled。
// 如果所有三个操作都变成 rejected，那么 await 命令就会抛出错误。
```
+ Promise.any() 抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。
+ 它相当于一个数组，每个成员对应一个被 rejected 的操作所抛出的错误。
+ 下面是 AggregateError 的实现示例。
```js
new AggregateError() extends Array -> AggregateError

const err = new AggregateError();
err.push(new Error("first error"));
err.push(new Error("second error"));
throw err;

// 捕捉错误时，如果不用 try...catch 结构和 await 命令，可以像下面这样写。
Promise.any(promises).then(
  (first) => {
    // Any of the promises was fulfilled.
  },
  (error) => {
    // All of the promises were rejected.
  }
);

// 例子
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```

## 5. resolve()

+ 有时需要将现有对象转为 Promise 对象，Promise.resolve() 方法就起到这个作用。
```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
// 上面代码将 jQuery 生成的 deferred 对象，转为一个新的 Promise 对象。

// Promise.resolve() 等价于下面的写法。
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

+ Promise.resolve() 方法的参数分成四种情况。
  1. 参数是一个 Promise 实例
     + 如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。
  2. 参数是一个 thenable 对象
     + thenable 对象指的是具有 then 方法的对象，比如下面这个对象。
```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

// Promise.resolve() 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then() 方法。
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
// thenable 对象的 then() 方法执行后，对象 p1 的状态就变为 resolved，从而立即执行最后那个 then() 方法指定的回调函数，输出 42。
```
  3. 参数不是具有 then() 方法的对象，或根本就不是对象
     + 如果参数是一个原始值，或者是一个不具有 then() 方法的对象，则 Promise.resolve() 方法返回一个新的 Promise 对象，状态为 resolved。
```js
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
/**
 * 上面代码生成一个新的 Promise 对象的实例 p。
 * 由于字符串 Hello 不属于异步操作（判断方法是字符串对象不具有 then 方法），
 * 返回 Promise 实例的状态从一生成就是 resolved，所以回调函数会立即执行。
 * Promise.resolve() 方法的参数，会同时传给回调函数。
*/
```
  4. 不带有任何参数
     + Promise.resolve() 方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。
     + 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve() 方法。
```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```
+ 需要注意的是，立即 resolve() 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three

// setTimeout(fn, 0) 在下一轮“事件循环”开始时执行
// Promise.resolve() 在本轮“事件循环”结束时执行
// console.log('one') 则是立即执行，因此最先输出。
```

## 6. reject()

+ Promise.reject(reason) 方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。
```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
+ 上面代码生成一个 Promise 对象的实例 p，状态为 rejected，回调函数会立即执行。
+ Promise.reject() 方法的参数，会原封不动地作为 reject 的理由，变成后续方法的参数。
```js
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
// 上面代码中，Promise.reject() 方法的参数是一个字符串，后面 catch() 方法的参数 e 就是这个字符串。
```

## 7. try()

+ 实际开发中，经常遇到一种情况：不知道或者不想区分，函数 f 是同步函数还是异步操作，但是想用 Promise 来处理它。
+ 因为这样就可以不管 f 是否包含异步操作，都用 then 方法指定下一步流程，用 catch 方法处理 f 抛出的错误。一般就会采用下面的写法。
```js
Promise.resolve().then(f);

// 上面的写法有一个缺点，就是如果 f 是同步函数，那么它会在本轮事件循环的末尾执行。
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

// 上面代码中，函数 f 是同步的，但是用 Promise 包装了以后，就变成异步执行了。
```

+ 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 
```js
// 第一种写法是用 async 函数来写。
const f = () => console.log('now');
(async () => f())();
console.log('next');
// now    next
/**
 * 第二行是一个立即执行的匿名函数，会立即执行里面的 async 函数，
 * 因此如果 f 是同步的，就会得到同步的结果；
 * 如果 f 是异步的，就可以用 then 指定下一步，就像下面的写法。
*/
(async () => f())()
.then(...);

// 需要注意的是，async () => f() 会吃掉 f() 抛出的错误。
// 所以，如果想捕获错误，要使用 promise.catch 方法。
(async () => f())()
.then(...)
.catch(...)

// 第二种写法是使用 new Promise()。
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now    next
// 上面代码也是使用立即执行的匿名函数，执行 new Promise()。
// 这种情况下，同步函数也是同步执行的。
```

+ 鉴于这是一个很常见的需求，所以现在有一个提案，提供 Promise.try 方法替代上面的写法。
```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```

+ 由于 Promise.try 为所有操作提供了统一的处理机制，所以如果想用 then 方法管理流程，最好都用 Promise.try 包装一下。这样有许多好处，其中一点就是可以更好地管理异常。
```js
function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}
// 这是捕获错误可以使用 catch 方法
// 但是 database.users.get() 可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用 try...catch 去捕获。
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
// 上面这样的写法就很笨拙了，这时就可以统一用 promise.catch() 捕获所有同步和异步的错误。
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```
+ 事实上，Promise.try 就是模拟 try 代码块，就像 promise.catch 模拟的是 catch 代码块。

## 应用

### 加载图片

+ 我们可以将图片的加载写成一个 Promise，一旦加载完成，Promise 的状态就发生变化。
```js
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### Generator 函数与 Promise 的结合

+ 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个 Promise 对象。
```js
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);

// 上面代码的 Generator 函数 g 之中，有一个异步操作 getFoo，
// 它返回的就是一个 Promise 对象。函数 run 用来处理这个 Promise 对象，并调用下一个 next 方法。
```