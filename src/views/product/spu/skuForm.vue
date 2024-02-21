<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-28 16:00:49
 * @LastEditTime: 2024-02-21 10:34:14
 * @LastEditors: breeze1307
-->
<template>
  <el-form label-width="70">
    <el-form-item label="SKU名称">
      <el-input
        palceholdoer="请输入SKU名称"
        v-model="skuParams.skuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input palceholdoer="请输入价格" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input palceholdoer="请输入重量" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        palceholdoer="请输入SKU描述"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          :label="attr.attrName"
          v-for="attr in platFormAttr"
          :key="attr.id"
        >
          <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
            <el-option
              v-for="attrValue in attr.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${attr.id}:${attrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          :label="attr.saleAttrName"
          v-for="attr in saleAttr"
          :key="attr.id"
        >
          <el-select placeholder="请选择" v-model="attr.saleIdAndvalueId">
            <el-option
              v-for="saleAttrValue in attr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${attr.id}:${saleAttrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="spuImg" ref="table">
        <el-table-column
          type="selection"
          align="center"
          width="80"
          :selectable="selectable"
        ></el-table-column>
        <el-table-column label="图片" align="center">
          <template #="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 80px; height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" size="small" @click="setImage(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitSku">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAddSku,
} from '@/api/product/spu'
import type { AttrResponseData } from '@/api/product/attr/type'
import type {
  SpuImageData,
  SpuSaleAttrData,
  SkuData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
let platFormAttr = ref<any>()
let saleAttr = ref<any>()
let spuImg = ref<any>()
let table = ref<any>()
let skuParams = reactive<SkuData>({
  category3Id: '', // 三级分类id
  spuId: '', // 已有spu id
  tmId: '', // 品牌id
  skuName: '', // sku名称
  price: '', // sku价格
  weight: '', // sku重量
  skuDesc: '', // sku描述
  skuDefaultImg: '', // sku默认图片地址
  skuAttrValueList: [], // sku平台属性
  skuSaleAttrValueList: [], // sku销售属性
})
const cancel = () => {
  $emit('changeScene', { flag: 0 })
}
// 初始化展示
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
  spu: any,
) => {
  skuParams.category3Id = c3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  let result: AttrResponseData = await reqAttrInfoList(c1Id, c2Id, c3Id)
  platFormAttr.value = result.data
  let result1: SpuSaleAttrData = await reqSpuSaleAttrList(spu.id)
  saleAttr.value = result1.data
  let result2: SpuImageData = await reqSpuImageList(spu.id)
  spuImg.value = result2.data
}
// 设置默认图片
const setImage = (row: any) => {
  // 清除之前的选择
  table.value.clearSelection()
  // 设置默认图片
  table.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.skuDefaultImg = row.imgUrl
}
// 禁止使用多选框勾选
const selectable = () => {
  return false
}
// 提交sku参数，添加sku数据
const submitSku = async () => {
  // 平台属性
  platFormAttr.value.forEach((attr: any) => {
    if (attr.attrIdAndValueId) {
      let [attrId, valueId] = attr.attrIdAndValueId.split(':')
      skuParams.skuAttrValueList.push({ attrId, valueId })
    }
  })
  // 销售属性
  // 练习reduce,传递[]为初始值，next即可从数组第一个数据遍历
  skuParams.skuSaleAttrValueList = saleAttr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndvalueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndvalueId.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )
  let result = await reqAddSku(skuParams)
  if (result.code == 200) {
    ElMessage.success('添加SKU成功')
    $emit('changeScene', { flag: 0, params: 'add' })
  } else {
    ElMessage.error('添加SKU失败')
  }
}
// 对外暴露
defineExpose({ initSkuData })
</script>

<style lang="scss" scoped></style>
