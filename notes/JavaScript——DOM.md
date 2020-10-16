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

6. Node.prototype.replaceChild(newChild,oldChild)
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
+ 返回 HTMLCollection 实例的，主要是一些 Document 对象的集合属性
  + 比如 document.links、document.forms、document.images 等。
+ HTMLCollection 实例都是动态集合，节点的变化会实时反映在集合中。

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

1. document.hidden
   1. document.hidden 属性返回一个布尔值，表示当前页面是否可见。
   2. 如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得 document.hidden 返回true。

2. document.visibilityState
   1. document.visibilityState 返回文档的可见状态。
   2. 它的值有四种可能。
      1. visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
      2. hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
      3. prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。
      4. unloaded：页面从内存里面卸载了。
   3. 这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

3. document.readyState
   1. document.readyState 性返回当前文档的状态，共有三种可能的值。
   2. loading：加载 HTML 代码阶段（尚未完成解析）
   3. interactive：加载外部资源阶段
   4. complete：加载完成
   5. 这个属性变化的过程如下。
      1. 浏览器开始解析 HTML 文档，document.readyState 属性等于 loading。
      2. 浏览器遇到 HTML 文档中的<script/>元素，并且没有 async 或 defer 属性，就暂停解析，开始执行脚本，这时 document.readyState 属性还是等于 loading。
      3. HTML 文档解析完成，document.readyState 属性变成 interactive。
      4. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document.readyState 属性变成 complete。
   6. 每次状态变化都会触发一个readystatechange事件。
```js
   // 轮询检查
   var interval = setInterval(function() {
   if (document.readyState === 'complete') {
      clearInterval(interval);
      // ...
   }
   }, 100);
```

4. document.cookie
   1. document.cookie 属性用来操作浏览器 Cookie

5. document.designMode
   1. document.designMode 属性控制当前文档是否可编辑。
   2. 该属性只有两个值 on 和 off，默认值为 off。一旦设为 on，用户就可以编辑整个文档的内容。

6. document.currentScript
   1. document.currentScript 属性只用在 <script/>元素的内嵌脚本或加载的外部脚本之中，返回当前脚本所在的那个 DOM 节点，即 <script> 元素的 DOM 节点。

7. document.implementation
   1. document.implementation 属性返回一个 DOMImplementation 对象。
   2. 该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。
      1. DOMImplementation.createDocument()：创建一个 XML 文档。
      2. DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
      3. DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。

## 方法(document 对象)

### open()，close()

+ document.open 方法清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容。
+ document.close 方法用来关闭 document.open() 打开的文档。

### write()，writeln()

+ document.write 方法用于向当前文档写入内容。document.writeln 会在行位添加换行符
+ 注意，document.write 会当作 HTML 代码解析，不会转义。
+ 如果页面已经解析完成（ DOMContentLoaded 事件发生之后），再调用 write方法，它会先调用 open 方法，擦除当前文档所有内容，然后再写入。
+ 如果在页面渲染过程中调用 write 方法，并不会自动调用 open 方法。（可以理解成，open 方法已调用，但 close 方法还未调用。）

### querySelector()，querySelectorAll()

+ document.querySelector 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。
+ 如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 null。
+ document.querySelectorAll 方法与 querySelector 用法类似，区别是返回一个 NodeList 对象，包含所有匹配给定选择器的节点。
+ 这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。

+ querySelectorAll 的返回结果不是动态集合，不会实时反映元素节点的变化。

+ 这两个方法除了定义在 document 对象上，还定义在元素节点上，即在元素节点上也可以调用。

+ 不支持 CSS 伪类选择器和伪元素选择器

### getElementsByTagName()

+ document.getElementsByTagName() 方法搜索 HTML 标签名，返回符合条件的元素。
+ 它的返回值是一个类似数组对象（HTMLCollection实例），可以实时反映 HTML 文档的变化。
+ 如果没有任何匹配的元素，就返回一个空集。

+ 这个方法不仅可以在document对象上调用，也可以在任何元素节点上调用。

### getElementsByClassName()

+ document.getElementsByClassName() 方法返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中。

+ 由于 class 是保留字，所以 JavaScript 一律使用 className 表示 CSS 的 class。
+ 参数可以是多个class，它们之间使用空格分隔。

+ 同样可以在元素节点上调用

### getElementsByName()

+ document.getElementsByName() 方法用于选择拥有name属性的 HTML 元素
+ 返回一个类似数组的的对象（NodeList实例），因为 name 属性相同的元素可能不止一个。

### getElementById()

+ document.getElementById() 方法返回匹配指定 id 属性的元素节点。
+ 如果没有发现匹配的节点，则返回 null。

+ 这个方法只能在document对象上使用，不能在其他元素节点上使用。

### elementFromPoint()，elementsFromPoint()

+ document.elementFromPoint() 方法返回位于页面指定位置最上层的元素节点。

+ elementFromPoint 方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素
+ 。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回null。

+ document.elementsFromPoint() 返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

- ``var elements = document.elementsFromPoint(x, y);``

### createElement()

+ document.createElement 方法用来生成元素节点，并返回该节点。
+ createElement 方法的参数为元素的标签名，即元素节点的 tagName 属性
+ 对于 HTML 网页大小写不敏感
+ document.createElement 的参数可以是自定义的标签名。

