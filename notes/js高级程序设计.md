# 面向对象的程序设计

## 继承

### 组合继承

+ 也叫做伪经典继承
+ 指的是将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式。
+ 使用原型链实现对原型属性和方法的继承，而又借用构造函数来实现对实例属性的继承
+ 这样，即通过在原型上定义方法实现了函数复用，有能够保证每个实例都有它自己的属性
+ ```js
    function SuperType(name){
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }
    
    SuperType.prototype.sayName = function() {
      alert(this.name);
    };
    function SubType(name, age) {
      SuperType.call(this,name);            //第二次调用SuperType()
      this.age = age;  
    }
    SubType.prototype = new SuperType();    //第一次调用SuperType()
    SubType.prototype.sayAge = function() {
      alert(this.age);
    }
    
    let instance1 = new SubType("Nicholas", 29);
    instance1.colors.push("black");
    alert(instance1.colors);      //"red,blue,green,black"
    instance1.sayName();      //"Nicholas"
    instance1.sayAge();       //29
    
    let instance2 = new SubType("Greg", 27);
    alert(instance2.colors);       //"red,blue,green"
    instance2.sayName();      //"Greg"
    instance2.sayAge();       //27
    ```
+ 组合继承最大的问题就是无论什么情况下,都会调用两次超类型构造函数:
  + 一次是在创建子类型原型的时候,一次是在子类型构造函数内部
  + 子类型最终会包含超类型的全部实例属性,但我们不得不在调用子类型构造函数时重写这些属性
  + 两次的调用使SubType有了两组一样的属性,一组的实例上,一组在SubType原型中
    

### 原型式继承

+ ```js
    function object(o) {
      function F(){}
      F.prototype = o;
      return new F();
    }
      /* 在函数内部创建一个临时的构造函数，然后将传入的对象作为这个构造函数的原型，
       * 最后返回这个临时类型的一个新实例，从本质上讲object()对传入其中的对象执行了一次浅复制
       */
    
    let person = {
      name:"Nicholas",
      friends:["Shelby", "Court", "Van"]
    };
    
    let anotherPerson = object(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");
    
    let yetAnotherPerson = object(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");
    
    alert(person.friends);    //"Shelby,Court,Van,Rob,Barbie"
    
    /* 这种原型继承模式，要求必须有一个对象可以作为另一个对象的基础
     * ES5 新增的Object.create()方法规范了原型式继承，接受两个参数，
     * 一个作为新对象的原型，一个为新对象定义额外属性的对象
     * 在传入一个参数情况下，Object.create()与Object()方法的行为相同
     */
    ```

### 寄生式继承

+ 寄生式继承是与原型式继承紧密相关的一种思路,寄生式继承思路与寄生构造函数和工厂模式类似,
+ 即创建一个仅用于封装继承过程的函数
+ ```js
    function createAnother(original){
      let clone = object(original);   //通过调用函数创建一个新对象
      clone.sayHi = function(){       //以某种方式来增强这个对象
        alert("hi");
      };
      return clone;                   //返回这个对象
    }
    //在这个例子中,createAnother()函数接收了一个参数,也就是将要作为新对象基础的对象.
    let person = {
      name : "Niceholas",
      friends : ["shelby", "Court", "Van"]
    };
    let anotherPerson = createAnother(person);
    anotherPerson.sayHi();  //"hi"
    ```
+ 不能做到函数复用而降低效率

### 寄生组合式继承

+ 寄生式继承解决了组合式继承的缺点
  + 寄生组合继承,即通过借用构造函数来继承属性,通过原型链的混成形式来继承方法.
  + 不必伪类指定子类型的原型而调用超类型的构造函数
+ ```js
    function inheritPrototype(subType, superType){
      let prototype = Object(superType.prototype);     //创建对象
      prototype.constructor = subType;                //增强对象
      subType.prototype = prototype;          //指定对象
    }
    //inheritPrototype() 函数实现了寄生组合式继承的最简单形式,这个函数接收两个参数
    //子类型构造函数和超类型构造函数,

    function SuperType(name){
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }
    
    SuperType.prototype.sayName = function() {
      alert(this.name);
    };
    function SubType(name, age) {
      SuperType.call(this,name);
      this.age = age;  
    }
    inheritPrototype(SubType, SuperType);
    SubType.prototype.say.Age = function(){
      alert(this.age);
    }
    //这个例子的高效率体现在它只调用了一次 SuperType 构造函数,
    //因此避免了在 SubType.prototype上面创建不必要的、多余的属性。同时还能让原型链保持不变
    //还能够正常使用instanceof 和 isPrototypeOf()
    ```
