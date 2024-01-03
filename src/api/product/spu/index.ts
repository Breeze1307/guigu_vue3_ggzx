/*
 * @Description: SPU相关接口
 * @Author: breeze1307
 * @Date: 2023-12-28 10:25:27
 * @LastEditTime: 2024-01-02 15:49:33
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type {
  HasSpuResponseData,
  TrademarkData,
  SaleAttrData,
  SpuSaleAttrData,
  SpuImageData,
  SpuData,
} from './type'
// spu已有数据
export const reqSpuHas = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
  )
// 品牌列表
export const reqTrademarkList = () =>
  request.get<any, TrademarkData>(
    '/admin/product/baseTrademark/getTrademarkList',
  )
// 销售属性列
export const reqSaleAttr = () =>
  request.get<any, SaleAttrData>('/admin/product/baseSaleAttrList')
// spu图片列表
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuImageData>(`/admin/product/spuImageList/${spuId}`)
// spu销售属性列表
export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SpuSaleAttrData>(`/admin/product/spuSaleAttrList/${spuId}`)
// 添加or修改spu数据
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>('/admin/product/updateSpuInfo', data)
  } else {
    return request.post<any, any>('/admin/product/saveSpuInfo', data)
  }
}
