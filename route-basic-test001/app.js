const express = require('express')
const app = express()
const { getDB, saveDB } = require('./db')

// 配置解析表单请求体：application/json
app.use(express.json())

// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded())


app.get("/", async (req, res) => {
    try {
        const data = await getDB()
        res.status(200).json(data.data)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

})

app.get("/list/:id", async (req, res) => {
    try {
        const data = await getDB()
        const item = data.data.find(item => item.category_id === req.params.id)
        if (!item) {
            return res.status(404).end('数据不存在')
        }
        res.status(200).json(item)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

})

app.post("/list", async (req, res) => {
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
        res.status(500).json({
            error: err.message
        })
    }

})

app.put("/list/:id", async (req, res) => {
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
        res.status(500).json({
            error: err.message
        })
    }
})

app.delete("/list/:id", async (req, res) => {
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
        res.status(204).end('删除成功')
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`)
})
