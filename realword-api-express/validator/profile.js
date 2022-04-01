const { body } = require("express-validator");
const validate = require("../middleware/vaildate");
const { User, Article } = require("../model");

exports.createAticle = validate([
    body("article.title").notEmpty().withMessage("标题不能为空"),
    body("article.description").notEmpty().withMessage("描述不能为空"),
    body("article.body").notEmpty().withMessage("内容不能为空"),
    // body("article.author").notEmpty().withMessage("作者不能为空"),
])

exports.getArticle = validate([
    validate.isValidObjectId(['params'], 'articleId')
])

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

exports.deleteArticle = exports.updateArticle
