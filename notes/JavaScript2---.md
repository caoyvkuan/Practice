# JavaScript

## 数组

#### Array.prototype.slice.call()

+ 可将对象转化为数组

+ slice()  截取	slice( begin , end )
  + slice(2,4)		返回索引 	2 和 3
  + 方法可从已有的数组中返回选定的元素。
  + 為原陣列選擇之 `begin` 至 `end`（不含 `end`）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改

+ ```js
  var obj = {0:'hello',1:'world',length:2};
  console.log(Array.prototype.slice.call(obj));//["hello", "world"]
  ```

  

## 语法 ##

#### 变量

+ ```javascript
  //属性
  Element.aaa = //元素的属性可以当作第一无二的变量使用
  ```

  

## 函数与方法 ##

#### 窗口加载函数

+ ```javascript
  window.onload = function () { }
  window.onload = 方法
  window.onscroll	滚动监听
  	滚动条滚动时，到顶部的距离
  	document.documentElement.scrollTop||document.body.scrollTop;
  window.onresize 缩放监听
  ```


#### 函数

+ ```javascript
  类型转换
  parseInt('39px') //返回39
  parseFloat('39.9px')    //返回39.9
  Math.ceil(Number)   //小数进1
  Math.floor(Number)  //小数舍去
  Math.round(Number)  //四舍五入
  parseInt(Math.random()*(50-1+1),10) //创建1-50的随机整数 

  let a = '倒过来输出';
  // split('按什么拆分')拆分字符串为数组
  //reverse将数组倒过来
  //join('按什么来连接')将多个字符串连接成一个
  a.split('').reverse().join('');
  ```
  
  

### 本地储存

+ ```javascript
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
  
  var list=
  '[{"name":"zhans","age":"18","gender":"男"},
  {"name":"lis","age":"23","gender": "女"}]';
  window.sessionStorage.setItem("list",list);
  ```

  

#### 定时器

+ ```javascript
  typeof 检测对象  //检测对象类型,对象、数值、布尔值、字符串或是一个函数
  let variable = setTimeout('function',interval); //定义一个间隔一段时间后执行的函数
  clearTimeout(variable); //取消执行
  ```

#### 获取网络状态

+ ```javascript
    ☞ 获取当前网络状态
    		 window.navigator.onLine 返回一个布尔值
    
    ☞ 网络状态事件
    		 1. window.ononline		网络链接时触发
    		 2. window.onoffline	网络断开是触发
  ```

#### 获取当前位置

+ ```javascript
    ☞  获取一次当前位置
    	  window.navigator.geolocation.getCurrentPosition(success,error);
    
    1. coords.latitude   维度
        2. coords.longitude   经度
    
    ☞  实时获取当前位置
    	  window.navigator.geolocation.watchPosition(success,error);
  ```

  

## 事件 ##

#### 鼠标事件

+ ```javascript
  onmouseover //鼠标悬停
  onmouseout //鼠标移出
  onmousedown //按下鼠标
  onmouseenter    //鼠标输入
  onmouseleave    //鼠标离开
  onmousemove //鼠标移动
  onmouseup   //鼠标向上
  onmousewheel    //鼠标滚轮
  ```

  

## JSDOM操作 ##

#### 自定义属性

+ ```HTML
  ☞ 自定义属性  			（小案例分析体验自定义属性）
  data-自定义属性名
  备注：
  在标签中，以data-自定义名称  
  
  1. 获取自定义属性   Dom.dataset   返回的是一个对象
  Dom.dataset.属性名  或者  Dom.dataset[属性名]
  
  注意： 
  属性名是不包含data-
  
  2. 设置自定义属性
  Dom.dataset.自定义属性名=值  或者  Dom.dataset[自定义属性名]=值；
  <div class="one" data-test-name="123"></div>
  <script type="text/javascript">
      //获取标签的自定义属性值
      var list=document.querySelector(".one").dataset;
      //设置自定义属性
      list.age=20;
      list.testHeight=180;
      console.log(list.testName); // 驼峰命名法
      // console.log(list.test-name); 错误
      var  nav=document.querySelector(".one");
  	 		 nav.dataset.test="abc";
  	 		 nav.dataset.TestAbc="123";	html中转化为 data-test-abc
  	 		 nav.dataset["hh"]="呵呵";	会互相转化
  </script>
  ```

  

