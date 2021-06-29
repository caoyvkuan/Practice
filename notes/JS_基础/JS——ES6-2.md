
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
    + `resolved / fullfilled` 成功
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

+ Promise 构造函数：`Promise(excutor){}`
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
// 如果传入的对象为 Promsie ,则返回 Promise 执行的结果
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

# Class 的基本语法

+ 静态方法可以直接调用，动态可继承方法需要使用 new 后才可以调用。

## 简介

### 类的由来

+ JavaScript 语言中，生成实例对象的传统方法是通过构造函数。
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

+ ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。
+ 通过 class 关键字，可以定义类。

+ ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
+ 上面的代码用 ES6 的 class 改写，就是下面这样。
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// ES6 的类，完全可以看作构造函数的另一种写法。
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
// 上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

// 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

const b = new Bar();
b.doStuff() // "stuff"
```
+ 上面代码定义了一个“类”，可以看到里面有一个 constructor() 方法，这就是构造方法，而 this 关键字则代表实例对象。
+ 这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数 Point 是一致的。

+ Point 类除了构造方法，还定义了一个 toString() 方法。
+ 注意，定义 toString() 方法的时候，前面不需要加上 function 这个关键字，直接把函数定义放进去了就可以了。
+ 另外，方法与方法之间不需要逗号分隔，加了会报错。

+ 构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。
```js
class Point {
  constructor() {/**/}
  toString() {/**/}
  toValue() {/**/}
}

// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
+ 因此，在类的实例上面调用方法，其实就是调用原型上的方法。
```js
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true

// 由于类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。
// Object.assign() 方法可以很方便地一次向类添加多个方法。
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});

Point.prototype.constructor === Point // true

class Point {
  constructor(x, y) {/**/}
  toString() {/**/}
}
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
+ prototype 对象的 constructor() 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
+ 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
+ toString() 方法是 Point 类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。
```js
var Point = function (x, y) {/**/};
Point.prototype.toString = function () {/**/};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
// 采用 ES5 的写法，toString() 方法就是可枚举的。
```

### constructor 方法

+ constructor() 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。
+ 一个类必须有 constructor() 方法，如果没有显式定义，一个空的 constructor() 方法会被默认添加。
```js
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
+ constructor() 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。
```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}
new Foo() instanceof Foo
// false
// constructor() 函数返回一个全新的对象，结果导致实例对象不是 Foo 类的实例。
```

+ 类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。

### 类的实例

+ 生成类的实例的写法，与 ES5 完全一样，也是使用 new 命令。
+ 前面说过，如果忘记加上 new，像函数那样调用 Class，将会报错。

+ 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。
```js
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

/**
 * x 和 y 都是实例对象 point 自身的属性（因为定义在 this 变量上），
 * 所以 hasOwnProperty() 方法返回 true，而 toString() 是原型对象的属性（因为定义在 Point 类上），
 * 所以 hasOwnProperty() 方法返回 false。这些都与 ES5 的行为保持一致。
*/
```
+ 与 ES5 一样，类的所有实例共享一个原型对象。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
// p1 和 p2 都是 Point 的实例，它们的原型都是 Point.prototype，所以 __proto__ 属性是相等的。
```
+ 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
/**
 * 上面代码在 p1 的原型上添加了一个 printName() 方法，由于 p1 的原型就是 p2 的原型，因此 p2 也可以调用这个方法。
 * 而且，此后新建的实例 p3 也可以调用这个方法。
 * 这意味着，使用实例的 __proto__ 属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。
*/
```

### （getter）和（setter）

+ 取值函数（getter）和存值函数（setter）
+ 与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

// prop 属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。
```

+ 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```
+ 上面代码中，存值函数和取值函数是定义在 html 属性的描述对象上面，这与 ES5 完全一致。

### 属性表达式

+ 类的属性名，可以采用表达式。
```js
let methodName = 'getArea';
// Square 类的方法名 getArea，是从表达式得到的
class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

### Class 表达式

+ 与函数一样，类也可以使用表达式的形式定义。
```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
/**
 * 上面代码使用表达式定义了一个类。
 * 需要注意的是，这个类的名字是 Me，但是 Me 只在 Class 的内部可用，指代当前类。
 * 在 Class 外部，这个类只能用 MyClass 引用。
*/
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
// Me 只在 Class 内部有定义。
```
+ 如果类的内部没用到的话，可以省略 Me，也就是可以写成下面的形式。
+ `` const MyClass = class { /* ... */ }; ``
+ 采用 Class 表达式，可以写出立即执行的 Class。
```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 注意点

1. 严格模式
   + 类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。
   + 只要你的代码写在类或模块之中，就只有严格模式可用。
   + 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

