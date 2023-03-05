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

const modalConfigRef = ref(modalConfig)
const addCallBack = () => {
  modalConfigRef.value.formItems[8].hidden = true
}
const editCallBack = () => {
  modalConfigRef.value.formItems[8].hidden = false
}
editCallBack.isPre = true
addCallBack.isPre = true
const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal(addCallBack, editCallBack)
</script>

<template>
  <div class="goods">
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
        <el-button size="small" :type="scope.row.status ? 'primary' : 'danger'" plain>
          {{ scope.row.status ? '上架' : '下架' }}
        </el-button>
      </template>
      <template #imgUrl="scope">
        <el-image
          style="width: 70px; height: 70px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
        />
      </template>
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<style scoped></style>
