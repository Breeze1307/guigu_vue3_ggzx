<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-01 14:24:50
 * @LastEditTime: 2023-12-15 11:43:54
 * @LastEditors: breeze1307
-->
<template>
  <div>我是首页{{ userStore.username }}</div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style lang="scss" scoped></style>
