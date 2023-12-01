/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-28 19:49:52
 * @LastEditTime: 2023-12-01 10:54:38
 * @LastEditors: breeze1307
 */
import express from 'express'
import fs from 'fs'
import Mock from 'mockjs'

const router = express.Router()
// 要读取的基础文件夹
let pubPath = './MockServer/json/'

readDir(pubPath)

function readDir(dirFather:string) {
  // 读取文件夹
  fs.readdir(dirFather, (err, files) => {
    if (err) {
      console.log(err)
      return false
    }
    // 遍历./MockServer/json/目录下的文件/文件夹
    files.forEach((uri) => {
      fs.stat(`${dirFather}${uri}`, (errFile, fileType) => {
        if (errFile) {
          console.log(err)
          return false
        }
        // 判断是否是文件夹，文件夹重新调用readDir()函数
        if (fileType.isDirectory()) {
          readDir(`${dirFather}${uri}/`)
        } else {
          router.all(
            // 访问路径中删除./MockServer/json/
            `/${dirFather.replace('./MockServer/json/', '')}${uri.replace(
              /.json/,
              '',
            )}`,
            function (_req, res) {
              // 以utf-8格式读取json文件内容
              fs.readFile(`${dirFather}${uri}`, 'utf-8', function (err, data) {
                if (err) console.log(err)
                else {
                  // 以json对象返回数据
                  res.json(Mock.mock(JSON.parse(data)))
                }
              })
            },
          )
        }
      })
    })
  })
}

export default router
