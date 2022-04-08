## 第三方插件

1. [art-template](https://aui.github.io/art-template/zh-cn/docs/)

2. [express-art-template](https://aui.github.io/art-template/express/)

3. [errorhandler](http://expressjs.com/en/resources/middleware/errorhandler.html)

## 知识点

1. 托管静态资源

    ```javascript
    const path = require('path')

    //express 单独提供了一个内置中间件：托管静态资源

    // 访问的时候不加前缀
    app.use(express.static('./public'))  // 访问路径：localhost:3000/js/main.js

    // 加上访问前缀
    app.use('/public',express.static('./public'))  // 访问路径：localhost:3000/public/js/main.js
    app.use(express.static('./node_modules'))

    // express.static()中路径最好时绝对路径，相对启动该项目时，node命令执行的目录

    // 绝对路径
    app.use(express.static(path.join(__dirname,'./public')),{
        index:false // 不会默认渲染public中的index文件，不加改配置，会默认渲染index
        // index:['index.html']  // 默认渲染数组中的文件，可配置多个
    })
    ```

2. 页面中的静态资源路径问题

    `<link rel="stylesheet" href="//demo.productionready.io/main.css">`

- 绝对url地址 `http://example.com/main.css`

- 相对地址 `../public/css/main.css`

    在file协议中，相当于当前文件
    在http协议中，相当于当前网页的url地址
