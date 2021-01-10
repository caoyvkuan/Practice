# 字符串的扩展

## 新增用法

### 字符的 Unicode 表示法

+ ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
```js
"\u0061"  // "a"
//但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

"\uD842\uDFB7"  // "𠮷"

"\u20BB7" // " 7"
//上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），
//JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
```

+ ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
+ 大括号表示法与四字节的 UTF-16 编码是等价的。
```js
"\u{20BB7}" // "𠮷"
"\u{41}\u{42}\u{43}"  // "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

+ 有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。
```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

### 字符串的遍历器接口

+ ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"  // "o"  // "o"
```

+ 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"

//字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。
```

### 直接输入 U+2028 和 U+2029

+ JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。
```js
//“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式\u4e2d，两者是等价的。
'中' === '\u4e2d' // true

//JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）

//这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。
//这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
const json = '"\u2028"';
JSON.parse(json); // 可能报错

//JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
const PS = eval("'\u2029'");
//注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。
```

## JSON.stringify() 的改造

+ JSON 数据必须是 UTF-8 编码。
+ JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。

+ ES2019 改变了JSON.stringify()的行为。
+ 如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
```js
//改变前
JSON.stringify('\u{D834}') // "\u{D834}"

//改变后
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串
### 实例：模板编译

+ 生成正式模板
+ 该模板使用 <%...%> 放置 JavaScript 代码
+ 使用 <%= ... %> 输出 JavaScript 表达式。
```js
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

//一种思路是将其转换为 JavaScript 表达式字符串,进行模板的编译
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');
//使用正则的方式
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';

//将template封装在一个函数里面返回
let script =
`(function parse(data){
  let output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;

//将上面的内容拼装成一个模板编译函数compile
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

//compile函数的用法如下
let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

### 标签模板

+ 模板字符串的功能，不仅仅是上面这些。
+ 它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。
+ 这被称为“标签模板”功能（tagged template）。
+ 模板处理函数的第一个参数（模板字符串数组），还有一个raw属性。
  + raw 属性，保存的是转义后的原字符串。
```js
alert`hello`
// 等同于
alert(['hello'])
```
+ 标签模板其实不是模板，而是函数调用的一种特殊形式。
+ “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
+ 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
```js
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
//模板字符串前面有一个标识名tag，它是一个函数。
//整个表达式的返回值，就是 tag 函数处理模板字符串后的返回值。
//函数tag依次会接收到多个参数。
function tag(stringArr, value1, value2){
  // ...
}
// 等同于
function tag(stringArr, ...values){
  // ...
}
//tag函数的第一个参数是一个数组，成员是模板字符串中的字符部分   ['Hello ', ' world ', '']
//tag函数的其他参数，都是模板字符串各个变量被替换后的值     15, 50

function passthru(literals, ...values) {
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}

//例子
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  let result = '';
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}

msg // "The total is 30 (31.5 with tax)"
```

+ “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
```js
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
//sender变量往往是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义。
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
message
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
```

### 模板字符串的限制

+ ES2018 中放宽了转义的限制
+ 只在标签模板解析字符串时生效
+ 在无法转义时返回 undefined ，并且从 raw 属性中可以取到原始字符串

## 字符串的新增方法

### String.fromCodePoint()

+ ES5 提供 String.fromCharCode() 方法，用于从 Unicode 码点返回对应字符
+ 但是这个方法不能识别码点大于 0xFFFF 的字符。

+ ES6 提供了 String.fromCodePoint() 方法，可以识别大于 0xFFFF 的字符
+ 弥补了 String.fromCharCode() 方法的不足。

+ 如果 String.fromCodePoint 方法有多个参数，则它们会被合并成一个字符串返回。
```js
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

+ 注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

### String.raw()

+ 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
```js
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

//如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。
String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true
```

+ String.raw() 本质上是一个正常的函数,只是专用于模板字符串的标签函数
```js
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"

//作为函数，String.raw()的代码实现基本如下。
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

### 实例方法

### codePointAt()

+ JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
+ 对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

+ 这个方法用于正确的处理4个字节的字符，返回一个字符的码点。
+ codePointAt() 方法的参数，是字符在字符串中的位置（从 0 开始）
+ https://wangdoc.com/es6/string-methods.html#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Acodepointat

### normalize()

+ https://wangdoc.com/es6/string-methods.html#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Anormalize

### includes(), startsWith(), endsWith()

+ JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。
+ ES6 又提供了三种新方法。

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```js
let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

