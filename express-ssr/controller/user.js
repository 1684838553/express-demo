const { User } = require('../model')

exports.showLogin = async (req, res, next) => {
  try {
    res.render('login', {
      isLogin: true
    })
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = req.user

    req.session.user = user

    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

exports.showRegister = async (req, res, next) => {
  try {
    res.render('login')
  } catch (err) {
    next(err)
  }
}

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body.user)
    await user.save()

    // 保存登录状态
    console.log(user, 'user')
    req.session.user = user

    res.status(200).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

exports.showSettings = async (req, res, next) => {
  try {
    res.render('settings')
  } catch (err) {
    next(err)
  }
}

exports.showProfile = async (req, res, next) => {
  try {
    res.render('profile')
  } catch (err) {
    next(err)
  }
}

exports.logout = async (req, res) => {
  try {
    req.session.user = null
    res.redirect('/')
  } catch (err) {
    next(err)
  }
}
