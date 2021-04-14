# 标签

## 语义化标签

+ **<header>**元素
  + 在<article>元素中用作某个区块的引介区。它可以在一个页面中出现多次
  + 比如页面中每个<section>中都可以有一个<header>

+ **<main>**元素
  
  + 包裹页面主要内容	且只有一个
  
+ **<footer>**元素同<header>一样

+ **<section>**元素        定义文档中的节

  + section元素用于定义文档或应用中一个通用的区块。例如，可以用section包装联系信息、新闻源，等等
  + 一般会用section包装可见组件。这样可以清楚地知道一个组件的开始和结束

+ **<nav>**元素

  + -<nav>元素用于包装指向其他页面或同一页面中不同部分的主导航链接
  + 如果你通常使用无序列表（<ul>）和列表标签（<li>）来写导航，那最好改成用nav嵌套多个a标签

+ **<article>**元素

  + -<article>用于包含一个独立的内容块。

  + 明显可以放到article元素中的内容有博客正文和新闻报道
  + 对于嵌套<article>而言，内部的<article>应该与外部<article>相关

+ **<aside>**元素

  + **<aside>**元素用于包含与其旁边内容不相关的内容
  + 包装侧边栏
  + 这个元素也适合包装突出引用、广告和导航元素
  + 基本上任何与主内容无直接关系的，都可以放在这里边

+ **<figure>**和**<figcaption>**元素

  + 如果图片或代码需要一个小标题，那么这个元素非常合适

+ **<details>**和**<summary>**元素

  + ```HTML
    <!--	展开收起的摘要部件	-->
    <details> 	<!--	显示的摘要	-->
     <summary>I ate 15 scones in one day</summary> 
     <p>Of course I didn't. It would probably kill me if I did. What a 
    way to go. Mmmmmm, scones!</p> 
    </details>
    <!--	禁用部件的默认样式	-->
    summary::-webkit-details-marker { 
     display: none; 
    } 
    ```

+ **<address>**元素

  + *<address>*元素明显用于标记联系人信息，为最接近的<article>或<body>所用
  + 不过有一点不好理解，它并不是为包含邮政地址准备的（除非该地址确实是相关内容的联系地址）。邮政地址以及其他联系信息应该放在传统的<p>标签里。

+ **h1** 到 **h6**

  + h1到h6元素不能用于标记副标题、字幕、广告语，除非想把它们用作新区块或子区块的标题


```html
<code>计算机代码</code>
<pre>预格式化文本  (会保留元素中的空格和换行符 )</pre>

<mark>定义重要的或强调的文本</mark>

<meter>定义度量衡。仅用于已知最大和最小值的度量。</meter>

<progress>定义任何类型的任务的进度</progress>
<progress value="当前进度" max="最大进度值"></progress>
<meter min="0" max="100" value="20" low="10" high="60"> 测量</meter>

<ruby>定义 ruby 注释（中文注音或字符）</ruby>

<rt>定义字符（中文注音或字符）的解释或发音。</rt>

<rp>在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容</rp>

<wbr>规定在文本中的何处适合添加换行符。  单标签
<!-- 可以用来定义HTML文档中需要进行换行的位置，与<br>标签不同，如果浏览器窗口的宽度足够，则不换行；反之，则在添加了 <wbr> 标签的位置进行换行 -->

<hgroup> 标题组合</hgroup>>
<time datetime="2020-09-15">定义日期/时间。</time>
<bdi>允许您设置一段文本，使其脱离其父元素的文本方向设置。</bdi>

<command>定义命令按钮，比如单选按钮、复选框或按钮</command>

<dialog>定义对话框，比如提示框</dialog>
```



```html
<map> 定义一个客户端图像映射  指带有可点击区域的一幅图像 </map>
name属性关联img       img的usemap属性=`#name`
<area>  嵌套在map元素中  定义图像的映射区域  点击区域    </area>
属性 href   shape 属性定义区域形状    coords  定义点击区域坐标  alt
shape = "rect" 长方形   coords="x y x y" 2个点的位置, 左上角和右下角
circ   圆              x y 半径   圆心位置  半径大小
poly  多边形           x y x y   多个点的x y位置连在一起
  


媒体标签
<embed> 与 <object></object>
    都能嵌入多媒体,如flash动画插件
