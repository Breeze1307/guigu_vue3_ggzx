/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:26:47
 * @LastEditTime: 2023-12-01 10:02:23
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type'
// 登录接口
export const login = (data: loginForm) =>
  request.post<any, loginResponseData>('/user/login', data)
// 获取用户信息
export const getUserInfo = () =>
  request.get<any, userResponseData>('/user/info')
