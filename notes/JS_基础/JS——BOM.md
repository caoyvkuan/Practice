# 浏览器环境概述

## 代码嵌入网页的方法

+ 网页中嵌入 JavaScript 代码，主要有四种方法。
  + <script>元素直接嵌入代码。
  + <script>标签加载外部脚本
  + 事件属性
  + URL 协议

1. script 元素嵌入代码
   + <script>标签有一个type属性，用来指定脚本类型。
   + 对 JavaScript 脚本来说，type属性可以设为两种值。
     + text/javascript：这是默认值，也是历史上一贯设定的值。如果你省略type属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
     + application/javascript：对于较新的浏览器，建议设为这个值。
   + <script> 标签默认就是 JavaScript 代码， 所以，嵌入代码时，type 属性可以省略
   + 如果 type 属性的值，浏览器不认识，那么它不会执行代码。利用这一点，可以在<script>标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的 type 属性即可。
     + 这样嵌入的代码，不会执行也不会显示，可以利用该节点的 text 属性读取嵌入的内容

2. script 元素加载外部脚本
   + 外链时如果脚本文件使用了非英语字符，还应该注明字符的编码。 ``charset="utf-8"``
   + 外链了脚本的 <script> 标签不能再次内嵌代码
   + 为了防止攻击者篡改外部脚本，script 标签允许设置一个 integrity 属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。
   + 一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。

3. 事件属性
   + 网页元素的事件属性（比如 onclick 和 onmouseover），可以写入 JavaScript 代码。当指定事件发生时，就会调用这些代码。
   + 事件属性代码只有一个语句。如果有多个语句，使用分号分隔即可。

4. URL 协议
   + URL 支持 javascript: 协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。
   + 浏览器的地址栏也可以执行 javascript: 协议。
```js
<a href="javascript:console.log('Hello')">点击</a>

/**
 * javascript:协议的常见用途是书签脚本 Bookmarklet。
 * 由于浏览器的书签保存的是一个网址
 * 所以javascript:网址也可以保存在里面，
 * 用户选择这个书签的时候就会在当前页面执行这个脚本。
 * 为了防止书签替换掉当前文档，可以在脚本前加上void，或者在脚本最后加上void 0。
 */
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```
  + 如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。
  + 如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。

## script 元素

+ `src` ：指定外部脚本的URI， 如果设置了 `src` 特性，script 标签内容将会被忽略;
+ ES6 新增了属性值 `module` ，代码会被当做 JavaScript 模块

### 工作原理

+ 浏览器加载 JavaScript 脚本，主要通过<script>元素完成。正常的网页加载流程是这样的。
  1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
  2. 解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
  3. 如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
  4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

+ 加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。
+ 原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

+ 如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成
+ 造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

+ 为了避免这种情况，较好的做法是将<script>标签都放在页面底部，而不是头部。
+ 这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。
+ 如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。

+ 脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错
+ 如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。
+ 一种解决方法是设定 DOMContentLoaded 事件的回调函数。
+ 指定 DOMContentLoaded 事件发生后，才开始执行相关代码。DOMContentLoaded 事件只有在 DOM 结构生成之后才会触发。

```js
//如果有多个script标签，比如下面这样。
<script src="a.js"></script>
<script src="b.js"></script>
/**
 * 浏览器会同时并行下载 a.js 和 b.js，
 * 但是，执行时会保证先执行 a.js，然后再执行 b.js，即使后者先下载完成，也是如此。
 */
```
+ 也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。
+ 当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。

+ 解析和执行 CSS，也会产生阻塞。
+ Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；
+ Webkit 则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。

+ 此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般有限制，同时最多下载6～20个资源
+ 即最多同时打开的 TCP 连接有限制，这是为了防止对服务器造成太大压力。
+ 如果是来自不同域名的资源，就没有这个限制。
+ 所以，通常把静态文件放在不同的域名之下，以加快下载速度。

### defer 属性

+ 为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对<script>元素加入 defer 属性。
+ 它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。
```js
<script src="a.js" defer></script>
//只有等到 DOM 加载完成后，才会执行 a.js
```
+ defer 属性的运行流程如下。
  + 浏览器开始解析 HTML 网页。
  + 解析过程中，发现带有defer属性的<script>元素。
  + 浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
  + 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。

+ 有了 defer 属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。
+ 下载的脚本文件在 DOMContentLoaded 事件触发前执行（即刚刚读取完</html>标签）
+ 而且可以保证执行顺序就是它们在页面上出现的顺序。

+ 对于内置而不是加载外部脚本的 script 标签，以及动态生成的 script 标签，defer 属性不起作用。
+ 另外，使用 defer 加载的外部脚本不应该使用 document.write 方法。

### async 属性

+ 解决“阻塞效应”的另一个方法是对<script>元素加入async属性。
```js
<script src="a.js" async></script>
<script src="b.js" async></script>
```
+ async 属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。
  + 浏览器开始解析 HTML 网页。
  + 解析过程中，发现带有 async 属性的 script 标签。
  + 浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
  + 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
  + 脚本执行完毕，浏览器恢复解析 HTML 网页。

+ async 属性可以保证脚本下载的同时，浏览器继续渲染。
+ 需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。
+ 哪个脚本先下载结束，就先执行那个脚本。
+ 另外，使用 async 属性的脚本文件里面的代码，不应该使用 document.write 方法。

+ defer 属性和 async 属性到底应该使用哪一个?
  + 一般来说，如果脚本之间没有依赖关系，就使用 async 属性
  + 如果脚本之间有依赖关系，就使用 defer 属性。
  + 如果同时使用 async 和 defer 属性，后者不起作用，浏览器行为由 async 属性决定。

### 脚本的动态加载

+ <script>元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
```js
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false; // 保持脚本的执行顺序
  document.head.appendChild(script);
});
```
+ 这种方法的好处是，动态生成的 script 标签不会阻塞页面渲染，也就不会造成浏览器假死。
+ 但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。
+ 如果想避免这个问题，可以设置 async 属性为 false。
```js
// 动态加载脚本指定回调函数
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
```

