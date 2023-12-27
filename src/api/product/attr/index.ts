/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-21 17:23:06
 * @LastEditTime: 2023-12-27 16:17:29
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type { CategoryResponse, AttrResponseData, Attr } from './type'
// 一级分类接口
export const reqCategory1 = () =>
  request.get<any, CategoryResponse>('/admin/product/getCategory1')

// 二级分类接口
export const reqCategory2 = (id: number | string) =>
  request.get<any, CategoryResponse>(`/admin/product/getCategory2/${id}`)

// 三级分类接口
export const reqCategory3 = (id: number | string) =>
  request.get<any, CategoryResponse>(`/admin/product/getCategory3/${id}`)

// 属性列表
export const reqAttrInfoList = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    `/admin/product/attrInfoList/${c1Id}/${c2Id}/${c3Id}`,
  )
// 添加/修改属性
export const reqSaveAttrInfo = (data: Attr) =>
  request.post<any, any>('/admin/product/saveAttrInfo', data)
// 删除属性
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, any>(`/admin/product/deleteAttr/${attrId}`)
