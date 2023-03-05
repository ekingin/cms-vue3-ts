import { defineStore } from 'pinia'
import { postDictData, postMenuList } from '@/service/main/main'
import { mapDataListToOptions } from '@/utils/map-data'
import type { IMainStore } from '@/types'
import { API_DICT_CATEGORY, API_DICT_DEPARTMENT, API_DICT_ROLE } from '@/global/constants'

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireMenuList: [], // 完整菜单
    dicts: new Map() // 所有的字典集合
  }),
  actions: {
    // 获取菜单
    async postMenuListAction() {
      const res = await postMenuList()
      this.entireMenuList = res.data.list
    },
    // 获取字典集合
    async postDictAction(url: string) {
      let dict = this.dicts.get(url)
      if (dict) {
        return dict
      } else {
        const res = await postDictData(url)
        dict = mapDataListToOptions(res.data.list)
        this.dicts.set(url, dict)
        return dict
      }
    },
    setDicts(pageName: string, list: any[]) {
      const dict = mapDataListToOptions(list)

      switch (pageName) {
        case 'role':
          this.dicts.set(API_DICT_ROLE, dict)
          break
        case 'department':
          this.dicts.set(API_DICT_DEPARTMENT, dict)
          break
        case 'category':
          this.dicts.set(API_DICT_CATEGORY, dict)
          break
      }
    },
    // 设置最新的完整菜单
    setEntireMenuList(newMenulist: any[]) {
      this.entireMenuList = newMenulist
    }
  }
})

export default useMainStore