### createTextNode()

+ document.createTextNode 方法用来生成文本节点（Text实例），并返回该节点。
+ 它的参数是文本节点的内容。

+ 这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。
+ 该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

### createAttribute()

+ document.createAttribute 方法生成一个新的属性节点（Attr实例），并返回它。
+ document.createAttribute 方法的参数 name，是属性的名称。
+ 返回的 Attr 实例，可以用 value 对属性进行赋值

### createComment()

+ document.createComment 方法生成一个新的注释节点，并返回该节点。
+ 参数是一个字符串，会成为注释节点的内容。

### createDocumentFragment()

+ document.createDocumentFragment 方法生成一个空的文档片段对象（DocumentFragment实例）。

### createEvent()

+ document.createEvent 方法生成一个事件对象（Event实例）
+ 该对象可以被 element.dispatchEvent 方法使用，触发指定事件。
```js
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  console.log(e.type); // "build"
}, false);
document.dispatchEvent(event);
```

### addEventListener()，removeEventListener()，dispatchEvent()

+ 这三个方法用于处理 document 节点的事件。它们都继承自 EventTarget 接口
```js
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

### hasFocus()

+ document.hasFocus 方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

### adoptNode()，importNode()

+ document.adoptNode 方法将某个节点及其子节点
+ 从原来所在的文档或 DocumentFragment 里面移除
+ 归属当前 document 对象，返回插入后的新节点。
+ 插入的节点对象的 ownerDocument 属性，会变成当前的 document 对象，而 parentNode 属性是null。

+ document.importNode 方法则是从原来所在的文档或 DocumentFragment 里面
+ 拷贝某个节点及其子节点，让它们归属当前 document 对象。
+ 拷贝的节点对象的 ownerDocument 属性，会变成当前的 document 对象，而 parentNode 属性是null。

### createNodeIterator()

+ document.createNodeIterator 方法返回一个子节点遍历器。

### createTreeWalker()

+ document.createTreeWalker 方法返回一个 DOM 的子树遍历器。
+ 它与 document.createNodeIterator 方法基本是类似的
+ 区别在于它返回的是 TreeWalker 实例，后者返回的是 NodeIterator 实例。
+ 另外，它的第一个节点不是根节点。

### execCommand()，queryCommandSupported()，queryCommandEnabled()

1. document.execCommand()
   1. 如果 document.designMode 属性设为 on，那么整个文档用户可编辑；
   2. 如果元素的 contenteditable 属性设为 true，那么该元素可编辑。
   3. 这两种情况下，可以使用 document.execCommand() 方法，改变内容的样式，比如 document.execCommand('bold') 会使得字体加粗。
``document.execCommand(command, showDefaultUI, input)``
   1. command：字符串，表示所要实施的样式。
   2. showDefaultUI：布尔值，表示是否要使用默认的用户界面，建议总是设为 false。
   3. input：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。
      1. 如果第二个参数设为true，那么浏览器会弹出提示框，要求用户在提示框输入该参数。
      2. 但是，不是所有浏览器都支持这样做，为了兼容性，还是需要自己部署获取这个参数的方式。

2. document.queryCommandSupported()
   1. document.queryCommandSupported() 方法返回一个布尔值，表示浏览器是否支持 document.execCommand() 的某个命令。

3. document.queryCommandEnabled()
   1. document.queryCommandEnabled() 方法返回一个布尔值，表示当前是否可用 document.execCommand() 的某个命令。

### document.getSelection()

+ 这个方法指向 window.getSelection()

# Element 节点

+ 每一个 HTML 元素，在 DOM 树上都会转化成一个 Element 节点对象
+ 元素节点的 nodeType 属性都是 1
+ Element 对象继承了 Node 接口，因此 Node 的属性和方法在 Element 对象都存在。

+ 不同的 HTML 元素对应的元素节点是不一样的，不同的元素使用了不同的构造函数生成不同的元素节点
+ 因此，元素节点不是一种对象，而是多种，这些对象除了继承 Element 对象的属性和方法，还有各自独有的属性和方法

## 实例属性

### 元素特性的相关属性

1. Element.id
   1. Element.id 属性返回指定元素的 id 属性，该属性可读写。
   2. id 属性的值是大小写敏感

2. Element.tagName
   1. Element.tagName 属性返回指定元素的大写标签名，与 nodeName 属性的值相等。

3. Element.dir
   1. Element.dir 属性用于读写当前元素的文字方向，可能是从左到右（"ltr"），也可能是从右到左（"rtl"）。

4. Element.accessKey
   1. Element.accessKey 属性用于读写分配给当前元素的快捷键。

5. Element.draggable
   1. Element.draggable 属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。

6. Element.lang
   1. Element.lang 属性返回当前元素的语言设置。该属性可读写。

7. Element.tabIndex
   1. Element.tabIndex 属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
   2. tabIndex 属性值如果是负值（通常是-1），则 Tab 键不会遍历到该元素。

8. Element.title
   1. Element.title 属性用来读写当前元素的 HTML 属性 title。
   2. 该属性通常用来指定，鼠标悬浮时弹出的文字提示框。

### 元素状态的相关属性

1. Element.hidden
   1. Element.hidden 属性返回一个布尔值，表示当前元素的 hidden 属性，用来控制当前元素是否可见。该属性可读写。
   2. 注意，该属性与 CSS 设置是互相独立的。CSS 对这个元素可见性的设置，Element.hidden 并不能反映出来。
   3. CSS 的设置等级高于该属性

2. Element.contentEditable，Element.isContentEditable
   1. HTML 元素可以设置 contentEditable 属性，使得元素的内容可以编辑。
      1. "true"：元素内容可编辑
      2. "false"：元素内容不可编辑
      3. "inherit"：元素是否可编辑，继承了父元素的设置
   2. Element.isContentEditable 属性返回一个布尔值，同样表示是否设置了 contenteditable 属性。该属性只读。

3. Element.attributes
   1. Element.attributes 属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点

4. Element.className，Element.classList
   1. className 属性用来读写当前元素节点的 class 属性它的值是一个字符串，每个 class 之间用空格分割。
   2. classList 属性返回一个类似数组的对象，当前元素节点的每个 class 就是这个对象的一个成员。
   3. classList 对象有下列方法。 （参数大多都为 class 字符串）
      1. add("类名")：增加一个 class。
      2. remove("类名")：移除一个 class。
      3. contains("类名")：检查当前元素是否包含某个 class。
      4. toggle("类名")：将某个 class 移入或移出当前元素。
      5. item(index)：返回指定索引位置的 class。
      6. toString()：将 class 的列表转为字符串。
      7. toggle方法可以接受一个布尔值，作为第二个参数。如果为true，则添加该属性；如果为false，则去除该属性。

5. Element.dataset
   1. 网页元素可以自定义 data- 属性，用来添加数据。
   2. Element.dataset 属性返回一个对象，可以从这个对象读写 data- 属性。
   3. HTML 代码中的 data- 属性名 转换成对应的 JavaScript 属性名
      1. 开头的data-会省略。
      2. 如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。
      3. 其他字符不变。
      4. 因此，data-abc-def 对应 dataset.abcDef，data-abc-1 对应dataset["abc-1"]。
   4. Element.getAttribute() 和 Element.setAttribute()，通过完整的属性名读写这些属性。
```js
<div data-timestamp="1522907809292"></div>
// <article
//   id="foo"
//   data-columns="3"
//   data-index-number="12314"
//   data-parent="cars">
//   ...
// </article>
var article = document.getElementById('foo');
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

