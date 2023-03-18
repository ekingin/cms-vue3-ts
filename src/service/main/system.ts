import ekRequest from '@/service'
import { ElMessage } from 'element-plus'

/**
 * 对系统管理的网络请求
 * */
// 获取页面表格的数据列表
export const getDataList = (pageName: string, queryParams: any, postData: any) => {
  return ekRequest.post({
    url: `/${pageName}/list`,
    params: queryParams,
    data: postData
  })
}

// 删除页面数据
export const deleteDataById = (pageName: string, deleteId: number) => {
  return ekRequest
    .delete({
      url: `/${pageName}/${deleteId}`
    })
    .then(({ code, message }) => {
      ElMessage({
        message,
        type: code === 0 ? 'success' : 'error'
      })
    })
}

// 添加页面数据
export const addData = (pageName: string, postData = {}) => {
  return ekRequest
    .post({
      url: `/${pageName}`,
      data: postData
    })
    .then(({ code, message }) => {
      ElMessage({
        message,
        type: code === 0 ? 'success' : 'error'
      })
    })
}

// 修改页面数据
export const alterDataById = (pageName: string, patchId: number, patchData = {}) => {
  return ekRequest
    .patch({
      url: `/${pageName}/${patchId}`,
      data: patchData
    })
    .then(({ code, message }) => {
      ElMessage({
        message,
        type: code === 0 ? 'success' : 'error'
      })
    })
}
