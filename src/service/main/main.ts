// 对多模块都需要的数据放在这里请求
import ekRequest from '..'

// 请求完整的数据，包括菜单、商品类别、角色、部门
export const postWholeData = (url: string) => {
  return ekRequest.get({
    url
  })
}
