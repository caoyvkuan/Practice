# Canvas

+ 标签内容为不支持 canvas 时显示
+ 画布大小需要通过 width 和 height 来进行设置
  + 不要通过 css 设置大小,css设置的是画布被拉伸之后的大小

+ requestAnimationFrame 方法用于通知浏览器是否优化动画显示

## 基础方法(在 canvas 元素上调用)

+ 通过 canvas 元素上的 getContext 方法获取画布上下文进行绘制

+ toDataURL 导出画布上的图像
  + 导出 png -> toDataURL("image/png")

## 2D 绘图上下文

+ 参数单位都为'像素'
```js
//获取画布上下文对象
const cvs = canvas.getContext("2d");
//清屏
cvs.clearRect(0, 0, canvas.width, canvas.height);

+ 填充和描边属性可以使用 : 字符串(任意格式的 CSS 颜色),渐变对象,图案对象
1. 填充 - 自动填充形状
  cvs.fillStyle = "red";
  cvs.fill();
2. 描边 - 为图形描边
  cvs.strokeStyle = "#0000ff";
  cvs.stroke();

3. save() - 保存当前配置 如 : fillStyle 设置的颜色
4. restore() - 回到上一次保存的配置
  + 可以多次保存,如同一个列表,然后多次返回也可以依次返回

5. 设置绘制透明度
  cvs.globalAlpha = 0.5;
```

### 矩形绘制

+ fillRect(X, Y, width, height) - 绘制填充矩形
+ strokeRect(...) - 绘制矩形边框
+ clearRect(...) - 清除画布指定区域
```js
// 绘制并填充矩形
  cvs.fillStyle = "red"; // 指定填充颜色
  cvs.fillRect(10, 10, 50, 50); // 进行绘制

// 绘制边框矩形
  cvs.strokeStyle = "#0000ff"; // 指定边框颜色
  cvs.strokeRect(10, 10, 50, 50);

//清除画布
canvas.clearRect(10, 10, 50, 50);
```

### 路径绘制

+ 开始前需要调用 beginPath() 创建路径 //开启新图层,防止重绘
```js
1. moveTo(x, y) 移动绘制点 - 落笔

2. lineTo(x, y) 绘制直线 - 连线,一般与 moveTo 方法一起使用

3. rect(x, y, width, height) 以路径的方式绘制一个矩形
  + 路径创建完成后可以使用 closePath() 方法绘制一条返回起点的线
  + 路径完成后可以使用 fill() 方法填充 或 stroke() 方法描边
  + clip() 方法创建一个新剪切区域

4. arc(X, Y, radius, startAngle, endAngle, counterclockwise)
  + 以 (X , Y) 坐标为圆心, radius 为半径绘制一条弧线
  + startAngle, endAngle 为起始和结束角度(弧度)
  + counterclockwise 是否逆时针计算起始和结束角度,默认顺时针

5. isPointInPath(x, y) 方法判断指定坐标是否在路径上

6. arcTo(x1, y1, x2, y2, radius)
  + 给定半径 radius 绘制一条从 (x1, y1) 到 (x2, y2) 的弧线

7. bezierCurveTo(c1x, c1y, c2x, c2y, x, y) 绘制三次贝塞尔曲线

8. quadraticCurveTo(cx, cy, x, y) 绘制二次赛贝尔曲线
```

### 文本绘制

+ fillText(text, x, y, width) - 填充
  + 颜色通过 fillStyle 指定
+ strokeText(...) - 描边

+ measureText(text) - 返回 TextMetrics 对象
  + width 属性表示绘制的文本所占宽度 - 可以了解文本所占宽度是否超出范围

+ font - 以 CSS 语法指定文本样式
+ textAlign - 文本对齐方式
+ textBaseline - 文本基线
```js
// 设置字体样式
cvs.font = "bold 14px Arial";
cvs.textAlign = "center";
cvs.textBaseLine = "middle";
```

### 变换

+ rotate(angle) - 围绕原点旋转图像
+ scale(scaleX, scaleY) - 缩放 - 默认都为 1.0
+ translate(x, y) - 移动原点 - 坐标(0, 0) 就会变成(x, y)
+ transform(m1_1, m1_2, m2_1, m2_2, dx, dy)
  + 通过矩阵乘法直接修改矩阵
  + m1_1, m1_2, dx
  + m2_1, m2_2, dy
  + 0   , 0   , 1
+ setTransform(...) - 重置为默认值,然后在以传入的参数调用 transform

### 图像绘制

+ img 可以是 img 元素,也可以是 canvas 对象
+ drawImage(ImgHtmlElement, X, T) - 方式一 : 传入图像和位置
  + (img, x, y, width, height)
  + (img, x, y, width, height, target.X.Y.W.H...); 9个参数

### 阴影绘制

+ 属性
+ shadowColor = "red"; -- CSS颜色值
+ shadowOffsetX = 10;	-- 偏移量, 默认为 0
+ shadowOffsetY = 10;
+ shadowBlur = 5;	-- 模糊度 默认为 0

### 渐变

+ 线性渐变通过 CanvasGradient 的实例表示
```js
// 在画布上创建渐变范围,范围外绘制的渐变图形无效
let gradient = cvs.createLinearGradient(X, Y, width, height)
// 设定渐变颜色 色标位置(0 ~ 1)
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
// 使用
cvs.fillStyle = gradient;

// 径向渐变, 通常都是同心圆所以两个圆的中心点需要相同
let gradient = cvs.createRadialGradient(x1, y1, radius, x2, y2, radius)
```

### 图案

