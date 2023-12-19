/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-19 09:55:03
 * @LastEditTime: 2023-12-19 17:00:54
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type { TrademarkResponseData, Trademark } from './types'
// 请求已有品牌
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    `/admin/product/baseTrademark/${page}/${limit}`,
  )
// 删除已有品牌
export const reqDeleteTrademark = (id: number) =>
  request.delete(`/admin/product/baseTrademark/remove/${id}`)
// 新增/修改品牌
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    request.put('/admin/cdoprtu/baseTrademark/update', data)
  } else {
    request.post('/admin/product/baseTrademark/save', data)
  }
}
