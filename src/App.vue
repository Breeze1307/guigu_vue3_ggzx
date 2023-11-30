<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-11-09 17:18:41
 * @LastEditTime: 2023-11-30 17:36:52
 * @LastEditors: breeze1307
-->
<template>
  <div>
   hello
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { onMounted } from 'vue';
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password:'111111'
    }
  })
})
</script>
<style lang="scss">
</style>
