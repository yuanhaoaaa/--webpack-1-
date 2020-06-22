
## webpack基础（1）


![](https://cdn.pixabay.com/photo/2020/05/03/19/09/nike-5126389__340.jpg)

这是一篇简单的wbepakc配置搭建的vue项目，代码地址：[webpack基础（1）代码](https://github.com/yuanhaoaaa/--webpack-1-)，能了解webpack的基本使用

### webpack是什么
官方给出的定义是
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### 为什么使用Webpack

目前来说，webpack是最流行的打包工具，各个公司都在使用，得益于以下几点

 1. 模块化打包，避免变量污染，命名冲突
 2. 可复用性、可读性

### commonjs

node采用的是commonjs，使用require('mudle')来加载文件，一个文件就是一个模块。

```
   // 导入
   let module = reuqire('module')
   // 导出
   moudle.expores = module
   // 或者
   expores.b = module.b
```
缺点是**同步加载**，在引入完成后才会继续向下执行逻辑。
### AMD
在浏览器使用AMD进行模块化，是异步加载，目前已经很少在使用了

```
    define('module', ['d1', 'd2', function() {
        return someExportedValue
    })
    require('module', './file', function() {
        //...
    })
```











































### ES6
ES6中推出模块化导入导出语法，现在基本上都在使用。
```
    // 导出
    export default module
    // 导入
    import module from './module'
    // 单个导出
    export const test = 'test'
    // 单个导入
    import { test } from './module'
```

### css
现在想less、sass等都在使用模块化引入，可见模块化有多么的重要


### webpack gulp对比
对于gulp来说，工作像是流水线一样，定义好任务即可
webpack 则 万物都是模块，最终都会给你打包成一个或多个bundle




#### 初始化

```
    // 创建新的目录
    mkdir csr-vue && cd csr-vue
    // 初始化包，填写信息，略过则后面添加  -y
    npm init 
```
#### 目录结构
![](http://yuanhao-web.cn/server/uploads/dir.png)


<br/>


> webpack需要理解四个概念**入口**、**出口**、**loader**、**插件**，webpack会从入口文件开始递归，遇到不同后缀的文件用不同的loader转换为有效模块，同时会广播事件，插件会在合适的时机进入，插件能够处理各种不同的任务，最后完成打包

#### 依赖
```
// 开发依赖
cnpm i -D webpack webpack-cli vue-loader copy-webpack-plugin html-webpack-plugin clean-webpack-plugin babel-loader vue-style-loader css-loader less-loader url-loader @babel/preset-env @babel/core webpack-merge vue-template-compiler webpack-dev-server cross-env

// 生产依赖
cnpm i -D vue vue-router vuex
```

## webpack.config.common.js 公共配置

#### entry

webpack首先要找到入口才能够进行工作，我们看下配置

```
    export default {
        // 写法一
        entry: resolve('../src/main.js')
        // 写法二
        // 可扩展 如多页面应用、vendor第三方库
        entry: {
            app: resolve('../src/main.js')
        },
    }   
```
#### output
打包后文件放在指定出口

```
export default {
    output: {
        // 打包后存放的位置
        path: resolve('../dist'),
        // 打包文件名称 name 原始文件名 公共配置忽略  filename
        // 打包后 静态资源需要添加的路径前缀，取决于静态资源放在哪里。
        publicPath: '/'
    }
}
```





















#### loader

loader配置在module.rules中逐个配置

```
module: {
        rules: [
            {
                test: /.js$/,
                // 忽略node_modules文件，提升时间
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.(sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: () => {
                                if (!isDev) {
                                    return '[name].[ext]';
                                }
                                return '[name]_[hash:8].[ext]';
                            },
                            outputPath: 'images/',
                            // 小于10k打包为base64
                            limit: 10000
                        }
                    }
                ]
            },
        ]
    }
```
使用babel-loader 需要配置.babelrc 文件


```
{
    'presets': [
        // 转换ECMAscript 语法
        '@babel/env'
    ]
}
```






















#### resolve

配置模块如何解析


```
    resolve: {
        // 别名
        alias: {
            '@': resolve('../src')
        },
        // 扩展名
        extensions: ['.js', '.vue', '.less']
    }
```

#### plugins
插件配置
```
// 将打包好的资源放入指定html模板中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将不需要打包的资源 放入到指定目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 每次打包前，清除dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = pathname => path.resolve(__dirname, pathname)
// vue-loader 需要引入
const VueLoaderPlugin = require('vue-loader/lib/plugin')
....//
plugins: [


        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'test',
            template: resolve('../public/template.html'),
            filename: isProd ? 'template.html' : 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('../public'),
                to: resolve('../dist/public'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin()
    ]
```



















































## webpack.config.prod.js 打包

#### mode 
告知webpack对不同的环境进行内置处理，并且会将**process.env.NODE_ENV**修改为对应的值（development | production）

```
mode: 'development'（开发） | 'production'（生产）
```


#### devtool
用于生成**source map**
> source map主要是对压缩过、合并过的js文件进行记录，否则报错信息无法直观的体现出来，比如第几行，因为压缩过后报错会是压缩后的报错行数
```
// 不同的值 对于构建速度会有影响
// 生产环境中 我们指定为 none，能够极大的提高构建速度
// 开发环境中 使用 cheap-eval-source-map 转换过后的代码
```

#### ouput 
```
output: {

       /**
         * hash 每次打包hash都会变，不利于缓存
         * chunkhash 能解决hash问题，但是样式文件是在js中的，在打包后js文件hash一致，任一改变都会造成hash失效
         * conetnethash 针对内容进行hash打包，改变内容才会修改hash
        */
        
        filename: '[name].[contenthash:8].js',
        // 按需加载分割的chunk块
        chunkFilename: 'js/[name].[contenthash:8].chunk.js'
    },
```

#### stats

统计信息，在打包后只展示有用信息，如时间 大小 名称 hash等。
对于 webpack-dev-server，这个属性要放在 devServer 对象里。

```
stats: {
        // 资源信息
        assets: true,
        // 构建日期和构建时间信息
        builtAt: true,
        // 构建模块信息
        modules: false,
        // 通过对应的 bundle 显示入口起点
        entrypoints: true
    }
```

### 生产环境的基本配置已经完了，可以打包后，咱们在去配置开发环境

####  main.js 配置vue

```
import Vue from 'vue'
import Router from '@/router/config'
import Store from '@/store/config'
import App from './App.vue'

new Vue({
  el: '#root',
  router: Router,
  store: Store,
  render: h => h(App)
})

```
#### App.vue

```
<template>
  <div class='test-wrapper'>
    // 指定路由试图
    <router-view></router-view>
  </div>
</template>
```
在view下 分别创建home、test文件













































#### 配置路由

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// webpack import  按需加载
let Home = () => import('@/view/home')
let Test = () => import('@/view/test')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/test',
      component: Test
    }
  ]
})

