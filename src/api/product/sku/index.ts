/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-02-21 19:40:18
 * @LastEditTime: 2024-02-22 15:38:14
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import { SkuInfoData,SkuDetail } from './type'
// 获取sku列表
export const reqSkuDataList = (page: number, limit: number) =>
  request.get<any, SkuInfoData>(`/admin/product/list/${page}/${limit}`)
// sku上下架
export const reqUpdateSale = (skuId: number, isSale: boolean) => {
  // isSale为真，请求下架接口
  if (isSale) {
    return request.get<any,any>(`/admin/product/cancelSale/${skuId}`)
  } else {
    return request.get<any,any>(`/admin/product/onSale/${skuId}`)
  }
}
// 获取sku详细信息
export const reqSkuInfo=(skuId:number) =>
  request.get<any, SkuDetail>(`/admin/product/getSkuInfo/${skuId}`)
// 删除sku
export const reqRemoveSku = (skuId: number) => 
  request.delete<any,any>(`/admin/product/deleteSku/${skuId}`)