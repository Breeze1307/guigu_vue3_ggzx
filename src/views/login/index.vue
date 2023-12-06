<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-01 14:24:15
 * @LastEditTime: 2023-12-06 19:39:11
 * @LastEditors: breeze1307
-->
<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="0" :span="12">1111</el-col>
      <el-col :span="12">
        <el-form
          class="login-form"
          ref="loginFormRef"
          :model="loginInfo"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <div class="login-input">
            <el-form-item prop="username">
              <el-input v-model="loginInfo.username" :prefix-icon="User" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginInfo.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
// 引入获取当前时间函数
import { getTime } from '@/utils/time'
// 表单校验 form
// 收集账号和密码的数据
let loginInfo = reactive({ username: 'admin', password: '111111' })
// 用户相关的小仓库
let userStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 控制按钮加载效果
let loading = ref(false)
const loginFormRef = ref()
// 登录
const login = async () => {
  // 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
  // 全部表单校验通过才发送请求
  await loginFormRef.value.validate()
  loading.value = true
  await userStore
    .userLogin(loginInfo)
    .then(() => {
      $router.push('/')
      ElNotification({
        type: 'success',
        title: `Hi,${getTime()}好`,
        message: '欢迎回来',
      })
      loading.value = true
    })
    .catch((err) => {
      ElNotification({
        type: 'error',
        message: err.message,
      })
      loading.value = false
    })
}

/**
 * @description:用户名和密码校验规则
 * @param {*} rule 数组的校验规则对象
 * @param {*} value 表单元素的文本内容
 * @param {*} callback 通过调用callback函数放行，不通过注入错误信息，使用callback返回
 * @return {*}
 */
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (/^[a-zA-Z0-9]{4,}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名不少于4位'))
  }
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (/^\d{6,}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名不少于6位'))
  }
}
/**
 * 定义表单校验规则，一个规则即一个对象
 * required,表示这个字段必须校验
 * trigger,触发表单校验的时机（change：文本发送变化时，blur：失去焦点时）
 * 表单内容校验通过在发送请求
 */
const rules = {
  username: [{ validator: validateUsername, trigger: 'change' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg');
  background-size: cover;

  .login-form {
    position: relative;
    width: 70%;
    top: 30vh;
    left: 50%;
    transform: translateX(-50%);
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 20px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 10px 0px;
    }

    .login-input {
      position: relative;
      width: 80%;
      transform: translateX(-50%);
      left: 50%;

      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
