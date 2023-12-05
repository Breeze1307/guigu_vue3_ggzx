<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-01 14:24:15
 * @LastEditTime: 2023-12-05 16:10:22
 * @LastEditors: breeze1307
-->
<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="0" :span="12">1111</el-col>
      <el-col :span="12">
        <el-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <div class="login-input">
            <el-form-item>
              <el-input v-model="loginInfo.username" :prefix-icon="User" />
            </el-form-item>
            <el-form-item>
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
let loginInfo = reactive({ username: 'admin', password: '111111' })
let userStore = useUserStore()
let $router = useRouter()
let loading = ref(false)
const login = () => {
  loading.value = true
  userStore
    .userLogin(loginInfo)
    .then(() => {
      $router.push('/')
      ElNotification({
        type: 'success',
        message: '登录成功',
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
