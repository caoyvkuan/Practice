# 通用

## 本地储存

```javascript
  ☞  localStorage：
  1. 永久生效
  2. 多窗口共享
  3. 容量大约为20M

  ◆window.localStorage.setItem(key,value)  设置存储内容
  ◆window.localStorage.getItem(key)  		 获取内容
  ◆window.localStorage.key(0)
  ◆window.localStorage.key
  ◆window.localStorage.removeItem(key)	 删除内容
  ◆window.localStorage.clear()			清空内容

  ☞ sessionStorage：
  1. 生命周期为关闭当前浏览器窗口
  2. 可以在同一个窗口下访问
  3. 数据大小为5M左右

  ◆window.sessionStorage.setItem(key,value)
  ◆window.sessionStorage.getItem(key)
  ◆window.sessionStorage.removeItem(key)
  ◆window.sessionStorage.clear()

  window.sessionStorage.setItem("name","123");

  var list = [ 
    {"name":"zhans","age":"18","gender":"男"},
    {"name":"lis","age":"23","gender": "女"}
  ];
  window.sessionStorage.setItem("list",JSON.stringify(list));
```


## 获取网络状态

```javascript
  ☞ 获取当前网络状态
    window.navigator.onLine 返回一个布尔值

  ☞ 网络状态事件
    1. window.ononline		网络链接时触发
    2. window.onoffline	网络断开时触发
```

# JSON

+ JSON 以一个 {} 包裹

+ 每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。
+ 总之，只能是一个值，不能是两个或更多的值。
+ JSON 对值的类型和格式有严格的规定。
  + 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
  + 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
  + 字符串必须使用双引号表示，不能使用单引号。
  + 对象的键名必须放在双引号里面。
  + 数组或对象最后一个成员的后面，不能加逗号。

## JSON 对象

+ JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。
+ 它有两个静态方法：JSON.stringify() 和 JSON.parse()。

## JSON.stringify()

+ 基本用法
  + JSON.stringify(value, replacer, space) 方法用于将一个值转为 JSON 字符串。
  + 该字符串符合 JSON 格式，并且可以被 JSON.parse() 方法还原。
  + 注意，对于原始类型的字符串，转换结果会带双引号。
  + 如果对象的属性是 undefined、函数或 XML 对象，该属性会被JSON.stringify() 过滤。
  + 如果数组的成员是 undefined、函数或 XML 对象，则这些值被转成 null。
  + 正则对象会被转成空对象。
  + JSON.stringify() 方法会忽略对象的不可遍历的属性。
```js
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'
//上面代码将各种类型的值，转成 JSON 字符串。

JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
//上面代码中，字符串foo，被转成了"\"foo\""。这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。

//如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤。
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"

//如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"

//正则对象会被转成空对象。
JSON.stringify(/foo/) // "{}"
```

+ 第二个参数
  + JSON.stringify() 方法还可以接受一个数组，作为第二个参数，
  + 指定参数对象的哪些属性需要转成字符串。(只转换数组中包含的属性)
  + 这个类似白名单的数组，只对对象的属性有效，对数组无效。
  + 第二个参数还可以是一个函数，用来更改 JSON.stringify() 的返回值。
```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"

//函数
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
//如果处理函数返回undefined或没有返回值，则该属性会被忽略。
```

+ 第三个参数
  + JSON.stringify() 还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。
  + 默认返回的是单行字符串，对于大型的 JSON 对象，可读性非常差。
  + 第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）。
```js
// 默认输出
JSON.stringify({ p1: 1, p2: 2 })
// JSON.stringify({ p1: 1, p2: 2 })

// 分行输出
JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
// {
// 	"p1": 1,
// 	"p2": 2
// }
//上面例子中，第三个属性\t在每个属性前面添加一个制表符，然后分行显示。
//第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。
```

+ 参数对象的 toJSON() 方法
  + 如果参数对象有自定义的toJSON()方法
  + 那么JSON.stringify()会使用这个方法的返回值作为参数，而忽略原对象的其他属性。
  + Date对象就有一个自己的toJSON()方法。
  + toJSON()方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify()默认不能转换正则对象，但是设置了toJSON()方法以后，就可以转换正则对象了。
```js
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
//上面代码中，JSON.stringify()发现参数对象有toJSON()方法
//就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。
```

## JSON.parse()

+ JSON.parse()方法用于将 JSON 字符串转换成对应的值。
+ 如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错。
+ 为了处理解析错误，可以将JSON.parse()方法放在try...catch代码块中。
+ JSON.parse()方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify()方法类似。
```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```


# 异步操作

## 单线程模式

+ 单线程模型指的是，JavaScript 只在一个线程上运行。
+ 也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。

+ 注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。
+ 事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。

+ 将一些等待返回结果在执行的任务，挂起处于等待中的任务，等到结果返回后，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的“事件循环”机制（Event Loop）。
+ 单线程模型虽然对 JavaScript 构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果用得好，JavaScript 程序是不会出现堵塞的，这就是为什么 Node 可以用很少的资源，应付大流量访问的原因。

+ 为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 同步任务和异步任务

