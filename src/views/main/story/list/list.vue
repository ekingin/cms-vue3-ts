<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content-config'
</script>

<template>
  <div class="story">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<style scoped></style>
