# Canvas

#### 绘制方法

+ ```javascript
  设置画布大小： 使用属性方式设置 或js设置画布大小	
  	不能用css,css设置的是画布被拉伸之后的大小
  
  canvas.moveTo(x,y)    落笔
  canvas.lineTo(x,y)    连线
  canvas.stroke()	   描边
  var canvas =document.querySelector("canvas");
  //获取画布上下文对象
  var canvas=canvas.getContext("2d");	//只有2d ---3d叫webgl
  
  canvas.beginPath()；   
  开启新的图层  可防止重绘
  //重绘:把之前已经画好的线重新描绘一次覆盖在上面
  
  演示： canvas.strokeStyle="rgba(0, 0, 255, .7)";	颜色
  线宽： canvas.lineWidth="10";   备注：不需要带单位	线宽为线体上下各 5
  
  线连接方式：lineJoin: round(圆角) | bevel(平角) | miter (默认:尖角)
  
  线帽（线两端的结束方式）：  lineCap: butt(默认值) | round(半圆闭合) | square(方块闭合)
  //清屏
  canvas.clearRect(0, 0, canvas.width, canvas.height);
  
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
      角度 和 弧度的关系： 角度:弧度= 180:pi
      特殊值	π = Math.PI
      0度 = 0弧度
      30度 = π/6   (180度的六分之一)
      45度 = π/4   
      60度 = π/3
      90度 = π/2
      180度 = π
      360度 = 2π
      ☞ 绘制圆上任意点：	
      公式：
      x=ox+r*cos( 弧度 )
      y=oy+r*sin( 弧度 )
      ox: 圆心的横坐标
      oy: 圆心的纵坐标
      r： 圆的半径
  
  平移【坐标系圆点的平移】
  //位移	convas.translate(移动默认的X, Y);
  convas.translate(300, 200);
  	特点：
      	  通过该方法可以将原点的位置进行重新设置。
  	注意：
            1. translate(x,y) 中不能设置一个值
            2. 与moveTo(x,y) 的区别：
              moveTo(x,y) 指的是将画笔的落笔点的位置改变，而坐标系中的原点位置并没有发生改变
              translate(x,y) 是将坐标系中的原点位置发生改变
  
  //缩放	convas.scale(W倍数, H倍数);
  convas.scale(1, 1.5);
  //旋转
  canvas.rotate(Math.PI / 2);
  
  //描边矩形
  canvas.strokeStyle = "red";x
  //canvas.strokeRect(起点x, 起点Y, Width, height);
  canvas.strokeRect(100, 100, 200, 100);
  canvas.rect(100, 100, 200, 200);
  //填充矩形
  canvas.fillStyle = "red";
  canvas.fillRect(330, 100, 200, 200);
  //清除效果
  canvas.clearRect(340, 100, 10, 200);
  //设置带阴影的效果
  ctx.shadowColor = "red";
  ctx.shadowOffsetX = 10;	//偏移
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 5;		//模糊
  //绘制文本
  ctx.strokeText("镂空文本", x, y);
  ctx.fillText("填充文本", 300, 200);
  //设置文字大小： 与css设置文字一样
  ctx.font = "40px 微软雅黑";
  //设置文字的对齐方式		letf | right | center
  ctx.textAlign = "center";
  //设置文字上下对齐方式	top | middle | bottom | alphabetic(默认)
  ctx.textBaseline = "middle";
  //绘制图片
  var img = document.createElement("img");
  img.src = "1.jpg";
  img.onload = function () {
      //canvas.drawImage(img, x, y);
      canvas.drawImage(img, 0, 0);
      //canvas.drawImage(img, x, y, w, h);
      canvas.drawImage(img, 100, 100, 300, 300);
      //canvas.drawImage(img, imgX, imgY, imgW, imgH, x, y, w, h);
      canvas.drawImage(img, 810, 0, 387, 331, 0, 0, 387, 331);
      
      解决图片失真
      var img_width = img.width;
      var img_height = img.height;//计算图片宽高比
      var drowHeight = 400 * img_height / img_width;
  
      canvas.drawImage(img, 100, 50, 400, drowHeight);
  }
  ```

#### 动画

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

#### 渐变

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

  #### 填充效果

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