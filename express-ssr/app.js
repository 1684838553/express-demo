const express = require("express");
const app = express();
const path = require('path')
const router = require("./router/index");
const morgan = require("morgan");
const errorhandler = require('errorhandler')
require("./model/index");

// 配置解析表单请求体：application/json
app.use(express.json());

// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended:true
}));

// 当渲染以art结尾的资源文件时，使用express-art-template处理
app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
// 配置模板文件的存储目录
app.set('views', path.join(__dirname, 'views'));
// 可以省略的模板文件后缀名
app.set('view engine', 'art');


app.use('./public',express.static(path.join(__dirname,'./public')))  

// 日志输出
app.use(morgan("dev"));

// 挂载路由
app.use(router);

// 通常会在所有路由之后配置处理404的内容
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});
