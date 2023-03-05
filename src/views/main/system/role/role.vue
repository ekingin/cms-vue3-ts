<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search-config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal-config'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-data'

const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal(addCallBack, editCallBack)

// el-tree
// 1.获取完整的菜单用于tree组件显示
const mainStore = useMainStore()
const { entireMenuList } = storeToRefs(mainStore)

// 2.添加权限，收集选中的数节点的ids，传给page-modal
let otherInfo = ref({})
function handleCheckChange(data1: any, data2: any) {
  const selectedKeys = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList: selectedKeys }
}

// 3.编辑权限菜单时，拿到回显的数据
const inroTreeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(row: any) {
  nextTick(() => {
    inroTreeRef.value?.setCheckedKeys(mapMenuListToIds(row.menuList))
  })
}

// 4.新建时，把菜单置空
function addCallBack() {
  nextTick(() => {
    inroTreeRef.value?.setCheckedKeys([])
  })
}
</script>

<template>
  <div class="role">
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
    ></page-content>
    <page-modal ref="pageModalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #introTree>
        <el-tree
          ref="inroTreeRef"
          :data="entireMenuList"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handleCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<style scoped></style>
