/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-04 17:29:39
 * @LastEditTime: 2023-12-18 17:04:26
 * @LastEditors: breeze1307
 */
import { defineStore } from 'pinia'
// 登录接口
import { login, getUserInfo, logOut } from '@/api/user'
// 参数类型
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type'
// state类型
import type { useState } from '@/store/types/types'
// token函数
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 路由列表
import { constantRoute } from '@/router/routes'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): useState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      // 登录请求
      let result: loginResponseData = await login(data)
      // 存储token
      if (result.code == 200) {
        this.token = result.data as string
        // 本地存储
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        // 返回错误值
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      let result: userResponseData = await getUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result = await logOut()
      if (result.code == 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
