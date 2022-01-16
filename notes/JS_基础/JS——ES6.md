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

## 笔记

+ 链式调用的方式也使回调更加的灵活
+ promise 状态的改变
  + 状态是 promise 是实例对象中的一个  `[[PromiseState]]` 属性
  + 状态拥有三种不同的值
    + `pending` 初始化还为决定
    + `resolved / fulfilled` 成功
    + `reject` 失败
  + 变化只有两种可能 ,成功和失败不能相互变化
    + `pending`  变为 `resolved`
    + `pending`  变为 `reject`
+ Promise 对象的值
  + 实力对象中的另一个值 `[[PromiseResult]]`
  + 保存着对象`[成功/失败]`的结果
  + 只有这两个函数可以修改
    + `resolve` 调用就可以修改
    + `reject`
  + 值会被传入后面的`then`方法的调用中

### Promise 对象的 API

+ Promise 构造函数：`Promise(executor){}`
  + executor 函数：执行器 `(resolve,reject)=>{}`
  + resolve 函数：内部定义成功时调用的函数 `value=>{}`
  + reject 函数：内部定义失败时调用的函数 `reason=>{}`
+ Promise.prototype.then 方法：`(onResolved,onRejected)=>{}`
  + onResolved 函数：成功时的回调函数 `value=>{}`
  + onRejected 函数：失败时的回调函数 `reason=>{}`
  + 返回一个新的 Promise 对象
+ `Promise.prototype.catch(reason=>{})` 方法用于失败时执行回调函数

### 使用

```js
// 基本的使用,已构造函数的方式创建一个 Promise , Promise 的返回值也是一个 Promise 函数
// 传入的 resolve 和 reject 都是一个函数,
// resolve 成功后调用
// reject 失败后调用
const P = new Promise((resolve, reject)=>{
    const i = Math.floor(Math.random() * 10) + 1;
    if(i>5){// 传入的 i 会传入 then 中的成功回调中
        resolve(i); // 成功就执行,且可以将 Promise 的状态设置为 成功
    }else{// 传入的 i 会传入 then 中的失败回调中
        reject(i); // 失败就执行,且可以将 Promise 的状态设置为 失败
    }
});
// then 也可以接受参数,两个也是一个成功调用,一个失败调用的函数
// 传入的回调函数可以接受 resolve 或 reject 传入的值
// 一般使用这两个来命名失败或成功的参数
// value 值
// reason 理由
P.then(value=>{
    log(value)
},reason=>{
    log(reason)
})
```

### 问题

+ 修改状态的方式有三种。
  + 除了成功和失败的方法，还可以利用 throw 抛出错误来改变为错误的状态
+ 指定多个成功/失败的回调函数,在状态改变之后都会进行调用
+ 改变状态和指定的回调执行的先后顺序
  + 两种都是有可能的
  + 先执行改变状态的情况为是同步任务的时候,或是延长更长的时间在指定 then 的回调
  + 先指定回调的情况为异步任务的时候
  + 回调只有在状态改变后在会调用执行
+ then 方法返回 Promise 状态是由什么决定的
  + 由指定的回调函数的执行结果来决定的
    + throw 抛出错误或异常, 返回的 Promise 状态就为失败
    + 返回的结果不是一个 Promise 对象, 则返回的状态为成功,且返回值就是成功的结果
    + 返回的结果如果是一个 promise对象,则返回的 promise 的状态就决定了返回的状态
+ 串联多个操作任务
  + 可以利用 then 方法返回的新 promise 进行链式的调用
+ promise 的异常穿透
  + 在链式调用时,只需要在最后利用 catch 方法处理失败的回调
  + 不论在哪一个 then 触发错误都会执行 catch 来处理错误
+ 如何中断 promise 链式调用
  + 返回一个空的 promise 对象 `return new Promise(()=>{})`
  + 因为空的 promise 对象状态是 pending
  + 因为状态未改变,所以后续的 then 都不会被调用

### 封装

+ node 文件读取封装

```js
function MyReadFile(path){
    return new Promise((resolve,reject)=>{
        require('fs').readFile(path,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

// node 中的 util.promisify 借助这个方法封装更方便
const util = require('util');
const fs = require('fs');
let MyReadFile = util.promisify(fs.readFile);
```

+ Ajax 的封装

```js
function MyAJAX(url){
    return new Promise((resolve,reject)=>{
        const x = new XMLHttpRequest();
        x.open('GET',url);
        x.onreadystatechange =function(){
            if(x.readyState === 4){
                if(x.status >= 200 && x.status < 300){
                    resolve(x.response);
                }else{
                    reject(x.status);
                }
            }
        }
    })
}
```

### 回调地狱

+ 利用链式的调用可以轻松的解决回调地狱的问题,就是避免多层嵌套
+ 且回调抵御不便于阅读和处理异常

## 自定义 Promise

+ 结构的搭建
+ 自定义封装存在的问题
  + then 方法不是微任务,而内部的 then 方法为 微任务
  + 微任务的执行时间会比异步的宏任务早

### ES5 函数版本

