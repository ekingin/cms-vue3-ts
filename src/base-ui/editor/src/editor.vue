<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'

const props = withDefaults(
  defineProps<{
    width?: string | string
    height?: number | string
    mode?: 'default' | 'simple'
  }>(),
  {
    width: '100%',
    height: 500,
    mode: 'default'
  }
)
const emit = defineEmits(['changContent'])

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 编辑器实例
const editorRef = shallowRef()
const valueHtml = ref()

// 工具栏配置对象
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-image', 'group-video', 'insertTable']
}
// 编辑器配置对象
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...'
}

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor: IDomEditor) => {
  emit('changContent', { html: editor.getHtml(), text: editor.getText() })
}
</script>

<template>
  <div
    style="border: 1px solid #ccc"
    :style="{ width: typeof width === 'number' ? width + 'px' : width }"
  >
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{
        height: typeof height === 'number' ? height + 'px' : height,
        overflowY: 'hidden'
      }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<style scoped lang="less"></style>
