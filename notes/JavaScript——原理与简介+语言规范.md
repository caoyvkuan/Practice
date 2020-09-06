# JavaScript

+ javascript简称js , 是在1995年 , 由美国人布莱登艾奇用10天时间研发
+ js诞生的目的解决表单验证是否合法
+ JS组成
  + 核心 `ECMAScript`		提供核心语言功能
  + 文档对象模型 `DOM`      提供访问和操作网页内容的方法和接口
  + 浏览器对象模型 `BOM`   提供与浏览器交互的方法和接口

# 浏览器端的JS

+ ECMAScript：基础语法(数据类型、运算符、函数。。。JS语法标准 )

+ BOM(浏览器对象模型)：window、location、history、navigator。。。

+ DOM(文档对象模型)：div、p、span。。。

+ `srcipt`标签属性

  + `src` ：指定外部脚本的URI， 如果设置了 `src` 特性，script 标签内容将会被忽略;

  + type : 指定引用脚本的语言，属性值为 MIME 类型

    + 包括`text/javascript`, `text/ecmascript`, `application/javascript`, 和`application/ecmascript`。如果没有定义这个属性，脚本会被视作JavaScript。
    + ES6 新增了属性值 `module` ，代码会被当做 JavaScript 模块

  + async

    + `async`规定一旦脚本可用，则会异步执行   async 属性仅适用于外部脚本

      + 表示应该立即下载脚本,但不应该妨碍页面的其他操作,比如下载其他资源或加载其他脚本

    + 都设置了这个属性不一定会按照顺序加载,   后面的可能比前面的先加载, 因此确保两者之间互不依赖非常重要

    + 如果不使用 `async` 且 `defer="defer"` ：脚本将在页面完成解析时执行

    + 如果既不使用 `async` 也不使用 `defer` ：在浏览器继续解析页面之前，立即读取并执行脚本；

    + ```html
      <script async="async"></script>
      ```

  + defer

    + 都设置了这个属性会按照顺序加载

    + 属性规定是否对脚本执行进行延迟，直到页面加载为止。

    + 如果您的脚本不会改变文档的内容，可将 defer 属性加入到 `<script>` 标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。

    + ```html
      <script defer="defer"></script>
      ```

# 语言规范

+ 关键字和保留字
  + 不能用来变量命名或函数命名

## 严格模式

+ `"use strict"` 严格模式声明

  + 指令将浏览器引擎转换为“现代”模式，改变一些内建特性的行为

  + 通过在脚本文件/函数开头添加 `"use strict";` 声明，即可启用严格模式。全局/局部开启严格模式：

  + `"use strict"` 需要定义在脚本最顶部（函数内除外），否则严格模式可能无法启用。一旦进入了严格模式，就无法关闭严格模式。

  + 启用 `"use strict"` 后，为未定义元素赋值将抛出异常：

  + ```js
    "use strict";
    leo = 17; // Uncaught ReferenceError: leo is not defined
    ```

  + 启用 `"use strict"` 后，试图删除不可删除的属性时会抛出异常：

  + ```js
    "use strict";
    delete Object.prototype; // Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
    ```

# 原理



## 变量函数提升机制

+  (var  function 不包括函数表达式)

1. 执行过程

   1. 从第二次宏任务开始每次执行宏任务前会清空微任务

2. 预编译

   + 页面产生便创建了GO全局对象（Global Object）（也就是window对象）

   + 脚本文件加载

   + 脚本加载完毕后，分析语法是否合法

   + 开始预编译

     - 查找变量声明，作为GO属性，值赋予undefined
     - 查找函数声明，作为GO属性，值赋予函数体

   + 函数变量的提升

   + ```javascript
     // 1. 变量声明、函数声明都会被提升到作用域顶处；
     //  2. 当出现相同名称时,同名变量会被赋值为同名函数
     var func;
     function func(){ return 1}
     alert(func); //-> f func(){ return 1}  整个方法
     alert(func()) // -> 1   方法的返回值 / 无返回值为 undefined
     // 所有赋值保留原位 , 隐式变量同意保留原位
     var a =1;//->a会被提升赋值的1保留原位  
     b = 1; // ->b于1都保留原位
     ```

     

   + ```javascript
     //伪代码
     GO/window = {
         //页面加载创建GO同时，创建了document、navigator、screen等等属性，此处省略
         a: undefined,
         c: undefined，
         b: function(y){
             var x = 1;
             console.log('so easy');
         }
     }
     ```

   + 解释执行代码（直到执行函数b）

   + ```javascript
     //伪代码
     GO/window = {
         //变量随着执行流得到初始化
         a: 1,
         c: function(){
             //...
         },
         b: function(y){
             var x = 1;
             console.log('so easy');
         }
     }
     ```

   + 执行函数b之前，发生预编译

     + 创建AO活动对象（Active Object）
     + 查找形参和变量声明，值赋予undefined
     + 实参值赋给形参
     + 函数与变量的提升
     + 查找函数声明，值赋予函数体









# 事件捕获

+ IE特有方法
  + `setCapture()`  将事件拦截到自己身上
  + `releaseCapture()` 取消捕获
