// 获取用户资料
exports.getUserByName = async (req, res, next) => {
    try {
        res.send('获取用户资料')
    } catch (err) {
        next(err)
    }
}

// 关注用户
exports.focusUser = async (req, res, next) => {
    try {
        console.log(req.body)
        res.send('关注用户')
    } catch (err) {
        next(err)
    }
}

// 取消关注用户
exports.cancelUser = async (req, res, next) => {
    try {
        res.send('取消关注用户')
    } catch (err) {
        next(err)
    }
}

