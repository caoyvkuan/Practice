#  CSS

## 选择器

+ **继承：**即子类元素继承父类的样式;
+ **优先级：**是指不同类别样式的权重比较;
+ **层叠：**是说当数量相同时，通过层叠(后者覆盖前者)的样式。
+ **单冒号:** 伪类
  + 如:  `:hover` 选择器
+ **双冒号:** 伪元素
  + 如: `::after` 伪元素

### 优先级

+ 内部样式表   和   外联样式表	同样看顺序
+ 选择器级别权重(a,b,c,d)
  + a:行内( 1,0,0,0 )        b:ID( 0,1,0,0 )       c:类( ,0,01,0 )	 d:类型( 0,0,0,1 )
  + 每用一个就相应的位置加1     100个标签选择器也不会大于一个类选择器
  + div#box (0,1,0,1)

1. !important 	慎用。
2. 行内样式      作为style属性写在元素内的样式
3. id选择器
4. 类选择器
   1. 属性
   2. 伪类
5. 类型选择器 ( 例如:  h1  or ` ::before`   )
6. 通配符选择器(`*`)
7. 标签默认样式(浏览器自定义) 
8. 继承
   1. (有关于文本的属性可以继承)(`text-align  line-height`)
   2. 布局相关的不会被继承

+ 同一级别中后写入的会覆盖先写的样式
+ 同一级别css的引入方式不同,优先级不同
+ **通配选择符**（universal selector）（`*` **关系选择符**（combinators）（`+`, `>`, `~`, '` `', `||`)和 **否定伪类**（negation pseudo-class）（`:not()`）对优先级没有影响。（但是，在 `:not()` 内部声明的选择器会影响优先级）

### 选择器分类

+ 选择器尽量写3层以内,太多不利于代码优化

+ 标签选择器

+ 类选择器

  + 伪类选择器

    + ```css
      ☞ 结构伪类选择器：li:nth-of-type(2)  如果第二个2不是li则不会有效果
           ui li:nth-child(2){} 得用li 而不是ul	/*Arrly Li[1,2,3]*/
           :first-child {}     选中父元素中第一个子元素
      		:first-of-type
           :last-child {}	  选中父元素中最后一个子元素
      		:last-of-type
           :nth-child(n) {}    选中父元素中正数第n个子元素
           :nth-last-child(n) {}    选中父元素中倒数第n个子元素
           	:nth-of-type(n)
           	:nth-last-of-type(n)
      	p:only-child      选择每个p元素是其父级的唯一子元素时才生效
      	p:only-of-type   当父元素只有一个p子元素生效,不管其他子元素有多少
      		.span-class:nth-of-type(-2n+3)
              虽然所有元素都有相同的类span-class，
              但这里只会选择带有该类的span元素（因为第一个选中的元素的类型是span）。
           备注:
           odd[选中奇数位置的元素]   even【选中偶数位置的元素】
           n 可以是一个表达式：an+b的格式
          /*	从第三个开始每隔一个会选中一次	*/
          :nth-child(2n+3)					2n+2 	从第二个开始往后每隔一个选中一次
          :nth-child(-2n+3)	反方向选中		-2n+7   从第7个开始往前每隔一个选中一次
      
          /* 每4个选1个，但仅限于最后4项 */ 
          .Item:nth-child(4n+1):nth-last-child(-n+4), 
          /* 取得该集合后面的每一项 */ 
          .Item:nth-child(4n+1):nth-last-child(-n+4) ~ .Item
      	
      ☞ 其他选择器：
          
          
      
      CSS Selectors Level4
           :not 排除	:not(.not-me)	选中不包含(.not-me)
           	div:not(.top, .right){}
      		选中除了div中的.top和.right其他所有div
           :is()	即将能用
           :is(header, main):hover{}	等价于 header:hover,main:hover{}
      ```
      
    + **::first-line**	 选中第一行

    + **::first-letter**	 选中第一个字符

    + **::selection**           当被鼠标选中的时候或处于高亮状态的部分

    + **:target**

      + 被锚链接指向的时候会触发该选择器	锚链接被点击跳转过去后		
      + 当另一个被链接时,才会取消当前的

    + **:root**           选择文档的根元素

      + 同时也用于定义变量

    + **:empty**

      + 选中空元素           有空格不算空元素,只有注释算空元素

    + **:has**伪类

      + ```css
        暂时不能用
        a:has(figcaption) { 
         padding: 1rem; 
        } 
        这条规则可以给一个包含figcaption的a标签添加内边距。组合使用“取反”伪类，可以
        反转选择范围：
        a:not(:has(figcaption))
        ```

    + 可输入元素

      + **input:invalid**
        + 如果输入元素中的值是非法的
      + **input:valid**
        + 如果输入元素中输入的合法的   
      + **:focus**
        + 获取焦点时
      + **:enabled**
        + 选择每一个已启用的输入元素
      + **:checked**
        + 被选中的元素的输入元素
      + **:optional**
        + 用于匹配可选的输入元素
      + **:required**
        + 用于匹配设置了 "required" 属性的元素
      + **:out-of-range  |  :in-range**
        + 匹配值在指定区间之外或之内
      + **:read-write  |  read-noly**
        + 用于匹配可读及可写的元素  or 	用于匹配设置 "readonly"（只读） 属性的元素

    + **:disabled**

      + 选择每一个禁用的输入元素

    + 

    + a链接

      + **:link**      未被访问的链接(默认状态 )
      + **:visited**      被访问过的链接

    + **:active**       鼠标按住

    + **:hover**    鼠标悬浮

    + `:link | :visited | :hover |:active`

      + 这四个伪类在使用时应按照顺序使用,否则会存在覆盖的情况

  + 针对只有一项的选择符**:only-child**和唯一一个当前标签的选择符**:only-of-type**

  + 属性

    + ```css
      img[alt]	包含alt属性
      img[width="300"]	width属性等于300
           [属性名=值] {}
           [属性名] {}	   匹配对应的属性即可
           [属性名^=值] {}    以值开头
           [属性名*=值] {}    包含	[属性名~=值]
           [属性名$=值] {}	   以值结束	[属性名|=值] 
      ```

    + 字符串匹配的属性选择符(^ $ *三种，分别对应开始、结尾、包含)

