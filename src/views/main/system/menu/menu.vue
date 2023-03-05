<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/main'
import { mapMenuListToDict } from '@/utils/map-data'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

const editRowRef = ref()
const modalConfigRef = ref(modalConfig)
const mainStore = useMainStore()
const { entireMenuList } = storeToRefs(mainStore)
// 根据完整菜单映射字典Map
const dictMap = computed(() => mapMenuListToDict(entireMenuList.value))

// 设置父级菜单是否禁用，并且设置其options，菜单icon是否显示
const setParentMenu = (menuType: number) => {
  const dict = dictMap.value.get(menuType - 1)
  const parentMenuOptions = dict ?? []
  const isDisabledParentMenu = dict ? false : true
  const isHiddenMenuIcon = menuType === 1 ? false : true
  modalConfigRef.value.formItems[2].options = parentMenuOptions
  modalConfigRef.value.formItems[2].disabled = isDisabledParentMenu
  modalConfigRef.value.formItems[4].hidden = isHiddenMenuIcon
}

const editCallBack = (row: any) => {
  editRowRef.value = row
  setParentMenu(row.type)
}
const addCallBack = () => {
  editRowRef.value = null
  // 新建菜单初始隐藏菜单icon
  modalConfigRef.value.formItems[4].hidden = true
}
editCallBack.isPre = true
addCallBack.isPre = true

const { pageContentRef } = usePageContent()
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
  setParentMenu(value)

  // 当切换菜单层级时，重新生成formdata
  pageModalRef.value?.updateFomData(() => {
    // 重新设置type值
    pageModalRef.value?.setFormData('type', value)

    // 如果创建一级菜单，设置菜单URL的默认值
    if (!editRowRef.value) {
      const urlDefaultVal = value === 1 ? '/main/<url>' : ''
      pageModalRef.value?.setFormData('url', urlDefaultVal)
    }
  })
}

// 父级菜单值改变
const handleParentIdChange = (value: number) => {
  const typeValue = pageModalRef.value?.getValOfFormData('type')
  const dict = dictMap.value.get(typeValue - 1)
  const parentMenuUrl = dict.find((item: any) => item.value === value).url
  const urlDefaultVal = parentMenuUrl + '/<url>'
  pageModalRef.value?.setFormData('url', urlDefaultVal)
}
</script>

<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
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
