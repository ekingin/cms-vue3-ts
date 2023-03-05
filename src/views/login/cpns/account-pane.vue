<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'
import useLoginStore from '@/store/login/login'
import type { FormRules, ElForm } from 'element-plus'

const LOGIN_NAME = 'name'
const LOGIN_PASSWORD = 'password'
const accountForm = reactive({
  name: localCache.getCache(LOGIN_NAME) ?? '',
  password: localCache.getCache(LOGIN_PASSWORD) ?? ''
})
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
const accountFormRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const loginAction = (isKeepPwd: boolean = false) => {
  accountFormRef.value?.validate((vaild) => {
    if (vaild) {
      const name = accountForm.name
      const password = accountForm.password

      loginStore.accountLoginAction({ name, password }).then(() => {
        if (isKeepPwd) {
          // 登录成功后，保存账号密码
          localCache.setCache(LOGIN_NAME, name)
          localCache.setCache(LOGIN_PASSWORD, password)
        } else {
          localCache.removeCache(LOGIN_NAME)
          localCache.removeCache(LOGIN_PASSWORD)
        }
      })
    } else {
      ElMessage.error('tips：帐号或密码不正确.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="account-pane">
    <el-form
      ref="accountFormRef"
      :model="accountForm"
      :rules="accountRules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="帐号：" prop="name">
        <el-input v-model="accountForm.name" placeholder="请输入帐号" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="accountForm.password" show-password placeholder="请输入密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
