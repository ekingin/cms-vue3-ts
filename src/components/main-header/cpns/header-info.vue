<script setup lang="ts">
import { storeToRefs } from 'pinia'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const exitSystem = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operate-btn">
      <el-icon size="20px"><Bell /></el-icon>
      <el-icon class="red-dot" size="20px"><ChatDotRound /></el-icon>
      <el-icon size="20px"><Search /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitSystem">
              <el-icon><CircleClose /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
}
.operate-btn {
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 15px;
  }
  .red-dot::after {
    content: '';
    position: absolute;
    right: -3px;
    top: -3px;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
  }
}

.info {
  margin-left: 20px;
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    .name {
      margin-left: 8px;
    }
  }
  /* 全局html选择样式 */
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
