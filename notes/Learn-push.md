# fetch

+ [参考链接](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

+ `fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；
+ 相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
+ `fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。
+ XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。



## 基本使用

+ fetch(url,optionObj) : 返回一个 promise 成功的值为 response 对象
+ fetch 发送请求成功后,只要能够发送就回返回成功的 promise 对象
+ 只有在网络错误或无法连结时才回发生错误, 也就是请求根本发送不出去.
+ 可以通过返回 response 对象来判断请求状态

```js
// 接收一个 url 地址 返回一个 promise 对象
fetch(url).then(...).catch(...)

// 普通写法
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json()) // response.json() 方法返回的也是一个 promise 对象
  .then(json => console.log(json)) // 得到数据
  .catch(err => console.log('Request Failed', err));  // 利用 promise 的异常穿透处理错误

// async 函数写法
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try { // 处理 await 因为 promise 失败发生的错误, 因为 await 直接接收成功 promise 的结果
    let response = await fetch(url); // 得到成功后的 response 对象
    return await response.json(); // 返回 response.json() 成功后的数据
  } catch (error) { // 统一处理错误
    console.log('Request Failed', error);
  }
}
```

## 取消`fetch()`请求

+ `fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。

```js
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal 
    // 配置对象的 signal 属性必须指定接收 AbortController 实例发送的信号 controller.signal。
});

signal.addEventListener('abort',
  () => console.log('abort!')
);
// 这时会触发 abort 事件，这个事件可以监听，
// 也可以通过 controller.signal.aborted 属性判断取消信号是否已经发出。
// controller.abort() 方法用于发出取消信号。
controller.abort(); // 取消
console.log(signal.aborted); // true
```





## 配置对象 OptionObj

+ `fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
// GET 请求没有 body 选项,且参数可以直接设置在 url 上
const response = await fetch(url, {
  method: 'POST', // 请求类型 : POST \ DELETE \ PUT
  headers: { // 一个对象,用来定制 请求头
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum', // POST 请求的数据体
  referrer: "about:client",
    // referrer 属性用于设定 fetch() 请求的 referer 标头。
	// 这个属性可以为任意字符串，也可以设为空字符串（即不发送 referer 标头）。
  referrerPolicy: "no-referrer-when-downgrade",
    /* referrerPolicy属性用于设定Referer标头的规则。可能的取值如下：
    	no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
        no-referrer：不发送Referer标头。
        origin：Referer标头只包含域名，不包含完整的路径。
        origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
        same-origin：跨域请求不发送Referer，同源请求发送。
        strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
        strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
        unsafe-url：不管什么情况，总是发送Referer标头。
    */
  mode: "cors", 
    /* mode 指定请求的模式。可能的取值如下：
    	cors：默认值，允许跨域请求。
        same-origin：只允许同源请求。
        no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，
        不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
    */
  credentials: "same-origin",
    /* credentials属性指定是否发送 Cookie。可能的取值如下：
    	same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送。
        include：不管同源请求，还是跨域请求，一律发送 Cookie。
        omit：一律不发送。
    */
  cache: "default", 
    /* cache 指定如何处理缓存。可能的取值如下:
    	default：默认值，先在缓存里面寻找匹配的请求。
        no-store：直接请求远程服务器，并且不更新缓存。
        reload：直接请求远程服务器，并且更新缓存。
        no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
        force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
        only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
    */
  redirect: "follow",
    /* redirect属性指定 HTTP 跳转的处理方法。可能的取值如下：
    	follow：默认值，fetch() 跟随 HTTP 跳转。
        error：如果发生跳转，fetch() 就报错。
        manual：fetch() 不跟随 HTTP 跳转，但是 response.url 属性会指向新的 URL，
        response.redirected 属性会变为 true，由开发者自己决定后续如何处理跳转。
    */
  integrity: "",
    // integrity 属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。
  keepalive: false,
    // keepalive 属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
    // 一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。
  signal: undefined
    // signal 属性指定一个 AbortSignal 实例，用于取消fetch()请求
});
```



## Response 对象:处理 HTTP 回应

+ 用来得到数据的主要方法,这些方法都是异步的,都返回 promise 对象

+ 这些方法只能够使用一次,使用一次后在次调用任何一个都回报错.

  + `response.text()`：得到文本字符串,如 HTML 文件
  + `response.json()`：得到 JSON 对象。
  + `response.blob()`：得到二进制 Blob 对象。
  + `response.formData()`：得到 FormData 表单对象。
  + `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。

+ ###  Response.clone()

  + `const response2 = response1.clone();`
  + 这个方法可以创建`Response`对象的副本，实现多次读取。
  + 也就是一个对象只能读取多次,创建多个对象来实现读取多次

+ ### Response.body 属性

  + 可以用来分块读取内容，应用之一就是显示下载的进度。
  + `const reader = response.body.getReader();`
  + `response.body.getReader()`方法返回一个遍历器。
  + 这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。
  + `const {done, value} = await reader.read();`
  + 这个对象的`done`属性是一个布尔值，用来判断有没有读完；
  + `value`属性是一个 arrayBuffer 数组，表示内容块的内容，而`value.length`属性是当前块的大小。



+ `fetch()`请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。

+ 拥有的属性

  + **Response.ok** : `Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码。
  + **Response.status** : `Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
  + **Response.statusText** : `Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
  + **Response.url** : `Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
  + **Response.type** : 属性返回请求的类型。可能的值如下:
    + `basic`：普通请求，即同源请求。
    + `cors`：跨域请求。
    + `error`：网络错误，主要用于 Service Worker。
    + `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似`<form>`表单的那种跨域请求。
    + `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
  + **Response.redirected** : `Response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。

  

  + ### Response.headers 属性

    + 保存了对应 HTTP 回应的所有标头。
    + 可以利用 for...of 进行遍历

  + 操作方法

    + `Headers.get()`：根据指定的键名，返回键值。
    + `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
    + `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
    + `Headers.append()`：添加标头。
    + `Headers.delete()`：删除标头。
    + `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
    + `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
    + `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
    + `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。