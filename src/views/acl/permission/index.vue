<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:30:37
 * @LastEditTime: 2024-03-07 17:44:38
 * @LastEditors: breeze1307
-->
<template>
  <el-table :data="menuList" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button
          type="primary"
          size="small"
          v-show="row.type != 2"
          @click="addOrUpdateMenu(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
          @click="updateMenu(row)"
        >
          编辑
        </el-button>
        <el-popconfirm :title="`确定删除${row.name}吗？`" @confirm="removeMenu(row.id,$index)">
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加/修改对话框 -->
  <el-dialog v-model="addDialogVisible" :title="title">
    <template #default>
      <el-form :model="paramsMenu">
        <el-form-item label="名称">
          <el-input v-model="paramsMenu.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="paramsMenu.code" placeholder="请输入菜单权限值" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { reqAllMenu, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu'
import type { MenuResData, Menu, MenuData } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 菜单列表
let menuList = ref<Menu[]>([])
// 添加/修改对话框
let addDialogVisible = ref<boolean>(false)
// 标题
let title = ref<string>('')
let paramsMenu = reactive<MenuData>({
  pid: 0,
  name: '',
  code: '',
  type:1,
  level: 0,
})
onMounted(() => {
  getMenuList()
})
// 获取菜单列表
const getMenuList = async () => {
  let result: MenuResData = await reqAllMenu()
  if (result.code == 200) {
    menuList.value = result.data
  }
}
// 添加/修改菜单
const addOrUpdateMenu = (row: any) => {
  Object.assign(paramsMenu, {
    id: 0,
    pid: row.id,
    name: '',
    type:row.level + 1 == 4?2:1,
    code: '',
    level: row.level + 1,
  })
  title.value = row.level == 3 ? '添加功能' : '添加菜单'
  addDialogVisible.value = true
}
// 保存菜单数据
const save = async () => {
  addDialogVisible.value = false
  let result: any = await reqAddOrUpdateMenu(paramsMenu)
  if (result.code == 200) {
    ElMessage.success(paramsMenu.id ? '修改成功' : '添加成功')
    getMenuList()
  } else {
    ElMessage.error(paramsMenu.id ? '修改失败' : '添加失败')
  }
}
// 更新菜单
const updateMenu = (row:any) => {
  title.value = row.level == 3 ? '更新功能' : '更新菜单'
  addDialogVisible.value = true
  Object.assign(paramsMenu, row)
}
// 删除菜单
const removeMenu = async (id:number,index:number) => {
  let result: any = await reqRemoveMenu(id)
  if (result.code == 200) { 
    ElMessage.success('删除成功')
    addDialogVisible.value = false
    getMenuList()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style lang="scss" scoped></style>
