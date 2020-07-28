# CSS揭秘

## 结构与布局

#### 自适应内部元素

+ `width:min-content;`	取值为容器内单词、图片的最大宽度
+ `width:max-content:clip`

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
  当内边距是 50% - 450px 时，只可能给内容留出 900px（2×450px）的可用空间。
  只有把 width 显式地设置为 900px 之外（或大或小）的其他值，我们才有可能看出区别
  利用padding达到内容居中定宽背景铺满的效果
  而不用两层元素来实现
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

  

## CSS技巧

#### 页面布局

+ background-size: cover	背景图片需要完整地铺满一个容器
+ 移动网页中通过 CSS 把一张大图缩小显示往往是不太明智的
+ 视口的宽度来决定列的数量
  + 弹性盒布局（即 Flexbox）或者 display: inline-block加上常规的文本折行行为，都可以实现这一点。
+ 在 使 用 多 列 文 本 时， 指 定 column-width（ 列 宽 ） 而 不 是 指 定column-count（列数），这样它就可以在较小的屏幕上自动显示为单列布局

#### 灵活使用单位

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

  

## 背景与边框

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

#### 条纹背景

+ 线性渐变

  + ```css
    background: linear-gradient(#fb3 20%, #58a 80%);
    /*	减小渐变过度达成条纹	*/
    background: linear-gradient(#fb3 50%, #58a 50%);
    background-size: 100% 30px;
    
    如果我们把第二个色标的位置值设置为 0，那它的位置就总是会被浏览器调整为前一个色标的位置
    background: linear-gradient(#fb3 33.3%, #58a 0, #58a 66.6%, yellowgreen 0);
    background-size: 100% 45px;
    
    垂直条纹只需改变渐变方向
    background: linear-gradient(to right, /* 或 90deg */
     #fb3 50%, #58a 0);
    background-size: 30px 100%;
    
    斜向条纹
    background: linear-gradient(45deg,
    #fb3 24%, #58a 0, #58a 49%,
    #fb3 0, #fb3 74%, #58a 0);
    background-size: 30px 30px;
    ```

+ repeating-linear-gradient() 和 repeating-radial-gradient()

  + ```css
    background: repeating-linear-gradient(60deg, #fb3 0 15px, #58a 0 30px);
    /*	可以随便改变角度 而不用考虑贴合	*/
    background: repeating-linear-gradient(45deg,
     #fb3, #58a 30px);
    
    background: repeating-linear-gradient(45deg,
     #fb3, #fb3 15px, #58a 0, #58a 30px);
    相当于
    background: linear-gradient(45deg,
     #fb3, #58a 30px,
     #fb3 30px, #58a 60px,
     #fb3 60px, #58a 90px,
     #fb3 90px, #58a 120px,
     #fb3 120px, #58a 150px, ...);
    ```

+ 同色透明条纹

  + ```css
    background: #58a;
    background-image: repeating-linear-gradient(30deg,
     hsla(0,0%,100%,.1),
     hsla(0,0%,100%,.1) 15px,
     transparent 0, transparent 30px);
    ```

#### 复杂的背景图案

+ ```css
  background: #58a;
  background-image:
   linear-gradient(white 2px, transparent 0),
   linear-gradient(90deg, white 2px, transparent 0),
   linear-gradient(hsla(0,0%,100%,.3) 1px,
   transparent 0),
   linear-gradient(90deg, hsla(0,0%,100%,.3) 1px,
   transparent 0);
  background-size: 75px 75px, 75px 75px,
   15px 15px, 15px 15px;
  ```

+ 径向渐变

  + ```css
    background: #655;
    background-image: radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
    
    background: #655;
    background-image: radial-gradient(tan 30%, transparent 0),
     radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    ```

+ SCSS

  + ```scss
    @mixin polka($size, $dot, $base, $accent) { SCSS background: $base;
     background-image:
     radial-gradient($accent $dot, transparent 0),
     radial-gradient($accent $dot, transparent 0);
     background-size: $size $size;
     background-position: 0 0, $size/2 $size/2;
    }
    
    @include polka(30px, 30%, #655, tan);
    ```