6. Element.style 读写元素的行内元素

### 元素宽高相关

1. Element.clientHeight，Element.clientWidth
   1. Element.clientHeight 属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。
   2. 如果块级元素没有设置 CSS 高度，则返回实际高度。
   3. 除了元素本身的高度，它还包括 padding 部分，但是不包括 border、margin。
   4. 如果有水平滚动条，还要减去水平滚动条的高度。
   5. 注意，这个值始终是整数，如果是小数会被四舍五入。
   6. Element.clientWidth 返回宽度，其他一样
```js
// 视口高度   （即浏览器窗口的高度）
document.documentElement.clientHeight
// 网页总高度  网页的实际高度。
document.body.clientHeight
```

2. Element.clientLeft，Element.clientTop
   1. Element.clientLeft 属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的 padding 和 margin。
   2. 如果没有设置左边框，或者是行内元素（display: inline），该属性返回 0。该属性总是返回整数值，如果是小数，会四舍五入。
   3. Element.clientTop 属性等于网页元素顶部边框的宽度（单位像素），其他特点都与clientLeft 相同。

3. Element.scrollHeight，Element.scrollWidth
    1. 这两个属性返回当前元素的总高度和总宽度，包括溢出容器的部分，包括 padding，不包括 border 、 margin 、 水平滚动条的高度 、 伪元素的高度
    2. 返回一个整数值，小数会四舍五入

4. Element.scrollLeft，Element.scrollTop
    1. Element.scrollLeft 属性表示当前元素的水平滚动条向右侧滚动的像素数量
    2. Element.scrollTop 属性表示当前元素的垂直滚动条向下滚动的像素数量。
    3. 对于那些没有滚动条的网页元素，这两个属性总是等于0。
    4. 这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。

5. Element.offsetHeight，Element.offsetWidth
    1. Element.offsetHeight 属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）。
    2. 只读属性

6. Element.offsetLeft，Element.offsetTop
    1. Element.offsetLeft 返回当前元素左上角相对于 Element.offsetParent 节点的水平位移
    2. Element.offsetTop 返回垂直位移，单位为像素。
    3. 通常，这两个值是指相对于父节点的位移。
    4. 只读属性

### 元素内容

1. Element.innerHTML
   1. Element.innerHTML属性返回一个字符串，等同于该元素包含的所有 HTML 代码。
   2. 该属性可读写，常用来设置某个节点的内容。
   3. 它能改写所有元素节点的内容，包括<HTML>和<body>元素。
   4. 包含 HTML 标签，会被解析成为节点对象插入 DOM。
   5. 如果插入的是文本，最好用textContent属性代替innerHTML。

