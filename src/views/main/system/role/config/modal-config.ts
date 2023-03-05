import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'role',
  title: {
    add: '新建角色',
    edit: '编辑角色'
  },
  formLabelWidth: 100,
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
      placeholder: '请输入权限介绍'
    },
    {
      label: '权限列表：',
      type: 'slot',
      slotName: 'introTree'
    }
  ],
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