### 加载使用的协议

+ 如果不指定协议，浏览器默认采用 HTTP 协议下载。
```js
<script src="example.js"></script>
```
+ 上面的 example.js 默认就是采用 HTTP 协议下载，如果要采用 HTTPS 协议下载，必需写明。
```js
<script src="https://example.js"></script>
```
+ 但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。
```js
<script src="//example.js"></script>
```

## 浏览器的组成

+ 浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

### 渲染引擎

+ 渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。

+ 不同的浏览器有不同的渲染引擎。
  + Firefox：Gecko 引擎
  + Safari：WebKit 引擎
  + Chrome：Blink 引擎
  + IE: Trident 引擎
  + Edge: EdgeHTML 引擎

+ 渲染引擎处理网页，通常分成四个阶段。
  + 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
  + 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
  + 布局：计算出渲染树的布局（layout）。
  + 绘制：将渲染树绘制到屏幕。

+ 以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。
+ 所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

### 重流和重绘

+ 渲染树转换为网页布局，称为“布局流”（flow）；
+ 布局显示到页面的这个过程，称为“绘制”（paint）。
+ 它们都具有阻塞效应，并且会耗费很多时间和计算资源。

+ 页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。
+ 用户的互动也会触发重流和重绘，比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。

+ 重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。
+ 比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。

+ 大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。

+ 作为开发者，应该尽量设法降低重绘的次数和成本。
+ 比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；
+ 再比如，重绘 table 布局和 flex 布局，开销都会比较大。
```js
var foo = document.getElementById('foobar');

foo.style.color = 'blue';
foo.style.marginTop = '30px';
//上面的代码只会导致一次重绘，因为浏览器会累积 DOM 变动，然后一次性执行。
```

+ 优化技巧
  + 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
  + 缓存 DOM 信息。
  + 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
  + 使用 documentFragment 操作 DOM
  + 动画使用 absolute 定位或 fixed 定位，这样可以减少对其他元素的影响。
  + 只在必要时才显示隐藏元素。
  + 使用 window.requestAnimationFrame()，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
  + 使用虚拟 DOM（virtual DOM）库。
```js
// 重流代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = (currentHeight * 2) + 'px';
}

all_my_elements.forEach(doubleHeight);
//每读一次 DOM，就写入新的值，会造成不停的重排和重流。

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function () {
    element.style.height = (currentHeight * 2) + 'px';
  });
}

all_my_elements.forEach(doubleHeight);
//所有的写操作，都累积在一起，从而 DOM 代码变动的代价就最小化了。
```

### JavaScript 引擎

+ JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。
+ JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。
+ 这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；
+ 缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。

+ 为了提高运行速度，目前的浏览器都将 JavaScript 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。
+ 早期，浏览器内部对 JavaScript 的处理过程如下：
  + 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
  + 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
  + 使用“翻译器”（translator），将代码转为字节码（bytecode）。
  + 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

+ 为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。
+ 通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。

+ 字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。

+ 下面是目前最常见的一些 JavaScript 虚拟机：
  + Chakra (Microsoft Internet Explorer)
  + Nitro/JavaScript Core (Safari)
  + Carakan (Opera)
  + SpiderMonkey (Firefox)
  + V8 (Chrome, Chromium)






+ 获取设备物理像素和设备独立像素的比值——主要用于适配移动设备
+ window.devicePixelRatio

# window对象

+ 浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口。
+ 它也是当前页面的顶层对象(Global对象)，即最高一层的对象，所有其他对象都是它的下属。
+ 一个变量如果未声明(未使用关键字声明，隐式声明)，那么默认就是顶层对象的属性。

+ 全局作用域
  + 在全局作用域中声明的变量,函数都会成为 window 对象的属性和方法
  + 全局变量不能通过 delete 删除,而直接在 window 对象上定义的属性可以

## 属性

### name

+ window.name 属性是一个字符串，表示当前浏览器窗口的名字。
+ 窗口不一定需要名字，这个属性主要配合超链接和表单的 target 属性使用。
+ 只能保存字符串，储存容量可以高达几 MB
+ 浏览器窗口不关闭，就不会消失

### closed，opener

+ window.closed 属性返回一个布尔值，表示窗口是否关闭。
+ 这个属性一般用来检查，使用脚本打开的新窗口是否关闭。
```js
var popup = window.open();

if ((popup !== null) && !popup.closed) {
  // 窗口仍然打开着
}
```
+ window.opener 属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回 null。

### self, window

+ window.self 和 window.window 属性都指向窗口本身。这两个属性只读。

### frames,length

+ window.frames 属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括 frame 元素和 iframe 元素。window.frames[0] 表示页面中第一个框架窗口。
+ 比如 <iframe name="myIFrame"> 可以用 frames['myIFrame'] 或者 frames.myIFrame 来引用。
+ frames 属性实际上是 window 对象的别名。
```js
frames === window // true
```
+ window.length 属性返回当前网页包含的框架总数。
+ 如果当前网页不包含 frame 和 iframe 元素，那么 window.length 就返回 0。

### frameElement

+ window.frameElement 属性主要用于当前窗口嵌在另一个网页的情况
+ （嵌入<object>、<iframe>或<embed>元素），返回当前窗口所在的那个元素节点。

### top,parent

+ window.top 属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
+ window.parent 属性指向父窗口。如果当前窗口没有父窗口，window.parent 指向自身。

+ 对于不包含框架的网页，这两个属性等同于window对象。

### status

+ window.status 属性用于读写浏览器状态栏的文本。
+ 但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效。

### devicePixelRatio

+ window.devicePixelRatio 属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。

+ 也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。

### 位置大小属性

1. screenX,screenY
   + window.screenX 和 window.screenY 属性，
   + 返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。

