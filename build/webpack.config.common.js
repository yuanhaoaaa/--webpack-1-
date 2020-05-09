const path = require('path')

// 将打包好的资源放入指定html模板中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将不需要打包的资源 放入到指定目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 每次打包前，清除dist目录
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const resolve = pathname => path.resolve(__dirname, pathname)
// vue-loader 需要引入
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        app: resolve('../src/main.js')
    },
    output: {
        path: resolve('../dist'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': resolve('../src')
        },
        extensions: ['.js', '.vue', '.less']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 忽略node_modules文件，提升时间
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(le|c)ss$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
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
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'test',
            template: resolve('../public/template.html'),
            filename: 'template.html'
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
}