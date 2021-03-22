# axios

```js
// 设置默认地址
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.get('/all', {
	// url 参数
	params: {
		id: 100,
		vip: 7
	},
	// 请求头信息
	headers: {
		name: 'Nice',
		age: 18
	}
}).then(value => {
	console.log(value);
})

axios.post('/all', {
	// 请求体
}, {
	params: {// url 参数
	},
	headers: {// 请求头信息
	}
})

axios({
	method: 'GET',
	url: '/all',
	params: {},
	headers: {},
	data: {}
}).then(response => {
	console.log(response);
})
```

# fetch

```js
fetch('http://127.0.0.1:8000/all', {
	method: 'POST',
	headers: {},
	body: {}
}).then(response => {
	// console.log(response);
	// return response.text();
	return response.json();
}).then(response => {
	console.log(response);
});
```

# AJAX

+ 全称是 Asynchronous JavaScript And XML,异步的 Js 和 XML
+ 可以在浏览器中向服务器发送异步请求,优势就是无刷新获取数据

+ Jquery 发送请求 [文档](https://jquery.cuishifeng.cn/)
```js
$.get(url,dataObj,callback,dataType);
$.post(); // 一样的
$.ajax({
	// 请求链接
	url:'',
	// 参数数据
	data:{},
	// 请求类型
	type:'GET',
	// 响应体结果类型
	dataType:'json',
	success:function(){
		// 成功的回调
	},
	// 超时
	timeout:2000,
	error:function(){
		// 失败的回调
	},
	// 头部信息属于自定义
	header:{
		a:100,
		b:200
	}
});
```

## 基础

```js
// 创建对象
const xhr = new XMLHttpRequest();
// 设置响应体的数据类型
xhr.responseType = 'json';
// 超时设置
xhr.timeout = 2000;
// 超时回调
xhr.ontimeout = function () {
	alert('请求超时!请稍后重试...');
}
// 网络异常
xhr.onerror = function () {
	alert('你的网络似乎出现了一些问题');
}

// 初始化  发送请求的方式与目标链接   GET请求在链接后加问号来发送数据
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
// 设置请求头  两个参数 第一个位请求体内容的类型  第二位参数查询字符串的类型固定写发
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 可以自定义设置请求头信息,但是需要服务端允许

// 发送请求
// POST 请求在这里发送数据 xhr.send('a=100&b=200&c=300');  格式需要与服务端对应
xhr.send();

// 手动取消请求
xhr.abort();

/*
readystate 是 xhr 对象中的属性, 表示状态: 0  1  2  3  4
0 : 表示为初始化
1 : 表示 open 方法调用完毕
2 : 表示 send 方法调用完毕
3 : 表示 服务端返回了部分的结果
4 : 表示服务端返回了所有的结果
*/
// 事件绑定 用来处理服务端返回结果.
// 当状态改变时触发 一共会触发 4 次
xhr.onreadystatechange = function () {
	// 判断是否返回了所有的结果
	if (xhr.readyState === 4) {
		// 判断响应状态码  200  404  403  401  500
		// 以 2xx 开头的都代表成功
		if (xhr.status >= 200 && xhr.status < 300) {
			// 处理结果  行  头  空行  体
			// 1.响应行
			xhr.status; // 状态码
			xhr.statusText; // 状态字符串
			xhr.getAllResponseHeaders(); // 所有响应头
			xhr.response; // 响应体
		} else {

		}
	}
}
```

# 练习服务断设置

```js
// 引入 express
const express = require('express');
// 创建应用
const app = express();
// 创建路由规则

// 对应 GET 请求
app.get('/get', (request, response) => {
   // 设置响应头   允许跨域
   response.setHeader('Access-Control-Allow-Origin', '*');
   // 设置响应GET
   response.send('HELLO AJAX GET');
});

// 对应 POST 请求
app.post('/psst', (request, response) => {
   // 设置响应头   允许跨域
   response.setHeader('Access-Control-Allow-Origin', '*');
   // 设置响应
   response.send('HELLO AJAX POST');
});

// 延迟响应
app.get('/time', (request, response) => {
   // 设置响应头   允许跨域
   response.setHeader('Access-Control-Allow-Origin', '*');
   // 设置响应
   setTimeout(() => {
      response.send('延迟响应');
   }, 3000)
});

// 所有的请求
app.all('/all', (request, response) => {
   // 设置响应头   允许跨域
   response.setHeader('Access-Control-Allow-Origin', '*');
   // 响应头
   response.setHeader('Access-Control-Allow-Headers', '*');
   // 设置响应数据
   const data = {
      name: 'Jea',
      age: '18',
      sex: '女'
   }
   // 设置响应
   // response.send('HELLO AJAX POST');
   response.send(JSON.stringify(data));
});

// 监听端口服务
app.listen(8000, () => {
   console.log('服务已经启动,8000 端口监听中...');
})
```

# 跨域问题

## 同源策略

+ 协议 , 域名 , 端口号 必须完全相同
+ ajax 默认遵守 同源策略
+ 满足同源策略时发送请求的链接可以简写,只需要 `/pageName`

## 跨域解决方式

### CORS

+ 官方跨域方案
+ 支持 get 和 post 请求
+ 服务端来设置响应头来实现跨域
```js
app.all('/cors',(request, response) =>{
	// 允许寡欲的响应头
	response.setHeader('Access-Control-Allow-Origin','*'); // 允许所有网页
	// response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8000'); // 允许指定的网页
	response.setHeader('Access-Control-Allow-Headers','*'); // 允许自定义请求头
	response.setHeader('Access-Control-Allow-Method','*'); // 请求方式
})
```

### JSONP

+ 非官方的跨域解决方案,只支持 get 请求
+ 借助了 html 页面中的 script 标签来实现
+ 在服务端返回函数的调用,然后在前端进行处理
+ 将返回的数据作为函数的参数进行处理
```js
// 创建请求标签
const script = document.createElement('script');
// 设置请求链接
script.src = 'url';
// 加入网页中发送请求
document.body.appendChild(script);

// Jquery 方式    ?callback=?  Jquery固定的写发,发送一个 Jquery 预定义的函数
$.getJSON('url?callback=?', function (data) {
	console.log(data)
})
// 需要在服务端进行处理
app.all('/jsonp',(request, response) =>{
	const data = {name:'Nice'}; // 数据
	let str = JSON.stringify(data); // 转化为字符串
	let cb = request.query,callback; // 前端发送过来的 callback 函数
	response.end(`${cb}(${str})`); // 返回函数调用的代码
})
```

# 注意点

## IE AJAX 缓存问题

+ 因为 IE 会缓存 AJAX 请求,所以在请求时会直接使用上次请求的缓存,而得不到最新的内容
+ 解决
  + 利用在后面加上一个时间戳,让 IE 认为每次都是一个不同的请求
  + `xhr.open('GET', 'http://127.0.0.1:8000/server?t='+Date.now());`

## 重复请求问题

+ 利用判断来避免用户重复点击发送相同的请求
+ 也就是在请求的过程中拒绝重复发送直到完成
+ `xhr.readyState === 4` 不论请求是成功还是失败,只要请求完成就行

# HTTP协议

## 请求报文

+ 重点格式与参数
```js
// 请求行 一共三种
行   GET 请求方式(POST)  /  URL路径 s?ie=utf-8  / HTTP/1.1 http协议的版本
// 格式
头   Host:
     CooKie:
     Content-type:
     User-Agent:
空行
// GET 请求体是为空 | POST请求请求体可以不为空
体   username=admin&password=admin
```

## 响应报文

```js
行   HTTP/1.1 200 OK  协议版本  响应状态码  响应状态字符串
头   Content-Type: text/html;charset=utf-8
     Content-length: 2048
     Content-encoding: gzip

空行
体   <html/>内容
```