# Vite

+ `npm i Vite -D`
+ `npx vite` 启动

```sh
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

+ Vite 速度快的原因
  + 会对 node_modules 中的包进行预打包

## 环境变量

+ 加载的环境变量也会通过 import.meta.env 暴露给客户端源码
+ 运行时会自动加载对应的环境变量
```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

mode 一般为: production | development | test

// 为了防止泄露, 只有前缀为 VITE_ 的变量才会暴露给经过 VITE 处理过的代码
DB_PASSWORD=foobar // 不会暴露
VITE_SOME_KEY=123 // import.meta.env.VITE_SOME_KEY

// envPrefix 自定义前缀, 不能为空字符串
// defineConfig 中
{
   // 默认为 root 根目录, 可以是绝对路径, 也可以是相对路径
   envDir: '加载 env 文件的目录'
   // 默认为 VITE_
   envPrefix: 'NY_'
}
```

## 额外设置

+ 客户端类型支持, 如 svg
```ts
// d.ts 中
/// <reference types="vite/client" />

// 或 tsconfig 中
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

## Vue

```ts
// 类型声明
declare module '*.vue' {
   import type { DefineComponent } from 'vue'
   const component: DefineComponent<{}, {}, any>
   export default component
}
```

# 开发环境

+ css 重置: `npm install normalize.css`

## 环境变量
+ 区分环境变量
  + 开发环境: development
  + 生产环境: production
  + 测试环境: test

+ 三种方式
  + 手动修改, 麻烦且容易出错
  + 环境变量: process.env.NODE_ENV
```js
// 环境变量方式, 通过环境变量进行动态配置
let BASE_URL = ''
let BASE_NAME = ''
switch (process.env.NODE_ENV) {
   case 'production':
      BASE_URL = '...'
      BASE_NAME = '...'
      break;
   default:
      break;
}
```

+ 第三种: 编写不同的配置文件 通过 process.env 进行访问
  + .env | .env.production | .env.development 不同环境不同文件
  + 通过插件注入 变量
  + webpack 环境
+ VUE
    + 注入变量名固定 BASE_URL | NODE_ENV | VUE_APP_NAME...
    + `VUE_APP_URL=http://niceyuan.com` 直接通过变量名取值
+ React
  + 变量名 PUBLIC_URL | NODE_ENV | REACT_APP_NAME...

# 项目配置

## .editorconfig

+ 项目编码规范, 使不同编辑器使用统一的编码风格
+ vscode 需要安装插件 EditorConfig for VS Code
```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格 (tab | space)
indent_size = 3 # 缩进大小
end_of_line = crlf # 控制换行类型(lf [Unix] | cr [Mac] | crlf [Window])
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件使用一下规则
max_line_length = off
insert_final_newline = false
trim_trailing_whitespace = false
```

## prettier

+ 格式化 - `npm i prettier -D`
+ `.prettierrc` 文件
  + useTabs - 是否使用 tab 键
  + tabWidth - 空格数
  + printWidth - 每行代码的长度
  + singleQuote - 使用单引号, 还是双引号, true 为单引号
  + trailingComma - 多行输入的尾逗号是否添加
  + semi - 句尾是否要加分号, 默认为 true
  + arrowParens - 函数只有一个参数时是否用括号, 默认 always 总是需要, avoid 不需要
+ vscode 插件 - Prettier - Code formatter
+ 添加脚本, 格式化所有文件 `"prettier": "prettier --write ."`
```json
{
   "useTabs": false,
   "tabWidth": 3,
   "printWidth": 80,
   "singleQuote": true,
   "trailingComma": "none",
   "semi": false,
   "arrowParens": "avoid"
}
```

+ `.prettierignore` - 忽略文件, 放置不必要的格式化
```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

## ESlint

+ `.eslintrc.js`
```js
module.exports = {
   root: true,
   extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript/recommended',
      '@vue/eslint-config-prettier',
      'plugin:prettier/recommended' // 让 ESLint 使用 prettier 规范
   ],
   parserOptions: {
      ecmaVersion: 'latest'
   },
   rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off', // 取消组件多单词命名规则
      'arrow-parens': ['error', 'as-needed'], // 参数只有一个不用括号, always
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // 不禁止使用 any 类型
      '@typescript-eslint/ban-types': 'off' // 使用空对象作为类型
   }
}
```

+ 基本属性
```js

rules: {
    "规则名": [规则值, 规则配置]
}
规则值:
"off"或者0     //关闭检测规则
"warn"或者1    //打开并把打开的检测规则作为警告（不影响退出代码）
"error"或者2   //打开并把检测规则作为一个错误（退出代码触发时为1）

