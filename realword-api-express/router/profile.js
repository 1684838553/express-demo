const express = require('express')
const router = express.Router()
const contro = require('../controller/profile')

// 获取用户资料
router.get('/:username', contro.getUserByName)

// 关注用户
router.post('/:username/follow', contro.focusUser)

// 取消关注用户
router.delete('/:username/follow', contro.cancelUser)

module.exports = router