```js
function Promise(executor) {
	// 添加属性
	this.PromiseState = 'pending';
	this.PromiseResult = null;
	this.callbacks = [];
	// 保存实例对象
	const self = this;

	// resolve 函数
	function resolve(data) {
		if (self.PromiseState !== 'pending') return;
		// 功能一 改变状态	(promiseState)
		self.PromiseState = 'fulfilled'; // resolved
		// 功能二 设置对象的结果值 (promiseResult)
		self.PromiseResult = data;
		//调用成功的回调
		setTimeout(() => {
			self.callbacks.forEach(item => {
				item.onResolved(data)
			})
		})
	}
	// reject 函数
	function reject(data) {
		if (self.PromiseState !== 'pending') return;
		// 功能一 改变状态	(promiseState)
		self.PromiseState = 'rejected';
		// 功能二 设置对象的结果值 (promiseResult)
		self.PromiseResult = data;
		//调用成功的回调
		setTimeout(() => {
			self.callbacks.forEach(item => {
				item.onRejected(data)
			})
		})
	}

	//内部同步调用 [执行器函数]
	try {
		executor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}

Promise.prototype.then = function (onResolved, onRejected) {
	const self = this;
	//判断回调函数参数
	if (typeof onRejected !== 'function') {
		onRejected = reason => {
			throw reason;
		}
	}
	if (typeof onResolved !== 'function') {
		onResolved = value => value;
	}
	// 返回一个 Promise 对象
	return new Promise((resolve, reject) => {

		function callback(type) {
			try {
				let result = type(self.PromiseResult);
				if (result instanceof Promise) {
					// 如果是 Promise 对象直接用方法就可以改变状态
					result.then(v => {
						resolve(v);
					}, r => {
						reject(r);
					})
				} else {
					// 不是 promise 对象就返回状态成功,和结果值
					resolve(result);
				}
			} catch (error) {
				reject(error);
			}
		}

		// 调用回调函数 promiseState
		if (this.PromiseState === 'fulfilled') {
			setTimeout(() => {
				callback(onResolved);
			});
		}

		if (this.PromiseState === 'rejected') {
			setTimeout(() => {
				callback(onRejected);
			});
		}

		if (this.PromiseState === 'pending') {
			//保存回调函数
			this.callbacks.push({
				onResolved: function () {
					callback(onResolved)
				},
				onRejected: function () {
					callback(onRejected);
				}
			});
		}
	})
}

Promise.prototype.catch = function (onRejected) {
	return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
	return new Promise((resolve, reject) => {
		if (value instanceof Promise) {
			value.then(v => {
				resolve(v);
			}, r => {
				reject(r);
			})
		} else {
			resolve(value);
		}
	});
}

Promise.reject = function (reason) {
	return new Promise((resolve, reject) => {
		reject(reason);
	});
}

Promise.all = function (Promises) {
	let count = 0,
		arr = [];

	return new Promise((resolve, reject) => {
		Promises.forEach((p, i) => {
			p.then(v => {
				count++;
				arr[i] = v;
				if (count === Promises.length) {
					resolve(arr);
				}
			}, r => {
				reject(r)
			});
		});
	});
}

Promise.race = function (Promises) {

	return new Promise((resolve, reject) => {
		Promises.forEach((p) => {
			p.then(v => {
				resolve(v);
			}, r => {
				reject(r);
			});
		});
	});
}
```

### ES6 class 版本

```js
class Promise {
    
   constructor(executor) {
      this.PromiseState = 'pending'; // 设置初始状态
      this.PromiseResult = null; // 得到的结果
      this.callbacks = []; // 回调函数队列
      const self = this; // 固定 this

      function resolve(data) {
         if (self.PromiseState !== 'pending') return; // 判断是否改变过状态
         self.PromiseState = 'fulfilled'; // 改变状态
         self.PromiseResult = data; // 设置结果
         setTimeout(() => {
            // 遍历调用回调函数
            self.callbacks.forEach(item => {
               item.onResolved();
            })
         })
      }
      // 设置默认的 两个改变状态的函数
      function reject(data) {
         if (self.PromiseState !== 'pending') return;
         self.PromiseState = 'rejected';
         self.PromiseResult = data;
         setTimeout(() => {
            self.callbacks.forEach(item => {
               item.onResolved();
            })
         })
      }

      try { // 处理可能的错误
         executor(resolve, reject);
      } catch (e) {
         reject(e);
      }
   }

   then(onResolved, onRejected) {
      const self = this;
      if (typeof onRejected !== 'function') {// 传入不是方法或为传入 设置默认
         onRejected = reason => {
            throw reason;
         }
      }
      if (typeof onResolved !== 'function') {// 同样是设置默认值
         onResolved = value => value;
      }

      return new Promise((resolve, reject) => { // 返回值为一个 Promise 对象

         function callback(type) { // 包装重复的操作
            try {
               let result = type(self.PromiseResult); // then 方法回调的执行结果
               if (result instanceof Promise) { // 返回的结果是否是一个 Promise 对象
                  result.then(value => { // 是 Promise 就可以调用 then 方法
                     resolve(value);
                  }, reason => {
                     reject(reason);
                  })

               } else {
                  resolve(result);
               }
            } catch (e) {
               reject(e);
            }

         }

         if (this.PromiseResult === 'fulfilled') { // Promise 成功的处理
            setTimeout(() => {
               callback(onResolved);
            })
         }

         if (this.PromiseResult === 'rejected') { // Promise 失败的处理
            setTimeout(() => {
               callback(onRejected);
            })
         }

         if (this.PromiseState === 'pending') { // 异步处理或多次调用 then
            // 将回调函数保存
            this.callbacks.push({
               onResolved() {
                  callback(onResolved);
               },
               onRejected() {
                  callback(onRejected);
               }
            })
         }
      })
   }

   catch(onRejected) {
      return this.then(undefined, onRejected);
   }

   static resolve(value) {
      return new Promise((resolve, reject) => {
         if (value instanceof Promise) {
            value.then(value => {
               resolve(value);
            }, reason => {
               reject(reason);
            })
         } else {
            resolve(value);
         }
      })
   }

   static reject(reason) {
      return new Promise((resolve, reject) => {
         reject(reason);
      })
   }

   static all(Promises) {
      let count = 0, arr = [];

      return new Promise((resolve, reject) => {
         Promises.forEach((p, i) => {
            p.then(value => {
               count++;
               arr[i] = value;
               if (count === Promises.length) {
                  resolve(arr);
               }
            }, reason => {
               reject(reason);
            })
         });
      })
   }

   static race(Promises) {
      return new Promise((resolve, reject) => {
         Promises.forEach(p => {
            p.then(value => {
               resolve(value);
            }, reason => {
               reject(reason);
            })
         })
      });
   }
}

const { log } = console;

log(1)
const p = new Promise((r, j) => {
   setTimeout(() => {
      log(2);
      r();
   })
});

p.then(value => {
   log(3);
}, reason => {
   log('错误!');
}).then(v => {
   log(4);
})
```



