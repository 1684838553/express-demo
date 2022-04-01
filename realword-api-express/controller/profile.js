const { Article, User } = require("../model");

// 获取文章列表
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

// 获取用户关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
    try {
        console.log(req.body)
        res.send('获取用户关注的作者文章列表')
    } catch (err) {
        next(err)
    }
}

// 获取文章
exports.getArticlesBySulg = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId)
        if (!article) {
            return res.status(404).end()
        }
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}

// 创建文章
exports.postArticles = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id
        await Article.findOne({ title: article.title }).populate('author').exec()
        await article.save()

        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}

// 更新文章
exports.putArticle = async (req, res, next) => {
    try {
        const article = Object.assign(req.article, req.body.article)
        article.save()
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}

// 删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article
        await article.remove()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}

// 添加文章评论
exports.postArticlesComments = async (req, res, next) => {
    try {
        res.send('添加文章评论')
    } catch (err) {
        next(err)
    }
}

// 获取文章评论列表
exports.getArticlesComments = async (req, res, next) => {
    try {
        res.send('获取文章评论列表')
    } catch (err) {
        next(err)
    }
}

// 删除文章评论
exports.deleteArticleComment = async (req, res, next) => {
    try {
        res.send('删除文章评论')
    } catch (err) {
        next(err)
    }
}