+ ID选择器

+ 全局选择器(如：*号)

+ 并列选择器 div,span,img 

+ 层次选择器

  + 后代选择器 `#head ul li 选中包含在#head里的所有ui li    子孙级都选中`
  + 子选择器 (如：`div>p  |  div#a > h2` 选中盒子id为a的h2子标签)
  + CSS 相邻兄弟选择器器 (如:`div+h1`)
    +  h2 ~ div	匹配h2后跟着的所有兄弟div
  + 

### 伪元素

+ `::before  和  ::after`共同特效
  + `content:"";`   只有拥有这个属性才能显示
    + 属性值 `content:" "attr(class)" "`  可以获取元素的class属性追加元素的文本两侧
  + 都是行内元素
  + 配合**:empty**可实现占位符效果
    + `p:empty::before{ cotent:"提示文本"}`

+ **::before**
  + 在元素前插入内容和样式
+ **:after**
  + 在元素后插入内容和样式

## 常用知识

### CSS初始化

+ 默认样式
  + 没有默认样式的:`div span`
  + 有默认样式:`body h1-6 ul li p a`

+ ```css
  *{/*	缺点:这种初始化会影响效率 | 性能	     优点:简单快捷*/
      margin:0;
      padding:0;
  }
  ul{list-style:none;}  a{text-decoration:none; color:#666;} img{display:block;}
  /*	工作种初始化应使用并列的方法仅初始化用到的	*/
  h1,ul,li,ol,p{
      margin:0;
      padding:0;
  }
  一个网站写布局效果时
  1.写结构
  2.css重置样式(初始化 | 基础设置)
  3.(风格设置)
  4.写具体样式
  ```

### 流和盒子的显示方式

+ 行内元素
  + 垂直方向的外边距无效
  + 内边距会对其他元素造成影响
+ 行内元素和行内块元素设置内外边距都会对其他元素造成影响 
+ 浮动布局则不会对其他元素造成影响
+ 行内块与空白
+ 使用行内块（inline-block）来布局的最大问题，就是它会在HTML元素间渲染空白。这不是bug

#### **float**  浮动

+ 任何元素设置浮动后设置宽高都起作用
+ 会半脱离标准的文档流,显示在普通文档流之上
+ 浮动会导致父盒子高度塌陷
  + 清除塌陷方法:  给父盒子固定高度
  + 给父盒子设置:`overflow:hidden;`  因为有2种效果所以不完美
  + 给父盒子设置伪类: `:afte{clear:both;}`
+ 浮动会影响其后同级的块级元素    所以一般会在浮动布局外套个盒子
+ 上为行内块(inline-block)显示方式            下为浮动显示方式
+ ![img](images\ZQG0T7ZBI%XR(]H8)JLBW]5.png)

### 层叠性

+ 复合属性
  + 单属性一定要写在复合属性后面
  + 在复合属性前设置单属性会被覆盖掉

### 其他

+ 行内元素水平居中给父元素设置   `text-align:center;`
+ 块元素水平居中给自己设置       `margin:0 auto;`
+ img元素底部留白  `display:block;` 解决   原因:内联元素是延基线对齐
  + 解决方式2: `vertical-algin: bottom`  



+ 排版对齐方式
  + `vertical-algin: bottom  | baseline`(默认基线)

+ 文本分4条线  顶线	中线		基线	底线
  + 以W为例,  最上面为顶线  -- 中间为中线  --  底部为基线 --  在往下一点才是底线
  + 就好比4条线的拼音格

## 布局

### @符号

#### 媒体查询实现响应式

