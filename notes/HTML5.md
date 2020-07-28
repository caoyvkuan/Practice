# HTML

## 元素

#### 块级元素与行内元素

+ block		inline

## 标签作用

```html
<meta>
用于定义页面描述
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



## 新多媒体元素

```html
<audio>	音频</audio>
<video> 视频</video>
<soucre> 资源</soucre>
<embed>定义嵌入的内容，比如插件。</embed>
<track>为诸如 <video> 和 <audio> 元素之类的媒介规定外部文本轨道</track>

<video width="320" height="240">
    <source src=".mp4" type="video/mp4">
    <source src=".ogg" type="video/ogg">
    <track src="subtitles_no.vtt" kind="subtitles" srclang="en" lable="English">
</video>
```

## 语义标签

```html
<nav>导航</nav>

<header>头部页眉</header>

<footer>页脚</footer>

<main>规定文档的主内容。</main>

<section>定义文档中的节</section>

<mark>定义重要的或强调的文本</mark>

<meter>定义度量衡。仅用于已知最大和最小值的度量。</meter>

<progress>定义任何类型的任务的进度</progress>
	<progress value="当前进度" max="最大进度值"></progress>

<ruby>定义 ruby 注释（中文注音或字符）</ruby>

<rt>定义字符（中文注音或字符）的解释或发音。</rt>

<rp>在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容</rp>

<wbr>规定在文本中的何处适合添加换行符。</wbr>
	<!-- 可以用来定义HTML文档中需要进行换行的位置，与<br>标签不同，如果浏览器窗口的宽度足够，则不换行；反之，则在添加了 <wbr> 标签的位置进行换行 -->

<time>定义日期/时间。</time>

<aside>元素页面主内容之外的某些内容（比如侧栏并不是侧导航）</aside>

<article>元素规定独立的自包含内容。</article>

<address>定义地址、签名或者文档的作者身份</address>

<bdi>允许您设置一段文本，使其脱离其父元素的文本方向设置。</bdi>

<command>定义命令按钮，比如单选按钮、复选框或按钮</command>

<summary>定义 <details> 元素的可见标题。</summary>
    
<details>定义用户能够查看或隐藏的额外细节</details>
    
<details>用于描述文档或文档某个部分的细节</details>

<dialog>定义对话框，比如提示框</dialog>

<figure>规定自包含内容，比如图示、图表、照片、代码清单等。</figure>
    
<figcaption>定义 <figure> 元素的标题</figcaption>
    

语义标签兼容低版本
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

## Form

```html
 ◆form属性：
    action="" 表单提交地址
    method="post" 请求方式
    autocomplete="on | off"	自动完成
    novalidate	关闭只能校验

◆input元素
<input type="number" min="0" max="20">	控制数值的大小范围
<input type="range" step="5">	滑动条 同样可控制数值大小 step 指定值的间隔
    type="color"	颜色选择器	type="date" 	日期选择控件
    type还有一些如
    email	只能输入合法的电子邮箱
    tel  	电话
    url		网址
    number： 只能输入数字
    range： 滑块
    color： 拾色器
    date： 显示日期
    month： 显示月份
    week ： 显示第几周
    time：  显示时间
	search:
	calendar:
<input>属性:
    *autofocus	自动获取焦点
    *placeholder ： 占位符  （提示信息）
    *required：    必填项
自定义required的提示文本
    oninvalid="setCustomValidity('提示内容')" ： 固定写法-->自定义提示内容
	//oninput 当用户输入时触发
    oninput="setCustomValidity('')"： 固定写法-->清空上一次提交所输入的内容
	<form action="1.php" method="get">
		<input type="text" name="uname" pattern="^\d{4,11}" required class="uname">
		<input type="submit" name="">
	</form>
	<script type="text/javascript">
        var input=document.querySelector(".uname");
        //oninvalid 当验证不通过时触发
        input.oninvalid=function(){
            //validity input 验证属性
            //validity 中的patternMismatch 正则表达式验证是否成功
            if(this.validity.patternMismatch===true){
                this.setCustomValidity("请输入4到11为数字");
            }else{
                this.setCustomValidity("");
            }
        }
	</script>

    form:  提交目标的表单id
    list
    multiple：	 实现多选效果
```

#### 新表单元素

```html
<datalist>定义选项列表</datalist>
<input type="text" list="abc"/>
<datalist id="abc">
    <option value="123">12312</option>
    <option value="123">12312</option>
    <option value="123">12312</option>
    <option value="123">12312</option>
</datalist>

<keygen>规定用于表单的密钥对生成器字段。</keygen>

<output>定义不同类型的输出，比如脚本的输出。</output>
```



#### 文件读取

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

  

## Video ##

```html
audio标签支持音频		写法同video标签
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
更多方法参考手册
```