2. innerHeight,innerWidth
   + window.innerHeight 和 window.innerWidth 属性，
   + 返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。
   + 用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。
   + 因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。
   + 注意，这两个属性值包括滚动条的高度和宽度。

3. outerHeight,outerWidth
   + window.outerHeight 和 window.outerWidth 属性返回浏览器窗口的高度和宽度
   + 包括浏览器菜单和边框（单位像素）。这两个属性只读。

4. scrollX,scrollY
   + window.scrollX 属性返回页面的水平滚动距离
   + window.scrollY 属性返回页面的垂直滚动距离
   + 单位都为像素。这两个属性只读。
```js
//如果页面向下滚动的距离小于75像素，那么页面向下滚动75像素。
if (window.scrollY < 75) {
  window.scroll(0, 75);
}
```

5. pageXOffset,pageYOffset
   + window.pageXOffset 属性和 window.pageYOffset 属性
   + 是 window.scrollX 和 window.scrollY 别名。

### 组件属性

+ 组件属性返回浏览器的组件对象。这样的属性有下面几个。
  + window.locationbar：地址栏对象
  + window.menubar：菜单栏对象
  + window.scrollbars：窗口的滚动条对象
  + window.toolbar：工具栏对象
  + window.statusbar：状态栏对象
  + window.personalbar：用户安装的个人工具栏对象
  + 这些对象的visible属性是一个布尔值，表示这些组件是否可见。这些属性只读。

### 全局对象属性

+ window.document ：指向 document 对象

+ window.location ：指向Location对象

+ window.navigator：指向Navigator对象

+ window.history  ：指向History对象

+ window.localStorage ：指向本地储存的 localStorage 数据

+ window.sessionStorage ：指向本地储存的 sessionStorage 数据

+ window.console ：指向 console 对象，用于操作控制台

+ window.screen ：指向Screen对象，表示屏幕信息

### isSecureContext

+ window.isSecureContext 属性返回一个布尔值，表示当前窗口是否处在加密环境。
+ 如果是 HTTPS 协议，就是true，否则就是false。

## 方法

### alert(),prompt(),confirm()

+ window.alert()、window.prompt()、window.confirm() 都是浏览器与用户互动的全局方法。
+ 它们会弹出不同的对话框，要求用户做出回应。
+ 注意，这三个方法弹出的对话框，都是浏览器统一规定的式样，无法定制。

1. alert()
   + 只有一个“确定”按钮，往往用来通知用户某些信息。
   + 用户只有点击“确定”按钮，对话框才会消失。
   + 对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。
   + 可以用\n指定换行。

2. prompt()
   + window.prompt() 方法弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。
   + 它往往用来获取用户输入的数据。
   + 点击取消或按下 Esc 键返回 `null`。
   + 点击确定返回输入框的值
```js
var result = prompt('您的年龄？', 25); // 25为默认值，用户没有输入，点了确认，就返回默认值
```

3. confirm()
   + window.confirm() 方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意。
   + confirm 方法返回一个布尔值，如果用户点击“确定”，返回true；
   + 如果用户点击“取消”，则返回false。

### open(),close(),stop()

1. `window.open(url,窗口名称[,打开新窗口的属性(一般用不上)])`
   + 打开一个新窗口
   + 窗口名称,特殊窗口名
     + _self
     + _parent
     + _top
     + _blank
   + 方法的返回值为 null 则代表,弹窗被屏蔽

2. window.close()
   + window.close 方法用于关闭当前窗口.
   + 该方法只对顶层窗口有效，iframe 框架之中的窗口使用该方法无效。

3. window.stop()
   + window.stop() 方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。

### moveTo(),moveBy()

+ window.moveTo() 方法用于移动浏览器窗口到指定位置。
+ 它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

+ window.moveBy() 方法将窗口移动到一个相对位置。
+ 它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

+ 为防止滥用，只能移动用 window.open() 打开的窗口

### resizeTo()，resizeBy()

+ window.resizeTo() 方法用于缩放窗口到指定大小。

+ window.resizeBy() 方法相对缩放

### scrollTo()，scroll()，scrollBy()

+ window.scrollTo 方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
```js
window.scrollTo(x-cord, y-cord)

//它也可以接受一个配置对象作为参数。
window.scrollTo(options)
//配置对象options有三个属性。
/**
 * top：滚动后页面左上角的垂直坐标，即 y 坐标。
 * left：滚动后页面左上角的水平坐标，即 x 坐标。
 * behavior：字符串，表示滚动的方式，有三个可能值（smooth、instant、auto），默认值为auto。
 */
```

+ window.scroll() 方法是 window.scrollTo() 方法的别名。
+ window.scrollBy() 方法用于将网页滚动指定距离（单位像素）。
  + 它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
```js
window.scrollBy(0, window.innerHeight);
//将网页向下滚动一屏。

//滚动某个元素，可以使用下面三个属性和方法。
/**
 * Element.scrollTop
 * Element.scrollLeft
 * Element.scrollIntoView()
 */
```

### print()

+ window.print 方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
+ 非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。
```js
if (typeof window.print === 'function') {
  // 支持打印功能
}
```

### focus()，blur()

+ window.focus() 方法会激活窗口，使其获得焦点，出现在其他窗口的前面。
+ 当前窗口获得焦点时，会触发 focus 事件；当前窗口失去焦点时，会触发 blur 事件。

### getSelection()

+ window.getSelection 方法返回一个 Selection 对象，表示用户现在选中的文本。
+ 使用 Selection 对象的 toString 方法可以得到选中的文本。

### getComputedStyle()、matchMedia()

+ window.getComputedStyle() 方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象，
+ window.matchMedia() 方法用来检查 CSS 的 mediaQuery 语句
+ 详细描述在 CSS 操作

### requestAnimationFrame()

