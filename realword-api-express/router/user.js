const express = require('express')
const router = express.Router()
const contro = require('../controller/user')

// 用户登录
router.post('/users/login', contro.login)

// 用户注册
router.post('/users', contro.register)

// 获取用户
router.get('/user', contro.getCurrentUser)


// 更新注册
router.put('/user', contro.updateCurrentUser)

module.exports = router
