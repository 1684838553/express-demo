const { body } = require("express-validator");
const validate = require("../middleware/vaildate");
const { User } = require("../model");
const md5 = require("../util/md5");

exports.register = validate([
  // 配置验证规则
  body("user.username").notEmpty().withMessage("用户名不能为空"),
  body("user.email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    // 前面规则校验失败，停止校验后面规则
    .bail()
    // 自定义校验
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
  body("user.password").notEmpty().withMessage("密码不能为空"),
]);

exports.login = [
  // 验证信息为数组，前面的验证通过，在校验后面的
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("user.email").custom(async (email, { req }) => {
      // 在userSchema 设置密码不能查询，在这单独查询
      const user = await User.findOne({ email }).select("password");
      if (!user) {
        return Promise.reject("邮箱不存在");
      }

      // 将数据挂载到请求对象中，后续中间件也能使用
      req.user = user;
    }),
  ]),
  validate([
    body("user.password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];
