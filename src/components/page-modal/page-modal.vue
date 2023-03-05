<script setup lang="ts">
import { ref, reactive, computed, nextTick, onUpdated } from 'vue'
import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main/main'
import type { IModalConfig, IBtnItem } from '@/types/main'

const props = defineProps<{
  modalConfig: IModalConfig
  otherInfo?: any
}>()
const emit = defineEmits(['selectChange'])

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

// 初始生成的 formData
for (const item of props.modalConfig.formItems) {
  // 生成表单字段
  if (item.hidden === true || item.prop === undefined || item.disabled === true) continue
  formData[item.prop] = item.default ?? ''

  // 根据dictUrl生成出options
  const dictUrl = item.dictUrl
  if (dictUrl) {
    mainStore.postDictAction(dictUrl).then((dict) => (item.options = dict))
  }
}

// 更新 formData
const updateFomData = (afterCB?: () => void) => {
  for (const item of props.modalConfig.formItems) {
    if (item.hidden === true || item.prop === undefined || item.disabled === true) {
      delete formData[item.prop!]
    } else {
      formData[item.prop!] = editRowRef.value
        ? editRowRef.value[item.prop] ?? item.default
        : item.default ?? ''
    }
  }
  afterCB && afterCB()
}

// 设置formData中某一个字段的值
const setFormData = (key: string, value: any) => {
  if (!Object.keys(formData).includes(key)) return
  formData[key] = value
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
  updateFomData()
  if (isEdit) {
    // 编辑
    for (const key in formData) {
      formData[key] = editRow[key]
    }
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

// 点击弹窗中的按钮：确定、取消
const handleBtnClick = (btn: IBtnItem) => {
  dialogVisible.value = false

  // 点击确认按钮时
  if (btn.trigger === 'CONFIRM') {
    let payload = formData
    if (props.otherInfo) {
      payload = { ...formData, ...props.otherInfo }
    }
    if (isEditRef.value && editRowRef.value) {
      systemStore.alterDataByIdAction(pageName.value, editRowRef.value.id, payload)
    } else {
      systemStore.addDataAction(pageName.value, payload)
    }
  }
}

// 下拉框值变化
const handleSelectChange = (newValue: number, prop: string) => {
  emit('selectChange', newValue, prop)
}

defineExpose({
  showDialog,
  updateFomData,
  setFormData,
  getValOfFormData
})
</script>

<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <div class="form">
        <el-form :model="formData" :label-width="modalConfig.formLabelWidth || 100" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.label">
            <el-form-item
              v-if="item.prop !== undefined && (!item.hidden ?? true)"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-model="formData[item.prop]"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
              />
              <el-select
                style="width: 100%"
                v-else-if="item.type === 'select'"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @change="handleSelectChange($event, item.prop!)"
              >
                <template v-for="oItem in item.options" :key="oItem.value">
                  <el-option :label="oItem.label" :value="oItem.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop === undefined && (!item.hidden ?? true)"
              :label="item.label"
              :prop="item.prop"
            >
              <template v-if="item.type === 'slot'">
                <slot :name="item.slotName"></slot>
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
