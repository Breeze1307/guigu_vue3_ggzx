/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:39:12
 * @LastEditTime: 2023-12-15 11:18:48
 * @LastEditors: breeze1307
 */
import express from 'express'

const userRouter = express.Router()
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}
userRouter.post('/user/login', (req, res) => {
  const { username, password } = req.body

  const checkUser = createUserList().find((item) => {
    return item.username === username && item.password === password
  })

  if (!checkUser) {
    res.json({
      code: 201,
      data: {
        message: '账号或者密码不正确',
      },
    })
  } else {
    const token = checkUser?.token
    res.json({
      code: 200,
      data: {
        token,
      },
    })
  }
})

userRouter.get('/user/info', (req, res) => {
  const token = req.headers.token
  const checkUser = createUserList().find((item) => {
    return item.token === token
  })
  if (!checkUser) {
    res.json({
      code: 201,
      data: {
        message: '获取用户信息失败',
      },
    })
  } else {
    res.json({
      code: 200,
      data: {
        checkUser,
      },
    })
  }
})
export default userRouter
