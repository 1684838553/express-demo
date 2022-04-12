// 将express的get和listen方法express的get和listen方法抽离出来，以便维护

const http = require('http')
const Router = require('./router')
const methods = require('methods')

function App() {
    this._router = new Router()
    // this.routes = []
}

methods.forEach(method => {
    App.prototype[method] = function (path, ...handlers) {
        this._router[method](path, handlers)
    }
})


// App.prototype.get = function (path, handler) {
//     this._router.get(path, handler)
//     // this.routes.push({
//     //     path,
//     //     method: 'get',
//     //     handler
//     // })
// }

App.prototype.use = function (path, ...handlers) {
    this._router.use(path, handlers)
}

App.prototype.listen = function (...args) {
    const server = http.createServer((req, res) => {
        this._router.handler(req, res)
        // const { pathname } = url.parse(req.url)
        // const method = req.method.toLocaleLowerCase()
        // const route = this.routes.find(route => route.path === pathname && route.method === method)
        // if (route) {
        //     return route.handler(req, res)
        // }
        // res.end("404 Not Found.")
    })
    server.listen(...args)
}

module.exports = App
