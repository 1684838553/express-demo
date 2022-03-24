const express = require('express')
const app = express()
const router = require('./route')

// 配置解析表单请求体：application/json
app.use(express.json())

// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded())


// 挂载路由
app.use(router)

// 挂载路由，路由由/list开头
// app.use('/list', router)

// 通常会在所有路由之后配置处理404的内容
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})

// 错误处理中间件,在所有的中间件之后挂载错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`)
})
