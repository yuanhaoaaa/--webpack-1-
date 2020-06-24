const Vue = require('vue'),
    express = require('express'),
    renderer  = require('vue-server-renderer').createRenderer(),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    resolve = _path => path.resolve(__dirname, _path);

    vueInstance = new Vue({
        title: 'hello',
        template: `<div>我是{{test}}</div>`,
        data: {
            test: '测试实例'
        }
    })

    app.get('/home', (req, res) => {
        let context = {
            title: 'hello',
        }
        // 可接受Context
        renderer.renderToString(vueInstance, context).then(html => {
            let template = fs.readFileSync(resolve('./template/home.html'), 'utf-8')
            res.setHeader('Content-Type', 'text/html')
            res.send(template.replace('<!--vue-ssr-outlet-->', html))
        }).catch(err => {
            console.error(err)
        })
    })


    app.listen(3111, () => {
        console.log('start 3111')
    })