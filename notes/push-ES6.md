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