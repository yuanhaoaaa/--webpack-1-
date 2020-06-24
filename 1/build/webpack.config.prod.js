const merge = require('webpack-merge')
const config = require('./webpack.config.common.js')

module.exports = merge(config, {
    mode: 'production',
    devtool: 'none',
    output: {
        filename: '[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js'
    },
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
})
