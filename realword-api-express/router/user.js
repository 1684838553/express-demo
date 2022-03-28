const express = require("express");
const router = express.Router();
const contro = require("../controller/user");
const { User } = require("../model");
const userValidator = require("../validator/user");

// 用户登录
router.post("/users/login", userValidator.login, contro.login);

// 用户注册
router.post(
  "/users",
  userValidator.register,
  contro.register // 通过验证，执行具体的控制器处理
);

// 获取用户
router.get("/user", contro.getCurrentUser);

// 更新注册
router.put("/user", contro.updateCurrentUser);

module.exports = router;
