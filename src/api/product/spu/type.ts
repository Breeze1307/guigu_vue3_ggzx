import exp from 'constants'

/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-28 10:25:34
 * @LastEditTime: 2023-12-29 10:26:46
 * @LastEditors: breeze1307
 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface TrademarkData extends ResponseData {
  data: Trademark[]
}
export interface SaleAttr {
  id: number
  name: string
}
export interface SaleAttrData extends ResponseData {
  data: SaleAttr[]
}
