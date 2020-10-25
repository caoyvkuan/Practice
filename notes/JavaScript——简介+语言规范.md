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
