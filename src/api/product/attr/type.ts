/*
 * @Description: 

 * @Author: breeze1307
 * @Date: 2023-12-21 17:56:40
 * @LastEditTime: 2023-12-27 15:00:22
 * @LastEditors: breeze1307
 */
interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
export interface CategoryResponse extends ResponseData {
  data: CategoryObj[]
}
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export type AttrValueList = AttrValue[]
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}