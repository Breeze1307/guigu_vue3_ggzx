/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-01 15:28:07
 * @LastEditTime: 2023-12-12 14:42:57
 * @LastEditors: breeze1307
 */

// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon.vue'
import { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

interface globalComponents {
  [key: string]: Component // 这是索引签名的语法，表示可以使用任意字符串键作为对象的键,值为Component类型或其子类型
}

const allGlobalComponent: globalComponents = { SvgIcon }

// 对外暴露插件对象
export default {
  // 必须为install，里面包含app应用实例，可以用于注册组件
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key: string) => {
      // 注册全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 注册element中的全部图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
