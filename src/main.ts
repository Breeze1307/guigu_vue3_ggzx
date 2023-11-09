import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})
app.mount('#app')
