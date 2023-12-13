<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-07 14:58:03
 * @LastEditTime: 2023-12-13 19:58:28
 * @LastEditors: breeze1307
-->
<template>
  <div class="layout-container">
    <!-- 侧边 -->
    <div
      class="layout-slider"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#282c34"
          text-color="#fff"
          :default-active="$route.path"
          :collapse="layoutStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部 -->
    <div
      class="layout-tabbar"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区 -->
    <div
      class="layout-content"
      :class="{ fold: layoutStore.fold ? true : false }"
      v-loading="layoutStore.loading"
    >
      <router-view v-if="flag"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutStore from '@/store/modules/setting'
let layoutStore = useLayoutStore()
let userStore = useUserStore()
let $route = useRoute()
// 组件销毁/显示
let flag = ref(true)
// 监听refresh数据是否发生变化
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false
    // dom加载完毕，重新加载组件
    nextTick(() => {
      flag.value = true
      layoutStore.loading = false
    })
  },
)
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
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);
    }
  }
  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout-content {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: $base-content-background;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