```css
@media screen and (min-width: 50em){
    /*	@media 指令高数浏览器这是一个媒体查询
    	screen 告诉浏览器这里的规则只适用于屏幕类型而and(min-width) 这其中的规则只适用于50em以上的情况	*/
}
@media (min-width: 500px){
    /*	页面宽度大与500px后才会应用当前位置的样式	*/
}

指针特性有三个值:none、coarse、fine	coarse 指针设备代表手指触屏	fine	鼠标或其他精确的指针设备
@media (pointer: coarse){
    /* 针对coarse指针的样式 */
}

/*	可悬停用 hover	可以悬停但需要步骤开启		on-demand	*/
@media (hover: none){/*		悬停特性	*/}

@media (light-level: normal) { 
 /* 针对标准亮度的样式 */ 
} 
@media (light-level: dim) { 
 /* 针对暗光线条件的样式 */ 
} 
@media (light-level: washed) { 
 /* 针对强光线条件的样式 */ 
}
```

#### 内部加载其他样式表

+ ```css
  @import url("phone.css") screen and (max-width:360px);
  在css中使用@import会增加HTTP请求(影响加载速度)
      媒体查询可用特性
      width：视口宽度。
      height：视口高度。
       orientation：设备方向是水平还是垂直。
       color：颜色组分的位深。比如min-color:16表示设备至少支持16位深。
       color-index：设备颜色查找表中的条目数，值必须是数值，且不能为负。
       monochrome：单色帧缓冲中表示每个像素的位数，值必须是数值（整数），比如monochrome: 2，且不能为负。
       resolution：屏幕或打印分辨率，比如min-resolution: 300dpi。也可以接受每厘米多少点，比如min-resolution: 118dpcm。
       scan：针对电视的逐行扫描（progressive）和隔行扫描（interlace）。例如720p HD TV（720p中的p表示progressive，即逐行）可以使用scan: progressive来判断； 而1080i HD TV（1080i中的i表示interlace，即隔行）可以使用scan: interlace来判断。
       grid：设备基于栅格还是位图
      除scan和grid都可以加上min或max
  ```

#### 字体设置

```css
@font-face { 
    font-family: 'robotoregular'; 
    src: url('Roboto-Regular-webfont.eot'); 
    src: url('Roboto-Regular-webfont.eot?#iefix') format('embeddedopentype'), 
        url('Roboto-Regular-webfont.woff') format('woff'), 
        url('Roboto-Regular-webfont.ttf') format('truetype'), 
        url('Roboto-Regular-webfont.svg#robotoregular') format('svg'); 
    font-weight: normal; 
    font-style: normal; 
}
与提供商前缀的机制很类似，浏览器也会依次尝试属性列表中的样式，忽略不能识别的内容（属性值越靠下，优先级越高）
```

### 布局技巧

#### 导航

+ 导航为什么要用ul li包裹
  + 因为seo搜索引擎优化  会认为叠在一起的a标签是在作弊,关键词堆砌

#### 最大最小宽高

+ `min-width | min-height`
+ `max-width | max-height`
+ 让宽高可以不固定,自动适应

#### 页面布局

+ background-size: cover	背景图片需要完整地铺满一个容器
+ 移动网页中通过 CSS 把一张大图缩小显示往往是不太明智的
+ 视口的宽度来决定列的数量
  + 弹性盒布局（即 Flexbox）或者 display: inline-block加上常规的文本折行行为，都可以实现这一点。
+ 在 使 用 多 列 文 本 时， 指 定 column-width（ 列 宽 ） 而 不 是 指 定column-count（列数），这样它就可以在较小的屏幕上自动显示为单列布局

#### 灵活使用单位

+ 将固定的像素大小转换为弹性比例

  + 结果 = 目标/上下文

  + ```css
    一个布局宽度为960px的三栏布局
    左侧栏200px	中间区域660px		右侧栏100px
    那么左侧栏就=200/960	也就是20.83%
    中间区域=	660/960		68.75%
    右边	=	 100/960	10.41%
    ```


1. 颜色单位	

   1. currentColor		当前颜色
   2. rgba()
   3. hsla()

2. 少用绝对值

3. 绝对值不容易维护

4. ```css
   /*只需覆盖background-color既可得到不同颜色的样式*/
   padding: .3rem .8rem;
   border: 1px solid rgba(0,0,0,.1);
   background: #58a linear-gradient(hsla(0,0%,100%,.2),
   transparent);
   border-radius: .2rem;
   box-shadow: 0 .05rem .25rem rgba(0,0,0,.5);
   color: white;
   text-shadow: 0 -.05rem .05rem rgba(0,0,0,.5);
   ```

#### 代码维护

+ 合理使用简写

+ ```css
  border-width: 10px 10px 10px 0;
  /*	相对于上面的方式虽然代码辆增加了但跟容易阅读和修改	*/
  border-width: 10px;
  border-left-width: 0;
  ```