"no-alert": 0,//禁止使用alert confirm prompt
"no-array-constructor": 2,//禁止使用数组构造器
"no-bitwise": 0,//禁止使用按位运算符
"no-caller": 1,//禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2,//禁止给类赋值
"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
"no-console": 2,//禁止使用console
"no-const-assign": 2,//禁止修改const声明的变量
"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0,//禁止使用continue
"no-control-regex": 2,//禁止在正则表达式中使用控制字符
"no-debugger": 2,//禁止使用debugger
"no-delete-var": 2,//不能对var声明的变量使用delete操作符
"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2,//函数参数不能重复
"no-duplicate-case": 2,//switch中的case标签不能重复
"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
"no-empty": 2,//块语句中的内容不能为空
"no-empty-character-class": 2,//正则表达式中的[]内容不能为空
"no-empty-label": 2,//禁止使用空label
"no-eq-null": 2,//禁止对null使用==或!=运算符
"no-eval": 1,//禁止使用eval
"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
"no-extend-native": 2,//禁止扩展native对象
"no-extra-bind": 2,//禁止不必要的函数绑定
"no-extra-boolean-cast": 2,//禁止不必要的bool转换
"no-extra-parens": 2,//禁止非必要的括号
"no-extra-semi": 2,//禁止多余的冒号
"no-fallthrough": 1,//禁止switch穿透
"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
"no-func-assign": 2,//禁止重复的函数声明
"no-implicit-coercion": 1,//禁止隐式转换
"no-implied-eval": 2,//禁止使用隐式eval
"no-inline-comments": 0,//禁止行内备注
"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2,//禁止无效的正则表达式
"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,//不能有不规则的空格
"no-iterator": 2,//禁止使用__iterator__ 属性
"no-label-var": 2,//label名不能与var声明的变量名相同
"no-labels": 2,//禁止标签声明
"no-lone-blocks": 2,//禁止不必要的嵌套块
"no-lonely-if": 2,//禁止else语句内只有if语句
"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false],//声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
"linebreak-style": [0, "windows"],//换行风格
"no-multi-spaces": 1,//不能用多余的空格
"no-multi-str": 2,//字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
"no-native-reassign": 2,//不能重写native对象
"no-negated-in-lhs": 2,//in 操作符的左边不能有!
"no-nested-ternary": 0,//禁止使用嵌套的三目运算
"no-new": 1,//禁止在使用new构造一个实例后不赋值
"no-new-func": 1,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2,//禁止使用new require
"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2,//禁止使用八进制数字
"no-octal-escape": 2,//禁止使用八进制转义序列
"no-param-reassign": 2,//禁止给参数重新赋值
"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0,//禁止使用++，--
"no-process-env": 0,//禁止使用process.env
"no-process-exit": 0,//禁止使用process.exit()
"no-proto": 2,//禁止使用__proto__属性
"no-redeclare": 2,//禁止重复声明变量
"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
"no-return-assign": 1,//return 语句中不能有赋值表达式
"no-script-url": 0,//禁止使用javascript:void(0)
"no-self-compare": 2,//不能比较自身
"no-sequences": 0,//禁止使用逗号运算符
"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
"no-sync": 0,//nodejs 禁止同步方法
"no-ternary": 0,//禁止使用三目运算符
"no-trailing-spaces": 1,//一行结束后面不要有空格
"no-this-before-super": 0,//在调用super()之前不能使用this或super
"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
"no-undef": 1,//不能有未定义的变量
"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
"no-undefined": 2,//不能使用undefined
"no-unexpected-multiline": 2,//避免多行表达式
"no-underscore-dangle": 1,//标识符不能以_开头或结尾
"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2,//不能有无法执行的代码
"no-unused-expressions": 2,//禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"no-useless-call": 2,//禁止不必要的call和apply
"no-void": 2,//禁用void操作符
"no-var": 0,//禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
"no-with": 2,//禁用with
 
"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
"arrow-parens": 0,//箭头函数用小括号括起来
"arrow-spacing": 0,//=>的前/后括号
"accessor-pairs": 0,//在对象中使用getter/setter
"block-scoped-var": 0,//块语句中使用var
"brace-style": [1, "1tbs"],//大括号风格
"callback-return": 1,//避免多次调用回调什么的
"camelcase": 2,//强制驼峰法命名
"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
"comma-spacing": 0,//逗号前后的空格
"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
"complexity": [0, 11],//循环复杂度
"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
"consistent-return": 0,//return 后面是否允许省略
"consistent-this": [2, "that"],//this别名
"constructor-super": 0,//非派生类不能调用super，派生类必须调用super
"curly": [2, "all"],//必须使用 if(){} 中的{}
"default-case": 2,//switch语句最后必须有default
"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
"eol-last": 0,//文件以单一的换行符结束
"eqeqeq": 2,//必须使用全等
"func-names": 0,//函数表达式必须有名字
"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0,//生成器函数*的前后空格
"guard-for-in": 0,//for in循环要用if语句过滤
"handle-callback-err": 0,//nodejs 处理错误
"id-length": 0,//变量名长度
"indent": [2, 4],//缩进风格
"init-declarations": 0,//声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
"lines-around-comment": 0,//行前/行后备注
"max-depth": [0, 4],//嵌套块深度
"max-len": [0, 80, 4],//字符串最大长度
"max-nested-callbacks": [0, 2],//回调嵌套深度
"max-params": [0, 3],//函数最多只能有3个参数
"max-statements": [0, 10],//函数内最多有几个声明
"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2,//new时必须加小括号
"newline-after-var": 2,//变量声明后是否需要空一行
"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
"object-shorthand": 0,//强制对象字面量缩写语法
"one-var": 1,//连续声明
"operator-assignment": [0, "always"],//赋值运算符 += -=什么的
"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
"padded-blocks": 0,//块语句内行首行尾是否要空行
"prefer-const": 0,//首选const
"prefer-spread": 0,//首选展开运算
"prefer-reflect": 0,//首选Reflect的方法
"quotes": [1, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
"radix": 2,//parseInt必须指定第二个参数
"id-match": 0,//命名检测
"require-yield": 0,//生成器函数必须有yield
"semi": [2, "always"],//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"sort-vars": 0,//变量声明时排序
"space-after-keywords": [0, "always"],//关键字后面是否要空一格
"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"],//小括号里面要不要有空格
"space-infix-ops": 0,//中缀操作符周围要不要有空格
"space-return-throw-case": 2,//return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
"spaced-comment": 0,//注释风格要不要有空格什么的
"strict": 2,//使用严格模式
"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0,//jsdoc规则
"valid-typeof": 2,//必须使用合法的typeof的值
"vars-on-top": 2,//var必须放在作用域顶部
"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
"wrap-regex": 0,//正则表达式字面量用小括号包起来
"yoda": [2, "never"]//禁止尤达条件
```

## Husky

+ 可以拦截 git 命令, 在提交之前进行 ESLint 操作, 让代码提交时符合规范
+ `npx husky-init && npm install`
+ 在 `.husky` 文件夹中的 `pre-commit` 运行的脚本改为运行 ESLint, `npm lint`

## commitizen

+ [cz-git](https://cz-git.qbb.sh/zh/guide/)
  + pnpm install -g commitizen
  + pnpm install -D cz-git
+ 规范 git commit 提交信息
+ `npm i -D commitizen`
+ `npx commitizen init cz-conventional-changelog --save-dev --save-exact`

+ 使用 npx cz 进行提交, 而不是 git commit, 可以配置为 `"commit":"cz"` 脚本
+ 提交 type
  + feat : 新增特性
  + fix : 修复 bug
  + docs : 修改文档
  + style : 代码格式样式修改
  + refactor : 代码重构
  + perf : 改善性能
  + test : 测试
  + build : 变更项目构建或外部依赖
  + ci : 更改持续集成软件的配置文件
  + chore : 变更构建流程或辅助工具
  + revert : 代码回退
+ 表述影响范围
+ 描述
```js
// cz-git 配置
"config": {
   "commitizen": {
   "path": "node_modules/cz-git"
   }
}

