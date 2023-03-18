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

import useSystemStore from '@/store/main/system'

// 1.hooks
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

// 2.状态按钮被点击
const systemStore = useSystemStore()
const statusBtnClick = (row: any) => {
  const { id, status } = row
  systemStore.alterDataByIdAction('users', id, { status: +!status })
}
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
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.status === 1 ? 'primary' : 'danger'"
          plain
          @click="statusBtnClick(scope.row)"
        >
          {{ scope.row.status === 1 ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<style scoped></style>