+ ```css
  而当你使用简写属性时，解析器需要在没有属性名提示的情况下弄清楚 50% 50% 到底指什么。这就是需要引入斜杠的原因。
  background: url(tr.png) no-repeat top right / 2em 2em,
               url(br.png) no-repeat bottom right / 2em 2em,
               url(bl.png) no-repeat bottom left / 2em 2em;
  /*把公共部分抽出来写成扩展式属性*/
  background: url(tr.png) top right,
               url(br.png) bottom right,
               url(bl.png) bottom left;
  background-size: 2em 2em;
  background-repeat: no-repeat;
  ```

#### 自适应内部元素

+ `width:min-content;`	取值为容器内单词、图片的最大宽度
+ `width:max-content:clip`

1. 保持缩放比问题

   + 合理使用宽高单位
+ 采用rem 可控制全局大小
   + vw、vh、vmax、vmin
   + 可轻松保持缩放比例

#### 精确控制表格列宽

+ `table-layout:fixed;`
+ `overflow:hidden;text-overflow:heaide`

#### 根据兄弟元素的数量来设置样式

+ ```css
  :nth-child(4) ~ li	选中第4项以及后面所有
  :only-child 等效于	:first-child:last-child(4)
  :nth-child(n+4)
  li:first-child:nth-last-child(n+4),
  li:first-child:nth-last-child(n+4) ~ li
  /*会在正好只有4项的时候选中第一个*/
  
  li:first-child:nth-last-child(4),
  li:first-child:nth-last-child(4) ~ li {
   /* 当列表正好包含四项时，命中所有列表项 */
  }
  li:first-child:nth-last-child(-n+4),
  li:first-child:nth-last-child(-n+4) ~ li {
   /* 当列表最多包含四项时，命中所有列表项 */
  }
  ```

#### 满幅的背景,定宽的内容

+ ```css
  footer {
   padding: 1em;
   padding: 1em calc(50% - 450px);
   background: #333;
  }
  实现内容最大宽度900的居中效果;
  当内边距是 50% - 450px 时，只可能给内容留出 900px（2×450px）的可用空间。
  只有把 width 显式地设置为 900px 之外（或大或小）的其他值，我们才有可能看出区别
  利用padding达到内容居中定宽背景铺满的效果而不用两层元素来实现
  ```

#### 垂直居中

+ ```css
  main {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
  }
  利用tranform的位移属性translate实现居中
  内容高度过高会被裁切掉
  在某些浏览器显示模糊的问题可以用transform-style:preserve-3d;来修复
  
  main {
   width: 18em;
   padding: 1em 1.5em;
   margin: 50vh auto 0;
   transform: translateY(-50%);
  }
  只适用于窗口居中
  ```

+ 基于flexbox的解决方案

+ ```css
  body {
   display: flex;
   min-height: 100vh;
   margin: 0;
  }
  main {
   margin: auto;
  }
  Flexbox 中的margin:auto; 不仅在水平上将元素居中,垂直方向上同样如此
  
  不用布局也能居中
  align-self: center;
  ```

#### 紧贴底部的页脚

+ ```css
  body {
   display: flex;
   flex-flow: column;
   min-height: 100vh;
  }
  /*	贴近页脚的元素这样设置		高度会一直保持让页脚不动	*/
  利用了flex的垂直布局方式和flex的比例设置实现固定住页脚
  main{ flex:1;}
  ```


### flex弹性布局

1. ```css
   flex-basis:80;		设置弹性盒子子元素的基本宽度
   ☞ 设置父元素为伸缩盒子【直接父元素】
       display： flex
   	宽度超出会被压缩			高度超出会溢出	overflow
   
       为什么在伸缩盒子中，子元素会在一行上显示？
       1. 子元素是按照伸缩盒子中主轴方向显示
       2. 只有伸缩盒子才有主轴和侧轴
       3. 主轴： 默认水平从左向右显示
       4. 侧轴： 始终要垂直于主轴
   
   	简写:flex-flow: flex-dirextion flex-wrap ;
   ☞ 设置伸缩盒子主轴方向（flex-direction）
       flex-direction: row; 【默认值】
   	取值: row-reverse 反转	| column | column-reverse	|
   
       ☞ 设置元素是否换行显示（flex-wrap）
       1. 在伸缩盒子中所有的元素默认都会在一行上显示
       2. 如果希望换行： flex-wrap: wrap | nowrap;
   
   ☞ 设置元素在主轴的对齐方式( justify-content)
   /* 设置子元素在主轴方向的对齐方式 */
       justify-content: flex-start;
       取值: flex-end | center | space-between | space-around/*	环绕	*/
       justify-content: space-between;	/*	两端对齐中间自适应	*/
   
   ☞ 设置元素在侧轴的对齐方式 （align-items）	align-self	子元素单独决定对齐方式
       align-items: flex-start;
       取值: flex-end | center | stretch(默认值)(拉伸至父元素一样大)
   	规定align-items属性值baseline，规定基线对齐。
   	也就是元素中的文本都以第一个元素的文本的基线对齐。
   
   ☞ 设置元素换行后的对齐方式（ align-content)
       align-content: flex-start;
   	取值: flex-end | center | space-aroud | space- between
       /* 换行后的默认值 */	align-content: stretch;
   ```

