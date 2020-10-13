# 文档对象模型(DOM)

+ 文档对象模型( `DOM`,Document Object Model )是针对HTML的应用编程接口(`API`,Application Programming interface).

## 节点

+ DOM 的最小组成单位叫做节点（node）。
+ 文档的树形结构（DOM 树），就是由各种不同类型的节点组成。
+ 每个节点可以看作是文档树的一片叶子。

+ 节点类型
  - Document：整个文档树的顶层节点
  - DocumentType：doctype标签（比如<!DOCTYPE html>）
  - Element：网页的各种HTML标签（比如<body>、<a>等）
  - Attr：网页元素的属性（比如class="right"）
  - Text：标签之间或标签包含的文本
  - Comment：注释
  - DocumentFragment：文档的片段

+ 浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。

## 节点树

+ 一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。
+ 浏览器原生提供document节点，代表整个文档。

+ 文档的第一层有两个节点，第一个是文档类型节点（<!doctype html>）
+ 第二个是 HTML 网页的顶层容器标签<html>。
+ 后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

+ 除了根节点，其他节点都有三种层级关系。
  + 父节点关系（parentNode）：直接的那个上级节点
  + 子节点关系（childNodes）：直接的下级节点
  + 同级节点关系（sibling）：拥有同一个父节点的节点

+ DOM 提供操作接口，用来获取这三种关系的节点。
+ 比如，子节点接口包括firstChild（第一个子节点）和lastChild（最后一个子节点）等属性
+ 同级节点接口包括nextSibling（紧邻在后的那个同级节点）和previousSibling（紧邻在前的那个同级节点）属性。

# Node 接口

+ 所有节点都继承 Node

## 属性

1. Node.prototype.nodeType
   + nodeType 属性返回一个整数值，表示节点的类型。
   + `document.nodeType // 9`
   + Node 对象定义了几个常量，对应这些类型值。
   + `document.nodeType === Node.DOCUMENT_NODE // true`
     - 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
     - 元素节点（element）：1，对应常量Node.ELEMENT_NODE
     - 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
     - 文本节点（text）：3，对应常量Node.TEXT_NODE
     - 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
     - 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
     - 注释节点（Comment）：8，对应常量Node.COMMENT_NODE

2. Node.prototype.nodeName
   + nodeName 属性返回节点的名称。
   + 不同节点的 nodeName 属性
     - 文档节点（document）：#document
     - 元素节点（element）：大写的标签名
     - 属性节点（attr）：属性的名称
     - 文本节点（text）：#text
     - 文档片断节点（DocumentFragment）：#document-fragment
     - 文档类型节点（DocumentType）：文档的类型
     - 注释节点（Comment）：#comment

3. Node.prototype.nodeValue
   + nodeValue  属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。
   + 只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。
   + 同样也只有这三种可以设置

4. Node.prototype.textContent
   + textContent 属性返回当前节点和它的所有后代节点的文本内容。
   + textContent 属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。
   + 该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。
   + 它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。
   + 如大于号不用手动转义（&gt;）
   + 对于文本节点（text）、注释节点（comment）和属性节点（attr），textContent属性的值与nodeValue属性相同。
   + 对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。
   + 如果一个节点没有子节点，则返回空字符串。
   + 文档节点（document）和文档类型节点（doctype）的textContent属性为null。
   + 如果要读取整个文档的内容，可以使用 `document.documentElement.textContent`

5. Node.prototype.baseURI
   + baseURI 属性返回一个字符串，表示当前网页的绝对路径。
   + 浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。
   + 如果无法读到网页的 URL，baseURI属性返回null。
   + 该属性的值一般由当前网址的 URL（即window.location属性）决定，但是可以使用 HTML 的<base>标签，改变该属性的值。
   + `<base href="http://www.example.com/page.html">`

6. Node.prototype.ownerDocument
   + Node.ownerDocument 属性返回当前节点所在的顶层文档对象，即document对象。
   + document对象本身的 ownerDocument 属性，返回null。

7. Node.prototype.nextSibling
   + Node.nextSibling 属性返回紧跟在当前节点后面的第一个同级节点。
   + 如果当前节点后面没有同级节点，则返回null。
   + 注意，该属性还包括文本节点和注释节点（<!-- comment -->）。
   + 因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

8. Node.prototype.previousSibling
   + previousSibling 属性返回当前节点前面的、距离最近的一个同级节点。
   + 如果当前节点前面没有同级节点，则返回null。
   + 同 nextSibling 一样，包括文本节点、注释节点、空格。

