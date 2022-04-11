module.exports = async (req, res, next) => {
    // 检查有没有 Session User
    const sessionUser = req.session.user

    if (sessionUser) {
        return next()
    }

    // 重定向到登录页
    res.redirect('/login')
}
