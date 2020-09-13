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



# 正则表达式

+ 元字符
+ 语法

## 元字符

+ .	点	
  + 查找单个字符除了换行和行结束符
+ \w  查找单词字符
+ \W  查找非单词字符
+ \d   数字
+ \D  非数字
+ \s   空白
+ \S  非空白
+ \b   匹配单词边界
+ \B  非单词边界
+ \0   NUL字符
+ \n   换行符
+ \f    换页符
+ \r    回车符
+ \t    制表符tab
+ \v   垂直制表符
+ \xxx    以八进制数 xxx 规定的字符
+ \xdd    以十六进制数 dd  规定的字符
+ \uxxxx   以十六进制  xxxx  规定的 Unicode 字符
+ 前缀添加  \x  表示用的是 ASCII 字符
+ 十六进制需要添加 \x   八进制不需要

## [  方括号表示字符范围 ] 

+ [abc]   查找括号内任意字符
+ [^abc]   不在括号内的字符        ^ 反义
+ [0-9]    0~9的数字
+ [a-z]     小写字母
+ [A-Z]     大写字母
+ [A-z]     大小写字母

+  |  表示或  `/\w+|\d+/`  任意字母或数字     

  + `/(abc)|(efg)|(123)|(456)/` 
  + 为了避免歧义，应该为选择操作的多个子模式加上小括号

## 重复匹配

+ { 大括号匹配数量 } 

  + `/go{3}/g  匹配3个 o`   `/go{3,5}/g  匹配3~5个o`
  + `/go*a/g  匹配所有`       `/go{1,}/g   最少一次最多无限`

+ |      **量词**       |                   **描述**                    |
  | :-----------------: | :-------------------------------------------: |
  |   n+        {1，}   |   匹配任何包含至少一个 n 的字符串  最多无限   |
  |   n*           *    |       匹配任何包含零个或多个 n 的字符串       |
  | n?          {0，1}  |       匹配任何包含零个或一个 n 的字符串       |
  |  n{x}         {3}   |        匹配包含 x 个 n 的序列的字符串         |
  | n{x,y}      {3，2}  | 匹配包含最少 x 个、最多 y 个 n 的序列的字符串 |
  | n{x,}         {3，} |      匹配包含至少 x 个 n 的序列的字符串       |

+ ```js
  var s = "ggle gogle google gooogle goooogle gooooogle goooooogle gooooooogle goooooooogle";
  仅匹配单词 ggle 和 gogle
  var r = /go?gle/g;    同等于 /go{0,1}gle/g;
  var a = s.match(r)
  ```

## **贪婪匹配和惰性匹配**

+ 重复类量词都具有贪婪性，在条件允许的前提下，会匹配尽可能多的字符
  + ?、{n} 和 {n,m} 重复类具有弱贪婪性，表现为贪婪的有限性。
  + *、+ 和 {n,} 重复类具有强贪婪性，表现为贪婪的无限性。
+ 惰性
+ {n,m}?：尽量匹配 n 次，但是为了满足限定条件也可能最多重复 m 次。
+ {n}?：尽量匹配 n 次。
+ {n,}?：尽量匹配 n 次，但是为了满足限定条件也可能匹配任意次。
+ ??：尽量匹配，但是为了满足限定条件也可能最多匹配 1 次，相当于 {0,1}?。
+ +?：尽量匹配 1 次，但是为了满足限定条件也可能匹配任意次，相当于 {1,}?。
+ *? ：尽量不匹配，但是为了满足限定条件也可能匹配任意次，相当于 {0,}?。

```js
越是排在左侧的重复类量词匹配优先级越高。下面示例显示当多个重复类量词同时满足条件时，会在保证右侧重复类量词最低匹配次数基础上，使最左侧的重复类量词尽可能占有所有字符。
var s = "<html><head><title></title></head><body></body></html>";
var r = /(<.*>)(<.*>)/;			/<.*?>/; //返回单个元素数组["<html>"]
var a = s.match(r);
//左侧表达式匹配"<html><head><title></title></head><body></body></html>"
console.log(a);
console.log(a[1]);  //<html><head><title></title></head><body></body>
console.log(a[2]);  //右侧表达式匹配“</html>”
```

## 边界量词

+   ^  匹配开头，在多行检测中，会匹配一行的开头
+   $  匹配结尾，在多行检测中，会匹配一行的结尾

```js
var s = "how are you";
var r = /\w+$/;
var a = s.match(r);  //返回数组["you"]
var r = /^\w+/;
var a = s.match(r);  //返回数组["how"]
var r = /\w+/g;
var a = s.match(r);  //返回数组["how","are","you"]
```

