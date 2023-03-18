<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main/main'
import useLoginStore from '@/store/login/login'
import { formatUTC } from '@/utils/format'
import { mapValueFromDict } from '@/utils/map-data'
import usePermission from '@/hooks/usePermission'
import type { IContentConfig } from '@/types'

const props = defineProps<{
  contentConfig: IContentConfig
}>()
const emit = defineEmits(['addClick', 'editClick', 'btnClick'])
const pageName = ref(props.contentConfig.pageName)
const systemStore = useSystemStore()
const mainStore = useMainStore()
const loginStore = useLoginStore()
const currentPage = ref(1)
const pageSize = ref(10)
const { userInfo } = storeToRefs(loginStore)

// item.dictUrl => item.dict
for (const item of props.contentConfig.propList) {
  if (!item.dictUrl) continue
  watchEffect(async () => {
    item.dict = await mainStore.queryDictAction(item.dictUrl!)
  })
}

// 按钮权限管理：查询、删除、新建、修改
const isCreate = usePermission(`${pageName.value}:create`)
const isUpdate = usePermission(`${pageName.value}:update`)
const isDelete = usePermission(`${pageName.value}:delete`)
const isQuery = usePermission(`${pageName.value}:query`)

// 如果有动态的查询权限，动态注册动态详情路由
if (pageName.value === 'moment' && isQuery) {
  import('../../router/main/hole/moment/detail').then((res) => {
    const momentDetailRoute = res.default
    router.addRoute('main', momentDetailRoute)
  })
}

// 发送请求、获取数据
fetchPageDataList()
const { dataList, dataTotalCount } = storeToRefs(systemStore)

// 分页器监听方法
const handleSizeChange = () => {
  fetchPageDataList()
}
const handleCurrentChange = () => {
  fetchPageDataList()
}

// 按钮点击（添加、删除、编辑）
const handleBtnClick = (btn: any, row?: any) => {
  if (btn.trigger === 'DELETE') {
    systemStore.deleteDataByIdAction(pageName.value, row.id)
  } else if (btn.trigger === 'CREATE') {
    emit('addClick')
  } else if (btn.trigger === 'UPDATE') {
    emit('editClick', row)
  } else {
    // 如果页面有其他按钮逻辑，写在所在页面
    emit('btnClick')
  }
}

// 订阅 systemStore，当添加、删除、修改的Action执行成功后，需要把 currentPage 置为1
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deleteDataByIdAction' ||
      name === 'addDataAction' ||
      name === 'alterDataByIdAction'
    ) {
      currentPage.value = 1
    }
  })
})

// 发送请求获取获取用户列表数据
function fetchPageDataList(formData = {}) {
  if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset }

  systemStore.getDataListAction(pageName.value, queryInfo, formData)
}

defineExpose({
  fetchPageDataList
})
</script>

<template>
  <div class="page-content">
    <div class="content-header">
      <h2 class="title">{{ contentConfig.title }}</h2>
      <div class="operation">
        <template v-for="item in contentConfig.operation" :key="item.label">
          <el-button
            v-if="item.trigger === 'CREATE' && isCreate"
            v-bind="item"
            @click="handleBtnClick(item)"
          >
            {{ item.label }}
          </el-button>
        </template>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="dataList" border style="width: 100%" v-bind="contentConfig.tableTreeProps">
        <template v-for="item in contentConfig.propList" :key="item.type">
          <el-table-column v-if="item.type === 'index'" v-bind="item" />
          <el-table-column v-else-if="item.type === 'selection'" v-bind="item" />
          <el-table-column v-else-if="item.type === 'time'" v-bind="item">
            <template #default="{ row, column }">
              <span>{{ formatUTC(row[column.property]) }}</span>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type === 'money'" v-bind="item">
            <template #default="{ row, column }">
              <span>{{ row[column.property] + '¥' }}</span>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type === 'slot'" v-bind="item">
            <template #default="scope">
              <slot :name="item.prop" v-bind="scope"></slot>
            </template>
          </el-table-column>
          <el-table-column v-else-if="item.type === 'handler'" v-bind="item">
            <template #default="scope">
              <template v-for="bItem in item.btns" :key="bItem.label">
                <el-button
                  v-if="
                    (scope.row.type ? scope.row.type < 3 : true) &&
                    (scope.row.userId ? scope.row.userId === userInfo.id : true) &&
                    ((bItem.trigger === 'UPDATE' && isUpdate) ||
                      (bItem.trigger === 'DELETE' && isDelete))
                  "
                  v-bind="bItem"
                  @click="handleBtnClick(bItem, scope.row)"
                >
                  {{ bItem.label }}
                </el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="item">
            <template #default="{ row, column }" v-if="item.dict">
              <span>{{ mapValueFromDict(row[column.property], item.dict) }}</span>
            </template>
            <template #default="{ row, column }" v-else>
              <span>{{ row[column.property] }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="content-pagination">
      <el-pagination
        v-if="dataTotalCount !== 0"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="false"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.page-content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      font-size: 18px;
      margin: 0;
    }
  }
  .content-pagination {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0;
  }
}
</style>
