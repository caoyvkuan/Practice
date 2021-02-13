# React

## 保留属性

+ props 属性
+ state 私有属性
+ key 特殊的保留属性
+ ref 拥有更高级别的特性

## 元素渲染

+ 元素是构成 React 应用的最小砖块。 元素描述了你在屏幕上想看到的内容。
+ 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

### 将一个元素渲染为 DOM

+ 假设你的 HTML 文件某处有一个 <div>
+ ` <div id="root"></div> `
+ 我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。
+ 仅使用 React 构建的应用通常只有单一的根 DOM 节点。
+ 如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

+ 想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()
```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### 更新已渲染的元素

+ React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。
+ 一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

+ 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。
+ 考虑一个计时器的例子
```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
// 这个例子会在 setInterval() 回调函数，每秒都调用 ReactDOM.render()。

// 在实践中，大多数 React 应用只会调用一次 ReactDOM.render()。
// 在下一个章节，我们将学习如何将这些代码封装到有状态组件中。
```

### React 只更新它需要更新的部分

+ React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。
+ 尽管每一秒我们都会新建一个描述整个 UI 树的元素，React DOM 只会更新实际改变了的内容，也就是例子中的文本节点。
+ 根据我们的经验，考虑 UI 在任意给定时刻的状态，而不是随时间变化的过程，能够消灭一整类的 bug。

## 组件 & Props

+ 组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。
+ 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 函数组件与 class 组件

+ 定义组件最简单的方式就是编写 JavaScript 函数：
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。
// 这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
```

+ 你同时还可以使用 ES6 的 class 来定义组件
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
+ 上述两个组件在 React 里是等效的

### 渲染组件

+ 组件名称必须以大写字母开头
  + 小写会被数位 dom 标签
  + 大写才是代表一个组件

+ 之前，我们遇到的 React 元素都只是 DOM 标签：` const element = <div />; `
+ 不过，React 元素也可以是用户自定义的组件：` const element = <Welcome name="Sara" />; `
+ 当 React 元素为用户自定义组件时，
+ 它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

### 组合组件

+ 组件可以在其输出中引用其他组件。
+ 这就可以让我们用同一组件来抽象出任意层次的细节。
+ 按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

+ 例如，我们可以创建一个可以多次渲染 Welcome 组件的 App 组件
+ 通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。
+ 但是，如果你将 React 集成到现有的应用程序中，
+ 你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

### 提取组件

+ 将组件拆分为更小的组件。
+ 将一个大应用分为多个组件来提高代码的复用率

### Props 的只读性

+ 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。
+ 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

## State & 生命周期

+ State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
+ 不要直接修改 State  直接的修改不会对组件进行重新渲染，如 `this.state.comment = 'Hello';` 这是无效的
+ 而是应该使用 setState(): ` this.setState({comment: 'Hello'}); `
+ 构造函数是唯一可以给 this.state 赋值的地方

### 生命周期

+ 将组件渲染到 DOM 中，这在 React 中被称为“挂载（mount）”。
+ 从 DOM 中删除组件，这在 React 中被称为“卸载（unmount）”。

```js
class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // 添加构造函数来增加 state 属性
    }
  }

  /**
   * 我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：
   * 这些方法叫做“生命周期方法”。
  */
  componentDidMount() {
    // componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行。
  }

  componentWillUnmount() {
    // componentWillUnmount() 方法会在组件从 DOM 中删除时调用。
  }
}
```

### State 的更新可能是异步的

+ 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
+ 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
+ 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象

### State 的更新会被合并

+ 当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
+ 你可以单独的更新一个属性而不用担心其他属性会被新对象覆盖 
+ ` this.setState({posts: response.posts}); `
+ 这样的方式不会覆盖 state 中的其他属性，只会覆盖 posts 这一个属性

### 数据是向下流动的

+ 不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。
+ 这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。
+ 组件可以选择把它的 state 作为 props 向下传递到它的子组件中
+ 这通常会被叫做“自上而下”或是“单向”的数据流。
+ 任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
+ 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

## 事件处理

