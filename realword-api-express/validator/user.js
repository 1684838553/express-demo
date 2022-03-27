const { body } = require("express-validator");
const validate = require("../middleware/vaildate");

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
