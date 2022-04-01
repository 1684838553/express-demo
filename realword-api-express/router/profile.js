const express = require('express')
const router = express.Router()
const contro = require('../controller/profile')
const auth = require('../middleware/auth')
const profileValidator = require("../validator/profile");

// 获取文章列表
router.get('/', auth, contro.getArticles)

// 获取用户关注的作者文章列表
router.get('/feed', auth, contro.getFeedArticles)

// 获取文章
router.get('/articles/:articleId', profileValidator.getArticle, contro.getArticlesBySulg)

// 创建文章
router.post('/articles', auth, profileValidator.createAticle, contro.postArticles)

// 更新文章
router.put('/articles/:articleId', auth, profileValidator.updateArticle, contro.putArticle)

// 删除文章
router.delete('/articles/:articleId', auth, profileValidator.deleteArticle, contro.deleteArticle)

// 添加文章评论
router.post('/articles/:articleId/comments', auth, contro.postArticlesComments)

// 获取文章评论列表
router.get('/articles/:articleId/comments', auth, contro.getArticlesComments)

// 删除文章评论
router.delete('/articles/:articleId/comments/:id', auth, contro.deleteArticleComment)

module.exports = router