+ 使用 React 时，你一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。
+ 事实上，你只需要在该元素初始渲染的时候添加监听器即可。

+ React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
  + React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
  + 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
```js
// 例如，传统的 HTML：
<button onclick="activateLasers()">
  Activate Lasers
</button>

// 在 React 中略微不同：
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### 注意 this 的指向

#### bind 方法

+ 当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。
+ 例如，下面的 Toggle 组件会渲染一个让用户切换开关状态的按钮：
```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    // 因为需要 改变 state 的状态，不让 this 指向组件是无法改变状态的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (// 或是直接在这里 this.handleClick.bind(this)
      <button onClick={this.handleClick}> 
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

####  React 默认语法

+ Create React App 默认启用此语法
+ 如果你正在使用实验性的 public class fields 语法，你可以使用 class fields 正确的绑定回调函数：
```js
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }
}
```

#### 箭头函数法

+ 利用简单函数 this 绑定当前作用域的特性
```js
// 此语法确保 `handleClick` 内的 `this` 已被绑定。
 <button onClick={() => this.handleClick()}>
    Click me
  </button>
```
+ 此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。
+ 在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。
+ 我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。

### 向事件处理程序传递参数

+ 在循环中，通常我们会为事件处理函数传递额外的参数。
+ 例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数
```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
+ 在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。
+ 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### 阻止默认的行为

+ 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。
+ 你必须显式的使用 preventDefault 。
```js
// 例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