+ 程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。
+ 同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。
+ 只有前一个任务执行完毕，才能执行后一个任务。

+ 异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。

+ 举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的回调函数。

## 任务队列和事件循环

+ JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）

+ 首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

+ 异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

+ JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。维基百科的定义是：“事件循环是一个程序结构，用于等待和发送消息和事件（a programming construct that waits for and dispatches events or messages in a program）”。

+ 同步任务 ， 异步任务
  + 同步任务执行完了，执行异步任务，
  + 将有回调函数的异步任务加入同步队列，再执行同步任务队列，
  + 如此重复，直到程序运行完毕
+ 微任务相当于异步任务，但是执行早于异步任务 如（ then ）
  + 因为 then 相当于本轮的事件循环，而异步任务属于下一轮的事件循环

## 异步操作

### 回调函数

+ 回调函数是异步操作最基本的方法。
```js
//下面是两个函数f1和f2，编程的意图是f2必须等到f1执行完成，才能执行。
function f1() {
  // ...
}

function f2() {
  // ...
}
f1();
f2();
//上面代码的问题在于，如果f1是异步操作，f2会立即执行，不会等到f1结束再执行。
//这时，可以考虑改写f1，把f2写成f1的回调函数。
function f1(callback) {
  // ...
  callback();
}

function f2() {
  // ...
}

f1(f2);
```

+ 回调函数的优点是简单、容易理解和实现
+ 缺点是不利于代码的阅读和维护，各个部分之间高度耦合（coupling）
+ 使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况）
+ 而且每个任务只能指定一个回调函数。

### 事件监听

+ 另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
+ 也就是在需要执行某个函数时，内部绑定的某个函数，相当于自定义事件
```js
//还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的 jQuery 的写法）。
f1.on('done', f2);
//上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
//上面代码中，f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。
//这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（decoupling），有利于实现模块化。
//缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。
```

### 发布/订阅

+ 事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。
+ 这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。
+ 也就是说把需要触发的函数交给，一个集中管理人，在要执行时告诉管理人，要执行了。js高级程序设计中的自定义事件
```js
//这个模式有多种实现，下面采用的是 Ben Alman 的 Tiny Pub/Sub，这是 jQuery 的一个插件。
//首先，f2向信号中心jQuery订阅done信号。
jQuery.subscribe('done', f2);

function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
  }, 1000);
}
//上面代码中，jQuery.publish('done')的意思是
//f1执行完成后，向信号中心jQuery发布done信号，从而引发f2的执行。
//f2完成执行后，可以取消订阅（unsubscribe）。
jQuery.unsubscribe('done', f2);
```

## 异步操作的流程控制

+ 嵌套的回调函数不仅写起来麻烦，容易出错，而且难以维护
```js
async(1, function (value) {
  async(2, function (value) {
    async(3, function (value) {
      async(4, function (value) {
        async(5, function (value) {
          async(6, final);
        });
      });
    });
  });
});
```

### 串行执行

+ 我们可以编写一个流程控制函数，让它来控制异步任务，一个任务完成以后，再执行另一个。
+ 这就叫串行执行。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final(results[results.length - 1]);
  }
}

series(items.shift());

// 上面代码中，函数series就是串行函数，它会依次执行异步任务，所有任务都完成后，才会执行final函数。items数组保存每一个异步任务的参数，results数组保存每一个异步任务的运行结果。
```

### 并行执行

+ 流程控制函数也可以是并行执行，即所有异步任务同时执行，等到全部完成以后，才执行final函数。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length === items.length) {
      final(results[results.length - 1]);
    }
  })
});
//上面代码中，forEach方法会同时发起六个异步任务，等到它们全部完成以后，才会执行final函数。

//相比而言，上面的写法只要一秒，就能完成整个脚本。
//这就是说，并行执行的效率较高，比起串行执行一次只能执行一个任务，较为节约时间。
//但是问题在于如果并行的任务较多，很容易耗尽系统资源，拖慢运行速度。
//因此有了第三种流程控制方式。
```

### 并行与串行的结合

+ 所谓并行与串行的结合，就是设置一个门槛，每次最多只能并行执行n个异步任务，这样就避免了过分占用系统资源。
```js
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher(); //通过递归使循环被条件运行数量截断时，还能继续执行没执行完的任务
      } else if(running == 0) {
        final(results);
      }
    });
    running++;
  }
}

launcher();
//上面代码中，最多只能同时运行两个异步任务。
//变量running记录当前正在运行的任务数，只要低于门槛值，就再启动一个新的任务，如果等于0，就表示所有任务都执行完了，这时就执行final函数。

//这段代码需要三秒完成整个脚本，处在串行执行和并行执行之间。通过调节limit变量，达到效率和资源的最佳平衡。
```

## 定时器

+ JavaScript 提供定时执行代码的功能，叫做定时器（timer），主要由setTimeout()和setInterval()这两个函数来完成。它们向任务队列添加定时任务。

### setTimeout()

+ setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。
+ 它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。
+ 第一个参数直接执行代码时，需要以字符串的形式传入，不推荐
+ 省略第二个参数默认为 0 

