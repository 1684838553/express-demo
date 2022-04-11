const express = require('express')
const router = express.Router()
const contro = require('../controller/profile')
const auth = require('../middleware/auth')
const profileValidator = require("../validator/profile");

router.get('/', contro.showHome)

router.get('/editor', auth, contro.showEditor)

router.get('/editor/:articleId', auth, contro.showEditor)

router.get('/article/:articleId', auth, contro.showArticle)

module.exports = router
