interface Response {
  code: number
  message: string
  ok: boolean
}
export interface Menu {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: Menu[]
}
export interface MenuResData extends Response {
  data: Menu[]
}
export interface MenuData {
  id?: number
  pid: number //父级id
  name: string
  code: string // 权限数值
  level: number // 几级菜单
  type: number // 菜单类型 1:菜单 2：按钮
}
