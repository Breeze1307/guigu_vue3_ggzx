/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-03-05 10:21:51
 * @LastEditTime: 2024-03-06 11:24:17
 * @LastEditors: breeze1307
 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface roleInfo {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
export interface roleAllInfo extends ResponseData {
  data: {
    records: roleInfo[]
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
export interface permissionInfo {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: []
  select: boolean
}
export interface permissionData extends ResponseData {
  data: permissionInfo[]
}