// npx 自动配置失败, 则在 package.json 中添加
"config": {
   "commitizen": {
      "path": "node_modules/cz-conventional-changelog" | 
   }
}
```

## commitlint

+ 提交信息验证
+ `pnpm add -D @commitlint/config-conventional @commitlint/cli`
+ 创建 `commitlint.config.js` 配置文件
```js
export default {
   extends: ['@commitlint/config-conventional']
}
```
+ 使用 husky 生成 commit-msg 文件
+ `npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`

# Webpack

+ [文档](https://www.webpackjs.com/concepts/)

+ 静态模块打包器(module bundler)
+ 将所有的资源文件作为模块处理,根据模块的依赖关系进行静态的分析,打包生成静态资源(bundle)

+ 五个核心概念

+ Entry
  + 入口(Entry)指示 Webpack 以那个文件为入口开始打包,分析构建内部依赖图
  + 三种参数 : string, Array , object
  + string : 单入口, 打包成为一个 chunk ,输出一个 bundle
  + Array : 多入口, 最终只形成一个 chunk , 也只输出一个 bundle
    + 只有在 HMR 功能中让 html 热更新生效
  + object : 多入口, 几个入口文件就形成几个 chunk ,输出几个 bundle
    + 此时 chunk 的名称是 key , 同时也可以将多个文件打包成一个
    + `{react:['react','react-dom','react-router-dom']}`

+ Output
  + 输出(Output)指示 Webpack 打包后的资源 bundles 输出到哪里,以及如何命名
  + 对象 => 属性:
    + `filename : 'JS/[name].[hash:5].js'` -> 文件名称
    
    + `path : resolve(__dirname,'build')` -> 文件输出目录
    
    + `publicPath : '/'` -> 公共资源前缀
    
    + `chunkFilename : [name]_chunk.js` // 修改非入口 chunk 的名称
    
    + `library : '[name]'` => 整个库向外暴露的变量名
    
    + `libraryTarget : 'window'` // 变量名添加到哪个全局变量名上 browser
    
      ```json
      environment: { // 不使用箭头函数，兼容不支持箭头函数的浏览器，不兼容 ie 基本用不上
          arrowFunction: false
      }
      ```
    
      
  
+ Loader -> 相当于将各种文件翻译成 Webpack 能够理解的文件
  + Loader 让 Webpack 能够处理非 JS 文件,因为 Webpack 本身只能理解 JS 文件
  + module 对象 -> rules 数组 -> 对象 属性:
  + `test:/\.js$/` -> 文件匹配规则
  + `use:[]` -> 使用多个 loader
  + `exclude:/node_modules/` -> 排除某个文件夹下的文件
  + `include:resolve(__dirname,'src')` -> 只检查某个文件夹下的文件
  + `enforce:'pre'` -> 优先执行
  + `loader:'eslint-loader'` -> 使用单个 loader
  + `options:{}` -> loader 配置对象

+ Plugins
  + 插件(Plugins) 可以执行更加多和广的任务,如打包优化,压缩,重新定义环境中的变量等.

+ Mode
  + 模式(Mode)指示 Webpack 使用相应模式的配置
  + 分为开发模式和生产模式
+ 开发模式 (development)
  + 会将 process.env_NODE_ENV 的值设置为 development.
  + 启用 NamedChunksPlugin 和 NamedModulesPlugin
  + 让代码可以在本地调试中运行
+ 生产模式 (production)
  + 会默认修改一些配置,让代码可以在生产环境运行

+ resolve -> 解析模块的规则
  + 对象 -> 属性:
  + `alias:{$css:resolve(__dirname,'src/css')}` -> 配置绝对路径
  + `extensions:['.js','.jsx']` -> 省略文件路径的后缀名
  + `modules:['node_modules']` -> 告诉 webpack 解析模块去哪里找
    + `modules:[resolve(__dirname,'./node_modules'),'node_modules']`
    + 这样可以直接告诉 webpack 去哪个文件夹中找, 而不需要 webpack 往上级文件夹中寻找 模块文件夹

# 优化

## gzip 压缩

```js
// 启用 gzip 压缩 
const isGzip = true;
const gzipConfig = { // 基本配置
  filename: '[file].gz',
  algorithm: 'gzip',
  test: /.(js|css)$/,
  threshold: 10240,
  minRatio: 0.8
}
// 引入包
const CompressionPlugin = require('compression-webpack-plugin');
plugins:[ // 配置位置
    isGzip && new CompressionPlugin(gzipConfig),
]
```

## externals

+ 在打包时忽略一些第三方库,也就是不将第三方库打包到文件当中
+ 这样需要在 html 中将第三方的库的 CDN 链接引入
+ 按需引入的情况下不推荐使用，这样引入 CDN 链接是全部引入

```js
{
   entry:'...',
    externals: {
       // 需要忽略打包的 第三方库
       // 包名 ： 暴露的全局变量名
      // 'React': 'react',  错误
      'react': 'React',
      // 'ReactDOM': 'react-dom', 错误
      'react-dom': 'ReactDOM',
    },
}
```

# 基本

+ Webpack 默认可以打包 js 和 json 资源,其他则不行
+ 打包
  + 开发环境: webpack ./src/index.js -o ./build/JS --mode=development
  + 生产环境: webpack ./src/index.js -o ./build/JS --mode=production
  + webpack 会以 ./src/index.js 为入口文件开始打包,打包后输出到 ./build/JS 文件夹下形成 main.js 文件
+ 配置了 webpack.config.js 文件后 直接运行 webpack 命令就可以进行打包

+ 利用 loader 让 webpack 可以打包 css 资源
+ 配置文件 webpack.config.js
  + 指示 webpack 打包时使用那些配置
  + 语法需要使用 nodejs 的 commonjs

+ html 打包使用的 plugin
  + html-webpack-plugin
  + 压缩设置 这个插件的配置

+ 图片资源打包 loader
  + html-loader 处理 html 文件的 img 图片 (负责引入 img,从而可以被 url-loader 处理)

## 处理 CSS

+ css 打包 使用的 loader
  + style-loader
  + css-loader
```js
{ // module - rules ->
   // 匹配那些文件 以 css 结尾的文件
   test: /\.css$/,
   // 使用那些 loader 进行处理
   // use 使用多个 loader
   use: [ // use 数组中的 loader 执行顺序: 从右到左 或是 从上倒下
      // 也就是数组中越靠后的越先执行
      // 创建 style 标签,将 js 中的样式资源插入到 页面 head 标签中
      'style-loader',

      // 利用插件 mini-css-extract-plugin 将 css 形成单独的文件
      MiniCssExtractPlugin.loader,

      // 将 css 文件变成 commonjs 模块加载到 js 中,里面内容是样式字符串
      'css-loader',
   ]
},
```
+ css 兼容性处理 loader: postcss -> postcss-loader postcss-preset-env
+ 压缩 css plugin: optimize-css-assets-webpack-plugin 插件
```js
module:rules:Array->{ // module - rules ->
   test: /\.css$/,
   use: [ 
      // 提取 js 中的 css 成单独文件
      MiniCssExtractPlugin.loader
      'css-loader',
/*
帮助 postcss 找到 package.json 中 browserslist 里面的配置,通过配置加载指定的 css 兼容性样式
"browserslist":{ // 指定兼容的浏览器
   // 开发环境 -> 设置 node 环境变量 : process.env_NODE_ENV = development
   "development":[ // 开发环境下
      // 兼容 chrome 最近的一个版本
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
   ],
   // 默认下执行的是生产环境
   "production":[
      //  >0.2% 基本上就是兼容了全部的浏览器
      ">0.2%",
      // 不需要兼容的浏览器,一般也就这两个
      "not dead",
      "not op_mini all"
      ]
   }
*/
      // 使用 loader 的默认配置
      // 'postcss-loader',
      // 修改 loader 的配置
      {
         loader: 'postcss-loader',
         options: {
            postcssOptions: {
               ident: 'postcss',
               plugins: [require('postcss-preset-env')]
            },
         }
      }
   ]
},
plugins: [
   new MiniCssExtractPlugin({
      // 指定输出 css 文件的目录以及名字
      filename:'css/main.css'
   }),
   // 压缩 css 文件
   new OptimizeCssAssetsWebpackPlugin()
   ]
