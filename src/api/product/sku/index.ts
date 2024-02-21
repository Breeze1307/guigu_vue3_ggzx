/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2024-02-21 19:40:18
 * @LastEditTime: 2024-02-21 19:57:46
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import { SkuInfoData } from './type'
export const reqSkuDataList = (page: number, limit: number) =>
  request.get<any, SkuInfoData>(`/admin/product/list/${page}/${limit}`)
