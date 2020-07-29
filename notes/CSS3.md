# CSS3

## 新特性

#### 冒号

```
单冒号
:	伪类
伪类是选择器
双冒号
::	伪元素
伪元素就是页面内的元素
```

#### 弹性布局

```css
☞ 设置父元素为伸缩盒子【直接父元素】
    display： flex
	
	宽度超出会被压缩
	高度超出会溢出	overflow

	/*伸缩比*/
	子盒子设置	flex:1;	分1份
	所有子盒子的flex加起来的总数就是父盒子被分的份数

    为什么在伸缩盒子中，子元素会在一行上显示？
    1. 子元素是按照伸缩盒子中主轴方向显示
    2. 只有伸缩盒子才有主轴和侧轴
    3. 主轴： 默认水平从左向右显示
    4. 侧轴： 始终要垂直于主轴

☞ 设置伸缩盒子主轴方向（flex-direction）
    flex-direction: row; 【默认值】X
    flex-direction: row-reverse;	反转
    flex-direction: column;	Y
    flex-direction: column-reverse;
☞ 设置元素在主轴的对齐方式( justify-content)
/* 设置子元素在主轴方向的对齐方式 */
    justify-content: flex-start;
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;	/*	两端对齐中间自适应	*/
    justify-content: space-around;	/*	环绕	*/

☞ 设置元素在侧轴的对齐方式 （align-items）
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;
/* 默认值 拉伸	*/
	align-items: stretch;
规定align-items属性值baseline，规定基线对齐。
也就是元素中的文本都以第一个元素的文本的基线对齐。

☞ 设置元素是否换行显示（flex-wrap）
1. 在伸缩盒子中所有的元素默认都会在一行上显示
2. 如果希望换行：
    flex-wrap: wrap | nowrap;

☞ 设置元素换行后的对齐方式（ align-content)
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-around;
    align-content: space-between;
    /* 换行后的默认值 */
    align-content: stretch;
```



#### 动画

```css
/*	过度	*/
https://www.cnblogs.com/afighter/p/5731293.html
 补间动画

/* 设置哪些属性要参与到过渡动画效果中： all | width,height;	*/
transition-property: all;

/* 设置过渡执行时间 */
transition-duration: 1s;

/* 设置过渡延时执行时间 */
transition-delay: 1s;

/* 设置过渡的速度类型 */
/*	ease:由快到慢到更慢	linear:恒速	
ease-in:越来越快	ease-out:越来越慢	*/
transition-timing-function: linear;
transition-timing-function:cubic-bezier(0.1, 0.5, 1.0, 0.1);

/*	动画	*/

/* 调用  动画名称 */
animation-name: rotate;
/* 连写	时间 第一个是执行时间	第二个是延迟执行时间 */
animation:rotate 2s infinite linear alternate 1s forwards;
/* 设置动画时间 */
animation-duration: 2s;

/* 设置动画执行的次数:  infinite 无限执行; */
animation-iteration-count: infinite;

/* 动画执行的速度类型 */
animation-timing-function: linear;

/* 设置动画逆波 	动画结束后从结尾回放到开头	*/
/*	alternate:正常回放	alternate-reverse:交替反向	reverse:倒放	*/
animation-direction: alternate;

/* 设置动画延时 */
animation-delay: 1s;

/* 设置动画结束时候的状态 	不是无限执行时有效
forwards:停在动画结束状态		backwards:回到开始动画状态	*/
animation-fill-mode: forwards;

/* 动画暂停 */
animation-play-state: paused;
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



#### 2D转换 3D转换

```css
/* 2d转换位移： 改变元素位置 */
☞ 位移
	transform: translate(X,Y);
	transform: translate(100px,100px);
	备注：
	 	   位移是相对元素自身的位置发生位置改变
☞ 缩放
	transform: scale(W,H);
    transform: scale(0.5,1);
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

    ☞ transform-style: preserve-3d;
	将平面图形转换为立体图形
```

#### 背景

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
```

#### 边框

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
```

#### 文本

```css
☞text-shadow：X Y 模糊 color; 设置文本阴影
☞word-break: break-all;	自动换行
```

#### 渐变

```css
☞ 线性渐变：
1. 开始颜色和结束颜色
2. 渐变的方向
3. 渐变的范围
background-image:  linear-gradient(
    to right,方向支持deg
    red 20%,
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
☞ 径向渐变：
/* 径向渐变 */
background-image: radial-gradient(
	/*r	at 位置 */
    100px at left center,
    red,
    blue
);
```

