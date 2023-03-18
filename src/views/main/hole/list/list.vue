<script setup lang="ts">
import router from '@/router'
import useMomentStore from '@/store/main/moment'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'

const { pageContentRef, searchClick, resetClick } = usePageContent()

const jumpToDetail = (row: any) => {
  useMomentStore().changeDetailRow(row)
  router.push('/main/hole/moment/detail')
}
</script>

<template>
  <div class="moment-list">
    <page-search
      :search-config="searchConfig"
      @reset-click="resetClick"
      @search-click="searchClick"
    ></page-search>
    <page-content ref="pageContentRef" :content-config="contentConfig">
      <template #content="props">
        <span class="content" @click="jumpToDetail(props.row)">{{ props.row.content }}</span>
      </template>
    </page-content>
  </div>
</template>

<style scoped>
.content {
  color: #409eff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
