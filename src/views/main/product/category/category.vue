<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal()
</script>

<template>
  <div class="category">
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
    </page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfig"></page-modal>
  </div>
</template>

<style scoped></style>
