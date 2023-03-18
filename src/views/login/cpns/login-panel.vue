<script setup lang="ts">
import AccountPane from './account-pane.vue'
import PhonePane from './phone-pane.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

// 是否记住密码
const ISKEEPWD = 'isKeepPwd'
const isKeepPwd = ref<boolean>(localCache.getCache(ISKEEPWD) ?? false)
watch(isKeepPwd, (newV) => {
  localCache.setCache(ISKEEPWD, newV)
})

// 登录按钮
const activePanelName = ref('account')
const accountRef = ref<InstanceType<typeof AccountPane>>()
const handleLoginBtn = () => {
  if (activePanelName.value === 'account') {
    accountRef.value?.loginAction(isKeepPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="system-name">Airbnb后台管理系统</h1>
    <el-tabs v-model="activePanelName" type="border-card" stretch>
      <el-tab-pane name="account">
        <template #label>
          <div class="tab-label">
            <el-icon><UserFilled /></el-icon>
            <span>帐号登录</span>
          </div>
        </template>
        <account-pane ref="accountRef"></account-pane>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <div class="tab-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </div>
        </template>
        <phone-pane></phone-pane>
      </el-tab-pane>
    </el-tabs>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtn">
      立即登录
    </el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  .system-name {
    text-align: center;
    margin-bottom: 20px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab-label {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
