/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-28 19:48:50
 * @LastEditTime: 2023-12-15 18:07:37
 * @LastEditors: breeze1307
 */
import express from 'express'
// import cors from 'cors'
let app = express()
// 使用中间件解析json请求体
app.use(express.json())
// app.use(cors())

import router from './MockServer/api.ts'
import userRouter from './MockServer/user.ts'
app.use('*', function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,token',
  )
  next()
})
app.use(router)

app.use(userRouter)

app.listen('8090', () => {
  console.log('监听8090端口')
})