+ *伸缩比*
  + 子盒子设置	flex:1;	分1份	flex:1  1(0禁止压缩)  width(auto)
  + 子项的flex属性	flex: 1(伸展)  1(收缩)	100px(基准);
  + 由三个结合flex-grow、flex-shrink、flex-basis
    + flex-grow（传给flex的第一个值）是相对于其他伸缩项，当前伸缩项在空间允许的情
        况下可以伸展的量。
    + flex-shrink是在空间不够的情况下，当前伸缩项相对于其他伸缩项可以收缩的量
    + flex-basis（传给flex的最后一个值）是伸缩项伸缩的基准值。
+ order可改变排列次序
  +  order:-1;就是要排在最前面
  + 其他改变需要给每个元素增加排列序号

### grid网格布局

### 其他布局

#### 多列布局

```css
改变viewport宽度会动态改变列数
column-width: 12em;

固定列数可变宽度
column-count: 4;

分割线
column-gap: 2em; 
column-rule: thin dotted #999; 
```

#### 表格布局

+ 表格与单元格

  + 别把display:table和display:table-cell与对应的HTML元素搞混！
  + CSS表格布局的很多实用之处。比如，跨平台绝对一致，而且能做到一个元素在另一个元素内垂直居中
  + 也不可能把设置为display:table-cell的项目包到多行上

+ **table-layout: fixed;**  设置表格布局算法

  + fixed : 列宽由表格宽度和列宽度设定
  + automatic : 默认。列宽度由单元格内容设定。

+ ```css
  display:table-row;	行
  display:table-cell; 单元格
  vertical-align:top; 相对单元格上边对齐
  border-spacing:10px; 表示未单元格增加10px的边框间距
  ```

  

## 盒子模型

+ **margin**外边距合并
  + 垂直排列的两个块元素外边距会合并,外边距等于大的一方
+ 外边距塌陷(也叫**margin**传递问题)出现在嵌套结构种且只有**margin-top**会发生传递
  + 嵌套的两个块元素,当给子元素设置向上的外边距时,此时父盒子会跟着掉下来
  + 解决方案:
    + 给父盒子:`overflow:hidden;`
    + 给父盒子设置上边框
+ **centent-box** 
  + 该模式的块元素不设置宽度的情况下除非padding和border大与父盒子宽度才会把盒子撑大

+ ```css
  /* 通过box-sizing这个样式我们可以改变这种宽度计算方式，
  它的属性值有两个：content-box和border-box。*/
  默认值为content-box，也就是标准的盒子模型，此时的计算公式为:
  width | height = centent
  padding  和  border  需要单独计算
  
  border-box计算方式:
  width | height = centent+padding+border
  width 和 height	计算包括	padding 和 border	不需要额外计算
  
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

## CSS属性值

### 自定义属性

+ 定义/使用

+ ```css
  定义
  :root{
      --black-border:1px solid black;
  }
  引用
  div{
      border:var(--black-border);
  }
  
  const vh = document.documentElement.clientHeight;
  document.documentElement.style.setProperty('--view-height', vh+'px');
  操作自定义属性
  ```

### 属性

+ **overflow**  溢出
  + visible 可见(默认)     hidden (隐藏)   scroll (显示滚动条)   auto
+ **opacity**  透明度(`0(透明)~1(不透明)`)
  + 元素内所有内容都会透明

### 其他实用属性

+ `box-decoration-break`(盒子装饰断裂)
  + 文字换行时有圆角属性背景会出现明显的断裂
  + 值设置为`clone`可以修复这种断裂    默认值(slice)
  + 可影响的属性有:`background border border-image box-shado border-radius clip-path margin padding`
+ **cursor**  鼠标样式

### 过度

+ ```css
  transition: property duration timing-function delay ;
  
      transition属性是个复合属性，她包括以下几个子属性：
  
      transition-property ：规定设置过渡效果的css属性名称
  		取值:none |all |property;	值为指定的css属性应用过渡效果，多个属性用逗号隔开
  
      transition-duration ：规定完成过渡效果需要多少秒或毫秒
  		此属性为0不会产生过度效果
  
      transition-timing-function ：指定过渡函数，规定速度效果的速度曲线
  		取值:linear | ease | ease-in | ease-out | ease-in-out | chbic-bezier(n,n,n,n)
  			linear: 恒速	ease: 由快到慢到更慢	ease-in:越来越快	ease-out:越来越慢
  			ease-in-out:先加速后减速
  
      transition-delay ：指定开始出现的延迟时间  1s  就是触发后延迟1秒在执行
  
  	默认值分别为：all 0 ease 0 
  	transition: tarnsform 2s;	过度属性 完成tarnsform动画需要2秒
  a{ transition: background 0.8s ease-in 0.3s,color 0.6s ease-out 0.3s;}
  
  在不同的时间段内过度不同的属性
  transition-property: border, color, text-shadow; 
  transition-duration: 2s, 3s, 8s; 
  
  * {/*	有趣?	*/
   transition: all 1s; 
  } 
  ```

### 2D转换3D转换

```css
/* 2d转换位移： 改变元素位置 */无法控制行内元素只能控制块级元素
☞ 位移
	transform: translate(X,Y);			transform: translate(100px,100px);
	备注：
		位移是相对元素自身的位置发生位置改变