+ ![寄生组合继承](./images/寄生组合继承.png)

### 小结
+ ![继承](./images/继承.png)

# 函数表达式

+ `let func = function(){}`
+ 通过赋值创建的函数也叫匿名函数，因为function关键字后面没有标识符
+ 匿名函数有时也叫拉姆达函数，匿名函数的name属性是空字符串
+ 把函数当作返回值时，可以使用匿名函数

## 递归

+ 递归是在一个函数通过名字调用自身的情况下构成的
+ ```js
    function factorial(num){
      if(num <= 1){
        return 1;
      }else{
        return num * arguments.callee(num - 1); //通过内部指向自身的指针调用自己，避免函数名改变后报错
      }
    }
    //在严格模式下，不能通过脚本访问 arguments.callee  可以通过匿名函数的方式达成同样的效果
    let factorial = (function f(num){
      if(num <= 1){
        return 1;
      }else{
        return num * f(num - 1);
      }
    });
    //这种方式把函数f()赋值给了factorial但是函数名仍然有效，所以递归能正确完成
    ```

## 闭包

+ 闭包是指由权访问另一个函数作用域中的变量的函数
+ 在一个作用域访问另一个函数作用域中的变量
+ 创建闭包的常见方式，就是在一个函数内部创建另一个函数
+ ![闭包](./images/闭包.png)

### 闭包与变量

+ 闭包只能取得包含函数中任何变量的最后一个值，闭包所保存的是整个变量对象，而不是某个特殊的变量
+ ![闭包与变量](./images/闭包与变量.png)
+ ![闭包与变量2](./images/闭包与变量2.png)

### 关于this对象

+ this对象通常是在运行时基于函数的执行环境绑定的
+ ![闭包this对象](./images/闭包this对象.png)

### 内存泄漏

+ ![闭包内存泄漏](./images/闭包内存泄漏.png)

## 模仿块级作用域

+ `(function(){ //块级作用域 })();` 双括号的这种语法表示函数创建后立即调用该函数，后面的括号传入参数
+ 用括号将函数包裹是为了将函数声明转换为函数表达式，函数表达式function后面可以跟括号
+ 而函数声明function后直接跟括号会导致语法错误
+ ```js
    function outputNumbers(count){
      (function(){
        for(var i = 0; i < count; i++){
          alert(i);
        }
      })();
      alert(i);   //报错
    }
    //通过这种方式模仿块级作用域
    //ES6因为有let 变量声明方式所以不用
    ```

## 私有变量

+ 严格来说js中没有私有成员的概念，所有对象属性都是公有的。
+ 但是有私有变量的概念，在任何函数中定义的变量，都可以认为是私有变量，不能在函数外部访问这些变量
+ 私有变量包含函数的参数、局部变量、和在函数内部定义的其他函数
+ 利用闭包可以，可以通过闭包的作用域链访问到私有变量，
+ 把有权访问私有变量和私有函数的公有方法称为特权方法(privileged method)，有两种在对象上创建特权方法的方式，
+ 第一种是在构造函数中定义特权方法
  + ```js
      function MyObject(){
        //私有变量加私有函数
        let privateVariable = 10;

        function PrivateFunction(){
          return false;
        }

        //特权方法
        this.publicMethod = function(){
          privateVariable++;
          return PrivateFunction();
        };
      }
      ```
+ ![私有变量](./images/私有变量.png)

### 静态私有变量

+ ![静态私有变量](./images/静态私有变量.png)
+ 多查找作用域链中的一个层次,就会在一定程度上影响查找速度.而这正是使用闭包和私有变量的一个明显的不足之处

### 模块模式

+ ![模块模式](./images/模块模式.png)

