# Vue

+ CDN 引入
```html
<script src="https://unpkg.com/vue@next"></script>

<!-- 基本使用 -->
<script>
  // 传入配置对象
  const app = Vue.createApp({
    template: `
      <h2> {{counter}} </h3>
      <button @click='increment'> +1 </button>
      <button @click='decrement'> -1 </button>
    `,
    data() {
      return {
        counter: 100
      }
    },
    methods: {
      increment() {
        this.counter += 1
      },
      decrement() {
        this.counter -= 1
      }
    }
  });

  // 挂载
  app.mount("#app");
</script>
```

## 组件化

```js
// .vue file
<template>

</template>

// setup 启用 API
// lang 指定语言
<script setup lang='ts'>
export default {
  components: {

  },
  data(){
    return { }
  },
  methods: { },
  watch: { },
  computed: { }
}

</script>

// scoped 限制 css 生效范围
// lang 指定 css 预处理器
<style scoped lang="sass">

</style>

```

# Options API

## template

+ html 模板
+ parameter: htmlString | '#id'

+ 写法一
```html
<!-- template: '#vue', -->
<script type="x-template" id="vue">
  <h2> {{counter}} </h3>
</>
```

+ 写法二
  + template 原生 html 标签, 但是内容不会被渲染
```html
  <template id="vue">
    <h2> {{counter}} </h3>
    <button @click='increment'> +1 </button>
    <button @click='decrement'> -1 </button>
  </template>
```

## data

+ parameter: Function
+ return: Object
+ 返回的对象会被 Vue 劫持, Proxy

## watch

+ 侦听器
+ parameter: Object
  + {[Key:string]:string | Function | Object | Array}
+ 监听数据的改变属性
```js
witch: {
  // 方法名为: 要监听的属性名
  count(newValue, oldValue){

  },
  // 监听 Object 中的 name 属性, 不支持数组
  'Object.name':['method', function(){}, {handle(){}}],
  key: {
    handler() {},

    // 在数据未改变前, 强制执行一次
    immediate: true,

    // 深度监听, 默认为浅层监听, 深度监听会遍历整个 对象, 比较费性能
    deep: true,
    // 由于默认为浅层, 所以在监听对象时, 需要赋值 一个新对象才会触发
    // 深层监听, 不会拷贝对象, new 和 old 指向同一个对象

    // 更改触发时机, 原本在 view 更新前触发, 只能得到旧的 dom
    flush: 'post',
    // 通过这个选项, 可以选择在更新后触发, 就能得到新的 dom
  }
}
```

## computed

+ 计算属性 - 用于处理任何包含响应式数据的复杂逻辑
+ parameter: Object
  + `{[key:String]: Function}`
  + `{[key:String]: {get; set;}}`
+ 拥有缓存, 减少性能消耗, 相当于 useMemo(callback)
+ 更新机制
  + 只有 data 中 被使用的响应式数据发生改变才会更新对应的 计算属性
  + 如果没有使用 data 中的数据, 将不会更新
```js
<>{{sum}}</>
// {[key:String]: Function}
computed:{
  sum(){
    return a + b;
  },

  // {[key:String]: {get; set;}}
  sum: {
    get() {
      return data
    },
    set(newValue) {
      this.data = newValue
    }
  }
}
```

## methods

+ parameter: Object
+ 在这个对象中定义方法, this 能够访问 data 返回的对象
+ this 指向 proxy
  + 代理中可以访问 data 返回的对象, method 中声明的方法

## Mixin

+ 逻辑复用
+ Mixin: OptionObject 可以包含任何组件选项
+ 当名字重复时, 合并规则
  + data 中以组件中为准
  + 生命周期会被合并为数组, 都会被触发
  + 对象类型 如 methods, 会被合并为同一个对象, 同名保留组件内部
