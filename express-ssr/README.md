## 服务端渲染
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Conduit</title>
    <link href="/node_modules/ionicons/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/public/css/main.css">
</head>
<body>
<!-- 头部 -->
{{include './head.art'}}
<!-- 中间内容 -->
{{block 'body'}}

{{/block}}

<!-- 底部 -->
{{include './footer.art'}}

</body>
</html>
```

## 第三方插件

1. [art-template](https://aui.github.io/art-template/zh-cn/docs/)

2. [express-art-template](https://aui.github.io/art-template/express/)

3. [errorhandler](http://expressjs.com/en/resources/middleware/errorhandler.html)

4. [express-session](https://github.com/expressjs/session)

5. [connect-mongo](https://github.com/jdesboeufs/connect-mongo)

    ```javascript
    // app.js
    const session = require('express-session')
    const MongoStore = require('connect-mongo');
    const { sessionSecret } = require('./config/config.default')
    const { dbUri } = require('./config/config.default')

    // 配置使用 Session 中间件
    app.use(session({
        secret: sessionSecret,  // 签发 session id 的密钥
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 过期时间，单位毫秒
            // secure: true // 只有 https协议才会收发cookie
        }, // 保存 session id 的Cookie设置
        store: MongoStore.create({
            mongoUrl: dbUri
        })  // 将数据持久化到 MonogoDB 数据库中
    }))

    ```

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


3. 服务端渲染处理表单

    ```
    表单提交：
                        
    1. 同步提交 （早期的web常用的方式）
        <form action="register" method="POST">
        提交到/register

        数据格式：application/x-www-form-urlencoded

        需要表单元素有name字段

    2. 异步提交 （随着ajax的诞生大量使用）

        jQuery + 客户端模板引擎

        vue.js 当作一个库来使用
    ```

    ```html
    // 表单同步提交

    {{if errors}}
        <ul class="error-messages">
            {{each errors}}
                <li>{{$value}}</li>
            {{/each}}
        </ul>

    {{/if}}

    <form action="register" method="POST">
        {{if !isLogin}}
            <fieldset class="form-group">
                <input name="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
        {{/if}}
        
        <fieldset class="form-group">
            <input name="email" class="form-control form-control-lg" type="text" placeholder="Email">
        </fieldset>
        <fieldset class="form-group">
            <input name="password" class="form-control form-control-lg" type="password" placeholder="Password">
        </fieldset>
        <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin ? 'Sign in' : 'Sign up'}}
        </button>
    </form>


    // 异步提交代码

    <div class="auth-page" id="login">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <a href="">Have an account?</a>
                    </p>

                    <ul class="error-messages">
                        <li v-for="(error , index) in errors" :key="index">{% error.msg %}</li>
                    </ul>
                    
                    <form @submit.prevent="handleSubmit">
                        {{if !isLogin}}
                            <fieldset class="form-group">
                                <input v-model="user.username" name="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                            </fieldset>
                        {{/if}}
                        
                        <fieldset class="form-group">
                            <input v-model="user.email" name="email" class="form-control form-control-lg" type="text" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.password" name="password" class="form-control form-control-lg" type="password" placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                        {{isLogin ? 'Sign in' : 'Sign up'}}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
    {{/block}}

    {{block 'script'}}
    <script>
    ;(()=>{
        const app = new Vue({
            el:'#login',
            data:{
                user:{
                    username:'',
                    email:'',
                    password:''
                },
                errors:[]
            },
            methods:{
                async handleSubmit(){
                    // 客户端表单验证
                    console.log('submit')
                    if(!this.user.email){
                        //console.log(this.$message)
                        //this.$message.error('邮箱不能为空');
                    }
                    // 验证通过，提交表单
                    try{
                        const { data } = await axios.post('/register',{
                            user:this.user
                        })

                        // 清除错误信息
                    this.errors = []

                    // 跳转到首页
                    window.location.href = '/'
                    }catch(err){
                        if(err.response.status === 400){
                            this.errors = err.response.data.errors
                        }
                    }
                }
            }
        })
    })()
    </script>
    {{/block}}
    ```
