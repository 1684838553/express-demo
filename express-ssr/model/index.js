const mongoose = require("mongoose");
const { dbUri } = require("../config/config.default");
// 连接数据库
mongoose.connect(dbUri);

var db = mongoose.connection;

// 数据库连接失败
db.on("error", (err) => {
  console.log("MongoDB 数据库连接失败", err);
});

// 数据库连接成功
db.once("open", function () {
  console.log("MongoDB 数据库连接成功");
});

// 组织导出模型构造函数
module.exports = {
  User: mongoose.model("User", require("./user")),
  Article: mongoose.model("Article", require("./profile")),
};
