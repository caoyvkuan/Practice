# Vue-Route

+ 简单实用 `npm install vue-router@4`
```js
// 路由链接
<router-link to='/'>Home</router-link>

// 组件渲染, 渲染对应路由的组件
<router-view />

// 使用动画效果和缓存
<router-view #='{component}'>
  <transform>
    <keep-alive>
      <component is='component' />
    </keep-alive>
  </transform>
</router-view>



// 定义路由
const routes = [
  { path: '/', redirect: '/home'}, // 重定向
  { 
    path: '/Home',
    name: 'Home', // 路由别名, 可以通过别名进行路由跳转
    component: Home,
    mete: {}, // 可以配置一些信息, 自定义数据
    children:[ // 子路由嵌套
      { 
        path: 'profile',
        component: UserProfile,
      }
    ]
  },
  { path: '/about', component: About },
]

// 创建路由
const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // 传递路由配置
})

// 注册路由, 组件中通过 this.$route 可以访问当前路由
app.use(router)
// setup 中使用 useRouter 访问
```

## router-link

+ 属性
+ to: String | Object
+ replace: 改变默认的 push 模式
+ active-class: 设置激活后元素应用的 class
  + 默认为: router-link-active
+ exact-active-class: 精准匹配激活, 同样有默认
  + route-exact-active-class
  + 精准匹配: 如多级路由时, 精准到当前层级的路由按钮
  + 而 active-class 多级会同时生效
+ 插槽: 用于将 link 渲染为其他元素
+ custom : 取消外层 a 元素, 进行自定义, 没有默认的跳转功能
  + 可以通过 props 中的 navigate 导航函数进行跳转

+ 传参
+ `/user:id` - `/user/IDParameter`
  + 传递的参数通过 `$route.params` 访问
  + 正则: `/:pathMatch(.*)*`
```js
// 字符串模式 - 基础传参
<router-link to='/user:name/id/:id'>Home</router-link>

// 插槽
/**
 * props:{
 *  href: 跳转链接
 *  route: 路由对象
 *  navigate: 导航跳转函数
 *  isActive: 是否处于激活状态
 * }
 */
<router-link to='...' v-slot='props'>
  Home{{props.href}}
</router-link>

import { useRoute } from 'vue-router'
// setup 中获取 $route
const route = useRoute()
```

## 路由配置

+ 路由匹配规则默认不区分大小写, 并且能匹配 有无尾部 '/' 的路由
  + 可以通过 strict 和 sensitive 来修改默认规则
  + strict : 应用于全局
  + sensitive : 应用于局部
```js
const router = createRouter({
  routes: [
    { path: '/', redirect: '/home'}, // 重定向
    { 
      path: '/Home',
      name: 'Home', // 路由别名, 可以通过别名进行路由跳转
      component: Home,
      mete: {}, // 可以配置一些信息, 自定义数据
      // 路由守卫
      beforeEnter: (to, from) => {
      // reject the navigation
      return false
      },
      children:[ // 子路由嵌套
        { 
          // 一般使用 path='' 进行重定向, 重定向时, 路由不能省略路劲
          path: 'profile', // 子路由不需要 /, / 会被视为根路劲, 可以实现组件嵌套
          component: UserProfile,
        }
      ]
    },
    { // pathMatch(正则) 正则匹配, pathMatch名字没有影响
      path: '/:pathMatch(.*)',
      // */+ 重复匹配, 参数形成数组, 而不是字符串
      path: '/:Nice*',
      // ? 可选参数
      path: '/:id(\\d+)?',
      // 局部严格匹配
      sensitive: true,
      component: NotFound // (.*) 可以用于匹配渲染 404 页面
    },
  ],
  strict: true
})
```

## 编程式导航

+ `this.$router.push`
+ `import { useRouter } from 'vue-router'`
```js
// 字符串路径
router.push('/users/eduardo')

/**
 * 提供 path 时将忽略 params
 * 需要使用参数, 可以用 命名路由, 或在 path 中绑定变量
 */
router.push({ 
  path: '/users/eduardo', // 路径
  name:'name', // 命名路由
  params: { username: 'eduardo' }, // 参数
  query: { plan: 'private' }, // query 参数 - ?name=value
  hash: '#team', // 带 hash
})

router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })

// 与 history API 相同
router.go(1) = router.forward()
router.go(-1) = router.back()

```