9. Node.prototype.parentNode
   + parentNode 属性返回当前节点的父节点。
   + 对于一个节点来说，它的父节点只可能是三种类型
     - 元素节点（element）
     - 文档节点（document）
     - 文档片段节点（DocumentFragment）。
   + 文档节点（document）和文档片段节点（DocumentFragment）的父节点都是null。
   + 另外，对于那些生成后还没插入 DOM 树的节点，父节点也是null。

10. Node.prototype.parentElement
    + parentElement 属性返回当前节点的父元素节点。
    + 如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null。
    + 由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（DocumentFragment）。
    + parentElement属性相当于把后两种父节点都排除了。

11. Node.prototype.firstChild，Node.prototype.lastChild
    + firstChild 属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null。
    + 注意，firstChild返回的除了元素节点，还可能是文本节点或注释节点。
    - lastChild属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。
    - 用法与firstChild属性相同。

12. Node.prototype.childNodes
    + childNodes 属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
    + 文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点。
    + 注意，除了元素节点，childNodes 属性的返回值还包括文本节点和注释节点。
    + 如果当前节点不包括任何子节点，则返回一个空的 NodeList 集合。
    + 由于 NodeList 对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

13. Node.prototype.isConnected
    + isConnected属性返回一个布尔值，表示当前节点是否在文档之中。

## 方法

1. Node.prototype.appendChild()
   - appendChild() 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。
   - 该方法的返回值就是插入文档的子节点。
   - 插入的是一个已经存在的节点 myDiv，结果就是该节点会从原来的位置，移动到插入的位置
   - 如果appendChild()方法的参数是DocumentFragment节点，那么插入的是DocumentFragment的所有子节点，而不是DocumentFragment节点本身
   - 。返回值是一个空的DocumentFragment节点。

2. Node.prototype.hasChildNodes()
   + hasChildNodes 方法返回一个布尔值，表示当前节点是否有子节点。
   + 判断一个节点有没有子节点，有许多种方法，下面是其中的三种。
     - node.hasChildNodes()
     - node.firstChild !== null
     - node.childNodes && node.childNodes.length > 0
```js
//hasChildNodes方法结合firstChild属性和nextSibling属性，可以遍历当前节点的所有后代节点。
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback);
    }
  }
  callback(parent);
}

// 用法
DOMComb(document.body, console.log)
```

3. Node.prototype.cloneNode()
   + cloneNode方法用于克隆一个节点。
   + 它接受一个布尔值作为参数，表示是否同时克隆子节点。
   + 它的返回值是一个克隆出来的新节点。
   + 注意
     - 克隆一个节点，会拷贝该节点的所有属性，但是会丧失 addEventListener 方法和 on- ， 属性（即node.onclick = fn），添加在这个节点上的事件回调函数。
     - 该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如 Node.appendChild 这样的方法添加到文档之中。
     - 克隆一个节点之后，DOM 有可能出现两个有相同id属性（即id="xxx"）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改。

4. Node.prototype.insertBefore()
   + ``var insertedNode = parentNode.insertBefore(newNode, referenceNode);``
   + insertBefore 方法用于将某个节点插入父节点内部的指定位置。
   + insertBefore 方法接受两个参数，第一个参数是所要插入的节点 newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode。
   + newNode将插在referenceNode这个子节点的前面。返回值是插入的新节点newNode。
   + 如果 insertBefore 方法的第二个参数为 null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。
   + 注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。
   + 由于不存在insertAfter方法，如果新节点要插在父节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟。
   + ``parent.insertBefore(s1, s2.nextSibling);``

5. Node.prototype.removeChild()
   + removeChild 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
   + 被移除的节点存在内存中，可以重新添加回去。
   + 如果参数节点不是当前节点的子节点，removeChild方法将报错。

6. Node.prototype.replaceChild()
   + replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。
   + ``var replacedNode = parentNode.replaceChild(newChild, oldChild);``
   + replaceChild 方法接受两个参数
   + 第一个参数 newChild 是用来替换的新节点
   + 第二个参数 oldChild 是将要替换走的子节点。返回值是替换走的那个节点oldChild。

7. Node.prototype.contains()
   + contains 方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。
     - 参数节点为当前节点。
     - 参数节点为当前节点的子节点。
     - 参数节点为当前节点的后代节点。
   + ``document.body.contains(node)``

8. Node.prototype.compareDocumentPosition()
   + compareDocumentPosition方法的用法，与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系。

9. Node.prototype.isEqualNode()，Node.prototype.isSameNode()
   + isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。
   + 所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。
   + isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点。

10. Node.prototype.normalize()
   + normalize 方法用于清理当前节点内部的所有文本节点（text）。
   + 它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。

