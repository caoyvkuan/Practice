# React 顶层 API

+ React 是 React 库的入口。
+ 如果你通过使用 ` <script> ` 标签的方式来加载 React，则可以通过 React 全局变量对象来获得 React 的顶层 API。
+ 当你使用 ES5 与 npm 时，则可以通过编写 var React = require('react') 来引入它们。
+ 当你使用 ES6 与 npm 时，可以通过编写 import React from 'react' 来引入它们。

## 概览

### 组件

+ 通过子类 React.Component 或 React.PureComponent 来定义 React 组件。

+ React.Component
+ React.PureComponent

+ React 组件也可以被定义为可被包装的函数：React.memo

### 创建 React 元素

+ 使用 JSX 来编写 UI 组件。每个 JSX 元素都是调用 React.createElement() 的语法糖。

+ 使用了 JSX，就不再需要调用以下方法。
+ createElement()
+ createFactory()

### 转换元素

+ React 提供了几个用于操作元素的 API：
+ cloneElement()
+ isValidElement()
+ React.Children

### Fragments

+ React 还提供了用于减少不必要嵌套的组件。
+ React.Fragment

### Refs

+ React.createRef
+ React.forwardRef

### Suspense

+ Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。
+ 目前，Suspense 仅支持的使用场景是：通过 React.lazy 动态加载组件。它将在未来支持其它使用场景，如数据获取等。
+ React.lazy
+ React.Suspense

### Hook

+ Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

+ 基础 Hook
  + useState
  + useEffect
  + useContext
+ 额外的 Hook
  + useReducer
  + useCallback
  + useMemo
  + useRef
  + useImperativeHandle
  + useLayoutEffect
  + useDebugValue

## React.xxx
## x.Component

