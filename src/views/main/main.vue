<script setup lang="ts">
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

const isFold = ref(false)
const changeFoldState = (flag: boolean) => {
  isFold.value = flag
}
</script>

<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-collapse="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @change-fold-state="changeFoldState"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
}
.main-container {
  height: 100%;
  .el-header {
    height: 50px;
  }

  .el-main {
    background-color: #f0f2f5;
  }

  /* 删除侧边栏滚动条 */
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.5s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
