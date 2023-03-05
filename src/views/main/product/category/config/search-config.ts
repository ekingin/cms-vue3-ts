import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'category',
  formLabelWidth: 120,
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '分类名称：',
      placeholder: '请输入查询的商品名称'
    },
    {
      type: 'date-range',
      prop: 'createAt',
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
