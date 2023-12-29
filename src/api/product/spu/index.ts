/*
 * @Description: SPU相关接口
 * @Author: breeze1307
 * @Date: 2023-12-28 10:25:27
 * @LastEditTime: 2023-12-28 15:16:16
 * @LastEditors: breeze1307
 */
import request from '@/utils/request'
import type { HasSpuResponseData } from './type'
// spu已有数据
export const reqSpuHas = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
  )
