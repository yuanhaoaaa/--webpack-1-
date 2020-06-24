const merge = require('webpack-merge')
const config = require('./webpack.config.common.js')
// devServer 语法高亮
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(config, {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: '#cheap-source-map',
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true,
        host: '0.0.0.0',
        overlay: true,
        open: true,
        port: 3000,
        quiet: false,
        hot: true,
        stats: 'errors-only'
    },
    plugins: [new FriendlyErrorsPlugin()]
})