## Promise.prototype.xxx

## 1. then()

+ Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。

+ 它的作用是为 Promise 实例添加状态改变时的回调函数。

+ then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

  + 若果接受到的不是一个函数，就会进行值传递
  + 传递的值并不是传入 then 方法的值，而是上一个 promise 的返回值

  ```js
  Promise.resolve(1)
      .then(2) // 不是函数 将 1 向后传递
      .then(Promise.resolve(3)) // 不是函数将 1继续传递
      .then(console.log) // 1
  ```

  

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
  2. 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个 reject 的实例的返回值，会传递给 p 的回调函数。
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
// 如果传入的参入为非 Promise 类型的对象,则返回的结果为成功的 Promise 对象
// 如果传入的对象为 Promise ,则返回 Promise 执行的结果
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
+ 会返回一个保持失败状态的 Promise 对象,失败的结果就是传入的值
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
const PreLoadImage = function (path) {
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

var FProxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

FProxy(1, 2) // 1
new FProxy(1, 2) // {value: 2}
FProxy.prototype === Object.prototype // true
FProxy.foo === "Hello, foo" // true

// 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。
```

## Proxy 支持的拦截操作

+ get(target, propKey, [receiver])
  + 拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
  + target 为目标对象
  + propKey 被修改属性的 key 值
  + receiver   它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
  
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
  + 拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, props)，返回一个布尔值。

+ preventExtensions(target)
  + 拦截 Object.preventExtensions(proxy)，返回一个布尔值。

+ getPrototypeOf(target)
  + 拦截 Object.getPrototypeOf(proxy)，返回一个对象。

+ isExtensible(target)
  + 拦截 Object.isExtensible(proxy)，返回一个布尔值。

+ setPrototypeOf(target, prototype)
  + 拦截 Object.setPrototypeOf(proxy, prototype)，返回一个布尔值。
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
let prototype = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(prototype);
obj.foo // "GET foo"
```

+ 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
```js
var pipe = function (value) {
  var funcStack = [];
  var OProxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return OProxy;
    }
  });

  return OProxy;
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
// 'preventExtensions'在proxy: trap上返回true，但是代理目标是可扩展的

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

# 优化

## 垃圾收集

+ 通过对象池来保存会经常更替的对象,避免垃圾收集过于频繁

# Module 的语法

+ 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
+ ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
/**
 * 上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（ _fs ），然后再从这个对象上面读取 3 个方法。
 * 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
*/


// ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。
// ES6模块
import { stat, exists, readFile } from 'fs';
/**
 * 上面代码的实质是从 fs 模块加载 3 个方法，其他方法不加载。
 * 这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
 * 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
*/
```

+ 由于 ES6 模块是编译时加载，使得静态分析成为可能。
+ 有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。
+ 除了静态加载带来的各种好处，ES6 模块还有以下好处。
  + 不再需要 UMD 模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
  + 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者 navigator 对象的属性。
  + 不再需要对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块提供。

## 严格模式

+ ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 "use strict" ;。

+ 严格模式主要有以下限制。
  + 变量必须声明后再使用
  + 函数的参数不能有同名属性，否则报错
  + 不能使用 with 语句
  + 不能对只读属性赋值，否则报错
  + 不能使用前缀 0 表示八进制数，否则报错
  + 不能删除不可删除的属性，否则报错
  + 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
  + eval 不会在它的外层作用域引入变量
  + eval 和 arguments 不能被重新赋值
  + arguments 不会自动反映函数参数的变化
  + 不能使用 arguments.callee
  + 不能使用 arguments.caller
  + 禁止 this 指向全局对象
  + 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
  + 增加了保留字（比如 protected、static 和 interface）
+ 其中，尤其需要注意 this 的限制。ES6 模块之中，顶层的 this 指向 undefined，即不应该在顶层代码使用 this。

## export 命令

+ 模块功能主要由两个命令构成：export 和 import。
+ export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。

+ 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
+ 如果你希望外部能够读取模块内部的某个变量，就必须使用 export 关键字输出该变量。
+ 下面是一个 JS 文件，里面使用 export 命令输出变量。
```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
// profile.js 文件，保存了用户信息。ES6 将其视为一个模块，里面用 export 命令对外部输出了三个变量。
```
+ export 的写法，除了像上面这样，还有另外一种。
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
// export 命令后面，使用大括号指定所要输出的一组变量。
// 它与前一种写法（直接放置在 var 语句前）是等价的，但是应该优先考虑使用这种写法。
// 因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。
```
+ export 命令除了输出变量，还可以输出函数或类（class）。
```js
export function multiply(x, y) {
  return x * y;
};
// 对外输出一个函数 multiply。
```
+ 通常情况下，export 输出的变量就是本来的名字，但是可以使用 as 关键字重命名。
```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
// 使用 as 关键字，重命名了函数 v1 和 v2 的对外接口。重命名后，v2 可以用不同的名字输出两次。
```
+ 需要特别注意的是，export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
```js
// 报错
export 1;

// 报错
var m = 1;
export m;
/**
 * 上面两种写法都会报错，因为没有提供对外的接口。
 * 第一种写法直接输出 1，
 * 第二种写法通过变量 m，还是直接输出 1。
 * 1 只是一个值，不是接口。正确的写法是下面这样。
*/
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
/**
 * 上面三种写法都是正确的，规定了对外的接口 m。
 * 其他脚本可以通过这个接口，取到值1 。
 * 它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
*/
```
+ 同样的，function 和 class 的输出，也必须遵守这样的写法。
```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```
+ 另外，export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 输出变量 foo，值为 bar，500 毫秒之后变成 baz。
```
+ 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新

+ export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。
+ 如果处于块级作用域内，就会报错，下一节的 import 命令也是如此。
+ 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
// export 语句放在函数之中，结果报错。
```

## import 命令

+ 使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块。
```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
/**
 * import 命令，用于加载 profile.js 文件，并从中输入变量。
 * import 命令接受一对大括号，里面指定要从其他模块导入的变量名。
 * 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
*/
```
+ 如果想为输入的变量重新取一个名字，import 命令要使用 as 关键字，将输入的变量重命名。
```js
import { lastName as surname } from './profile.js';
```
+ import 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
```js
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
// 脚本加载了变量 a，对其重新赋值就会报错，因为 a 是一个只读的接口。
// 但是，如果 a 是一个对象，改写 a 的属性是允许的。
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
// a 的属性可以成功改写，并且其他模块也可以读到改写后的值。
// 不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。
```
+ import 后面的 from 指定模块文件的位置，可以是相对路径，也可以是绝对路径。
+ 如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
```js
import { myMethod } from 'util';
// util 是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。
```
+ 注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行。
```js
foo();
import { foo } from 'my_module';
// 上面的代码不会报错,因为 import 的执行早于 foo 的调用。
// 这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前。
```
+ 由于 import 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
// 因为它们用到了表达式、变量和 if 结构。在静态分析阶段，这些语法都是没法得到值的。
```
+ 最后，import 语句会执行所加载的模块，因此可以有下面的写法。
```js
import 'lodash'; // 仅仅执行 lodash 模块，但是不输入任何值。

// 如果多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。
import 'lodash';
import 'lodash'; // 加载了两次 lodash，但是只会执行一次。

import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
// 虽然 foo 和 bar 在两个语句中加载，但是它们对应的是同一个 my_module 模块。也就是说，import 语句是 Singleton 模式。
```
+ 目前阶段，通过 Babel 转码，CommonJS 模块的 require 命令和 ES6 模块的 import 命令，可以写在同一个模块里面，但是最好不要这样做。
+ 因为 import 在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
```js
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

## 模块的整体加载

+ 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
```js
// 下面是一个 circle.js 文件，它输出两个方法 area 和 circumference。
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// 加载这个模块。
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```
+ 上面写法是逐一指定要加载的方法，整体加载的写法如下。
```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

// 注意，模块整体加载所在的那个对象（上例是 circle），应该是可以静态分析的，所以不允许运行时改变。
// 下面的写法都是不允许的。

circle.foo = 'hello';
circle.area = function () {};
```

## export default 命令

+ 使用 import 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。
+ 但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

+ 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。
```js
// export-default.js
export default function () {
  console.log('foo');
}
// 模块文件 export-default.js，它的默认输出是一个函数。
```
+ 其他模块加载该模块时，import 命令可以为该匿名函数指定任意名字。
```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
// 可以用任意名称指向 export-default.js 输出的方法，这时就不需要知道原模块输出的函数名。
// 需要注意的是，这时 import 命令后面，不使用大括号。
```

+ export default 命令用在非匿名函数前，也是可以的。
```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
// foo 函数的函数名 foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
```

+ export default 命令用于指定模块的默认输出。
+ 显然，一个模块只能有一个默认输出，因此 export default 命令只能使用一次。
+ 所以，import 命令后面才不用加大括号，因为只可能唯一对应 export default 命令。

+ 本质上，export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。
+ 所以，下面的写法是有效的。
```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```
+ 正是因为 export default 命令其实只是输出一个叫做 default 的变量，所以它后面不能跟变量声明语句。
```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
// export default a 的含义是将变量 a 的值赋给变量 default。所以，最后一种写法会报错。

// 同样地，因为 export default 命令的本质是将后面的值，赋给 default 变量，
// 所以可以直接将一个值写在 export default 之后。
// 正确
export default 42;
// 后一句报错是因为没有指定对外的接口，而前一句指定对外接口为 default。
// 报错
export 42;
```
+ 有了 export default 命令，输入模块时就非常直观了，以输入 lodash 模块为例。
```js
import _ from 'lodash';
// 如果想在一条 import 语句中，同时输入默认方法和其他接口，可以写成下面这样。
import _, { each, forEach } from 'lodash';
// 对应上面代码的 export 语句如下。
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
// 最后一行的意思是，暴露出 forEach 接口，默认指向 each 接口，即 forEach 和 each 指向同一个方法。
```
+ export default 也可以用来输出类。
```js
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

## export 与 import 的复合写法

+ 如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起。
```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
/**
 * export 和 import 语句可以结合在一起，写成一行。
 * 但需要注意的是，写成一行以后，foo 和 bar 实际上并没有被导入当前模块，
 * 只是相当于对外转发了这两个接口，导致当前模块不能直接使用 foo 和 bar。
*/
```
+ 模块的接口改名和整体输出，也可以采用这种写法。
```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```
+ 默认接口的写法如下。
```js
export { default } from 'foo';
```
+ 具名接口改为默认接口的写法如下。
```js
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;

// 同样地，默认接口也可以改名为具名接口。
export { default as es6 } from './someModule';
```
+ ES2020 之前，有一种 import 语句，没有对应的复合写法。
```js
import * as someIdentifier from "someModule";

// ES2020 补上了这个写法。
export * as ns from "mod";

// 等同于
import * as ns from "mod";
export {ns};
```

## 模块的继承

+ 模块之间也可以继承。

+ 假设有一个 circleplus 模块，继承了 circle 模块。
```js
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
/**
 * export * ，表示再输出 circle 模块的所有属性和方法。
 * 注意，export * 命令会忽略 circle 模块的 default 方法。
 * 然后，上面代码又输出了自定义的 e 变量和默认方法。
*/
```
+ 这时，也可以将 circle 的属性或方法，改名后再输出。
```js
// circleplus.js
export { area as circleArea } from 'circle';
// 只输出 circle 模块的 area 方法，且将其改名为 circleArea。
```
+ 加载上面模块的写法如下。
```js
// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
// import exp 表示，将 circleplus 模块的默认方法加载为 exp 方法。
```

## 跨模块常量

+ const 声明的常量只在当前代码块有效。
+ 如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3 

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```
+ 如果要使用的常量非常多，可以建一个专门的 constants 目录，将各种常量写在不同的文件里面，保存在该目录下。
```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```
+ 然后，将这些文件输出的常量，合并在 index.js 里面。
```js
// constants/index.js
export {db} from './db';
export {users} from './users';
```
+ 使用的时候，直接加载 index.js 就可以了。
```js
// script.js
import {db, users} from './constants/index';
```

## import()

+ import 命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import 命令叫做“连接” binding 其实更合适）。
+ 所以，下面的代码会报错。
```js
// 报错
if (x === 2) {
  import MyModule from './myModule';
}
/**
 * 引擎处理 import 语句是在编译时，这时不会去分析或执行 if 语句，所以 import 语句放在 if 代码块之中毫无意义，因此会报句法错误，而不是执行时错误。
 * 也就是说，import 和 export 命令只能在模块的顶层，不能在代码块之中（比如，在 if 代码块之中，或在函数之中）。
*/
```

+ 这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。
+ 在语法上，条件加载就不可能实现。如果 import 命令要取代 Node 的 require 方法，这就形成了一个障碍。
+ 因为 require 是运行时加载模块，import 命令无法取代 require 的动态加载功能。
```js
const path = './' + fileName;
const myModule = require(path);
// require 到底加载哪一个模块，只有运行时才知道。import 命令做不到这一点。
```

+ ES2020 提案 引入 import() 函数，支持动态加载模块。
```js
import(specifier)
/**
 * import 函数的参数 specifier，指定所要加载的模块的位置。
 * import 命令能够接受什么参数，import() 函数就能接受什么参数，两者区别主要是后者为动态加载。
*/
```
+ import() 返回一个 Promise 对象。下面是一个例子。
```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```
+ import() 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
+ 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
+ 另外，import() 函数与所加载的模块没有静态连接关系，这点也是与 import 语句不相同。
+ import() 类似于 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载。

### 适用场合

1. 按需加载。
  + import() 可以在需要的时候，再加载某个模块。
```js
button.addEventListener('click', event => {
  import('./dialogBox.js') // import() 方法放在 click 事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

2. 条件加载
   + import() 可以放在 if 代码块，根据不同的情况，加载不同的模块。
```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
// 如果满足条件，就加载模块 A，否则加载模块 B。
```

3. 动态的模块路径
   + import() 允许模块路径动态生成。
```js
import(f())
.then(...);
// 根据函数 f 的返回结果，加载不同的模块。
```

### 注意点

+ import() 加载模块成功以后，这个模块会作为一个对象，当作 then 方法的参数。
+ 因此，可以使用对象解构赋值的语法，获取输出接口。
```js
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
// export1 和 export2 都是 myModule.js 的输出接口，可以解构获得。
```

+ 如果模块有 default 输出接口，可以用参数直接获得。
```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});

// 上面的代码也可以使用具名输入的形式。

import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```
+ 如果想同时加载多个模块，可以采用下面的写法。
```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```
+ import() 也可以用在 async 函数之中。
```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```

# Module 的加载实现

## 浏览器加载

### 传统方法

+ HTML 网页中，浏览器通过 <script> 标签加载 JavaScript 脚本。
```html
<!-- 由于浏览器脚本的默认语言是 JavaScript，因此 type="application/javascript" 可以省略。 -->
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```
+ 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到 <script> 标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。
+ 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。
+ 这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
<!-- 
  <script> 标签打开 defer 或 async 属性，脚本就会异步加载。
  渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

  defer 与 async 的区别是：defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
  一句话，defer 是“渲染完再执行”，async 是“下载完就执行”。
  另外，如果有多个 defer 脚本，会按照它们在页面出现的顺序加载，而多个 async 脚本是不能保证加载顺序的。
 -->
```

### 加载规则

+ 浏览器加载 ES6 模块，也使用 <script> 标签，但是要加入 type="module" 属性。
```html
<script type="module" src="./foo.js"></script>
<!-- 在网页中插入一个模块 foo.js，由于 type 属性设为 module，所以浏览器知道这是一个 ES6 模块。 -->

<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```
+ 浏览器对于带有 type="module" 的 <script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了 <script> 标签的 defer 属性。
+ 如果网页有多个 <script type="module">，它们会按照在页面出现的顺序依次执行。
+ <script> 标签的 async 属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
+ 一旦使用了 async 属性，<script type="module"> 就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

+ ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
+ 举例来说，jQuery 就支持模块加载。
```html
<script type="module">
  import $ from "./jquery/src/jquery.js";
  $('#message').text('Hi from jQuery!');
</script>
```

+ 对于外部的模块脚本,有几点需要注意。
  + 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
  + 模块脚本自动采用严格模式，不管有没有声明 use strict。
  + 模块之中，可以使用 import 命令加载其他模块（ .js 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 export 命令输出对外接口。
  + 模块之中，顶层的 this 关键字返回 undefined ，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。
  + 同一个模块如果加载多次，将只执行一次。

+ 利用顶层的 this 等于 undefined 这个语法点，可以侦测当前代码是否在 ES6 模块之中。
+ ``  const isNotModuleScript = this !== undefined;  ``

## ES6 模块与 CommonJS 模块的差异

+ ES6 模块与 CommonJS 模块完全不同。
  + CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  + CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  + CommonJS 模块的 require() 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

+ 第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。
+ 而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

+ CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
+ 请看下面这个模块文件 lib.js 的例子。
```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// 在 main.js 里面加载这个模块。
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
// lib.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter了。
```
+ 这是因为 mod.counter 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
// 输出的 counter 属性实际上是一个取值器函数。
// 现在再执行 main.js，就可以正确读取内部变量 counter 的变动了。
```
+ ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。
+ 等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
+ 换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。
+ 因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

## Node.js 的模块加载方法

+ JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM ；另一种是 CommonJS 模块，简称 CJS。
+ CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。
+ 语法上面，两者最明显的差异是，CommonJS 模块使用 require() 和 module.exports，ES6 模块使用 import 和 export。
+ 它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

+ Node.js 要求 ES6 模块采用 .mjs 后缀文件名。
+ 也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用 .mjs 后缀名。
+ Node.js 遇到 .mjs 文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定 "use strict"。

+ 如果不希望将后缀名改成 .mjs，可以在项目的 package.json 文件中，指定 type 字段为 module。
```js
{   // 一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
   "type": "module"
}
// 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成 .cjs。
// 如果没有 type 字段，或者 type 字段为 commonjs，则 .js 脚本会被解释成 CommonJS 模块。
```

+ .mjs 文件总是以 ES6 模块加载，.cjs 文件总是以 CommonJS 模块加载，.js 文件的加载取决于 package.json 里面 type 字段的设置。

+ 注意，ES6 模块与 CommonJS 模块尽量不要混用。
+ require 命令不能加载 .mjs 文件，会报错，只有 import 命令才可以加载 .mjs 文件。
+ 反过来，.mjs 文件里面也不能使用 require 命令，必须使用 import。

### package.json 的 main 字段

+ package.json 文件有两个字段可以指定模块的入口文件：main 和 exports。
+ 比较简单的模块，可以只使用 main 字段，指定模块加载的入口文件。
```js
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}
// 指定项目的入口脚本为 ./src/index.js ，它的格式为 ES6 模块。
// 如果没有 type 字段，index.js 就会被解释为 CommonJS 模块。

// 然后，import 命令就可以加载这个模块。
// ./my-app.mjs
import { something } from 'es-module-package';
// // 实际加载的是 ./node_modules/es-module-package/src/index.js
```
+ 运行该脚本以后，Node.js 就会到 ./node_modules 目录下面，寻找 es-module-package 模块，然后根据该模块 package.json 的 main 字段去执行入口文件。
+ 这时，如果用 CommonJS 模块的 require() 命令去加载 es-module-package 模块会报错，因为 CommonJS 模块不能处理 export 命令。

### package.json 的 exports 字段

+ exports 字段的优先级高于 main 字段。它有多种用法。
1. 子目录别名
   + package.json 文件的 exports 字段可以指定脚本或子目录的别名。
```js
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./submodule": "./src/submodule.js"
    // 指定 src/submodule.js 别名为 submodule ，然后就可以从别名加载这个文件。
  }
}

import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js

// 子目录别名的例子。
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/": "./src/features/"
  }
}

import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js

// 如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
```

2. main 的别名
   + exports 字段的别名如果是.，就代表模块的主入口，优先级高于 main 字段，并且可以直接简写成 exports 字段的值。
```js
{
  "exports": {
    ".": "./main.js"
  }
}

// 等同于
{
  "exports": "./main.js"
}

// 由于 exports 字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}
```

3. 条件加载
   + 利用 . 这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。
   + 目前，这个功能需要在 Node.js 运行的时候，打开 --experimental-conditional-exports 标志。
```js
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }
}
// 别名 . 的 require 条件指定 require() 命令的入口文件（即 CommonJS 的入口），
// default 条件指定其他情况的入口（即 ES6 的入口）。

// 上面的写法可以简写如下。
{
  "exports": {
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```
   + 注意，如果同时还有其他别名，就不能采用简写，否则或报错。
```js
{
  // 报错
  "exports": {
    "./feature": "./lib/feature.js",
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```

### CommonJS 模块加载 ES6 模块

+ CommonJS 的 require() 命令不能加载 ES6 模块，会报错，只能使用 import() 这个方法加载。
```js
(async () => {
  await import('./my-app.mjs');
})();
// 可以在 CommonJS 模块中运行。
```
+ require() 不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层 await 命令，导致无法被同步加载。

### ES6 模块加载 CommonJS 模块

+ ES6 模块的 import 命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。
```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```
+ 这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是 module.exports，是一个对象，无法被静态分析，所以只能整体加载。

+ 加载单一的输出项，可以写成下面这样。
```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```
+ 还有一种变通的加载方法，就是使用 Node.js 内置的 module.createRequire() 方法。
```js
// cjs.cjs
module.exports = 'cjs';

// esm.mjs
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const cjs = require('./cjs.cjs');
cjs === 'cjs'; // true
```
+ ES6 模块通过 module.createRequire() 方法可以加载 CommonJS 模块。
+ 但是，这种写法等于将 ES6 和 CommonJS 混在一起了，所以不建议使用。

### 同时支持两种格式的模块

+ 一个模块同时要支持 CommonJS 和 ES6 两种格式，也很容易。

+ 如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如 export default obj，使得 CommonJS 可以用 import() 进行加载。

+ 如果原始模块是 CommonJS 格式，那么可以加一个包装层。
```js
import cjsModule from '../index.js';
export const foo = cjsModule.foo;
// 先整体输入 CommonJS 模块，然后再根据需要输出具名接口。
```
+ 你可以把这个文件的后缀名改为 .mjs，或者将它放在一个子目录，
+ 再在这个子目录里面放一个单独的 package.json 文件，指明 ``  { type: "module" }  ``。
+ 另一种做法是在 package.json 文件的 exports 字段，指明两种格式模块各自的加载入口。
```js
"exports"：{
  "require": "./index.js"，
  "import": "./esm/wrapper.js"
}
// 指定 require() 和 import，加载该模块会自动切换到不一样的入口文件。
```

### Node.js 的内置模块

+ Node.js 的内置模块可以整体加载，也可以加载指定的输出项。
```js
// 整体加载
import EventEmitter from 'events';
const e = new EventEmitter();

// 加载指定的输出项
import { readFile } from 'fs';
readFile('./foo.txt', (err, source) => {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});
```

### 加载路径

+ ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。
+ import 命令和 package.json 文件的 main 字段如果省略脚本的后缀名，会报错。
```js
// ES6 模块中将报错
import { something } from './index';
```
+ 为了与浏览器的 import 加载规则相同，Node.js 的 .mjs 文件支持 URL 路径。
```js
import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1
/**
 * 脚本路径带有参数 ?query=1 ，Node 会按 URL 规则解读。
 * 同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。
 * 由于这个原因，只要文件名中含有:、%、#、?等特殊字符，最好对这些字符进行转义。
*/
```
+ 目前，Node.js 的 import 命令只支持加载本地模块（ file: 协议）和 data: 协议，不支持加载远程模块。
+ 另外，脚本路径只支持相对路径，不支持绝对路径（即以 / 或 // 开头的路径）。

### 内部变量

+ ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。
+ 为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

+ 首先，就是 this 关键字。ES6 模块之中，顶层的 this 指向 undefined；CommonJS 模块的顶层 this 指向当前模块，这是两者的一个重大差异。

+ 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。
  + arguments
  + require
  + module
  + exports
  + __filename
  + __dirname

## 循环加载

+ “循环加载”（circular dependency）指的是，a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本。
```js
// a.js
var b = require('b');

// b.js
var a = require('a');
// 通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。
```
+ 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现 a 依赖 b，b 依赖 c，c 又依赖 a 这样的情况。
+ 这意味着，模块加载机制必须考虑“循环加载”的情况。

+ 对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。

### CommonJS 模块的加载原理

+ 介绍 ES6 如何处理“循环加载”之前，先介绍目前最流行的 CommonJS 模块格式的加载原理。
+ CommonJS 的一个模块，就是一个脚本文件。
+ require 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
// Node 内部加载模块后生成的一个对象。
// 该对象的 id 属性是模块名，exports 属性是模块输出的各个接口，loaded 属性是一个布尔值，表示该模块的脚本是否执行完毕。
// 其他还有很多属性，这里都省略了。
```
+ 以后需要用到这个模块的时候，就会到 exports 属性上面取值。
+ 即使再次执行 require 命令，也不会再次执行该模块，而是到缓存之中取值。
+ 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

### CommonJS 模块的循环加载

+ CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。
+ 一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

+ 让我们来看，Node 官方文档里面的例子。脚本文件 a.js 代码如下。
```js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// a.js 脚本先输出一个 done 变量，然后加载另一个脚本文件 b.js 。
// 注意，此时 a.js 代码就停在这里，等待 b.js 执行完毕，再往下执行。

// 再看 b.js 的代码。
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
// b.js 执行到第二行，就会去加载 a.js，这时，就发生了“循环加载”。
// 系统会去 a.js 模块对应对象的 exports 属性取值，可是因为 a.js 还没有执行完，
// 从 exports 属性只能取回已经执行的部分，而不是最后的值。

// a.js 已经执行的部分，只有一行。
exports.done = false;
// 因此，对于 b.js 来说，它从 a.js 只输入一个变量 done，值为 false。
```
+ 然后，b.js 接着往下执行，等到全部执行完毕，再把执行权交还给 a.js。
+ 于是，a.js 接着往下执行，直到执行完毕。我们写一个脚本 main.js，验证这个过程。
```js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 执行main.js，运行结果如下。
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```
+ 一是，在 b.js 之中，a.js 没有执行完毕，只执行了第一行。
+ 二是，main.js 执行到第二行时，不会再次执行 b.js ，而是输出缓存的 b.js 的执行结果，即它的第四行。
+ ``  exports.done = true;  ``
+ 总之，CommonJS 输入的是被输出值的拷贝，不是引用。
+ 另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。
```js
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
// 如果发生循环加载，require('a').foo 的值很可能后面会被改写，改用 require('a') 会更保险一点。
```

### ES6 模块的循环加载

+ ES6 处理“循环加载”与 CommonJS 有本质的不同。
+ ES6 模块是动态引用，如果使用 import 从一个模块加载变量（即 import foo from 'foo'），
+ 那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

+ 例子
```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';

// a.mjs 加载 b.mjs，b.mjs 又加载 a.mjs，构成循环加载。执行 a.mjs，结果如下。
$ node --experimental-modules a.mjs
b.mjs
ReferenceError: foo is not defined
// 执行 a.mjs 以后会报错，foo 变量未定义，这是为什么？
```
+ 让我们一行行来看，ES6 循环加载是怎么处理的。
+ 首先，执行 a.mjs 以后，引擎发现它加载了 b.mjs，因此会优先执行 b.mjs，然后再执行 a.mjs。
+ 接着，执行 b.mjs 的时候，已知它从 a.mjs 输入了 foo 接口，这时不会去执行 a.mjs，而是认为这个接口已经存在了，继续往下执行。
+ 执行到第三行 console.log(foo) 的时候，才发现这个接口根本没定义，因此报错。

+ 解决这个问题的方法，就是让 b.mjs 运行的时候，foo 已经有定义了。这可以通过将 foo 写成函数来解决。
```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};

// 这时再执行 a.mjs 就可以得到预期结果。
$ node --experimental-modules a.mjs
b.mjs
foo
a.mjs
bar
```

+ 这是因为函数具有提升作用，在执行 import {bar} from './b' 时，函数 foo 就已经有定义了，所以 b.mjs 加载的时候不会报错。
+ 这也意味着，如果把函数 foo 改写成函数表达式，也会报错。
```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
const foo = () => 'foo';
export {foo};
// 上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。
```

+ 我们再来看 ES6 模块加载器 SystemJS 给出的一个例子。
```js
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}
// even.js 里面的函数 even 有一个参数 n，只要不等于 0，就会减去 1，传入加载的 odd()。odd.js 也会做类似操作。

// 运行上面这段代码，结果如下。
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17

/**
 * 参数 n 从 10 变为 0 的过程中，even() 一共会执行 6 次，所以变量 counter 等于 6。
 * 第二次调用 even() 时，参数 n 从 20 变为 0，even() 一共会执行 11 次，加上前面的 6 次，所以变量 counter 等于 17。
*/
```

+ 这个例子要是改写成 CommonJS，就根本无法执行，会报错。

# 编程风格

+ https://wangdoc.com/es6/style.html

## 块级作用域

### let 取代 var

+ 功能基本相似，没有副作用
+ let 没有变量提升使用更加的安全，且不会成为全局对象 window 的属性
+ 拥有块级作用域可以在 if 等块级作用域中声明变量
+ 保证了先声明后使用的编程风格

### 全局常量和线程安全

+ 在 let 和 const 之间，建议优先使用 const，尤其是在全局环境，不应该设置变量，只应设置常量。
+ const 优于 let 有几个原因。一个是 const 可以提醒阅读程序的人，这个变量不应该改变；
+ 另一个是 const 比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；
+ 最后一个原因是 JavaScript 编译器会对 const 进行优化，
+ 所以多使用 const，有利于提高程序的运行效率，也就是说 let 和 const 的本质区别，其实是编译器内部的处理不同。
```js
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];
```
+ const 声明常量还有两个好处，
+ 一是阅读代码的人立刻会意识到不应该修改这个值，
+ 二是防止了无意间修改变量值所导致的错误。
+ 所有的函数都应该设置为常量。

## 字符串

+ 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
```js
// good
const a = 'foobar';
const b = `foo${a}bar`;
```

## 解构赋值

+ 使用数组成员对变量赋值时，优先使用解构赋值。
+ 函数的参数如果是对象的成员，优先使用解构赋值。
+ 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
```js
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;


// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}
// best
function getFullName({ firstName, lastName }) {
}
```

## 对象

+ 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
+ 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，
  + 要使用 ``  Object.assign(obj,{x:3});  `` 方法。
+ 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
```js
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
+ 对象 obj 的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建 obj 的时候，将该属性与其他属性定义在一起。
+ 这样一来，所有属性就在一个地方定义了。
+ 尽量采用简洁表示法。

## 数组

+ 使用扩展运算符（...）拷贝数组。
+ 使用 Array.from 方法，将类似数组的对象转为数组。

## 函数

+ 立即执行函数可以写成箭头函数的形式。
+ 那些使用匿名函数当作参数的场合，尽量用箭头函数代替。
  + 因为这样更简洁，而且绑定了 this。``  [1, 2, 3].map(x => x * x);  ``

+ 箭头函数取代 Function.prototype.bind ，不应再用 self/_this/that 绑定 this。
```js
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
```
+ 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
+ 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
```js
// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
```
+ 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。
+ 因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

+ 使用默认值语法设置函数参数的默认值。

## Map 结构

+ 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object
+ 如果只是需要 key: value 的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
```js
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

## Class

+ 总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
+ 使用 extends 实现继承，因为这样更简单，不会有破坏 instanceof 运算的危险。

## 模块

+ 首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。

+ 如果模块只有一个输出值，就使用 export default，如果模块有多个输出值，就不使用 export default，export default 与普通的 export 不要同时使用。

+ 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。

+ 如果模块默认输出一个函数，函数名的首字母应该小写。
+ 如果模块默认输出一个对象，对象名的首字母应该大写。

## ESLint 的使用

+ https://wangdoc.com/es6/style.html#eslint-%E7%9A%84%E4%BD%BF%E7%94%A8