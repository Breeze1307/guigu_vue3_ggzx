/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-01 15:05:42
 * @LastEditTime: 2023-12-12 17:14:08
 * @LastEditors: breeze1307
 */
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: { title: '登录', hidden: true, icon: 'HomeFilled' },
  },
  {
    // 首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: { title: '布局页面' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'HomeFilled' },
      },
    ],
  },
  {
    // 数据大屏
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: { title: '数据大屏', icon: 'Platform' },
  },
  {
    // 权限管理
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限管理', hidden: false, icon: 'Lock' },
    children: [
      {
        // 用户管理
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: { title: '用户管理', hidden: false, icon: 'User' },
      },
      {
        // 角色管理
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: { title: '角色管理', hidden: false, icon: 'UserFilled' },
      },
      {
        // 菜单管理
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: { title: '菜单管理', hidden: false, icon: 'Grid' },
      },
    ],
  },
  {
    // 商品管理
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: { title: '商品管理', icon: 'Goods' },
    children: [
      {
        // 品牌管理
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: { title: '品牌管理', icon: 'ShoppingCartFull' },
      },
      {
        // 属性管理
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: { title: '属性管理', icon: 'ChromeFilled' },
      },
      {
        // spu管理
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: { title: 'spu管理', icon: 'Calendar' },
      },
      {
        // sku管理
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: { title: 'sku管理', icon: 'Orange' },
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
