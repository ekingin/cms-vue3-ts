<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import EkEditor from '@/base-ui/editor'
import { addData } from '@/service/main/system'

const htmlStr = ref<string>()
const data = {
  title: '',
  content: ''
}

const createStory = () => {
  const matchTitleRes = htmlStr.value?.match(
    /<h[1-6]>([\u4e00-\u9fa5\w\s[\]\\^$.|?*+()&;]*)<\/h[1-6]>/
  )
  if (!matchTitleRes || !htmlStr.value) {
    ElMessage({
      message: '请写入故事标题！',
      type: 'error'
    })
  } else {
    data.title = matchTitleRes[0]
    data.content = htmlStr.value.replace(data.title, '')
    // 暂不校验content的内容，例如是否为空

    addData('story', data)
  }
}
const getConent = (html: string) => {
  htmlStr.value = html
}
</script>
<template>
  <div class="chat">
    <div class="header">
      <el-button type="primary" @click="createStory" :disabled="!htmlStr">添加故事</el-button>
    </div>
    <ek-editor @chang-content="getConent"></ek-editor>
  </div>
</template>

<style scoped lang="less">
.chat {
  background-color: #fff;
  .header {
    padding: 10px;
    text-align: right;
  }
}
</style>
