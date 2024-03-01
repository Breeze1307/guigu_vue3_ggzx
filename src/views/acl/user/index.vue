<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:30:37
 * @LastEditTime: 2024-03-01 10:30:48
 * @LastEditors: breeze1307
-->
<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入搜索用户名"
          v-model="searchName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
          :disabled="searchName ? false : true"
        >
          搜索
        </el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="primary" @click="batRemove" :disabled="idList.length>0?false:true" >删除用户</el-button>
    <el-table
      :data="userInfo"
      border
      style="margin: 10px 0"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60" />
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="用户名字" />
      <el-table-column prop="name" label="用户名称" />
      <el-table-column prop="roleName" label="用户角色" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            icon="User"
            size="small"
            @click="getRoles(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.username}吗?`"
            @confirm="remove(row.id, $index)"
          >
            <template #reference>
              <el-button type="primary" icon="Delete" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getUserList"
    />
  </el-card>
  <!-- 添加用户 -->
  <el-drawer
    v-model="userDrawer"
    :title="userParams.id ? '修改用户' : '添加用户'"
  >
    <template #default>
      <el-form :model="userParams" :rules="userRules" ref="userRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请输入昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-show="!userParams.id">
          <el-input
            placeholder="请输入密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-drawer>
  <!-- 分配角色 -->
  <el-drawer title="分配角色（职位）" v-model="roleDrawer">
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input disabled v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="assignRoles"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox
              v-for="role in allRoleList"
              :key="role.id"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="roleDrawer = false">取消</el-button>
      <el-button type="primary" @click="setRoles">确定</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqUserList,
  reqUserAddOrUpdate,
  reqUserRole,
  reqAssignRole,
  reqBatRemove,
  reqRemove,
} from '@/api/user'
import type {
  UserInfoList,
  UserInfo,
  AllRoleInfo,
  RoleInfo,
  assignRoleData,
} from '@/api/user/type'
import { ElMessage } from 'element-plus'
// 用户数据列表
let userInfo = ref<any>([])
// 当前页
let pageNo = ref<number>(1)
// 限制条数
let limit = ref<number>(5)
// 总数
let total = ref<number>(0)
// 搜索关键字
let searchName = ref<string>('')
// 添加用户面板控制
let userDrawer = ref<boolean>(false)
// 用户信息收集
let userParams = reactive<UserInfo>({
  username: '',
  name: '',
  password: '',
})
// form组件实例
let userRef = ref<any>()
// 分配职位抽屉控制
let roleDrawer = ref<boolean>(false)
// 所有角色数据
let allRoleList = ref<RoleInfo[]>([])
// 已分配角色
let assignRoles = ref<RoleInfo[]>([])
// 全选
let checkAll = ref<boolean>(false)
// 设置多选的不确定状态,用于样式控制
let isIndeterminate = ref<boolean>(true)
// 角色分配参数
let oldRoleIdList = ref<number[]>([])
// 要删除的id列表
let idList = ref<number[]>([])
// 用户验证信息
const userRules = {
  username: [
    { required: true, min: 2, message: '用户名字至少两位', trigger: 'blur' },
  ],
  name: [
    { required: true, min: 5, message: '用户昵称至少五位', trigger: 'blur' },
  ],
  password: [
    { required: true, min: 6, message: '用户密码至少六位', trigger: 'blur' },
  ],
}
onMounted(() => {
  getUserList()
})
// 获取用户列表
const getUserList = async (page = 1) => {
  pageNo.value = page
  let result: UserInfoList = await reqUserList(
    pageNo.value,
    limit.value,
    searchName.value,
  )
  if (result.code == 200) {
    userInfo.value = result.data.records
    total.value = result.data.total
  }
}
// 每页限制条数触发
const handleSizeChange = () => {
  getUserList()
}
// 搜索
const search = () => {
  getUserList()
}
// 重置
const reset = () => {
  searchName.value = ''
  getUserList()
}
// 添加用户
const addUser = () => {
  userDrawer.value = true
  clearUser()
}
// 编辑用户信息
const editUser = (row: UserInfo) => {
  Object.assign(userParams, row)
  userDrawer.value = true
  nextTick(() => {
    userRef.value.clearValidate('username')
    userRef.value.clearValidate('name')
  })
}
// 提交用户信息
const save = async () => {
  await userRef.value.validate()
  let result: any = await reqUserAddOrUpdate(userParams)
  if (result.code == 200) {
    ElMessage.success(userParams.id ? '修改成功' : '添加成功')
    userDrawer.value = false
    //当用户修改了自己的信息，之前的登录信息失效，浏览器自动刷新一次，进入登录页面
    window.location.reload()
  } else {
    ElMessage.success(userParams.id ? '修改失败' : '添加失败')
  }
}
// 取消保存用户信息
const cancel = () => {
  userDrawer.value = false
}
// 清除用户添加数据
const clearUser = () => {
  // 点击编辑按钮后会给id赋值，因此在点击添加按钮时，将id置为0
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    userRef.value.clearValidate('username')
    userRef.value.clearValidate('name')
    userRef.value.clearValidate('password')
  })
}
// 分配角色
const getRoles = async (row: any) => {
  Object.assign(userParams, row)
  let result: AllRoleInfo = await reqUserRole(row.id)
  if (result.code == 200) {
    allRoleList.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
    roleDrawer.value = true
    // 存储原来分配的角色id
    oldRoleIdList.value = result.data.assignRoles.map((item) => {
      return item.id as number
    })
  } else {
    ElMessage.error('角色数据出错')
  }
}
// 全选状态改变时触发
const handleCheckAllChange = (val: boolean) => {
  assignRoles.value = val ? allRoleList.value : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: RoleInfo[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoleList.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoleList.value.length
}
// 角色分配
const setRoles = async () => {
  let data: assignRoleData = {
    roleIdList: assignRoles.value.map((item) => {
      return item.id as number
    }),
    userId: userParams.id as number,
  }
  // 当前角色分配与之前无变化，不发送请求
  let isChange =
    oldRoleIdList.value.length === data.roleIdList.length &&
    data.roleIdList.every((item) => oldRoleIdList.value.includes(item))
  if (isChange) {
    roleDrawer.value = false
    return
  }
  let result: any = await reqAssignRole(data)
  if (result.code == 200) {
    getUserList(pageNo.value)
    ElMessage.success('角色分配成功')
  } else {
    ElMessage.error('角色分配失败')
  }
  roleDrawer.value = false
}
// 单个用户删除
const remove = async (id: number, index: number) => {
  let result: any = await reqRemove(id)
  if (result.code == 200) {
    if (userInfo.value.length > 1) {
      userInfo.value.splice(index, 1)
    } else {
      getUserList(pageNo.value-1)
    }
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
// 表格多选
const handleSelectionChange = (val: UserInfo[]) => {
  idList.value = val.map((item) => item.id as number)
}
// 批量删除用户
const batRemove =async () => {
  let result: any =await reqBatRemove(idList.value)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    getUserList(userInfo.value.length > 1?pageNo.value:pageNo.value-1)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin-bottom: none;
  }
}
</style>
