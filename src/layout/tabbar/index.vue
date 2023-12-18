<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-13 11:27:23
 * @LastEditTime: 2023-12-18 15:51:37
 * @LastEditors: breeze1307
-->
<template>
  <div class="tabbar">
    <!-- 左侧折叠按钮、面包屑 -->
    <div class="tabbar-left">
      <!-- 折叠按钮 -->
      <el-icon @click="changeIcon" style="margin-right: 10px">
        <component :is="layoutStore.fold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <!-- :to="item.path" 点击面包屑，跳转到对应位置 -->
        <el-breadcrumb-item
          :to="item.path"
          v-for="(item, index) in $route.matched"
          :key="index"
          v-show="item.meta.title"
        >
          <!-- 图标 -->
          <el-icon style="margin-right: 5px">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <!-- 标题 -->
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧刷新、 全屏、设置、头像、下拉框-->
    <div class="tabbar-right">
      <el-button icon="Refresh" circle @click="goRefresh"></el-button>
      <el-button icon="FullScreen" circle @click="setFullScreen"></el-button>
      <el-button icon="Setting" circle></el-button>
      <el-avatar :size="32" :src="userStore.avatar" class="avater" />
      <el-dropdown>
        <span>
          {{ userStore.username }}
          <el-icon>
            <component is="ArrowDown"></component>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useLayoutStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()
let layoutStore = useLayoutStore()
// 折叠
const changeIcon = () => {
  layoutStore.changeFold()
}
// 刷新
const goRefresh = () => {
  layoutStore.loading = true
  layoutStore.changeRefresh()
}
// 全屏
const setFullScreen = () => {
  // 判断是否为全屏状态 true null
  if (!document.fullscreenElement) {
    // 全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
// 退出登录
const logOut =async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  .tabbar-left {
    display: flex;
    margin-left: 20px;
  }
  .tabbar-right {
    display: flex;
    align-items: center;
    .avater {
      margin: 0 12px;
    }
  }
}
</style>