## 路由懒加载

```js

const Home = () => import(/* webpackChunkName:'Home'*/'./Home')

const router = createRouter({
  routes: [
    { path: '/Home', component: Home },
    { path: '/About', component: () => import('./About') }
  ]
})
```

## 命名视图

+ 相同的路径, 渲染多个不同的视图
```js
const routes = [
  {
    path: '/',
    components: {
      default: Home, // 不带 name 属性的渲染 默认组件
      // 与 `<router-view>` 上的 `name` 属性匹配
      LeftSidebar: LeftSidebar,
      RightSidebar,
    },
  }
]

<router-view name="LeftSidebar"></router-view>
<router-view></router-view>
<router-view name="RightSidebar"></router-view>
```

## 动态路由

+ 根据用户权限动态生成路由, 防止无权限用户访问特定页面

```js
// 动态添加顶级路由对象
router.addRoute({
  path:'/',
  component: () => import('./Home')
})

// 动态添加二级路由对象
router.addRoute('路由的name属性', {
  // route 对象
})

// 动态删除路由
// 方式一: 添加一个 name 相同的路由进行覆盖
// 方式二: 通过 removeRoute
router.removeRoute('name')
// 方式三: 通过返回函数删除
const removeRoute = router.addRoute('name')
removeRoute()

// 检查路由是否存在
router.hasRoute('name')
// 获取一个包含所有路由记录的数组
router.getRoutes()
```

## 路由导航守卫

+ 通过跳转或取消的方式来防止不必要的导航跳转
+ beforeEach : 全局前置守卫
+ beforeResolve : 全局解析守卫 与 beforeEach 类似
+ afterEach : 全局后置钩子
+ beforeEnter : 路由独享守卫, 需要配置在路由对象上
+ 组件内的守卫
  + beforeRouteEnter |
  + beforeRouteUpdate | onBeforeRouteUpdate
  + beforeRouteLeave | onBeforeRouteLeave
```js
// 注册导航守卫
/**
 * to : 跳转目标 Route 对象
 * from : 当前 Route 对象
 * 返回值 : 控制如何进行导航
 */
router.beforeEach((to, from)=>{

  // 返回 undefined 进行默认导航
  return false // 取消跳转
  // 返回 路径字符串, 跳转到返回的路径字符串
  // 返回 对象 与 router.push 类似
})
```

# VueX

+ 状态管理
+ useStore 获取 store 对象
+ setup 中 state 都需要使用 computed 包裹, 以实现响应
```js
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return { // 通过 `$store.state.counter` 访问数据
      counter: 100
    }
  },
  // 通过 $store.commit('increment') 分发任务执行事件
  // 相当于 dispatch(type)
  // 
  mutations:{ // 相当于 reducer
    increment(state){
      state.counter++
    }
  }
})

// 使用
app.use(store)


// setup 中使用 state

import { useStore, mapState } from 'vuex'
import { computed } from 'vue'

const store = useStore()
// 原本的写法, 一个个的写
const counter = computed(()=> store.state.counter)

// 封装写法
const state = (mapper=>{
  const obj = {}

  const StateObj = mapState(mapper)

  for(let [key, fn] of Object.entries(StateObj)){
    obj[key] = computed(fn.bind({$store: store}))
  }
  
  return obj
})(['name', 'counter'])

```

+ 辅助函数, 混入 computed
```js
import { mapState } from 'vuex'

// mapState 返回一个对象
computed: mapState({
  // 箭头函数可使代码更简练
  count: state => state.count,

  // 传字符串参数 'count' 等同于 `state => state.count`
  countAlias: 'count',

  // 为了能够使用 `this` 获取局部状态，必须使用常规函数
  countPlusLocalState (state) {
    return state.count + this.localCount
  }
})
```

## Mutation

+ 相当于 Reducer 用于修改 store
  + 需要注意的是, 虽然不推荐直接修改 store, 但是这是可行的
  + 只能用于同步操作, 异步需要使用 action