☞ 缩放
	transform: scale(W,H);				transform: scale(0.5,1);
    备注：
    	取值为倍数关系，缩小大于0小于1，放大设置大于1
☞ 旋转
    transform: rotate(60deg);
    备注：
		取值为角度
☞ 倾斜
    transform: skew(30deg,30deg);
    备注：
        第一个值代表沿着x轴方向倾斜
        第二个值代表沿着y轴方向倾斜

	matrix：允许你以像素精度来控制变形效果
		matrix(1.678, -0.256, 1.522, 2.333, -51.533, -1.989)

    transform-origin 属性
    使用transform-origin，可以修改变形原点。

/*	3D	*/
/* 透视: 在网页中实现近大远小的立体效果 */
perspective: 1000px;	/* 一般600px ~ 1000px */
☞ 位移
    transform: translateX()  translateY()   translateZ()

☞ 旋转
    transform: rotateX(60deg)  rotateY(60deg)  rotateZ(60deg);

☞ 缩放
    transform: scaleX(0.5)  scaleY(1)  scaleZ(1);

☞ 倾斜
    transform: skewX(30deg) skewY();

transform: rotateX(180deg) translate3d(0, 0, -120px);/*	translate3d(X, Y, Z)	*/

    ☞ transform-style: preserve-3d;
	将平面图形转换为立体图形	这告诉浏览器，当我们要为这个元素创造变形效果时，它的子元素也保持3D效果
```



### 动画

1. ```css
   /* 调用  动画名称 */
   animation-name: rotate;
   /* 连写	时间 第一个是执行时间	第二个是延迟执行时间 */
   animation:rotate 2s infinite linear alternate 1s forwards;
   /* 设置动画时间 */
   animation-duration: 2s;
   
   /* 设置动画执行的次数:  infinite 无限执行; */
   animation-iteration-count: infinite;
   
   /* 动画执行的速度类型	同过度速度类型一样 */
   animation-timing-function: linear;
   
   /* 设置动画逆波 	动画结束后从结尾回放到开头	*/
   /*	alternate:正常回放	alternate-reverse:交替反向	reverse:倒放	*/
   animation-direction: alternate;	normal | reverse | alternate | alternatereverse; 
   
   /* 设置动画延时 */
   animation-delay: 1s;
   
   /* 设置动画结束时候的状态 	不是无限执行时有效
   forwards:停在动画结束状态		backwards:回到开始动画状态	*/
   animation-fill-mode: forwards;	none | forwards | backwards | both; 
   
   /* 动画暂停 */
   animation-play-state: paused; | running
   /* 1定义动画集 */
   @keyframes  rotate {
       /* 定义开始状态  0%*/
       from {
           transform: rotateZ(0deg);
       }
       /* 结束状态 100%*/
       to {
           transform: rotateZ(360deg);
       }
   }
   注意：
   1. 如果设置动画集使用的是百分比，那么记住百分比是相对整个动画执行时间的。
   ```

### 背景

+ **background**
  + `background: color  image(url()) repeat position;`
  + `repeat: (默认: 平铺) no-repeat | repeat-x | -y` 是否平铺
  + `position: left(默认)/center/right top(默认)/center/bottom;`图片的位置
    + `position:right 20px bottom 20px`

```css
/*默认盒子的背景图片是在盒子的内边距左上角对齐设置的*/
background: pink url("1.png") no-repeat;/*不平铺时*/
background-origin: content-box;
background-origin：   规定背景图片的定位区域。
	☞ padding-box    背景图像相对内边距定位（默认值）
	☞ border-box	 背景图像相对边框定位【以边框左上角为参照进行位置设置】
	☞ content-box    背景图像相对内容区域定位【以内容区域左上角为参照进行位置设置】
/*平铺时	背景裁切  精灵图 */
background-clip：  	 规定背景的绘制区域。
	background-color	默认值	border-box
	☞ border-box	 背景被裁切到边框盒子位置 【将背景图片在整个容器中显示】
	☞ padding-box	 背景被裁切到内边距区域【将背景图片在内边距区域（包含内容区域）显示】
	☞ content-box	 背景被裁切到内容区域【将背景图片在内容区域显示】

