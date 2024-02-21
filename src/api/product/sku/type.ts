/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-02-21 19:43:08
 * @LastEditTime: 2024-02-21 19:56:07
 * @LastEditors: breeze1307
 */
interface ResponseData {
  code: number
  msg: string
  ok: boolean
}
export interface Attr {
  attrId: string | number
  valueId: string | number
}
export interface SaleAttr {
  saleAttrId: string | number
  saleAttrValueId: string | number
}
export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string
  weight: string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList: Attr[]
  skuSaleAttrValueList: SaleAttr[]
}
export interface SkuInfoData extends ResponseData {
  data: {
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
    records: SkuData[]
  }
}