+ window.requestAnimationFrame() 方法跟 setTimeout 类似，都是推迟某个函数的执行。
+ 不同之处在于，setTimeout 必须指定推迟的时间，
+ window.requestAnimationFrame() 则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。
+ 重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时， requestAnimationFrame() 会暂停执行。
+ 如果某个函数会改变网页的布局，一般就放在 window.requestAnimationFrame() 里面执行，这样可以节省系统资源，使得网页效果更加平滑。
+ 因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。

+ 该方法接受一个回调函数作为参数。
+ `window.requestAnimationFrame(callback)`
+ callback 是一个回调函数。callback 执行时，它的参数就是系统传入的一个高精度时间戳（performance.now()的返回值），单位是毫秒，表示距离网页加载的时间。

+ window.requestAnimationFrame() 的返回值是一个整数，
+ 这个整数可以传入 window.cancelAnimationFrame()，用来取消回调函数的执行。
+ 执行网页动画的例子
```js
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
//上面代码定义了一个网页动画，持续时间是2秒，会让元素向右移动。
```

### requestIdleCallback()

+ window.requestIdleCallback() 跟 setTimeout 类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。
+ 也就是说，如果某个任务不是很关键，就可以使用 window.requestIdleCallback() 将其推迟执行，以保证网页性能。

+ 该方法接受一个回调函数和一个配置对象作为参数。
+ 配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空虚，都会执行。
+ `window.requestIdleCallback(callback , options)`
+ callback 参数是一个回调函数。该回调函数执行时，系统会传入一个 IdleDeadline 对象作为参数。
+ IdleDeadline 对象有一个 didTimeout 属性（布尔值，表示是否为超时调用）和一个 timeRemaining() 方法（返回该空闲时段剩余的毫秒数）。
+ options 参数是一个配置对象，目前只有 timeout 一个属性，用来指定回调函数推迟执行的最大毫秒数。 该参数可选。
+ window.requestIdleCallback() 方法返回一个整数。该整数可以传入 window.cancelIdleCallback() 取消回调函数。
```js
//指定timeout
requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
//空闲任务例子
requestIdleCallback(myNonEssentialWork);

function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0) {
    doWorkIfNeeded();
  }
}
```
+ 如果多次执行 window.requestIdleCallback()，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。

## 事件

+ window对象可以接收以下事件。

### load 事件和 onload 属性

+ load 事件发生在文档在浏览器窗口加载完毕时。
+ window.onload 属性可以指定这个事件的回调函数。

### error 事件和 onerror 属性

+ 浏览器脚本发生错误时，会触发 window 对象的 error 事件。
+ 我们可以通过 window.onerror 属性对该事件指定回调函数。
```js
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```
+ 由于历史原因，window 的 error 事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。
  + 出错信息
  + 出错脚本的网址
  + 行号
  + 列号
  + 错误对象
+ 老式浏览器只支持前三个参数。
+ 并不是所有的错误，都会触发 JavaScript 的 error 事件
+ 一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。
```js
//例子，如果整个页面未捕获错误超过3个，就显示警告。
window.onerror = function(msg, url, line) {
  if (onerror.num++ > onerror.max) {
    alert('ERROR: ' + msg + '\n' + url + ':' + line);
    return true;
  }
}
onerror.max = 3;
onerror.num = 0;
```

### window 对象的事件监听属性

+ 除了具备元素节点都有的 GlobalEventHandlers 接口，window 对象还具有以下的事件监听函数属性。
  + window.onafterprint：afterprint 事件的监听函数。
  + window.onbeforeprint：beforeprint 事件的监听函数。
  + window.onbeforeunload：beforeunload 事件的监听函数。
  + window.onhashchange：hashchange 事件的监听函数。
  + window.onlanguagechange: languagechange 的监听函数。
  + window.onmessage：message 事件的监听函数。
  + window.onmessageerror：MessageError 事件的监听函数。
  + window.onoffline：offline事件的监听函数。
  + window.ononline：online事件的监听函数。
  + window.onpagehide：pagehide事件的监听函数。
  + window.onpageshow：pageshow事件的监听函数。
  + window.onpopstate：popstate事件的监听函数。
  + window.onstorage：storage事件的监听函数。
  + window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
  + window.onunload：unload事件的监听函数。

## 多窗口操作

+ 由于网页可以使用 iframe 元素，嵌入其他网页，因此一个网页之中会形成多个窗口。
+ 如果子窗口之中又嵌入别的网页，就会形成多级窗口。

### 窗口的引用

+ 各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。
  + top：顶层窗口，即最上层的那个窗口
  + parent：父窗口
  + self：当前窗口，即自身

```js
//当前窗口是否为顶层窗口。
if (window.top === window.self) {
  // 当前窗口是顶层窗口
} else {
  // 当前窗口是子窗口
}

//让父窗口的访问历史后退一次。
window.parent.history.back();
```

+ 浏览器还提供一些特殊的窗口名，供 window.open() 方法、<a> 标签、<form> 标签等引用。
  + _top：顶层窗口
  + _parent：父窗口
  + _blank：新窗口
+ `<a href="some-page.html" target="_top">Link</a>`

### iframe 元素

+ 对于 iframe 嵌入的窗口，document.getElementById 方法可以拿到该窗口的 DOM 节点，
+ 然后使用 contentWindow 属性获得 iframe 节点包含的 window 对象。
```js
var frame = document.getElementById('theFrame');
var frameWindow = frame.contentWindow;
//frame.contentWindow 可以拿到子窗口的window对象。
//然后，在满足同源限制的情况下，可以读取子窗口内部的属性。

// 获取子窗口的标题
frameWindow.title

//<iframe> 元素的 contentDocument 属性，可以拿到子窗口的 document 对象。
var frame = document.getElementById('theFrame');
var frameDoc = frame.contentDocument;
// 等同于
var frameDoc = frame.contentWindow.document;
```

