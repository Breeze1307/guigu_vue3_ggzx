/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-01 15:05:42
 * @LastEditTime: 2023-12-12 14:48:12
 * @LastEditors: breeze1307
 */
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录', hidden: true, icon: 'HomeFilled' },
  },
  {
    // 首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: { title: '布局页面', hidden: false },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', hidden: false, icon: 'HomeFilled' },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: { title: '404', hidden: true, icon: 'HomeFilled' },
  },
  {
    // 任意路由，匹配不到路由重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: { title: '任意路由', hidden: true, icon: 'HomeFilled' },
  },
]
