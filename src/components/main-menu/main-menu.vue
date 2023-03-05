<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-data'
import useLoginStore from '@/store/login/login'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const router = useRouter()
const route = useRoute()
const { menuInfo } = loginStore

const defaultActive = computed(() => {
  const menu = mapPathToMenu(route.path, menuInfo)
  return menu?.id + ''
})

const menuItemClick = (submenu: any) => {
  router.push(submenu.url)
}
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isCollapse" class="title">Airbnb CMS</h2>
    </div>
    <el-menu
      :collapse="isCollapse"
      :default-active="defaultActive"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <template v-for="menu in menuInfo" :key="menu.id">
        <!-- 有子菜单的菜单项，可展开 -->
        <el-sub-menu
          v-if="Array.isArray(menu.children) && menu.children.length > 0"
          :index="`${menu.id}`"
        >
          <template #title>
            <el-icon>
              <component :is="menu.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="subMenu in menu.children" :key="subMenu.id">
            <el-menu-item :index="`${subMenu.id}`" @click="menuItemClick(subMenu)">{{
              subMenu.name
            }}</el-menu-item>
          </template>
        </el-sub-menu>
        <!-- 没有子菜单的菜单项 -->
        <el-menu-item v-else :index="`${menu.id}`" @click="menuItemClick(menu)">{{
          menu.name
        }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 20px;
    .img {
      width: 25px;
      margin-right: 8px;
    }
    .title {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }
  }

  /*
   * 样式覆盖
   */
  .el-menu {
    border-right: none;
  }
  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