11. Node.prototype.getRootNode()
    + getRootNode() 方法返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同。
    + 该方法可用于document节点自身，这一点与document.ownerDocument不同。

# NodeList 接口，HTMLCollection 接口

+ 节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。
+ DOM 提供两种节点集合，用于容纳多个节点：NodeList和HTMLCollection。

+ 这两种集合都属于接口规范。
+ 许多 DOM 属性和方法，返回的结果是 NodeList 实例或 HTMLCollection 实例。
+ 主要区别是，NodeList可以包含各种类型的节点
+ HTMLCollection只能包含 HTML 元素节点。

## NodeList 接口

+ NodeList实例是一个类似数组的对象，它的成员是节点对象。
+ 通过以下方法可以得到NodeList实例。
  - Node.childNodes
  - document.querySelectorAll()等节点搜索方法
+ NodeList实例很像数组，可以使用length属性和forEach方法。
+ 但是，它不是数组，不能使用pop或push之类数组特有的方法。
+ 如果NodeList实例要使用数组方法，可以将其转为真正的数组。
```js
var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
```

+ 注意，NodeList 实例可能是动态集合，也可能是静态集合。
+ 所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 NodeList 实例。
+ 目前，只有 Node.childNodes 返回的是一个动态集合，其他的 NodeList 都是静态集合。

### NodeList.prototype.length

+ length 属性返回 NodeList 实例包含的节点数量。

### NodeList.prototype.forEach()

+ forEach方法用于遍历 NodeList 的所有成员。
+ 它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的forEach方法完全一致。
```js
var children = document.body.childNodes;
children.forEach(function f(item, i, list) {
  // ...
}, this); // this 绑定内部作用域  该 this 指向 children
```

### NodeList.prototype.item()

+ item方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。

- ``document.body.childNodes.item(0)``

### keys()，values()，entries()

+ NodeList.prototype.keys()
+ NodeList.prototype.values()
+ NodeList.prototype.entries()

+ 这三个方法都返回一个 ES6 的遍历器对象，可以通过for...of循环遍历获取每一个成员的信息。
+ 区别在于，keys()返回键名的遍历器
+ values()返回键值的遍历器
+ entries()返回的遍历器同时包含键名和键值的信息。

## HTMLCollection 接口

+ HTMLCollection 是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。
+ 它的返回值是一个类似数组的对象，但是与 NodeList 接口不同，HTMLCollection 没有 forEach 方法，只能使用 for 循环遍历。
+ 返回HTMLCollection实例的，主要是一些Document对象的集合属性
  + 比如document.links、document.forms、document.images等。
+ HTMLCollection实例都是动态集合，节点的变化会实时反映在集合中。

### HTMLCollection.prototype.length

+ length属性返回HTMLCollection实例包含的成员数量。

### HTMLCollection.prototype.item()

+ item方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。
```js
var c = document.images;
var img0 = c.item(0);
```

### HTMLCollection.prototype.namedItem()

+ namedItem方法的参数是一个字符串，表示id属性或name属性的值，返回对应的元素节点。
+ 如果没有对应的节点，则返回null。

# ParentNode 接口

+ 如果当前节点是父节点，就会混入了（mixin）ParentNode接口。
+ 由于只有元素节点（element）
+ 文档节点（document）和 文档片段节点（documentFragment）
+ 拥有子节点，因此只有这三类节点会拥有 ParentNode 接口。

## ParentNode.children

+ children 属性返回一个 HTMLCollection 实例，成员是当前节点的所有元素子节点。该属性只读。
+ 注意，children属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。
+ 如果没有元素类型的子节点，返回值 HTMLCollection 实例的 length 属性为0。
+ HTMLCollection 是动态集合，会实时反映 DOM 的任何变化。

## ParentNode.firstElementChild

+ firstElementChild 属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回null。

## ParentNode.lastElementChild

+ lastElementChild 属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回null。

## ParentNode.childElementCount

+ childElementCount属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0。

## ParentNode.append()，ParentNode.prepend()

+ append方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
+ 该方法不仅可以添加元素子节点，还可以添加文本子节点。

+ prepend方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。
+ 它的用法与append方法完全一致，也是没有返回值。

- ``document.body.append(p1,p2);``

# ChildNode 接口

+ 如果一个节点有父节点，那么该节点就拥有了ChildNode接口。

## ChildNode.remove()

+ remove 方法用于从父节点移除当前节点。删除自己

## ChildNode.before()，ChildNode.after()

+ before 方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
+ 注意，该方法不仅可以插入元素节点，还可以插入文本节点。

- ``el.before(p1,p2);``

+ after方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与before方法完全相同。

