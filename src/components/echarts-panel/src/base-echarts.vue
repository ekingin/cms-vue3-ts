<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import ChinaJSON from '../data/china.json'

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    options: () => ({}),
    width: '100%',
    height: '350px'
  }
)

onMounted(() => {
  myEcharts = echarts.init(echartsDivRef.value!, 'light', { renderer: 'svg' })

  // 当options变化时重新设置options
  watchEffect(() => myEcharts.setOption(props.option))

  // 监听resize
  window.addEventListener('resize', handleRisize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleRisize)
  myEcharts.dispose()
})

// 注册地图
echarts.registerMap('china', ChinaJSON as any)

// echarts初始化，设置option
const echartsDivRef = ref<HTMLElement>()
let myEcharts: any

const handleRisize = () => {
  myEcharts.resize()
}
</script>

<template>
  <div class="base-echarts" ref="echartsDivRef" :style="{ height, width }"></div>
</template>

<style scoped lang="less"></style>