//这三个方法都支持第二个参数，表示开始搜索的位置。
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

### repeat()

+ repeat 方法返回一个新字符串，表示将原字符串重复n次。
+ 如果 repeat 的参数是负数或者 Infinity，会报错。
+ 如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。
+ 0 到-1 之间的小数，取整以后等于 -0，repeat 视同为 0。
+ NaN 等同于 0
+ 如果repeat的参数是字符串，则会先转换成数字。
```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
//参数如果是小数，会被取整。
'na'.repeat(2.9) // "nana"
```

### padStart()，padEnd()

+ ES2017 引入了字符串补全长度的功能。
+ 如果某个字符串不够指定长度，会在头部或尾部补全。
+ padStart() 用于头部补全
+ padEnd() 用于尾部补全。
+ 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
+ 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
+ 如果省略第二个参数，默认使用空格补全长度。

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

//padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

//另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### trimStart()，trimEnd()

+ ES2019 对字符串实例新增了 trimStart() 和 trimEnd() 这两个方法。
+ 它们的行为与 trim() 一致
+ trimStart() 消除字符串头部的空格
+ trimEnd() 消除尾部的空格。
+ 它们返回的都是新字符串，不会修改原始字符串。
+ 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。
+ 浏览器还部署了额外的两个方法，trimLeft() 是 trimStart() 的别名，trimRight() 是trimEnd() 的别名。

### matchAll()

+ matchAll() 方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

### replaceAll()

+ 历史上，字符串的实例方法 replace() 只能替换第一个匹配。
```js
'aabbcc'.replace('b', '_')
// 'aa_bcc'
//如果要替换所有的匹配，不得不使用正则表达式的g修饰符。
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```

+ ES2021 引入了 replaceAll() 方法，可以一次性替换所有匹配。
+ 它的用法与 replace() 相同，返回一个新字符串，不会改变原字符串。
+ 如果 searchValue(搜索模式，匹配模式) 是一个不带有 g 修饰符的正则表达式，replaceAll() 会报错。

+ replaceAll() 的第二个参数 replacement 是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
  + $&：匹配的子字符串。
  + $`：匹配结果前面的文本。
  + $'：匹配结果后面的文本。
  + $n：匹配成功的第 n 组内容，n 是从 1 开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
  + $$：指代美元符号$。

+ replaceAll() 的第二个参数 replacement 除了为字符串，也可以是一个函数
该函数的返回值将替换掉第一个参数 searchValue 匹配的文本。
```js
//这个替换函数可以接受多个参数。
//第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'
//此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456



// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```

# 正则的扩展

+ RegExp.prototype.flags
+ 会返回正则表达式的修饰符。
## RegExp 构造函数

+ 在 ES5 中 RegExp 构造函数的参数有两种情况
```js
//第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

//第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

//ES5 不允许此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

//ES6 改变了这种行为。
new RegExp(/abc/ig, 'i').flags
// "i"
//原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
```

## 字符串的正则方法

+ 字符串对象共有 4 个方法，可以使用正则表达式：
  + match()、replace()、search() 和 split()。

+ ES6 将这 4 个方法，在语言内部全部调用 RegExp 的实例方法
+ 从而做到所有与正则相关的方法，全都定义在 RegExp 对象上。

+ String.prototype.match 调用 RegExp.prototype[Symbol.match]
+ String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
+ String.prototype.search 调用 RegExp.prototype[Symbol.search]
+ String.prototype.split 调用 RegExp.prototype[Symbol.split]

## u 修饰符

+ ES6 增加了 u 修饰符 ，含义为“Unicode 模式”。 用来正确处理大于\uFFFF的 Unicode 字符。
+ 可以正确处理四个字节的 UTF-16 编码

+ RegExp.prototype.unicode 属性
+ 正则实例对象新增 unicode 属性，表示是否设置了u 修饰符。

+ 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。

