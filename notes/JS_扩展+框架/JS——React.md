# React

+ [官方文档](https://react.docschina.org/docs/getting-started.html)

```jsx
<div // dangerouslySetInnerHTML 属性可以渲染字符串 html 并防止
    dangerouslySetInnerHTML={{ __html: '<p>这是一个段落</p><hr/>' }}
/>
```



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
```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### 更新已渲染的元素

+ React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。
+ 一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

+ 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。
+ 考虑一个计时器的例子
```jsx
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
+ 利用 Props 传递组件数据的时候可以使用 展开运算符展开对象一次传递多个键值对

### 函数组件与 class 组件

+ 定义组件最简单的方式就是编写 JavaScript 函数：
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。
// 这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
```

+ 你同时还可以使用 ES6 的 class 来定义组件
```jsx
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

### Props 限制

```jsx
class Person extends React.Component{
    render(){
        return(
            <h1>H</h1>
        );
    }
    
    Static propTypes = {
        // 利用静态属性来限制
        name:React.propTypes.string
        // 这个对象需要引用依赖包 "prop-types": "^15.7.2"
        // 然后这样限制
        name:PropTypes.string.isRequired // 必填项  字符串类型
        // PropTypes.func  限制为一个方法
    }
	// 默认
	Static defaultProps = {
        age : 18 // 不传入就默认 18
    }
    
}
```



## State & 生命周期

+ State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
+ 不要直接修改 State  直接的修改不会对组件进行重新渲染，如 `this.state.comment = 'Hello';` 这是无效的
+ 而是应该使用 setState(): ` this.setState({comment: 'Hello'}); `
+ 构造函数是唯一可以给 this.state 赋值的地方

```js
// State 的简写
class Weather extends React.Component{
    state = {
        // 不用写在构造函数中
    }
}
```

### setState 两种写法

+ `setState(stateChange,[callback])`
  + stateChange : 改变状态的对象
  + + callback -> 这个回调会在 state 更新完毕且页面更新后才会被调用

+ `setState(updater,[callback])`
  + updater 函数为返回一个 stateChange 对象的函数
  + updater 可以接受到 state 和 props -> (state,props) => stateChange


### 生命周期

+ 将组件渲染到 DOM 中，这在 React 中被称为“挂载（mount）”。
+ 从 DOM 中删除组件，这在 React 中被称为“卸载（unmount）”。
+ `ReactDOM.unmountComponentAtNode(document.querySelector('#root')`
  + 这个方法用于卸载组建节点

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
  componentDidMount() { // 组件挂载完毕
    // componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行。
  }

  componentWillUnmount() { // 组件卸载
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

+ 使用 React 时，一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。
+ 事实上，你只需要在该元素初始渲染的时候添加监听器即可。
+ React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
  + React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
  + 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
+ 所有的合成事件都是 React 自定义的事件, 而不是原生事件。
+ 运用了事件委托的方式将所有的事件委托给最外层的元素。
+ 通过 event.target 可以得到发生事件的元素，所以不需要过渡使用 ref
```jsx
// 例如，传统的 HTML：
<button onclick="activateLasers()">
  Activate Lasers
</button>

// 在 React 中略微不同：
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### 精简 this 的指向代码

```js
// State 的简写
class Weather extends React.Component{
    fn = () => {
        // 事件处理函数的 this 直接绑定为 Weather
        // 不需要另外在此绑定
        // 但是会将方法放在 实例中,导致多个实例使用的方法不是同一个优化不好
        // 放在实例中也就是自己本身,而不是 prototype 中
        // 但是如果只是有一个实例就没有问题
    }
}
```

### 注意 this 的指向

#### bind 方法

+ 当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。
+ 例如，下面的 Toggle 组件会渲染一个让用户切换开关状态的按钮：
```jsx
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
```jsx
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
```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
+ 在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。
+ 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### 阻止默认的行为

+ 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。
+ 你必须显式的使用 preventDefault 。
```jsx
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
```jsx
if (isLoggedIn) {
  return <UserGreeting />;
} else {
  return <GuestGreeting />;
}
```

### 元素变量

+ 你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。
```jsx
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
```jsx
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
```jsx
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
```jsx
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
```jsx
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
```jsx
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
+ 使用 index 做为 key 是有风险的,因为在插入值的时候 index 会发生改变
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
```jsx
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
```jsx
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
```jsx
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
```jsx
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
```jsx
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
```jsx
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
```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

### 处理多个输入

+ 当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。
+ 通过得到的 name 属性来确定需要更改的 state

```js
// 方法一
handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]:value
    })
}

// 方法二 绑定的时候这么用 this.handleInputChange('name');
handleInputChange(dataType){
    return (event) => { // 这个返回的箭头函数才是真正的回调函数
        this.setState({
        [dataType]:event.target.value
    	})
    }
}

// 方法三 绑定 : onChange={(e)=>this.handleInputChange('name',e)}
handleInputChange(dataType,e){
    this.setState({
        [dataType]:e.target.value
    })
}
```



### 受控组件的替代品

+ 有时使用受控组件会很麻烦，因为你需要为数据变化的每种方式都编写事件处理函数，并通过一个 React 组件传递所有的输入 state。
+ 当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能会令人厌烦。
+ 在这些情况下，你可能希望使用非受控组件, 这是实现输入表单的另一种方式。

## 状态提升

+ 通常，多个组件需要反映相同的变化数据，这时建议将共享状态提升到最近的共同父组件中去。
+ 依靠父组件来同步子组件中的数据,而不是依靠子组件自己来控制数据的变动

## 组合 vs 继承

+ React 有十分强大的组合模式。推荐使用组合而非继承来实现组件间的代码重用。
+ 组合的方式可以在 React 中完美的替代继承

### 包含关系

+ 有些组件无法提前知晓它们子组件的具体内容。在 Sidebar（侧边栏）和 Dialog（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。

+ 建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中
+ <FancyBorder> JSX 标签中的所有内容都会作为一个 children prop 传递给 FancyBorder 组件。
+ 因为 FancyBorder 将 {props.children} 渲染在一个 <div> 中，被传递的这些子组件最终都会出现在输出结果中。
```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
// 这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

+ 不仅仅有 {props.children} 可以使用,还可以自定义预留多个相同的位置
```jsx
{props.left} {props.right}
// 这样使用
<SplitPane
  left={
    <Contacts />
  }
  right={
    <Chat />
  } />
```
+ <Contacts /> 和 <Chat /> 之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递。
+ 可以将任何东西作为 props 进行传递。

### 特例关系

+ 通过一个普通的组件然后定制其一些属性来达成多样化的组件的效果
```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return ( // title message children  都是自定义部分
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!">
      <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
    </Dialog>
  );
}
```

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

# 笔记

+ css 模块化
  + 修改文名 `index.module.css`
  + 引入 `import name from './index.module.css`
  + 使用 `<div className={name.className}>`

## lazyLoad

+ 懒加载
+ 在需要使用的时候才加载
+ 所有需要利用 懒加载 的都需要利用 lazy 方法引入
```js
// react 懒加载需要使用 lazy, Suspense
import React, { lazy, Suspense } from 'react'
// lazy 传入一个函数 返回一个 组件的引入
// 需要利用懒加载的都可以使用这种方式
const Home = lazy(() => import('./pages/Home'));
const Learning = lazy(() => import('./pages/Learning'));
const Lose = lazy(() => import('./pages/Lose404'));

// 在路由组件没被加载的时候需要显示一个默认显示的 组件
// 所有懒加载的路由组件都需要用 Suspense 包裹
// 加载路由组件过程中显示的组件就放在 fallback 中
// 利用懒加载可以制作 加载中的 效果
<Suspense fallback={<h1>Loading......</h1>}>
  <Switch>
    {/* 首次加载导向首页 */}
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route path="/home" component={Home} />
    <Route path="/learning" component={Learning} />
    {/* 404 警告 */}
    <Route component={Lose} />
  </Switch>
</Suspense>

```

## 性能优化

+ react 的 React.Component 的问题
  + 只有执行了 setState() 即时不改变状态也会进行组件的更新,也就是调用 render()
  + 当前组件更新后也会更新子组件 ,纵使子组件没有用到父组件的数据也会进行更新
  + 这样会导致 效率很低,这样频繁的组件更新导致:
    + class 组件重新调用 render()
    + function 组件直接全部重新执行

+ 效率高的做法就是 state 或 props 数据发生变化时才更新

### 函数组件优化

+ 使用 React.memo(Component,areEqual);
+ React.memo 其实是一个高阶函数，传递一个组件进去，返回一个可以记忆的组件。
+ 默认情况下其只会对 props 的复杂对象做浅层对比
+ (浅层对比就是只会对比前后两次 props 对象引用是否相同，不会对比对象里面的内容是否相同)
+ 如果想要控制对比过程，那么可以将自定义的比较函数通过第二个参数传入来实现。

+ `areEqual(prevProps,nextProps){/*这个函数能够收到前后两次 props 的值*/}`
+ 与 shouldComponentUpdate 生命周期使用方式类似,
+ 返回 true 就表示两次 props 相等,不进行更新
+ 返回 false 就表示两次 props 不相等,进行更新
```js
// 通过将组件包裹 React.memo ,可以让组件避免在 props 没有改变的时候进行更新
const Component = React.memo(() => {
  return <h2>组件</h2>
});
```

+ 使用 useCallback 可以避免传入的 onClick 等函数没有发生改变时不进行重新渲染组件
```js
const callback = () => {
  doSomething(a, b);
}
const memoizedCallback = useCallback(callback, [a, b])
/*
  把函数以及依赖项作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，
  这个 memoizedCallback 只有在依赖项有变化的时候才会更新。
*/
```

### class 组件优化

+ 方法一:
  + 利用 shouldComponentUpdate 生命周期钩子
```js
shouldComponentUpdate(nextProps,nextState){
  // this.State : 当前的 State
  // nextState : 即将更新成的 State
  // 通过比较状态是否变化来调整是否进行更新
  if(this.state === nextState){
    return false; // 不更新
  }else{
    return true; // 更新
  }
}
```

+ 方式二: 这也是常用的
  + 不继承 React.Component 而是继承 React.PureComponent
  + React.PureComponent 是纯组件
  + PureComponent 默认重写了 shouldComponentUpdate 生命周期,来实现判断更新
  + PureComponent 只是对 state 和 props 进行了浅比较
  + 如果数据对象内部只是数据变了,但是原来的对象就不会进行更新
  + 使用 PureComponent 时要注意使用 setState 需要返回一个新的数据(对象)
```js
const {arr} = this.state;
// 不论是更新 对象还是数组 都是如此 , 更新引用类型的值都需要返回一个全新的
this.setState({['将原数组替换为一个新数组才会进行更新!',...arr]});
```

### 虚拟列表

+ 库
  + react-virtualized
  + react-window 更轻量的 react-virtualized, 同出一个作者
+ 只渲染当前窗口可以看见的组件
+ 应用
  + 无限滚动列表，grid, 表格，下拉列表，spreadsheets
  + 无限切换的日历或轮播图
  + 大数据量或无限嵌套的树
  + 聊天窗，数据流(feed), 时间轴
  + 等等

## Diffing算法

+ 最小更新范围是一个标签节点,但是标签里面嵌套的标签不会被影响。
+ diff 的比较规则
  + 从旧的DOM找到了与新虚拟DOM相同的key：
    + 若虚拟DOM中的内容没有改变，直接使用之前的真实DOM
    + 若改变了，则生成新的真实DOM，随后替换掉页面中的真实DOM
  + 从旧虚拟DOM未找到与新虚拟DOM相同的key
    + 根据数据创建新的真实DOM，随后渲染到页面

### key 的作用

+  虚拟 DOM 中 key 的作用
  + 简单来讲就是 key 就是 虚拟 DOM 对象的表示，在更新显示时非常重要的。
  + 当状态改变时，react 会根据【新数据】生成【新的虚拟DOM】
  + 随后就会进行新旧虚拟DOM的 diff 比较。
+  选择 key 时最好为将每一条数据的唯一标识作为 key
+  用 index 作为 key 可能会引发的问题
  +  问题一 导致重复生成相同节点，效率极低
    +  如果破坏索引的顺序，虽然可以渲染，但是会导致效率降低。
    +  因为在进行 diff 的时候 key 新旧对不上会全部导致重新生成。
    +  比如在数组的首位插入一个新的数据，会造成整个数据的 DOM 全部重新生成。因为所有的数据在进行 diff 的时候都会对不上。
  +  问题二 如果节点中还包含了输入类的节点，会导致数据错乱。也是因为真实DOM拥有虚拟DOM没有的属性所以无法做出对比
     +  因为更新的只有改变的节点元素，输入类型的子节点没有改变就不会更新。
     +  但是因为索引的错乱会导致，输入框等所在的节点位置发生变化。
     +  也就是子节点所在的父节点key的位置不会改变，如果是 0 会一直保持在父节点 key 是 0 的节点中。
     +  但是更新错乱后，它实际的父节点 key 会变成其他的数。
  +  如果仅用于一个不会发生改变数组索引顺序等不会破坏索引顺序的列表是没有问题的。
  +  也就是索引顺序不被破坏就没有问题。

### 详情

+ 当对比两颗树时，React 首先比较两棵树的根节点。不同类型的根节点元素会有不同的形态。

+ 对比不同的类型的元素都会对原有的树进行卸载，并建立新的树。
+ 卸载时，对应的 DOM 节点会被销毁，组件实例将执行 componentWillUnmount() 方法。
+ 建立新树时，会插入对应的 DOM 节点，触发生命周期，所有与之前树有关的 state 也会被销毁。

+ 对比相同类型的元素
+ React 会保留 DOM 节点，仅比对及更新有改变的属性。
+ 当更新 style 属性时，React 仅更新有所更变的属性。

+ 比对同类型的组件元素
+ 当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。
+ React 将更新该组件实例的 props 以跟最新的元素保持一致，并调用生命周期方法
+ 下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。

+ 对子节点进行递归
+ 在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表
+ 当产生差异时，生成一个 mutation。
+ 在子元素列表末尾新增元素时，更变开销比较小。
+ 如果简单实现的话，那么在列表头部插入会很影响性能，那么更变开销会比较大。
+ React 会针对每个子元素 mutate 而不是保持相同的 <li />子树完成。这种情况下的低效可能会带来性能问题。

+ Keys
+ 为了解决以上问题，React 支持 key 属性。
+ 当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。
+ 在拥有了独立的 key 后就不会出现上面的问题，得到更高的性能。
+ 一般可以提取数据的 ID 作为 key
+ 当以上情况不成立时，你可以新增一个 ID 字段到你的模型中，或者利用一部分内容作为哈希值来生成一个 key。
+ 这个 key 不需要全局唯一，但在列表中需要保持唯一。
+ 也可以使用 index 作为 key ，但是改变索引顺序时依旧会出现性能问题，甚至在有输入元素时还会导致数据出错，所以不推荐。

## 生命周期(新)

+ [生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
+ 新的生命周期,遗弃了三个,新增了两个
+ 新 ` getDerivedStateFromProps(props.state) ` 需要设置为静态方法 `static`
  + 比如在ull`)
  + 可以接受一个 `props` 参数,从 `props 得到一个状态`
  + `state` 的值在任何的时候都取决于 `props` 则可以使用
+ 新 `getSnapshotBeforeUpdate(preProps,preState)` 返回一个快照值,数据类型都是可以的。
  + 在最近一次渲染之前调用,可以得到 DOM 更新之前的一些东西
  + 任何的返回值都将会传给 `componentDidUpdate`
+ ` componentDidUpdate(preProps,preState,snapshotValue) ` 接受更新前的状态和属性

```js
// 挂载时
1.constructor() // 构造函数,第一个调用
2.static getDerivedStateFromProps() // props,state,forceUpdate
3.render()	// 渲染
4.componentDidMount() // 挂载完毕

// 更新时
1.static getDerivedStateFromProps() //
2.shouldComponentUpdate() // 调用 setState 时,从这里开始走,通过返回值判断是否更新
3.render() // 渲染
4.getSnapshotBeforeUpdate() //
5.componentDidUpdate() // 组件更新完毕时才会调用

// 卸载时
1.componentWillUnmount() // 组件卸载
```



## 生命周期(旧)

+ 在新版本中依旧是可以使用的,但是并不推荐,
  + 且这几个需要前缀  `UNSAFE_name `
  + ` componentWillMount `
  + ` componentWillReceiveProps `
  + ` componentWillUpdate `
+ 将要挂载 ` componentWillMount() ` 组件将要挂载 
+ 挂载函数 ` componentDidMount() ` 组件挂载完毕调用一次
+ 卸载函数 ` componentWillUnMount() ` 组件将要卸载时调用一次
+ 控制组件更新 ` shouldComponentUpdate() ` 组件是否需要更新
  + 这个方法默认拥有,且返回 `true`
  + 强制组件更新会跳过这个步骤  ` this.forceUpdate() `
  + 返回 `false` 则不会调用 `render()` 方法,也是就不会更新
+ 组件将要更新 ` componentWillUpdate() ` 
+ 组件更新完了 `  componentDidUpdate()`
+ 组件将要接受`Props` 更新  ` componentWillReceiveProps() ` 接受到属性变化时触发
  + 组件第一次接收到的属性不会触发,后续更新时才会触发
  + 可以接受 ` Props ` 作为参数

```js
// 旧的生命周期
1.constructor() // 构造函数,第一个调用
2.componentWillMount() // 组件挂载前调用
3.render()	// 渲染
4.componentDidMount() // 挂载完毕
5.componentWillReceiveProps()  // 组件属性被更新的时候才会调用
6.shouldComponentUpdate() // 调用 setState 时,从这里开始走,通过返回值判断是否更新
7.componentWillUpdate() // 组件将要更新 调用 forceUpdate 时,跳过判断直接更新,组件将要更新
8.render() // 渲染
9.componentDidUpdate() // 组件更新完毕时才会调用
10.componentWillUnmount() // 组件卸载
```



## 组件实例的三大属性

### state

+ 是一个对象,用于组件的状态更新
+ 更新 state 必须要使用 ` this.setState `

```js
class My extends React.Component{
    state = {
        // 属性
    }
}
```

### props

+ 组件的属性,是一个对象
+ 引用 propsType 可以对传入的属性进行软限制(会报错,但可以显示)
+ 属性 defaultProps 可以设定默认值

```js
// 使用方式 类中的静态属性
// 这个对象需要引用依赖包 "prop-types": "^15.7.2"
// 需要引入 import { PropTypes } from 'prop-types';;
static propTypes = {
    // 利用静态属性来限制
    name:React.propTypes.string
    // 然后这样限制
    name:PropTypes.string.isRequired // 必填项  字符串类型
    // PropTypes.func  限制为一个方法
}
// 默认
static defaultProps = {
    age : 18 // 不传入就默认 18
}
```

### refs

+ refs 这个属性存在与 class 的实例上,通过 ` this.refs ` 可以得到这个对象
+ ref 属性可以用来获取 dom 元素 ` <p ref="p"></p> `
+ 设置了 ref 的元素都会在 refs 这个对象中

```jsx
class My extends React.component{
    
    showData = () => {// 方式一
        console.log(this.refs.input); // 可以得到 input 元素
    }
    show = c => {// 方式二
        console.log(c); // 可以得到 input 元素
    }
    
    // 方式三 React.createRef 调用后会返回一个容器,该容器可以保存一个 ref 所标识的节点
    // 但是只能存一个 , 也就是专人专用,这个对象中拥有一个 current 属性保存节点本身
    myRef = React.createRef()
    
    render(){
        return(
            // 方式一 过时不推荐
        	<input ref="input"></input>// 字符串形式的 ref
            
            // 方式二
            <input ref={(c)=>{console.log(c)}}></input> // 回调方式
            <input ref={this.show></input>  // 类绑定的函数
            /** 
            传入的参数也就是元素本身
            每一次的更新都会调用两次  第一次传入为 null , 第二次才会传入 元素本身
            因为每次更新都会拥有一个新的函数,传入 null 是为了确保清空函数
            使用类绑定函数的方法就可以避免这个问题,但是无关紧要
            */
                    
             // 方式三
             <input ref={this.myRef}></input>
        );
    }
                
}
```

# JSX

+ `  const element = <h1>Hello, world!</h1>;  `
+ 这被称为 JSX，是一个 JavaScript 的语法扩展。 既不是 HTML 也不是字符串
```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```
1. 在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。
2. （小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定,也就是第一个字母小写的驼峰式写法。
3. JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
   + 这是为了规避 ES6 中的 class 关键字
4. 行内样式需要使用 `style={{color:'red'}}` 方式来书写
   + 第一个大括号表示内部是表达式
   + 第二个大括号表示对象
5.  跟标签只能有一个,也就是最外层只能有一个标签
6. 标签首字母
   1. 小写字母开头会被转为同名元素,无同名元素会报错
   2. 大小字母开头会被当做组件
7. JSX 也是一个表达式, 在编译后会被转化为普通的函数调用,得到返回的对象
  + 可以将其赋值给变量,同样可以在 if 等语句中使用,当做参数也是可以的.

## React 必须在作用域内

+ JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
+ JSX标签必须要闭合，没有内容的标签都可以写为单标签闭合的形式 `<div />`
+ 大写开头的代表的是 React 组件，这些标签会别直接编译为变量引用，所以必须包含在作用域内。

+ 由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内。
+ 所以只要使用了 JSX 就必须要导入 React 。

## JSX 特定属性

+ 你可以通过使用引号，来将属性值指定为字符串字面量：
+ `  const element = <div tabIndex="0"></div>;  `
+ 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：
+ `  const element = <img src={user.avatarUrl}></img>;  `
+ 不能同时在使用两种方式

## 使用 JSX 指定子元素

+ 假如一个标签里面没有内容，你可以使用 /> 来闭合标签
+ 就像 XML 语法一样` const element = <img src={user.avatarUrl} />; `
+ JSX 标签里能够包含很多子元素:
+ 但是最外成的根元素只能有一个
```jsx
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
```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
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

## 语法规则

### 在 JSX 类型中使用点语法

+ 在 JSX 中，你也可以使用点语法来引用一个 React 组件。
+ 例如，如果 MyComponents.DatePicker 是一个组件，你可以在 JSX 中直接使用：`<MyComponents.DatePicker />`

### 用户定义组件必须要大写开头

+ 自由大写开头才会被解释为组件，且必须要有对应的变量。
+ 小写则会被解析为 html 内置的元素，没有就会被认为是自定义元素

### 在运行时选择类型

+ 不能将通用表达式作为 React 元素类型。
+ 如果想通过通用表达式来（动态）决定元素类型，需要首先将它赋值给大写字母开头的变量。
+ 要解决这个问题, 需要首先将类型赋值给一个大写字母开头的变量

## JSX 中的 Props

+ 有多种方式可以在 JSX 中指定 props。
+ 传入字符串可以使用两种方法 `<MyComponent message="&lt;3" />    message={'<3'}  `
+ Props 默认值为 “True” `<MyTextBox autocomplete />` 这样会默认传入 true `autocomplete={true}`
+ 属性的展开：如果已经有了一个 props 对象，可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。
  + `<Greeting {...props} />` 
  + 保留需要的，其他继续传递
  + `const { kind, ...other } = props;   {...other}`

### JavaScript 表达式作为 Props

+ 可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素。`<MyComponent foo={1 + 2 + 3 + 4} />`
+ if 语句以及 for 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用。
+ 但是可以在外部完成赋值的操作然后在加入到 JSX 中

## JSX 中的子元素

+ 包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件。
+ 有几种不同的方法来传递子元素：
+ 子元素 ：子元素允许由多个 JSX 元素组成。这对于嵌套组件非常有用
+ React 组件也能够返回存储在数组中的一组元素
```jsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>

render() {
  // 不需要用额外的元素包裹列表元素！
  return [
    // 不要忘记设置 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

+ 布尔类型、Null 以及 Undefined 将会忽略
+ false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。
+ 这有助于依据特定条件来渲染其他的 React 元素。也就是条件渲染的进行。
+ 值得注意的是有一些 “falsy” 值，如数字 0，仍然会被 React 渲染。
+ 反之，如果想渲染 false、true、null、undefined 等值，需要先将它们转换为字符串

### 字符串字面量

+ 可以将字符串放在开始和结束标签之间，此时 props.children 就只是该字符串。
+ `<MyComponent>Hello world!</MyComponent>`
+ JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。

### JS 表达式或函数作为子元素

+ JavaScript 表达式可以被包裹在 {} 中作为子元素。`<MyComponent>{'foo'}</MyComponent>`

+ 通常，JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表。
+ 不过，props.children 和其他 prop 一样，它可以传递任意类型的数据，而不仅仅是 React 已知的可渲染类型。
+ 可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。
```jsx
// 例如，如果有一个自定义组件，可以把回调函数作为 props.children 进行传递
return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
```

## JSX 防止注入攻击

+ 你可以安全地在 JSX 当中插入用户输入内容
```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
+ React DOM 在渲染所有输入内容之前，默认会进行转义。
+ 它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。
+ 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

# 环境构建

## 脚手架

+ 用于创建模板项目
+ react 创建脚手架的库：`create-react-app`
+ 此脚手架的核心技术：`react + webpack + es6 + eslint`
+ 全局安装：`npm install -g create-react-app`
+  在创建目录中使用：`create-react-app fileName `
+ 脚手架文件
  + pubic -- 静态资源文件夹
    + robots.txt -- 爬虫规则文件
  + src -- 代码文件夹
  + `$PUBLIC_URL%` 来指定文件夹 `public`

```js
yarn start // 启动
yarn build // 打包
yarn eject // 暴露 webpack.config 配置文件 , 无法返回撤销
```

+ 在全局安装 babel-cli 来使用 es6 语法

```js
npm install --save-dev babel-cli
```

## 打包

+ npm run build  默认打包为服务器端运行的生产版本
  + 通过配置 package.json 中的 ` "homepage":"." ` 来部署本地运行的版本
  + 这个是将内部的链接从绝对路径切换为相对路径

## 常用

```json
"homepage": ".",// 打包的时候路劲设置为相对路径方便在本地使用
 "dependencies": {// 以包名和 ^加版本号来引用依赖项
    "antd": "^4.12.3",  // UI 库
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "prop-types": "^15.7.2"  // react 组件 props 属性限制 
     // import { PropTypes } from 'prop-types';
     
    "copy-to-clipboard": "^3.3.1" // 复制  
  },
"scripts": {// 切换默认启动的浏览器
    "start": " set BROWSER=chrome&&react-scripts start",
    "start": "set BROWSER=none&& set PORT=8080&& react-scripts start"//端口和浏览器
},
```

+ ` copy-to-clipboard `
  + 用法 ` import copy from 'copy-to-clipboard' `
  + `  copy('要复制的文本'); 返回一个布尔值代表是否成功 `
+ ` prop-types ` [用法](#props-限制)

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

# Context

+ Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
+ Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

## 何时使用 Context

+ Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

+ 通过一个个组件不断向下进行传递是非常麻烦的一件事，但是通过 Context 就可以避免这个问题。
```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }

// 指定 contextType 读取当前的 theme context。
// React 会往上找到最近的 theme Provider，然后使用它的值。
// 在这个例子中，当前的 theme 值为 “dark”。
// 这中方式只 适用于 class 组件
static contextType = ThemeContext;
// 需要声明静态属性 static 接收 ThemeContext
render() {
  return <Button theme={this.context} />;
}
```
+ 函数组件中使用需要利用 Consumer 组件来消费,或者利用 useContext

## 是否需要使用 Context 

+ Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
+ 如果你只是想避免层层传递一些属性，直接将组件传递到深层有时候是一个比 context 更好的解决方案。
+ 但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。
+ Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。
+ 使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。

## API

+ 消费组件：使用了 Context 传入值的组件
+ Context 是可以动态更新的

+ [动态更新](https://react.docschina.org/docs/context.html#dynamic-context)
+ [嵌套更新](https://react.docschina.org/docs/context.html#updating-context-from-a-nested-component)
+ [消费多个](https://react.docschina.org/docs/context.html#consuming-multiple-contexts)
  + 为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

### React.createContext

+ ` const MyContext = React.createContext(defaultValue); `
+ 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

+ 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
+ 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
+ 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

### Context.Provider

+ ` <MyContext.Provider value={/* 某个值 */}> `
+ 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

+ Provider 接收一个 value 属性，传递给消费组件。
+ 一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

+ 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
+ Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

+ 通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。

### Class.contextType

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {let value = this.context;/* ... */}
  componentWillUnmount() {let value = this.context;/* ... */}
  render() {let value = this.context;/* 基于 MyContext 组件的值进行渲染 */}
}
MyClass.contextType = MyContext;
```
+ 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
+ 这能让你使用 this.context 来消费最近 Context 上的那个值。
+ 你可以在任何生命周期中访问到它，包括 render 函数中。

### Context.Consumer

+ 用来消费 Context 的值

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
// 这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
```

### Context.displayName

+ context 对象接受一个名为 displayName 的 property，类型为字符串。
+ React DevTools 使用该字符串来确定 context 要显示的内容。
```jsx
// 下述组件在 DevTools 中将显示为 MyDisplayName：
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider /> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer /> // "MyDisplayName.Consumer" 在 DevTools 中
```

### 注意事项

+ 因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。
+ 举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：
```js
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
// 为了防止这种情况，将 value 状态提升到父节点的 state 里：
class App extends React.Component {
  state = {
    value: {something: 'something'},
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

# 需要了解的

## 特点

+ 利用 displayName 属性可以为组件指定在 DevtTools React 开发辅助工具中显示的名称。

## 错误边界

+ 用于捕获错误，而不至于无法显示 UI 界面
+ 只能捕获 子组件 生命周期中出现的错误
+ 错误边界无法捕获以下场景中产生的错误
  + 事件处理
  + 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
  + 服务端渲染
  + 它自身抛出来的错误（并非它的子组件）

+ 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 
+ componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
+ 当抛出错误后，
+ 使用 static getDerivedStateFromError() 渲染备用 UI ，
+ 使用 componentDidCatch() 打印错误信息。
```jsx
class ErrorBoundary extends React.Component {
    this.state = { hasError: false };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 统计错误
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

render() {
  const { state: { hasError }, props: { children } } = this;
  return (
      <>
        {hasError ? <h1>APP出错了</h1> : children}
      </>
  );
}


// 可以将它作为一个常规组件去使用：包裹可能会出错的组件
// 这样就可以吧错误限制在规定的一定的范围内
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
+ 错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。
+ 只有 class 组件才可以成为错误边界组件。
+ 大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

+ 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
+ 如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制。

+ 未捕获错误的新行为
+ 出错的 UI 会直接不给与展示。
+ 将组件包含在单独的错误边界中可以让逐渐崩溃后不影响到其他组件的正常使用。

## Fragments

+ React 中的一个常见模式是一个组件返回多个元素。
+ Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
```jsx
render() {
  return (  // 简写 <>  children </>
  // 带有 key 可以这样写 <React.Fragment key={item.id}> 目前是唯一可以传给 Fragment 的属性
  // 将一个集合映射到一个 Fragments 数组
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

# Refs 转发

+ Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。
```jsx
// FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button：
// 这样就可以直接在外部得到组件中渲染的元素
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

/*
1. 通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
2. 通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
3. React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
4. 向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
5. 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
*/
```
+ 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。
+ 常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
+ Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

+ 高阶组件转发 ref 使用的同样是 React.forwardRef 方法
+ 这个方法接受两个参数，第一个是 props ，第二个是 ref。返回一个 React 节点
```jsx 
const Button = React.forwardRef((props.ref) => {
  return (
    <Button ref={ref}>{props.name}</Button>
  )
});

render(){
  return( //传入时必须要明确的传入 ref ，不然 React.forwardRef 无法得到 ref 这个参数
    <Button  {...props} ref={refName}/>
  )
}
```

# 高阶组件

+ [高阶组件](https://react.docschina.org/docs/higher-order-components.html)

+ 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。
+ 常见的一些高阶组件
  + React.memo 就是一个高阶组件
  + react-redux 中的 connect
  + react-router 中的 withRouter
+ HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

+ 具体而言，高阶组件是参数为组件，返回值为新组件的函数。
```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
+ 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

+ HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。


+ 不要改变原始组件。使用组合。在 HOC 函数中修改组件容易导致出错。
+ 而应该使用组合的方式，通过将组件包装在容器组件中实现功能
```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

## 约定：将不相关的 props 传递给被包裹的组件

+ HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的接口。
+ 这种约定保证了 HOC 的灵活性以及可复用性。
+ HOC 应该透传与自身无关的 props。大多数 HOC 都应该包含一个类似于下面的 render 方法：
```js
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

## 约定：最大化可组合性

+ 并不是所有的 HOC 都一样。有时候它仅接受一个参数，也就是被包裹的组件：
+ ` const NavbarWithRouter = withRouter(Navbar); `

+ HOC 通常可以接收多个参数。比如在 Relay 中，HOC 额外接收了一个配置对象用于指定组件的数据依赖：
+ ` const CommentWithRelay = Relay.createContainer(Comment, config); `

+ 最常见的 HOC 签名如下：
```js
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
// 把它分开，就会更容易看出发生了什么。
// connect 是一个函数，它的返回值为另外一个函数。
const enhance = connect(commentListSelector, commentListActions);
// 返回值为 HOC，它会返回已经连接 Redux store 的组件
const ConnectedComment = enhance(CommentList);
// connect 是一个返回高阶组件的高阶函数！
```

## 约定：包装显示名称以便轻松调试

+ HOC 创建的容器组件会与任何其他组件一样，会显示在 React Developer Tools 中。为了方便调试，请选择一个显示名称，以表明它是 HOC 的产物。

+ 不要在 render 方法中使用 HOC，因为这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
+ 这还会导致子树的状态丢失
+ Refs 不会被传递

# Portals

+ Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
+ ` ReactDOM.createPortal(child, container) `
+ 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
+ 第二个参数（container）是一个 DOM 元素。
```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```
+ 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。
+ 例如，对话框、悬浮卡以及提示框

+ 事件冒泡
+ 尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。
+ 由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，
+ 那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。
+ 这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先。

# Profiler API

+ Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。
+ 它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。

+ Profiling 增加了额外的开支，所以它在生产构建中会被禁用。

+ 用法
+ Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。
+ 它需要两个 prop ：
  + 一个是 id(string)，
  + 一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。
+ 使用的方式非常多，不仅仅可以使用多个，还可以进行嵌套使用
+ 尽管 Profiler 是一个轻量级组件，我们依然应该在需要时才去使用它。
+ 对一个应用来说，每添加一些都会给 CPU 和内存带来一些负担。
```jsx
// 例如，为了分析 Navigation 组件和它的子代
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    {/* 多个 Profiler 组件能测量应用中的不同部分 */}
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
```

## onRender 回调

+ Profiler 需要一个 onRender 函数作为参数。 
+ React 会在 profile 包含的组件树中任何组件 “提交” 一个更新的时候调用这个函数。 
+ 它的参数描述了渲染了什么和花费了多久。
```js
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}

/*
+ 仔细研究一下各个 prop:
  + id: string - 发生提交的 Profiler 树的 id。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。
  + phase: "mount" | "update" - 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。
  + actualDuration: number - 本次更新在渲染 Profiler 和它的子代上花费的时间。 
    这个数值表明使用 memoization 之后能表现得多好。
    （例如 React.memo，useMemo，shouldComponentUpdate）。 
    理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。
  + baseDuration: number - 在 Profiler 树中最近一次每一个组件 render 的持续时间。
    这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。
  + startTime: number - 本次更新中 React 开始渲染的时间戳。
  + commitTime: number - 本次更新中 React commit 阶段结束的时间戳。 
    在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。
  + interactions: Set - 当更新被制定时，“interactions” 的集合会被追踪。
    （例如当 render 或者 setState 被调用时）。
*/
+ Interactions 能用来识别更新是由什么引起的，尽管这个追踪更新的 API 依然是实验性质的。
```

# Refs & DOM

+ 这几个情况都适合使用 Refs
  + 管理焦点，文本选择或媒体播放。
  + 触发强制动画。
  + 集成第三方 DOM 库。

+ 创建 Refs 方式一，也是推荐的方式
  + Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。
  + `this.myRef = React.createRef();`
  + `<div ref={this.myRef} />;`
+ 访问 Refs
  + 当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
  + `const node = this.myRef.current;`
+ ref 的值根据节点的类型而有所不同：
  + 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
  + 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。添加方式一样
  + 不能在函数组件上使用 ref 属性，因为他们没有实例。

+ React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。
+ ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。

+ Refs 与函数组件
  + 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例
  + 如果要在函数组件中使用 ref，可以使用 forwardRef
  + 不管怎样，你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件
  + `const textInput = useRef(null);` ,这样来创建。

## 方式二，回调

+ 回调
  + React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。
  + `ref={(e)=>this.TextRef = e}`
  + React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。
  + 在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。

## 将 DOM Refs 暴露给父组件

+ 虽然可以向子组件添加 ref，但这不是一个理想的解决方案，因为只能获取组件实例而不是 DOM 节点。
+ 并且，它还在函数组件上无效。

+ [转发ref](https://react.docschina.org/docs/forwarding-refs.html)

# Render Props

+ 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
+ 具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。
```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
// DataProvider 内部
function DataProvider(props){

  const {render} = props;
  const [state,setState] = useState({target:'目标'});

  return(
    <div>
      <span>固定内容</span>
      { // 这样的渲染方式可以重复利用 DataProvider 组件来渲染不同的内容
        // 且所有的内部渲染的组件都可以得到 DataProvider 组件的状态或是一些数据
        render(state)
      }
    </div>
  )

}
```

+ 这种方法可以提高组件的复用率。
```jsx
// 在 Mouse 组件中通过 利用方法来返回一个动态刷新的 Cat 组件
{this.props.render(this.state)}

// 通过这样的回调就可以避免将 Cat 组件添加到 Mouse 中，提高了 Mouse 组件的复用率
// 动态的决定需要渲染的内容 render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
<Mouse render={mouse => (
  <Cat mouse={mouse} />
)}/>
```

+ 注意事项
+ 如果在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。
+ 因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。
```js
render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        {/* 这是不好的！ 每个渲染的 `render` prop的值将会是不同的。*/}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
```
+ 每次 <MouseTracker> 渲染，它会生成一个新的函数作为 <Mouse render> 的 prop，
+ 因而在同时也抵消了继承自 React.PureComponent 的 <Mouse> 组件的效果！
+ 为了绕过这一问题，有时你可以定义一个 prop 作为实例方法
```js
renderTheCat(mouse) {
  return <Cat mouse={mouse} />;
}

<Mouse render={this.renderTheCat} />
```

## 使用 Props 而非 render

+ render prop 是因为模式才被称为 render prop
+ 不一定要用名为 render 的 prop 来使用这种模式。
+ children prop 并不真正需要添加到 JSX 元素的 “attributes” 列表中。相反，你可以直接放置到元素的内部！
```jsx
// 在 render 内部书写方法会导致每一次都生成一个新函数
// 将方法定义在 class 中,或是使用 useCallBack 进行优化创建
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
  )}
</Mouse>
```

# 静态类型检查

+ 建议在大型代码库中使用 Flow 或 TypeScript 来代替 PropTypes。

## PropTypes

+ `npm install --save prop-types`
+ `import PropTypes from 'prop-types';`
+ 这个库主要支持对 props 的类型进行检查并报错

+ 通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素。
+ 配置特定的 defaultProps 属性来定义 props 的默认值：`Greeting.defaultProps={name:'Stranger'}`
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};

```

## Flow

+ [React Flow](https://react.docschina.org/docs/static-type-checking.html#flow)

+ [Flow](https://flow.org/) 是一个针对 JavaScript 代码的静态类型检测器。Flow 由 Facebook 开发，经常与 React 一起使用。
+ [学习](https://flow.org/en/docs/getting-started/)

+ 在项目中添加 `yarn add --dev flow-bin  || npm install --save-dev flow-bin`
+ 接下来，将 flow 添加到项目 package.json 的 "scripts" 部分，以便能够从终端命令行中使用它：` "flow": "flow",`
+ 最后，执行以下命令之一：`yarn run flow init  || npm run flow init`

+ 从编译后的代码中去除 Flow 语法
+ 如果使用的是 Create React App，那么 Flow 注解默认会被去除，所以在这一步你不需要做任何事情。
+ [其他](https://react.docschina.org/docs/static-type-checking.html#babel)

+ 运行 Flow
+ `yarn flow || npm run flow`
+ 运行后看到的消息：`No errors! ✨  Done in 0.17s.`

+ 添加 Flow 类型注释
+ 默认情况下，Flow 仅检查包含此注释的文件：`// @flow`  通常，它位于文件的顶部。

## TypeScript

+ 还没学到 TypeScript 暂时用不上

+ 完成以下步骤，便可开始使用 TypeScript：
  + 将 TypeScript 添加到你的项目依赖中。 `yarn add --dev typescript || npm install --save-dev typescript`
    + + 安装 TypeScript 后就可以使用 tsc 命令。将 tsc 添加到 package.json 中的 “scripts” 部分
    + `"build": "tsc",`
  + 配置 TypeScript 编译选项
    + 没有配置项，编译器提供不了任何帮助。
    + 在 TypeScript 里，这些配置项都在一个名为 tsconfig.json 的特殊文件中定义。
    + `yarn run tsc --init || npx tsc --init`
  + 使用正确的文件扩展名
  + 为你使用的库添加定义

+ Create React App 内置了对 TypeScript 的支持。
+ 需要创建一个使用 TypeScript 的新项目 `npx create-react-app my-app --template typescript`

# 严格模式

+ StrictMode 是一个用来突出显示应用程序中潜在问题的工具。
+ 与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。
+ 它为其后代元素触发额外的检查和警告。
+ 严格模式检查仅在开发模式下运行；它们不会影响生产构建。
+ 使用 `<React.StrictMode>` 标签来嵌套住需要检查的组件，任何部分都可以使用

+ StrictMode 目前有助于：
  + 识别不安全的生命周期
  + 关于使用过时字符串 ref API 的警告
  + 关于使用废弃的 findDOMNode 方法的警告
  + 检测意外的副作用
  + 检测过时的 context API