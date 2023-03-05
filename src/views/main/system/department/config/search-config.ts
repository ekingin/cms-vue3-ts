import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'department',
  formLabelWidth: 120,
  formItems: [
    {
      label: '部门名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入查询的部门名称'
    },
    {
      label: '部门领导：',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入查询的领导名称'
    },
    {
      label: '创建时间：',
      prop: 'createAt',
      type: 'date-range',
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
