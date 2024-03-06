/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-03-05 10:21:27
 * @LastEditTime: 2024-03-06 16:40:39
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type { roleAllInfo, roleInfo, permissionData } from '@/api/acl/role/type'
// 请求所有职位列表
export const reqAllRoleList = (page: number, limit: number, keyword: string) =>
  request.get<any, roleAllInfo>(
    `/admin/acl/role/${page}/${limit}/?roleName=${keyword}`,
  )
// 添加/修改
export const reqAddOrUpdateRole = (data: roleInfo) => {
  if (data.id) {
    return request.put<any, any>('/admin/acl/role/update', data)
  } else {
    return request.post<any, any>('/admin/acl/role/save', data)
  }
}
// 权限信息
export const reqPermissionInfo = (roleId: number) =>
  request.get<any, permissionData>(`/admin/acl/permission/toAssign/${roleId}`)
// 权限分配请求
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>('/admin/acl/permission/doAssign', null, {
    params: { roleId: roleId, permissionId: permissionId.join(',') },
  })
// 删除
export const reqRemove = (id: number) =>
  request.delete<any, any>(`/admin/acl/role/remove/${id}`)
