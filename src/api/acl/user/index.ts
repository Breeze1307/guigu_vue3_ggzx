/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-30 09:26:47
 * @LastEditTime: 2024-03-05 10:33:29
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type {
  UserInfoList,
  UserInfo,
  AllRoleInfo,
  assignRoleData,
} from '@/api/acl/user/type'
// 用户列表获取
export const reqUserList = (page: number, limit: number, username: string) =>
  request.get<any, UserInfoList>(`/admin/acl/user/${page}/${limit}`, {
    params: { username },
  })
// 用户新增或修改
// user can beer
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
// 分配角色
export const reqAssignRole = (data: assignRoleData) =>
  request.post<any, any>('/admin/acl/user/doAssignRole', data)
// 单个用户删除
export const reqRemove = (id: number) =>
  request.delete<any, any>(`/admin/acl/user/remove/${id}`)
// 批量用户删除
export const reqBatRemove = (idList: number[]) =>
  request.delete('/admin/acl/user/batchRemove', { data: idList })
