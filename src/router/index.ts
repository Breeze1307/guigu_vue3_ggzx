/*
 * @Description: 路由配置
 * @Author: breeze1307
 * @Date: 2023-12-01 14:26:09
 * @LastEditTime: 2023-12-01 15:19:12
 * @LastEditors: breeze1307
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'
let router = createRouter({
  // 路由模式：hash
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
