const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    delete user.password;
    // 生成 token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret, {
      // 设置token的有效时间，不设置，默认永久有效
      expiresIn: 60 * 60 * 24
    });
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // user为mongoDB对象，字段不能用delete删除
    let user = new User(req.body.user);

    // 保存到数据库
    await user.save();

    // user为普通对象，字段能用delete删除
    user = user.toJSON();

    delete user.password;

    // 发送更成功响应
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// 获取用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
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
