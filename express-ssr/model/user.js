const mongoose = require("mongoose");
const baseModel = require("./base-model");
const md5 = require("../util/md5");

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // 存入数据库中加密密码
    set: (value) => md5(value),
    // 查询时，不会查出该字段
    select: false,
  },
  // 个人介绍
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = userSchema;
