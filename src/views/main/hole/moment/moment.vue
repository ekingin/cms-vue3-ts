<script setup lang="ts">
import { ref } from 'vue'
import EkEditor from '@/base-ui/editor'
import useMomentStore from '@/store/main/moment'

const editorValue = ref('adad')
const editorData = ref({ html: '', text: '' })

const addMoment = async () => {
  const postData = {
    content: editorData.value.text,
    contentHtml: editorData.value.html
  }
  await useMomentStore().addDataAction(postData)
  editorValue.value = ''
}
const getEditorContent = (data: any) => {
  editorData.value = data
}
</script>
<template>
  <div class="moment-create">
    <div class="header">
      <h2 class="title">创建动态</h2>
      <el-button type="primary" @click="addMoment" :disabled="!editorData.text">添加动态</el-button>
    </div>
    <ek-editor :value="editorValue" @chang-content="getEditorContent"></ek-editor>
  </div>
</template>

<style scoped lang="less">
.moment-create {
  background-color: #fff;
  .header {
    padding: 0 20px;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 18px;
    }
  }
}
</style>
