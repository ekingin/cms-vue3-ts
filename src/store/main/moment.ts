import { defineStore } from 'pinia'
import { addData } from '@/service/main/system'
import { sessionCache } from '@/utils/cache'

const MOMENT_DETAIL_ROW = 'momentDetail'

const useMomentStore = defineStore('moment', {
  state: () => ({
    detailRow: sessionCache.getCache(MOMENT_DETAIL_ROW)
  }),
  actions: {
    changeDetailRow(row: any = {}) {
      sessionCache.setCache(MOMENT_DETAIL_ROW, row)
      this.detailRow = row
    },
    async addDataAction(postData: any = {}) {
      await addData('moment', postData)
    }
  }
})

export default useMomentStore