<embed src=""  type="">
<object>
    <param name="movie" value="url">
</object>
```

## 文本级标签/文本格式化

+ <**b**>元素不能用它来包围一大段其他标记
+ <**em**>em元素表示内容中需要强调的部分
+ <**i**>元素  它不仅仅用于把文本标为斜体。比如，可以用它在文本中标记出罕用的名字：

```html
<strong>重要的文本</strong>
<sup> （上标文本）</sup>
<sub> （下标文本）</sub>
<q>表示短引用</q>
<small>更小的文本</small>
<blockquote>长引用,会进行缩进</blockquote>
<kbd>键盘输入</kbd>
<abbr> （缩写）</abbr>
<bdo dir="ltr" dir="rtl"> （文字方向）</bdo>
<cite> （工作的名称）</cite>
<del> （删除的文本）</del>
<ins> （插入的文本）</ins>
```



## 自定义元素

```html
myHero {
  display: block;
  background-color: #ddd;
  padding: 50px;
  font-size: 30px;
}
<myHero>我的第一个新元素</myHero>
```



## 语义标签兼容低版本

```html
<style>
    header, section, footer, aside, nav, main, article, figure {
        display: block; 
    }
</style>
第一种解决方案
<script>
    //创建nav自定义标签使页面内的nav标签起作用-然后display:block;
    document.createElement("nav");
</script>
第二种解决方案		引用js插件
最佳	在什么版本下执行该段代码	在低于ie 8或等于ie 8版本才会执行
<!--[if lte IE 8]>
<script type="text/javascript" src="HTML/语义标签兼容处理/html5shiv.min.js"></script>
<![endif]-->

<!--[if lt IE 9]
<script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js">
</script>
<![endif]-->

<!--[if lt IE 9]>
<script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js">
</script>
<![endif]-->
无语义标签
<div></div>
```

# Form表单

## 表单元素

+ 表单域
  + Action    
    + 在表单收集到信息后，需要将信息传递给服务器进行处理，action属性用于指定接收并处理表单数据的服务器程序的url地址
  + method
    + 用于设置表单数据的提交方式，其取值为get或post
  + name
    + 用于指定表单的名称，以区分同一个页面中的多个表单

```html
<form action="url地址" method="提交方式" name="表单名称">
  各种表单控件
</form>
```

+ 表单属性
  + placeholder		占位符
  + autofocus	  页面加载时元素应该自动获得焦点
  + multiple	   多选
  + autocomplete     自动完成功能
  + required         必填项
  + accesskey     规定激活（使元素获得焦点）元素的快捷键

+ input元素

  + 一般配合label标签使用

    + `<label for="da">游戏</label>	<input type="checkbox" id="da" >`

  + button 标签 按钮	默认为提交按钮

  + `patter=""`	正则表达式限制

  + `maxlength="50"` 最大长度

  + `type=""` 取值

  + ```html
    <input type="number" min="0" max="20">	控制数值的大小范围
    <input type="range" step="5" value="5">	滑动条 同样可控制数值大小 step 指定值的间隔	初始值5
    <input type="password">	密码
    <input type="submit" value="Send">	提交按钮	value 按钮上显示的文字
    <input type="reset">	重置按钮
    <input type="hidden">	隐藏域
    <input type="radio" name="radio"> 单选按钮  需要name多个使用同一个name才能实现单选
    type="email"	邮箱地址	只能输入合法的电子邮箱
    type="url"		网址
    type="tel"		电话
    type="search" 	搜索框 普通文本类型	type="text"
    type="color"	颜色选择器
    type="date"		日期选择控件   type="datetime"
    type="month"	年和月份	type="week"	年和第几周		type="time"		显示时间
    radio:	单选
    	属性:
    		name让单选形成一组,发挥单选的作用,每组的name属性值一样
    		
    checkbox  复选框	checked	默认选中<input type="checkbox" checked >
    ```

+ **select**下拉列表

  + **optgroup**分组
    + 属性:`label="分组标题"`
  + **option**
    + 属性:`value="选项对应的值"`
    + `selected` 默认被选中

+ **textarea** 文本域/多行文本框

  + ` resize : none ` CSS样式设置关闭大小调整

+ **fieldset**标签可以将表单内的相关元素分组绘制边框

  + `form="form_id"`规定 fieldset 所属的一个或多个表单
  + &lt;legend&gt; 标签为 &lt;fieldset&gt; 元素定义标题

+ **keygen**

  + 规定用于表单的密钥对生成器字段。

+ **output**

  + 定义不同类型的输出，比如脚本的输出。

+ **datalist**  候选列表  配合输入框使用

  + ```html
    <input list="browsers">
    <datalist id="browsers">
        <option value="Internet Explorer"></option>
        <option value="Firefox"></option>
        <option value="Chrome"></option>
        <option value="Opera"></option>
        <option value="Safari"></option>
    </datalist>
    ```

    

+ 自定义验证提示文本

+ ```html
  自定义required的提示文本
  onInvalid="setCustomValidity('提示内容')" ： 固定写法-->自定义提示内容
  //onInput 当用户输入时触发
  onInput="setCustomValidity('')"： 固定写法-->清空上一次提交所输入的内容
  <form action="1.php" method="get">
      <input type="text" name="uname" pattern="^\d{4,11}" required class="uname">
      <input type="submit" name="">
  </form>
  <script type="text/javascript">
      var input=document.querySelector(".uname");
      //onInvalid 当验证不通过时触发
      input.onInvalid=function(){
          //validity input 验证属性
          //validity 中的patternMismatch 正则表达式验证是否成功
          if(this.validity.patternMismatch===true){
              this.setCustomValidity("请输入4到11为数字");
          }else{
              this.setCustomValidity("");
          }
      }
  </script>
  ```

## 使用CSS美化表单

+ 显示必填项

  + `input:required{}`

  + 可以设定输入域上的border或者outline

  + `input:focus:required{}`

+ ```css
  如果输入元素中的值是非法的
  input:invalid
  如果输入元素中输入的合法的
  input:valid
  ```

```html
<style>
    label input{ display:none}    
    /*通过div来替换input的原始样式*/
    label input:checked + div{background-position:0,0}
    label div{ width:28px; height:28px; background:url() 0 -28px;}
