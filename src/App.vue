<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-11-09 17:18:41
 * @LastEditTime: 2023-12-01 17:23:59
 * @LastEditors: breeze1307
-->
<template>
  <div>hello</div>
  <SvgIcon name="icon-a-paihangbang1"></SvgIcon>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { login } from '@/api/user/index'
import { onMounted } from 'vue'
onMounted(() => {
  login({ username: 'system', password: '111111' })
})
</script>
<style lang="scss"></style>