1. 点字符
   + 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。
   + 对于码点大于 0xFFFF 的 Unicode 字符，点字符不能识别，必须加上 u 修饰符。
   + 如匹配 UTF-16 的汉字时不加就无法识别， 在 UTF-16 中汉字占4个字节  UTF-8 占三个字节同样无法识别

2. Unicode 字符表示法
   + ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上 u 修饰符，才能识别当中的大括号，否则会被解读为量词。
```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
//如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。
```

3. 量词
   + 使用 u 修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
```js
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
```

4. 预定义模式
   + u 修饰符也影响到预定义模式，能否正确识别码点大于 0xFFFF 的 Unicode 字符。
   + \S 是预定义模式，匹配所有非空白字符。
   + 只有加了u修饰符，它才能正确匹配码点大于 0xFFFF 的 Unicode 字符。
```js
//利用这一点，可以写出一个正确返回字符串长度的函数。
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
var s = '𠮷𠮷';
s.length // 4
codePointLength(s) // 2
```

5. i 修饰符
   + 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B 与 \u212A 都是大写的 K。
   + 不加u修饰符，就无法识别非规范的 K 字符。

6. 转义
   + 没有 u 修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在 u 模式会报错。
```js
/\,/ // /\,/
/\,/u // 报错
//没有u修饰符时，逗号前面的反斜杠是无效的，加了u修饰符就报错。
```

## y 修饰符

+ ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。

+ RegExp.prototype.sticky 属性
+ 表示是否设置了 y 修饰符。

+ y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
+ 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]
r1.exec(s) // ["aa"]
r2.exec(s) // null
//保证每次都能头部匹配，y修饰符就会返回结果了。
var r = /a+_/y;
r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
```

+ y 修饰符同样遵守 lastIndex 属性，但是要求必须在 lastIndex 指定的位置发现匹配。

## s 修饰符：dotAll 模式

+ 行终止符
  + 就是该字符表示一行的终结。以下四个字符属于“行终止符”。
  + U+000A 换行符（\n）
  + U+000D 回车符（\r）
  + U+2028 行分隔符（line separator）
  + U+2029 段分隔符（paragraph separator）
+ ES2018 引入s修饰符，使得.可以匹配任意单个字符。
+ 这被称为 dotAll 模式，即点（dot）代表一切字符。
+ 所以，正则表达式还引入了一个 dotAll 属性，返回一个布尔值，表示该正则表达式是否处在 dotAll 模式。
+ /s 修饰符和多行修饰符 /m 不冲突，两者一起使用的情况下，. 匹配所有字符，而 ^ 和 $ 匹配每一行的行首和行尾。

## 后行断言

+ JavaScript 语言的正则表达式，只支持先行断言
+ ES2018 引入后行断言
+ “先行断言”指的是，x 只有在 y 前面才匹配，必须写成 /x(?=y)/。
+ 比如，只匹配百分号之前的数字，要写成 /\d+(?=%)/
+ “先行否定断言”指的是 x 只有不在 y 前面才匹配，必须写成/x(?!y)/。
+ 只匹配不在百分号之前的数字，要写成 /\d+(?!%)/。

+ “后行断言”正好与“先行断言”相反，x 只有在 y 后面才匹配，必须写成/(?<=y)x/。
+ 只匹配美元符号之后的数字，要写成 /(?<=\$)\d+/
+ “后行否定断言”则与“先行否定断言”相反，x 只有不在 y 后面才匹配必须写成 /(?<!y)x/
+ 比如，只匹配不在美元符号后面的数字，要写成 /(?<!\$)\d+/。

## Unicode 属性类

+ ES2018 引入了一种新的类的写法 \p{...} 和 \P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。
+ \p{Script=Greek} 指定匹配一个希腊文字母，所以匹配 π 成功。
+ \p{Number} 甚至能匹配罗马数字。
+ \P{…} 是 \p{…} 的反向匹配，即匹配不满足条件的字符。
+ 注意，这两种类只对 Unicode 有效，所以使用的时候一定要加上u修饰符。如果不加u修饰符，正则表达式使用\p和\P会报错，ECMAScript 预留了这两个类。
```js
//例子
// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
```

## 具名组匹配

+ 正则表达式使用圆括号进行组匹配。
```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
//正则表达式里面有三组圆括号。使用exec方法，就可以将这三组匹配结果提取出来。
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

