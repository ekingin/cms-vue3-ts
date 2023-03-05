import { defineStore } from 'pinia'
import router from '@/router'
import useMainStore from '@/store/main/main'
import { postAccountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-data'
import { mapMenuListToPermisions } from '@/utils/map-data'
import { LOGIN_TOKEN } from '@/global/constants'
import type { IAccount } from '@/types'

interface ILoginState {
  token: string
  userInfo: any
  menuInfo: any[]
  permissions: string[]
}
const USER_INFO = 'userInfo'
const MENU_INFO = 'menuInfo'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    menuInfo: [],
    permissions: []
  }),
  actions: {
    // 帐号登录
    async accountLoginAction(account: IAccount) {
      // 1.请求登录，保存token
      const loginRes = await postAccountLogin(account)
      const { id, token } = loginRes.data
      this.token = token
      localCache.setCache(LOGIN_TOKEN, token)

      // 2.获取用户信息(角色id)
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 3.获取用户角色菜单
      const menuInfoRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.menuInfo = menuInfoRes.data

      // 4.保存用户信息，菜单信息
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(MENU_INFO, this.menuInfo)

      // 获取菜单中的按钮权限
      const permissions = mapMenuListToPermisions(this.menuInfo)
      this.permissions = permissions

      // 获取完整菜单
      const mainStore = useMainStore()
      mainStore.postMenuListAction()

      // 5.动态注册路由
      const routes = mapMenusToRoutes(this.menuInfo)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.跳转到第一个菜单项
      router.push('/main')
    },
    // 刷新导致store和动态注册的路由数据丢失，加载本地缓存，重新注册动态路由
    loadLocalCacheAction() {
      // 1.加载store数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const menuInfo = localCache.getCache(MENU_INFO)
      if (token && userInfo && menuInfo) {
        this.token = token
        this.userInfo = userInfo
        this.menuInfo = menuInfo

        // 获取完整菜单
        const mainStore = useMainStore()
        mainStore.postMenuListAction()

        // 2.动态注册路由
        const routes = mapMenusToRoutes(menuInfo)
        routes.forEach((route) => router.addRoute('main', route))

        // 3.获取菜单中的按钮权限
        const permissions = mapMenuListToPermisions(menuInfo)
        this.permissions = permissions
      }
    }
  }
})

export default useLoginStore