```js
// 声明 Mixin
export const demoMixin = {
  // ...Options
}

// 混入到组件中
const app = {
  mixins: [demoMixin]
}

// 全局混入, 会影响所有组件
createApp(options).mixin({
  // 混入
})
```

## extends

```js
const app = {
  // 继承其他组件对象中的属性
  extends: CommonComponent
}
```

# template grammar

+ Mustache grammar - bind value
  + `{{value}}` or `{{expression}}`

+ template tag 可以当 react 中的空标签 `<></>` 使用, 不会被渲染
  + <React.Fragment></React.Fragment>

# directives

## 自定义指令

+ 在某些情况下对 DOM 元素进行底层操作
+ 自定义指令分: 局部 和 全局
  + 局部: directives 选项
  + 全局: app 的 directive 方法
```html
<!-- 用在组件上, 会穿透至 组件的根节点, 多根节点不推荐 -->
<template>
  <div v-focus> </div>
</template>

<script setup>
// 在 setup 中, 以 v 开头的驼峰变量都可以被用作 自定义指令
// 在模板中启用 v-focus
// 直接赋予函数, 默认在 mounted 和 updated 上实现
const vFocus = {
  mounted: (el) => el.focus()

  // 在绑定元素的 attribute 前
  // binding 为传递的参数, modifier 等
  // 或事件监听器应用前调用
  created(el, binding, vNode, prevVMode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vNode, prevVNode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vNode, prevVNode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vNode, prevVNode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vNode, prevVNode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vNode, prevVNode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vNode, prevVNode) {}
}

// 全局注册
app.directive('focus', {
  /* ... */
})
</script>
```

+ 选项式
```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```

## v-bind

+ abbr: `:`
+ effect
  + 绑定属性
  + `<img v-bind:src="imgUrl" />`
  + `<a :href="imgUrl" />`

+ dynamic attribute
  + `< :[name]="value" />`
+ binding attribute = react < ...Obj />
  + '< v-bind="obj" />'
  + '< :="obj" />'

+ binding class
+ one: object grammar
  + `< :class="{active: true, ...}" />`
  + 默认的 class 会与 动态的 :class 结合

+ two: binding value, 绑定的变量也可以是 obj
  + `< :class="value / value()" />`

+ three: Array
  + `< :class="['abc', color, obj]" />`


+ binding style
  + `< :style="{color: 'red', fontSize: size + 'px'}" />`
  + 同样可以用数组

## v-on