2. Element.outerHTML
   1. Element.outerHTML 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。
   2. outerHTML 属性是可读写的，对它进行赋值，等于替换掉当前元素。
   3. 注意，如果一个节点没有父节点，设置 outerHTML 属性会报错。


### 相关元素

1. Element.offsetParent
    1. Element.offsetParent 属性返回最靠近当前元素的、并且 CSS 的 position 属性不等于 static 的上层元素。
    2. 也就是说返回最接近的已定位元素

2. Element.children，Element.childElementCount
    1. Element.children 属性返回一个类似数组的对象（HTMLCollection实例），包括当前元素节点的所有子元素。
    2. 如果当前元素没有子元素，则返回的对象包含零个成员。
    3. 这个属性与 Node.childNodes 属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。
    4. Element.childElementCount 属性返回当前元素节点包含的子元素节点的个数，与 Element.children.length 的值相同。

3. Element.firstElementChild，Element.lastElementChild
    1. Element.firstElementChild 属性返回当前元素的第一个元素子节点，Element.lastElementChild 返回最后一个元素子节点。
    2. 如果没有元素子节点，这两个属性返回 null。

4. Element.nextElementSibling，Element.previousElementSibling
    1. Element.nextElementSibling 属性返回当前元素节点的后一个同级元素节点，如果没有则返回null。
    2. Element.previousElementSibling 属性返回当前元素节点的前一个同级元素节点，如果没有则返回null。

## 实例方法

### 属性相关方法

+ 元素节点提供六个方法，用来操作属性。
  1. getAttribute()：读取某个属性的值
  2. getAttributeNames()：返回当前元素的所有属性名
  3. setAttribute()：写入属性值
  4. hasAttribute()：某个属性是否存在
  5. hasAttributes()：当前元素是否有属性
  6. removeAttribute()：删除属性

### querySelector()，querySelectorAll()

+ Element.querySelector()，Element.querySelectorAll()

+ 同 document.querySelector 用法一样
+ 浏览器执行 querySelector 方法时，是先在全局范围内搜索给定的 CSS 选择器
+ 然后过滤出哪些属于当前元素的子元素。
+ 也就是说在搜索 CSS 选择器时，当前元素上一级元素也会影响该方法的选择

### 搜索当前元素的子节点

+ Element.getElementsByClassName()
+ Element.getElementsByTagName()

### Element.closest()

+ Element.closest 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。
+ 如果没有任何节点匹配 CSS 选择器，则返回null。
```js
// HTML 代码如下
// <article>
//   <div id="div-01">Here is div-01
//     <div id="div-02">Here is div-02
//       <div id="div-03">Here is div-03</div>
//     </div>
//   </div>
// </article>

var div03 = document.getElementById('div-03');

// div-03 最近的祖先节点
div03.closest("#div-02") // div-02
div03.closest("div div") // div-03
div03.closest("article > div") //div-01
div03.closest(":not(div)") // article
```

### Element.matches()

+ Element.matches 方法返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器。

### 事件相关方法

+ 以下三个方法与 Element 节点的事件相关。这些方法都继承自 EventTarget 接口，详见相关章节。
  1. Element.addEventListener()：添加事件的回调函数
  2. Element.removeEventListener()：移除事件监听函数
  3. Element.dispatchEvent()：触发事件

### scrollIntoView()

+ Element.scrollIntoView 方法滚动当前元素，进入浏览器的可见区域，类似于设置 window.location.hash 的效果。
+ 该方法可以接受一个布尔值作为参数。

### getBoundingClientRect()

+ Element.getBoundingClientRect 方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。
+ getBoundingClientRect 方法返回的 rect 对象，具有以下属性（全部为只读）。
  1. x：元素左上角相对于视口的横坐标
  2. y：元素左上角相对于视口的纵坐标
  3. height：元素高度
  4. width：元素宽度
  5. left：元素左上角相对于视口的横坐标，与 x 属性相等
  6. right：元素右边界相对于视口的横坐标（等于 x + width ）
  7. top：元素顶部相对于视口的纵坐标，与 y 属性相等
  8. bottom：元素底部相对于视口的纵坐标（ 等于 y + height ）

+ 由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。
+ 如果想得到绝对位置，可以将 left 属性加上 window.scrollX
+ top 属性加上 window.scrollY。

+ 注意，getBoundingClientRect 方法的所有属性，都把边框（border属性）算作元素的一部分。
+ 也就是说，都是从边框外缘的各个点来计算。因此，width 和 height 包括了元素本身 + padding + border。

+ 该对象的属性都是继承自原型的属性，没有自身属性

### getClientRects()

+ Element.getClientRects 方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的Rect用的是复数）。
+ 每个矩形都有 bottom、height、left、right、top 和 width 六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

### insertAdjacentElement()

+ Element.insertAdjacentElement 方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回 null。
+ ``element.insertAdjacentElement(position, element);``
+ Element.insertAdjacentElement 方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。
+ 第一个参数只可以取如下的值。
  1. beforebegin：当前元素之前
  2. afterbegin：当前元素内部的第一个子节点前面
  3. beforeend：当前元素内部的最后一个子节点后面
  4. afterend：当前元素之后 
+ 注意，beforebegin 和 afterend 这两个值，只在当前节点有父节点时才会生效。
+ o如果当前节点是由脚本创建的，没有父节点，那么插入会失败。o9

