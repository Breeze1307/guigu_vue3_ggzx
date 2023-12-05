/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:27:09
 * @LastEditTime: 2023-12-05 16:59:25
 * @LastEditors: breeze1307
 */
// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string
  password: string
}
interface dataType {
  token?: string
  message?: string
}
// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}
interface user {
  checkUser: {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
  }
}
// 定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number
  data: user
}
