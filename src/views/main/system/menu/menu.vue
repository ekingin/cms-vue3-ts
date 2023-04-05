<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/store/main/main'
import { mapMenuListToDict } from '@/utils/map-data'
import type { ISelectFormItem } from '@/types'

const editRowRef = ref()
const modalConfigRef = ref(modalConfig)
const mainStore = useMainStore()
const { wholeMenuTree } = storeToRefs(mainStore)
// 根据完整菜单映射字典Map
const dictMap = computed(() => mapMenuListToDict(wholeMenuTree.value))

// 设置菜单表单字段的初始状态
const setMenuForm = (menuType: number) => {
  const dict = dictMap.value.get(menuType - 1)
  const parentMenuOptions = dict ?? []
  const isHiddenParent = dict ? false : true
  const isHiddedIcon = menuType === 1 ? false : true
  const isHiddenPermission = menuType === 3 ? false : true
  ;(modalConfigRef.value.formItems[2] as ISelectFormItem).options = parentMenuOptions
  modalConfigRef.value.formItems[2].hidden = isHiddenParent
  modalConfigRef.value.formItems[3].hidden = isHiddedIcon
  // url 和 permission 只显示一个
  modalConfigRef.value.formItems[4].hidden = !isHiddenPermission
  modalConfigRef.value.formItems[5].hidden = isHiddenPermission
  // 清除表单校验信息
  pageModalRef.value?.clearFormVaidate()
}

// 组件 hooks
const editCallBack = (row: any) => {
  editRowRef.value = row
  setMenuForm(row.type)
}
const addCallBack = () => {
  editRowRef.value = null
  // 新建菜单初始隐藏菜单icon
  modalConfigRef.value.formItems[3].hidden = true
}
editCallBack.isPre = true
addCallBack.isPre = true
const { pageModalRef, addClick, editClick } = usePageModal(addCallBack, editCallBack)

// 所有下拉框值改变时触发
const handleSelectChange = (value: number, prop: string) => {
  switch (prop) {
    case 'type':
      handleTypeChange(value)
      break
    case 'parentId':
      handleParentIdChange(value)
      break
  }
}

// 菜单层级值改变
const handleTypeChange = (value: number) => {
  setMenuForm(value)

  pageModalRef.value?.resetFomData().then(({ oldVal }) => {
    const { name, type } = oldVal
    const patchData = { name, type, url: '' }
    if (!editRowRef.value) {
      patchData.url = type === 1 ? '/main/<url>' : ''
    }
    pageModalRef.value?.patchFormData(patchData)
  })
}

// 父级菜单值改变
const handleParentIdChange = (value: number) => {
  const typeValue = pageModalRef.value?.getValOfFormData('type')
  const dict = dictMap.value.get(typeValue - 1)
  const parentMenuUrl = dict.find((item: any) => item.value === value).url
  const urlDefaultVal = parentMenuUrl + '/<url>'
  pageModalRef.value?.patchFormData({ url: urlDefaultVal })
}
</script>

<template>
  <div class="menu">
    <page-content
      @add-click="addClick"
      @edit-click="editClick"
      :content-config="contentConfig"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modal-config="modalConfigRef"
      @select-change="handleSelectChange"
    ></page-modal>
  </div>
</template>

<style scoped></style>
