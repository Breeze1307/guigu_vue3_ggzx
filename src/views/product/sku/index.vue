<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2024-02-22 16:52:14
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
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            disabled
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="getSkuInfo(row.id)"
          ></el-button>
          <el-popconfirm :title="`确定删除${row.skuName}吗?`" @confirm="deleteSku(row.id, $index)">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
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
    <!-- sku详情 -->
    <el-drawer v-model="drawer" title="商品详情">
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuDetail.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuDetail.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuDetail.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              type="primary"
              v-for="attr in skuDetail.skuAttrValueList"
              :key="attr.id"
              style="margin: 5px"
            >
              {{ attr.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              type="primary"
              v-for="attr in skuDetail.skuSaleAttrValueList"
              :key="attr.id"
              style="margin: 5px"
            >
              {{ attr.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              indicator-position="outside"
              height="200px"
              type="card"
              :interval="4000"
            >
              <el-carousel-item
                v-for="item in skuDetail.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  reqSkuDataList,
  reqUpdateSale,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku'
import type { SkuData, SkuInfoData, SkuDetail } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
// sku数据列表
let skuDataList = ref<SkuData[]>([])
// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(10)
// 总数
let total = ref<number>(0)
// drawer展示
let drawer = ref<boolean>(false)
// sku详情数据
let skuDetail = ref<any>({})
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
// 上架or下架
const updateSale = async (row: any) => {
  let result: any = await reqUpdateSale(row.id, row.isSale)
  if (result.code == 200) {
    // 请求成功后前端修改页面展示效果，不重新请求数据，否则会造成服务器压力太大
    row.isSale = row.isSale == 1 ? 0 : 1
    ElMessage.success(row.isSale == 1 ? '上架成功' : '下架成功')
  } else {
    ElMessage.error('操作失败')
  }
}
// 获取sku详细信息
const getSkuInfo = async (skuId: number) => {
  let result: SkuDetail = await reqSkuInfo(skuId)
  if (result.code == 200) {
    skuDetail.value = result.data
    drawer.value = true
  }
}
// 删除sku
const deleteSku = async (skuId: number, index: number) => {
  let result: any = await reqRemoveSku(skuId)
  if (result.code == 200) {
    // 成功后不向服务端请求数据
    skuDataList.value.splice(index, 1)
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.el-drawer__body {
  .el-row {
    margin: 10px 0;
  }
}
</style>
