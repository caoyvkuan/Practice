# 通用

+ [npm](https://www.npmjs.com/)
  + [Learn](https://www.npmjs.cn/)

+ [yarn](https://yarnpkg.com/)
  + [Learn](https://yarn.bootcss.com/docs/)

## serve

+ 可以运行一个服务器,可以用来运行打包后的页面,会开启一个虚拟服务器
+ npm i -g serve
+ serve pathName , 执行指定文件夹

## PubSubJS

+ 订阅与发布

+ npm i pubsub-js

+ import PubSub from 'pubsub-js'

+ [链接](https://www.npmjs.com/package/pubsub-js)

	```js
	// 订阅
	var token = PubSub.subscribe('MY TOPIC', callback(messageName,data))
	
	// 发布
	PubSub.publish('MY TOPIC', data)
	// 异步
	PubSub.publishSync('MY TOPIC', 'hello world!')
	
	// 清除订阅
	PubSub.unsubscribe(token);
	// 清除使用指定函数的订阅
PubSub.unsubscribe(mySubscriber);
	
	// 清除消息名的订阅
	PubSub.subscribe('a', myFunc1);
	PubSub.subscribe('a.b', myFunc2);
	PubSub.subscribe('a.b.c', myFunc3);
	
	PubSub.unsubscribe('a.b');
	// 清除所有订阅
	PubSub.clearAllSubscriptions()
	
	// 获取订阅
	PubSub.getSubscriptions('token');
	// 查看订阅数
	PubSub.countSubscriptions('token')
	```
	
	

## axios

+ 发送网络请求
+ npm i axios

## JSON-Server

+ 网络请求测试服务
+ 安装 : npm install -g json-server
+ 启动 : json-server --watch db.json

+ ![配置](./images/json-server.webp)

## Nano ID

+ JS 唯一 id 生成器
+ `import { nanoid } from 'nanoid'`
+ yarn nanoid

## Copy to clipboard

+ 复制到剪切板
+ npm i copy-to-clipboard
+ import copy from 'copy-to-clipboard'
+ copy('Text');
+ [链接](https://www.npmjs.com/package/copy-to-clipboard)

## immutable

+ 不可变数据,通常配合 Redux 使用
+ 在深层数据修改上可以很方便的节约性能
+ [链接](https://www.npmjs.com/package/immutable)

# React

+ [精品推荐](https://ant.design/docs/react/recommendation-cn)

## Ant Design

+ [UI 组件库](https://ant.design/docs/react/introduce-cn)
+ yarn add antd

+ [自定义主题](https://ant.design/docs/react/use-with-create-react-app-cn#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)
+ [配置文档](https://ant.design/docs/react/customize-theme-cn)

### @craco/craco

+ 按需引入 antd 样式
+ 安装  yarn add  @craco/craco
```js
/* 修改 package.json */
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test",
}
```
+ 在项目根目录创建一个 craco.config.js 用于修改默认配置。
+ 使用 : babel-plugin-import 安装 : yarn add babel-plugin-import
+ 安装 : craco-less 修改主题样式
```js
const { resolve} = require('path');
const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
   webpack: {
      // 别名
      alias: {
         '@': resolve('src'),
         '@EXAMPLE': resolve('src/example'),
         '@PAGES': resolve('src/pages'),
      },
   },
   babel: {
      plugins: [
         // antd css 按需引入
         ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true}],
      ]
   },
   plugins: [
      {
         plugin: CracoLessPlugin,
         options: {
            lessLoaderOptions: {
               lessOptions: {
                  modifyVars: getThemeVariables({
                     // dark: true,
                     compact: true,
                  }),
                  javascriptEnabled: true,
               },
            }
         }
      }
   ]
};
```

### webpack

+ 按需加载使用 : babel-plugin-import 安装 : yarn add babel-plugin-import
+ 定制主题 : less , less-loader@6
```js
// webpack.config.js
{
   test: /\.less$/,
   include: /[node_module\/antd|src]/,
   // exclude: /node_module\//,
   use: [
      ...getStyleLoaders({
      importLoaders: 1,
      sourceMap: isEnvProduction
         ? shouldUseSourceMap
         : isEnvDevelopment,
      }),
      {
         loader: 'less-loader',
         options: {
            lessOptions: { // 定制主题
               modifyVars: {
               'primary-color': 'red',
               'link-color': '#1DA57A',
               'border-radius-base': '2px',
               },
               javascriptEnabled: true,
            }
         }
      }
   ],
},

// babel-loader
{
   loader:'babel-loader',
   options:{
      plugins:[
         ...plugins,
         [ // 按需引入 antd
         'import',
            {
               libraryName: 'antd',
               libraryDirectory: 'es',
               style: true
            }
         ],
      ]
   }
}

```

## 虚拟滚动

+ react-window 和 react-virtualized 
+ 在有限的时间内仅渲染有限的内容