+ <iframe> 元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用 window.postMessage 方法。
+ <iframe> 窗口内部，使用 window.parent 引用父窗口。
+ 如果当前页面没有父窗口，则 window.parent 属性返回自身。
+ 因此，可以通过 window.parent 是否等于 window.self，判断当前窗口是否为 iframe 窗口。

+ <iframe> 窗口的 window 对象，有一个 frameElement 属性，返回 <iframe> 在父窗口中的 DOM 节点。对于非嵌入的窗口，该属性等于 null。

### window.frames 属性

+ window.frames 属性返回一个类似数组的对象，成员是所有子窗口的 window 对象。
+ 如果要获取每个框架内部的 DOM 树，需要使用 window.frames[0].document 的写法。
+ 如果 <iframe> 元素设置了 name 或 id 属性，那么属性值会自动成为全局变量，并且可以通过 window.frames 属性引用，返回子窗口的 window 对象。
```js
// HTML 代码为 <iframe id="myFrame">
window.myFrame // [HTMLIFrameElement]
frames.myframe === myFrame // true
```

# API

+ https://mp.weixin.qq.com/s/Z8svAPdFxlSNugbOCrMEQw

## IntersectionObserver

+ 交叉观察器
+ 触发为异步
+ 可以观察元素是否存在与视口的可见范围
```js
var io = new IntersectionObserver(callback[, option]);
```
+ callback是可见性变化时的回调函数，option是配置对象（该参数可选）。
```js
// 开始观察, 观察多个对象可以多次调用
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```
+ callback一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。
+ callback函数的参数（entries）是一个数组，每个成员都是一个IntersectionObserverEntry 对象。被观察的成员有多少,数组就有多少个对象.

+ IntersectionObserverEntry 对象提供目标元素的信息，一共有六个属性。
```js
{
  time: 3893.92, // time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
    // rootBounds：根元素的矩形区域的信息，getBoundingClientRect() 方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
  },
  boundingClientRect: ClientRect {
     // ... 目标元素的矩形区域的信息
  },
  intersectionRect: ClientRect {
    // ... 目标元素与视口（或根元素）的交叉区域的信息
  },
  intersectionRatio: 0.54,
  // 目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为1，完全不可见时小于等于0
  target: element // target：被观察的目标元素，是一个 DOM 节点对象
}
```

+ options
  + threshold属性决定了什么时候触发回调函数。
    + 每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。
  + root 属性，rootMargin 属性
    + root 设置相对的根节点
    + rootMargin 计算可见区域的大小范围
```js
new IntersectionObserver(
  entries => {/* ... */},
  {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  }
);

var opts = {
  root: document.querySelector('.container'),
  rootMargin: "500px 0px" //  top、right、bottom 和 left
};

var observer = new IntersectionObserver(
  callback,
  opts
);
```

## MutationObserver

+ 一个可以监听 DOM 结构变化的接口。当 DOM 对象树发生任何变动时，MutationObserver 会得到通知。


# Navigator 对象，Screen 对象。

## 属性

1. Navigator.userAgent
   + navigator.userAgent 属性返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。
   + 通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。
   + 而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。
   + 通过 userAgent 可以大致准确地识别手机浏览器，方法就是测试是否包含 mobi 字符串。
```js
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
//如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。
/mobi|android|touch|mini/i.test(ua)
```

2. Navigator.plugins
   - Navigator.plugins 属性返回一个类似数组的对象，成员是 Plugin 实例对象
   - 表示浏览器安装的插件，比如 Flash、ActiveX 等。
```js
var pluginsLength = navigator.plugins.length;

for (var i = 0; i < pluginsLength; i++) {
  console.log(navigator.plugins[i].name);
  console.log(navigator.plugins[i].filename);
  console.log(navigator.plugins[i].description);
  console.log(navigator.plugins[i].version);
}
```

3. Navigator.platform
   + Navigator.platform 属性返回用户的操作系统信息，比如 MacIntel、Win32、Linux x86_64等 。

4. Navigator.onLine
   + navigator.onLine 属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
```js
navigator.onLine // true
//用户变成在线会触发 online 事件，变成离线会触发 offline 事件
```

5. Navigator.language，Navigator.languages
   + Navigator.language 属性返回一个字符串，表示浏览器的首选语言。该属性只读。
   + Navigator.languages 属性返回一个数组，表示用户可以接受的语言。
   + 如果这个属性发生变化，就会在 window 对象上触发 languagechange 事件。
```js
navigator.language // "en"
navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]
```

6. Navigator.geolocation
   + Navigator.geolocation 属性返回一个 Geolocation 对象，包含用户地理位置的信息。
   + 注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。
   + Geolocation 对象提供下面三个方法。
     + Geolocation.getCurrentPosition()：得到用户的当前位置
     + Geolocation.watchPosition()：监听用户位置变化
     + Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数
   + 注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。

7. Navigator.cookieEnabled
   + Navigator.cookieEnabled 属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
   + `navigator.cookieEnabled // true`
   + 注意，这个属性反映的是浏览器总的特性，与是否储存某个具体的网站的 Cookie 无关。
   + 用户可以设置某个网站不得储存 Cookie，这时cookieEnabled返回的还是true。

## 方法

1. Navigator.javaEnabled()
   + Navigator.javaEnabled() 方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。

2. Navigator.sendBeacon()
   + Navigator.sendBeacon() 方法用于向服务器异步发送数据，详见《XMLHttpRequest 对象》一章。

## Screen 对象

+ Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。window.screen 属性指向这个对象。
+ 该对象有下面的属性。
  + Screen.height：浏览器窗口所在的屏幕的高度(单位像素)。
  + 除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。
  + 显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

  + Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）。

  + Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）。
  + 因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区
  + 这个属性等于height减去那些被系统组件的高度。

  + Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）。

  + Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。

  + Screen.colorDepth：Screen.pixelDepth的别名。
  + 严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度
  + 绝大多数情况下，它们都是同一件事。

  + Screen.orientation：返回一个对象，表示屏幕的方向。
  + 该对象的 type 属性是一个字符串，表示屏幕的具体方向
  + landscape-primary 表示横放，landscape-secondary 表示颠倒的横放
  + portrait-primary 表示竖放，portrait-secondary 表示颠倒的竖放。

