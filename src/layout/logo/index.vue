<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-08 11:05:33
 * @LastEditTime: 2023-12-08 11:34:50
 * @LastEditors: breeze1307
-->
<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: $base-menu-color;
  display: flex;
  align-items: center;
  padding: 0 15px;
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
