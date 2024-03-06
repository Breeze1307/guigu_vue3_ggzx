<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:30:37
 * @LastEditTime: 2024-03-06 19:09:50
 * @LastEditors: breeze1307
-->

<template>
  <!-- 搜索栏 -->
  <el-card style="margin-bottom: 10px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
          :disabled="keyword ? false : true"
        >
          搜索
        </el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 数据列表 -->
  <el-card>
    <el-button type="primary" icon="Plus" @click="addPosts">添加职位</el-button>
    <el-table :data="roleList" border style="margin: 10px 0">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="roleName" lable="职位名称"></el-table-column>
      <el-table-column prop="createTime" lable="创建时间"></el-table-column>
      <el-table-column prop="updateTime" lable="更新时间"></el-table-column>
      <el-table-column lable="操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="assignPermission(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.roleName}吗？`"
            @confirm="remove(row.id, $index)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[10, 20, 30, 40]"
      layout=" prev, pager, next,->,total, sizes,"
      :total="total"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="getHasRole"
    />
  </el-card>
  <!-- 添加用户弹框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="roleParams.id ? '编辑职位' : '添加职位'"
    width="500"
  >
    <template #default>
      <el-form :model="roleParams" ref="form">
        <el-form-item
          label="职位名称"
          prop="roleName"
          :rules="[
            {
              required: true,
              min: 2,
              message: '职位名称至少两位',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer" title="分配菜单与按钮权限">
    <template #default>
      <el-tree
        ref="treeRef"
        :data="permissionList"
        show-checkbox
        default-expand-all
        :default-checked-keys="selectArr"
        node-key="id"
        highlight-current
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <el-button @click="drawer = false">取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqRemove,
  reqPermissionInfo,
  reqSetPermission,
} from '@/api/acl/role'
import type {
  roleInfo,
  roleAllInfo,
  permissionInfo,
  permissionData,
} from '@/api/acl/role/type'
import useLayoutStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
let settingStore = useLayoutStore()
let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
// 角色数据
let roleList = ref<roleInfo[]>([])
// 关键字
let keyword = ref<string>('')
// form表单
let form = ref<any>()
// role参数收集
let roleParams = reactive<any>({
  roleName: '',
})
// 分配权限面板控制
let drawer = ref<boolean>(false)
onMounted(() => {
  getHasRole()
})
// 添加用户对话框弹出控制
let dialogVisible = ref<boolean>(false)
const treeRef = ref<any>()
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 权限数据列表
let permissionList = ref<permissionInfo[]>([])
// 已分配的权限
let selectArr = ref<number[]>([])
// 获取角色信息
const getHasRole = async (page = 1) => {
  pageNo.value = page
  let result: roleAllInfo = await reqAllRoleList(
    pageNo.value,
    limit.value,
    keyword.value,
  )
  if (result.code == 200) {
    roleList.value = result.data.records
    total.value = result.data.total
  }
}
// 一页展示多少条，触发
const handleSizeChange = () => {
  getHasRole()
}
// 搜索
const search = () => {
  getHasRole()
  keyword.value = ''
}
// 重置
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加职位
const addPosts = () => {
  // 清除上一次数据
  roleParams.roleName = ''
  // 清除上一次错误验证
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
  // 弹出添加职位框
  dialogVisible.value = true
}
// 修改职位
const updateRole = (row: any) => {
  Object.assign(roleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
  dialogVisible.value = true
}
// 参数提交
const submit = async () => {
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    getHasRole(roleParams.id ? pageNo.value : 1)
    ElMessage.success(roleParams.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(roleParams.id ? '修改失败' : '添加失败')
  }
  dialogVisible.value = false
}
// 删除数据
const remove = async (id: number, index: number) => {
  let result: any = await reqRemove(id)
  if (result.code == 200) {
    if (roleList.value.length > 1) {
      roleList.value.splice(index, 1)
    } else {
      getHasRole(pageNo.value - 1)
    }
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
// 分配权限按钮
const assignPermission = async (row: any) => {
  Object.assign(roleParams, row)
  let result: permissionData = await reqPermissionInfo(roleParams.id)
  if (result.code == 200) {
    drawer.value = true
    permissionList.value = result.data
    selectArr.value = filterSelectArr(permissionList.value, [])
  }
}
// 取出select为true的数据
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    } else if (item.children?.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
// 权限分配请求
const confirmClick = async () => {
  let roleId = roleParams.id
  let checkedArr = treeRef.value.getCheckedKeys()
  let checkedHalfArr = treeRef.value.getHalfCheckedKeys()
  let permissionId = checkedArr.concat(checkedHalfArr)
  let result: any = await reqSetPermission(roleId, permissionId)
  if (result.code == 200) {
    drawer.value = false
    window.location.reload()
    ElMessage.success('权限分配成功')
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
}
</style>
