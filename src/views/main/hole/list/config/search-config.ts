import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'department',
  formLabelWidth: 120,
  formItems: [
    {
      label: '动态内容：',
      prop: 'content',
      type: 'input',
      placeholder: '请输入动态内容关键字'
    },
    {
      label: '查找范围：',
      prop: 'range',
      type: 'select',
      placeholder: '请选择查找范围',
      default: 'all',
      options: [
        { label: '自己', value: 'myself' },
        { label: '所有', value: 'all' }
      ]
    },
    {
      label: '创建时间：',
      prop: 'createTime',
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
