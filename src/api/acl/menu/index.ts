/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-03-07 10:03:32
 * @LastEditTime: 2024-03-07 17:34:34
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type { MenuResData,MenuParams } from './type'
// 获取菜单全部数据
export const reqAllMenu = () =>
  request.get<any, MenuResData>('/admin/acl/permission')
// 添加or更新菜单
export const reqAddOrUpdateMenu = (data:MenuParams) => {
    if (data.id) {
      return request.put<any,any>('/admin/acl/permission/update',data)  
    } else {
      return request.post<any,any>('/admin/acl/permission/save',data)
    }
}
// 递归删除菜单
export const reqRemoveMenu = (id:number) =>
    request.delete<any,any>(`/admin/acl/permission/remove/${id}`)