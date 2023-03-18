import { defineStore } from 'pinia'
import { postWholeData } from '@/service/main/main'
import { mapDataListToOptions } from '@/utils/map-data'
import type { IMainStore } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    wholeMenuTree: [], // 完整菜单
    dicts: new Map() // 所有的字典集合
  }),
  actions: {
    // 获取菜单
    async postWholeMenuTreeAction() {
      const res = await postWholeData('/menu/all')
      this.wholeMenuTree = res.data.list
    },
    // 获取字典集合
    async queryDictAction(dictUrl: string) {
      let dict = this.dicts.get(dictUrl)
      if (!dict) {
        await this.updateDictAction(dictUrl)
        dict = this.dicts.get(dictUrl)
      }
      return dict
    },
    // 更新某一个字典集合 (by dictUrl)
    async updateDictAction(dictUrl: string) {
      const res = await postWholeData(dictUrl)
      this.dicts.set(dictUrl, mapDataListToOptions(res.data.list))
    }
  }
})

export default useMainStore
