/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:26:47
 * @LastEditTime: 2024-02-23 17:46:43
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
  UserInfoList,
  UserInfo,
  AllRoleInfo,
} from '@/api/user/type'
// 登录接口
export const login = (data: loginForm) =>
  request.post<any, loginResponseData>('/admin/acl/index/login', data)
// 获取用户信息
export const getUserInfo = () =>
  request.get<any, userResponseData>('/admin/acl/index/info')
// 退出登录
export const logOut = () => request.post<any, any>('/admin/acl/index/logout')
// 用户列表获取
export const reqUserList = (page: number, limit: number, username: string) =>
  request.get<any, UserInfoList>(`/admin/acl/user/${page}/${limit}`, {
    params: { username },
  })
// 用户新增或修改
export const reqUserAddOrUpdate = (data: UserInfo) => {
  if (data.id) {
    return request.put<any, any>('/admin/acl/user/update', data)
  } else {
    return request.post<any, any>('/admin/acl/user/save', data)
  }
}
// 用户角色信息
export const reqUserRole = (userId: number) =>
  request.get<any, AllRoleInfo>(`/admin/acl/user/toAssign/${userId}`)