+ 组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如matchObj[1]）引用，要是组的顺序变了，引用的时候就必须修改序号。
+ ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
+ 如果具名组没有匹配，那么对应的 groups 对象属性会是 undefined。
+ 设置的键名始终存在
```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
//“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>）
//然后就可以在 exec 方法返回结果的 groups 属性上引用该组名。
//同时，数字序号（matchObj[1]）依然有效。
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

### 解构赋值和替换

+ 有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。
```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

//字符串替换时，使用$<组名>引用具名组。
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
//replace方法的第二个参数是一个字符串，而不是正则表达式。

/**
 * replace方法的第二个参数也可以是函数，该函数的参数序列如下。
 * */
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = groups;
 return `${day}/${month}/${year}`;
});
```

## 引用

+ 如果要在正则表达式内部引用某个“具名组匹配”，可以使用 [\k<组名>] 的写法。
```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/; //数字引用（\1）依然有效。可以同时使用
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```

## 正则匹配索引

+ 正则匹配结果的开始位置和结束位置，目前获取并不是很方便。
+ 正则实例的 exec() 方法，返回结果有一个 index 属性，可以获取整个匹配结果的开始位置，但是如果包含组匹配，每个组匹配的开始位置，很难拿到。
+ 现在有一个第三阶段提案，为 exec() 方法的返回结果加上 indices 属性，在这个属性上面可以拿到匹配的开始位置和结束位置。
```js
const text = 'zabbcdef';
const re = /ab/;
const result = re.exec(text);

result.index // 1
result.indices // [ [1, 3] ]
//注意，开始位置包含在匹配结果之中，但是结束位置不包含在匹配结果之中。
//比如，匹配结果为ab，分别是原始字符串的第1位和第2位，那么结束位置就是第3位。

//如果正则表达式包含组匹配，那么indices属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置。
const re = /ab+(cd)/;
const result = re.exec(text);

result.indices // [ [ 1, 6 ], [ 4, 6 ] ]
//正则表达式包含一个组匹配，那么indices属性数组就有两个成员
//第一个成员是整个匹配结果（abbcd）的开始位置和结束位置，第二个成员是组匹配（cd）的开始位置和结束位置。

//如果正则表达式包含具名组匹配，indices属性数组还会有一个groups属性。该属性是一个对象，可以从该对象获取具名组匹配的开始位置和结束位置。
const re = /ab+(?<Z>cd)/;
const result = re.exec(text);

result.indices.groups // { Z: [ 4, 6 ] }
```

## String.prototype.matchAll()

+ 如果一个正则表达式在字符串里面有多个匹配，现在一般使用 g 修饰符或 y 修饰符，在循环里面逐一取出。
```js
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
//while循环取出每一轮的正则匹配，一共三轮。
```

+ ES2020 增加了 String.prototype.matchAll() 方法，可以一次性取出所有匹配。
+ 不过，它返回的是一个遍历器（Iterator），而不是数组。
```js
const string = 'test1test2test3';
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// 由于string.matchAll(regex)返回的是遍历器，所以可以用 for...of 循环取出。
//相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。
//遍历器转为数组是非常简单的，使用...运算符和Array.from()方法就可以了。

// 转为数组的方法一
[...string.matchAll(regex)]

// 转为数组的方法二
Array.from(string.matchAll(regex))
```

# 数值的扩展

## 二进制和八进制表示法


+ ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b（或0B）和 0o（或0O）表示。
+ 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀 0 表示，ES6 进一步明确，要使用前缀0o表示。
+ 如果要将 0b 和 0o 前缀的字符串数值转为十进制，要使用 Number 方法。
```js
0b111110111 === 503 // true
0o767 === 503 // true
```

## Number.xxx
## isFinite(),isNaN()

+ ES6 在 Number 对象上，新提供了 Number.isFinite() 和 Number.isNaN() 两个方法。
+ Number.isFinite() 用来检查一个数值是否为有限的（finite），即不是 Infinity。
  + 如果参数类型不是数值，Number.isFinite 一律返回 false。

+ Number.isNaN() 用来检查一个值是否为 NaN。
  + 如果参数类型不是 NaN，Number.isNaN 一律返回 false。

+ 它们与传统的全局方法 isFinite() 和 isNaN() 的区别在于
+ 传统方法先调用 Number() 将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，
```js
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```

## parseInt(),parseFloat()

+ ES6 将全局方法 parseInt() 和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。
+ 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

## isInteger()

+ Number.isInteger() 用来判断一个数值是否为整数。
+ JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

+ 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，
+ 数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。
+ 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger 可能会误判。
+ `Number.isInteger(3.0000000000000002) // true`
+ 类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），
+ 即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger 也会误判。
```js
//总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
```

