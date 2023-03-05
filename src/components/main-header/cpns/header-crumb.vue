<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-data'

const route = useRoute()
const loginStore = useLoginStore()
const menuInfo = loginStore.menuInfo
const breadcrumb = computed(() => mapPathToBreadcrumb(route.path, menuInfo))
</script>

<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less"></style>
