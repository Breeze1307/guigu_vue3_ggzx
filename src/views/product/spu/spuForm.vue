<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-28 16:00:31
 * @LastEditTime: 2024-01-29 15:07:49
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
          :value="`${item.id}:${item.name}`"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        style="margin-left: 10px"
        :disabled="selectedAttr ? false : true"
        @click="addAttr()"
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
          <template #="{ row, $index }">
            <el-tag
              style="margin: 0 5px"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              placeholder="请输入销售属性值"
              size="small"
              style="width: 120px"
              v-if="row.flag"
              @blur="toLook(row, $index)"
              v-model="row.saleAttrValue"
              :ref="(vc: any) => (spuAttrValInput[$index] = vc)"
            ></el-input>
            <el-button
              icon="Plus"
              type="success"
              size="small"
              v-else
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #="{ $index }">
            <el-button
              icon="delete"
              size="small"
              type="primary"
              @click="spuSaleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="spuSaleAttr.length > 0 ? false : true"
        @click="saveInfo"
      >
        保存
      </el-button>
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
  reqAddOrUpdateSpu,
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
  SpuSaleAttrValue,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, computed, nextTick } from 'vue'
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
// 属性值input框的dom节点
let spuAttrValInput = ref<any>([])
// 计算当前spu还未设置的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return spuSaleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
// 取消添加/编辑
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}
// 获取页面数据
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  // 品牌
  let result: TrademarkData = await reqTrademarkList()
  // 图片
  let result1: SpuImageData = await reqSpuImageList(spu.id as number)
  // 所有销售属性
  let result2: SaleAttrData = await reqSaleAttr()
  // 单个spu销售属性及其值
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
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
// 添加属性
const addAttr = () => {
  const [baseSaleAttrId, saleAttrName] = selectedAttr.value.split(':')
  let newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }

  spuSaleAttr.value.push(newSaleAttr)
  selectedAttr.value = ''
}
// 编辑模式，添加属性值
const toEdit = (row: SpuSaleAttr, index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    spuAttrValInput.value[index].focus()
  })
}
// 查看模式
const toLook = (row: SpuSaleAttr, index: number) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SpuSaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 值为空，提示
  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('销售属性值不能为空')
    row.flag = false
    return
  }
  // 值重复，提示
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error('销售属性值不能重复')
    spuAttrValInput.value[index].focus()
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}
// 保存修改/添加
const saveInfo = async () => {
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: item.response?.data || item.url,
    }
  })
  spuParams.value.spuSaleAttrList = spuSaleAttr.value
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.success(spuParams.value.id ? '修改失败' : '添加失败')
  }
  $emit('changeScene', {
    flag: 0,
    params: spuParams.value.id ? 'update' : 'add',
  })
}
// 初始化新增数据
const initAddSpu = async (c3Id: number | string) => {
  spuParams.value.category3Id=c3Id
  // 品牌
  let result: TrademarkData = await reqTrademarkList()
  // 所有销售属性
  let result1: SaleAttrData = await reqSaleAttr()
  allTrademark.value = result.data
  allSaleAttr.value = result1.data
}
// 对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style lang="scss" scoped></style>