```

#### 配置vuex

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    count({ count }) {
      return count
    }
  },
  mutations: {
    setCount(state, num) {
      state.count += num
    }
  },
  actions: {}
})

```

都已经配置好了，我们来打包
在package.json中 script 添加指令
```language
    'build': 'webpack --config build/webpack.config.prod.js',
    // 命令行
    npm run build

```

![](http://yuanhao-web.cn/server/uploads/webpack-1-build.png)

看到此信息 就说明打包成功啦，从信息可以看到  构建时间、文件名、大小等基本信息

#### 验证

如何直接打开html会找不到资源的，因为你打开html看到 script src属性的路径是根路径，怎么办呢？那就起个node服务

#### express

```
cnpm i -D express

// 根目录下 新增server.js
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
    let html = fs.readFileSync(
        path.resolve(__dirname, './dist/template.html'),
        'utf-8'
    )
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})

app.listen(3000, () => {
    console.log('start ...  3000')
})

```
 
ok，如果你已经看到hello world 代表已经成功了

---

### 开发环境搭建

开发环境配置就很简单了 使用了插件devServer,而且webpack也已经配置好了





























#### devServer

```
 devServer: {
        contentBase: '../dist',
        // history 路由必须指定该参数  否则刷新页面404，指定后 无论哪个路径都返回html文件
        historyApiFallback: true,
        host: '0.0.0.0',
        overlay: true,
        open: true,
        port: 3000,
        quiet: false,
        hot: true,
        stats: 'errors-only'
    },
```

#### output

```
output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].chunk.js'
    }
```

#### devtool

```
 devtool: '#cheap-source-map',
```

在开发环境中使用了一个语法高亮的插件 friendly-errors-webpack-plugin

配置package.json

```
    'scripts': {
        'test': 'echo 'Error: no test specified' && exit 1',
        'build': 'webpack --config build/webpack.config.prod.js',
        'start': 'webpack-dev-server --config build/webpack.config.dev.js'
    },
```

npm start  

ok 基础的webpack 配置vue完成，下一篇将会写优化篇，比如eslint配置、让人头疼的打包速度的优化等


github 地址：[webpack基础（1）代码](https://github.com/yuanhaoaaa/--webpack-1-)
