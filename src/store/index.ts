import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'

const pinia = createPinia()

const registerStore = (app: App<Element>) => {
  // 1.注册pinia
  app.use(pinia)

  // 2.加载本地缓存数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
