const express = require("express");

const router = express.Router();

// // 用户相关路由
// router.use(require("./user"));

// // 用户资料相关路由
// router.use("/profiles", require("./profile"));
router.get('/',(req,res)=>{
    res.render('index.art')
})
module.exports = router;