+ `store.commit('increment', parameter)` : 进行 dispatch
  + 也可以使用对象进行传递, 类似 redux 的 action
+ 使用常量代替事件名是非常推荐了, 可以避免一些输入的错误
+ 辅助函数: mapMutations 可以将方法映射到 methods 中
```js
const store = createStore({
  mutations: {
    // payload 对应传递的参数, 一般使用对象进行传递
    increment (state, payload) {
      // 变更状态
      state.count++
    }
  }
})
// 参数为对象
store.commit('increment', {
  amount: 10
})
// 直接提交对象
store.commit({
  type: 'increment',
  amount: 10
})
```

## Action

+ 不同于 Redux 中的 action 分发对象
+ Action 用于提交 mutation , 所以可以用于异步操作
+ Action 通过 `store.dispatch` 方法触发
+ dispatch 分发方式与 commit 相同
  + dispatch 可以处理 被触发的 action 返回的 promise 对象
  + dispatch 的返回值就是 action 返回的 promise 对象
+ 通过 mapActions 可以映射至 methods 中
```js
actions: {
  // context = store
  increment (context, payload) {
    context.commit('increment')
    return new Promise((resolve, reject) =>{

    });
  }
}
```

## Getter

+ store 的 getter
  + store.getters 访问对象
  + mapGetters 辅助函数, 映射 getter 到 computed 中
```js
const store = createStore({
  state: {
    todo: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodo (state, getters) {
      return state.todo.filter(todo => todo.done)
    }
  }
})
```

## module

+ 对 store 进行分割, 防止过于臃肿
+ 模块内部的 getter，根节点状态会作为第三个参数暴露出来
+ 除了 state 其他默认命名都为全局, 相同命名会全部触发
```js
const moduleA = {
  namespaced: true, // 默认不开启, 使命名空间独立
  // store.getters['ModuleName/attribute']
  // commit 和 dispatch 同样需要指定命名空间

  // 这里都是局部的, context.rootState 访问根部状态
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = { ... }

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
```

# Pinia

+ 基本使用
```js
import { defineStore } from 'pinia'

// 第一个参数为 唯一 ID
// 使用 use 命名是因为 defineStore 返回一个函数
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    },
  },
})

import { createPinia } from 'pinia'

app.use(createPinia())

// setup 中使用
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

// 修改方式
counter.count++
// 带自动补全 ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()

// 函数写法
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

## Store

+ defineStore 用于定义 Store
+ store 是一个用 reactive 包裹的对象
  + 所以不能使用解构
```js
import { defineStore, storeToRefs } from 'pinia'
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // other options...
})

// 使用
const store = useStore()

// 通过 storeToRefs 保持响应式
const { name, doubleCount } = storeToRefs(store)
```

## State

+ state 会自动推断类型
```js
const useStore = defineStore('storeId', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})

// 访问 state
const store = useStore()
store.counter++

// 重置状态
store.$reset()

// 改变多个状态 $patch
store.$patch({
  counter: store.counter + 1,
  name: 'album',
})
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})

// 替换整个 state
store.$state = { counter: 666, name: '^_^' }
```

## getters

+ getters 可以用过 this 访问 store
+ 相当于计算属性
+ 通过返回一个函数, 可以进行参数的传递
  + 但是这样会失去缓存的特性
```js
export const useStore = defineStore('main', {
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  // 访问其他 Store 
  otherGetter(state) {
    const otherStore = useOtherStore()
    return state.localData + otherStore.data
  },
})

// 访问
const store = useStore()
store.doubleCount
```

## Actions

+ 使用 defineStore() 中的 actions 属性定义
+ 操作可以通过 this 访问
+ 可以进行异步操作
+ 同样通过 store 直接调用
```js
export const useStore = defineStore('main', {
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})

// 订阅 action
const unsubscribe = someStore.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after((result) => {})

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError((error) => {})
  }
)

// 手动移除订阅
unsubscribe()
```

## plugins

```js
import { createPinia } from 'pinia'

// 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
// 这可能在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将插件提供给 pinia
pinia.use(SecretPiniaPlugin)

```