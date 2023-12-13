/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-13 14:18:56
 * @LastEditTime: 2023-12-13 14:23:13
 * @LastEditors: breeze1307
 */
import { defineStore } from 'pinia'
let useLayoutStore = defineStore('Layout', {
  state() {
    return {
      fold: false,
    }
  },
})
export default useLayoutStore