+ abbr: `@`
+ value: Function | Inline Statement | Object
+ parameter: event
+ modifier: [修饰符](https://staging-cn.vuejs.org/api/built-in-directives.html#v-on)
+ < @[event].modifier="value" />

+ for example
  + bind: < v-on:click="handleClick" />
  + abbr: < @click="handleClick" />
  + bind expression: < @click="count++" />
  + bind obj: < @="{click: add, ...}" />

+ 传参 - 事件的 event 参数需要加 $ 符号
  + < @click="handleClick($event, any, ...)" />

+ modifier
  + 按下回车触发: < @keydown.enter="handleEnter" />

## v-for

+ 循环渲染
+ `< v-for="(item, index) in/of Array" />` 小括号可以不要
+ 用于解构: `< v-for="{name, age} in ObjectArray" />
+ 遍历对象: `< v-for="(value, key, index) in Obj" />`
+ 范围值: 1 ~ 10 : `< v-for="n in 10" />
+ 通过 key 来 diff: < :key="item.id" />
+ 对象遍历顺序: Object.keys()
```html
<div v-for="item in 20">
  <div :key="item">{{item}}</div>
</div>
```

## v-model

+ 进行数据的双向绑定, 各种表单组件都可以自适应的进行绑定
+ `<input v-model="value" />` - 相当于是自己绑定修改事件的语法糖
+ 加上 value 可以取到想要取的值, 用于 选框/下拉选择
+ 复选框绑定 Array 需要在标签上加 value
+ 单选框绑定同一个 数据时 会自动设置 name, 分为同一组
+ 选择框, multiple 可以多选

+ [修饰符](https://staging-cn.vuejs.org/guide/essentials/forms.html#modifiers)


## v-if

+ 条件渲染
+ v-else, v-else-if
+ 只有条件为 true 才渲染, 不渲染的时候直接销毁
```html
< v-if="score > 90">优秀</>
< v-else-if="score >= 60">良好</>
< v-else="score < 60">fail</>
```

## v-show

+ 是否展示
+ 为 false 相当于 css: display: none
+ 不支持 template
+ `< v-show="true" />`
+ 一般频繁切换 显示隐藏状态使用 show, 节约性能
+ 因为 if 隐藏会直接销毁, 显示在插入到 html 中, 频繁切换消耗性能

## v-memo

+ 值: `any[]`
+ 缓存一个模板的子树。
+ 如绑定的值不变, 则子组件跳过渲染

## seldom used

### v-once

+ 只渲染一次, 数据改变也不会重新渲染, 包括子组件
+ `< v-once />`

### v-pre

+ 不解析 绑值语法
+ `< v-pre />`

### v-html

+ vue 默认不会渲染 html 代码
+ 用于渲染 html 代码
+ `< v-html='htmlCode'/>`

### v-text

+ identical to Mustache
+ `< v-text='message'/>` = `<>{{message}}</>`

### v-cloak

+ 用于搭配 css 隐藏可能在 vue 解析完成前 显示模板
+ 解析完成后会被 vue 删掉

# component

+ 全局注册
  + `Vue.createApp().component('ComponentName', Option)`
  + 可以在任何的模板中使用
  + 即时不使用也会被打包
+ 局部注册
  + 通过 components 属性注册
```js
const Head = {
  template:'',
  // data ...
}
// Option
{
  components:{
    Head // 注册 Head 组件
  }
}

```

## slot

+ 插槽 identical React Children
```js
< />
// 预留插槽, 不带 name 的, 默认为 default
<slot>
  <当没有传入元素时: 默认元素 />
</slot>
< />

// 具名插槽, 在组件中传入多个元素时, 渲染自定的元素
<slot name='left' />
<slot name='right' />
<template v-slot:left> ... </template>
// 缩写
<template #right> ... </template>
// 动态绑定
<template v-slot:[DynamicName]> ... </template>

// 作用域插槽
<slot name='hh' :item='item' :index='index' />

// 在父组件中, 使用插槽中的变量
// 默认可以直接写在组件 in Attributes, 不用 template
// 默认 与 具名 混合得使用 template 单独指定
<template #hh='slotProps'>
  {{slotProps.item}}
</template>

```

## dynamic

+ 动态组件
```js
// 大小写不敏感, 且驼峰可转化为 下划线_ 连接
// 传参方式不变
<component is="home" />
<component :is="home" /> // 绑定变量 动态渲染

// is 会通过 value 去寻找 components 中注册的组件, render
// 也可以寻找到 全局注册的组件

const App = {
  components:{
    home
  }
}

```

## keep alive

+ 保持组件活动, 不卸载 - 保存组件状态
+ 内置组件 `keep-alive`, 匹配组件的 name 属性
  + `include: string | RegExp | Array` - 缓存指定组件
    + `string: 'a,b' `
    + `RegExp: /a,b/ `
    + `Array: [a,b] `
  + `exclude: string | RegExp | Array` - 排除指定组件
  + `max: number | string` - 缓存最大组件值
+ 缓存的组件不会触发某些生命周期函数
  + created, mounted
```js
<keep-alive include='app'>
  // component
</keep-alive>

const App = {
  name: 'app'
}
```

## async

+ 异步组件, 相当于懒加载 lazy
+ ` import { defineAsyncComponent } from 'vue'`
+ 该函数接收一个 返回 promise 对象 的 加载函数
+ 除了传入对象处理外, 也可以同 React 一样搭配 Suspense 使用
+ Suspense 具有两个插槽 default, fallback
  + 两个插槽都只允许一个子节点
  + default - 异步组件
  + fallback - default 无法显示时 进行展示, 相当于加载中

```js
import { Suspense } from 'vue'
// 一般使用
const Home = defineAsyncComponent(()=> import('./Home'))

<Suspense>

</Suspense>


// 传入对象
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,

  onError?: (
    error: Error,
    retry: () => void,
    fail: () => void,
    attempts: number
  ) => any
})

// 全局注册
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))

// 局部注册
export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
```

## 组件的 v-model

```js
// 默认绑定组件中的 modelValue
<MyInput v-model='data' />
// 传多个  v-model, 以及自定义 name
<MyInput v-model='data' v-model:title='title' />
// 相当于
<MyInput 
  v-model='data' 
  @update:model-value='message = $event' />

// 组件模板
// 方式一 原生方式
<input :value='modelValue' @input='input' />
// 方式二 搭配 computed
<input v-model='value' />

const MyInput =  {
  props:{
    modelValue: String,
    title: String
  },
  emits: ['update:modelValue', 'update:title'],
  computed: {
    value:{
      set(value){ // 通过 v-model 触发
        this.$emit('update:modelValue', value)
      },
      get(){
        return this.modelValue
      }
    }
  },
  methods: {
    input(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}

```

## transition

+ 同时使用时: 通过 type 属性决定监听 transition / animation
+ `:duration='1000'` 显示的指定动画执行时间
  + `:duration='{enter:1000, leave:1000}'`
+ `mode='in-out/out-in'` - 移除后在加载元素/反之
  + 一般使用在 if-else/component 切换元素时, out-in 更常用
+ `appear` - 首次呈现也使用动画
+ 动画库: `animate.css` 通过js `gasp`
```js
// 不赋值 name 默认为 v , v-enter-from
// type='transition' 以 transition 动画结束时间为准
<transition name='animation' type='transition'>
  // component
  // 组件需要使用 条件渲染 / 动态组件 / 组件根节点
  // 组件在 插入/删除 时触发 class 的添加删除
</transition>
// @ 为 js 钩子, 在对应的动画执行阶段执行
<transition enter-active-class='ClassName'
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
  :css="false" // 防止 css 影响 js 动画的执行
>
</transition>


// name-enter-from
// name-enter-to
// name-leave-to
// name-leave-from
// name-enter-active: 过渡 和 animation 都添加在这
// name-leave-active
<style>
  // 动画
  .animation-enter-from,
  .animation-leave-to,{

  }
</style>
```

## transition-group

+ 没有 mode
+ 需要 key
+ 通过 tag='p', 用 p 元素包裹子元素, 默认无
```js
<transition-group name='name' tag='p'>

</transition-group>

// v-move 位移动画
// 未移除前 元素会占位置, 所以需要在 leave-active 中移除元素占位
// 通过 absolute 让元素不占位, 动画才能顺利运行

<style>
.name-move{
  transition: transform .2s ease-out;
}
</style>

```

## Teleport

+ 类似于 react 中的 createPortal
+ 用于将元素渲染到指定的 DOM 元素中
  + to: 参数为 CSS 选择器, 指定渲染目标位置, 不指定则不显示
  + disabled : 禁用组件功能, 变为行内元素
```html
<teleport to='cssSelect'>
  <!-- 元素 / 组件 -->
</teleport>
```

# composition API

+ 类似于 React 函数组件与 hooks
+ 相对于 Options API 更加的灵活, 且逻辑紧密, 关注点集中
  + 可以将功能相同的代码逻辑写在一起, 便于阅读
  + 代码抽离, 通过 hooks 封装相关的代码逻辑, 命名同 react useX
+ setup 中没有 this 对象
  + 模板中使用 $slots 和 $ attrs 访问对应属性
  + 代码中使用 useSlots 和 useAttrs

```js
// 通过 setup 启用 composition API
// setup 实际上是一个函数, 相当于 React 函数组件
// 便捷用法 直接通过 script 的 setup 属性启用
<script setup>
import {  } from "vue"
// 内部所有的变量, 模板中都可以访问

</script>
// setup 函数的 参数 与 返回值

// 原生方式
export default {
  props:{ /* 可以定义类型 */ },
  components:{ /* 注册组件 */ },
  /** parameter
   * props: Object
   * context: { 
   *  attrs: 非 props 的属性
   *  slots: 插槽
   *  emit: 访问 this.$emit
   * }
   */
  setup(props, context){
    return {
      // 返回的对象 可以在 template 中访问
    }
  }
}
```

## reactive

+ 响应式数据 = data
  + setup 中返回的 数据不是响应式不会触发更新
  + 与 react 的 useState 不同, 只能传入 对象/数组
  + 因为普通数据类型 无法使用 proxy 进行代理
```js
import { reactive } from "vue"

// 在 setup 中通过 reactive 实现响应式
const state = reactive({ count: 0 })
```

## Ref

+ 返回一个可变的 响应式对象, identical react userRef
```js
import { ref } from "vue"

// counter 变为响应式的引用对象, 保存的值储存在 value 属性中
const counter = ref(100)
// counter.value - 100

// 通过 ref 获取 dom 元素, 方式类似于 useRef
const dom = ref(null)

// 模板中使用会自动解包, 不需要写 counter.value
<h2 ref='dom' >{{counter}}</h2>
```

## computed

+ 缓存复杂计算, 内部响应式数据改变, 才会重新计算
  + 函数式: 只读
  + 对象式: 读写
```js
import { computed } from "vue";
// computed's parameter: Function | {get;set;}
// return: ref Object
const val = computed(()=> value)
const val = computed({
  get(){
    return value
  },
  set(newValue){
  }
})
```

## watch & watchEffect

+ watchEffect: 自动收集 响应式数据依赖
  + 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
  + 无法拿到 原来的值
+ watch: 手动指定 侦听的数据源
  + 默认是惰性的, 只有数据源变化时才执行
  + 可以拿到 原来的旧值
```js
import { watch, watchEffect } from "vue";

const data = ref(1)

// 调用 stopHandle 可以停止 侦听
const stopHandle = watchEffect( onCleanup =>{
  // onCleanup 是一个函数, 会在侦听数据下次改变时调用
  // 接受一个函数, 一般用于取消请求, 清除副作用
  // 组件被销毁 同样会被调用

  const { response, cancel } = doAsyncWork(data.value)
  // cancel 就是一个取消请求的函数
  onCleanup(cancel)
},{
  // pre : 提前执行
  // sync : 强制同步执行, 基本不用
  // post : 组件挂载后执行
  flush: 'pre' | 'post' | 'sync',
  onTrack(e) { // 将在响应属性或引用作为依赖项被跟踪时被调用
    debugger
  },
  onTrigger(e) { // 将在侦听器回调被依赖项的变更触发时被调用
    debugger
  }
})

// 默认是惰性的
/**
 * sources: 侦听源, 一般用 ref
      getter 函数, 返回一个值: ()=> state.count
      一个 ref, 函数内可以直接拿到值, 而不是 ref 对象
      一个响应式对象
      ...或是由以上类型的值组成的数组
 * callback: 回调
 * options: 包含 watchEffect 中的选项
 */
const info = reactive({name: '', age: 18})

const stopHandle = watch(info,
  (value, oldValue, onCleanup)=>{},
{
  immediate: false, // ：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined
  deep: false, //如果源是对象，强制深度遍历，以便在深层级变更时触发回调。
})

```

## Provide & inject

+ 提供数据可以用 readonly 保持数据的单向性, 防止子组件修改数据
```js
import { provide, inject } from 'vue'

// 提供数据
provide('name', name)

// 取出数据
const data = inject('name')
const data = inject('name', 'default') // 默认值
// 表明默认值是函数, 需要提供第三个参数
const fn = inject('function', ()=>{}, false)

```

## defineProps 和 defineEmits

+ 使用 defineProps 和 defineEmits API
+ 在声明 props 和 emits 选项时获得完整的类型推导支持
+ 不需要进行导入, 会在编译阶段删除

```ts
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])

const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

## 生命周期

```js
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated
  } from 'vue'


onMounted(()=>{
  // code
})
```

+ onErrorCaptured(), 错误捕获
  + 组件渲染
  + 事件处理器
  + 生命周期钩子
  + setup() 函数
  + 侦听器
  + 自定义指令钩子
  + 过渡钩子
+ 这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。

## readonly

+ 返回原生对象的只读代理, 通过 proxy
```js
import { readonly } from "vue";

// 同样可以使 响应式对象 变为只读
const info = readonly({...obj})
```

# API

## $refs & $parent & $root & $el

+ 与 React 的 ref analogy
+ 主要用于获取 DOM 元素
+ $parent 在子组件中获取 父组件
+ $root 获取跟组件
+ $el 获取组件跟元素
```js
// 注册 ref, 绑定元素, 如果是组件, 则为组件实例
<div ref='name'></div>

// 组件实例中的 $refs: Object 属性
// 包含所有注册过 ref attribute 的 Dom 元素和组件实例
this.$refs.name
```

## unref

```js
const val = unref(val)
// = val = isRef(val) ? ref.value : val
```

## is

+ isProxy
  + 判断对象是否由 reactive 或 readonly 创建

+isReactive
  + 被 readonly 包裹的 reactive 也会返回 true

+ isReadonly
+ isRef

## to

+ toRaw
  + 返回 Reactive 或 readonly 代理的原始对象

+ toRef
  + 基于响应式对象上的一个属性，创建一个对应的 ref
```js
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2
// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

+ toRefs
  + 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。
  + 每个单独的 ref 都是使用 toRef() 创建的。
```js
// 直接进行解构会创建新的变量, 无法进行响应式
const state = reactive({
  foo: 1,
  bar: 2
})
// 这样可以进行解构使用 响应式数据
const { foo, bar } = toRefs(state);
```

## Shallow

+ ShallowReactive
  + 浅层的 Reactive 对象, 不检测对象中的对象
+ ShallowReadonly
+ ShallowRef
+ triggerRef
  + 强制触发依赖于一个浅层 ref 的副作用, 手动触发响应式

## customRef

+ 用于自定义 ref

## Plugin

+ 插件是一个对象, 必须包含一个 install 函数
+ 也可以是一个函数
```js
const plugin = {
  install(app){
    // globalProperties 是一个对象
    // 属性一般以 $ 开头
    app.config.globalProperties.$name = "config"
    // 全局的组件属性, 所有的组件都可以访问

    // setup 中通过 getCurrentInstance().appContext 获取
  }
}
const p = app => { }

app.use(plugin)
app.use(p)
```

## render 函数

+ h() 函数, 用于创建 VNode, = React.createElement
+ render 函数返回 h 函数 / JSX
  + 不支持 JSX 就需要使用 `@vue/babel-plugin-jsx`
+ h 函数参数
  + `{string, Object, Function}` Tag - 标签名/(函数式)组件
  + `{Object | null}` props = attribute, prop, 对应事件
  + `{String | Array | Object}` children 子元素
```js
import { h } from 'vue'

export default {
  render(){

    return h('h2', {}, 'Hello World')
  }
  // 或
  setup(){

    return () => h(Home, {}, 'Hello World')
    return () => (
      <div>
        <h2>Hello World</h2>
      </div>
    )
  }
}

```

# correspondence

## Props & Attribute

+ 传参 `props: Object | Array[string]`
  + class 会自动传递到组件的根节点上
  + 禁止继承, Object: `inheritAttrs: false`
  + 多个根节点, 需要显示绑定
+ 非 Poops 属性
  + 使用: `< :custom="$attr.data" />` 
```js
<Component title='Hello' description='World!' />
<Component :="Object" />

const Component = {
  props: ['title', 'description'],
  props: {
    title: String,
    description: {
      type: number,
      required: false,
      default: 0,
      // 默认为对象, 需要写成 函数返回对象
      // 因为多次使用组件时 都会指向同一个对象
    }
  }
}
```

## 子组件向上传递

```js
// 子组件
const child = {
  // 注册方法
  emits: ['add', 'subscription'],
  // 对象写法, 验证参数, 不通过会有警告, 但依旧会传递成功
  emits: {
    add: payload =>{
      return true // 验证通过
    }
  },
  methods: {
    increment(){
      this.emit('add') // 触发事件
      this.emit('add', obj) // 传递参数
    }
  }
}

// 父组件
// 监听子组件中事件的触发
<child @add='add' />
<child @add='add' />
const parent = {
  methods: {
    add(num){ // 接收参数
      // code...
    }
  }
}

```

## Provide & inject

+ amount to React context
```js
import { computed } from 'vue'

const parent = {
  provide: {
    // data
    name: 'Nice',
    age: 18
  },
  provide(){
    // 获取数据后在绑定
    return {
      // data 中的数据更新, 但是提供的数据不会更新
      ...this.data,

      // 响应式数据, 获得最新的 data
      data: computed(()=> this.data)
    }
  }
}

const child = {
  // 使用 {{name}}
  inject: ['name', 'age'],
  inject:{ // 对象写法
    MyName:{
      form: 'name', // 数据来源
      default: 'Hello' // 默认
      default: ()=> ({name: 'World'}) // 复杂默认数据
    }
  }
}

```

## astride component


# 生命周期

```js
// Options
{
  beforeCreated(){ },
  created(){ },
  beforeMount(){ },
  mounted(){ },
  beforeUpdate(){ },
  updated(){ },
  beforeUnmount(){ },
  unmount(){ }
}

// in keep-alive
{
  activated(){ /* 激活时 */ },
  deactivated(){ /* 取消激活时 */ }
}
```

# hooks

+ 可用于代码抽离, 逻辑代码关注点分离, 降低代码耦合性
+ 命名规则: useX

## 自定义 hook

```js
import {
  ref,
  watch,
} from 'vue'

function useTitle(title) {
  const titleRef = ref(title)

  watch(titleRef, newTitle => {
    document.title = newTitle
  }, { immediate: true })

  return titleRef
}

function useScrollPosition(target = document) {
  const scrollX = ref(0)
  const scrollY = ref(0)

  target.addEventListener('scroll', () => {
    scrollX.value = Window.scrollX;
    scrollY.value = Window.scrollY;
  })

  return {
    scrollX,
    scrollY
  }
}

function useMousePosition(target = Window) {
  const mouseX = ref(0)
  const mouseY = ref(0)

  window.addEventListener('mousemove', e => {
    mouseX = e.pageX
    mouseY = e.pageY
  })

  return {
    mouseX,
    mouseY
  }
}
```

# build Vue

+ 直接 引入 `vue.js` 使用， 打包
  + 需要使用特定的 vue 版本才能解析 template
+ 通过 `.vue` 文件编写， 使用 bundler 进行编译
  + webpack - vue-loader - @vue/compiler-sfc
  + 需要搭配 vue-loader 中的 plugin 使用
+ 通过 render 返回， 不需要额外的解析

## Webpack

```js
const VueLoaderPlugin = require('vue-loader/dist/index')


module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  plugins: {
    new VueLoaderPlugin()
  }
}
```

# empty