2. 不存在提升
   + 类不存在变量提升（hoist），这一点与 ES5 完全不同。
   + ES6 不会把类的声明提升到代码头部。
   + 这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
   + 所以不能在定义前使用
```js
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
/**
 * 上面的代码不会报错，因为 Bar 继承 Foo 的时候，Foo 已经有定义了。
 * 但是，如果存在 class 的提升，上面代码就会报错，因为 class 会被提升到代码头部，
 * 而 let 命令是不提升的，所以导致 Bar 继承 Foo 的时候，Foo 还没有定义。
*/
```

3. name 属性
   + 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性。
   + `` class Point {}     Point.name // "Point"    ``
   + name 属性总是返回紧跟在 class 关键字后面的类名。

4. Generator 方法
   + 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
/**
 * Foo 类的 Symbol.iterator 方法前有一个星号，表示该方法是一个 Generator 函数。
 * Symbol.iterator 方法返回一个 Foo 类的默认遍历器，for...of 循环会自动调用这个遍历器。
*/
```

5. this 的指向
   + 类的方法内部如果含有 this，它默认指向类的实例。
   + 但是，必须非常小心，一旦单独使用该方法，很可能报错。
```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined

/**
 * printName 方法中的 this，默认指向 Logger 类的实例。
 * 但是，如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境
 * （由于 class 内部是严格模式，所以 this 实际指向的是 undefined），从而导致找不到 print 方法而报错。
*/

// 一个比较简单的解决方法是，在构造方法中绑定 this，这样就不会找不到 print 方法了。
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  // ...
}

// 另一种解决方法是使用箭头函数。
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
/**
 * 箭头函数内部的 this 总是指向定义时所在的对象。
 * 上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。
 * 这时，箭头函数所在的运行环境，肯定是实例对象，所以 this 会总是指向实例对象。
*/

// 还有一种解决方法是使用 Proxy，获取方法的时候，自动绑定 this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

## 静态方法

+ 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
+ 如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```js
class Foo {
  // 声明静态方法
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'

// 方法无法被继承，所以使用就会报错
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

+ 注意，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。
```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello

/**
 * 静态方法 bar 调用了 this.baz，这里的 this 指的是 Foo 类，而不是 Foo 的实例，等同于调用 Foo.baz。
 * 另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
*/
```

+ 父类的静态方法，可以被子类继承。
```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

+ 静态方法也是可以从 super 对象上调用的。
```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}
// super 指向当前对象的原型对象，在这里就是 Foo
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

## 实例属性的新写法

+ 实例属性除了定义在 constructor() 方法里面的 this 上面，也可以定义在类的最顶层。
```js
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// 上面代码中，实例属性 this._count 定义在 constructor() 方法里面。
// 另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。
class IncreasingCounter {
  _count = 0;
}
// 实例属性 _count 与取值函数 value() 和 increment() 方法，处于同一个层级。
// 这时，不需要在实例属性前面加上 this。
```
+ 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
```js
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

## 静态属性

+ 静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。
```js
class Foo {
}
// 为 Foo 类定义了一个静态属性 prop。
Foo.prop = 1;
Foo.prop // 1
```
+ 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
+ 现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上 static 关键字。
```js
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```

## 私有方法和私有属性

+ 私有方法和私有属性不论是静态还是动态都不能在外部调用
+ 用 # 还声明私有属性和方法。

### 现有的解决方案

+ 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。
+ 这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

+ 一种做法是在命名上加以区别。
```js
// _bar() 方法前面的下划线，表示这是一个只限于内部使用的私有方法。
// 但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。
lass Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
  // ...
}
```
+ 另一种方法就是索性将私有方法移出类，因为类内部的所有方法都是对外可见的。
```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
  // ...
}
function bar(baz) {
  return this.snaf = baz;
}
// foo 是公开方法，内部调用了 bar.call(this, baz)。
// 这使得 bar() 实际上成为了当前类的私有方法。
```
+ 还有一种方法是利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值。
```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
  // ...
};
// ar 和 snaf 都是 Symbol 值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
// 但是也不是绝对不行，Reflect.ownKeys() 依然可以拿到它们。
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
// Symbol 值的属性名依然可以从类的外部拿到。
```

### 私有属性的提案

+ 目前，有一个提案，为 class 加了私有属性。方法是在属性名之前，使用 # 表示。
```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
// #count 就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
```

+ 因为 # 是属性名的一部分，所以使用时必须带上 # 才能够使用。所以 #x 并不是 x 。

+ 之所以要引入一个新的前缀 # 表示私有属性，而没有采用 private 关键字，
+ 是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，
+ 能够准确地区分一种属性是否为私有属性。
+ 另外，Ruby 语言使用 @ 表示私有属性，ES6 没有用这个符号而使用 #，是因为 @ 已经被留给了 Decorator。