```

## 处理 JS

+ Eslint 语法检查
+ 使用 eslint-webpack-plugin
+ `// eslint-disable-next-lint`  下一行不进行 lint 检查
```js
{// loader 写法,新版用插件
   /**
    * 语法检查: eslint-loader 和一个库 eslint
    * 需要注意只检查自己书写的代码.而不检查引用第三方的库
    * 
    * 设置检查规则:
    *    package.json 中 eslintConfig 中设置:
    *    "eslintConfig":{
    *       "extends":"airbnb"
    *    },
    *    // airbnb 是 es 代码的风格指南
    *    airbnb -> eslint-config-airbnb-base
    *           -> eslint-config-airbnb 包含 react 代码检查
    *    eslint-plugin-import
    */
   test: /\.js$/,
   exclude:/node_modules/,// 排除检查 第三方库
   loader: 'eslint-loader',
   options: {
      // 自动修复 eslint 错误
      fix:true
   }
}
```

+ 兼容性处理
+ js  兼容性处理 : babel-loader @babel/core @babel/preset-env
  + 基本 js 兼容性处理 --> @babel/preset-env
  + 问题: 只能转换基本语法,高级语法不能处理,如 promise 不能转换
+ 全部 js 兼容处理 --> @babel/polyfill
  + 问题 : 做全部的兼容,引入的代码体积太大了
+ 按需加载兼容性处理 : 按需引入 --> core-js
+ 压缩 生产环境(mode:'production')默认压缩
```js
// index.js
import '@babel/polyfill'

{ // loader
   text:/\.js$/,
   exclude:/node_modules/,
   loader:'babel-loader',
   options:{
      // 预设: 指示 babel 做什么样的兼容性处理
      presets:['@babel/preset-env']
      presets:[ // 按需加载
         '@babel/preset-env',
         { // 按需加载
            useBuiltIns:'usage',
            corejs:{ // 指定 core-js 版本
               version:3
            },
            // 指定兼容性做到那个版本浏览器
            targets:{
               chrome:'60',
               firefox:'60',
               ie:'9',
               safari:'10',
               edge:'17'
            }
         }
         ],
      // 对 babel 编译的 js 进行缓存
      // 让没有被改变的 js 不会进行重新编译
      cacheDirectory:true
   }
}
```

## 处理 其他资源

+ 使用 asset module type 取代 url-loader
  + asset/resource = file-loader
  + asset/inline = url-loader
  + asset/source = raw-loader
  + asset - 自动选择
```js
{
   // loader
   {
      test: /\.(jpe?g|png|gif|svg)$/,
      type: 'asset',
      generator: {
         filename: 'img/[name]_[hash:6][ext]'
      },
      parser: {
         dataUrlCondition: {
            maxSize: 100 * 1024
         }
      }
   },
   {
      test: /\.(eot|ttf|woff2)$/,
      type: 'asset/resource',
      generator: {
         filename: 'font/[name]_[hash:6][ext]'
      }
   }

}
```

# 基础 config

+ production and development environment 分离
+ 通过分不同的配置文件 或 设置环境变量