### insertAdjacentHTML()，Element.insertAdjacentText()

+ Element.insertAdjacentHTML 方法用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置。
+ ``element.insertAdjacentHTML(position, text);``
+ 第一个参数只可以取如下的值。
  1. beforebegin：当前元素之前
  2. afterbegin：当前元素内部的第一个子节点前面
  3. beforeend：当前元素内部的最后一个子节点后面
  4. afterend：当前元素之后 

+ Element.insertAdjacentText 方法在相对于当前节点的指定位置，插入一个文本节点，用法与 Element.insertAdjacentHTML 方法完全一致。

### Element.remove()

+ Element.remove 方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。

### Element.focus()，Element.blur()

+ Element.focus 方法用于将当前页面的焦点，转移到指定元素上。
+ 从 document.activeElement 属性可以得到当前获得焦点的元素。

+ Element.blur 方法用于将焦点从当前元素移除。

### Element.click()

+ Element.click 方法用于在当前元素上模拟一次鼠标点击，相当于触发了 click 事件。

## 属性的操作

### Element.attributes 属性

+ 元素对象有一个 attributes 属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。
+ 其他类型的节点对象，虽然也有 attributes 属性，但返回的都是 null，因此可以把这个属性视为元素对象独有的。
+ 单个属性可以通过序号引用，也可以通过属性名引用。
+ 属性节点对象有 name 和 value 属性，对应该属性的属性名和属性值
+ 等同于 nodeName 属性和 nodeValue 属性。
```js
// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0]
document.body.attributes.bgColor
document.body.attributes['ONLOAD']
```

### 元素的标准属性

+ HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。
+ 这些属性都是可写的。但是无法删除属性，delete运算符在这里不会生效。
+ 属性名在 JavaScript 中为驼峰拼写法，保留字 for => htmlFor , class => className
+ HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。
  + 比如，将字符串true转为布尔值，将onClick的值转为一个函数，将style属性的值转为一个CSSStyleDeclaration对象。
  + 因此，可以对这些属性赋予各种类型的值。
```js
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
//a 元素标签的属性 id 和 href，自动成为节点对象的属性。
```

### 属性操作的标准方法

+ 元素节点提供六个方法，用来操作属性。
  1. getAttribute()
  2. getAttributeNames()
  3. setAttribute()
  4. hasAttribute()
  5. hasAttributes()
  6. removeAttribute()

+ 适用性
  + 这六个方法对所有属性（包括用户自定义的属性）都适用。

+ 返回值
  + getAttribute() 只返回字符串，不会返回其他类型的值。

+ 属性名
  + 这些方法只接受属性的标准名称，不用改写保留字，比如 for 和 class 都可以直接使用。
  + 这些方法对于属性名是大小写不敏感的。

#### getAttribute('Attr')

+ Element.getAttribute 方法返回当前元素节点的指定属性。如果指定属性不存在，则返回 null。

#### getAttributeNames()

+ Element.getAttributeNames() 返回一个数组，成员是当前元素的所有属性的名字。
+ 如果当前元素没有任何属性，则返回一个空数组。使用 Element.attributes 属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。

#### setAttribute('Attr','value')

+ Element.setAttribute 方法用于为当前元素节点新增属性。
+ 如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。
``div.setAttribute('name','value')``

#### hasAttribute()

+ Element.hasAttribute 方法返回一个布尔值，表示当前元素节点是否包含指定属性。

#### hasAttributes()

+ Element.hasAttributes 方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回false，否则返回true。

#### removeAttribute()

+ Element.removeAttribute 方法移除指定属性。该方法没有返回值。

### dataset 属性

+ 自定义属性。
```js
//自定义属性设置方式  data-  开头，后接属性名
<div id="my-div" data-foo="bar"></div>
//data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)。而且，属性名不应该使用A到Z的大写字母，比如不能有data-helloWorld这样的属性名，而要写成data-hello-world。
/* 
  转成dataset的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。
  反过来，dataset的键名转成属性名时，所有大写字母都会被转成连词线 + 该字母的小写形式，其他字符不变。比如，dataset.helloWorld会转成data-hello-world。
*/
```

# Text 节点和 DocumentFragment 节点

## Text 节点的概念

+ 文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。
+ 由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。

+ 浏览器原生提供一个Text构造函数。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。
+ 文本节点除了继承Node接口，还继承了CharacterData接口。

## Text 节点的属性

### data

+ data 属性等同于 nodeValue 属性，用来设置或读取文本节点的内容。

### wholeText

+ wholeText 属性将当前文本节点与毗邻的文本节点，作为一个整体返回。
+ 大多数情况下，wholeText 属性的返回值，与 data 属性和 textContent 属性相同。
+ 但是，某些特殊情况会有差异。

### length 属性返回当前文本节点的文本长度。

### nextElementSibling，previousElementSibling

+ nextElementSibling 属性返回紧跟在当前文本节点后面的那个同级元素节点。
+ 如果取不到元素节点，则返回null。

+ previousElementSibling 属性返回当前文本节点前面最近的同级元素节点。
+ 如果取不到元素节点，则返回null：。

## Text 节点的方法

