# CSS

## 布局 ##

1. 表格布局

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
  

## 小技巧 ##

1. ```css
   属性
   transition: tarnsform 2s;	过度属性 完成tarnsform动画需要2秒
   transform: rotate(45deg);
   ```

   

2. 选择器

   + ```css
     并列	div,p
     后代	div h2
     兄弟	div+h1
     子 div>h2	div#a > h2 选中盒子id为a的h2子标签
     属性选择器
     img[alt]	包含alt属性
     img[width="300"]	width属性等于300
     img[alt~="as"]	alt属性包含单词as
     
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
   :first-letter {}选中首字母
   :first-line {} 选中第一行
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
