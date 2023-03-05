<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis'
import statisticalPanel from '@/components/statistical-panel/statistical-panel.vue'
import {
  barEcharts,
  lineEcharts,
  mapEcharts,
  roseEcharts,
  pieEcharts
} from '@/components/echarts-panel'

const analysisStore = useAnalysisStore()
analysisStore.getAnalysisDataAction()

const {
  topPanelDatas,
  categoryGoodsCount,
  categoryGoodsFavor,
  categoryGoodsSale,
  goodsAddressSale
} = storeToRefs(analysisStore)
const showGoodsCategoryCount = computed(() => {
  return categoryGoodsCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = categoryGoodsSale.value.map((item) => item.name)
  const values = categoryGoodsSale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = categoryGoodsFavor.value.map((item) => item.name)
  const values = categoryGoodsFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in topPanelDatas" :key="item.amount">
        <el-col :span="6">
          <statistical-panel :panelData="item"></statistical-panel>
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <el-card header="分类商品数量(饼图)">
          <pie-echarts :pieData="showGoodsCategoryCount"></pie-echarts>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card header="不同城市商品销量">
          <map-echarts :mapData="showGoodsAddressSale"></map-echarts>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card header="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="showGoodsCategoryCount"></rose-echarts>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="mt-20" header="分类商品的销量">
          <line-echarts v-bind="showGoodsCategorySale"></line-echarts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mt-20" header="分类商品的收藏">
          <bar-echarts v-bind="showGoodsCategoryFavor"></bar-echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.dashboard {
  .mt-20 {
    margin-top: 10px;
  }
}
</style>
