import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'category',
  title: {
    add: '新建分类',
    edit: '编辑分类'
  },
  formLabelWidth: 100,
  formItems: [
    {
      label: '分类名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入分类名称'
    }
  ],
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