### appendData()，deleteData()，insertData()，replaceData()，subStringData()

+ 以下5个方法都是编辑 Text 节点文本内容的方法。
  1. appendData()：在 Text 节点尾部追加字符串。
  2. deleteData()：删除 Text 节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度。
  3. insertData()：在 Text 节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
  4. replaceData()：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。
  5. subStringData()：用于获取子字符串，第一个参数为子字符串在 Text 节点中的开始位置，第二个参数为子字符串长度。

### remove() 方法用于移除当前Text节点

### splitText()

+ splitText 方法将 Text 节点一分为二，变成两个毗邻的 Text 节点。
+ 它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。
+ 分割后，该方法返回分割位置后方的字符串，而原 Text 节点变成只包含分割位置前方的字符串。

## DocumentFragment 节点

+ DocumentFragment 节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。
+ 它没有父节点，parentNode 返回 null，但是可以插入任意数量的子节点。
+ 它不属于当前文档，操作 DocumentFragment 节点，要比直接操作 DOM 树快得多。

+ 它一般用于构建一个 DOM 结构，然后插入当前文档。
+ document.createDocumentFragment 方法，以及浏览器原生的 DocumentFragment 构造函数，可以创建一个空的 DocumentFragment 节点。
+ 然后再使用其他 DOM 方法，向其添加子节点。

# CSS 操作

## HTML 元素的 style 属性

+ 操作 CSS 样式最简单的方法，就是使用网页元素节点的 getAttribute() 方法、setAttribute()方法和 removeAttribute() 方法，直接读写或删除网页元素的 style 属性。

+ style 不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口，可以直接读写个别属性。

## CSSStyleDeclaration 接口

+ CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。
  1. 元素节点的 style 属性（Element.style）
  2. CSSStyle 实例的 style 属性
  3. window.getComputedStyle() 的返回值

+ CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。
```js
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
//background-color => backgroundColor
divStyle.backgroundColor // red
divStyle.border // 1px solid black
```

### 实例属性

1. CSSStyleDeclaration.cssText
   + CSSStyleDeclaration.cssText 属性用来读写当前规则的所有样式声明文本。
   + 注意，cssText 的属性值不用改写 CSS 属性名。
   + 设置为空，可以删除所有行内样式

2. CSSStyleDeclaration.length
   + CSSStyleDeclaration.length 属性返回一个整数值，表示当前规则包含多少条样式声明。

3. CSSStyleDeclaration.parentRule
   + CSSStyleDeclaration.parentRule 属性返回当前规则所属的那个样式块（CSSRule 实例）
   + 如果不存在所属的样式块，该属性返回null。
   + 该属性只读，且只在使用 CSSRule 接口时有意义。
```js
var declaration = document.styleSheets[0].rules[0].style;
declaration.parentRule === document.styleSheets[0].rules[0]
// true
```

### 实例方法

1. CSSStyleDeclaration.getPropertyPriority()
   + CSSStyleDeclaration.getPropertyPriority 方法接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置 important 优先级。
   + 如果有就返回 important，否则返回空字符串。

2. CSSStyleDeclaration.getPropertyValue()
   + CSSStyleDeclaration.getPropertyValue 方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。

3. CSSStyleDeclaration.item()
   + CSSStyleDeclaration.item 方法接受一个整数值作为参数，返回该位置的 CSS 属性名。
   + 如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。

4. CSSStyleDeclaration.removeProperty()
   + CSSStyleDeclaration.removeProperty 方法接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。

5. CSSStyleDeclaration.setProperty()
   + CSSStyleDeclaration.setProperty 方法用来设置新的 CSS 属性。该方法没有返回值。
   + 该方法可以接受三个参数。
     1. 第一个参数：属性名，该参数是必需的。
     2. 第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
     3. 第三个参数：优先级，该参数可选。如果设置，唯一的合法值是 important，表示 CSS 规则里面的 !important。

## CSS 模块的侦测

+ 检查浏览器是否支持某个属性
```js
//普遍方法检查元素的 style 对象的某个属性值是否为字符串 
//分辨属性是否存在——不可用会返回 undefined
typeof element.style.animationName === 'string';
typeof element.style.transform === 'string';

//侦测函数
function isPropertySupported(property) {
  if (property in document.body.style) return true;
  var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

  for(var i = 0; i < prefixes.length; i++){
    if((prefixes[i] + prefProperty) in document.body.style) return true;
  }

  return false;
}

isPropertySupported('background-clip')
// true
```

## CSS 对象

+ 浏览器原生提供 CSS 对象，为 JavaScript 操作 CSS 提供一些工具方法。

### CSS.escape()

+ CSS.escape 方法用于转义 CSS 选择器里面的特殊字符。
```js
document.querySelector('#' + CSS.escape('foo#bar'));
document.querySelector('#foo\\#bar');
//这两种写法相等
```

### CSS.supports()

+ CSS.supports 方法返回一个布尔值，表示当前环境是否支持某一句 CSS 规则。
+ 它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；
+ 另一种是整个参数就是一行完整的 CSS 语句。
```js
// 第一种写法
CSS.supports('transform-origin', '5px') // true

// 第二种写法
CSS.supports('display: table-cell') // true
//第二种写法的参数结尾不能带有分号，否则结果不准确。
CSS.supports('display: table-cell;') // false
```

