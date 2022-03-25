// 用户登录
exports.login = async (req, res, next) => {
    try {
        res.send('获取用户')
    } catch (err) {
        next(err)
    }
}

// 用户注册
exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        res.send('用户注册')
    } catch (err) {
        next(err)
    }
}

// 获取用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        res.send('获取用户')
    } catch (err) {
        next(err)
    }
}


// 更新注册
exports.updateCurrentUser = async (req, res, next) => {
    try {
        res.send('更新注册')
    } catch (err) {
        next(err)
    }
}
