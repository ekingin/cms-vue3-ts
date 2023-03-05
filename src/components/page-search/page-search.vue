<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import type { ISearchConfig } from '@/types/main'
import usePermission from '@/hooks/usePermission'

const props = defineProps<{
  searchConfig: ISearchConfig
}>()
const emit = defineEmits(['resetClick', 'searchClick'])

// 判断是否有查询权限
const isQuery = usePermission(`${props.searchConfig.pageName}:query`)

// 初始化表单对象
const formData = reactive<any>({})
for (const item of props.searchConfig.formItems) {
  if (item.prop === undefined || item.hidden) continue
  formData[item.prop] = item.default ?? ''
}

// 组件引用
const searchFormRef = ref<InstanceType<typeof ElForm>>()

// 按钮监听事件
const handleBtnClick = (trigger: string) => {
  if (trigger === 'RESET') {
    searchFormRef.value?.resetFields()
    emit('resetClick')
  } else if (trigger === 'QUERY') {
    emit('searchClick', formData)
  }
}
</script>

<template>
  <div class="page-search" v-if="isQuery">
    <!-- 表单搜索 -->
    <el-form ref="searchFormRef" :model="formData" label-width="120px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item
              v-if="item.prop !== undefined && (!item.hidden ?? true)"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :show-password="item.type === 'password'"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
              <el-select
                v-else-if="item.type === 'select'"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="oItem in item.options" :key="oItem.value">
                  <el-option :label="oItem.label" :value="oItem.value" />
                </template>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'date-range'"
                v-model="formData[item.prop]"
                type="daterange"
                :range-separator="item.rangeSeparator"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 按钮组 -->
    <div class="operate-btns">
      <template v-for="item in searchConfig.btns" :key="item.label">
        <el-button v-bind="item" @click="handleBtnClick(item.trigger)">
          {{ item.label }}
        </el-button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-search {
  background-color: #fff;
  padding: 20px 0;

  /** 样式重置 */
  .el-form-item {
    padding: 15px 20px;
    margin-bottom: 0;
  }

  .operate-btns {
    padding: 20px;
    text-align: right;
  }
}
</style>
