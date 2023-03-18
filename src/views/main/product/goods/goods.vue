<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

import useSystemStore from '@/store/main/system'

// hooks
const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal()

// 修改商品状态
const systemStore = useSystemStore()
const statusBtnClick = (row: any) => {
  const { id, status } = row
  systemStore.alterDataByIdAction('goods', id, { status: +!status })
}
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
        <el-button
          size="small"
          :type="scope.row.status ? 'primary' : 'danger'"
          plain
          @click="statusBtnClick(scope.row)"
        >
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
    <page-modal ref="pageModalRef" :modal-config="modalConfig"></page-modal>
  </div>
</template>

<style scoped></style>
