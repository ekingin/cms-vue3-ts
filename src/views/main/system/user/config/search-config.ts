import type { ISearchConfig } from '@/types/main'

const searchConfig: ISearchConfig = {
  pageName: 'users',
  formLabelWidth: 120,
  formItems: [
    {
      label: '用户名：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      label: '真实姓名：',
      prop: 'realname',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      label: '手机号：',
      prop: 'cellphone',
      type: 'input',
      placeholder: '请输入手机号'
    },
    {
      label: '状态：',
      prop: 'enable',
      type: 'select',
      default: '1',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
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
