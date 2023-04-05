<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './cpns/header-info.vue'
import headerCrumb from './cpns/header-crumb.vue'

const emit = defineEmits(['changeFoldState'])

const isFold = ref(false)
const foldIconClick = () => {
  isFold.value = !isFold.value
  emit('changeFoldState', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="header-left">
      <el-icon class="fold-btn" size="30px" @click="foldIconClick">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <header-crumb></header-crumb>
    </div>
    <div class="header-right">
      <header-info></header-info>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .header-left,
  .header-right {
    height: 100%;
    display: flex;
    align-items: center;
    .fold-btn {
      cursor: pointer;
    }
  }
  .el-icon {
    margin-right: 8px;
  }
}
</style>
