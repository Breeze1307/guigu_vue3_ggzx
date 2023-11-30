/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-28 19:48:50
 * @LastEditTime: 2023-11-30 14:04:34
 * @LastEditors: breeze1307
 */
import express from 'express'
let app = express()
// 使用中间件解析json请求体
app.use(express.json())
import router from './MockServer/api.ts'
import userRouter from './MockServer/user.ts'

// app.use('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     res.header("Access-Control-Allow-Headers","Content-Type")
//     next()
// })
app.use(router)

app.use(userRouter)

app.listen('8090', () => {
  console.log('监听8090端口')
})