+ 如果回调函数是对象的方法(obj.y)，那么setTimeout使得方法内部的this关键字指向全局环境，而不是定义时所在的那个对象。
+ 为了防止出现这个问题，一种解决方法是将obj.y放入一个函数。
+ 另一种解决方法是，使用bind方法，将obj.y这个方法绑定在obj上面。
```js
var timerId = setTimeout(func|code, delay);
//setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码
//第二个参数delay是推迟执行的毫秒数。

setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
//setTimeout共有4个参数。最后那两个参数，将在1000毫秒之后回调函数执行时，作为回调函数的参数。
```

### setInterval()

+ setInterval 函数的用法与 setTimeout 完全一致
+ 区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

+ 因为 setInterval 指定的是"开始执行"之间的间隔，并不考虑每次任务执行本身所消耗的事件
+ 因此 setInterval 的执行间隔并不固定

```js
//setInterval的一个常见用途是实现轮询。下面是一个轮询 URL 的 Hash 值是否发生变化的例子。
var hash = window.location.hash;
var hashWatcher = setInterval(function() {
  if (window.location.hash != hash) {
    updatePage();
  }
}, 1000);

//为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间。
var i = 1;
var timer = setTimeout(function f() {
  // ...
  timer = setTimeout(f, 2000);
}, 2000);
```

### clearTimeout()，clearInterval()

+ setTimeout和setInterval函数，都返回一个整数值，表示计数器编号。
+ 将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。
```js
//利用定时器返回的编号，取消当前所有的setTimeout定时器
(function() {
  // 每轮事件循环检查一次
  var gid = setInterval(clearAllTimeouts, 0);

  function clearAllTimeouts() {
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();
```

### （防抖动）debounce 函数

+ 不希望回调函数被频繁调用，可以使用定时器，定时执行
+ 在规定时间内重复调用时取消上一次执行，然后在新建一个定时器
+ 这样就保证了回调函数之间的调用间隔，至少是规定的时间。

+ debounce 是“防抖”，要连续操作结束后再执行。

```js
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

### （节流） throttle 函数

+ throttle 是“节流”，确保一段时间内只执行一次

```js
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```

### 运行机制

+ setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。
+ 如果到了，就执行对应的代码；如果不到，就继续等待。
+ 这意味着，setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行。
+ 由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。
```js
setTimeout(someTask, 100);
veryLongTask();
//上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，才轮到它执行。

//setInterval的例子
setInterval(function () {
  console.log(2);
}, 1000);

sleep(3000);

function sleep(ms) {
  var start = Date.now();
  while ((Date.now() - start) < ms) {
  }
}
//上面代码中，setInterval要求每隔1000毫秒，就输出一个2。
//但是，紧接着的sleep语句需要3000毫秒才能完成，那么setInterval就必须推迟到3000毫秒之后才开始生效。
//注意，生效后setInterval不会产生累积效应，即不会一下子输出三个2，而是只会输出一个2。
```

### setTimeout(f, 0)

+ 含义
  + setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，即setTimeout(f, 0)，那么会立刻执行吗？
  + 答案是不会。因为上一节说过，必须要等到当前脚本的同步任务，全部处理完以后，才会执行setTimeout指定的回调函数f。
  + 也就是说，setTimeout(f, 0)会在下一轮事件循环一开始就执行。
  + 总之，setTimeout(f, 0)这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。

+ 应用
  + setTimeout(f, 0)有几个非常重要的用途。
  + 它的一大应用是，可以调整事件的发生顺序。
  + 比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数
  + 会早于父元素的事件回调函数触发。
  + 如果，想让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)。
```js
// HTML 代码如下
// <input type="button" id="myButton" value="click">

var input = document.getElementById('myButton');

input.onclick = function A() {
  //让 input 的事件触发晚于 body
  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};

document.body.onclick = function C() {
  input.value += ' body'
};

//另一个应用是，用户自定义的回调函数，通常在浏览器的默认动作之前触发。
//比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。
//因此，下面的回调函数是达不到目的的。

// HTML 代码如下
// <input type="text" id="input-box">
document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
}
//上面代码想在用户每次输入文本后，立即将字符转为大写。
//但是实际上，它只能将本次输入前的字符转为大写，因为浏览器此时还没接收到新的文本，所以this.value取不到最新输入的那个字符。
//只有用setTimeout改写，上面的代码才能发挥作用。
document.getElementById('input-box').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
//上面代码将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发。
//由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行。
var div = document.getElementsByTagName('div')[0];

// 写法一
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二
var timer;
var i=0x100000;

function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
/*
* 上面代码有两种写法，都是改变一个网页元素的背景色。
* 写法一会造成浏览器“堵塞”，因为 JavaScript 执行速度远高于 DOM，
* 会造成大量 DOM 操作“堆积”，而写法二就不会，这就是setTimeout(f, 0)的好处。
*/