#### 节点操作

+ ```javascript
  学习方法
  object.onchange = function(){
      for(let key in this){
          console.log(key,this[key]);
      }
      //可查看到该对象有什么方法
      var reader = new FileReader();
      console.log(reader);
  }
  
  //样式获取Style  只能获取内嵌在HTML内容里的样式信息	无法获取CSS样式表内的样式
  //font-family js解释减号号会出错 把后面的首位大写来代替
  Element.style.fontFamily    
  Element.className   // 利用+=可以附加样式
  //通过偏移量获取元素宽高,不是获取style里的宽高所以不通过style调用,直接用元素或节点调用
  offsetWidth; offsetHeight   
  //document对象
  
  //$$()就是document.querySelectAll()的简写 存在于 Command Line API 内
  querySelector("#id .class") //方法返回文档中匹配指定 CSS 选择器的第一个元素。
  
  document.querySelectorAll("选择器") //返回匹配的所有对象
  
  ☞ Dom.classList.add("类名"): 给当前dom元素添加类样式
  
  ☞ Dom.classList.remove("类名"); 给当前dom元素移除类样式
  
  ☞ classList.contains("类名"); 检测是否包含类样式 true/false
  
    ui框架实现动态样式的方式
    ☞ classList.toggle("active");  切换类样式（有就删除，没有就添加）
    
  document.getElementById('id')	//通过id寻找目标节点    返回对象:Object
  
  getElementByTagName('TagName') //通过标签(Tag)名称寻找节点  返回数组:Array
  
  getNextElement('node')  //寻找下一个元素
  
  innerHTML //读写对象全部内容包括子节点
  
  window.frames["content"].document; //获取iframe里的文档流
  //获取和设置元素节点属性值
  getAttribute('Attr')    //通过属性名称找Object对象的属性的值    返回值:Value
  setAttribute('Attr','value')    //通过属性名称设定Object对象的属性值
  hasChildNodes //检查一个给定元素是否有子节点 返回bool值
  createElement(); //创建元素节点
  createTextNode();   //创建文本节点
  appendChild();   //添加子节点
  cloneNode();    //复制节点  参数 ture false   代表是否复制节点中的子节点
  removeChild();  //从给定元素里删除一个子节点
  //将一个给定父元素里的一个字节点替换为另外一个节点 如果new是现有节点,将被删除在插入到oldChild里
  replaceChild(newChild,oldChild); 
  ```
```js

  //获取对象的子节点 返回数组:Array  
  //例:<p>文本<span></span></p>  Array[0] 返回的是[本文值],而不是span节点
  Object.ChildNodes  
  firstChild  //同等与Object.ChildNodes[0]  返回数组的第一个
  lastChild   //同等与Object.ChildNodes[Object.ChildNodes.length-1]   返回数组最后一个
  nextSibling     //下一个节点
  parentNode  //获取父节点
  previousSibling //返回一个给定节点的下一个子节点
  //会将newElement元素插在子元素targetElement的前面   也能用来移动节点
  parentElement.insertBefore(newElement,targetElement);   
  Object.nodeType    //获取对象节点类型分为1-12  1:元素  2:属性  3:文本
  nodeName    //返回给定节点的名字    节点名称大写
  nodeValue  
```

+ ```javascript
  网页可见区域宽：document.body.clientWidth 
  网页可见区域高：document.body.clientHeight 
  网页可见区域宽：document.body.offsetWidth  (包括边线的宽) 
  网页可见区域高：document.body.offsetHeight (包括边线的宽) 
  网页正文全文宽：document.body.scrollWidth 
  网页正文全文高：document.body.scrollHeight 
  网页被卷去的高：document.documentElement.scrollTop 
  网页被卷去的左：document.documentElement.scrollLeft 
  滚动条高度    :document.documentElement.scrollHeight
  				document.documentElement.clientHeight
  				document.documentElement.offsetHeight
  
  浏览器视觉视口高度(包括滚动条):window.innerHeight
  获取整个浏览器的高(包括浏览器边框):window.outerHeight

  网页正文部分上：window.screenTop 
  网页正文部分左：window.screenLeft 
  屏幕分辨率的高：window.screen.height 
  屏幕分辨率的宽：window.screen.width 
  屏幕可用工作区高度：window.screen.availHeight
  ```
  
  

