/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-05 17:00:50
 * @LastEditTime: 2023-12-25 20:50:33
 * @LastEditors: breeze1307
 */
import { RouteRecordRaw } from 'vue-router'
import { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 路由列表类型
  username: string
  avatar: string
}
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
  c2Arr: CategoryObj[]
  c2Id: number | string
  c3Arr: CategoryObj[]
  c3Id: number | string
}
