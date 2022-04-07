const express = require("express");
const app = express();
const router = require("./router/index");
const morgan = require("morgan");
const cors = require("cors");
const errorHandle = require("./middleware/error-handle");
require("./model/index");

// 配置解析表单请求体：application/json
app.use(express.json());

// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded());

// 日志输出
app.use(morgan("dev"));

// 为客户提供跨域资源请求
app.use(cors());

// 挂载路由
app.use("/api", router);

// 通常会在所有路由之后配置处理404的内容
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

// 错误处理中间件,在所有的中间件之后挂载错误处理中间件
app.use(errorHandle());

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});