// 在 React 中，可能是这样的：
function ActionLink() {
  function handleClick(e) {
    // 在这里，e 是一个合成事件。
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

## 条件渲染

+ React 中的条件渲染和 JavaScript 中的一样，
+ 使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI
+ 通过判断来决定返回的组件
```js
if (isLoggedIn) {
  return <UserGreeting />;
} else {
  return <GuestGreeting />;
}
```

### 元素变量

+ 你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。
```js
if (isLoggedIn) {
  button = <LogoutButton onClick={this.handleLogoutClick} />;
} else {
  button = <LoginButton onClick={this.handleLoginClick} />;
}
// 通过变量来动态改变加载的组件
<div>
  <Greeting isLoggedIn={isLoggedIn} />
  {button}
</div>
```
+ 声明一个变量并使用 if 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法

### 与运算符 &&

+ 通过花括号包裹代码，你可以在 JSX 中嵌入任何表达式。
+ 这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染。
```js
{unreadMessages.length > 0 &&
  <h2>
    You have {unreadMessages.length} unread messages.
  </h2>
}
```
+ 之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。
+ 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

### 三目运算符

+ 另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 condition ? true : false。
```js
The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.

{isLoggedIn
  ? <LogoutButton onClick={this.handleLogoutClick} />
  : <LoginButton onClick={this.handleLoginClick} />
}
```

### 阻止组件渲染

+ 在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。
+ 若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。
```js
if (!props.warn) {
    return null; // 阻止渲染
}
return(
  // 正常返回
)
```
+ 在组件的 render 方法中返回 null 并不会影响组件的生命周期。
+ 例如，上面这个示例中，componentDidUpdate 依然会被调用。

## 列表 & Key

+ 使用 map() 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 doubled 并打印出来
+ 在 React 中，把数组转化为元素列表的过程是相似的

### 渲染多个组件

+ 可以通过使用 {} 在 JSX 内构建一个元素集合

+ 使用 Javascript 中的 map() 方法来遍历 numbers 数组。
+ 将数组中的每个元素变成 <li> 标签，最后我们将得到的数组赋值给 listItems：
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
// 我们把整个 listItems 插入到 <ul> 元素中，然后渲染进 DOM：
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

### 基础列表组件

+ 通常你需要在一个组件中渲染列表
+ 我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
// 当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。
```
+ 让我们来给每个列表元素分配一个 key 属性来解决上面的那个警告：
```js
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

### Key

+ key 帮助 React 识别哪些元素改变了，比如被添加或删除。
+ 因此你应当给数组中的每一个元素赋予一个确定的标识。
+ ` <li key={todo.id}> `

+ 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：` <li key={index}> `
+ 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
+ 如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

+ 当 React 元素被创建出来的时候，React 会提取出 key 属性，然后把 key 直接存储在返回的元素上。
+ 虽然 key 看起来好像是 props 中的一个，但是你不能通过 this.props.key 来获取 key。
+ React 会通过 key 来自动判断哪些组件需要更新。组件是不能访问到它的 key 的。

+ 显式地使用 key={i} 来指定 key 确实会消除警告

+ 组件的 key 值并不需要在全局都保证唯一，只需要在当前的同一级元素之前保证唯一即可。

#### 用 key 提取组件

+ 一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

+ 元素的 key 只有放在就近的数组上下文中才有意义
+ 比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上。
```js
// 错误！你不需要在这里指定 key：
<li key={value.toString()} ></li>
// 错误！元素的 key 应该在这里指定：
<ListItem value={number} />

// 正确的使用 key 的方式
// 正确！这里不需要指定 key：
return <li>{props.value}</li>;
// 正确！key 应该在数组的上下文中被指定
const listItems = numbers.map((number) =>
  // 正确！key 应该在数组的上下文中被指定
  <ListItem key={number.toString()} value={number} />
);
```

#### key 只是在兄弟节点之间必须唯一

+ 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。
+ 然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

+ key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，
+ 请用其他属性名显式传递这个值：
```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
// Post 组件可以读出 props.id，但是不能读出 props.key
```

### 在 JSX 中嵌入 map()

+ 在上面的例子中，我们声明了一个单独的 listItems 变量并将其包含在 JSX 中:
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
// JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果
<ul>
  {numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  )}
</ul>
```

## 表单

+ 在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。
+ 例如这个纯 HTML 表单只接受一个名称：
```html
<!-- 此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。 -->
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
<!-- 
  如果你在 React 中执行相同的代码，它依然有效。
  但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。
  实现这种效果的标准方式是使用“受控组件”。 
-->
```

### 受控组件

+ 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。
+ 而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
+ 我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。
+ 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。
+ 被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

+ 如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}; // 值

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault(); // 取消默认名事件
  }
  render() {
    return (// 更改组件的提交事件     利用 this.state.value 将 React 的 state 作为 唯一的数据源
      <form onSubmit={this.handleSubmit}> 
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="提交" />
      </form>
    );
  }
}
/**
 * 设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。
 * 由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。
 * 
 * 对于受控组件来说，输入的值始终由 React 的 state 驱动。
 * 你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。
*/
```

### textarea 标签

+ 在 HTML 中, <textarea> 元素通过其子元素定义其文本
+ 而在 React 中，<textarea> 使用 value 属性代替。
+ ` <textarea value={this.state.value} onChange={this.handleChange} /> `
+ 请注意，this.state.value 初始化于构造函数中，因此文本区域默认有初值。

### select 标签

+ 在 HTML 中，<select> 创建下拉列表标签。例如，如下 HTML 创建了水果相关的下拉列表
```js
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
/**
 * 请注意，由于 selected 属性的缘故，椰子选项默认被选中。
 * React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。
 * 这在受控组件中更便捷，因为您只需要在根标签中更新它。例如：
*/

this.state = {value: 'coconut'}; // 通过这个值来默认选中

<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
// 你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项
<select multiple={true} value={['B', 'C']}>
```

### 文件 input 标签

+ 在 HTML 中，<input type="file"> 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 File API 进行控制。
+ ` <input type="file" /> `
+ 因为它的 value 只读，所以它是 React 中的一个非受控组件。将与其他非受控组件在后续文档中一起讨论。

+ 处理多个输入
+ 当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。
```js
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}
// 通过 name 属性来分辨每一个 input 的值
<input name="numberOfGuests" type="number" />
<input name="isGoing" type="checkbox" />
```

### 受控输入空值

+ 在受控组件上指定 value 的 prop 会阻止用户更改输入。
+ 如果你指定了 value，但输入仍可编辑，则可能是你意外地将 value 设置为 undefined 或 null。
+ 下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）
```js
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

### 受控组件的替代品

+ 有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state。
+ 当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会令人厌烦。
+ 在这些情况下，你可能希望使用非受控组件, 这是实现输入表单的另一种方式。

## 状态提升

+ 通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

## 规范

### 命名规范

+ 将代表事件的监听 prop 命名为 on[Event]
+ 将处理事件的监听方法命名为 handle[Event] 
+ 事件采用的是小驼峰命名方式 onClick={ }

+ 组件名称必须以大写字母开头
  + React 会将以小写字母开头的组件视为原生 DOM 标签。
  + 例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。

### 不可变性

+ 不可变性以及不可变性的重要性。
+ 一般来说，有两种改变数据的方式。
  + 第一种方式是直接修改变量的值，
  + 第二种方式是使用新的一份数据替换旧数据。

+ 不可变性使得复杂的特性更容易实现。
+ 跟踪数据的改变
  + 直接的修改会导致数据跟踪困难，跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。
+ 跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。

+ 不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。
+ 我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

# JSX

+ ``  const element = <h1>Hello, world!</h1>;  ``
+ 这个有趣的标签语法既不是字符串也不是 HTML。它被称为 JSX，是一个 JavaScript 的语法扩展。

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
+ 在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。

+ （小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
+ JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。

## JSX 也是一个表达式

+ 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。
+ 也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX

## JSX 特定属性

+ 你可以通过使用引号，来将属性值指定为字符串字面量：
+ `  const element = <div tabIndex="0"></div>;  `
+ 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：
+ `  const element = <img src={user.avatarUrl}></img>;  `
+ 不能同时在使用两种方式

## 使用 JSX 指定子元素

+ 假如一个标签里面没有内容，你可以使用 /> 来闭合标签，就像 XML 语法一样
` const element = <img src={user.avatarUrl} />; `
+ JSX 标签里能够包含很多子元素:
```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX 表示对象

+ Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
+ 以下两种示例代码完全等效
```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

//

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
// 这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。
// React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。
```

## JSX 防止注入攻击

+ 你可以安全地在 JSX 当中插入用户输入内容
```js
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
+ React DOM 在渲染所有输入内容之前，默认会进行转义。
+ 它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。
+ 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

# 环境构建

## 工具

+ 扩展 React Devtools

+ Brunch  开发环境不用
  + 通过安装 terser-brunch 插件，来获得最高效的 Brunch 生产构建
```js
// 使用 npm
npm install --save-dev terser-brunch
// 接着，在 build 命令后添加 -p 参数，以创建生产构建
brunch build -p
```

+ Browserify
  + 为了最高效的生产构建 开发环境不用
```js
// 如果你使用 npm
npm install --save-dev envify terser uglifyify

npm install envify browserify
```
+ 为了创建生产构建，确保你添加了以下转换器 （顺序很重要）：
  + envify 转换器用于设置正确的环境变量。设置为全局 (-g)。
  + uglifyify 转换器移除开发相关的引用代码。同样设置为全局 (-g)。
  + 最后，将产物传给 terser 并进行压缩（为什么要这么做？）。

## 快捷使用

+ 直接引入(CDN)
+ https://react.docschina.org/docs/cdn-links.html 官方网址
```html
<!-- 加载 React。-->
<!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<!-- 加载指定版本只需要将 17 更改为指定版本即可 -->
<!-- 压缩版 -->
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>

<!-- 引入 JSX ， 将使用 JSX 的 script 标签加上 type="text/babel" 属性 不适合生产环境 -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

## 部署开发环境

1. 创建项目 ``  npx create-react-app my-app  ``
2. 启动 ``  cd myapp  ``  ``  npm start  ``
3. 执行 npm run build 会在 build 文件夹内生成你应用的优化版本。生产版本

+ 部署
```js
// 部署 JSX 项目文件夹
npm init -y
npm install babel-cli@6 babel-preset-react-app@3
创建一个名为 src 的文件夹并执行这个终端命令：
npx babel --watch src --out-dir . --presets react-app/prod 

// 代码压缩
1. Install Node.js
2. Run npm init -y in your project folder  // (don't skip this step!)
3. Run npm install terser
// 压缩指令
npx terser -c -m -o like_button.min.js -- like_button.js
```