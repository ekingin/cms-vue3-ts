<script setup lang="ts">
import { ref } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

// callback
const modalConfigRef = ref(modalConfig)
const addCallBack = () => {
  modalConfigRef.value.formItems[2].hidden = false
}
const editCallBack = () => {
  modalConfigRef.value.formItems[2].hidden = true
}
editCallBack.isPre = true

const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal(addCallBack, editCallBack)
</script>

<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @reset-click="resetClick"
      @search-click="searchClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-click="addClick"
      @edit-click="editClick"
    >
      <template #enable="scope">
        <el-button size="small" :type="scope.row.enable === 1 ? 'primary' : 'danger'" plain>
          {{ scope.row.enable === 1 ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<style scoped></style>
