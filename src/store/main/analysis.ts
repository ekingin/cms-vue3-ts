import { defineStore } from 'pinia'
import type { IAnalysisStore } from '@/types'
import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsSaleTop10,
  getGoodsAddressSale
} from '@/service/main/analysis'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisStore => ({
    topPanelDatas: [],
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    goodsSaleTop10: [],
    goodsAddressSale: []
  }),
  actions: {
    async getAnalysisDataAction() {
      const topPanelDatas = await getAmountList()
      this.topPanelDatas = topPanelDatas.data

      const goodsCount = await getCategoryGoodsCount()
      this.categoryGoodsCount = goodsCount.data

      const goodsSale = await getCategoryGoodsSale()
      this.categoryGoodsSale = goodsSale.data

      const goodsFavor = await getCategoryGoodsFavor()
      this.categoryGoodsFavor = goodsFavor.data

      const saleTop10 = await getGoodsSaleTop10()
      this.goodsSaleTop10 = saleTop10.data

      const addressSasle = await getGoodsAddressSale()
      this.goodsAddressSale = addressSasle.data
    }
  }
})

export default useAnalysisStore
