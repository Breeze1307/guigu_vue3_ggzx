/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 14:19:21
 * @LastEditTime: 2023-11-29 15:26:52
 * @LastEditors: breeze1307
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import './assets/js/iconfont.js'
import SvgIcon from '@/components/SvgIcon.vue'
import '@/styles/index.scss'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})

app.component('SvgIcon', SvgIcon)
app.mount('#app')
