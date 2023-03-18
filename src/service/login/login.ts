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
export const getUserInfoById = (userId: number) => {
  return ekRequest.get({
    url: `/users/${userId}`
  })
}

// 获取用户的角色菜单
export const getUserMenusByRoleId = (roleId: number) => {
  return ekRequest.get({
    url: `/role/${roleId}/menu`
  })
}
