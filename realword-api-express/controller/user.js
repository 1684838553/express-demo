const { User } = require("../model");

// 用户登录
exports.login = async (req, res, next) => {
  try {
    res.send("获取用户");
  } catch (err) {
    next(err);
  }
};

// 用户注册
exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body.user);

    // 保存到数据库
    await user.save();

    // 发送更成功响应
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// 获取用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send("获取用户");
  } catch (err) {
    next(err);
  }
};

// 更新注册
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send("更新注册");
  } catch (err) {
    next(err);
  }
};
