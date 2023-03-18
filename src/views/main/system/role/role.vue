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

// 编辑权限菜单时，拿到回显的数据
const inroTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallBack = (row: any) => {
  nextTick(() => {
    inroTreeRef.value?.setCheckedKeys(mapMenuListToIds(row.menuList))
  })
}
// 新建时，把菜单树选项置空
const addCallBack = () => {
  nextTick(() => {
    inroTreeRef.value?.setCheckedKeys([])
  })
}
const { pageContentRef, searchClick, resetClick } = usePageContent()
const { pageModalRef, addClick, editClick } = usePageModal(addCallBack, editCallBack)

// 获取完整的菜单
const mainStore = useMainStore()
const { wholeMenuTree } = storeToRefs(mainStore)

// 收集选中的节点的ids
const otherInfo = ref<{ menuIds: number[] }>({ menuIds: [] })
const handleCheckChange = (data1: any, data2: any) => {
  const selectedKeys = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value.menuIds = selectedKeys
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
      <template #menuIds>
        <el-tree
          ref="inroTreeRef"
          :data="wholeMenuTree"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handleCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<style scoped lang="less"></style>