## ChildNode.replaceWith()

+ replaceWith 方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。

- ``el.replaceWith(span);``

# Document 节点

+ document 节点对象代表整个文档，每张网页都有自己的 document 对象。
+ window.document 属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

+ document 对象有不同的办法可以获取。
  - 正常的网页，直接使用 document 或 window.document。
  - iframe 框架里面的网页，使用 iframe 节点的 contentDocument 属性。
  - Ajax 操作返回的文档，使用 XMLHttpRequest 对象的 responseXML 属性。
  - 内部节点的 ownerDocument 属性。

+ document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。
+ 这意味着，这些接口的方法都可以在document对象上调用。
+ 除此之外，document对象还有很多自己的属性和方法。

## 属性

### 快捷方式属性

1. document.defaultView
   + document.defaultView 属性返回 document 对象所属的 window 对象。
   + 如果当前文档不属于window对象，该属性返回null。

2. document.doctype
   1. 对于 HTML 文档来说，document对象一般有两个子节点。
   2. 第一个子节点是document.doctype，指向<DOCTYPE>节点，即文档类型（Document Type Declaration，简写DTD）节点。
   3. HTML 的文档类型节点，一般写成<!DOCTYPE html>。
   4. 如果网页没有声明 DTD，该属性返回null。

3. document.documentElement
   1. document.documentElement 属性返回当前文档的根元素节点（root）。
   2. 它通常是 document 节点的第二个子节点，紧跟在 document.doctype 节点后面。
   3. HTML 网页的该属性，一般是<html>节点。

4. document.body，document.head
   1. document.body 属性指向 <body> 节点，document.head 属性指向 <head> 节点。
   2. 这两个属性总是存在的，如果网页源码里面省略了<head>或<body>，浏览器会自动创建。
   3. 这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

5. document.scrollingElement
   1. document.scrollingElement 属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。
   2. 标准模式下，这个属性返回的文档的根元素 document.documentElement（即<html>）。
   3. 兼容（quirk）模式下，返回的是<body>元素，如果该元素不存在，返回null。
   - ``document.scrollingElement.scrollTop = 0;``

6. document.activeElement
   1. document.activeElement 属性返回获得当前焦点（focus）的 DOM 元素。
   2. 如果当前没有焦点元素，返回 <body> 元素或 null。

7. document.fullscreenElement
   1. document.fullscreenElement 属性返回当前以全屏状态展示的 DOM 元素。
   2. 如果不是全屏状态，该属性返回null。

### 节点集合属性

+ 除了document.styleSheets，集合属性返回的都是 HTMLCollection 实例。
+ HTMLCollection 是类数组对象，都可以用 name 或 id 来索引成员

1. document.links
   1. document.links 属性返回当前文档所有设定了 href 属性的<a>及<area>节点。

2. document.forms
   1. document.forms 属性返回所有<form>表单节点。
   2. ``var selectForm = document.forms[0];``
   3. 除了使用位置序号，id 属性和 name 属性也可以用来引用表单。


3. document.images
   1. document.images 属性返回页面所有<img>图片节点。

4. document.embeds，document.plugins
   1. document.embeds 属性和 document.plugins 属性，都返回所有<embed>节点。

5. document.scripts
   1. document.scripts属性返回所有<script>节点。

6. document.styleSheets
   1. document.styleSheets 属性返回文档内嵌或引入的样式表集合

### 文档静态信息属性

1. document.documentURI，document.URL
   1. 都返回一个字符串，表示当前文档的网址。
   2. documentURI 继承自 Document 接口，可用于所有文档。
   3. URL 继承自 HTMLDocument 接口，只能用于 HTML 文档。

2. document.domain
   1. document.domain 属性返回当前文档的域名，不包含协议和端口。

3. document.location
   1. Location 对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。
   2. 通过 window.location 和 document.location 属性，可以拿到这个对象。

4. document.lastModified
   1. document.lastModified 属性返回一个字符串，表示当前文档最后修改的时间。
   2. 不同浏览器的返回值，日期格式是不一样的。

5. document.title
   1. document.title 属性返回当前文档的标题。
   2. 默认情况下，返回<title>节点的值。
   3. 但是该属性是可写的，一旦被修改，就返回修改后的值。

6. document.characterSet
   1. document.characterSet 属性返回当前文档的编码，比如 UTF-8、ISO-8859-1 等等。

7. document.referrer
   1. document.referrer 属性返回一个字符串，表示当前文档的访问者来自哪里。

8. document.dir
   1. document.dir 返回一个字符串，表示文字方向

9. document.compatMode
   1. compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。

### 文档状态属性

1. 