</style>
<label>
    <input type="checkbox" >
    <div></div>
</label>
```



# 媒体元素

## Audio

```html
<audio>	音频</audio>
<video> 视频</video>
<source> 资源</source>
<embed>定义嵌入的内容，比如插件。</embed>
<track>为诸如 <video> 和 <audio> 元素之类的媒介规定外部文本轨道</track>

<video width="320" height="240">
    <source src=".mp4" type="video/mp4">
    <source src=".ogg" type="video/ogg">
    <track src="subtitles_no.vtt" kind="subtitles" srclang="en" label="English">
</video>
```

## Video

```html
Video的属性
<video src="" controls autoplay muted></video>
<video>实现多种浏览器多媒体格式支持
    <source src=""><source src=""><source src="">
</video>
<source>
</source>标签可以为<picture>、<audio>或<video>元素指定一个或者多个的媒体资源
    
controls 布尔值  是否为播放器添加内置控件 浏览器种类
src 视频链接地址
preload 控制如何加载视频 auto 让浏览器来决定
autoplay 加载完毕是否自动播放		自动播放多数浏览器 只支持静音状态下自动播放
muted	静音
poster="url" 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像
loop 循环播放

多媒体操作
<script>
var video=document.querySelector("video")
video.play();	播放
video.pause();	暂停
video.playbackRate=2; 	2倍播放速度
</script>
```

# head中的标签

+ **<meta>**

  + 用于定义页面描述
  + <meta charset="utf-8">  编码
    <meta name="description" content="描述信息 seo优化">
    <meta name="keywords" content=" 关键字">
    <meta name="renderer" content="webkit"> 针对双内核浏览器 选择内核
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta http-equiv="refresh" content="3" url="">刷新3秒后跳转链接
    <meta http-equiv="expires" content=""/>缓存处理
  <meta name="theme-color" content="red"> 针对安卓地址栏的配色,兼容不好几乎没用
  
  + 辅助响应式布局   主要针对移动端
  + ```html
    <meta name="viewport" content="width=device-width"> 
    按照设备宽度来渲染页面内容
    <meta name="viewport" content="initial-scale=2.0,width=device-width"/> 
    content:
    initial-scale=2.0	把内容放大为实际的两倍大小
    width=device-width	页面宽度等于设备宽度
    maximum-scale=3	允许用户将页面放大到设备宽度的三倍
    minimum-scale=0.5	最小可将页面缩小至设备宽度的一半
    user-scalable=no	禁止用户缩放
    
    <meat name="viewport" content="width=device-width,initial-scale=1">
    大多数情况都可以使用这个
    
    使用max-width:100%;而不使用width:100%;
    有利于元素考虑之身宽度不被拉伸
    ```

+ **<link>**

  + `<link rel="stylesheet" href="">` 样式引入

  + `<link rel="icon" type="image/x-icon" href="">`  网页标题图标引入

  + `<link rel="dns-prefetch" href="">`  dns预解析
  
  + `<link rel="apple-touch-icon" href="">` 只支持苹果手机,快捷方式图标
  
  + `<link ref="manifest" href="json配置文件,">` 应用加壳,就是做手机端APP。
  
  + 媒体查询
  
    + ```html
      在CSS2中
      <link rel="style sheet" type="text/css" media="screen" href="m.css">
      /*	不仅仅可以判断屏幕类型还能区分屏幕是否是垂直方向	*/
      <link rel="stylesheet" media="screen and (orientation: portrait)" href="portrait-screen.css" />
      
      <link rel="stylesheet" media="screen and (orientation: portrait) and 
      (min-width: 800px)" href="800wide-portrait-screen.css" /> 
    
      media="screen and (orientation: portrait) and(min-width: 800px),projection"
      projection后不接条件表示支持具备任何特性的该媒体类型,适配所有投影机
      ```

# 常用标签

+ 超链接**a**
  + target属性可指向a链接的加载位置 		_blank 默认每次都在新窗口打开
  + `<a href="#add">` 锚点 add
  + 然后在需要跳转的内容中添加属性 `name="add"` 设置 id 属性也可以

+ 图片**img**

  + alt  图片加载失败时的文字提示      设置为空可以让图片加载失败时，不显示加载失败的图片装饰
  + loading 属性  延迟加载
    + lazy 延迟加载图片资源
    + eager 立即加载，默认状态

+ 列表标签

  + `unordered list = ul`
  + `ordered list = ol`
  +  `list item = li`

+ Void元素 (单标签)

  + **<hr>**
  + **br**
  + **<img>**

+ 字符实体

  + ```html
    空格&nbsp;: &amp;nbsp;
    小于号 ：&lt; &amp;lt;
    大于号 : &gt; &amp;gt;
    &符号 : &amp;
    ```

# 基本知识

## 全局属性

+ **disabled**属性可以应用实现禁用
+ **title**  鼠标悬停提示文本
+ **style**  行内样式
+ **id  |  class**
+ **hidden** 隐藏
+ **accesskey**设置访问元素的键盘快捷键
  + `accesskey="h"`
  + 不同浏览器使用的快捷键方法不同：
  + IE, Chrome, Safari, Opera 15+:    [ALT] + *accesskey*
  + Opera prior version 15:   [SHIFT] [ESC] + *accesskey*
  + Firefox:    [ALT] [SHIFT] + *accesskey*
+ **contenteditable**规定是否可编辑元素的内容。
  + `contenteditable="true|false"`
+ **contextmenu**  规定元素的上下文菜单。上下文菜单在用户点击元素时显示。
+ **data-name**用于存储页面的自定义数据
+ **dir** 设置元素中内容的文本方向。`dir = " ltr | rtl | auto"`
+ **draggable**指定某个元素是否可以拖动`draggable="true|false|auto"`
+ **dropzone**当被拖动的数据在拖放到元素上时，是否被复制、移动或链接
  + `dropzone="copy|move|link"`
+ **lang**设置元素中内容的语言代码。
+ **spellcheck** 检测元素是否拼写错误`spellcheck="true|false"`
+ **tabindex**  设置元素的 Tab 键控制次序。
+ **translate** 指定是否一个元素的值在页面载入时是否需要翻译`translate="yes|no"`

## 冷门标签

+ `noscript` ：不支持 JavaScript 时显示

## 路径

+ 相对路径
  + `./HTML5.md`
  + 相对于当前文件或电脑的位置
+ 绝对路径
  + `https://cn.bing.com/this.png`
  + 所有人都能通过同一个位置找到
