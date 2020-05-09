const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, './dist/template.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})

app.listen(3000, () => {
    console.log('start ...  3000')
})