+ 配置文件 webpack.config.js
```js
// 使用 nodejs 的 commonjs
const { resolve } = require('path');

// 引入 html-webpack-plugin 打包 html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 mini-css-extract-plugin 单独构成 css 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入压缩 css 插件 optimize-css-assets-webpack-plugin
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 清除打包目录中的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 复制文件
const CopyPlugin = require('copy-webpack-plugin');



// 设置 nodejs 的环境变量
process.env_NODE_ENV = 'development'

module.exports = {
   // mode : modeString
   mode: 'development', // 两个模式不能一起写
   // mode:'production'

   // 默认为 eval , source-map 用于更好的处理错误
   devtool: 'source-map',

   // webpack 配置
   // 入口文件 entry: stringPath
   entry: './src/index.js',

   // 输出 output: configObject
   output: {
      // 输出文件名 filename : StringFileName
      filename: 'main.js',
      //输出路径 path : stringPath
      // __dirname 是 nodejs 的变量,代表当前文件的目录绝对路径
      path: resolve(__dirname, 'build')
   },

   resolve:{
      // 别名
      alias: {
         '@': resolve(__dirname, './src')
      },

      // 需要自动搜索后缀的文件
      // 数组中配置的, 在引用时可以省略后缀名
      extensions: ['js', 'ts', 'json', 'jsx', 'vue'],
      // default: .wasm, .mjs, .js, .json

      // 如果是文件夹, 则默认搜索 index 文件
      mainFiles: ['index']
   }

   // loader 的配置 module : configObject
   // 1.下载 , 2.使用
   module: {
      rules: [ // rules : Array => configObject
         // 详细 loader 配置
         // 不同的文件必须要配置不同的 loader 处理
         {
            // 匹配那些文件 以 css 结尾的文件
            test: /\.css$/,
            // 使用那些 loader 进行处理
            // use 使用多个 loader
            use: [ // use 数组中的 loader 执行顺序: 从右到左 或是 从上倒下
               // 也就是数组中越靠后的越先执行
               // 创建 style 标签,将 js 中的样式资源插入到 页面 head 标签中
               // 'style-loader',
               MiniCssExtractPlugin.loader,// 提取 js 中的 css 成单独文件
               // 将 css 文件变成 commonjs 模块加载到 js 中,里面内容是样式字符串
               'css-loader',
               // 使用 loader 的默认配置
               // 'postcss-loader',
               // 修改 loader 的配置
                /* package.json 中添加配置
                "browserslist": {
                "production": [
                      ">0.2%",
                      "not dead",
                      "not op_mini all"
                ],
                "development": [
                      "last 1 chrome version",
                      "last 1 firefox version",
                      "last 1 safari version"
                    ]
                  },
                */
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        ident: 'postcss',
                        plugins: [require('postcss-preset-env')]
                     },
                  }
               },
               'sass-loader'
            ]
         },
          {
            test: /\.ts$/,
            use: [
               { 
                 /*
                    "@babel/core": "^7.14.6",
                    "@babel/preset-env": "^7.14.7",
                    "babel-loader": "^8.2.2",
                    "core-js": "^3.15.2",
               	 */
                  loader: 'babel-loader',
                  options: {
                     // 设置预定义的环境
                     presets: [
                        [
                           '@babel/preset-env',
                           {
                              targets: {
                                 'chrome': '88',
                              },
                              'corejs': '3',
                              'useBuiltIns': 'usage'
                           }
                        ]
                     ]
                  }
               },
               'ts-loader'
            ],
            exclude: /node-modules/
         }
         {
            test: /\.(jpg|png|gif)$/,
            // 使用一个loader
            loader: 'url-loader',
            options: { // loader 配置选项
               //    // 图片大小小于 8kb(8*1024),就会被 base64 处理
               //    // base优点,减少请求数量(减轻服务器压力)
               //    // base缺点,图片体积会更大(导致文件请求速度更慢)
               limit: 8 * 1024,
               //    // 关闭 es6 模块化解析方式,使用 commonjs 进行解析
               esModule: false,
               //    // [hash:10]取图片的 hash 的前十位
               //    // [ext]取文件原来的扩展名
               name: '[hash:10].[ext]'
            }
         },
         {
            test: /\.html$/,
            // 处理 html 文件的 img 图片 (负责引入 img,从而可以被 url-loader 处理)
            loader: 'html-loader'
         },
         {
            // 打包其他资源(除了html/js/css资源以外的资源)
            // 排除一些资源
            exclude: /\.(css|sass|js|json|jsx|html)$/,
            loader: 'file-loader',
            options: {
               name: '[hash:10].[ext]'
            }
         },
      ]
   },
   // plugins 的配置 plugins : Array
   // 1.下载 , 2.引入 , 3.使用
   plugins: [
      // 配置
       // 清除打包目录中的文件
      new CleanWebpackPlugin(),
      // 复制静态文件
      production && new CopyPlugin({
           patterns: [
              {
                  from: Root('public'),
                  // to: Root('dist'),
                  globOptions:{
                     ignore: ['**/index.html']
                  }
              }
          ]
      }),
      // html-webpack-plugin
      new HtmlWebpackPlugin({
         
         // 默认打包的是一个空的HTML ,且引入了打包输出的所有资源
         // 需要有解构就需要配置
         // template 设置模板 html
         template: './public/index.html',
         minify: { // 压缩 html 代码
            // 移除空格
            collapseWhitespace: true,
            // 移除注释
            removeComments:true
         }
      }),
      // webpack 内置 definePlugin 可以定义 HTMl 模板中的变量
      new DefinePlugin({
         BASE_URL: '"./public"'
      }),
      new MiniCssExtractPlugin({
         // 指定输出 css 文件的目录以及名字
         filename:'css/main.css'
      }),
      new OptimizeCssAssetsWebpackPlugin()
   ],

   // 监听文件变化, 重新打包
   // watch: true, // 或者使用 --watch 命令

   // 开发服务器 devServer 用来自动化构建
   // 特点 : 只会在内存中编译打包不会有任何输出
   // 启动 devServer 指令为:npx webpack-dev-server
   devServer: {
      // 项目构建后的路径
      contentBase: resolve(__dirname, 'build'),
      // 启动 gzip 压缩
      compress: true,
      // 端口号
      port: 3000,
      // 自动打开浏览器,为本机默认浏览器
      open: true
   }
}
```

# 优化配置

+ 开发环境性能优化
  * 优化打包构建速度
    * HMR
    * oneOf
    * 多线程打包
    * babel缓存
  * 优化代码调试
    * source-map


