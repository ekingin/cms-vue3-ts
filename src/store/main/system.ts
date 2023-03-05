import { defineStore } from 'pinia'
import { addData, alterDataById, deleteDataById, getDataList } from '@/service/main/system'
import useMainStore from './main'
import type { ISystemStore } from '@/types'

const useSystemStore = defineStore('system', {
  state: (): ISystemStore => ({
    dataList: [],
    dataTotalCount: 0
  }),
  actions: {
    // 查询数据列表
    async getDataListAction(pageName: string, queryInfo = { offset: 0, size: 10 }) {
      const pageListRes = await getDataList(pageName, queryInfo)
      const { list, totalCount } = pageListRes.data
      this.dataList = list
      if (totalCount) {
        this.dataTotalCount = totalCount
      }

      // 白名单中的菜单，在查询数据时，更新字典集合
      const whiteList = ['role', 'department', 'category']
      if (whiteList.includes(pageName)) {
        useMainStore().setDicts(pageName, list)
      }
      // 如果是菜单更新了，需要重新设置 mainStore.entireMenuList
      if (pageName === 'menu') {
        const mainStore = useMainStore()
        mainStore.setEntireMenuList(list)
      }
    },
    // 删除数据
    async deleteDataByIdAction(pageName: string, id: number) {
      await deleteDataById(pageName, id)
      this.getDataListAction(pageName)
    },
    // 添加数据
    async addDataAction(pageName: string, data: any = {}) {
      await addData(pageName, data)
      this.getDataListAction(pageName)
    },
    // 修改
    async alterDataByIdAction(pageName: string, id: number, data: any = {}) {
      await alterDataById(pageName, id, data)
      this.getDataListAction(pageName)
    }
  }
})

export default useSystemStore
