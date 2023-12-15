/*
 * @Description: 路由鉴权
 * @Author: breeze1307
 * @Date: 2023-12-14 14:53:05
 * @LastEditTime: 2023-12-15 14:19:20
 * @LastEditors: breeze1307
 */
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import pinia from '@/store/index'
import setting from '@/setting'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 设置网页标签标题
  document.title = `${setting.title} - ${to.meta.title}`
  // 访问路由之前触发
  nprogress.start()
  // 已登录
  if (userStore.token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (userStore.username) {
        next()
      } else {
        try {
          // 没有用户名、获取用户名，成功后跳转
          await userStore.userInfo()
          next()
        } catch (error: any) {
          ElNotification({
            type: 'error',
            message: error,
          })
          // token过期
          // 用户手动修改了token
          // 退出登录
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  // 跳转之后触发
  nprogress.done()
})
