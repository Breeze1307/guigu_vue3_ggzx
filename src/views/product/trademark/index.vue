<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2023-12-19 17:34:11
 * @LastEditors: breeze1307
-->
<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary">添加品牌</el-button>
    <el-table border :data="trademarkArr">
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #>
          <el-button sizes="small" type="warning" icon="Edit"></el-button>
          <el-button sizes="small" type="danger" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next,jumper,->,sizes, total"
      v-model:page-size="limit"
      v-model:current-page="pageNo"
      :page-sizes="[3, 5, 7, 9]"
      :total="total"
      @current-change="getHasTrademark"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  TrademarkResponseData,
  Records,
} from '@/api/product/trademark/types'
// 当前页数
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(3)
// 已有品牌总数
let total = ref<number>(0)
// 存储已有品牌数据
let trademarkArr = ref<Records>([])
// 获取已有品牌信息
const getHasTrademark = async () => {
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .el-table {
    margin: 10px 0;
  }
}
</style>