+ 通过 createPattern 方法创建
```js
// 第二个参数与 css 的 background-repeat 相同
let pattern = cvs.createPattern(img, "repeat");
cvs.fillStyle = pattern;
cvs.fillRect(10, 10, 150, 150);
```

### 图像数据

+ 通过 getImageData 方法获得原始图像数据
```js
// 返回 ImageData 实例
let imageData = cvs.getImageData(x, y, width, height);
// 实例包含 3 个属性 宽高和原始像素信息数组 data
+ 在 data 中每一个像素都有 4 个值表示,也就是 data[0 ~ 3]
+ 分别表示 红 绿 蓝 透明度 4 个值
```

## 绘制方法
``` js

线宽： canvas.lineWidth="10";   备注：不需要带单位	线宽为线体上下各 5

线连接方式：lineJoin: round(圆角) | bevel(平角) | miter (默认:尖角)

线帽（线两端的结束方式）：  lineCap: butt(默认值) | round(半圆闭合) | square(方块闭合)


闭合路径： canvas.closePath()
//画圆X
//canvas.arc(X, Y, 半径, sAngle, eAngle);
sAngle : 起始角，以弧度计（弧的圆形的三点钟位置是 0 度）。
eAngle : 结束角，以弧度计
canvas.arc(300, 200, 100, 0, 2 * Math.PI);
//counterclockwise	可选。规定应该逆时针还是顺时针绘图。
//False = 顺时针，true = 逆时针
☞ 0度角在哪？
  以圆心为中心向右为0角 顺时针为正，逆时针为负
☞ 备注：
  特殊值	π = Math.PI
  0度 = 0弧度
  30度 = π/6   (180度的六分之一)
  45度 = π/4   
  60度 = π/3
  90度 = π/2
  180度 = π
  360度 = 2π
  任意角度的弧度 x = x * Math.PI / 180
  ☞ 绘制圆上任意点：	
  公式：
  x = ox + r * cos( 弧度 )
  y = oy + r * sin( 弧度 )
  ox: 圆心的横坐标
  oy: 圆心的纵坐标
  r： 圆的半径
```

## 动画

+ ```html
  <script>
      //开始位置
      var x = 0;
      //处理的是一个增量
      var step = 5;
      //改变的方向的
      var i = 1;
      //创建一个定时器
      setInterval(function () {
          //先清屏
          canvas.clearRect(0, 0, canvas.width, canvas.height);
          //开始绘制图形
          canvas.fillRect(x, 100, 200, 200);
          //开始处理变量
          x += step * i;
          if (x >= canvas.width - 200) {
              i = -1;
          } else if (x <= 0) {
              i = 1;
          }
      }, 20);
  </script>
  ```

## 渐变

+ ```javascript
  ☞ 线性渐变
  var grd=canvas.createLinearGradient(x0,y0,x1,y1);
  x0-->渐变开始的x坐标
  y0-->渐变开始的y坐标
  x1-->渐变结束的x坐标
  y1-->渐变结束的y坐标
  
  grd.addColorStop(0,"black");      设置渐变的开始颜色
  grd.addColorStop(0.5,"yellow");   设置渐变的中间颜色
  grd.addColorStop(1,"red");        设置渐变的结束颜色
  
  canvas.strokeStyle=grd;
  canvas.stroke();
  
  备注：addColorStop(offse,color);
  中渐变的开始位置和结束位置介于0-1之间，0代表开始，1代表结束。中间可以设置任何小数
  
  ☞ 径向渐变
  canvas.createradialGradient(x0,y0,r0,x1,y1,r1);
   var rgd=canvas.createRadialGradient(200, 175, 50, 200, 175, 75);圆⚪
  (x0,y0)：渐变的开始圆的 x,y 坐标
  r0：开始圆的半径
  (x1,y1)：渐变的结束圆的 x,y 坐标
  r1：结束圆的半径
  ```

  ## 填充效果

+ ```javascript
  canvas.fill();	      设置填充效果
  canvas.fillstyle="值"; 设置填充颜色
  
  ☞ 非零环绕原则：2个图像绘制方向不一样,2图像中间填充	必需闭合
        1. 任意找一点，越简单越好
        2. 以点为圆心，绘制一条射线，越简单越好（相交的边越少越好）
        3. 以射线为半径顺时针旋转，相交的边同向记为+1，反方向记为-1，如果相加的区域等于0，则不填充。
        4. 非零区域填充
  ```

5. 绘制虚线

   + ```html
     原理：
     设置虚线其实就是设置实线与空白部分直接的距离,利用数组描述其中的关系
     例如：setLineDash([10,10]) 	实线部分10px 空白部分10px
     例如：setLineDash([10,2]) 	实线部分10px 空白部分5px
     例如：setLineDash([10,5,20]) 	实线部分10px  空白5px  实线20px  空白部分10px 实线5px 空白20px....
     绘制：
     canvas.setLineDash(数组);
     canvas.stroke();
     例如：
     canvas.moveTo(100, 100);
     canvas.lineTo(300, 100);
     canvas.setLineDash([2,4]);
     canvas.stroke();
     
     注意：
     如果要将虚线改为实线，只要将数组改为空数组即可。
     ```

# SVG

## SVG的优势

- 与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：

  - SVG 图像可通过文本编辑器来创建和修改

  - SVG 图像可被搜索、索引、脚本化或压缩

  - SVG 是可伸缩的

  - SVG 图像可在任何的分辨率下被高质量地打印

  - SVG 可在图像质量不下降的情况下被放大

## SVG 和 Canvas 的区别

- SVG 是一种使用 XML 描述 2D 图形的语言。
- Canvas 通过 JavaScript 来绘制 2D 图形。
- SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
- 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
- Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。