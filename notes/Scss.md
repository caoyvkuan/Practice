# Scss

+ 语法
  + 注释
  + 变量 , 插值 , 作用域
  + 选择器嵌套 , 伪类嵌套 , 属性嵌套(Sass)
  + 运算 , 单位 , 转义 , 颜色
  + 函数
  + 混入 , 命名空间(Less) , 继承
  + 合并 , 媒体查询
  + 条件 , 循环
  + 导入

+ scss 兼容 css 的原生导入
  + 被导入文件的名字以.css结尾；
  + 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
  + 被导入文件的名字是CSS的url()值。
+ 这三种情况会生成原生的 css@import

+ 注释分类
  + `/**/` 这中注释不会出现在编译后的 css 中
  + `//` 这样的注释会出现在编译后的 css 中

+ 插值语句 `#{}`
  + `p.#{$name}{#{$attr}-color: blue;}`

# 1. 变量

+ 可以使用中划线和下划线来链接变量的命名
+ `$border-radius  or  $border_radius`
+ 一般推荐使用中划线,中划线和下划线在编译中是一样的,即 `$a-b == $a_b` 这只相当于一个变量

+ 变量声明使用 : $  --> `$color: red;`

+ 引用变量 ; ` color: $color;`
+ `border: 1px solid $color;`

+ 作用域的概念,以 `{}` 来划分作用域
+ 没在 `{}` 内声明的变量默认就是全局变量

## 变量默认值

+ `$color: red !default;`
+ 添加 `!default` 就会被当做变量的默认值
+ 可以随时使用其他值进行替换掉,值为 null 时变量的默认值就也会生效

# 2. 嵌套规则


## 标签类名嵌套

+ 在 sass 中书写是可以嵌套的
+ 想在嵌套过程中选中父选择器可以使用 : &
```scss
$color: red;
.app{
   color:$color;
   background:yellow;
   border: 1px solid $color;
    // 嵌套写法
   div{
      width: 100px;
      height: 100px;
      background-color: blue;
   }
    // 给 .app 加上鼠标悬浮效果
   &:hover{
      background: $color;
   }
   body.ie &:hover{/* 这样都是可以的 */}
}
```

## 属性嵌套

+ 属性也是可以这样嵌套来写的
```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }

  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}
// 同等与
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
  /*--------------------*/
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

# 3. 导入

+ `@import "mixins"`
+ 可以省略文件的 `.scss` 和 `.sass` 后缀名

+ 部分只是用来公共的部分不生成具体样式的可以使用 `_name.scss` 的方式命名
+ `@import "name"` 这样引入, name 文件中的 scss 可以使用,但是在编译时不会对 name 文件生成具体的样式

## 嵌套导入

+ 这样就可以做到嵌套导入
+ `.blue-theme {@import "blue-theme"}`
+ 导入的样式都会在 `.blue-theme` 中

# 混合器

+ 用来复用样式,利用变量能够改变特有的属性
+ 通过 `@mixin name{/* style */}` 来声明
+ 简写 `=name{/* style */}`

+ 通过 `@include name` 使用
+ 简写`+name`
```scss

@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

notice {
  background-color: green;
  border: 2px solid #00aa00;
  // 混合器中的样式会被添加到这里
  @include rounded-corners;
}
```

## 传递参数

```scss
// 设置参数默认值
@mixin link-colors($normal:red){}

@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

// 使用
a{
  @include link-colors(blue, red, green);
}
// 按照变量名传参
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```

## @content

+ 可以传入样式
```scss
@mixin apply-to-ie6-only {
  * html {
    @content; // 这里将是导入的样式
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

## 自定义函数

+ @function 声明
+ @return 返回
```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

# 继承

+ 通过 `@extend` 来实现继承
+ 通过 `!optional` 在继承报错时不生成新的选择器
```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;// 这样就继承了 .error 的样式
  border-width: 3px;
}
```



# Modules

## 运算模块

+ `@use "sass:math"` 引入

+ `math.div(num1,num2)` 除法的运算方式

# 语句

## @if

+ 判断
```scss
// 当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码：
@if 1 + 1 == 2 { border: 1px solid; }

// 多成判断
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

## @for

+ `@for $var from <start> through <end>`
+ `@for $var from <start> to <end>`
+ 使用 through 时包含 start 同时包含 end
+ 使用 to 时包含 start 但是不包含 end
+ `<start> 和 <end> 必须是整数值。`
```scss
// $i 变量
// 1 初始值
// 3 最终值
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

// 编译后
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

## @each

+ 遍历
+ `$var in <list>`
```scss
// @each 可以遍历数组
$arr: puma sea-slug egret salamander;

@each $animal in $arr {
   .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
   }
}
```

## @while

+ @while 指令重复输出格式直到表达式返回结果为 false
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```