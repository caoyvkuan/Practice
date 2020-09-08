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
  null == undefined  /* true */
  ```

# 语句

+ 条件判断语句
+ 循环语句
+ with语句
+ lable语句

## 条件判断语句

+ if 判断
+ 三元表达式
+ switch 判断

### if 语句

+ 在if语句中始终推荐使用代码块  即：{ code }
+ 会对不是布尔值的判断条件进行隐式转换,调用 `Boolean(条件)` 该方法进行转换
+ 转换规则同该方法一致
+ 数字 `0`、空字符串 `""`、`null`、`undefined` 和 `NaN` 都会被转换成 `false`。因为他们被称为 “falsy” 值。
+ 其他值被转换为 `true`，所以它们被称为 “truthy”。

### 三元表达式

+ ```js
  //A为条件结果为ture/false   B:A为ture就执行B否则就执行C    
  //	A ？ B ：C (如果A为真执行B否则执行C)
  var A = 1;
  alert(A?B:C);
  alert(A==1?A:"第三");	//输出1
  ```

### switch 语句

+ 条件与结果为全等
+ **`switch`** 语句至少包含一个 `case` 代码块和一个可选的 `default` 代码块：
+ ECMAScript中switch中可以使用任何数据类型，无论是字符串还是对象
+ 多个`case`也可共用一段执行语句
+ 每一个case的值不一定是常量，可以是变量，甚至是表达式
  + ` case 'Hello' + 'World':{}`

```js
var num = 25;
// 可以这样使用表达式
switch(true){
    case num == 1: //共用执行语句
    case num < 0:{
        break;
    }
    case num >= 0 && num <= 10:{
        break;
    }
    default:{
        break;
    }
}
```

## do-while

+ 至少执行一次

## while

+ 先判断条件在执行

## for语句

+ for循环只是while循环的变体
+ 将循环控制的表达式全部省略就会创建一个无线循环 `for(;;){ code }`
+ 只给控制表达式实际上就把for循环转换成了while循环 `for(;i < count;){ code }`

## for-in

+ `for-in` 语句是一种精确的迭代语句，可以用来枚举对象的属性
+ `for (property in expression) statement`
+ `for(let propName in window){ document.write(propName) }`
+ 在使用`for-in`循环前，先检测确认该对象的值不是`null`或`undefined`

## lable语句

+ ![lable](E:/Github/Practice/notes/images/lable.png)

## break和continue

+ `break和continue`语句用于在循环中精确的控制代码的执行
  + `break` 会立即退出循环
  + `continue` 会退出当前循环过程，返回循环顶部继续执行

## with语句

+ 作用是将代码的作用域设置到一个特定的对象中
+ 语法： `with (expression) statement;`
+ ![with语句](E:/Github/Practice/notes/images/with语句.png)
+ 严格模式下不允许使用
+ 大量使用会导致性能下降，同时也会给代码调试造成滚男，因此在开发大型应用程序时，不建议使用
