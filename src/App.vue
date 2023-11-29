<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-11-09 17:18:41
 * @LastEditTime: 2023-11-29 15:26:10
 * @LastEditors: breeze1307
-->
<template>
  <div>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <hello></hello>
    <SvgIcon name="icon-gengduofuwu"></SvgIcon>
    <SvgIcon name="icon-a-w-1" color="pink"></SvgIcon>
    <SvgIcon name="icon-a-qingkong1" iconClass="qingkong"></SvgIcon>
  </div>
</template>

<script lang="ts" setup>

import hello from '@/components/hello.vue'

</script>
<style lang="scss">
.qingkong {
  width: 1em !important;
  height: 1em !important;
}
</style>
