<script setup lang="ts">
import type { IDesc } from '../types'

const props = defineProps<{
  infoDesc: IDesc
}>()
const defaultOpt = {
  overview: '',
  column: 1,
  list: []
}
const options = Object.assign(defaultOpt, props.infoDesc)
</script>

<template>
  <el-descriptions class="desc-wrap" :title="options.overview" :column="options.column" border>
    <template v-for="item in options.list" :key="item.title">
      <el-descriptions-item :label="item.label" label-align="left" align="left">
        {{ item.desc }}
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<style scoped lang="less">
.desc-wrap {
  margin-bottom: 20px;
  :deep(.is-bordered-label) {
    width: 300px;
  }
}
</style>