### 增强的模块模式

+ ![增强模块模式](./images/增强模块模式.png)

## 小结

+ ![函数表达式小结](./images/函数表达式小结.png)

# BOM

## Window对象

+ window对象表示浏览器的一个实例,在浏览器中window既是通过js访问浏览器窗口的一个接口,又是ECMAScript规定的Global对象,这意味着网页中定义任何一个对象,变量和函数,都以window作为其global对象,因此有权访问parseInt()等方法

+ 全局作用域

  + 在全局作用域中声明的变量,函数都会成为window对象的属性和方法
  + 全局变量不能通过delete删除,而直接在window对象上定义的属性可以

+ 窗口关系及框架

  + 如果页面中包含框架,则每个框架都有自己的window对象,并且保存在frames集合中,
  + 通过索引或框架名称访问相应的window对象,每个window对象都有一个name属性,其中包含框架的名称

+ 窗口位置

  + `window.moveTo(x,y);`

+ 窗口大小

  + ```js
    innerWidth		视口大小
    innerHeight
    outerWidth		窗口本身大小
    outerHeight
    document.documentElement.clientWidth		可见区域大小
    
    调整浏览器窗口大小
    window.resizeTo(100,100);
    ```

+ 导航和打开窗口

  + `window.open()` 

+ 间歇调用和超时调用

  + `setTimeout()` 超时调用
    + `clearTimeout()` 取消超时调用
  + `setInterval()` 间歇调用
    + `clearInterval()` 取消间歇调用

+ 系统对话框

  + `alert()、confirm()、prompt()`
    + `alert()` 提示包含一个展示字符串，和确认按钮
    + `confirm()` 包含字符串提示，确认和取消按钮，返回true和false
    + `prompt()` 提示框，确认和取消按钮，输入框，返回输入内容或null

## location 对象

+ 不仅是window对象的属性还是document对象的属性

  + ![location属性](./images/location属性.png)

+ 查询字符串参数

+ ```js
  function getQueryStringArgs(){
      //取得查询字符串并去掉开头的问号
      let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
          //保存数据对象
          args = {},
          //取得每一项
          items = qs.length ? qs.split("&") : [],
          item = null,
          name = null,
          value = null,
          //在for循环中使用
          i = 0,
          len = items.length;
      //逐个将每一项添加到args对象中
      for(i = 0 ; i < len ; i++){
          item = item[i].split("=");
          name = decodeURIComponent(item[0]);
          value = decodeURIComponent(item[1]);
          if(name.length){
              args[name] = value;
          }
      }
      return args;
  }
  
  //假设查询字符串是？q=javascript&num=10
  let args = getQueryStringArgs();
  alert(args["q"]); //"javascript"
  alert(args["num"]); // "10"
  ```

+ 位置操作

  + `location.assign("https://www.wrox.com");`

  + 打开一个新URL并在浏览器的历史记录中生成一条记录，

  + ```js
    //效果一样
    window.location = "https://www.wrox.com";
    location.href = "https://www.wrox.com";
    
    还有location的属性可以修改URL
    location.hash = "#section1";  //除修改此属性其他的都会以新的URL重新加载页面
    search
    hostname
    pathname
    port
    ```

  + ![URL](./images/locationURL属性.png)

  + `location.replace("url");` 以这种方法跳转的页面会禁用浏览器的后退

  + `reload()` 重新加载当前页面，如果不传递任何参数，页面就会以最有效的方式重新加载

  + 传递true从服务器从新加载

## navigator 对象

+ 识别客户端浏览器的名称版本等属性
+ 检测插件
  + ![检测浏览器插件](./images/检测浏览器插件.png)
+ 注册处理程序
  + `registerContentHandler()`
  + `registerProtocolHandler()`

## screen 对象

+ 用来表明客户端的能力

## history 对象

+ 保存着用户上网的历史记录

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

# DOM

## 节点层次

### node 类型

+ nodeType
+ nodeName
+ NodeValue

### Document 类型

+ nodeType 值为9
+ nodeName 值为"#document"
+ nodeValue 值为 null
+ parentNode 值为 null
+ ownerDocument 值为 null
+ 其子节点可能是一个DocumentType（最多一个）、Elements（最多一个）、ProcessingInstruction 或 Comment

