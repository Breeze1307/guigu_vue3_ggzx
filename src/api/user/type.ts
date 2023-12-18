/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:27:09
 * @LastEditTime: 2023-12-18 16:47:22
 * @LastEditors: breeze1307
 */
// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string
  password: string
}
// 定义全部接口返回数据类型
interface ResponseData{
  code: number,
  message: string,
  ok:boolean
}
// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}
// 定义服务器返回用户信息相关的数据类型
export interface userResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar:string
  }
}