/*
* 另一个使用这种技巧的例子是代码高亮的处理。如果代码块很大，一次性处理，可能会对性能造成很大的* 压力，那么将其分成一个个小块，一次处理一块，比如写成setTimeout(highlightNext, 50)的
* 样子，性能压力就会减轻。
*/
```

## Promise 对象

+ Promise 是第一个对象，也是一个构造函数。
+ 可以使异步操作可以和同步操作一样书写，易读，

+ ES6 原生支持 Promise 对象

+ Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。
+ Promise 实例有一个then方法，用来指定下一步的回调函数。

+ Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程清除

+ Promise 的回调函数属于异步任务，会在同步任务之后执行
  + 也就是 then 属于微任务
  + 但是，Promise 的回调函数不是正常的异步任务，而是微任务。
  + 它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。
  + 这意味着，微任务的执行时间一定早于正常任务。

### Promise 对象的状态

+ Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。
  + 异步操作未完成（pending）
  + 异步操作成功（fulfilled）
  + 异步操作失败（rejected）
  + 上面三种状态里面，fulfilled和rejected合在一起称为resolved（已定型）。

+ 因为这三种状态只有两种变化，从未完成到成功或失败
+ 因此，Promise 的最终结果只有两种。
  + 异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled。
  + 异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected。

### Promise 构造函数

+ JavaScript 提供原生的Promise构造函数，用来生成 Promise 实例。
```js
var promise = new Promise(function (resolve, reject) {
  // ...

  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
/*
  Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
  它们是两个函数，由 JavaScript 引擎提供，不用自己实现。

  resolve函数的作用是，将Promise实例的状态从“未完成”变为“成功”（即从pending变为fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
  reject函数的作用是，将Promise实例的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
*/
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100);
//上面代码中，timeout(100)返回一个 Promise 实例。100毫秒以后，该实例的状态会变为fulfilled。
```

### Promise.prototype.then()

+ Promise 实例的then方法，用来添加回调函数。
+ then方法可以接受两个回调函数
+ 第一个是异步操作成功时（变为fulfilled状态）的回调函数
+ 第二个是异步操作失败（变为rejected）时的回调函数（该参数可以省略）。
+ 一旦状态改变，就调用相应的回调函数。
+ then方法可以链式使用。
```js
var p1 = new Promise(function (resolve, reject) {
  resolve('成功');
});
p1.then(console.log, console.error);
// "成功"

var p2 = new Promise(function (resolve, reject) {
  reject(new Error('失败'));
});
p2.then(console.log, console.error);
// Error: 失败

p1
  .then(step1)    //如果step1的状态变为rejected,那么后面将不会执行
  .then(step2)    //Promise 开始寻找，接下来第一个为rejected的回调函数
  .then(step3)    //在代码中是console.error
  .then(          //这就是说，Promise 对象的报错具有传递性。
    console.log,
    console.error
  );
//p1后面有四个then，意味依次有四个回调函数。只要前一步的状态变为fulfilled，就会依次执行紧跟在后面的回调函数。
//最后一个then方法，回调函数是console.log和console.error，用法上有一点重要的区别。console.log只显示step3的返回值，而console.error可以显示p1、step1、step2、step3之中任意一个发生的错误。
```

### then()用法辨析

+ Promise 的用法，简单说就是一句话：使用then方法添加回调函数。
+ 但是，不同的写法有一些细微的差别
```js
// 写法一
f1().then(function () {
  return f2();
}).then(f3);  //f3回调函数的参数，是f2函数的运行结果。

// 写法二
f1().then(function () {
  f2();
  return;
}).then(f3);  //f3回调函数的参数是undefined。

// 写法三
f1().then(f2())
  .then(f3);    //f3回调函数的参数，是f2函数返回的函数的运行结果。

// 写法四
f1().then(f2)
  .then(f3);    //f2会接收到f1()返回的结果。f3回调函数的参数，是f2函数的运行结果。
```

### 实例：图片加载

```js
var preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
//image是一个图片对象的实例。它有两个事件监听属性，onload属性在图片加载成功后调用，onerror属性在加载失败调用。

//调用
preloadImage('https://example.com/my.jpg')
  .then(function (e) { document.body.append(e.target) })
  .then(function () { console.log('加载成功') });
//图片加载成功以后，onload属性会返回一个事件对象，因此第一个then()方法的回调函数，会接收到这个事件对象。
//该对象的target属性就是图片加载后生成的 DOM 节点。
```

# console 对象与控制台

+ console 对象
+ console 对象的静态方法
+ 控制台命令行 API
+ debugger 语句  debugger语句主要用于除错，作用是设置断点。

## console 对象

+ console 对象是 js 的原生对象
+ console的常见用途有两个。
  + 调试程序，显示网页代码运行时的错误信息。
  + 提供了一个命令行接口，用来与网页代码互动。

+ console对象的所有方法，都可以被覆盖.
```js
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

## console 对象的静态方法

+ console.log()
  + 该方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
  + 该方法会自动在每次输出的结尾，添加换行符。
  + 如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。
    + %s  字符串
    + %d  %i  整数    %f  浮点数
    + %o  对象链接
    + %c  CSS格式字符串

+ console.info()
  + 与console.log()用法一样
  + console.info方法会在输出信息的前面，加上一个蓝色图标。

+ console.debug()
  + 与console.log方法类似,会在控制台输出调试信息。
  + 但是，默认情况下，console.debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示。

+ console.warn()、console.error()
  + warn方法和error方法也是在控制台输出信息，
  + 它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；
  + error方法输出信息时，在最前面加一个红色的叉，表示出错。
  + 同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都同log一样。

+ console.table()
  + 将复合类型的数据转为表格输出

+ console.count() 
  + count方法用于计数，输出它被调用了多少次。
  + 该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。

+ console.dir()，console.dirxml()
  + dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
    + 该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。
    + Node 环境之中，还可以指定以代码高亮的形式输出。
    + `console.dir(obj, {colors: true})`
  + dirxml方法主要用于以目录树的形式，显示 DOM 节点。
  + 如果参数不是 DOM 节点，而是普通的 JavaScript 对象，console.dirxml等同于console.dir。

+ console.assert()
  + console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
  + 它接受两个参数，第一个参数是表达式，第二个参数是字符串。
  + 只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

+ console.time()，console.timeEnd()
  + 这两个方法用于计时，可以算出一个操作所花费的准确时间。
```js
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，控制台会显示“计时器名称: 所耗费的时间”。
```

+ console.group()，console.groupEnd()，console.groupCollapsed()
  + console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
```js
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束

console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
```

+ console.trace()，console.clear() 
  + console.trace方法显示当前执行的代码在堆栈中的调用路径。
  + console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，console.clear方法将不起作用。

## 控制台命令行 API

+ $_属性返回上一个表达式的值。
+ 控制台保存了最近5个在 Elements 面板选中的 DOM 元素，$0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。

+ $(selector)  返回第一个匹配的元素，等同于document.querySelector()。
+ `$$(selector)` 返回选中的 DOM 对象，等同于document.querySelectorAll。

+ $x(path)
  + $x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。
  + `$x("//p[a]")`  返回所有包含a元素的p元素。

+ inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节。
  + DOM 元素在Elements面板中显示，比如inspect(document)会在 Elements 面板显示document元素。JavaScript 对象在控制台面板Profiles面板中显示，比如inspect(window)。

+ getEventListeners(object)
  + getEventListeners(object)方法返回一个对象，该对象的成员为object登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。

+ keys(object)，values(object)
  + keys(object)方法返回一个数组，包含object的所有键名。
  + values(object)方法返回一个数组，包含object的所有键值。

+ monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
  + monitorEvents(object[, events])方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。
  + monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。
  + `mouse` : "mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
  + `key` : "keydown", "keyup", "keypress", "textInput"
  + `touch` : "touchstart", "touchmove", "touchend", "touchcancel"
  + `control` : "resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

+ 命令行 API 还提供以下方法。
  + clear()：清除控制台的历史。
  + copy(object)：复制特定 DOM 元素到剪贴板。
  + dir(object)：显示特定对象的所有属性，是console.dir方法的别名。
  + dirxml(object)：显示特定对象的 XML 形式，是console.dirxml方法的别名。

# 错误处理

+ 错误处理机制

## 错误处理机制

+ Error 实例对象
  + JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
  + Error构造函数接受一个参数，表示错误提示，可以从实例的message属性读到这个参数。
  + 抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。
  + Error 属性
    + message：错误提示信息
    + name：错误名称（非标准属性）
    + stack：错误的堆栈（非标准属性）

+ throw 语句
  + throw语句的作用是手动中断程序执行，抛出一个错误。
  + throw可以抛出任何类型的值。也就是说，它的参数可以是任何值。
  + ` throw new Error('错误信息！');`

+ try...catch 结构
  + 一旦发生错误，程序就中止执行了。JavaScript 提供了try...catch结构，允许对错误进行处理，选择是否往下执行。
  + try代码块抛出错误。JavaScript 引擎就立即把代码的执行，转到catch代码块，或者说错误被catch代码块捕获了。
  + catch接受一个参数，表示try代码块抛出的值。
  + catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。
  + 在明明白白知道自己代码会发生错误时，不应该使用该语句

+ finally 代码块
  + try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。
  + 尽管 try 语句使用 return 返回后， finally 代码块仍然会执行

```js
try{
  //可能导致错误的代码
  throw new Error('出错了……');
}catch(error){
  //在错误发生时怎么处理
  console.log(error.message);
  console.log(error.name);
}finally{
  //无论是否出错都会执行
  console.log('完成清理工作');
}
//try语句块中的任何代码发生错误，就会立刻退出代码执行
//接着运行catch语句块
//catch块会接收到一个包含错误信息的对象，必需给错误对象取名字
//错误对象中保存着错误信息的message属性
//保存错误类型的name属性

//try...catch...finally这三者之间的执行顺序。
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}
var result = f();   // 0  // 1  // 3
result    // false

//抛出错误的时机
function process(values){
    if(!(values instanceof Array)){
        throw new Error("process(): Argument must be an array.");
    }
    values.sort();
    for(let i = 0, len = values.length; i < len; i++){
        if(values[i] > 100){
            return values[i];
        }
    }
    return -1;
}
//判断values不是数组后将错误抛出
```
+ 捕获错误，目的是避免浏览器以默认方式处理错误
+ 抛出错误，目的在于提供错误发生的具体原因

```js
//取消浏览器默认错误事件
window.onerror = function(message, url, line){
    alert(message);
    return false;//取消默认行为
}
//该函数可以捕获文档中所有的错误
图片也支持error事件,当src中的URL不能返回可以识别的图像格式,就会触发
```

## 原生错误类型

+ SyntaxError 对象
  + SyntaxError对象是解析代码时发生的语法错误。

+ ReferenceError 对象 
  + ReferenceError对象是引用一个不存在的变量时发生的错误。  找不到对象
  + 另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。

+ RangeError 对象
  + RangeError对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
  + 数值超出相应范围

+ TypeError 对象
  + TypeError对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。
  + 变量的类型不符合要求

+ URIError 对象
  + URIError对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
  + URI格式不正确

+ EvalError 对象
  + eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

## 常见错误

+ 类型转换错误
  + 使用某个操作符,或使用其他可能自动转换值的数据类型的语言结构时发生错误
  + 使用`全等(===) 和不全等 ( !==)` 避免类型的转换
  + `if for while`  等语句更要注意     if语句的自动转换布尔值

+ 数据类型错误
  + 检测数据类型,确保类型正确
  + 可以通过 `instanceof` 来检测数据类型

+ 通信错误
  + 最常见的错误是没有使用`encodeURIComponent()` 对数据进行编码
  + 服务器响应的数据不正确

+ 区分致命错误和非致命错误
  + 非致命错误
    + 不影响用户的主要任务
    + 只影响页面的一部分
    + 可以恢复
    + 重复相同操作可以消除错误
  + 致命错误
    + 应用程序根本无法继续运行
    + 错误明显影响到了用户的主要操作
    + 会导致其他连带错误
  + 可以用try-catch语句拦截非致命错误,使程序能够继续运行

+ 把错误记录到服务器
  + 将错误记录日志传入服务器集中管理

## 自定义错误

```js
//自定义错误对象
function UserError(message){
  this.message = message || '默认信息';
  this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
throw new UserError('自定义错误信息');

//自定义错误
Nice.Error = {
  MyError: function (type) {
    function my(message) {
      this.name = type;
      this.message = message;
      // this.line = line;
    }
    my.prototype = new Error();
    return my;
  }
};
//自定义错误类型
Nice.TypeError = {
  random: Nice.Error.MyError('随机错误'),
  type: Nice.Error.MyError('文件类型错误'),
  dataset: Nice.Error.MyError('自定义属性不存在'),
};
```

# 正则表达式

+ 元字符
+ 语法
+ [参考](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

## 匹配规则

### 字面量字符和元字符

+ .	点字符
  + 点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符。
  + 注意，对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是两个字符。

+ 位置字符
+  ^  匹配开头，在多行检测中，会匹配一行的开头
+  $  匹配结尾，在多行检测中，会匹配一行的结尾
```js
var s = "how are you";
var r = /\w+$/;
var a = s.match(r);  //返回数组["you"]
var r = /^\w+/;
var a = s.match(r);  //返回数组["how"]
var r = /\w+/g;
var a = s.match(r);  //返回数组["how","are","you"]
```

+ 选择符（|）
  + 竖线符号（|）在正则表达式中表示“或关系”（OR），即 cat|dog 表示匹配 cat 或 dog。
  + 选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或者cd，而不是指匹配b或者c。
  + 如果想修改这个行为，可以使用圆括号。
  + `/\w+|\d+/`  任意字母或数字     

+ 特殊字符
  + [\b] 匹配退格键(U+0008)，不要与\b混淆。
  + \cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
  + \0   null 字符
  + \n   换行符
  + \f   换页符
  + \r   回车符
  + \t   制表符tab
  + \v   垂直制表符
  + \xxx    以八进制数 xxx 规定的字符
  + \xdd    以十六进制数 dd  规定的字符
  + \uxxxx   以十六进制  xxxx  规定的 Unicode 字符
  + 前缀添加  \x  表示用的是 ASCII 字符
  + 十六进制需要添加 \x   八进制不需要

+ 预定义模式
  + \d 匹配0-9之间的任一数字，相当于[0-9]。
  + \D 匹配所有0-9以外的字符，相当于`[^0-9]`。
  + \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
  + \W 除所有字母、数字和下划线以外的字符，相当于 `[^A-Za-z0-9_]` 。
  + \s 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。
  + \S 匹配非空格的字符，相当于`[^\t\r\n\v\f]`。
  + \b 匹配词的边界。
  + \B 匹配非词边界，即在词的内部。

### 转义符

+ 正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配+，就要写成\+。
+ 正则表达式中，需要反斜杠转义的，
+ 一共有12个字符：^ 、 . 、[ 、$ 、( 、) 、| 、* 、+ 、? 、{ 和 \ 。
+ 需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。

### 方括号

+ [  方括号表示字符范围 ] 

+ 字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。
+ 所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配。

+ 脱字符 （ ^ ） [[^abc\]](https://www.w3school.com.cn/jsref/jsref_regexp_charset_not.asp)查找任何不在方括号之间的字符。
  + 如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。
  + 比如，[^xyz]表示除了x、y、z之外都可以匹配。
  + 如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。
  + 注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义。

+ 连字符（ - ）
  + 某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。
  + 比如，[abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母。
  + \u0128-\uFFFF表示匹配码点在0128到FFFF之间的所有字符。
  + [0-9]    0~9的数字
  + [a-z]     小写字母
  + [A-Z]     大写字母
  + [A-z]     大小写字母

  + `/(abc)|(efg)|(123)|(456)/` 
  + 为了避免歧义，应该为选择操作的多个子模式加上小括号

### 重复匹配

+ 模式的精确匹配次数，使用大括号（{}）表示。
+ {n}表示恰好重复n次，{n,}表示至少重复n次，最多无限
+ {n,m}表示重复不少于n次，不多于m次。
+ n+     同等  {1，}   匹配任何包含至少一个 n 的字符串  最多无限
+ n*     同等  *       匹配任何包含零个或多个 n 的字符串
+ n?     同等  {0，1}  匹配任何包含零个或一个 n 的字符串
+ n{x,y} 同等  {3，2}  匹配包含最少 x 个、最多 y 个 n 的序列的字符串
+ n{x,}  同等  {3，} |      匹配包含至少 x 个 n 的序列的字符串       |

+ ```js
  var s = "ggle goggle google g0...gle(多个o个数不一样的)";
  仅匹配单词 ggle 和 goggle
  var r = /go?gle/g;    同等于 /go{0,1}gle/g;
  var a = s.match(r)
  ```

### 量词符

+ 量词符用来设定某个模式出现的次数。
  - `?` 问号表示某个模式出现0次或1次，等同于{0, 1}。
  - `*` 星号表示某个模式出现0次或多次，等同于{0,}。
  - `+` 加号表示某个模式出现1次或多次，等同于{1,}。

### 贪婪匹配和惰性匹配

+ 模式是/a+/，表示匹配1个a或多个a，那么到底会匹配几个a呢？因为默认是贪婪模式，会一直匹配到字符a不出现为止。
+ 除了贪婪模式，还有非贪婪模式，即最小可能匹配。
  + 只要一发现匹配，就返回结果，不要往下检查。
  + 如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。

+ 重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符
  + ?、{n} 和 {n,m} 重复类具有弱贪婪性，表现为贪婪的有限性。
  + *、+ 和 {n,} 重复类具有强贪婪性，表现为贪婪的无限性。
+ 惰性
+ {n,m}?：尽量匹配 n 次，但是为了满足限定条件也可能最多重复 m 次。
+ {n}?：尽量匹配 n 次。
+ {n,}?：尽量匹配 n 次，但是为了满足限定条件也可能匹配任意次。
+ ?? ：表示某个模式出现0次或1次，匹配时采用非贪婪模式，相当于 {0,1}?。
+ +? ：表示某个模式出现1次或多次，匹配时采用非贪婪模式，相当于 {1,}?。
+ *? ：表示某个模式出现0次或多次，匹配时采用非贪婪模式，相当于 {0,}?。
+ /ab*/表示如果a后面有多个b，那么匹配尽可能多的b；/ab*?/表示匹配尽可能少的b，也就是0个b。

```js
越是排在左侧的重复类量词匹配优先级越高。下面示例显示当多个重复类量词同时满足条件时，会在保证右侧重复类量词最低匹配次数基础上，使最左侧的重复类量词尽可能占有所有字符。
var s = "<html><head><title></title></head><body></body></html>";
var r = /(<.*>)(<.*>)/;			/<.*?>/; //返回单个元素数组["<html>"]
var a = s.match(r);
//左侧表达式匹配"<html><head><title></title></head><body></body></html>"
console.log(a);
console.log(a[1]);  //<html><head><title></title></head><body></body>
console.log(a[2]);  //右侧表达式匹配“</html>”
```

### 修饰符

+ 修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。
+ 修饰符可以单个使用，也可以多个一起使用。
```js
// 单个修饰符
var regex = /test/i;

// 多个修饰符
var regex = /test/ig;
```

+ g 修饰符
  + 默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。
  + g修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。
  + 正则模式不含g修饰符，每次都是从字符串头部开始匹配。
  + 正则模式含有g修饰符，每次都是从上一次匹配成功处，开始向后匹配。

+ i 修饰符
  + 默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写（ignoreCase）。

+ m 修饰符
  + m修饰符表示多行模式（multiline）
  + 会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处
  + 加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
```js
/^b/m.test('a\nb') // true
//上面代码要求匹配行首的b，如果不加m修饰符，就相当于b只能处在字符串的开始处。
//加上m修饰符以后，换行符\n也会被认为是一行的开始。
```

+ `s` 修饰符 
  +  特殊字符圆点 `.` 中包含换行符 `\n`
  + 默认情况下的圆点 `.` 是 匹配除换行符`\n`之外的任何字符，加上 `s` 修饰符之后, `.` 中包含换行符 `\n`。

## 组匹配

### 括号分组

+ 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。
```js
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred') // true
//第一个模式没有括号，结果+只表示重复字母d，第二个模式有括号，结果+就表示匹配fred这个词。

//分组捕获
var m = 'abcabc'.match(/(.)b(.)/);
m   // ['abc', 'a', 'c']
//正则表达式/(.)b(.)/一共使用两个括号，第一个括号捕获a，第二个括号捕获c。

/(.)b(.)\1b\2/.test("abcabc");    // true
//\1表示第一个括号匹配的内容（即a），\2表示第二个括号匹配的内容（即c）

//匹配网页标签的例子。
var tagName = /<([^>]+)>[^<]*<\/\1>/;
// ([^>]+)  匹配标签名称
// [^<]*  匹配标签内的内容
tagName.exec("<b>bold</b>")[1]
// 'b'

//捕获带有属性的标签
var tag = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

var s = "a b c d e f g h i j k l m n";
var r = /(\w+)(\w)(\w)/;
r.test(s);
console.log(RegExp.$1);  //返回第1个子表达式匹配的字符a b c d e f g h i j k l m n
console.log(RegExp.$2);  //返回第2个子表达式匹配的字符m
console.log(RegExp.$3);  //返回第3个子表达式匹配的字符n
```

### 非捕获组

+ (?:x)称为非捕获组（Non-capturing group）
  + 表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

```js
  var s1 = "abc";
  var r = /(?:\w*?)|(?:\d*?)/;  在左括号的后面加上一个问号和冒号。

  //用来分解网址的正则表达式。
  // 正常匹配
  var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

  url.exec('http://google.com/');
  // ["http://google.com/", "http", "google.com", "/"]

  // 非捕获组匹配
  var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

  url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/"]
```

### 先行断言

+ x(?=y)称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果。
+ x 只有在 y 的前面, 才会匹配到 x
+ 比如，要匹配后面跟着百分号的数字，可以写成/\d+(?=%)/。
+ “先行断言”中，括号里的部分是不会返回的。
```js
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
//上面的代码使用了先行断言，b在c前面所以被匹配，但是括号对应的c不会被返回。
```

### 先行否定断言

+ x(?!y)称为先行否定断言（Negative look-ahead）
+ x只有不在y前面才匹配，y不会被计入返回结果。
+ 比如，要匹配后面跟的不是百分号的数字，就要写成/\d+(?!%)/。
+ “先行否定断言”中，括号里的部分是不会返回的。
```js
/\d+(?!\.)/.exec('3.14')
// ["14"]
//上面代码中，正则表达式指定，只有不在小数点前面的数字才会被匹配，因此返回的结果就是14。
```

## 例子

```js
/[\u0000-\u00ff]/g		匹配任意 ASCII 字符
/[^\u0000-\u00ff]/g		匹配任意双字节的汉字
/[a-zA-Z0-9]/g			匹配任意大小写字母和数字
/[\u0030-\u0039]/g		使用 Unicode 编码设计，匹配数字
/[\u0041-\u004A]/g		匹配任意大写字母
/[\u0061-\u007A]/g 		匹配任意小写字母
 
var s = "a b c d e z";  //字符串直接量
var r = /[abce-z]/g;  //字符a、b、c，以及从e~z之间的任意字符
var a = s.match(r);  //返回数组["a","b","c","e","z"]

var s = "abc4 abd6 abe3 abf1 abg7";  //字符串直接量
var r = /ab[c-g][1-7]/g;  //前两个字符为ab，第三个字符为从c到g，第四个字符为1~7的任意数字
var a = s.match(r);  //返回数组["abc4","abd6","abe3","abf1","abg7"]

var r = /[^0123456789]/g;  //使用反义字符范围可以匹配很多无法直接描述的字符，达到以少应多的目的。

var s = '<meta charset="utf-8">';  //待过滤的表单提交信息
var r = /\'|\"|\<|\>/gi;  //过滤敏感字符的正则表达式
function f(a) {  //替换函数
    ////把敏感字符替换为对应的网页显示的编码格式
    return "&#" + arguments[0].charCodeAt(0) + ";";
    return "&#" + a.charCodeAt(0) + ";";
}
var a =s.replace(r,f);  //执行过滤替换 
// document.write(a);  //在网页中显示正常的字符信息
console.log(a);   // &#60;meta charset=&#34;utf-8&#34;&#62;
```

# 客户端检测

## 能力检测

+ 客户端的能力检测（特性检测），目的不是识别特定的浏览器，而是识别浏览器的能力

+ ```js
  if(object.propertyInQuestion){
      //使用 object.propertyInQuestion
  }
  
  function getElement(id){
      if(document.getElementById){
          return document.getElementById(id);
      }else if(document.all){
          return document.all[id];
      }else{
          throw new Error("No way to retrieve element!")
      }
  }
  ```

+ 更可靠的能力检测
  + ```js
    function isHostMethod(object, property){
        var t = typeof object[property];
        return t == "function" || (!!(t == "object" && object[property])) || t == "unknown"
    }
    
    result = isHostMethod(xhr, "open");		//true
    result = isHostMethod(xhr, "foo");		//false
    ```

  + 能力检测，不是浏览器检测

    + 不能通过检测特定的对象确认是什么浏览器

## 怪癖检测

+ 目标是识别浏览器的特殊行为，

## 用户代理检测

+ 用户代理字符串的历史
+ 用户代理字符串检测技术
+ 完整的代码
+ 使用方法