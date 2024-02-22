<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:30:37
 * @LastEditTime: 2024-02-22 17:35:55
 * @LastEditors: breeze1307
-->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入搜索用户名"
          v-model="searchName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="primary" @click="deleteUser">删除用户</el-button>
    <el-table :data="userInfo">
      <el-table-column type="selection" width="60" />
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="address" label="ID" />
      <el-table-column prop="address" label="用户名字" />
      <el-table-column prop="address" label="用户名称" />
      <el-table-column prop="address" label="用户角色" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column prop="address" label="更新时间" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="primary" icon="User" size="small">分配角色</el-button>
          <el-button type="primary" icon="Edit" size="small">编辑</el-button>
          <el-button type="primary" icon="Delete" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// 用户数据列表
let userInfo = ref<any>({})
// 搜索关键字
let searchName = ref<string>('')
// 搜索
const search = () => {}
// 重置
const reset = () => { }
// 添加用户
const addUser = () => {
  
}
// 删除用户 
const deleteUser = () => {
  
}
</script>

<style lang="scss" scoped></style>
