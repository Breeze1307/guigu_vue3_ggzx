<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2023-12-21 16:35:25
 * @LastEditors: breeze1307
-->
<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 品牌内容展示 -->
    <el-table border :data="trademarkArr">
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" style="white-space: nowrap">
        <template #="{ row }">
          <el-button
            sizes="small"
            type="warning"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="'确定删除' + row.tmName + '品牌?'"
            @confirm="deleteTrademark(row.id)"
          >
            <template #reference>
              <el-button sizes="small" type="danger" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next,jumper,->,sizes, total"
      v-model:page-size="limit"
      v-model:current-page="pageNo"
      :page-sizes="[3, 5, 7, 9]"
      :total="total"
      @current-change="getHasTrademark"
      @size-change="changeLimit"
    />
    <!-- 添加/修改品牌对话框 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="30%">
      <el-form
        label-width="100px"
        class="paramsForm"
        :rules="rules"
        :model="trademarkParams"
        ref="ruleFormRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkParams.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <template #>
            <el-upload
              drag
              :show-file-list="false"
              action="/api/admin/product/fileUpload"
              :on-success="handleImgSuccess"
              :before-upload="beforeImgUpload"
            >
              <img
                v-if="trademarkParams.logoUrl"
                :src="trademarkParams.logoUrl"
                class="avatar"
                style="width: 120px; height: 120px"
              />
              <el-icon v-else class="el-icon--upload">
                <component is="UploadFilled"></component>
              </el-icon>
            </el-upload>
          </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrUpdateTrademark">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormRules } from 'element-plus'
import type {
  TrademarkResponseData,
  Records,
  Trademark,
} from '@/api/product/trademark/types'
// 当前页数
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(3)
// 已有品牌总数
let total = ref<number>(0)
// 存储已有品牌数据
let trademarkArr = ref<Records>([])
// 控制添加/修改对话框展示
let dialogFormVisible = ref<boolean>(false)
// 表单数据
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
// 获取表单
let ruleFormRef = ref()
// 获取已有品牌信息
const getHasTrademark = async (page = 1) => {
  pageNo.value = page
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }
}
// 更改每页展示条数限制
const changeLimit = () => {
  getHasTrademark()
}
// 表单验证规则
const validateTmName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('品牌名称不能小于两个字符'))
  } else {
    callback()
  }
}
const validateLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌图标'))
  }
}
// 添加/修改商品表单验证
const rules = reactive<FormRules<typeof trademarkParams>>({
  tmName: [{ required: true, validator: validateTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validateLogoUrl }],
})
// 上传图片成功之前，检查类型，大小是否符合
const beforeImgUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传的文件应小于4Mb!')
      return false
    }
  } else {
    ElMessage.error('上传的文件应为png/jpeg/jpg/gif格式!')
  }
}
// 上传品牌图片成功
const handleImgSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  // 图片上传成功，清除验证信息
  ruleFormRef.value.clearValidate('logoUrl')
}
// 添加/修改品牌请求
const addOrUpdateTrademark = async () => {
  // 表单内容全部验证,全部验证成功后才允许发送请求
  await ruleFormRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogFormVisible.value = false
    if (trademarkParams.id) {
      // 修改品牌获取当前页数据
      getHasTrademark(pageNo.value)
    } else {
      // 添加品牌获取数据,向上取整，获取最后一页数据
      getHasTrademark(Math.ceil((total.value + 1) / limit.value))
    }
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
  }
}
// 点击添加按钮
const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 首次点击会报错，使用？语法糖或者nextTick
  ruleFormRef.value?.clearValidate('tmName')
  ruleFormRef.value?.clearValidate('logoUrl')
}
// 点击修改按钮
const updateTrademark = (row: Trademark) => {
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
  // ruleFormRef.value?.clearValidate('tmName')
  // ruleFormRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    ruleFormRef.value.clearValidate('tmName')
    ruleFormRef.value.clearValidate('logoUrl')
  })
}
// 删除品牌
const deleteTrademark = async (id: number) => {
  let result: any = await reqDeleteTrademark(id)
  if (result.code == 200) {
    // 不做判断将会发送两次请求
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
    ElMessage.success('删除品牌成功')
  } else {
    ElMessage.error('删除品牌失败')
  }
}
// 组件挂载
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .el-table {
    margin: 10px 0;
  }
  .paramsForm {
    position: relative;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-icon--upload {
    margin: 40px;
    font-size: 32px;
  }
  // 样式穿透
  :deep(.el-upload) {
    --el-upload-dragger-padding-horizontal: 0px;
    --el-upload-dragger-padding-vertical: 0px;
  }
  :deep(.el-upload-dragger) {
    border: 0;
  }
}
</style>