+ 出于安全考虑不能通过磁盘直接访问磁盘中的文件

# 语言规范

## 块级元素与行内元素

+ BFC规范   块级格式化上下文
  + 触发BFC   触发该规范,就可以使用block特性
    + 浮动(除了none)  定位( `absolute ,  fixed` )
    + `display: inline-block | table-cells | flex`
    + flex 给父盒子添加,子盒子才会触发 BFC
    + `overflow:hidden | auto | scroll`
  + 触发BFC规范的容器可以形成一个独立的容器,不受外界的影响,从而解决一些布局问题
    + 解决margin叠加问题(发生在上下布局)
    + 解决margin传递问题(发生在嵌套)
    + 解决浮动问题(父盒子塌陷)
    + 解决覆盖问题(浮动叠加被覆盖的) (一列固定一列自适应布局效果)


+ IFC规范    内联
  + 

+ block 特性
  + 可以设置宽高
  + 宽度默认和父元素一样宽
+ inline 特性
  + 无法设置宽高
  + 宽高靠内容撑起来
  + `text-align:center;`可以让标签中的行内元素和文本居中,行内块
  + 行内元素在脱离文档流后可以设置宽高
+ 行内块模式
  + img   表单元素

## 结构优化

+ 页面应当只有一个 h1 标签   其他标题标签应当由层次感，不越级，大小依靠css调整
+ 只包含一个  main  标签
+ 视觉隐藏屏幕阅读器可见，可以将元素定位在屏幕外  比如 `left:-10000px;`

