import type { RouteRecordRaw } from 'vue-router'

/**
 * 加载本地文件中的路由对象
 * @returns 路由数组
 */
export const loadLocalRoutes = () => {
  const localRoutes: RouteRecordRaw[] = []

  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    localRoutes.push(files[key].default)
  }

  return localRoutes
}

export let firstMenuItem: any = null

/**
 * 把权限菜单数组映射成路由数组
 * @param menus 菜单数组
 * @returns 路由数组
 */
export const mapMenusToRoutes = (menus: any[]) => {
  // 1.获取本地所有的路由数组
  const localRoutes = loadLocalRoutes()

  // 2 根据权限菜单映射出有权限的路由对象数组
  const authRoutes: RouteRecordRaw[] = []
  function filterAuthRoutes(menus: any[]) {
    for (const menu of menus ?? []) {
      if (menu.url) {
        // 1.添加重定向路由
        if (menu.url && menu.children && menu.children[0].url) {
          authRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        }
        // 2.添加有权限的路由
        const route = localRoutes.find((item) => item.path === menu.url)
        if (route) {
          authRoutes.push(route)
        }
        // 3.记录第一个有权限的路由
        if (route && !firstMenuItem) {
          firstMenuItem = menu
        }
      }
      if (menu.children) {
        filterAuthRoutes(menu.children)
      }
    }
  }
  filterAuthRoutes(menus)

  // 3.添加 registeredRoutes 中的路由
  const registeredRoutes = ['moment-detail']
  registeredRoutes.forEach((routeName) =>
    authRoutes.push(localRoutes.find((item) => item.name === routeName)!)
  )

  return authRoutes
}

/**
 * 根据路径匹配菜单数组中的菜单对象
 * @param path 当前页面的路径
 * @param menus 菜单数组
 * @returns 菜单对象
 */
export const mapPathToMenu = (path: string, menus: any[]) => {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        return submenu
      }
    }
  }
}

/**
 * 根据页面路径和菜单数组映射出面包屑数组
 * @param path 页面路径
 * @param menus 菜单数组
 * @returns 面包屑数组
 */
export const mapPathToBreadcrumb = (path: string, menus: any[]) => {
  const breadcrumb: any[] = []

  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumb.push({ name: menu.name, path: menu.url })
        breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumb
}

/**
 * 将数据集合应映射成下拉列表的选项数组
 * @param list roleList | departmentList
 * @returns options
 */
export const mapDataListToOptions = (list: any[]) => {
  return list.map((item) => ({
    label: item.name,
    value: item.id
  }))
}

/**
 * 返回value在字典集合中的label值
 * @param value value
 * @param dict 字典集合
 * @returns label
 */
export const mapValueFromDict = (value: number, dict?: any[]) => {
  if (!dict) return
  return dict.find((item) => item.value === value)?.label
}

/**
 * 把菜单数组映射成ids数组，只取最内层叶节点的id
 * @param menus
 * @returns ids
 */
export const mapMenuListToIds = (menus: any[]) => {
  const ids: number[] = []

  function recurseMenus(menus: any[]) {
    for (const item of menus ?? []) {
      if (item.children) {
        recurseMenus(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseMenus(menus)

  return ids
}

/**
 * 根据权限菜单映射出所有的按钮权限
 * @param menus 菜单数组
 * @returns permissions
 */
export const mapMenusToPermisions = (menus: any[]) => {
  const permisions: string[] = []

  function recurseMenus(list: any[]) {
    for (const item of list ?? []) {
      if (item.permission) {
        permisions.push(item.permission)
      } else {
        recurseMenus(item.children)
      }
    }
  }
  recurseMenus(menus)

  return permisions
}

/**
 * 根据完整菜单创建 Map<type, dict<label, name, url>>
 * @param menus
 * @returns map
 */
export const mapMenuListToDict = (menus: any[]) => {
  const map = new Map()

  function recurseMapList(menus: any[]) {
    for (const item of menus) {
      // 1.新建一个键值对
      if (!map.get(item.type)) {
        map.set(item.type, [])
      }
      // 2.对符合键的数据进行处理
      if (item.type === 1 || item.type === 2) {
        map.get(item.type).push({
          label: item.name,
          value: item.id,
          url: item.url
        })
      }
      if (item.children) {
        recurseMapList(item.children)
      }
      // 3.删除键值为空数组的键值对
      if (map.get(item.type).length === 0) {
        map.delete(item.type)
      }
    }
  }
  recurseMapList(menus)

  return map
}
