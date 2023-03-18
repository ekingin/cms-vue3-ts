<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/moment'

const momentStore = useMainStore()
const { detailRow } = storeToRefs(momentStore)
</script>

<template>
  <div class="moment-detail" v-html="detailRow.contentHtml"></div>
</template>

<style lang="less">
.moment-detail {
  background-color: #fff;
  height: 100%;
  padding: 20px;

  p,
  li {
    white-space: pre-wrap; /* 保留空格 */
  }

  blockquote {
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
  }

  code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
    border-radius: 3px;
  }
  pre > code {
    display: block;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
  }
  td,
  th {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
  }
  th {
    background-color: #f1f1f1;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  input[type='checkbox'] {
    margin-right: 5px;
  }
}
</style>
