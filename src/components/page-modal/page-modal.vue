<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue'
import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main/main'
import type { IModalConfig, IBtnItem } from '@/types/main'
import type { ElForm, Resolve } from 'element-plus'

const props = defineProps<{
  modalConfig: IModalConfig
  otherInfo?: any
}>()
const emit = defineEmits(['selectChange', 'confirmSubmit'])

const modalFormRef = ref<InstanceType<typeof ElForm>>()
const formData = reactive<any>({})
const systemStore = useSystemStore()
const mainStore = useMainStore()
const dialogVisible = ref(false)
const isEditRef = ref(false)
const editRowRef = ref()
const pageName = ref(props.modalConfig.pageName)
const dialogTitle = computed(() =>
  isEditRef.value ? props.modalConfig.title.edit : props.modalConfig.title.add
)

for (const item of props.modalConfig.formItems) {
  // 生成表单字段
  if (item.hidden === true || item.prop === undefined || item.disabled === true) continue
  formData[item.prop] = item.default ?? ''

  // dictUrl -> options
  if (item.dictUrl) {
    watchEffect(async () => {
      item.options = await mainStore.queryDictAction(item.dictUrl!)
    })
  }
}

// 更新 formData
const resetFomData = () => {
  return new Promise<any>((resolve, reject) => {
    const oldVal = { ...formData }
    for (const item of props.modalConfig.formItems) {
      if (!item.prop || item.hidden === true || item.disabled === true) {
        delete formData[item.prop!]
      } else {
        formData[item.prop] = isEditRef.value
          ? editRowRef.value[item.prop!] ?? item.default ?? ''
          : item.default ?? ''
      }
    }
    const newVal = { ...formData }
    resolve({ oldVal, newVal })
  })
}

// 修改formData
const patchFormData = (patchData: any) => {
  for (const patchKey of Object.keys(patchData)) {
    if (!Object.keys(formData).includes(patchKey)) return
    formData[patchKey] = patchData[patchKey]
  }
}

// 获取formData中某一个字段的值
const getValOfFormData = (key: string) => {
  if (!Object.keys(formData).includes(key)) return
  return formData[key]
}

// 显示弹窗
const showDialog = (isEdit: boolean = false, editRow: any = {}) => {
  dialogVisible.value = true
  isEditRef.value = isEdit
  editRowRef.value = editRow
  resetFomData()
}

// 点击弹窗中的按钮：确定、取消
const handleBtnClick = async (btn: IBtnItem) => {
  if (btn.trigger === 'CANCEL') {
    dialogVisible.value = false
  } else if (btn.trigger === 'CONFIRM') {
    const { validateFileds } = props.modalConfig
    let isValid: boolean | undefined
    if (validateFileds) {
      isValid = await modalFormRef.value?.validateField(validateFileds, () => {})
    } else {
      isValid = await modalFormRef.value?.validate(() => {})
    }
    if (isValid) {
      confirmSubmit()
    }
  }
}

// 确认提交请求
function confirmSubmit() {
  // 合并额外的参数对象
  let payload = formData
  if (props.otherInfo) {
    payload = { ...formData, ...props.otherInfo }
  }
  // 创建 & 编辑
  if (isEditRef.value && editRowRef.value) {
    systemStore.alterDataByIdAction(pageName.value, editRowRef.value.id, payload)
  } else {
    systemStore.addDataAction(pageName.value, payload)
  }
  // 关闭弹窗、重置表达并且移除校验信息
  dialogVisible.value = false
  modalFormRef.value?.resetFields()
}

// select change
const handleSelectChange = (newValue: number, prop: string) => {
  emit('selectChange', newValue, prop)
}

// 清空表单验证信息
const clearFormVaidate = () => {
  modalFormRef.value?.clearValidate()
}

defineExpose({
  showDialog,
  resetFomData,
  getValOfFormData,
  patchFormData,
  clearFormVaidate
})
</script>

<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      center
      :title="dialogTitle"
      :close-on-click-modal="false"
    >
      <div class="form">
        <el-form
          ref="modalFormRef"
          :model="formData"
          :label-width="modalConfig.formLabelWidth || 100"
          size="large"
          :rules="modalConfig.formRules"
        >
          <template v-for="item in modalConfig.formItems" :key="item.label">
            <el-form-item v-if="!item.hidden" :label="item.label" :prop="item.prop">
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-model="formData[item.prop]"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                clearable
              />
              <el-select
                style="width: 100%"
                v-else-if="item.type === 'select'"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                clearable
                @change="handleSelectChange($event, item.prop!)"
              >
                <template v-for="oItem in item.options" :key="oItem.value">
                  <el-option :label="oItem.label" :value="oItem.value" />
                </template>
              </el-select>
              <template v-if="item.type === 'slot'">
                <slot :name="item.prop"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <template v-for="item in modalConfig.btns" :key="item.trigger">
            <el-button @click="handleBtnClick(item)"> {{ item.label }} </el-button>
          </template>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less"></style>
