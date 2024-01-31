<!--
 * @Description: 
 * @Author: breeze1307
 * @Date: 2023-12-12 15:53:59
 * @LastEditTime: 2024-01-06 20:11:38
 * @LastEditors: breeze1307
-->
<template>
  <Category :scene="scene"></Category>
  <el-card class="box-card">
    <template v-if="scene == 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        class="addBtn"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border :data="attrArr">
        <el-table-column
          type="index"
          label="序号"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              style="margin: 0 5px"
              v-for="(attr, index) in row.attrValueList"
              :key="attr.id"
              :type="index % 2 == 0 ? 'success' : 'warning'"
            >
              {{ attr.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row }">
            <el-button
              icon="Edit"
              size="small"
              type="warning"
              @click="updateAttr(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.attrName}属性?`"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input v-model="attrInfo.attrName" placeholder="请输入属性名称" />
        </el-form-item>
      </el-form>
      <el-button
        icon="Plus"
        type="primary"
        :disabled="attrInfo.attrName ? false : true"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button type="primary" @click="scene = 0">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrInfo.attrValueList">
        <el-table-column
          type="index"
          label="序号"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <!-- 获取每一个el-input实例并存储 -->
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-if="row.flag"
              v-model="row.valueName"
              size="small"
              @blur="toLook(row, $index)"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{ $index }">
            <el-button
              icon="Delete"
              type="primary"
              size="small"
              @click="delAttrVal($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="saveAttrInfo"
        :disabled="attrInfo.attrValueList.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button type="primary" @click="scene = 0">取消</el-button>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import {
  reqAttrInfoList,
  reqSaveAttrInfo,
  reqDeleteAttr,
} from '@/api/product/attr'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
// 定义card组件切换
let scene = ref<number>(0)
// 属性参数
let attrInfo = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
// 存储el-input实例
let inputArr = ref<any>([])
watch(
  // 监听categoryStore.c3Id变化
  () => categoryStore.c3Id,
  () => {
    // id发生变化时，清空上一次的属性
    attrArr.value = []
    if (categoryStore.c3Id) {
      getAttr()
    }
  },
)
// 请求属性
const getAttr = async () => {
  let { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttrInfoList(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
// 添加属性
const addAttr = () => {
  Object.assign(attrInfo, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  scene.value = 1
}
// 修改属性
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrInfo, JSON.parse(JSON.stringify(row)))
}
// 添加属性值
const addAttrValue = () => {
  attrInfo.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // dom更新后，数组最后一个元素获得焦点
  nextTick(() => {
    inputArr.value[attrInfo.attrValueList.length - 1].focus()
  })
}
// 保存添加/修改的值
const saveAttrInfo = async () => {
  attrInfo.categoryId = categoryStore.c3Id
  let result: any = await reqSaveAttrInfo(attrInfo)
  if (result.code == 200) {
    getAttr()
    ElMessage.success(attrInfo.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.success(attrInfo.id ? '修改失败' : '添加失败')
  }
  scene.value = 0
}
// 属性值查看模式
const toLook = (row: AttrValue, index: number) => {
  // 属性值为空
  if (row.valueName.trim() == '') {
    ElMessage.error('属性值不能为空')
    attrInfo.attrValueList.splice(index, 1)
    return
  }
  // 属性值重复
  let repeat = attrInfo.attrValueList.find((item) => {
    // 排除当前添加的
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('属性值不能重复')
    attrInfo.attrValueList.splice(index, 1)
    return
  }
  row.flag = false
}
// 属性值编辑模式
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
// 删除属性值
const delAttrVal = (index: number) => {
  attrInfo.attrValueList.splice(index, 1)
}
// 删除属性
const deleteAttr = async (attrId: number) => {
  let result: any = await reqDeleteAttr(attrId)
  if (result.code == 200) {
    getAttr()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
// 路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
}
.addBtn {
  margin-bottom: 10px;
}
</style>
