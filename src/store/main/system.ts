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
    async getDataListAction(
      pageName: string,
      queryParams = { offset: 0, size: 10 },
      postData = {}
    ) {
      const pageListRes = await getDataList(pageName, queryParams, postData)
      const { list, totalCount } = pageListRes.data
      this.dataList = list
      if (totalCount) {
        this.dataTotalCount = totalCount
      }
    },
    async deleteDataByIdAction(pageName: string, deleteId: number) {
      await deleteDataById(pageName, deleteId)
      this.getDataListAction(pageName)
      this.updateDictByPageName(pageName)
    },
    async addDataAction(pageName: string, postData: any = {}) {
      await addData(pageName, postData)
      this.getDataListAction(pageName)
      this.updateDictByPageName(pageName)
    },
    async alterDataByIdAction(pageName: string, patchId: number, patchData: any = {}) {
      await alterDataById(pageName, patchId, patchData)
      this.getDataListAction(pageName)
      this.updateDictByPageName(pageName)
    },
    // 更新某一个字典集合 (by pageName)
    async updateDictByPageName(pageName: string) {
      // pageName white list
      const dictList = ['role', 'department', 'category']
      const mainStore = useMainStore()
      if (dictList.includes(pageName)) {
        mainStore.updateDictAction(`/${pageName}/all`)
      } else if (pageName === 'menu') {
        mainStore.postWholeMenuTreeAction()
      }
    }
  }
})

export default useSystemStore
