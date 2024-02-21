import exp from 'constants'

/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-28 10:25:34
 * @LastEditTime: 2024-02-20 16:07:10
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
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImageList: SpuImage[]
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
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export interface SpuImageData extends ResponseData {
  data: SpuImage[]
}
export interface SpuSaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean
}
export interface SpuSaleAttr {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  flag?: boolean
  saleAttrValue?: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
}
export interface SpuSaleAttrData extends ResponseData {
  data: SpuSaleAttr[]
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
