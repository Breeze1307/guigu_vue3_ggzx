/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-04 17:29:39
 * @LastEditTime: 2023-12-05 17:26:51
 * @LastEditors: breeze1307
 */
import { defineStore } from 'pinia'
// 登录接口
import { login } from '@/api/user'
// 参数类型
import type { loginForm, loginResponseData } from '@/api/user/type'
// state类型
import type { useState } from '@/store/types/types'
// token函数
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): useState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      // 登录请求
      let result: loginResponseData = await login(data)
      // 存储token
      if (result.code == 200) {
        this.token = result.data.token as string
        // 本地存储
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        // 返回错误值
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