## EPSILON

+ ES6 在 Number 对象上面，新增一个极小的常量 Number.EPSILON。
+ 根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
+ Number.EPSILON 的实质是一个可以接受的最小误差范围。
```js
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

## 安全整数和 isSafeInteger()

+ JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点）
+ 超过这个范围，无法精确表示这个值。

+ ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量
+ 用来表示这个范围的上下限。
+ Number.isSafeInteger() 则是用来判断一个整数是否落在这个范围之内。
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

//函数的实现
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}
//实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。
//因为超过安全范围的数值会以安全数极点进行储存，导致运算结果出错
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
```

## Math 对象的扩展

+ ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

### Math.xxx
### trunc()

+ Math.trunc 方法用于去除一个数的小数部分，返回整数部分。
+ 对于非数值，Math.trunc 内部使用 Number 方法将其先转为数值。
+ 对于空值和无法截取整数的值，返回 NaN。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

### sign()

+ Math.sign 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
+ 它会返回五种值。
  + 参数为正数，返回 +1；
  + 参数为负数，返回 -1；
  + 参数为 0，返回 0；
  + 参数为 -0，返回 -0;
  + 其他值，返回 NaN。
+ 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回 NaN。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
```

### cbrt()

+ Math.cbrt() 方法用于计算一个数的立方根。
+ 对于非数值，Math.cbrt() 方法内部也是先使用 Number() 方法将其转为数值。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};
```

### clz32()

+ Math.clz32() 方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

//左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
//对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```

### imul()

+ Math.imul 方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
```js
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

//Math.imul方法可以返回正确的低位数值。
(0x7fffffff * 0x7fffffff)|0 // 0
/**
 * 上面这个乘法算式，返回结果为 0。
 * 但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，
 * 因为根据二进制乘法，计算结果的二进制最低位应该也是 1。
 * 这个错误就是因为它们的乘积超过了 2 的 53 次方，
 * JavaScript 无法保存额外的精度，就把低位的值都变成了 0。
 * */
//Math.imul方法可以返回正确的值 1。
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

### fround()

+ Math.fround 方法返回一个数的32位单精度浮点数形式。
+ 对于 NaN 和 Infinity，此方法返回原值。
+ 对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。
+ 如果参数的绝对值大于 224，返回的结果便开始丢失精度。
```js
//对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};
```

### hypot()

+ Math.hypot 方法返回所有参数的平方和的平方根。
+ 如果参数不是数值，Math.hypot 方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。

### 对数方法

+ ES6 新增了 4 个对数相关方法。

1. Math.expm1()
   + Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
```js
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
//模拟
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
```

2. Math.log1p()
   + Math.log1p(x) 方法返回 1 + x 的自然对数，即 Math.log(1 + x)。如果 x 小于 -1，返回 NaN。
```js
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
//模拟
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
```

3. Math.log10()
   + Math.log10(x) 返回以 10 为底的x的对数。如果 x 小于 0，则返回 NaN。
```js
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
//模拟
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
```

4. Math.log2()
   + Math.log2(x) 返回以 2 为底的 x 的对数。如果 x 小于 0，则返回 NaN。
```js
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29
//模拟
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
```

### 双曲函数方法

+ ES6 新增了 6 个双曲函数方法。

1. Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
2. Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
3. Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
4. Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
5. Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
6. Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

## 指数运算符

+ ES2016 新增了一个指数运算符（**）
```js
2 ** 2 // 4
2 ** 3 // 8
//这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512

//指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

