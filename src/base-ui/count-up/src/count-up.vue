<script setup lang="ts">
import { CountUp } from 'countup.js'
import { ref, watch, onMounted } from 'vue'
import type { CountUpOptions } from 'countup.js'

const props = withDefaults(
  defineProps<{
    number: number
    options?: CountUpOptions
  }>(),
  {
    number: 0,
    options: () => ({})
  }
)

watch(
  () => props.number,
  () => instance.value?.update(props.number)
)

onMounted(() => {
  const ops = Object.assign(defaultOptions, props.options)
  instance.value = new CountUp(counterRef.value!, props.number, ops)
  instance.value.start()
})

const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 2, // 动画时长
  separator: ',', // 千位分割
  decimal: '.', // 小数分割
  prefix: '¥' // 单位
}
const counterRef = ref<HTMLElement | null>()
const instance = ref<CountUp | null>()
</script>

<template>
  <span ref="counterRef"></span>
</template>

<style scoped lang="less"></style>
