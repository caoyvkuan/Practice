# ECMAScript

+ 规定了语法的组成部分
  + 语法
  + 类型
  + 语句
  + 关键字
  + 保留字
  + 操作符
  + 对象

# 数据类型

+ 基本类型
+ 引用类型
+ 内置特殊类型
+ 相等性判断

## 基本类型

+ `Boolean、Number、String、null、undefined`

+ 前三种基本类型都有类型对象，既可以通过类型对象创建对应的数据类型

+ ```js
  let bool = Boolean(true);
  let num = Number(123);
  let str = String("Hello World");
  ```

### Boolean

+ 可以使用`Boolean()`函数将任何类型转换为`Boolean`值 
    + 转换为`true`
        + 任何非空字符串
        + 任何非零数值(包括无穷大)
        + 任何对象
    
    + 转换为`false`
        + `""` 空字符串
        + `0 和 NaN` 
        + `null`
        + `undefined`

# 操作符

+ 数据类型判断操作符

## 数据类型判断操作符

+ **typeof** 操作符

  + 适用于基本数据类型判断
  + `undefined` 如果这个值未定义
  + `boolean` 如果这个值是布尔值
  + `string` 如果这个值是字符串
  + `number` 如果这个值是数值
  + `object` 如果这个值是对象或是null
  + `function` 如果这个值是函数

+ typeof 对初始化的变量使用会返回  `undefined` 

+ 对未声明的变量使用同样会返回 `undefined`

+ `null` 表示一个空的对象指针, 这也是使用`typeof` 检测会返回`object`的原因

+ 如果定义的对象在将来准备用来保存对象,那么将该变量初始化未`null`而不算其他值,这样只要检测`null`值就可以知道相应的变量是否已经保存了一个对象的引用

+ ```js
  null == undefined  //true
  ```
```

  


```