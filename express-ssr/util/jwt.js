const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// 生成 jwt
exports.sign = promisify(jwt.sign);

// 验证 jwt
exports.verify = promisify(jwt.verify);