+ React.Component 是使用 ES6 classes 方式定义 React 组件的基类：
+ [详情](#reactcomponent)
```js
class Greeting extends React.Component{}
```

## x.PureComponent

+ React.PureComponent 与 React.Component 很相似。
+ 两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。
+ 如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

+ React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。
+ 如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。
+ 仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。
+ 你也可以考虑使用 immutable 对象加速嵌套数据的比较。

+ 此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。
+ 因此，请确保所有子组件也都是“纯”的组件。

## x.memo

+ React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。
```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```
+ 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，
+ 以此通过记忆组件渲染结果的方式来提高组件的性能表现。
+ 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

+ React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，
+ 且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。
+ 默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
```js
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```
+ 此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。

+ 与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；
+ 如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。

## x.createElement()

+ 创建并返回指定类型的新 React 元素
+ 运用了 JSX 的代码也将被转换为这种方式
```js
React.createElement(
  type,
  [props],// 没有属性可以用 null 或 空对象 {} 表示
  [...children]
)
```
其中的类型参数既可以是标签名字符串（如 'div' 或 'span'），
也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

## x.cloneElement()

+ 以 element 元素为样板克隆并返回新的 React 元素。
+ 返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
+ 新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。
```js
React.cloneElement(
  element,
  [props],
  [...children]
)
// React.cloneElement() 几乎等同于：
<element.type {...element.props} {...props}>{children}</element.type>
```
+ 但是，这也保留了组件的 ref。这意味着当通过 ref 获取子节点时，你将不会意外地从你祖先节点上窃取它。
+ 相同的 ref 将添加到克隆后的新元素中。
+ 引入此 API 是为了替换已弃用的 React.addons.cloneWithProps()。

## x.createFactory()

+ ` React.createFactory(type) `
+ 此辅助函数已废弃，建议使用 JSX 或直接调用 React.createElement() 来替代它。
+ 返回用于生成指定类型 React 元素的函数。与 React.createElement() 相似的是，类型参数既可以是标签名字符串（像是 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

## x.isValidElement()

+ ` React.isValidElement(object) `
+ 验证对象是否为 React 元素，返回值为 true 或 false。

## x.Children

+ React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

+ React.Children.map
+ ` React.Children.map(children, function[(thisArg)]) `
+ 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
+ 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
+ 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。

+ React.Children.forEach
+ ` React.Children.forEach(children, function[(thisArg)]) `
+ 与 React.Children.map() 类似，但它不会返回一个数组。

+ React.Children.count
+ ` React.Children.count(children) `
+ 返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。

+ React.Children.only
+ ` React.Children.only(children) `
+ 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。

+ React.Children.toArray
+ ` React.Children.toArray(children) `
+ 将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。
+ 当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时。
+ React.Children.toArray() 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。
+ 也就是说，toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。

## x.Fragment

+ React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素。
```jsx
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
// 你也可以使用其简写语法 <></>。
```

## x.createRef

+ React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref。
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

## x.forwardRef

+ React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：
+ 转发 refs 到 DOM 组件
+ 在高阶组件中转发 refs

+ React.forwardRef 接受渲染函数作为参数。
+ React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。
```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
+ 在上述的示例中，React 会将 <FancyButton ref={ref}> 元素的 ref 作为第二个参数传递给 React.forwardRef 函数中的渲染函数。该渲染函数会将 ref 传递给 <button ref={ref}> 元素。
+ 因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 <button> DOM 元素实例。

## x.lazy

+ React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
```js
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```
+ 请注意，渲染 lazy 组件依赖该组件渲染树上层的 <React.Suspense> 组件。
+ 这是指定加载指示器（loading indicator）的方式。
+ 使用 React.lazy 的动态引入特性需要 JS 环境支持 Promise。
+ 在 IE11 及以下版本的浏览器中需要通过引入 polyfill 来使用该特性。

## x.Suspense

+ React.Suspense 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。
+ 目前，懒加载组件是 <React.Suspense> 支持的唯一用例：
```jsx
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```
+ 请注意，lazy 组件可以位于 Suspense 组件树的深处——它不必包装树中的每一个延迟加载组件。
+ 最佳实践是将 <Suspense> 置于你想展示加载指示器（loading indicator）的位置，而 lazy() 则可被放置于任何你想要做代码分割的地方。
+ React.lazy() 和 <React.Suspense> 尚未在 ReactDOMServer 中支持。

# React.Component

+ React 的组件可以定义为 class 或函数的形式。class 组件目前提供了更多的功能。
+ 如需定义 class 组件，需要继承 React.Component：
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
+ 在 React.Component 的子类中有个必须定义的 [render()](#render) 函数。其他方法均为可选。
+ 在 React 中代码复用的方式不是继承而是组合，所以不需要自己创建基类来进行继承。

## 组件的生命周期

+ 每个组件都包含“生命周期方法”，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。你可以使用此[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)作为速查表。在下述列表中，常用的生命周期方法会被加粗。其余生命周期函数的使用则相对罕见。

### 挂载

+ 当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
  +  **[constructor()](#constructor)**
  +  static getDerivedStateFromProps()
  +  **[render()](#render)**
  +  **[componentDidMount()](#componentdidmount)**

### 更新

+ 当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
  + static getDerivedStateFromProps()
  + shouldComponentUpdate()
  + **[render()](#render)**
  + getSnapshotBeforeUpdate()
  + **[componentDidUpdate()](#componentdidupdate)**

### 卸载

+ 当组件从 DOM 中移除时会调用如下方法：
  + **[componentWillUnmount()](#componentwillunmount)**

### 错误处理

+ 当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
  + static getDerivedStateFromError()
  + componentDidCatch()

## 其他 APIs

+ 组件还提供了一些额外的 API：
  + [setState()](#setstate)
  + [forceUpdate()](#forceupdate)

### setState()

+ ` setState(updater, [callback]) `
+ setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。
+ 这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

+ 将 setState() 视为请求而不是立即更新组件的命令。
+ 为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。
+ React 并不会保证 state 的变更会立即生效。

+ setState() 并不总是立即更新组件。它会批量推迟更新。
+ 这使得在调用 setState() 后立即读取 this.state 成为了隐患。
+ 为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），这两种方式都可以保证在应用更新后触发。
+ 如需基于之前的 state 来设置当前的 state。

+ 除非 shouldComponentUpdate() 返回 false，否则 setState() 将始终执行重新渲染操作。
+ 如果可变对象被使用，且无法在 shouldComponentUpdate() 中实现条件渲染，那么仅在新旧状态不一时调用 setState()可以避免不必要的重新渲染

```js
// 参数一为带有形式参数的 updater 函数：
(state, props) => stateChange
// state 是对应用变化时组件状态的引用。当然，它不应直接被修改。
// 你应该使用基于 state 和 props 构建的新对象来表示变化。例如，假设我们想根据 props.step 来增加 state：
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```
+ updater 函数中接收的 state 和 props 都保证为最新。updater 的返回值会与 state 进行浅合并。
+ setState() 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。
+ 通常，我们建议使用 componentDidUpdate() 来代替此方式。

+ setState() 的第一个参数除了接受函数外，还可以接受对象类型：` setState(stateChange[, callback]) `
+ stateChange 会将传入的对象浅层合并到新的 state 中，例如，调整购物车商品数：` this.setState({quantity: 2}) `
+ 这种形式的 setState() 也是异步的，并且在同一周期内会对多个 setState 进行批处理。

### forceUpdate()

+ ` component.forceUpdate(callback) `
+ 默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。
+ 如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。

+ 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
+ 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。
+ 如果标记发生变化，React 仍将只更新 DOM。

## 属性

+ **class 属性**
  + [defaultProps](#defaultprops)
  + [displayName](#displayname)

+ **实例属性**
  + [props](#props)
  + [state](#state)

### defaultProps

+ defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。例如：
```js
class CustomButton extends React.Component {
  // ...
}
// 如果未提供 props.color，则默认设置为 'blue'
CustomButton.defaultProps = {
  color: 'blue'
};
// 如果 props.color 被设置为 null，则它将保持为 null
 render() {
    return <CustomButton color={null} /> ; // props.color 将保持是 null
  }
```

### displayName

+ displayName 字符串多用于调试消息。通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来。
+ 如果调试时需要显示不同的名称或创建高阶组件，请参阅[使用 displayname 轻松进行调试](https://react.docschina.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)了解更多。

### props

+ this.props 包括被该组件调用者定义的 props。欲了解 props 的详细介绍，[请参阅组件 & Props](./JS——React.md#组件--props)。
+ 需特别注意，this.props.children 是一个特殊的 prop，通常由 JSX 表达式中的子组件组成，而非组件本身定义。

### state

+ 组件中的 state 包含了随时可能发生变化的数据。state 由用户自定义，它是一个普通 JavaScript 对象。
+ 如果某些值未用于渲染或数据流（例如，计时器 ID），则不必将其设置为 state。此类值可以在组件实例上定义。

+ 永远不要直接改变 this.state，因为后续调用的 setState() 可能会替换掉你的改变。把 this.state 看作是不可变的。

## 常用的生命周期方法

### render()

+ render() 方法是 class 组件中唯一必须实现的方法。
+ 当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：
  - React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
  - 数组或 fragments。 使得 render 方法可以返回多个元素。[React.fragments](#xfragment)
  - Portals。可以渲染子节点到不同的 DOM 子树中。
  - 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
  - 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。)

+ 如果 shouldComponentUpdate() 返回 false，则不会调用 render()。

### constructor()

+ ` constructor(props) `   可以省略,几乎没有必要
+ 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
+ 在 React 组件挂载之前，会调用它的构造函数。
+ 在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。
+ 否则，this.props 在构造函数中可能会出现未定义的 bug。
+ 通常，在 React 中，构造函数仅用于以下两种情况：
  + 通过给 this.state 赋值对象来初始化内部 state。
  + 为事件处理函数绑定实例 绑定实力的方法可以直接在创造方法的时候使用 ` fn = () => {} ` 的方式绑定
+ 在 constructor() 函数中不要调用 setState() 方法。
+ 如果你的组件需要使用内部 state，请直接在构造函数中为 this.state 赋值初始 state：
```js
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
+ 只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代。

+ 要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。
+ 避免将 props 的值复制给 state！这是一个常见的错误：
```js
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
// 如此做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。
// 只有在你刻意忽略 prop 更新的情况下使用。
// 此时，应将 prop 重命名为 initialColor 或 defaultColor。必要时，你可以修改它的 key，以强制“重置”其内部 state
```

### componentDidMount()

+ componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。
+ 如需通过网络请求获取数据，此处是实例化请求的好地方。
+ 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅

+ 你可以在 componentDidMount() 里直接调用 setState()。
+ 它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。
+ 如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。
+ 请谨慎使用该模式，因为它会导致性能问题。通常，应该在 constructor() 中初始化 state。
+ 如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理

### componentDidUpdate()

+ ` componentDidUpdate(prevProps, prevState, snapshot) `
+ componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。
+ 当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。
```js
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
+ 你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，否则会导致死循环。
+ 它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑直接使用 props。 + 欲了解更多有关内容，请参阅[为什么 props 复制给 state 会产生 bug](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)。

+ 如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。
+ 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。

### componentWillUnmount()

+ componentWillUnmount() 会在组件卸载及销毁之前直接调用。
+ 在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
+ componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

## 不常用的生命周期方法

+ [生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### shouldComponentUpdate()

+ ` shouldComponentUpdate(nextProps, nextState) `

+ 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
+ 默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，应该遵循默认行为。

+ 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
+ 返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。
+ [详情](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)

### static getDerivedStateFromProps()

+ ` static getDerivedStateFromProps(props, state) `
+ getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
+ 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

+ 此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。
+ 例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。
+ [详情](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)

### getSnapshotBeforeUpdate()

+ ` getSnapshotBeforeUpdate(prevProps, prevState) `
+ getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。
+ 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
+ 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

+ 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
+ 应返回 snapshot 的值（或 null）。
+ [详情](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)

### Error boundaries

+ Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。
+ Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。

+ 如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。
+ 通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。
+ 仅使用 Error boundaries 组件来从意外异常中恢复的情况；不要将它们用于流程控制。

+ Error boundaries 仅捕获组件树中以下组件中的错误。但它本身的错误无法捕获。

### static getDerivedStateFromError()

+ ` static getDerivedStateFromError(error) `
+ 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
+ [详情](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)

### componentDidCatch()

+ ` componentDidCatch(error, info) `
+ 此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
  + error —— 抛出的错误。
  + info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
+ [详情](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### 过时的生命周期方法

+ [过时的生命周期方法](https://react.docschina.org/docs/react-component.html#legacy-lifecycle-methods)

# ReactDOM

+ 使用一个 <script/> 标签引入 React ,所有的顶层 API 都能在全局 ReactDOM 上调用
+ ES6 和 npm `import ReactDOM from 'react-dom'`
+ ES5 和 npm `var ReactDOM = require('react-dom')`

+ 主要的API
  + render()
  + hydrate()
  + unmountComponentAtNode()
  + findDOMNode()
  + createPortal()

## render()

+ `ReactDOM.render(element, container[, callback])`
+ 在提供的 container 里渲染一个 React 元素，并返回对该组件的引用或者针对无状态组件返回 null）
+ 如果 React 元素之前已经在 container 里渲染过，这将会对其执行更新操作，并仅会在必要时改变 DOM 以映射最新的 React 元素。

+ 如果提供了可选的回调函数，该回调将在组件被渲染或更新之后被执行。

+ ReactDOM.render() 会控制你传入容器节点里的内容。当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
+ ReactDOM.render() 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

## hydrate()

+ `ReactDOM.hydrate(element, container[, callback])`
+ 与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。
+ React 会尝试在已有标记上绑定事件监听器。
+ [文档](https://react.docschina.org/docs/react-dom.html#hydrate)

## unmountComponentAtNode()

+ `ReactDOM.unmountComponentAtNode(container)`
+ 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。
+ 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。
+ 如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。

## createPortal()

+ `ReactDOM.createPortal(child, container)`
+ 创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。

## findDOMNode()

+ 不推荐使用，用来访问底层 DOM 的应急方案，在严格模式中被弃用
+ `ReactDOM.findDOMNode(component)`
+ [文档](https://react.docschina.org/docs/react-dom.html#finddomnode)

# ReactDOMServer

+ ReactDOMServer 对象允许你将组件渲染成静态标记。通常，它被使用在 Node 服务端上：
```JS
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

+ 下述方法可以被使用在服务端和浏览器环境。
  + [renderToString()](#rendertostring)
  + [renderToStaticMarkup()](#rendertostaticmarkup)

+ 下述附加方法依赖一个只能在服务端使用的 package（stream）。它们在浏览器中不起作用。
  + [renderToNodeStream()](#rendertonodestream)
  + [renderToStaticNodeStream()]()

## renderToString()

+ `ReactDOMServer.renderToString(element)`
+ 将 React 元素渲染为初始 HTML。React 将返回一个 HTML 字符串。
+ 可以使用此方法在服务端生成 HTML，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 SEO 优化的目的。
+ 如果你在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，
+ React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。

## renderToStaticMarkup()

+ `ReactDOMServer.renderToStaticMarkup(element)`

+ 此方法与 renderToString 相似，但此方法不会在 React 内部创建的额外 DOM 属性，例如 data-react。
+ 如果希望把 React 当作静态页面生成器来使用，此方法会非常有用，因为去除额外的属性可以节省一些字节。

+ 如果计划在前端使用 React 以使得标记可交互，请不要使用此方法。
+ 可以在服务端上使用 renderToString 或在前端上使用 ReactDOM.hydrate() 来代替此方法。

## renderToNodeStream()

+ `ReactDOMServer.renderToNodeStream(element)`
+ 将一个 React 元素渲染成其初始 HTML。返回一个可输出 HTML 字符串的可读流。
+ 通过可读流输出的 HTML 完全等同于 ReactDOMServer.renderToString 返回的 HTML。
+ 可以使用本方法在服务器上生成 HTML，并在初始请求时将标记下发，以加快页面加载速度，
+ 并允许搜索引擎抓取你的页面以达到 SEO 优化的目的。
+ 如果在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，
+ React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。

## renderToStaticNodeStream()

+ `ReactDOMServer.renderToStaticNodeStream(element)`
+ 此方法与 renderToNodeStream 相似，但此方法不会在 React 内部创建的额外 DOM 属性，例如 data-react。
+ 如果希望把 React 当作静态页面生成器来使用，此方法会非常有用，因为去除额外的属性可以节省一些字节。
+ 通过可读流输出的 HTML，完全等同于 ReactDOMServer.renderToStaticMarkup 返回的 HTML。
+ 如果计划在前端使用 React 以使得标记可交互，请不要使用此方法。
+ 可以在服务端上使用 renderToNodeStream 或在前端上使用 ReactDOM.hydrate() 来代替此方法。

# DOM 元素

+ React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。
+ 在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。
+ 例如，与 HTML 中的 tabindex 属性对应的 React 的属性是 tabIndex
+ 例外的情况是 aria-* 以及 data-* 属性，一律使用小写字母命名。
+ 比如, 你依然可以用 aria-label 作为 aria-label。

## 属性

### checked

+ 当 <input> 组件的 type 类型为 checkbox 或 radio 时，组件支持 checked 属性。
+ defaultChecked 属性可以设置首次挂载时的默认选中。

### 名字的改变

+ class 改用 className 表示
+ className 属性用于指定 CSS 的 class，此特性适用于所有常规 DOM 节点和 SVG 元素，如 <div>，<a> 及其它标签。

+ for 改用 htlFor 表示 ，label 标签。

+ onChange 事件与预期行为一致：每当表单字段变化时，该事件都会被触发。
+ 是因为 onChange 在浏览器中的行为和名称不对应，并且 React 依靠了该事件实时处理用户输入。

+ selected
+ <option> 组件支持 selected 属性。你可以使用该属性设置组件是否被选择。这对构建受控组件很有帮助。

+ style
+ 不推荐直接使用 style 来设置元素的样式，一般只在需要动态计算样式时才使用
+ 利用一个小驼峰命名属性的 对象来进行设置，而不是字符串
+ React 会自动添加 px 到内联样式为数值的属性后，不需要手动添加，如果使用其他的单位需要使用字符串的方式设置

+ value
+ <input> 和 <textarea> 组件支持 value 属性。用于构建受控组件

# [合成事件](https://react.docschina.org/docs/events.html)

# HOOks

+ 可以在不写 class 的情况下使用 state 和一些其他的 React 特性
```js
import React, { useState } from 'react';
// 声明一个新的叫做 “count” 的 state 变量
  function Example() {
  // 声明一个新的叫做 “count” 的 state 变量, 初始值为 0
  const [count, setCount] = useState(0);
  // 可以利用返回的 setCount 函数来进行修改
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

+ 在这里，useState 就是一个 Hook , useState 唯一的参数就是初始 state。
+ 初始 state 参数只有在第一次渲染时会被用到。
+ 通过在函数组件里调用它来给组件添加一些内部 state。
+ React 会在重复渲染时保留这个 state。
+ useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。
+ 类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

## 概览

### 声明多个 state 变量

```js
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [toDos, setToDos] = useState([{ text: 'Learn Hooks' }]);
  // 数组解构的语法让我们在调用 useState 时可以给 state 变量取不同的名字
  // React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。
}
```

### 什么是 Hook?

+ Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。
+ Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。
+ React 内置了一些像 useState 这样的 Hook。
+ 可以创建自己的 Hook 来复用不同组件之间的状态逻辑。

### Hook 使用规则

+ Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
  + 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
  + 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
  + 在自定义 Hook 中是可以调用的。
+ 使用 `npm install eslint-plugin-react-hooks --save-dev` 来校验
```json
// ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

### 其他 Hook

+ useContext 让你不使用组件嵌套就可以订阅 React 的 Context。
+ useReducer 可以让你通过 reducer 来管理组件本地的复杂 state。

## State Hook

+ Hook 在 class 组件中不起作用,但是可以让函数组件来取代 class 组件.
+ 使用 Hook 需要引入 `import React, {useState} from 'react'`
+ useState 是允许在函数组件中添加 state 的 Hook
+ useState 的初始值可以接收一个函数进行计算并返回一个初始的值
  + `useState(()=>{return initialState})`
  + 这个函数值会在初次渲染时才被调用
```js
// 声明 state 变量   count 的初始值为 0
const [count, setCount] = useState(0);
// 可以通过 setCount 来更新 count 的值
// 使用 count 就可以直接读取 state
// useState 仅在第一次渲染的时候创建 state 变量, 后续不会创建新的,而是返回当前的

function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  // React 会确保 setState 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。
  return ( // 不同的用法,可以直接传入函数返回一个值进行更新
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
+ 调用 useState 方法定义一个 state 变量,尽管函数退出后也会被 React 保存
  + 返回两个参数且为数组,所以可以使用结构赋值的方式取出,名字可以随意 :
  + 第一个为变量 , 第二个为设置变量的方法
  + useState 可以接收一个参数, 参数为返回变量的初始值
+ 更新的时候这个方法所做的是直接替换,而不是像 this.setState 一样合并

## Effect Hook

+ React 组件中执行过数据获取、订阅或者手动修改 DOM ， 这样的操作统一称为“副作用”，或者简称为“作用”。
+ useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。
+ 它跟 class 组件中的 `componentDidMount、componentDidUpdate 和 componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。
+ 也就是说这个 Hook useEffect 是这三个函数的组合
+ 这个 Hook 类似于 class 组件的生命周期
```js
import React,{useState,useEffect} from 'react'

function Example(){
  // 这个方法类似于生命周期的 componentDidMount and componentDidUpdate:
  useEffect(()=>{
    document.title = `You clicked ${count} times`;
    // 相当于
    /*  componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    } */

    // 订阅消息
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

  return () => {
    // 这返回的函数相当于 componentWillUnmount 生命周期
    // 可以在这里取消订阅等操作
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  }
  })


  return <h1></h1>
}
```
+ useEffect 会在组件渲染和更新时执行传入的函数, Hook 使用了 JS 的闭包机制
  + 每一次的渲染和更新之后都会执行
  + 每次都会进行重新渲染生成新的 effect 而保持最新
  + 这个方法不会阻塞浏览器更新屏幕

+ 清除不需要的 effect , 比如 订阅和发布
  + 清除操作会在卸载时执行清除操作, effect 每一次渲染都会执行,也就是卸载操作每次更新也会执行,因为渲染时会替换为全新的 effect 函数,也就相当与上一个 effect 被卸载了.
  + 如果 uesEffect 返回一个函数,React 将会在执行清除操作时调用它,也就相当与 componentWillUnmount 这个生命周期

+ 每次更新都要运行 effect 是为了避免一些数据或内存泄漏的问题

+ 跟 useState 一样，你可以在组件中多次使用 useEffect , 也可以很轻松的实现关注分离
+ 将不同的概念分开,相同的功能统合在一起
+ 通过使用 Hook，可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅）
+ 而不需要把它们拆分到不同的生命周期函数里。

+ 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
+ React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便。

### 优化

+ 避免不必要的更新
```js
// 生命周期 通过比较上一次 prevState 的值与当前 State 的值来进行判断
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}

// 第二个参数为 判断是否需要更新的标记, 只有传入的参数改变了才会执行 effect
// 这个参数为 数组
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

### 执行顺序

```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
```

## 自定义 Hook

+ 重用一些状态逻辑，利用 高阶组件和 render props 的方式可以解决，
+ 利用 Hook 可以在不增加组件的情况下实现相同的目的。
+ 以约定的 use 作为函数的开头很重要,因为这可以让 React 帮助检查
+ 使用 useReducer 可以利用 reducer 的方式来管理 State
```js
import React, { useState, useEffect } from 'react';
// 首先，把逻辑抽取到一个叫做 useFriendStatus 的自定义 Hook 里
// 将 friendID 作为参数，并返回该好友是否在线
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline); // 得到在线状态
  }

  useEffect(() => {
    // 订阅对应 ID 的在线状态
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      // 取消对应 ID 的订阅
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline; // 返回状态
}
// 复用 这样就不用对单个的 ID 进行状态的订阅了,在使用的时候调用这个自定义的 Hook 就行
const isOnline = useFriendStatus(props.friend.id);
```
+ Hook 是一种复用状态逻辑的方式，它不复用 state 本身。
+ 事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

+ 自定义 Hook 更像是一种约定而不是功能。
+ 如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。
+ useSomething 的命名约定可以让 linter 插件在使用 Hook 的代码中找到 bug。

## Hook API

+ [链接](https://react.docschina.org/docs/hooks-reference.html)

+ 基础
  + useState
  + useEffect
  + useContext
+ 额外的 [链接](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
  + useReducer
  + useCallback
  + useMemo
  + useRef
  + useImperativeHandle
  + useLayoutEffect
  + useDebugValue

### 基础 Hook

+ useContext
+ [链接](https://react.docschina.org/docs/hooks-reference.html#usecontext)
  + `const value = useContext(MyContext);`
  + 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
  + 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

+ 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。

+ useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。
+ 你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。

+ 使用这个也就免除了需要利用 MyContext.Consumer 组件 来读取 context 值的过程
```jsx
// 直接读取到 MyContext 最近的值, 很方便
const context = useContext(MyContext);

<MyContext.Consumer>
  {a =>{
    // 在这里通过 a 来读取 context 传递的值
    return <h1>{a}</h1>
  }}
</MyContext.Consumer>
```

### 额外的

### useReducer

+ `const [state, dispatch] = useReducer(reducer, initialArg, init);`
+ useState 的替代方案。
+ 它接收一个形如 (state, action) => newState 的 reducer，
+ 并返回当前的 state 以及与其配套的 dispatch 方法。
+ [参考链接](https://react.docschina.org/docs/hooks-reference.html#usereducer)
```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useRef

+ `const refContainer = useRef(initialValue);`
+ useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。