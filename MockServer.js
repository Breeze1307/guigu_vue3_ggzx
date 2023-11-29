/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-28 19:48:50
 * @LastEditTime: 2023-11-29 17:09:56
 * @LastEditors: breeze1307
 */
import express from 'express'
let app = express()
import router from './MockServer/api.js'

// app.use('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS")
//     res.header("Access-Control-Allow-Headers", "X-Requested-With")
//     res.header("Access-Control-Allow-Headers","Content-Type")
//     next()
// })
app.use(router)

app.listen('8090', () => {
  console.log('监听8090端口')
})
