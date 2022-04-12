const express = require('./index')
const app = express()

// 实现多个处理函数的路由中间件功能
// app.get("/", (req, res, next) => {
//     console.log('/1')
//     next()
// }, (req, res, next) => {
//     console.log('/2')
//     next()
// }, (req, res, next) => {
//     console.log('/3')
//     next()
// })

// app.get("/", async (req, res) => {
//     res.end('get /')
// })

// app.get("/aa", async (req, res) => {
//     res.end('hello aa')
// })

// app.get("/a?a", async (req, res) => {
//     res.end('a?a')
// })

// app.get("/a+bc", async (req, res) => {
//     res.end('a+bc')
// })

// app.post("/about", async (req, res, next) => {
//     console.log('hello about')
//     // res.send('hello about')
//     next()
// })

// app.post("/about", async (req, res, next) => {
//     console.log('hello about2')
//     // res.send('hello about2')
//     next()
// })

// app.post("/about", async (req, res, next) => {
//     res.end('hello about3')
//     // next()
// })

// app.post("/about/:userId/cate/:cateId", async (req, res) => {
//     console.log(req.params)
//     res.end('about/:userId/cate/:cateId')
// })

// app.put("/about", async (req, res) => {
//     res.end('hello about')
// })

app.use('/', function (req, res, next) {
    console.log('11111')
    next()
}, function (req, res, next) {
    res.end('hello 111')
})

// console.log(app._router)

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
})
