<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-28 16:00:49
 * @LastEditTime: 2023-12-29 10:03:47
 * @LastEditors: breeze1307
-->
<template>
  <el-form label-width="70">
    <el-form-item label="SKU名称">
      <el-input palceholdoer="请输入SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input palceholdoer="请输入价格"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input palceholdoer="请输入重量"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input type="textarea" palceholdoer="请输入SKU描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item label="电池容量">
          <el-select placeholder="请选择">
            <el-option />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item label="颜色">
          <el-select placeholder="请选择">
            <el-option />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column
          type="selection"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column label="图片">
          <template #>
            <img src="" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作">
          <template #>
            <el-button type="primary" size="small">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', 0)
}
</script>

<style lang="scss" scoped></style>