# Cookie

+ https://wangdoc.com/javascript/bom/cookie.html

+ Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。
+ 浏览器每次向服务器发出请求，就会自动附上这段信息。
+ Cookie 主要保存状态信息，以下是一些主要用途。
  + 对话（session）管理：保存登录、购物车等需要记录的信息。
  + 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
  + 追踪用户：记录和分析用户行为。

+ Cookie 不是一种理想的客户端储存机制。它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。
+ 客户端储存应该使用 Web storage API 和 IndexedDB。
+ 只有那些每次请求都需要让服务器知道的信息，才应该放在 Cookie 里面。
+ 每个 Cookie 都有以下几方面的元数据。
  + Cookie 的名字
  + Cookie 的值（真正的数据写在这里面）
  + 到期时间（超过这个时间会失效）
  + 所属域名（默认为当前域名）
  + 生效的路径（默认为当前网址）

+ 举例来说，用户访问网址 `www.example.com`，服务器在浏览器写入一个 Cookie。这个 Cookie 的所属域名为 `www.example.com`，生效路径为根路径 `/` 。
+ 如果 Cookie 的生效路径设为 `/forums`，那么这个 Cookie 只有在访问 `www.example.com/forums` 及其子路径时才有效。
+ 以后，浏览器访问某个路径之前，就会找出对该域名和路径有效，并且还没有到期的 Cookie，一起发送给服务器。
+ 用户可以设置浏览器不接受 Cookie，也可以设置不向服务器发送 Cookie。window.navigator.cookieEnabled 属性返回一个布尔值，表示浏览器是否打开 Cookie 功能。
+ `window.navigator.cookieEnabled // true`
+ document.cookie 属性返回当前网页的 Cookie。
+ `document.cookie // "id=foo;key=bar"`

+ 不同浏览器对 Cookie 数量和大小的限制，是不一样的。一般来说，单个域名设置的 Cookie 不应超过 30个，每个 Cookie 的大小不能超过4KB。超过限制以后，Cookie 将被忽略，不会被设置。
+ 浏览器的同源政策规定，两个网址只要域名相同，就可以共享 Cookie（参见《同源政策》一章）。注意，这里不要求协议相同。也就是说，http://example.com 设置的 Cookie，可以被 https://example.com 读取。

## Cookie

+ HTTP Cookie 通常直接叫 Cookie

+ 该标准要求服务器对任意HTTP请求发送 Set-Cookie HTTP 头作为响应的一部分,其中包含会话信息

+ ```js
  HTTP/1.1 200 OK
  Content-type:text/html
  Set-Cookie:name=vlaue
  Other-header:other-header-value
  //浏览器会存储这样的会话信息,并在这之后,通过为每个请求添加 Cookie HTTP头将信息发送回服务器
  GET /index.html HTTP/1.1
  Cookie:name=value
  Other-header:other-header-value
  ```

+ 限制

  + cookie在性质上是绑定在特定的域名下的
  + cookie有条数限制,为确保不占用太多磁盘空间
  + 超过限制后浏览器回清除以前设置的cookie
  + 单个cookie的长度限制为4096b

+ cookie的构成

  + 名称 : 一个唯一确定cookie的名称 不区分大小写,cookie的名称必须2是经过URL编码的
  + 值 : 储存在cookie中的字符串,值必须被URL编码
  + 域 : cookie对于那个域是有效的
  + 路径 : 可以指定cookie域中的路径
  + 失效时间 : 表示cookie何时应该被删除的时间戳,默认情况,在浏览器会话结束就回删除所有cookie,可以设定删除时间让cookie保存在用户机器上
  + 安全标志 : 指定后,cookie只有在使用SSL连接的时候才发送到服务器

+ JavaScript中的cookie

  + `document.cookie`属性

  + 这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。当用来获取属性值时,document. cookie返回当前页面可用的( 根据cookie的域、路径、失效时间和安全设置)所有cookie的字符串,一系列由分号隔开的键值对

  + `name1=value1 ; name2=value2 ; name3=value3`

  + 所有名字和值都是经过URL编码的，所以必须使用decodeURIComponent ()来解码。

  + 当用于设置值的时候，document . cookie属性可以设置为一个新的cookie字符串。这个cookie字符串会被解释并添加到现有的cookie集合中。设置document . cookie并不会覆盖cookie,除非设置的cookie的名称已经存在。设置cookie的格式如下，和Set-Cookie头中使用的格式一样。

  + `name=:value; expires=expiration_time; path=domain_path; domain=domain_name; secure`

  + 参数中只有cookie的名字是必须的

  + 设置cookie时需要用`encodeURIComponent()` 方法进行编码

  + 操作简化函数

  + ```js
    let CookieUtil = {
      get: function (name) {
        let cookieName = encodeURIComponent(name) + "=",
          cookieStart = document.cookie.indexOf(cookieName),
          cookieValue = null;
        
        if (cookieStart > -1) {
          let cookieEnd = document.cookie.indexOf(";", cookieStart);
          if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
          }
          cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
      },
    //参数: cookie的名称和值,指定的删除时间,可选的路径,可选的域,是否添加secuer标准的布尔值
      set: function (name, value, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
          cookieText += "; expires=" + expires.toUTCString();
        }
        if (path) {
          cookieText += "; path=" + path;
        }
        if (domain) {
          cookieText += "; domain=" + domain;
        }
        if (secure) {
          cookieText += "; secure=" + secure;
        }
        document.cookie = cookieText;
      },
    //参数: 要删除cookie的名称,可选的路径参数,可选的域参数,可选的安全参数
      unset: function (name, path, domain, secure) {
        //没有直接删除cookie的方法,所以要通过重新设置的方式
        this.set(name, "", new Date(0), path, domain, secure);
      }
    };
    //使用
    CookieUtil.set("name", "Nicholas");
    CookieUtil.set("book", "Professional javaScript");
    //读取值
    CookieUtil.get("name");
    CookieUtil.get("book");
    //删除cookie
    CookieUtil.unset("name");
    CookieUtil.unset("book");
    //设置cookie,包括它的路径,域,失效日期
    CookieUtil.set("name", "Nicholas", new Date(2020 - 8 - 8), "/books/projs/", "www.wrox.com")
    //删除刚设置的cookie
    CookieUtil.unset("name", "/books/projs/", "www.wrox.com");
    //设置安全的cookie
    CookieUtil.set("name", "Nicholas", null, null, null, true);
    ```

