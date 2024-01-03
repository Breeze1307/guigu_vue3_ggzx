<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-28 16:00:31
 * @LastEditTime: 2024-01-03 11:47:04
 * @LastEditors: breeze1307
-->
<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择" v-model="spuParams.tmId">
        <el-option
          v-for="trademark in allTrademark"
          :key="trademark.id"
          :label="trademark.tmName"
          :value="trademark.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <template #>
        <el-upload
          v-model:file-list="imgList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </template>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="selectedAttr"
        :placeholder="
          unSelectSaleAttr.length > 0
            ? `还有${unSelectSaleAttr.length}个未选择`
            : '无'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        style="margin-left: 10px"
        :disabled="selectedAttr ? false : true"
      >
        添加属性
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-table border :data="spuSaleAttr">
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 0 5px"
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-button icon="Plus" type="success" size="small"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  reqTrademarkList,
  reqSpuImageList,
  reqSaleAttr,
  reqSpuSaleAttrList,
} from '@/api/product/spu'
import {
  TrademarkData,
  SpuImageData,
  SaleAttrData,
  SpuData,
  SpuSaleAttrData,
  Trademark,
  SpuImage,
  SaleAttr,
  SpuSaleAttr,
} from '@/api/product/spu/type'
import { ref, computed } from 'vue'
let $emit = defineEmits(['changeScene'])
// spu已有数据
let spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})
// 品牌数据
let allTrademark = ref<Trademark[]>([])
// 图片列表
let imgList = ref<SpuImage[]>([])
// 图片放大卡片显示控制
let dialogVisible = ref<boolean>(false)
// 放大图片地址
let dialogImageUrl = ref<string>('')
// 所有销售属性
let allSaleAttr = ref<SaleAttr[]>([])
// 选中的属性值
let selectedAttr = ref<string>('')
// 单个spu销售属性及其值
let spuSaleAttr = ref<SpuSaleAttr[]>([])
// 计算当前spu还未设置的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return spuSaleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
const cancel = () => {
  $emit('changeScene', 0)
}
// 获取页面数据
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  // 品牌
  let result: TrademarkData = await reqTrademarkList()
  // 图片
  let result1: SpuImageData = await reqSpuImageList(spu.id as number)

  let result2: SaleAttrData = await reqSaleAttr()
  let result3: SpuSaleAttrData = await reqSpuSaleAttrList(spu.id as number)
  allTrademark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  allSaleAttr.value = result2.data
  spuSaleAttr.value = result3.data
}
// 图片放大
const handlePictureCardPreview = (file) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
// 对外暴露
defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped></style>
