<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 10:06:13
 * @LastEditTime: 2023-12-12 16:58:13
 * @LastEditors: breeze1307
-->
<template>
  <template v-for="menuItem in menuList" :key="menuItem.path">
    <!--单个菜单 -->
    <template v-if="!menuItem.children">
      <el-menu-item
        :index="menuItem.path"
        v-if="!menuItem.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="menuItem.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ menuItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有且仅有一个子菜单 -->
    <template v-if="menuItem.children?.length == 1">
      <el-menu-item
        :index="menuItem.children[0].path"
        v-if="!menuItem.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="menuItem.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ menuItem.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子菜单 -->
    <template v-if="menuItem.children?.length > 1">
      <el-sub-menu :index="menuItem.path" v-if="!menuItem.meta.hidden">
        <template #title>
          <el-icon>
            <component :is="menuItem.meta.icon"></component>
          </el-icon>
          <span>{{ menuItem.meta.title }}</span>
        </template>
        <!-- 递归调用 -->
        <Menu :menuList="menuItem.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
defineProps(['menuList'])
let $router = useRouter()
const goRoute = (menuVc: any) => {
  $router.push(menuVc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu', // 递归调用组件，需要为组件命名
}
</script>

<style lang="scss" scoped></style>