+ 子cookie

  + 为了绕开单域名下的cookie数限制,而产生的子cookie概念
  + 使用cookie值来存储多个键值对
  + `name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5`
  + 子cookie一般也以查询字符串的格式进行格式化,然后这些值可以使用单个cookie进行储存和访问
  + 子cookie解析函数

```js
  let SubCookieUtil = {
    get: function (name, subName) {
      let subCookie = this.getAll(name);
      if (subCookie) {
        return subCookie[subName];
      } else {
        return null;
      }
    },
    getAll: function (name) {
      let cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null,
        cookieEnd,
        subCookies,
        i,
        len,
        parts,
        result = {};
      if (cookieStart) {
        cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
        if (cookieValue.length > 0) {
          subCookies = cookieValue.split("&");
          for (i = 0, len = subCookies.length; i < len; i++) {
            parts = subCookies[i].split("=");
            result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
          }
          return result;
        }
      }
      return null;
    },
    //参数: cookie名称,子cookie名称,子cookie值,可选的cookie失效时间,可选的路径,可选的域,是否添加secuer标准的布尔值
    set: function (name, subName, value, expires, path, domain, secure) {
      let subCookies = this.getAll(name) || {};
      subCookies[subName] = value;
      this.setAll(name, subCookies, expires, path, domain, secure);
    },
    //参数: cookie名称,包含所有子cookie的对象以及和set中一样的4个可选参数
    setAll: function (name, subCookies, expires, path, domain, secure) {
      let cookieText = encodeURIComponent(name) + "=",
        subCookieParts = new Array(),
        subName;
      for (subName in subCookies) {
        if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
          subCookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
        }
      }
      if (subCookieParts.length > 0) {
        cookieText += subCookieParts.join("&");
        if (expires instanceof Date) {
          cookieText += "; expires=" + expires.toUTCString();
        }
        if (path) {
          cookieText += "; path=" + path;
        }
        if (domain) {
          cookieText += "; domain=" + domain;
        }
        if (secure) {
          cookieText += "; secure=" + secure;
        }
      } else {
        cookieText += ";expires=" + (new Date(0)).toUTCString();
      }
      document.cookie = cookieText;
    },
    unset: function (name, subName, path, domain, secure) {
      let subCookies = this.getAll(name);
      if (subCookies) {
        delete subCookies[subName];
        this.setAll(name, subCookies, null, path, domain, secure);
      }
    },
    unsetAll: function (name, path, domain, secure) {
      this.setAll(name, null, new Date(0), path, domain, secure);
    }
  };
```

+ 因为所有的cookie都会由浏览器作为请求头发送,所以cookie信息越大,完成对服务器的请求时间也越长

# XMLHttpRequest 对象

+ https://wangdoc.com/javascript/bom/xmlhttprequest.html

# 同源限制

+ https://wangdoc.com/javascript/bom/same-origin.html

# CORS 通信

+ https://wangdoc.com/javascript/bom/cors.html

# Storage 接口

+ https://wangdoc.com/javascript/bom/storage.html

# Web储存机制

  + localStorage
  + sessionStorage
  + globalStorage

+ Storage类型
  + 该类型提供最大的储存空间(因浏览器而异)来储存键值对
  + `clear()` : 删除所有值
  + `getItem(name)` : 根据指定的名字name获取对应的值
  + `key(index)` : 获取index位置的值
  + `removeItem(name)` : 删除由name指定的键值对
  + `setItem(name, value)` : 为指定的name设置一个对应的值
  + getItem()、removeItem()、和setItem()方法可以直接调用，也可以通过Storage对象调用，每个项目都是作为属性存储在该对象上，所以可以通过点语法和方括号语法访问属性来取值，设置也一样，通过delete也能执行删除操作
  + 通过length属性可以判断有多少键值对存放在该对象上，但无法判断大小

+ sessionStorage
  + 储存会话数据,在浏览器关闭后消失,可以跨页面刷新而存在,如果浏览器支持,也可以在浏览器崩溃重启之后依然可用
  + 绑定于某个服务器会话,所以本地运行时不可用,数据只能由最初给对象存储数据的页面访问
  + sessionStorage对象是Storage的一个实例,可用用Storage的方法来储存数据
  + delete无法在WebKit中删除数据

+ globalStorage
  + 数据长期保留，除非删除或浏览器清除缓存
  + 跨越会话存储数据,但需要指定那些域可用访问
  + `globalStorage["wrox.com"].name = "Nichplas";`
  + `let name = globalStorage["wrox.com"].name;`
  + globalStorage对象不是Storage的实例而具体的globalStorage["wrox.com"]
  + 这个空间对于wrox.com及其所有子域都是可用访问的
  + 可用这样指定子域名
  + globalStorage["www.wrox.com"].name = "Nicholas";
  + 任何人都可用访问——最好不要这样
  + globalStorage[""].name = "name";
  + 让任何可用.net结尾的域名访问——最好不要这样
  + globalStorage[".net"].name = "name";
  + 不同协议不同端口的域名就算一样也无法相互访问

