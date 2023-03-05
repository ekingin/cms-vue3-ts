<script setup lang="ts">
import CountUp from '@/base-ui/count-up'
import type { CountUpOptions } from 'countup.js'

withDefaults(
  defineProps<{
    panelData: any
  }>(),
  {
    panelData: () => ({})
  }
)

const countOps: CountUpOptions = { decimalPlaces: 0, prefix: '' }
const moneyOps: CountUpOptions = { decimalPlaces: 0, prefix: '¥' }
</script>

<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip effect="light" :content="panelData.tips" placement="top-start">
        <el-icon size="14px"><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <count-up
        :number="panelData.number1"
        :options="panelData.amount === 'saleroom' ? moneyOps : countOps"
      ></count-up>
    </div>
    <div class="footer">
      <span class="subtitle">{{ panelData.subtitle }}</span>
      <count-up
        :number="panelData.number2"
        :options="panelData.amount === 'saleroom' ? moneyOps : countOps"
      ></count-up>
    </div>
  </div>
</template>

<style scoped lang="less">
.statistical-panel {
  background-color: #fff;
  height: 130px;
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  .header {
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }
  .footer {
    display: flex;
    align-items: center;
    height: 38px;
    border-top: 1px solid #f0f0f0;
    font-size: 14px;
    .subtitle {
      margin-right: 10px;
    }
  }
}
</style>
