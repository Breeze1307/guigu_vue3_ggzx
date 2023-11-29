/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-28 19:49:52
 * @LastEditTime: 2023-11-29 15:29:17
 * @LastEditors: breeze1307
 */
// 第一版文件读取，没有实现递归
import express from 'express'
import fs from 'fs'
import Mock from 'mockjs'
const router = express.Router()

function readfile(files) {
  // 遍历读取文件夹中的内容
  files.forEach((item, index) => {
    // 一个json文件就是一个请求
    router.all(`/${item.replace(/.json/, '')}`, function (req, res) {
      // 以utf-8格式读取json文件内容
      fs.readFile(`./MockServer/json/${item}`, 'utf-8', function (err, data) {
        if (err) console.log(err)
        else {
          // 以json对象返回数据
          res.json(Mock.mock(JSON.parse(data)))
        }
      })
    })
  })
}

// readdir读取目录下所有文件
fs.readdir('./MockServer/json', function (err, files) {
  if (err) {
    console.log(err)
    return false
  }
  files.forEach((el, elIndex) => {
    fs.stat('./MockServer/json/' + el, (errFile, stats) => {
      if (errFile) {
        console.log(err)
        return false
      }
      if (stats.isDirectory()) {
        console.log('stats', stats.isDirectory())
        fs.readdir(`./MockServer/json/${el}/`, (err, files) => {
          console.log('el', el)
          if (err) {
            console.log(err)
          } else {
            // 遍历读取文件夹中的内容
            files.forEach((item, index) => {
              console.log('file', item)
              // 一个json文件就是一个请求
              router.all(
                `/${el}/${item.replace(/.json/, '')}`,
                function (req, res) {
                  // 以utf-8格式读取json文件内容
                  fs.readFile(
                    `./MockServer/json/${el}/${item}`,
                    'utf-8',
                    function (err, data) {
                      if (err) console.log(err)
                      else {
                        // 以json对象返回数据
                        res.json(Mock.mock(JSON.parse(data)))
                      }
                    },
                  )
                },
              )
            })
          }
        })
      } else {
        readfile(files)
      }
    })
  })
})

export default router
