<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2023-12-28 14:53:34
 * @LastEditors: breeze1307
-->
<template>
  <el-card class="box-card">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryStore.c1Id"
          @change="handleGetC2"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryStore.c2Id"
          @change="handleGetC3"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
defineProps(['scene'])
onMounted(() => {
  // 获取一级分类列表
  categoryStore.getCategory1()
})
// 一级分类选项发生变化时
const handleGetC2 = () => {
  // 清除二级分类选项值
  categoryStore.c2Id = ''
  // 清除三级分类选项值
  categoryStore.c3Id = ''
  // 清除三级分类列表
  categoryStore.c3Arr = []
  // 获取二级分类列表
  categoryStore.getCategory2()
}
const handleGetC3 = () => {
  categoryStore.c3Id = ''
  categoryStore.getCategory3()
}
</script>

<style lang="scss" scoped></style>
