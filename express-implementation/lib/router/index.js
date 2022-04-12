const url = require('url')
const methods = require('methods')
const pathRegxp = require('path-to-regexp')
const Layer = require('./layer')
const Route = require('./route')
const { type } = require('os')

function Router() {
    // 存储路由记录
    this.stack = []
}

// 适配常见的请求方法
methods.forEach(method => {
    Router.prototype[method] = function (path, handlers) {
        const route = new Route()
        const layer = new Layer(path, route.dispatch.bind(route))
        this.stack.push(layer)
        route[method](path, handlers)
        // const layer = new Layer(path, handler)
        // layer.method = method
        // this.stack.push(layer)
    }
})

Router.prototype.use = function (path, handlers) {
    if (typeof path === 'function') {
        handlers.unshift(path) // 将处理函数插入handlers数组最前面
        path = '/'
    }
    handlers.forEach(handler => {
        const layer = new Layer(path, handler)
        layer.isUseMiddleware = true
        this.stack.push(layer)
    })
}


Router.prototype.handler = function (req, res) {
    const { pathname } = url.parse(req.url)

    // 实现单个函数中间件功能,匹配相同路由
    let index = 0
    const next = () => {
        if (index >= this.stack.length) {
            return res.end(`Can not get ${pathname}`)
        }
        const layer = this.stack[index++]
        const match = layer.match(pathname)
        if (match) {
            req.params = req.params || {}
            Object.assign(req.params, layer.params)
        }

        // 顶层判断请求路径
        if (match) {
            // 顶层调用的handler是dispatch
            return layer.handler(req, res, next)
        }

        // 没有匹配到，继续遍历下一个
        next()
    }

    // 调用上面定义的next函数
    next()
}

module.exports = Router
