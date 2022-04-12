// 路由路径匹配

const pathRegxp = require('path-to-regexp')

function Layer(path, handler) {
    this.path = path
    this.handler = handler
    this.keys = []
    this.regexp = pathRegxp(path, this.keys, {})
    this.params = {}
}

Layer.prototype.match = function (pathname) {
    // exec 路由分组
    const match = this.regexp.exec(pathname)
    // 处理动态传参时,req.params
    // keys 是动态参数的对象集合 [{name:'userId',optional:false,offset:8}]
    // match 从索引为1开始是动态参数
    if (match) {
        this.keys.forEach((key, index) => {
            this.params[key.name] = match[index + 1]
        })
        return true
    }

    if (this.isUserMiddleware) {
        if (this.path === '/') {
            return true
        }
        if (pathname.startsWith(`${this.path}/`)) {
            return true
        }
    }
    return false
}
module.exports = Layer
