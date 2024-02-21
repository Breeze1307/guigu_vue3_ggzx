<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2024-02-21 11:42:15
 * @LastEditors: breeze1307
-->
<template>
  <Category :scene="scene"></Category>
  <el-card style="margin-top: 10px">
    <template v-if="scene == 0">
      <el-button
        icon="Plus"
        type="primary"
        @click="addSpu"
        :disabled="categoryStore.c3Id ? false : true"
      >
        添加SPU
      </el-button>
      <el-table border style="margin: 10px 0" :data="records">
        <el-table-column
          type="index"
          label="序号"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row }">
            <el-button
              icon="Plus"
              size="small"
              type="primary"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              icon="Edit"
              size="small"
              type="primary"
              title="编辑SPU"
              @click="editSpu(row)"
            ></el-button>
            <el-button
              icon="View"
              size="small"
              type="primary"
              title="查看SKU列表"
              @click="viewSku(row.id)"
            ></el-button>
            <el-popconfirm title="确定删除?">
              <template #reference>
                <el-button
                  icon="Delete"
                  size="small"
                  type="primary"
                  title="删除SPU"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getHasSpu"
      />
    </template>
    <SpuForm
      v-else-if="scene == 1"
      ref="spu"
      @changeScene="changeScene"
    ></SpuForm>
    <SkuForm v-else ref="sku" @changeScene="changeScene"></SkuForm>
    <!-- 展示已有sku数据 -->
    <el-dialog
    v-model="skuDialogVisible"
    title="SKU列表"
    width="50%"
  >
    <template #>
      <el-table :data="skuDataList" style="width: 100%">
        <el-table-column prop="skuName" label="SKU名字" />
        <el-table-column prop="price" label="SKU价格" />
        <el-table-column prop="weight" label="SKU重量" />
        <el-table-column prop="address" label="SKU图片">
          <template #="{row}">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;"/>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { reqSpuHas,reqSkuData } from '@/api/product/spu'
import { HasSpuResponseData, SpuData,SkuInfoData } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// 控制卡片列表切换和分类列表是否禁用 0：spu已有数据 1：spu添加/修改 2：添加sku
let scene = ref<number>(0)
// 每页条数
let limit = ref<number>(3)
// 当前页数
let pageNo = ref<number>(1)
// 总页数
let total = ref<number>(0)
// spu已有数据
let records = ref<SpuData[]>([])
// spu组件实例
let spu = ref<any>()
// sku组件实例
let sku = ref<any>()
// sku数据面板展示控制
let skuDialogVisible = ref<boolean>(false)
// sku数据
let skuDataList=ref<any>()
// 每页条数切换获取数据
const handleSizeChange = () => {
  getHasSpu()
}
// 监听c3Id变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 三级分类id存在才能发起请求
    if (categoryStore.c3Id) {
      getHasSpu()
    }
  },
)
// 获取spu已有数据
const getHasSpu = async (page = 1) => {
  pageNo.value = page
  let result: HasSpuResponseData = await reqSpuHas(
    pageNo.value,
    limit.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 添加SPU
const addSpu = () => {
  scene.value = 1
  nextTick(() => {
    spu.value.initAddSpu(categoryStore.c3Id)
  })
}
// 编辑SPU
const editSpu = (row: SpuData) => {
  scene.value = 1
  nextTick(() => {
    spu.value.initHasSpuData(row)
  })
}
// 切换展示的卡片
const changeScene = (data: any) => {
  scene.value = data.flag
  if (data.params == 'update') {
    // 更新留在当前页
    getHasSpu(pageNo.value)
  } else if (data.params == 'add') {
    // 添加回到第一页
    getHasSpu()
  }
}
// 添加sku
const addSku = (spuId: number) => {
  scene.value = 2
  nextTick(() => {
    sku.value.initSkuData(
      categoryStore.c1Id,
      categoryStore.c2Id,
      categoryStore.c3Id,
      spuId,
    )
  })
}
// 查看sku
const viewSku =async (spuId:string|number) => {
  let result: SkuInfoData = await reqSkuData(spuId)
  if (result.code == 200) {
    skuDataList.value=result.data
    skuDialogVisible.value=true                     
  } else {
    ElMessage.error("SKU数据获取失败")
  }
}
</script>
<style lang="scss" scoped></style>
