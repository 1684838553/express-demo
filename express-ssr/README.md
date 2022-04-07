## 项目目录

```
├─app.js
├─package.json
├─util  # 工具模块
├─router  # 路由
├─model  # 数据持久层
├─middleware # 非路由中间件
├─validator # 校验
├─controller  # 用于解析用户的输入，处理后返回相应的结果
├─config  # 配置文件
|   └config.default.js
```

## MongoDB Compass

![在这里插入图片描述](https://img-blog.csdnimg.cn/a1eb520f538e463d9b3e9bdebdecc5e4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAZHJ1bmvllrXlkqo=,size_20,color_FFFFFF,t_70,g_se,x_16)

## realword接口文档地址

- [realworld-docs](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)

## 第三方插件

- [日志打印](https://www.npmjs.com/package/morgan)

- [跨域](https://www.npmjs.com/package/cors)

- [mongoose](http://www.mongoosejs.net/docs/api.html)

- [表单校验](https://github.com/express-validator/express-validator)

  [文档](https://express-validator.github.io/docs/validation-chain-api.html)

  ```javascript
  const { body, validationResult } = require("express-validator");

  // 用户注册
  router.post(
    "/users",
    [
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
    ],
    (req, res, next) => {
      // 判断验证结果
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      next();
    },
    contro.register // 通过验证，执行具体的控制器处理
  );
  ```

- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## node 内置对象

- 密码加密

  ```javascript
  const crypto = require("crypto");

  module.exports = (str) => {
    return crypto.createHash("md5").update(str).digest("hex");
  };
  ```

## 中间件

- 验证用户信息

  ```javascript
  // 认证身份
  const { verify } = require('../util/jwt')
  const { jwtSecret } = require('../config/config.default')
  const { User } = require('../model')

  module.exports = (req, res, next) => {
      let token = req.headers.authorization

      token = token ? token.split('Bearer ')[1] : null

      if (!token) {
          return res.status(401).end()
      }

      try {
          const decodedToken = await verify(token, jwtSecret)
          // 验证token正确，返回用户信息
          req.user = await User.findById(decodedToken.userId)
          next()
      } catch (err) {
          return res.status(401).end()
      }
  }
  ```

## 知识点

1. Token

    ```javascript
    // 生成 token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret, {
      // 设置token的有效时间，不设置，默认永久有效
      expiresIn: 60 * 60 * 24  // 单位，s
    });
    ```

2. 列表查询

    ```javascript
    exports.getArticles = async (req, res, next) => {
        try {
            const {
                limit = 20,
                offset = 0,
                tag,
                author
            } = req.query

            const filter = {}

            // 根据参数查询
            if (tag) {
                filter.tagList = tag
            }

            // 这里的作者是指作者名
            if (author) {
                const user = await User.findOne({ username: author })
                filter.author = user ? user._id : null
            }

            // 总条数
            const articlesCount = await Article.countDocuments()

            // 分页
            const articles = await Article.find(filter)
                .skip(offset)  // 跳过多少条
                .limit(limit)   // 取多少条
                .sort({
                    // -1 倒序 1 正序
                    createdAt: -1
                })
            res.status(201).json({
                articles,
                articlesCount
            })
        } catch (err) {
            next(err)
        }
    }
    ```

3. 校验ID是否有效

    ```javascript
    exports.isValidObjectId = (localtion, fields) => {
      return buildCheckFunction(localtion)(fields).custom(async value => {
        if (!isValidObjectId(value)) {
          return Promise.reject('ID 不是一个有效的 ObjectID')
        }
      })
    }


    exports.updateArticle = [
        // 校验id是否正确
        validate([
            validate.isValidObjectId(['params'], 'articleId')
        ]),
        // 校验文章是否存在
        async (req, res, next) => {
            const articleId = req.params.articleId
            const article = await Article.findById(articleId)
            req.article = article
            if (!article) {
                return res.status(404).end()
            }
            next()
        },
        // 校验修改的文章作者是否是当前用户
        async (req, res, next) => {
            // req.user._id 是对象类型，转成字符串比较
            if (req.user._id.toString() !== req.article.author.toString()) {
                return res.status(403).end()
            }
            next()
        }
    ]
    ```
