import ekRequest from '@/service'
import { ElMessage } from 'element-plus'

/**
 * 对系统管理的网络请求
 * */
// 获取页面表格的数据列表
export const getDataList = (pageName: string, data = {}) => {
  return ekRequest.post({
    url: `/${pageName}/list`,
    data
  })
}

// 删除页面数据
export const deleteDataById = (pageName: string, id: number) => {
  return ekRequest
    .delete({
      url: `/${pageName}/${id}`
    })
    .then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
}

// 添加页面数据
export const addData = (pageName: string, data = {}) => {
  return ekRequest
    .post({
      url: `/${pageName}`,
      data
    })
    .then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
}

// 修改页面数据
export const alterDataById = (pageName: string, id: number, data = {}) => {
  return ekRequest
    .patch({
      url: `/${pageName}/${id}`,
      data
    })
    .then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
}
