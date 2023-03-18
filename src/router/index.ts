import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenuItem } from '@/utils/map-data'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  // 当未登录时访问 /main 开头的路径，重定向到登录页
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 重定向到第一个菜单项
  if (to.path === '/main') {
    return firstMenuItem?.url
  }
})

export default router
