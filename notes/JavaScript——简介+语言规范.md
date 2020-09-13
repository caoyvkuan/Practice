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







# 事件捕获

+ IE特有方法
  + `setCapture()`  将事件拦截到自己身上
  + `releaseCapture()` 取消捕获
