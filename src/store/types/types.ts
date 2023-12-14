/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-05 17:00:50
 * @LastEditTime: 2023-12-14 10:43:49
 * @LastEditors: breeze1307
 */
import { RouteRecordRaw } from 'vue-router'
export interface useState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 路由列表类型
  username: string
  avatar: string
}
