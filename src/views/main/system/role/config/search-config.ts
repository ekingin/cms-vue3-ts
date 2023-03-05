import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'role',
  formLabelWidth: 120,
  formItems: [
    {
      label: '角色名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      label: '权限介绍：',
      prop: 'intro',
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
