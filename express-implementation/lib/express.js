/**
 * 模拟express的get和listen方法
 */
const App = require('./application')

function createApplication() {
    const app = new App()
    return app
}

module.exports = createApplication