+ 棋盘

  + ```css
    background: #eee;
    background-image:linear-gradient(45deg,
         rgba(0,0,0,.25) 25%, transparent 0,
         transparent 75%, rgba(0,0,0,.25) 0),
         linear-gradient(45deg,
         rgba(0,0,0,.25) 25%, transparent 0,
         transparent 75%, rgba(0,0,0,.25) 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
    ```

  + ```scss
    @mixin checkerboard($size, $base,
     $accent: rgba(0,0,0,.25)) {
     background: $base;
     background-image:
     linear-gradient(45deg,$accent 25%, transparent 0,
     transparent 75%, $accent 0),
     linear-gradient(45deg,
     $accent 25%, transparent 0,
     transparent 75%, $accent 0);
     background-position: 0 0, $size $size,
     background-size: 2*$size 2*$size;
    }
    /* 调用时是这样的…… */
    @include checkerboard(15px, #58a, tan);
    ```

+ 圆锥渐变

  + ```css
    /*	谷歌支持	火狐暂不支持	*/
    background: conic-gradient(red, yellow, lime, aqua, blue, fuchsia, red);
    
    background: repeating-conic-gradient(#bbb 0, #bbb 25%, #eee 0, #eee 50%);
    background-size: 30px 30px;
    ```

#### 伪随机背景

+ ```css
  background: hsl(20, 40%, 90%);
  background-image:
   linear-gradient(90deg, #fb3 10px, transparent 0),
   linear-gradient(90deg, #ab4 20px, transparent 0),
   linear-gradient(90deg, #655 20px, transparent 0);
  background-size: 80px 100%, 60px 100%, 40px 100%;
  图案每隔 240px 就会重复一次。
  这里贴片的尺寸实际上就是所有 background-size 的最小公倍数，而 40、60 和 80
  的最小公倍数正是240
  
  background: hsl(20, 40%, 90%);
  background-image:
   linear-gradient(90deg, #fb3 11px, transparent 0),
   linear-gradient(90deg, #ab4 23px, transparent 0),
   linear-gradient(90deg, #655 41px, transparent 0);
  background-size: 41px 100%, 61px 100%, 83px 100%;
  根据这个逻辑，要让这种随机性更加真实，我们得把贴片的尺寸最大化。感谢数学，我们不需要苦苦思索如何做到这一点，因为我们已经知道答案了。为了让最小公倍数最大化，这些数字最好是“相对质数”
  举例来说，3、4 和 5 是相对质数，因此它们的最小公倍数就是 3×4×5=60。
  
  这个技巧被 Alex Walker 定名为“蝉原则”，他最先提出了通过质数来
  增加随机真实性的想法。请注意这个方法不仅适用于背景，还可以用于其他
  涉及有规律重复的情况
  ```

#### 连续的图像边框

+ 最简单的办法是使用两个 HTML 元素：一个元素用来把我们的石雕图片设为背景，另一个元素用来存放内容，并设置纯白背景，然后覆盖在前者之上

+ ```css
  padding: 1em;
  border: 1em solid transparent;
  background: linear-gradient(white, white),
   url(stone-art.jpg);
  background-size: cover;
  background-clip: padding-box, border-box;
  
  padding: 1em;
  border: 1em solid transparent;
  background:
   linear-gradient(white, white) padding-box,
   url(stone-art.jpg) border-box 0 / cover;
  
  /*	渐变边框	*/
  padding: 1em;
  border: 1em solid transparent;
  background: linear-gradient(white, white) padding-box,
   repeating-linear-gradient(-45deg,
   red 0, red 12.5%,
   transparent 0, transparent 25%,
   #58a 0, #58a 37.5%,
   transparent 0, transparent 50%)
   0 / 5em 5em;
  
  /*	动态边框	*/
  @keyframes ants { to { background-position: 100% } }
  .marching-ants {
   padding: 1em;
   border: 1px solid transparent;
   background:
   linear-gradient(white, white) padding-box
   repeating-linear-gradient(-45deg,
   black 0, black 25%, white 0, white 50%
   ) 0 / .6em .6em;
   animation: ants 12s linear infinite;
  }
  ```

  