background-size：wdith height;   		/*规定背景图片的尺寸。*/
	☞ cover			/* 将背景图片按原来的缩放比将整个容器铺满	可等比例缩小*/
	☞ contain		/* 将背景图片按照原来的缩放比，完整的显示到容器中 	不确定是否会将容器填充满*/

background-attachment: fixed;背景固定
/*	背景定位	*/
background-position
```

#### 灵活的背景定位

+ background-position 的扩展语法方案

  + ```css
    如果想让背景图片跟右边缘保持 20px 的偏移量，同时跟底边保持 10px 的偏移量
    background-position: right 20px bottom 10px;
    
    回退方案
    background: url(code-pirate.svg) no-repeat bottom right #58a;
    background-position: right 20px bottom 10px;
    
    padding: 10px;
        background: url("code-pirate.svg") no-repeat #58a
         bottom right; /* 或 100% 100% */
        /*	改变背景图片的默认定位方式	*/
        background-origin: content-box;
    ```

+ calc()方案

  + ```css
    把背景图片定位到距离底边 10px 且距离右边 20px 的位置
    background: url("code-pirate.svg") no-repeat;
    background-position: calc(100% - 20px) calc(100% - 10px);
    ```

### 渐变

```css
☞ 线性渐变：
1. 开始颜色和结束颜色
2. 渐变的方向
3. 渐变的范围
在渐变前添加前缀repeagting重复渐变效果	repeagting-linear-gradient()

background:  linear-gradient(
    to right,/*	方向支持deg	*/
    red -20%,/* 从不可见的位置就开始 */
    blue 20%
);
备注：
表示方向：
1. to + right | top | bottom | left 
2. 通过角度表示一个方向
0deg [从下向上渐变] 
90deg【从左向右】
background-image:  linear-gradient(
    /* to right, */
    135deg,
    /* to right, */
    red 20%,
    blue 20%,
    blue 40%,
    red 40%,
    red 60%,
    blue 60%,
    blue 80%,
    red 80%
);

/* 径向渐变 */
径向渐变	直径12rem的圆形渐变	circle会生成占满整个圆形容器的渐变效果
设置为40px 30px会生成一个X方向宽为40像素、Y方向高为30像素的椭圆形
设置为ellipse会生成和容器大小一致的椭圆形
at top right表示径向渐变的中心在右上方
at right 100px top 20px表示径向渐变的中心在距右边框100像素、上边框20像素处
at center left表示径向渐变的中心在左边框中间处

background: radial-gradient(12rem circle at bottom, yellow, orange, red); 

为响应式而生的关键字
 closest-side：在渐变形状为圆形的情况下，渐变形状会与距离中心最近的边框相切；在椭圆形的情况下，则会与距离中心最近的两个边框相切。
 closest-corner：渐变形状会与距离中心最近的角相切。
 farthest-side：和closest-side相反。在圆形的情况下，与距离中心最远的边相切。在椭圆的情况下，与距离中心最远的两边相切。
 farthest-corner：渐变形状会与距离中心最远的角相切。
 cover：等价于farthest-corner。
 contain：等价于closest-side。
```

### 边框

+ **border**
  + `border: width style color`
  + width (默认:3px)      style(默认:无)    color(默认:black)
  + style :  solid 实线   |   dashed  虚线  |  dotted  点状线
+ **outline**
  + 轮廓线  `outline:none;` 去除轮廓线

```css
border-radius: 10px;	/* 圆角*/
/* 阴影 */
box-shadow: 0px 0px 10px red,	/* box-shadow: X Y 模糊(Ambiguity) color; */
 5px -5px 10px blue;
/* 边框图片 */
border-image-source: url("2.png");
/* 边框图片裁切 : 不需要带单位  九宫格裁切 4个值 4个角*/
border-image-slice: 20;
/* 设置边框图片的平铺方式 默认(stretch) */
/* border-image-repeat: stretch;  拉伸*/
border-image-repeat: round;		/* 平铺 细节优化 */
/*  border-image-repeat: repeat; 平铺   细节不好 */
border-image-width: 20px;