+ 这种写法不仅可以写私有属性，还可以用来写私有方法。
+ 另外，私有属性也可以设置 getter 和 setter 方法。
```js
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}

// #x 是一个私有属性，它的读写都通过 get #x() 和 set #x() 来完成。
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
```

+ 私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性。
```js
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}
Foo.getPrivateValue(new Foo()); // 42
```

+ 私有属性和私有方法前面，也可以加上 static 关键字，表示这是一个静态的私有属性或私有方法。
+ 静态的私有方法和属性都只能在类的内部调用，不能够像公共的静态方法和属性一样在外部调用。

## new.target 属性

+ new 是从构造函数生成实例对象的命令。
+ ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。
+ 如果构造函数不是通过 new 命令或 Reflect.construct() 调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错

// 确保构造函数只能通过new命令调用。
```

+ Class 内部调用 new.target，返回当前 Class。
```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```
+ 需要注意的是，子类继承父类时，new.target 会返回子类。
```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}
class Square extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
// new.target 会返回子类。
```
+ 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
// Shape 类不能被实例化，只能用于继承。
// 注意，在函数外部，使用 new.target 会报错。
```

# Class 的继承

+ Class 可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
```js
class Point {
}

class ColorPoint extends Point {
}
/**
 * 定义了一个 ColorPoint 类，该类通过 extends 关键字，继承了 Point 类的所有属性和方法。
 * 但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。
*/
// 下面，在 ColorPoint 内部加上代码。
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
/**
 * constructor 方法和 toString 方法之中，都出现了 super 关键字，它在这里表示父类的构造函数，用来新建父类的 this 对象。
*/
```
+ 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。
+ 这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，
+ 得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
+ 如果不调用 super 方法，子类就得不到 this 对象。
```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}
// ColorPoint 继承了父类 Point，但是它的构造函数没有调用 super 方法，导致新建实例时报错。
let cp = new ColorPoint(); // ReferenceError
```
+ ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。
+ ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

+ 如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。
+ 也就是说，不管有没有显式定义，任何一个子类都有 constructor 方法。
```js
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```
+ 另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。
+ 这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
    // 子类的 constructor 方法没有调用 super 之前，就使用 this 关键字，结果报错，
    // 而放在 super 方法之后就是正确的。
  }
}

// 生成子类实例的代码。
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
// 实例对象 cp 同时是 ColorPoint 和 Point 两个类的实例，这与 ES5 的行为完全一致。
```

+ 父类的静态方法，也会被子类继承。但是不会被实例继承
```js
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
```

## Object.getPrototypeOf()

+ Object.getPrototypeOf 方法可以用来从子类上获取父类。
+ ``  Object.getPrototypeOf(ColorPoint) === Point  // true  ``
+ 因此，可以使用这个方法判断，一个类是否继承了另一个类。

## super 关键字

+ super 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

+ 第一种情况，super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super 函数。
```js
class A {}

class B extends A {
  constructor() {
    super(); // 子类 B 的构造函数之中的 super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。
  }
}
```
+ 注意，super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B 的实例，
+ 因此 super() 在这里相当于 A.prototype.constructor.call(this)。
```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
// new.target 指向当前正在执行的函数。可以看到，在 super() 执行时，它指向的是子类 B 的构造函数，而不是父类 A 的构造函数。
// 也就是说，super() 内部的 this 指向的是 B。
```
+ 作为函数时，super() 只能用在子类的构造函数之中，用在其他地方就会报错。

+ 第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
/**
 * 子类 B 当中的 super.p()，就是将 super 当作一个对象使用。
 * 这时，super 在普通方法之中，指向 A.prototype，所以 super.p() 就相当于 A.prototype.p()。
*/
```
+ 这里需要注意，由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。
+ 如果属性定义在父类的原型对象上，super 就可以取到。 ``  A.prototype.x = 2;  ``
```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}
// p 是父类 A 实例的属性，super.p 就引用不到它。
let b = new B();
b.m // undefined
```

+ ES6 规定，在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。
```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
/**
 * super.print() 虽然调用的是 A.prototype.print()，但是 A.prototype.print() 内部的 this 指向子类 B 的实例，
 * 导致输出的是 2，而不是 1。也就是说，实际上执行的是 super.print.call(this)
*/
```

