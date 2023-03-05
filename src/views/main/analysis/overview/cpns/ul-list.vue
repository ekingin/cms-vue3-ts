<script setup lang="ts">
import type { IUlListItem } from '../types'

withDefaults(
  defineProps<{
    technologyStacks: IUlListItem[]
  }>(),
  {
    technologyStacks: () => []
  }
)
</script>

<template>
  <div class="ui-list">
    <template v-for="item in technologyStacks" :key="item.label">
      <div class="li-item">
        <span class="label">{{ item.label }} :</span>
        <span class="desc">{{ item.desc }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.li-item {
  height: 30px;
  line-height: 30px;
}
.label {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-right: 15px;
}
.label::before {
  content: '';
  left: 7px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: black;
}
</style>
