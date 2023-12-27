/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-12-25 14:24:01
 * @LastEditTime: 2023-12-25 20:50:25
 * @LastEditors: breeze1307
 */
import { defineStore } from 'pinia'
import {
  reqCategory1,
  reqCategory2,
  reqCategory3,
  reqAttrInfoList,
} from '@/api/product/attr/'
import type {
  CategoryResponse,
  AttrResponseData,
} from '@/api/product/attr/type'
import { CategoryState } from '../types/types'
let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: ''
    }
  },
  actions: {
    async getCategory1() {
      let result: CategoryResponse = await reqCategory1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    async getCategory2() {
      let result: CategoryResponse = await reqCategory2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    async getCategory3() {
      let result: CategoryResponse = await reqCategory3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    }
  },
})
export default useCategoryStore