# 其他

## 拖放

+ HTML5 拖放（Drag 和 Drop）

+ 设置元素为可拖放
  - 首先，为了使元素可拖动，把 draggable 属性设置为 true ：
  - <img draggable="true">

+ 拖动什么 - ondragstart 和 setData()
  - 然后，规定当元素被拖动时，会发生什么。
  - 在上面的例子中，ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。
  - dataTransfer.setData() 方法设置被拖数据的数据类型和值
  - ```js
    function drag(ev){
        ev.dataTransfer.setData("Text",ev.target.id);
    }
    ```
    - 放到何处 - ondragover
      - ondragover 事件规定在何处放置被拖动的数据。
      - 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
      - 这要通过调用 ondragover 事件的 event.preventDefault() 方法
      - `event.preventDefault()`

    - 进行放置 - ondrop
      - 当放置被拖数据时，会发生 drop 事件。
      - 在上面的例子中，ondrop 属性调用了一个函数，drop(event)：
      - ```js
        function drop(ev){
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            ev.target.appendChild(document.getElementById(date));
        }
        ```

      - 代码解释：
        - 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
        - 通过 dataTransfer.getData("Text") 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
        - 被拖数据是被拖元素的 id ("drag1")
        - 把被拖元素追加到放置元素（目标元素）中

## 文件读取

+ ```javascript
  var input_file=document.querySelector("input");
  input_file.onchange=function() {
      var files=this.files;
      var file=files[0];
      //判断后缀名是否合法
      var filename=file.name.substring(file.name.lastIndexOf("."));
      var imgs=[".png",".jpg","gif",".ico"];
      var flag=false;
      for(var i=0; i<imgs.length; i++) {
          if(imgs[i]==filename) {
              flag=true;
              break;
          }
      }
      if(flag) {
          var reader=new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function() {
              var img=document.createElement("img");
              img.src=reader.result;
              document.body.appendChild(img);
          }
      }else {
          alert("文件类型不正确，请重新选择");
      }
      //将数据读取成二进制方式
      // reader.readAsBinaryString(file);
  
      //将数据读取成文本形式
      // reader.readAsText(file);
  
      //将数据读取成url形式
      reader.readAsDataURL(file);
      reader.onload=function(){
          console.log(reader.result);
      }
  }
  ☞  FileReader
  FileReader			 接口有3个用来读取文件方法返回结果在result中
  readAsBinaryString    ---将文件读取为二进制编码
  readAsText		   ---将文件读取为文本
  readAsDataURL		   ---将文件读取为DataURL
  
  ☞  FileReader 提供的事件模型
  onabort	    中断时触发
  onerror	    出错时触发
  onload	    文件读取成功完成时触发
  onloadend	读取完成触发，无论成功或失败
  onloadstart	读取开始时触发
  onprogress	读取中
  ```