+ 生产环境性能优化
  + 优化打包构建速度
    + source-map
    + externals and CDN 或者 dll
  + 优化代码运行的性能
    + 文件资源缓存(hash-chunkhash-contenthash)
      + 需要服务器让用户浏览器强制缓存 文件资源
    + tree shaking
    + code split
    + lazy Loading(懒加载和预加载)
    + PWA

## HMR

* 使用 webpack 中的 HMR 功能
* HMR : hot module replacement 热模块更新 / 替换
  * 作用就是: 一个模块发生变化,只会从新打包这一个模块,而不是全部重新打包,提升速度非常明显
  * 样式文件在开发环境中使用 style-loader ,因为这个 loader 内部实现了 HMR 功能
  * js 文件 : 默认不能使用 HMR 功能
  * html 文件 : 默认不能使用 HMR 功能,同时会导致: html 文件不能热更新了
    * 修改 entry 入口为数组,将 html 文件也加入其中
    * html 文件也不需要使用 HMR 功能
```js
// js 配置热更新 index.js 中
// HMR 功能对 js 的处理, 只能处理非入口文件
if(module.hot){
   // 一旦 module.hot 为 true ,就代表开启了 HMR 功能,->让 HMR 功能生效
   module.hot.accept('./print.js',function(){
      // 监听 print.js 文件的变化,一旦发生拜年话,其他模块不会重新打包构建
      // 会执行后面的回调函数
      print()
   })
}

// webpack 配置 , 修改配置需要重启 webpack 服务
devServer: {
   // 项目构建后的路径
   contentBase: resolve(__dirname, 'build'),
   // 启动 gzip 压缩
   compress: true,
   // 端口号
   port: 3000,
   // 自动打开浏览器,为本机默认浏览器
   open: true,
   // 启动热更新模块
   hot: true
}
```

## source-map

+ 这是一种提供源代码到构建后代码的映射技术
+ 当构建后代码错误后,通过映射可以追踪到源代码的错误
+ `.map` 文件就是代码映射的文件
```js
// webpack
{
   entry:'....',
   // 设置此项
   devtool:'source-map'
   /** 可选值
    * [inline-|hidden-|eval-][nosources-][cheap-[module]]source-map
    * source-map 外部
    *    准确提示错误代码的准确信息 和 源代码错误的位置
    * 
    * inline-source-map  将 map 文件内联到 js 文件中,内联的构建速度更快
    *    准确提示错误代码的准确信息 和 源代码错误的位置
    * 
    * hidden-source-map  外部
    *    错误代码的错误原因,只能提示到构建后代码的错误位置
    * 
    * eval-source-map  每一个 js 文件内联一个 map 文件
    *    准确提示错误代码的准确信息 和 源代码错误的位置,多一个文件的唯一 hash 值
    * 
    * nosources-source-map: 外部, 可以隐藏源代码
    *    能够找到错误代码的准确信息,但是没有任何源代码的
    * 
    * cheap-source-map: 外部
    *    错误代码的信息,但是提示的是一整行代码的错误,不会精确到一行中错误代码的位置
    * 
    * cheap-module-source-map:
    *    开发环境: 速度快,调试更友好 推荐使用 -> eval-source-map (脚手架默认)
    *    速度快(eval>inline>cheap)
    *       eval-cheap-source-map
    *       eval-source-map
    *    调试更友好:
    *       source-map
    *       cheap-module-source-map
    *       cheap-source-map
    *    
    * 生产环境: 源代码是否要隐藏,调试需不需要友好
    *    nosources-source-map 隐藏全部代码
    *    hidden-source-map    隐藏源代码,会提示构建后代码的错误信息
    *    需要调试 source-map 或 cheap-module-source-map
   */
}
```

## 缓存

+ 优化文件加载,让浏览器不会频繁向服务器请求一样的文件

+ babel 缓存 -> cacheDirectory:true
+ 让第二次代码构建速度更快
```js
{ // loader
   text:/\.js$/,
   exclude:/node_modules/,
   loader:'babel-loader',
   options:{
      presets:['@babel/preset-env']
      // 对 babel 编译的 js 进行缓存
      // 让没有被改变的 js 不会进行重新编译
      cacheDirectory:true
   }
}
```
+ 文件资源缓存 -> 让上线代码运行缓存更好,有效减少服务器请求次数
+ 问题,在文件更新后依旧从缓存中读取,
+ 解决,每次打包修改文件名,文件名变了,更新文件时就不会走缓存了
+ 修改方式,打包时利用 hash 修改文件名
  + 问题-> 修改一个文件两个资源的缓存会同时失效,因为使用的都是 webpack 打包的 hash 值
+ 使用 chunkhash 值 `filename: 'main.[chunkhash:10].js'`
  + 如果打包来源于同一个 chunk 那么 hash 就是一样的
  + 也就是文件不修改 hash 就不会变
  + 问题 -> css 和 js 的 hash 还是一样的
  + 因为 -> css 是在 js 文件中被引入的,所以同属于一个 chunk
+ 使用 contenthash : 根据文件内容生成 hash 值
  + 这样就不会出现以上问题
```js
// 修改文件名 给文件后缀加上哈希值
output: {
   filename: 'main.[hash:10].js',
   path: resolve(__dirname, 'build')
},
plugins: [
   new MiniCssExtractPlugin({
      // 指定输出 css 文件的目录以及名字
      filename:'css/main.[hash:10].css'
   }),
],
```

## oneOf

+ oneOf 让多个 loader 只匹配一个
```js
module:{
   rules:[ // 不写 oneOf 文件会默认将所有的 loader 匹配一遍
      // 以下 loader 只会匹配一个
      // 需要注意 : 不能有两项配置处理同一个类型的文件
      {
         // 同一种文件需要两个 loader 处理的,其中一个 loader 写在外面
      },
      {
         oneOf;[
            {
               // loader
            }
         ]
      }
   ]
}
```

## tree shaking

+ tree shaking : 树摇 -> 去除无用代码
+ 去除在应用程序中没有使用的一些代码,让应用体积更小
+ 使用前提
  + 必须使用 ES6 模块化
  + 开启 production 环境
+ 就会自动开启

+ 注意
  + 版本的不同可能会将引入的 css 当做为使用的 js 给去除
