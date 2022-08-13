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

# Options

## template

+ html 模板
+ parameter: htmlString | '#id'

+ 写法一
```html
<!-- template: '#vue', -->
<script type="x-template" id="vue">
  <h2> {{counter}} </h3>
</script>
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
  + {[key:String]: Function}
  + {[key:String]: {get; set;}}
+ 拥有缓存, 减少性能消耗, 相当于 useMemo(callback)
+ 更新机制
  + 只有 data 中 被使用的响应式数据发 生改变才会更新对应的 计算属性
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

# template grammar

+ Mustache grammar - bind value
  + `{{value}}` or `{{expression}}`

+ template tag 可以当 react 中的空标签 `<></>` 使用, 不会被渲染
  + <React.Fragment></React.Fragment>

## instructions

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

# empty