+ 文档的子节点

  + 可以是 `DocumentType、Element、ProcessingIn-strutior、Ccomment`

  + 内置访问其子节点的快捷方式

    + `doccument.documentElement`属性  指向 `<html>` 元素 `document.body` 属性指向 `<body>` 元素

    + `childNodes` 列表访问文档元素

    + ```js
      document.childNodes[0]  和 document.firstChild  同等与 document.documentElement
      ```

+ 文档信息

  + `document.title` 取得标题 可读写
  + `document.URL` 取得完整的URL
  + `document.domain` 取得域名 可设置，但是只能设置已包含的域名
  + `document.referrer` 取得来源页面的URL

+ 查找元素

  + `getElementByTsgName("*")` 会返回一个 `HTMLCollection` 动态集合对象
    + 该对象与`NodeList`相似
    + 该对象有一个叫做 `nameditem()` 方法， 这个方法可以通过元素的name属性(特性)取得集合中的项
    + 也可通过方括号语法来访问

+ 特殊集合

  + `document.anchors`  包含文档中所有带 name 特性的<a>元素
  + `doucment.forms` 包含文档中所有的<from> 元素
  + `document.images` 包含文档中所有的<img> 元素
  + `document.links` 包含文档中所有带`href`属性的<a>元素

+ DOM一致性检测

  + 检测DOM功能的名称及版本号   支持则返回true
  + `let hasXmldom = document.implementation.hasFeature("XML","1.0");`

+ 文档写入

  + `write()、writeln()、open()、close()`

### Element

+ nodeType  值为 1
+ nodeName 值为 元素标签名字
+ 访问元素标签名可以用`nodeName` 和 `tagName`

+ HTML 元素
+ lang   元素内容的语言代码
+ dir    语言的方向

### Text 类型

+ nodeType 值为 3
+ nodeName 值为 "#text"
+ nodeValue 值为包含的文本
+ ![Text文本节点](./images/Text文本节点.png)

### Comment 类型

+ 注释
+ nodeType 值为 8
+ nodeName 值为 "#comment"
+ nodeValue 值为 注释内容

### CDATASection 类型

+ 针对基于XML的文档，表示CDATA区域
+ nodeType 值为 4
+ nodeName 值为 "#cdata-section"
+ nodeValue 值为 CDATA区域的内容

### DocumentType 类型

+ nodeType 值为 10
+ nodeName 值为 doctype的名称
+ nodeValue 值为 null

### DocumentFargment 类型

+ nodeType 值为 11
+ nodeName 值为 "#document-fragment"
+ nodeValue 值为 null

### Attr 类型

+ nodeType 值为 11
+ nodeName 值为 属性的名称
+ nodeValue 值为 属性的值

## DOM操作技术

+ 动态加载脚本

+ ```js
  function loadScript(url){
      let script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
  }
  ```

+ 动态样式

+ ```js
  function loadStyle(url){
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
  }
  ```

+ NodeList

  + `NodeList 和 NameNodeMap 和 HTMLCollection` 这三个集合都是动态的，每当文档结构发生变化时，它们都会得到更新，因此它们始终保存着最新、最准确的信息

  + ```js
    //下列代码会导致无限循环
    let divs = document.getElementsByTagName("div"),
        i,
        div;
    for(i= 0 ; i < divs.length; i++){
        div = document.createElement("div");
        document.body.appendChild(div);
    }
    //每次循环都会查询一次divs.length，但是divs.length的值一直在动态的增加所以会导致无限循环
    
    let divs = document.getElementsByTagName("div"),
        i,
        len,
        div;
    for(i= 0,len = divs.length; i < len; i++){
        div = document.createElement("div");
        document.body.appendChild(div);
    }
    ```



# Dom扩展

## 选择符API

+ `querySelecctor()`
+ `querySelecctorAll()`
+ `matchesSelector()`
  + 方法接收CSS选择符
  + 如果调用元素与该选择符匹配返回true

## 元素遍历

