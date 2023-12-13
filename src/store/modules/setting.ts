/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-13 14:18:56
 * @LastEditTime: 2023-12-13 20:01:19
 * @LastEditors: breeze1307
 */
import { defineStore } from 'pinia'
let useLayoutStore = defineStore('Layout', {
  state: () => {
    return {
      fold: false,
      refresh: false,
      loading: false,
    }
  },
  actions: {
    // 折叠
    changeFold() {
      this.fold = !this.fold
    },
    // 刷新
    changeRefresh() {
      this.refresh = !this.refresh
    },
  },
})
export default useLayoutStore
