import ekRequest from '..'
import type { IAccount } from '@/types'

// 登录
export const postAccountLogin = (account: IAccount) => {
  return ekRequest.post({
    url: '/login',
    data: account
  })
}

// 获取用户信息
export const getUserInfoById = (id: number) => {
  return ekRequest.get({
    url: `/users/${id}`
  })
}

// 获取用户菜单
export const getUserMenusByRoleId = (id: number) => {
  return ekRequest.get({
    url: `/role/${id}/menu`
  })
}
