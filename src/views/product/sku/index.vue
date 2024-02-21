<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2024-02-21 21:24:12
 * @LastEditors: breeze1307
-->
<template>
  <el-card>
    <el-table :data="skuDataList" style="width: 100%; margin: 10px 0" border>
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column label="图片" align="center">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Bottom"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqSkuDataList } from '@/api/product/sku'
import type { SkuData, SkuInfoData } from '@/api/product/sku/type'
// sku数据列表
let skuDataList = ref<SkuData[]>([])
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(10)
// 总数
let total = ref<number>(0)
onMounted(() => {
  getHasSku()
})
// 获取SKU数据
const getHasSku = async (page = 1) => {
  pageNo.value = page
  let result: SkuInfoData = await reqSkuDataList(pageNo.value, limit.value)
  if (result.code == 200) {
    skuDataList.value = result.data.records
    total.value = result.data.total
  }
}
// 每页展示条数改变
const handleSizeChange = () => {
  getHasSku()
}
</script>

<style lang="scss" scoped></style>
