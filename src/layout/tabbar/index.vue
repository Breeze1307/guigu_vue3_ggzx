<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-13 11:27:23
 * @LastEditTime: 2023-12-13 15:13:31
 * @LastEditors: breeze1307
-->
<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <el-icon @click="changeIcon">
        <component :is="layoutStore.fold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="tabbar-right">456</div>
  </div>
</template>

<script lang="ts" setup>
import useLayoutStore from '@/store/modules/setting'
let layoutStore = useLayoutStore()
const changeIcon = () => {
  layoutStore.fold = !layoutStore.fold
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: red;
  .tabbar-left {
    margin-left: 20px;
  }
}
</style>