## window.getComputedStyle()

+ 行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。
+ 但是，网页元素最终的样式是综合各种规则计算出来的。
+ 因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

+ window.getComputedStyle 方法，就用来返回浏览器计算后得到的最终规则。
+ 它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。
+ 所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。

+ 注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。这个实例是只读的。

+ getComputedStyle 方法还可以接受第二个参数，表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter 等）。

+ 注意
  1. CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括 px 后缀），颜色是rgb(#, #, #)或 rgba(#, #, #, #)格式。
  2. CSS 规则的简写形式无效。比如，想读取 margin 属性的值，不能直接读，只能读 marginLeft、marginTop 等属性；再比如，font 属性也是不能直接读的，只能读 font-size 等单个属性。
  3. 如果读取 CSS 原始的属性名，要用方括号运算符，比如 styleObj['z-index']；如果读取骆驼拼写法的 CSS 属性名，可以直接读取 styleObj.zIndex。
  4. 该方法返回的 CSSStyleDeclaration 实例的 cssText 属性无效，返回 undefined。

## CSS 伪元素

+ CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过 ::before 和 ::after 选择器生成，然后用 content 属性指定伪元素的内容。
```js
//获取伪元素的方式一
var test = document.querySelector('#test');

var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;

//二
var result = window.getComputedStyle(test, ':before').getPropertyValue('content');
var color = window.getComputedStyle(test, ':before').getPropertyValue('color');
```

## StyleSheet 接口

+ StyleSheet 接口代表网页的一张样式表，包括 <link/> 元素加载的样式表和 `<style>` 元素内嵌的样式表。
+ document 对象的 styleSheets 属性，可以返回当前页面的所有 StyleSheet 实例（即所有样式表）。它是一个类似数组的对象。

+ `<style>` 内嵌的样式表， 可以用该节点元素的 sheet 属性获取

+ 在网页里面拿到的样式表实例，实际上是 CSSStyleSheet 的实例

### 实例属性

1. StyleSheet.disabled
   + StyleSheet.disabled 返回一个布尔值，表示该样式表是否处于禁用状态
   + 手动设置可禁用某一张样式表

2. Stylesheet.href
   + Stylesheet.href 返回样式表的网址。
   + 对于内嵌样式表，该属性返回 null。该属性只读。

3. StyleSheet.media
   + StyleSheet.media 属性返回一个类似数组的对象（MediaList实例），成员是表示适用媒介的字符串。
   + media.mediaText 表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。
   + 该属性只读，默认值是 screen。
   + MediaList 实例的 appendMedium 方法，用于增加媒介；deleteMedium 方法用于删除媒介。

4. StyleSheet.title
   + StyleSheet.title 属性返回样式表的 title 属性。

5. StyleSheet.type
   + StyleSheet.type 属性返回样式表的 type 属性，通常是 text/css。

6. StyleSheet.parentStyleSheet
   + CSS 的 @import 命令允许在样式表中加载其他样式表。
   + StyleSheet.parentStyleSheet 属性返回包含了当前样式表的那张样式表。
   + 如果当前样式表是顶层样式表，则该属性返回null。

7. StyleSheet.ownerNode
   + StyleSheet.ownerNode 属性返回 StyleSheet 对象所在的 DOM 节点，通常是 <link> 或`<style>`。
   + 对于那些由其他样式表引用的样式表，该属性为null。

8. CSSStyleSheet.cssRules
   + CSSStyleSheet.cssRules 属性指向一个类似数组的对象（CSSRuleList实例），里面每一个成员就是当前样式表的一条 CSS 规则。
   + 使用该规则的cssText属性，可以得到 CSS 规则对应的字符串。
   + 每条 CSS 规则还有一个 style 属性，指向一个对象，用来读写具体的 CSS 命令。
```js
var sheet = document.querySelector('#styleElement').sheet;
sheet.cssRules[0].cssText
// "body { background-color: red; margin: 20px; }"
cssStyleSheet.cssRules[0].style.color = 'red';
cssStyleSheet.cssRules[1].style.color = 'purple';
```

9. CSSStyleSheet.ownerRule
   + 有些样式表是通过 @import 规则输入的，它的 ownerRule 属性会返回一个 CSSRule 实例，代表那行 @import 规则。
   + 如果当前样式表不是通过 @import 引入的，ownerRule 属性返回 null。

### 实例方法

1. CSSStyleSheet.insertRule()
   + CSSStyleSheet.insertRule 方法用于在当前样式表的插入一个新的 CSS 规则。
   + 该方法可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。
   + 第二个参数是该规则在样式表的插入位置（从0开始）
   + 该方法的返回值是新插入规则的位置序号。
   + 浏览器对脚本在样式表里面插入规则有很多限制。所以，这个方法最好放在try...catch里使用。
```js
var sheet = document.querySelector('#styleElement').sheet;
sheet.insertRule('#block { color: white }', 0);
sheet.insertRule('p { color: red }', 1);
```

2. CSSStyleSheet.deleteRule()
   + CSSStyleSheet.deleteRule 方法用来在样式表里面移除一条规则，它的参数是该条规则在cssRules对象中的位置。该方法没有返回值。

## 添加样式表

```js
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);

//方式三
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```

## CSSRuleList 接口

+ CSSRuleList 接口是一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例。
+ 获取 CSSRuleList 实例，一般是通过 StyleSheet.cssRules 属性。
+ CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过 rules.item(index) 或者 rules[index]拿到。
```js
// HTML 代码如下
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var crl = myStyleSheet.cssRules;
crl instanceof CSSRuleList // true
```

## CSSRule 接口

+ JavaScript 通过 CSSRule 接口操作 CSS 规则。一般通过 CSSRuleList 接口（StyleSheet.cssRules）获取 CSSRule 实例。
```js
// HTML 代码如下
// <style id="myStyle">
//   .myClass {
//     color: red;
//     background-color: yellow;
//   }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;
var rule = ruleList[0];
rule instanceof CSSRule // true
```

### CSSRule 实例的属性

1. CSSRule.cssText
   + CSSRule.cssText 属性返回当前规则的文本，还是使用上面的例子。
   + 如果规则是加载（@import）其他样式表，cssText 属性返回 @import 'url'。
```js
rule.cssText
// ".myClass { color: red; background-color: yellow; }"
```

2. CSSRule.parentStyleSheet
   + CSSRule.parentStyleSheet 属性返回当前规则所在的样式表对象（StyleSheet 实例），还是使用上面的例子。
   + ``rule.parentStyleSheet === myStyleSheet // true``

3. CSSRule.parentRule
   + CSSRule.parentRule 属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回 null。
   + 父规则最常见的情况是，当前规则包含在 @media 规则代码块之中。

4. CSSRule.type
   + CSSRule.type 属性返回一个整数值，表示当前规则的类型。
   + 常见的类型
     1. 1：普通样式规则（CSSStyleRule 实例）
     2. 3：@import规则
     3. 4：@media规则（CSSMediaRule 实例）
     4. 5：@font-face规则

### CSSStyleRule 接口

+ 如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。

+ CSSStyleRule 接口有以下两个属性。
  1. CSSStyleRule.selectorText
     + CSSStyleRule.selectorText属性返回当前规则的选择器。
     + 这个属性是可写的。
  2. CSSStyleRule.style
     + CSSStyleRule.style 属性返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。
     + CSSStyleDeclaration 实例的 cssText 属性，可以返回所有样式声明，格式为字符串。

### CSSMediaRule 接口

+ 如果一条 CSS 规则是 @media 代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。
+ 该接口主要提供 media 属性和 conditionText 属性。
+ media 属性返回代表 @media 规则的一个对象（MediaList 实例）
+ conditionText 属性返回 @media 规则的生效条件。

## window.matchMedia()

+ window.matchMedia 方法用来将 CSS 的 MediaQuery 条件语句，转换成一个 MediaQueryList 实例。
```js
var mdl = window.matchMedia('(min-width: 400px)');
mdl instanceof MediaQueryList // true
//变量mdl就是 mediaQueryList 的实例。
```
+ 如果参数不是有效的 MediaQuery 条件语句，window.matchMedia 不会报错，依然返回一个 MediaQueryList 实例。

### MediaQueryList 接口的实例属性

1. MediaQueryList.media
   + MediaQueryList.media 属性返回一个字符串，表示对应的 MediaQuery 条件语句。
```js
var mql = window.matchMedia('(min-width: 400px)');
mql.media // "(min-width: 400px)"
```

2. MediaQueryList.matches
   + MediaQueryList.matches 属性返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句。
```js
if (window.matchMedia('(min-width: 400px)').matches) {
  /* 当前视口不小于 400 像素 */
} else {
  /* 当前视口小于 400 像素 */
}
//下面的例子根据mediaQuery是否匹配当前环境，加载相应的 CSS 样式表。
var result = window.matchMedia("(max-width: 700px)");

if (result.matches){
  var linkElm = document.createElement('link');
  linkElm.setAttribute('rel', 'stylesheet');
  linkElm.setAttribute('type', 'text/css');
  linkElm.setAttribute('href', 'small.css');

  document.head.appendChild(linkElm);
}
```

3. MediaQueryList.onchange
   + 如果 MediaQuery 条件语句的适配环境发生变化，会触发 change 事件。
   + MediaQueryList.onchange 属性用来指定 change 事件的监听函数。
   + 该函数的参数是 change 事件对象（MediaQueryListEvent 实例），该对象与 MediaQueryList 实例类似，也有 media 和 matches 属性。
```js
var mql = window.matchMedia('(max-width: 600px)');

mql.onchange = function(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

### MediaQueryList 接口的实例方法

+ MediaQueryList 实例有两个方法 MediaQueryList.addListener()
+ MediaQueryList.removeListener()，用来为change事件添加或撤销监听函数。
+ MediaQueryList.removeListener() 方法不能撤销 MediaQueryList.onchange 属性指定的监听函数。
```js
var mql = window.matchMedia('(max-width: 600px)');

// 指定监听函数
mql.addListener(mqCallback);

// 撤销监听函数
mql.removeListener(mqCallback);

function mqCallback(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

# Mutation Observer API 用来监视 DOM 变动。