+ `childElementCount` 返回子元素（不包括文本节点和注释）的个数
+ `firstElementChild` 指向第一个子元素：`firstChild`的元素版
+ `lastElementChild` 指向最后一个子元素：`lastChild`的元素版
+ `previousElementChild` 指向前一个同辈元素：`previousSibling`的元素版
+ `nextElementChild` 指向后一个同辈元素：`nextSibling`的元素版
+ 利用这些属性不用担心空白文本节点

## HTML5

+ `classList`属性
  + `add()`
  + `contains()` 检测是否存在给定值的类名
  + `remove()`
  + `toggle()`
+ 焦点管理
  + `document.activeElement` 属性，始终会引用DOM中当前获得焦点的元素
  + `focus()` 使元素获得焦点
  + `document.hasFocus()` 确定文档是否获取了焦点
+ HTMLDocument 的变化
  + `readsState` 属性
    + 值 ： loading 正在加载文档。
    + 值 ： complete 已经加载完文档。
  + head 属性
  + 字符集属性
    + `document.charset`
  + 自定义数据属性
    + `data-` 开头 `date-name`
    + 取得或设置自定义属性
    + `div.dataset.name`
  + 插入标记
    + `innerHTML` 属性    所有子节点
    + `outerrHTML` 属性
      + 读取调用它的元素及所有子节点的HTML标签
      + 写入，会根据指定的HTML字符串创建新的DOM子树
    + `insertAdjacentHTML()` 方法 接收两个参数
      + 第一个参数
        + `beforebegin` 在当前元素之前插入一个紧邻的同辈元素
        + `afterbegin` 在当前元素之下插入一个新的子元素，或在第一个子元素之前再插入新的子元素
        + `beforeend` 在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
        + `afterend` 当前元素之后插入一个紧邻的同辈元素
      + 第二个参数    即插入的字符串（可以是<div>元素</div>）
  + 内存与性能问题
    + 在删除元素时应该先删除与之绑定的事件
    + 尽量减少插入语句的访问次数
  + `scrollIntoView()` 方法
    + 传入true或不传入参数，窗口会滚动到调用元素的顶部与视口尽可能齐平
    + 传入false 调用元素会尽可能全部出现在视口中

## 专有扩展

+ 文档模式
+ children 属性
  +  这个属性是`HTMLcollection` 的实例，只包含元素中同样还是元素的子节点
+ `contains()` 方法
  + 节点调用，传入节点参数
  + 返回 1 无关
  + 2 在调用节点之前
  + 4 在调用节点之后
  + 8 包含指定节点
  + 16 被指定节点包含
+ 插入文本
  + innerText 属性
    + 返回元素中包含的所有文本，包括子元素包含的文本
  + outerText 属性
+ 滚动
  + `scrollIntoViewIfNeeded(可选参数true)` 
    + 滚动到调用元素可见，已经可见则不操作
    + true 尽量在视口垂直中部显示
  + `scrollByLines(可以是正值也可以是负值)` 将元素内容滚动指定的行高
  + `scrollByPages(pageCount)` 将元素的内容滚动到指定的页面高度，具体高度有元素的高度决定

## 偏移

![offset](./images/offset.png)

## 客户区大小

+ `clientWidth`
+ `clicentHeight`

## 滚动大小

+ `scrollHeight` 在没有滚动条的情况下，元素内容的总高度
+ `scrollWidth` 在没有滚动条的情况下，元素内容的总宽度
+ `scrollLeft` 被隐藏在内容区域左侧的像素数，设置可改变滚动位置
+ `scrollTop` 被隐藏在内容区域上方的像素数，设置可改变滚动位置

## 遍历

+ NodeIterator
+ TreeWalker

# 需注意

+ 运算优先级以及转译
  
    + `(!(~+[])+{})[--[~+""][+[]]*[~+[]]+~~!+[]]+({}+[])[[~!+[]]*~+[]]`
+ 内嵌js
  + 不能把</script>嵌入在代码的任何位置, 但可以通过将之分隔为两个部分解决 <\  /script>
    + 因为一旦浏览器解析倒</script>就会认为那是结束代码的标签
+ 外链js
  + 不能在外链JS的script标签中写代码,  应为检测倒外链JS标签中的代码会被忽略