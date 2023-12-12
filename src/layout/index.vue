<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-07 14:58:03
 * @LastEditTime: 2023-12-12 17:04:09
 * @LastEditors: breeze1307
-->
<template>
  <div class="layout-container">
    <!-- 侧边 -->
    <div class="layout-slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#282c34"
          text-color="#fff"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部 -->
    <div class="layout-tabber">tabber</div>
    <!-- 内容区 -->
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
let $route = useRoute()
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabber-height);
    }
  }
  .layout-tabber {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    background: $base-tabber-background;
  }
  .layout-content {
    position: relative;
    top: $base-tabber-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    background: $base-content-background;
    padding: 20px;
    overflow: auto;
  }
}
</style>

