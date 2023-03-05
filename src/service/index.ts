import EKRequest from './request'
import { BASE_URL, TIMEOUT } from './config/index'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const ekRequest = new EKRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default ekRequest
