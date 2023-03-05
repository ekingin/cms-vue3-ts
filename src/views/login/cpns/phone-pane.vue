<script setup lang="ts">
import { reactive } from 'vue'

const phoneForm = reactive({
  phone: '',
  vcode: ''
})
</script>

<template>
  <div class="phone-pane">
    <el-form :model="phoneForm" label-width="80px" status-icon>
      <el-form-item label="手机号：" prop="name">
        <el-input v-model="phoneForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码：" prop="password">
        <div class="vertify-code">
          <el-input v-model="phoneForm.vcode" placeholder="请输入验证码" />
          <el-button class="vcode-btn" type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.phone-pane {
  .vertify-code {
    display: flex;
    .vcode-btn {
      margin-left: 8px;
    }
  }
}
</style>