/*	一定长度的边框		*/
border-top: 1em solid transparent;
border-image: 100% 0 0 linear-gradient(90deg,
currentColor 80%,transparent 0);
```

#### 半透明边框

+ ```css
  border: 10px solid hsla(0,0%,100%,.5);
  background: white;
  /*	规定背景的绘制区域。background-color默认为 border-box	所以不规定背景绘制区域无法看到透明边框	*/
  background-clip: padding-box;
  ```

#### 多重边框

+ ```css
  background: yellowgreen;
  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;
  
  box-shadow 是层层叠加的，第一层投影位于最顶层，依次类推。
  因此，你需要按此规律调整扩张半径。
  比如说，在前面的代码中，我们想在外圈再加一道 5px 的外框，那就需要指定扩张半径的值为15px（10px+5px）。
  
  投影的行为跟边框不完全一致，因为它不会影响布局，而且也不会
  受到 box-sizing 属性的影响。不过，你还是可以通过内边距或外边
  距（这取决于投影是内嵌和还是外扩的）来额外模拟出边框所需要
  占据的空间
  ```

+ ```css
  outline	方案
  outline（描边）属性来产生外层的边框。这种方法的一大优
  点在于边框样式十分灵活，不像上面的 box-shadow 方案只能模拟实线边框
  
  outline: 5px dashed deeppink;
  outline-offset: -15px;
  
  描边的另一个好处在于，你可以通过 outline-offset 属性来控制它跟
  元素边缘之间的间距，这个属性甚至可以接受负值。实现了简单的缝边效果
  ```

#### 边框圆角

+ ```css
  background: tan;
  border-radius: .8em;
  padding: 1em;
  box-shadow: 0 0 0 .6em #655;
  outline: .6em solid #655;
  outline 描绘边框
  box-shadow 填补边框空隙
  到底多大的投影扩张值可以填补这些空隙呢？
  在我们的例子中，border-radius 是 .8em，那么最小的扩张值就
  是 0.8*(根号2−1) ≈ 0.331 370 85 em 。我们要做的就是把它稍微向上取个整，
  把 .34em 设置为投影的扩张半径。
  ```

### 文本

+ **font**  复合属性
  + `font: style weight size/lineHeight family ;`
  + font 简写必需要有字号和字体  size | family
  + **font-style** 
    + normal	正常
    + *italic*   倾斜
+ **text-indent** 首行缩进只对文本起作用
+ **text-decoration: none ;**无
  + underline  下划线
  + overline     上划线
  + line-through    中划线
+ 过多字母连在一起会被认为是一个单词,不会换行
  + `word-break:break-all` 	强制换行
  + `overflow-wrap: break-word;`	解决换行问题

```css
/*	断字	*/
word-wrap:break-word;
/*	截短文本	让超出范围的文字以省略号显示	*/
overflow: hidden;
text-overflow: ellipsis; 
white-space: no-wrap; 

☞word-break: break-all;	自动换行
```

### 阴影

+ 盒子阴影

  + ```css
    box-shadow: 0px 3px 5px #444;
    
    内阴影
    box-shadow: inset 0 0 40px #000;
    同样可使用多重
    还能用负值
    ```

+ 文字

  + ```css
    ☞text-shadow：X Y 模糊 color; 设置文本阴影
    	多阴影
        text-shadow: 0px 1px #fff,
                    4px 4px 0px #dad7d7;
    ```

    



## CSS兼容

```css
/*	谷歌支持	火狐暂不支持	*/
/*	圆锥渐变	*/
background: conic-gradient(red, yellow, lime, aqua, blue, fuchsia, red);
```

## CSS实用小技巧

1. 表格边框

   1. ```css
      table{
          border: 1px solid #000;
          /* 单元格与单元格之间的距离 */
          border-spacing:0;
          /* 边框重叠折叠  1px边框 */
          border-collapse:collapse;
      }
      td{
          border:1px solid #000;
      }
      ```

      

+ 行内本质是不可以设置宽高的，但是在当前元素脱离文档流之后就可以设置宽高
+ （当前元素在页面上不占位）

1. `display： block  or inline-block`
2. `position：absolute or fixed`
3. `float：left or right`

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

5. 列表项目标记改成图片

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

6. 背景设置

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

7. div保持宽高比

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

## 回退

+ **`@supports`**

  + ```css
    @supports (text-shadow: 0 0 .3em gray) { 
     h1 {
     color: transparent;
     text-shadow: 0 0 .3em gray; 
     }
    }
    ```

+ 如果要检测某个样式属性是否被支持，核心思路就是在任一元素的 element.style 对象上检查该属性是否存在：

+ ```js
  var root = document.documentElement; // <html>
  if ('textShadow' in root.style) {
   root.classList.add('textshadow');
  }
  else {
   root.classList.add('no-textshadow');
  }
  
  function testProperty(property) {
   var root = document.documentElement;
   if (property in root.style) {
   root.classList.add(property.toLowerCase());
   return true;
   }
   root.classList.add('no-' + property.toLowerCase());
   return false;
  }
  ```

+ 检测某个具体的属性值是否支持，那就需要把它赋给对应
  的属性，然后再检查浏览器是不是还保存着这个值。很显然，这个过程会改
  变元素的样式，因此我们需要一个隐藏元素

+ ```js
  var dummy = document.createElement('p'); 
  dummy.style.backgroundImage = 'linear-gradient(red,tan)';
  if (dummy.style.backgroundImage) {
   root.classList.add('lineargradients');
  } 
  else {
   root.classList.add('no-lineargradients');
  }
  
  function testValue(id, value, property) { 
   var dummy = document.createElement('p'); 
   dummy.style[property] = value;
   if (dummy.style[property]) { 
   root.classList.add(id);
   return true;
   }
   root.classList.add('no-' + id);
   return false; 
  }
  ```

