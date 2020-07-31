# CSS

## 选择器

+ **继承：**即子类元素继承父类的样式;
+ **优先级：**是指不同类别样式的权重比较;
+ **层叠：**是说当数量相同时，通过层叠(后者覆盖前者)的样式。

#### 选择器分类

+ 标签选择器
+ 类选择器
+ ID选择器
+ 全局选择器(如：*号)
+ 后代选择器 (如：#head .nav ul li 从父集到子孙集的选择器)
+ 群组选择器 div,span,img 即具有相同样式的标签分组显示
+ 伪类选择器
+ 字符串匹配的属性选择符(^ $ *三种，分别对应开始、结尾、包含)
+ 子选择器 (如：div>p)
+ CSS 相邻兄弟选择器器 (如：h1+p)

#### 优先级

+ 优先级相等	应用后写的
+ 行内 > 内部样式表 > 外联样式表

1. !important 	慎用。
2.  行内样式      作为style属性写在元素内的样式
3. id选择器
4. 类选择器
   1. 属性
   2. 伪类
5. 类型选择器 ( 例如:  h1  or ` ::before`   )
6. 通配符选择器
7. 浏览器自定义或继承

+ **通配选择符**（universal selector）（[`*`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)）**关系选择符**（combinators）（[`+`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator), [`>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator), [`~`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator), ['` `'](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator), [`||`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Column_combinator)）和 **否定伪类**（negation pseudo-class）（[`:not()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)）对优先级没有影响。（但是，在 `:not()` 内部声明的选择器会影响优先级）。

## 布局 ##

1. 保持缩放比问题

   + 合理使用宽高单位

   + 采用rem 可控制全局大小
   + vw、vh、vmax、vmin
   + 可轻松保持缩放比例

2. 表格布局

   + ```css
     display:table-row;	行
     display:table-cell; 单元格
     vertical-align:top; 相对单元格上边对齐
     border-spacing:10px; 表示未单元格增加10px的边框间距
     ```

     

## 盒子模型 ##

+ ```css
  /* 通过box-sizing这个样式我们可以改变这种宽度计算方式，它的属性值有两个：
  content-box和border-box。*/
  默认值为content-box，也就是标准的盒子模型，此时的计算公式为:
  width = 内容的宽度
  height = 内容的高度
  padding,border 不在范围内
  
  另一个属性为border-box，它的width和height属性包括内容，内边距和边框:
  * {
      /* 谷歌兼容旧版本 */-webkit-box-sizing: border-box;
      /* 火狐兼容旧版本 */-moz-box-sizing: border-box;
      box-sizing: border-box;
  }
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
  }
  hr {
    height: 0;
    box-sizing: content-box;
  }
  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  ```
  

##  css单位的区别与使用

+ calc() 函数用于动态计算长度值
  + 需要注意的是，运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`；
  + 任何长度值都可以使用calc()函数进行计算；
  + calc()函数支持 "+", "-", "*", "/" 运算；
  + calc()函数使用标准的数学运算优先级规则；
+ 颜色单位	
  1. currentColor		当前颜色
  
  2. color()          暂不支持
  
     1. ```css
        color:color(var(--mytheme-p-color) a(50%) hue(+30deg));
        /*p元素dom数组集合中，每个元素的hue递增30deg，等同于hue += 30*/
        ```
  
  3. rgba()
  
  4. hsla(H,S,L,A)
     1. hsla() 函数使用色相、饱和度、亮度、透明度来定义颜色。
     2. **色相（H）**是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等    取(0-360)
     3. **饱和度（S）**是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。
     4. **亮度（L）** 取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。
     5. **透明度（A）** 取值 0~1 之间， 代表透明度。

1. PX

   + px就是pixel像素的缩写，相对长度单位，网页设计常用的基本单位。像素px是相对于显示器屏幕分辨率而言的

2. em

   + em是相对长度单位。相对于当前对象内文本的字体尺寸（参考物是父元素的font-size）

   + 如当前父元素的字体尺寸未设置，则相对于浏览器的默认字体尺寸

     特点：

     　　1. em的值并不是固定的；
             　　2. em会继承父级元素的字体大小

3. rem

   + rem是CSS3新增的一个相对单位，rem是相对于HTML根元素的字体大小（font-size）来计算的长度单位

   + 如果你没有设置html的字体大小，就会以浏览器默认字体大小，一般是16px

     ```
     html{font-size: 62.5%}  /* 10 ÷ 16 × 100% = 62.5% */
     
     body{font-size: 1.4rem;} /* 1.4 × 10px = 14px *//*在根元素中定义了一个基本字体大小为62.5%（也就是10px。设置这个值主要方便计算，如果没有设置，将是以“16px”为基准 ）*/
     ```

     优点是，只需要设置根目录的大小就可以把整个页面的成比例的调好

     rem兼容性：除了IE8及更早版本外，所有浏览器均已支持rem

   + em与rem的区别：

     　　rem是相对于根元素（html）的字体大小，而em是相对于其父元素的字体大小

   + 两者使用规则：

     - 如果这个属性根据它的font-size进行测量，则使用em
     - 其他的一切事物属性均使用rem

4. vw、vh、vmax、vmin这四个单位都是基于视口

   1. vw是相对视口（viewport）的宽度而定的，长度等于视口宽度的`1/100`

   2. 假如浏览器的宽度为200px，那么1vw就等于2px（200px/100）

   3. vh是相对视口（viewport）的高度而定的，长度等于视口高度的`1/100`

   4. 假如浏览器的高度为500px，那么1vh就等于5px（500px/100）

   5. vmin和`vmax`是相对于视口的高度和宽度两者之间的`最小值`或`最大值`

   6. ```css
      /*
      如果浏览器的高为300px、宽为500px，那么vmin就是3px，vmax就是5px；如果浏览器的高为800px，宽为1080px，那么vmin也是8px，vmax也是10.8px
      */
      ```

5. 其他单位：

   1. **%**（百分比）

   2. 一般来说就是相对于父元素

      1、对于普通定位元素就是我们理解的父元素

      2、对于position: absolute;的元素是相对于已定位的父元素

      3、对于position: fixed;的元素是相对于ViewPort（可视窗口）

   3. **vm**

      1. css3新单位，相对于视口的宽度或高度中较小的那个

      2. 其中最小的那个被均分为100单位的vm

      3. 比如：浏览器高度900px，宽度1200px，取最小的浏览器高度，1 vm = 900px/100 = 9 px

         缺点：兼容性差

6. 常见问题

   1. 假如使用em来设置文字大小要注意什么？

      1. 注意父元素的字体大小，因为em是根据父元素的大小来设置的。

         比如同样是1.5em，要是父元素是20，那1.5em就是30px.要是父元素是30px,1.5em就是45px（特别是在多重div嵌套里面更要注意）

   2. pc pt ch一般用在什么场景？

      这些我们网页设计基本上用不到，在排版上会有用处

      如何使 1rem=10px

      1. 在设置HTML{font-size：62.5%；}即可

   3. 如果父元素没有指定高度，那么子元素的百分比的高度是多少？

      会按照子元素的实际高度，设置百分比则没有效果

## 小技巧 ##

1. ```css
   属性
   transition: tarnsform 2s;	过度属性 完成tarnsform动画需要2秒
   transform: rotate(45deg);
   ```

行内本质是不可以设置宽高的，但是在当前元素脱离文档流之后就可以设置宽高（当前元素在页面上不占位）
      1 display： block  inline-block
   2 position：absolute fixed
      3 float：left right
   ```
   
   #### 选择器
   
   + ```css
     并列	div,p
     后代	div h2
     兄弟	div+h1
     子 div>h2	div#a > h2 选中盒子id为a的h2子标签
     属性选择器
     img[alt]	包含alt属性
     img[width="300"]	width属性等于300
     img[alt~="as"]	alt属性包含单词as
     
     ☞ 属性选择器： 
     [属性名=值] {}
     [属性名] {}	   匹配对应的属性即可
     [属性名^=值] {}    以值开头
     [属性名*=值] {}    包含
     [属性名$=值] {}	   以值结束
     
     ☞ 结构伪类选择器：
     ui li:nth-child(2){} 得用li 而不是ul	/*Arrly Li[1,2,3]*/
     :first-child {}     选中父元素中第一个子元素
     :last-child {}	  选中父元素中最后一个子元素
     :nth-child(n) {}    选中父元素中正数第n个子元素
     :nth-last-child(n) {}    选中父元素中倒数第n个子元素
     备注；
     n 的取值大于等于0
     n 可以设置预定义的值
     odd[选中奇数位置的元素]  
     even【选中偶数位置的元素】
     
     n 可以是一个表达式：
     an+b的格式
     
     ☞ 其他选择器：
     :target          /*被锚链接指向的时候会触发该选择器		
     锚链接被点击跳转过去后		当另一个被链接时,才会取消当前的*/
     ::selection	     当被鼠标选中的时候的样式
     :first-line	 选中第一行
     :first-letter	 选中第一个字符
     
     CSS Selectors Level4
     :not 排除	除了div中的.top和.right	暂时不能用
     div:not(.top, .right){}
     :is()	即将能用
     :is(header, main):hover{}	等价于 header:hover,main:hover{}
   ```

3. ```css
   @media screen and(max-width:1024px)and(orientation:portrait){}
   link /*链接样式表顺序很重要,下面的会覆盖上面的相同样式*/
   /* 将多个样式表引用到一个文件中添加进网页 */
   @import url(layout.css);
   @font-face {
       font-family: "额外字体";
       src: url("字体链接");
   }
   伪类:(pseudo-classes)
   :link 未访问	:visited 已访问
   :hover 鼠标悬浮
   属性简写:font: 字体大小/行高 字体,字体;
   
   滚动条
   ::-webkit-scrollbar 滚动条整体部分
   ::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动
   （或往左往右移动，取决于是垂直滚动条还是水平滚动条）
   ::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
   ::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
   ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
   ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
   ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
   ```
   
4. 页面居中

   + ```css
     div{
         position: absolute;
         margin: auto;
         top: 0;
         right: 0;
         left: 0;
         bottom: 0;
     }
     ```

5. 内容垂直居中

   + ```css
     div{
      justify-content: center;
      flex-direction: column;
      display: flex;
     }
     ```

6. 列表项目标记改成图片

   + ```css
     ul{
         list-style-type: none;
         /* list-style-image:url("bg/62484801.jpg"); */
         background: url("hj.gif") no-repeat 0rem 0.3rem;
         /* 背景 宽 高 */
         background-size: 1.2rem 1.2rem;
         /* 首行缩进 */
         text-indent: 2em;
     }
     ```

7. 背景设置

   + ```css
     div{
         width: 100%;
         height: 100%;
         border: 0 none;
         background-size: cover;
         background-repeat: no-repeat;
         background-position: center;
     }
     /* 可用与制作长预览图利用js控制需要显示的内容移动位置 */.a{
          overflow: hidden; /*溢出隐藏 */
     }
     ```

8. div保持宽高比

   + ```css
     通过借助padding-bottom我们就可以实现一个宽高比例固定的元素，以div为例。
     /*HTML
     <div class="wrapper">
     <div class="inner">
     这是内容
     </div>
     </div>
     CSS*/
     .wrapper {
       	position : relative;
         background: #ccc;
         width: 10%;
         padding-bottom : 20%;
     }
     .inner{
         position : absolute;
         margin:auto;
         top : 0; left : 0; right : 0; bottom : 0;
     }
     /*其中奥妙就在于padding-bottom:20%, padding-bottom 是相对宽度的.也就是整个Wrapper的高度等于padding-bottom 的高度,Wrapper没有内容高度.没有内容高度如何往其中放置我们准备的DIV呢?答案是 绝对定位, 所以Wrapper的样式中有position:relative, 方便子元素相对Wrapper的左顶点定位。*/
     利用伪元素
     <div class="wrapper">这是内容</div>
     .wrapper {
         background: #ccc;
         width: 10%;
         /* overflow: hidden; 这个可以不用::after*/
     }
     .wrapper::before {
         content: '';
         position: relative;
         padding-top: 200%;
         float: left;
     }
     .wrapper::after {
         content: '';
         display: block;
         clear: both;/* 浮动清除 */
     }
     ```