+ 在 package.json 中配置
  + `"sideEffects":false` 所有代码都没有副作用(都可以进行 tree shaking)
    + 问题: 可能会把 css / @babel/polyfill (副作用)文件干掉
  + `"sideEffects":["*.css"]`
    + 标记一些文件不要进行 tree shaking , 这样就不会被忽略

## code split

+ 代码分割
+ 一般第三中方式和第二种一起使用

### 方式一

+ 多入口分割
+ 多入口:有一个入口,最终输出就有一个 bundle
+ 多入口不要在多个入口中引用相同的第三方库,会被重复打包
```js
{
   entry:{
      main:'index.js',
      test:'test.js',
   },
   output:{
      // [name]:取文件名
      filename:'js/[name].[contenthash:10].js',
      path:resolve(__dirname,'build')
   }
}
```

### 方式二

+ optimization
  + 可以将 node_modules 中的代码单独打包成一个 chunk 最终输出
  + 开启后还可以避免多入口打包重复第三方库的问题
    + 也就是会把公共的模块打包成单独的 chunk
```js
{
   optimization:{
      splitChunks:{
         chunks:'all'
      }
   }
}
```

### 方式三

+ 通过 js 代码,让某个文件被单独打包成一个 chunk
+ import 动态导入语法: 能将某个文件单独打包
```js
// /* webpackChunkName: 'test' */ 固定文件的名字
import(/* webpackChunkName: 'test' */'./test')
   .then(result=>{
      // 文件加载成功
      console.log(result);
   })
   .catch(()=>{
      console.log('文件加载失败!')
   })
```

## lazy Loading

+ JS 文件懒加载 和 预加载
+ 懒加载 : 需要用的时候才加载
+ 预加载 : 会在使用前,提前加载 js 文件, Prefetch 等主要资源加载完了,空闲时间加载其他资源
  + 预加载 兼容性不太好
+ 正常加载为并行加载,统一时间加载多个文件.
+ 这样动态加载的方法可以让 js 只有在用上的时候才会加载
```js
// webpackPrefetch 预加载
import(/* webpackChunkName: 'test',webpackPrefetch:true*/'./test')
   .then(result=>{
      // 文件加载成功
      console.log(result);
   })
   .catch(()=>{
      console.log('文件加载失败!')
   })
```

## PWA

+ PWA : 渐进式网络开发应用程序(离线可访问) , 让页面在里先后可以继续访问
+ workbox --> workbox-webpack-plugin
```js
{
   plugin:[
      new WorkboxWebpackPlugin.GenerateSW({
         /*
            1. 帮助 serviceWorker 快速启动
            2. 删除旧的 serviceWorker

            生成一个 serviceWorker 配置文件
         */
         clientsClaim: true,
         skipWaiting: true
      })
   ]
}
// 在入口的 js 文件中注册 serviceWorker
// 处理兼容性问题
if('serviceWorker' in navigator){
   window.addEventListener('load',()=>{
      navigator.serviceWorker
         .register('/service-worker.js')
         .then(()=>{
            console.log('service-worker注册成功~');
         })
         .catch(()=>{
            console.log('service-worker注册失败~');
         });
   })
}
// 修改 eslint 在 package.json 中的 eslintConfig 配置
{
   "eslintConfig": {
    "env":{ // 因为 eslint 默认不支持浏览器的全局变量
      // 让 eslint 支持浏览器的全局变量
      "browser":true
    }
  },
}
```
2. sw 代码必须运行在服务器上
   + --> nodejs  方法一
   + --> 方法二
     + npm i serve -g
     + serve -s build 启动服务器, 将 build 目录下所有的资源作为静态资源暴露出去

## dll

+ 拆解第三方库,不将所有的第三方库打包成一个文件
+ 使用 dll 技术对某些库(如:react,vue等第三方库)单独打包
+ 打包第三方库时运行的指令也需要更改 : webpack -- config webpack.dll.js
+ 在将第三方库单独打包完成后也就不需要在每次进行打包的时候重复打包第三方库了
+ 这样会大大提升打包的速度
```js
// webpack.dll.js 一般也只需要运行一次,不会重复打包一些第三方库
const webpack = require('webpack');
{ 
   entry:{
      // 将 jquery 这个库打包到 pathname 文件中
      pathname:['jquery']
   },
   output:{
      filename:'[pathname].js',
      path:resolve(__dirname,'dll'),
      library:'[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
   },
   plugin:[
      // 打包生成一个 manifest.json -> 提供和 jquery 映射的映射关系
      new webpack.DllPlugin({
         name:'[name]_[hash]', // 映射库暴露内容的名称
         path:resolve(__dirname,'dll/manifest.json') // 输出文件路径
      })
   ]
}
// 修改 webpack.config.js 配置
const webpack = require('webpack');
{
   plugin:[
      // 告诉 webpack 那些库不参与打包,且使用时名称也需要修改
      new webpack.DllReferencePlugin({
         manifest:resolve(__dirname,'dll/manifest.json')
      })
   ]
}
// 需要使用 插件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
{
   plugin:[
      // 将某个文件打包输出出去,并在 html 中自动引入该资源
      new AddAssetHtmlWebpackPlugin({
         filepath:resolve(__dirname,'dll/jquery.js')
      })
   ]
}
```

## 多线程打包

+ 使用 thread-loader
```js
{ // loader
   text:/\.js$/,
   exclude:/node_modules/,
   use:[
      /*
         开启多线程打包.
         启动线程需要消耗大概 600ms , 进程之间通信也需要时间
         只有工作消耗时间比较长,才需要开启多线程打包
         一般作用于 babel
      */
      {
         loader:'thread-loader',
         options:{
            workers:2 // 进程为 2
         }
      },
      {
         loader:'babel-loader',
         options:{
            presets:[ // 按需加载
               '@babel/preset-env',
               { // 按需加载
                  useBuiltIns:'usage',
                  corejs:{ // 指定 core-js 版本
                     version:3
                  },
                  // 指定兼容性做到那个版本浏览器
                  targets:{
                     chrome:'60',
                     firefox:'60',
                     ie:'9',
                     safari:'10',
                     edge:'17'
                  }
               }
            ],
         // 对 babel 编译的 js 进行缓存
         // 让没有被改变的 js 不会进行重新编译
         cacheDirectory:true
         }
      }
   ]
}
```

