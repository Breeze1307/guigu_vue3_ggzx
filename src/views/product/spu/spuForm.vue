<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-28 16:00:31
 * @LastEditTime: 2023-12-29 10:34:16
 * @LastEditors: breeze1307
-->
<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择">
        <el-option></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <template #>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </template>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select placeholder="请选择">
        <el-option></el-option>
      </el-select>
      <el-button icon="Plus" type="primary" style="margin-left:10px">添加属性</el-button>
    </el-form-item>
    <el-form-item>
        <el-table border>
            <el-table-column label="序号" width="100px" align="center"></el-table-column>
            <el-table-column label="销售属性名字" width="120px"></el-table-column>
            <el-table-column label="销售属性值"></el-table-column>
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
import { reqSaleAttrList, reqTrademarkList } from '@/api/product/spu';
import { TrademarkData,SaleAttrData } from '@/api/product/spu/type';
let $emit=defineEmits(['changeScene'])
const cancel = ()=>{
    $emit('changeScene',0)
}
</script>

<style lang="scss" scoped></style>
