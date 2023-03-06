<script setup lang="ts" name="overview">
import ulList from './cpns/ul-list.vue'
import infoDesc from './cpns/info-desc.vue'
import {
  technologyStacksData,
  programStandarmInfo,
  gitOperationInfo,
  componentDescInfo
} from './data'
</script>

<template>
  <div class="overview">
    <el-card header="关于">
      <span>
        vue3+ts后台管理系统基于Vue3、VueRouter、Pinia、Axios、TS、Element Plus、Echarts5的解决方案。
      </span>
    </el-card>
    <el-card header="技术栈">
      <ul-list :technology-stacks="technologyStacksData"></ul-list>
    </el-card>
    <el-card header="项目规范">
      <info-desc :info-desc="programStandarmInfo"></info-desc>
      <info-desc :info-desc="componentDescInfo"></info-desc>
    </el-card>
    <el-card header="Git提交规范">
      <info-desc :info-desc="gitOperationInfo"></info-desc>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
  &:deep(.el-card__header) {
    font-weight: 700;
  }
}
</style>