+ localStorage
  + 数据长期保留，除非删除或浏览器清除缓存
  + 访问数据页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上
  + localStorage对象是Storage的实例，使用方法一样

+ Storage事件
  + 对Storage对象进行任何修改，都会触发Storage事件
  + 事件对象event由以下属性
    + domain ：发生变化的储存空间的域名
    + key ：设置或删除的键名
    + newValue ：如果是设置值，则是新值，如果是删除键，则是null
    + oldValue ：键被修改之前的值
  + 限制不同版本不同平台数据储存大小都不同

### IndexedDB

+ 浏览器中保存结构化数据的一种数据库API
+ 设计的操作方式为异步进行，因此大多数操作会议请求的方式进行
+ 每次操作都需要注册onerror 或 onsuccess事件处理程序，以确保适当地处理结果
+ `let indexedDB = window.indexedDB;`  获取API宿主对象，兼容可能需要添加前缀

1. 数据库
   + 使用对象来保存数据，而不是使用表格，以个IndexedDB数据库，就是一组位于相同命名空间下的对象集合
   + 使用第一步，用`indexedDB.open()` 打开需要指定的数据库，指定数据库如果不存在，就回发送一个创建并打开的请求
   + 打开后回返回一个 IDBRequest对象，在这个对象上可用添加onerror和onsuccess事件处理程序

```js
  let request, database;
  request = indexedDB.open("admin");
  request.onerror = function(event){
    console.log("Error");
  };
  request.onsuccess = function(event){
    database = event.target.result;
  };
```

  + 这两个事件处理程序中，event.target都指向request对象，请求成功event.target.result中将由一个数据库实例对象
  + 请求失败event.target.errorCode中将有错误码，表示问题的性质
  + ![错误码](./images/IndexedDB错误码.png)
  + 使用setVersion()方法可用为数据库指定版本号，同样会发生请求，需要处理

# History 对象

+ https://wangdoc.com/javascript/bom/history.html

+ History 对象保存了当前窗口访问过的所有页面网址
  + `.length` : 当前窗口访问过的网址数量
  + `.state` : History 堆栈最上层的状态值

+ 方法
  + back() : 返回上一个页面
  + forward() : 移动到下一个网页
  + go(number) : 1 = forward , -1 = back
  + pushState(state, title, url) : 在历史中添加一条记录
    + state : 一个与添加的记录相关联的状态对象
    + title : 页面标题, 可以填空字符串
    + 跨域网址会报错
    + 地址栏会改变, 但是不会触发刷新
  + replaceState() : 用来修改 History 对象的当前记录
    + 用法同 pushState

+ history 对象发生改变就会触发 popstate 事件


# Location 对象

+ Location 对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过 window.location 和 document.location 属性，可以拿到这个对象。

## 属性

+ Location对象提供以下属性。
  + Location.href：整个 URL。
  + Location.protocol：当前 URL 的协议，包括冒号（:）。
  + Location.host：主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。
  + Location.hostname：主机名，不包括端口。
  + Location.port：端口号。
  + Location.pathname：URL 的路径部分，从根路径/开始。
  + Location.search：查询字符串部分，从问号?开始。
  + Location.hash：片段字符串部分，从#开始。
  + Location.username：域名前面的用户名。
  + Location.password：域名前面的密码。
  + Location.origin：URL 的协议、主机名和端口。
+ 这些属性里面，只有 origin 属性是只读的，其他属性都可写。
+ 如果对 Location.href 写入新的 URL 地址，浏览器会立刻跳转到这个新地址。
+ 这个特性常常用于让网页自动滚动到新的锚点。
  + ```js
      document.location.href = '#top';
      // 等同于
      document.location.hash = '#top';

      //直接改写location，相当于写入href属性。\
      document.location = 'http://www.example.com';
      // 等同于
      document.location.href = 'http://www.example.com';
      // Location.href 属性是浏览器唯一允许跨域写入的属性
    ```
+ 例子
```js
// 当前网址为
// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.hostname
// "www.example.com"
document.location.port
// "4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
document.location.username
// "user"
document.location.password
// "passwd"
document.location.origin
// "http://user:passwd@www.example.com:4097"
```

## 方法

1. Location.assign()
   + assign 方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。
   + 如果参数不是有效的 URL 字符串，则会报错。
```js
// 跳转到新的网址
document.location.assign('http://www.example.com')
```

2. Location.replace()
   + replace 方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。
   + 如果参数不是有效的 URL 字符串，则会报错。
   + 它与 assign 方法的差异在于，replace 会在浏览器的浏览历史 History 里面删除当前网址
   + 也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面
   + 使用新的 URL 替换了老的 URL。
   + 它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。

3. Location.reload()
   + reload 方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。
   + 它接受一个布尔值作为参数。如果参数为 true，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop === 0）。
   + 如果参数是 false 或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。

4. Location.toString()
   + toString 方法返回整个 URL 字符串，相当于读取 Location.href 属性。

# URL 对象

## URL 的编码和解码

+ https://wangdoc.com/javascript/bom/location.html#url-%E7%9A%84%E7%BC%96%E7%A0%81%E5%92%8C%E8%A7%A3%E7%A0%81

## URL接口

+ https://wangdoc.com/javascript/bom/location.html#url-%E6%8E%A5%E5%8F%A3

# URLSearchParams 对象

+ https://wangdoc.com/javascript/bom/location.html#urlsearchparams-%E5%AF%B9%E8%B1%A1

# ArrayBuffer 对象 , Blob 对象

+ https://wangdoc.com/javascript/bom/arraybuffer.html

# File 对象，FileList 对象，FileReader 对象

+ https://wangdoc.com/javascript/bom/file.html

# 表单，FormData 对象

+ https://wangdoc.com/javascript/bom/form.html

# IndexedDB API

+ https://wangdoc.com/javascript/bom/indexeddb.html

# Web Worker

+ https://wangdoc.com/javascript/bom/webworker.html