const express = require("express");
const router = express.Router();
const contro = require("../controller/user");
const { User } = require("../model");
const userValidator = require("../validator/user");
const auth = require('../middleware/auth')
const noAuth = require('../middleware/no-auth')

router.get('/login', noAuth, contro.showLogin)

router.post('/login', noAuth, userValidator.login, contro.login)

router.get('/register', noAuth, contro.showRegister)

router.get('/logout', contro.logout)

router.post('/register', userValidator.register, contro.register)

router.get('/settings', auth, contro.showSettings)

router.get('/profile/:username', contro.showProfile)

router.get('/profile/:username/favorites', contro.showProfile)

module.exports = router;