# 配置

+ npx i webpack webpack-cli

## devServer

+ 开发服务器 devServer 作用: HMR
  + 需要下载 : webpack-dev-server 包
  + 通过 npx 启动 npx webpack server
```js
{
   entry:'...',
   target: 'web', //解决不自动刷新问题
   target: 'node', // 在 node 环境中

   devServer: {

      // 服务引用静态资源目录
      contentBase: resolve(__dirname, 'public'),
      // 在服务运行时, 如果没有复制静态资源就可以这样指定静态资源路径 如 ./ico 就会去 public 目录寻找
      // 如没有使用 CopyPlugin 时

      // 热更新
      hot: true,
      /* 启用 HMR
         cli 都会提供相应的 loader 进行处理,不需要手动

         import './js'
         module.hot && module.hot.accept('./js', ()=>{
            // 更新回调
         })
      */

      // 端口号, 默认 8080
      port: 3000,

      // 自动打开浏览器,为本机默认浏览器
      open: true,
      
      // 域名
      host:'localhost', // 0.0.0.0 其他位置可以访问
      // 如想用手机测试时, 访问时使用电脑局域网 ip:port

      // 不要显示启动服务器日志信息
      clientLogLevel:'none',

      // 除了一些基本的启动信息外,其他内容都不要显示
      quiet:true,
     

      watchContentBase:true,
      watchOptions:{
         // 需要忽略监视的文件
         ignored:/node_modules/
      }

      // 启动 gzip 压缩
      compress: true,

      // 如果出错了,不要全屏提示
      overlay:false,
      
      // 服务器代理 --> 解决开发环境跨域问题
      proxy:{
         // 通过 devServer(5000) 服务器代理转发
         // /api/xxx 的请求,会转发到 target 目标服务器
         '/api':{ // axios.get('/api/getData')
            target:'http://localhost:3000',
            pathRewrite:{ // 重写路径
               '^/api':''
            },
            secure: true, // 默认不接收 不带证书的域名
            ChangeOrigin: true
         }
      }
   }
}
```

## optimization

```js
{
   entry:'...',
   optimization:{
      splitChunks:{
         chunks:'all',
         // 以下全是默认值 , 一般可以不写
         minSize:30*1024, // 分割的 chunk 最小为 30kb
         maxSize: 0, // 最大没有限制
         minChunks:1, // 要提取的 chunk 最少被引用一次
         maxAsyncRequests: 5, // 按需加载时并行加载的文件最大数量
         maxInitialRequests: 3, // 入口 js 文件最大并行请求数量
         automaticNameDelimiter: '~', // 名称连接符
         name:true, // 可以使用命名规则
         cacheGroups:{ // 分割 chunk 的组
            // node_modules 中的 文件会被打包到 vendors 组的 chunk 中
            // --> vendors~xxx.js
            // 需要满足上面的公共规则
            vendors:{
               test:/[\\/]node_modules[\\/]/,
               // 打包的优先级为 -10
               priority: -10
            },
            default:{
               // 要提取的 chunk 最少被引用两次
               minChunks:2,
               priority:-20,
               // 如果当前要打包的模块,和之前已经被提取的模块是同一个,就会复用
               reuseExistingChunk:true
            }
         }
      },
      // 将当前模块记录其他模块的 hash 单独打包为一个文件 runtime
      // 因为在用文件资源缓存时,使用的是 hash 的方式,主文件中会保存其他引用文件的 hash 值
      // 这样会导致其他文件改变时,因为 hash 也会变化,所以主文件中记录的 hash 也需要改变
      // 这样主文件的资源缓存就失效了,所以要单独提取文件的 hash 到 runtime 文件中
      runtimeChunk:{
         name:entry => `runtime-${entry.name}`
      },
      minimizer:{
         // 配置生产环境的压缩方案: js 和 css
         // 修改配置方案 ...
      }

   }
}
```

# TS 基本打包配置

```js
/*
    "scripts": {
        "build": "webpack",
        "start": "webpack server --open chrome.exe"
      },
    "@babel/core": "^7.14.6",
    "@babel/preset-env": "^7.14.7",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "copy-webpack-plugin": "^9.0.1",
    "core-js": "^3.15.2",
    "css-loader": "^5.2.6",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.1.0",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    "postcss-loader": "^6.1.1",
    "sass": "^1.35.2",
    "sass-loader": "^12.1.0",
    "strip-ansi": "^7.0.0",
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.5",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
*/
// tsconfig
{
   "compilerOptions": {
      "target": "ES6",
      "module": "ES6",
      "strict": true,
      "noEmitOnError": true,
      "baseUrl": "./src",
      "paths": {},
      "removeComments": true,
      "jsx": "preserve",
   }
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

function Src(url) {
   return path.resolve(__dirname, `./src/${url}`);
}
function Root(url) {
   return path.resolve(__dirname, `./${url}`);
}

const isDev = false;
module.exports = {
   mode: isDev ? 'development' : 'production',
   entry: Src('index.ts'),
   output: {
      path: Root('dist'),
      filename: 'Main.js',
      environment: {
         arrowFunction: false
      }
   },
   resolve: {
      extensions: ['.ts', '.js']
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader'
            ],
            exclude: /node-modules/
         },
         {
            test: /\.ts$/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: [
                        [
                           '@babel/preset-env',
                           {
                              targets: {
                                 'chrome': '88',
                              },
                              'corejs': '3',
                              'useBuiltIns': 'usage'
                           }
                        ]
                     ]
                  }
               },
               'ts-loader'
            ],
            exclude: /node-modules/
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
         patterns: [
            {
               from: Root('public/favicon.ico'),
               to: Root('dist')
            }
         ]
      }),
      new HtmlWebpackPlugin({
         template: Root('public/index.html'),
         minify: {
            collapseWhitespace: true,
            removeComments: true
         }
      }),
      new MiniCssExtractPlugin({
         filename: 'main.css',
      }),
      new OptimizeCssAssetsWebpackPlugin(),
   ],
   devServer: {
      port: 3000,
   }
}
```

