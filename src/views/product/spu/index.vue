<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2023-12-27 17:37:28
 * @LastEditors: breeze1307
-->
<template>
  <Category :scene="scene"></Category>
  <el-card style="margin-top: 10px">
    <template v-if="scene">
      <el-button icon="Plus" type="primary" @click="addSPU">添加SPU</el-button>
      <el-table border style="margin: 10px 0" :data="arr">
        <el-table-column
          type="index"
          label="序号"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作">
          <template #>
            <el-button
              icon="Plus"
              size="small"
              type="primary"
              title="添加SKU"
            ></el-button>
            <el-button
              icon="Edit"
              size="small"
              type="primary"
              title="编辑SPU"
            ></el-button>
            <el-button
              icon="View"
              size="small"
              type="primary"
              title="查看SKU列表"
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
    </template>
    <template v-else></template>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 控制卡片列表切换和分类列表是否禁用
let scene = ref<boolean>(true)
let arr = ref([
  {
    name: 'aa',
  },
])
// 添加SPU
const addSPU = () => {
  scene.value = false
}
</script>
<style lang="scss" scoped></style>
