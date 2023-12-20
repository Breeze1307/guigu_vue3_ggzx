<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2023-12-20 20:11:47
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
      <el-table-column label="品牌操作">
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
      <el-form label-width="100px" class="paramsForm">
        <el-form-item label="品牌名称">
          <el-input v-model="trademarkParams.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <template #>
            <el-upload
              drag
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
import { ref, reactive, onMounted } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
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
  console.log(response)

  trademarkParams.logoUrl = response.data
}
// 添加/修改品牌请求
const addOrUpdateTrademark = async () => {
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogFormVisible.value = false
    getHasTrademark()
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
}
// 点击修改按钮
const updateTrademark = (row: Trademark) => {
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
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
