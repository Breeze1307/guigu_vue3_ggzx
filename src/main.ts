/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 14:19:21
 * @LastEditTime: 2023-12-01 16:29:44
 * @LastEditors: breeze1307
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import './assets/js/iconfont.js'
import '@/styles/index.scss'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
// 引入路由并注册
import router from '@/router'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})
// 安装自定义插件
app.use(globalComponent)
app.use(router)
app.mount('#app')
