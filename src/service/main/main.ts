// 对多模块都需要的数据放在这里请求
import ekRequest from '..'

// 请求所有菜单
export const postMenuList = () => {
  return ekRequest.post({
    url: '/menu/list'
  })
}

// 请求字典集合
export const postDictData = (url: string) => {
  return ekRequest.post({
    url
  })
}