## 声明词量

+ 正向声明

  + 指定匹配模式后面的字符必须被匹配，但又不返回这些字符。语法格式如下

    + `匹配模式  (?= 匹配条件)    ?=n`     匹配任何其后紧接指定字符串 n 的字符串。

  + ```js
    var s = "one : 1; two : 2";
    var r = /\w*(?= : 2)/;  //使用正前向声明，指定执行匹配必须满足的条件
    var a = s.match(r);  //返回数组["two"]
    ```

+ 反向声明

  + 与正向声明匹配相反，指定接下来的字符都不必被匹配。语法格式如下：

  + `匹配模式  (?! 匹配条件)    ?!n`    匹配任何其后没有紧接指定字符串 n 的字符串。

  + ```js
    var s = "one : 1; two : 2";
    var r = /\w*(?! : 2)/;  //使用正前向声明，指定执行匹配必须满足的条件
    var a = s.match(r);  //返回数组["one"]
    console.log(a);
    ```

## 子表达式

+ 使用小括号可以对字符模式进行任意分组，在小括号内的字符串表示子表达式，也称为子模式。子表达式具有独立的匹配功能，保存独立的匹配结果；同时，小括号后的量词将会作用于整个子表达式。

```js
var s = "ab=21, bc=45, cd=43";
var r = /(\w+)=(\d*)/g;
while (a = r.exec(s)) {
    console.log(a);  //返回类似["ab=21","bc=45","cd=43"]三个数组
}

var s = "abcdefghijklmn";
var r = /(\w+)(\w)(\w)/;
r.test(s);
console.log(RegExp.$1);  //返回第1个子表达式匹配的字符abcdefghijkl
console.log(RegExp.$2);  //返回第2个子表达式匹配的字符m
console.log(RegExp.$3);  //返回第3个子表达式匹配的字符n

var s = "aa11bb22c3  d4e5f6";
var r = /(\w+?)(\d+)/g;
var b = s.replace(r,"$2$1");//更换子表达式的顺序， 可以改变字符串的顺序
console.log(b);  //返回字符串"11aa22bb3c  4d5e6f"

var s = "abc";
var r = /(a(b(c)))/;
var a = s.match(r);  //返回数组["abc","abc","bc","c"]
```



## 反向引用

+ `\+ 数字` 

+ 数字指定了子表达式在字符模式中的顺序。如“\1”引用的是第 1 个子表达式，“\2”引用的是第 2 个子表达式

+ ```js
  var s = "<h1>title</h1><p>text</p>";
  var r = /((<\/?\w+>).*(<\/?\w+>))/g;
  var a = s.match(r);  //返回数组["<h1>title</h1>","<p>text</p>"]
  ```

  

## 禁止引用

+ ```js
  var s1 = "abc";
  var r = /(?:\w*?)|(?:\d*?)/;  在左括号的后面加上一个问号和冒号。
  ```

  








```js
/[\u0000-\u00ff]/g		匹配任意 ASCII 字符
/[^\u0000-\u00ff]/g		匹配任意双字节的汉字
/[a-zA-Z0-9]/g			匹配任意大小写字母和数字
/[\u0030-\u0039]/g		使用 Unicode 编码设计，匹配数字
/[\u0041-\u004A]/g		匹配任意大写字母
[\u0061-\u007A]/g 		匹配任意小写字母
 
var s = "abcdez";  //字符串直接量
var r = /[abce-z]/g;  //字符a、b、c，以及从e~z之间的任意字符
var a = s.match(r);  //返回数组["a","b","c","e","z"]

var s = "abc4 abd6 abe3 abf1 abg7";  //字符串直接量
var r = /ab[c-g][1-7]/g;  //前两个字符为ab，第三个字符为从c到g，第四个字符为1~7的任意数字
var a = s.match(r);  //返回数组["abc4","abd6","abe3","abf1","abg7"]

var r = /[^0123456789]/g;  使用反义字符范围可以匹配很多无法直接描述的字符，达到以少应多的目的。

var s = '<meta charset="utf-8">';  //待过滤的表单提交信息
var r = /\'|\"|\<|\>/gi;  //过滤敏感字符的正则表达式
function f(a) {  //替换函数
    ////把敏感字符替换为对应的网页显示的编码格式
    return "&#" + arguments[0].charCodeAt(0) + ";";
    return "&#" + a.charCodeAt(0) + ";";
}
var a =s.replace(r,f);  //执行过滤替换 
// document.write(a);  //在网页中显示正常的字符信息
console.log(a);   // &#60;meta charset=&#34;utf-8&#34;&#62;
```