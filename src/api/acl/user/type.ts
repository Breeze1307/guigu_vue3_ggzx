/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:27:09
 * @LastEditTime: 2024-02-27 20:16:58
 * @LastEditors: breeze1307
 */
// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string
  password: string
}
// 定义全部接口返回数据类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}
// 定义服务器返回用户信息相关的数据类型
export interface userResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
// 用户信息数据类型定义
export interface UserInfo {
  id?: number
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
export interface UserInfoList extends ResponseData {
  data: {
    records: UserInfo[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
export interface RoleInfo {
  id: number
  roleName: string
  remark: null
}
export interface AllRoleInfo extends ResponseData {
  data: {
    assignRoles: RoleInfo[]
    allRolesList: RoleInfo[]
  }
}
export interface assignRoleData {
  roleIdList: number[]
  userId: number
}
