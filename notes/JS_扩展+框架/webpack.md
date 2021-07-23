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
  + url-loader  处理不了 html 中的 img 图片
  + file-loader 可不用
  + html-loader 处理 html 文件的 img 图片 (负责引入 img,从而可以被 url-loader 处理)

+ 打包其他资源 : file-loader

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
      // 将 css 文件变成 commonjs 模块加载到 js 中,里面内容是样式字符串
      'css-loader'
   ]
},
```
+ 利用插件 mini-css-extract-plugin 将 css 形成单独的文件
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

# 基础 config

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
      new CopyPlugin({
           patterns: [
              {
                  from: Root('public/favicon.ico'),
                  to: Root('dist')
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
      new MiniCssExtractPlugin({
         // 指定输出 css 文件的目录以及名字
         filename:'css/main.css'
      }),
      new OptimizeCssAssetsWebpackPlugin()
   ],
   // mode : modeString
   mode: 'development', // 两个模式不能一起写
   // mode:'production'
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
    * inline-source-map  将 map 文件内联到 js 文件中,内联的构建速度更快
    *    准确提示错误代码的准确信息 和 源代码错误的位置
    * hidden-source-map  外部
    *    错误代码的错误原因,只能提示到构建后代码的错误位置
    * eval-source-map  每一个 js 文件内联一个 map 文件
    *    准确提示错误代码的准确信息 和 源代码错误的位置,多一个文件的唯一 hash 值
    * nosources-source-map: 外部, 可以隐藏源代码
    *    能够找到错误代码的准确信息,但是没有任何源代码的
    * cheap-source-map: 外部
    *    错误代码的信息,但是提示的是一整行代码的错误,不会精确到一行中错误代码的位置
    * cheap-module-source-map:
    * 
    * 开发环境: 速度快,调试更友好 推荐使用 -> eval-source-map (脚手架默认)
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

## devServer

+ 开发服务器 devServer 作用:
  + 自动编译
  + 自动打开浏览器
  + 自动刷新浏览器
  + 需要下载 : webpack-dev-server 包 , 需要通过 npx 启动 npx webpack server
  + 需要下载 : webpack-server 包 , 需要通过 npx 启动 npx webpack server
```js
{
   entry:'...',
   target: 'web', //解决不自动刷新问题
   devServer: {
   // 项目构建后的路径 , 运行代码的目录
   contentBase: resolve(__dirname, 'build'),
   // 监视 contentBase 目录下所有文件的变化,一旦文件变化就会 reload
   watchContentBase:true,
   watchOptions:{
      // 需要忽略监视的文件
      ignored:/node_modules/
   }
   // 启动 gzip 压缩
   compress: true,
   // 端口号
   port: 3000,
   // 自动打开浏览器,为本机默认浏览器
   open: true,
   hot: true,
   // 域名
   host:'localhost',
   // 不要显示启动服务器日志信息
   clientLogLevel:'none',
   // 除了一些基本的启动信息外,其他内容都不要显示
   quiet:true,
   // 如果出错了,不要全屏提示
   overlay:false,
   // 服务器代理 --> 解决开发环境跨域问题
   proxy:{
      // 一旦 devServer(5000) 服务器接收到 /api/xxx 的请求,就会吧请求转发到 target 目标服务器
      '/api':{
         target:'http://localhost:3000',
         pathRewrite:{ // 重写路径
            '^/api':''
         }
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

