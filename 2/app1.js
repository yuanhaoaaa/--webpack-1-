let express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    resolve = _path => path.resolve(__dirname, _path);


    app.get('/home', (req, res) => {
        let html = fs.readFileSync(resolve('./template/home.html'), 'utf-8') 
        getHomeData().then(resolve => {
            html = html.replace('<!--vue-ssr-outlet-->', `<div>${resolve.home}</div>`)
            res.setHeader('Content-Type', 'text/html')
            res.send(html)
        })
    })

    app.get('/comment', (req, res) => {
        let html = fs.readFileSync(resolve('./template/comment.html'), 'utf-8') 
        getComentData().then(resolve => {
            html = html.replace('<!--vue-ssr-outlet-->', `<div>${resolve.comment}</div>`)
            res.setHeader('Content-Type', 'text/html')
            res.send(html)
        })
    })


    app.listen(3111, () => {
        console.log('start 3111')
    })


    // 模拟home数据
    function getHomeData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    home: 'home 数据'
                })
            }, 500);
        })
    }

    // 模拟comment数据
    function getComentData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    comment: 'comment 数据'
                })
            }, 1000);
        })
    }