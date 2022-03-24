const express = require('express')

const router = express.Router()
const { getDB, saveDB } = require('./db')

router.get("/", async (req, res, next) => {
    try {
        const data = await getDB()
        res.status(200).json(data.data)
    } catch (err) {
        // next() 往后匹配下一个中间件
        // next('route') 往后匹配当前中间件堆栈中的下一个

        // 跳过所有中间件，进入错误中间件
        // 错误中间件处理异常
        next(err)
    }

})

router.get("/list/:id", async (req, res, next) => {
    try {
        const data = await getDB()
        const item = data.data.find(item => item.category_id === req.params.id)
        if (!item) {
            return res.status(404).send('数据不存在')
        }
        res.status(200).json(item)
    } catch (err) {
        next(err)
    }

})

router.post("/list", async (req, res, next) => {
    try {
        // 1. 获取客户端请求体参数
        const item = req.body
        // 2. 数据校验
        if (!item.category_name) {
            return res.status(422).json({
                error: 'The filed category_name is required.'
            })
        }
        // 3. 数据校验通过，把数据存储到db中
        const data = await getDB()
        data.data.push(item)
        await saveDB(data)
        // 4. 发送响应
        res.status(201).json(item)
    } catch (err) {
        next(err)
    }

})

router.put("/list/:id", async (req, res, next) => {
    try {
        // 1. 获取客户端请求体参数
        const item = req.body
        // 2. 查找要修改的任务项
        const data = await getDB()
        const result = data.data.find(item => item.category_id === req.params.id)
        if (!result) {
            return res.status(404).json({
                error: '数据不存在'
            })
        }
        // 3. 合并对象
        console.log(Object.assign(result, item))
        await saveDB(data)
        // 4. 发送响应
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.delete("/list/:id", async (req, res, next) => {
    try {
        const data = await getDB()
        const index = data.data.findIndex(item => item.category_id === req.params.id)
        if (index === -1) {
            return res.status(404).json({
                error: '数据不存在'
            })
        }
        data.data.splice(index, 1)
        await saveDB(data)
        res.status(200).send('删除成功')
    } catch (err) {
        next(err)
    }
})


module.exports = router