+ 由于 this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。
```js
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
/**
 * super.x 赋值为 3，这时等同于对 this.x 赋值为 3。
 * 而当读取 super.x 的时候，读的是 A.prototype.x，所以返回 undefined。
*/
```
+ 如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。
```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
// super 在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
```
+ 另外，在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。
```js
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m() // 3
// 静态方法 B.m 里面，super.print 指向父类的静态方法。
// 这个方法里面的 this 指向的是 B，而不是 B 的实例。
```
+ 注意，使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
```js
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
// console.log(super) 当中的 super，无法看出是作为函数使用，
// 还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。
// 这时，如果能清晰地表明 super 的数据类型，就不会报错。
console.log(super.valueOf() instanceof B); // true
// super.valueOf() 表明 super 是一个对象，因此就不会报错。
// 同时，由于 super 使得 this 指向 B 的实例，所以 super.valueOf() 返回的是一个 B 的实例。
```

+ 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。
```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

## 类的 prototype 属性和__proto__属性

+ 大多数浏览器的 ES5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 prototype 属性。
+ Class 作为构造函数的语法糖，同时有 prototype 属性和 `__proto__` 属性，因此同时存在两条继承链。

1. 子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。
2. 子类 prototype 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 prototype 属性。
```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
// 子类 B 的 __proto__ 属性指向父类 A，子类 B 的 prototype 属性的 __proto__ 属性指向父类 A 的 prototype 属性。
```

+ 这样的结果是因为，类的继承是按照下面的模式实现的。
```js
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();

// Object.setPrototypeOf 方法的实现。
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// 因此，就得到了上面的结果。
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

+ 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
+ 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
```js
B.prototype = Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```
+ extends 关键字后面可以跟多种类型的值。
+ ``  class B extends A {}  ``
+ A，只要是一个有 prototype 属性的函数，就能被 B 继承。
+ 由于函数都有 prototype 属性（除了 Function.prototype 函数），因此 A 可以是任意函数。

1. 子类继承 Object 类。
```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```
+ 这种情况下，A 其实就是构造函数 Object 的复制，A 的实例就是 Object 的实例。

2. 不存在任何继承。
```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```
+ 这种情况下，A 作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 Function.prototype。
+ 但是，A 调用后返回一个空对象（即 Object 实例），所以 ` A.prototype.__proto__ ` 指向构造函数（Object）的 prototype 属性。

### 实例的 __proto__ 属性

+ 子类实例的 `__proto__` 属性的 `__proto__` 属性，指向父类实例的 `__proto__` 属性。
+ 也就是说，子类的原型的原型，是父类的原型。
```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
// ColorPoint 继承了 Point，导致前者原型的原型是后者的原型。
```
+ 因此，通过子类实例的 `__proto__.__proto__` 属性，可以修改父类实例的行为。
```js
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
// ColorPoint 的实例 p2 上向 Point 类添加方法，结果影响到了 Point 的实例 p1。
```

## 原生构造函数的继承

+ 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。
  + Boolean()
  + Number()
  + String()
  + Array()
  + Date()
  + Function()
  + RegExp()
  + Error()
  + Object()

+ 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。
```js
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
// 上面代码定义了一个继承 Array 的 MyArray 类。但是，这个类的行为与 Array 完全不一致。

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
/**
 * 之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 Array.apply() 或者分配给原型对象都不行。
 * 原生构造函数会忽略 apply 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。
 * 
 * ES5 是先新建子类的实例对象 this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
 * 比如，Array 构造函数有一个内部属性 [[DefineOwnProperty]] ，用来定义新属性时，更新 length 属性，这个内部属性无法在子类获取，导致子类的 length 属性行为不正常。
*/
```

+ ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 this，
+ 然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。
+ 下面是一个继承 Array 的例子。
```js
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
/**
 * 上面代码定义了一个 MyArray 类，继承了 Array 构造函数，因此就可以从 MyArray 生成数组的实例。
 * 这意味着，ES6 可以自定义原生数据结构（比如 Array、String 等）的子类，这是 ES5 无法做到的。
*/
```
+ 上面这个例子也说明，extends 关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
+ 因此可以在原生数据结构的基础上，定义自己的数据结构。
+ 下面就是定义了一个带版本功能的数组。
```js
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]
/**
 * VersionedArray 会通过 commit 方法，将自己的当前状态生成一个版本快照，存入 history 属性。
 * revert 方法用来将数组重置为最新一次保存的版本。
 * 除此之外，VersionedArray 依然是一个普通数组，所有原生的数组方法都可以在它上面调用。
*/
```

+ 下面是一个自定义 Error 子类的例子，可以用来定制报错时的行为。
```js
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
```

+ 注意，继承 Object 的子类，有一个行为差异。
```js
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false

/**
 * 上面代码中，NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。
 * 这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object() 这种形式调用，
 * ES6 规定 Object 构造函数会忽略参数。
*/
```

## Mixin 模式的实现

+ Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
```js
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
// c 对象是 a 对象和 b 对象的合成，具有两者的接口。
```
+ 下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。
```js
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

// 上面代码的 mix 函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```

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
  import MyModual from './myModual';
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
const myModual = require(path);
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