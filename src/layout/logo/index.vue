<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-08 11:05:33
 * @LastEditTime: 2023-12-13 15:05:10
 * @LastEditors: breeze1307
-->
<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <span v-show="!layoutStore.fold">{{ setting.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import setting from '@/setting'
import useLayoutStore from '@/store/modules/setting';
let layoutStore=useLayoutStore()
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: $base-menu-color;
  display: flex;
  align-items: center;
  padding: 0 10px;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    font-size: $base-logo-title-fontSize;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
