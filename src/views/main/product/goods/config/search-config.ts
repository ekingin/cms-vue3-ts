import { GOODS_STATUS_DICT } from '@/global/local-dicts'
import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'goods',
  formLabelWidth: 120,
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称：',
      placeholder: '请输入查询的商品名称'
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址：',
      placeholder: '请输入查询的商品地址'
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态：',
      placeholder: '请选择查询的商品状态',
      options: GOODS_STATUS_DICT
    },
    {
      type: 'date-range',
      prop: 'createTime',
      label: '创建时间：',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      rangeSeparator: '-'
    }
  ],
  btns: [
    { label: '重置', type: '', icon: 'Refresh', size: 'default', trigger: 'RESET' },
    {
      label: '搜索',
      type: 'primary',
      icon: 'Search',
      size: 'default',
      trigger: 'QUERY'
    }
  ]
}

export default searchConfig
