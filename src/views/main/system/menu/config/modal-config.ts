import { MENU_TYPE_DICT } from '@/global/local-dicts'
import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'menu',
  title: {
    add: '新建菜单',
    edit: '编辑菜单'
  },
  formLabelWidth: 100,
  formItems: [
    {
      label: '菜单名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入菜单名称'
    },
    {
      label: '菜单层级：',
      prop: 'type',
      type: 'select',
      placeholder: '请选择菜单层级',
      options: MENU_TYPE_DICT
    },
    {
      label: '父级菜单：',
      prop: 'parentId',
      type: 'select',
      placeholder: '请选择父级菜单',
      hidden: true
    },
    {
      label: '菜单icon：',
      prop: 'icon',
      type: 'input',
      placeholder: '请输入菜单icon',
      default: 'el-icon-setting',
      hidden: true
    },
    {
      label: '菜单url：',
      prop: 'url',
      type: 'input',
      placeholder: '请输入菜单url'
    },
    {
      label: '权限：',
      prop: 'permission',
      type: 'input',
      placeholder: 'system:<menu>:<create | remove | update | query>',
      hidden: true
    }
  ],
  formRules: {
    name: [{ required: true, message: '必填' }],
    type: [{ required: true, message: '必选' }],
    parentId: [{ required: true, message: '必选' }],
    icon: [{ required: true, message: '必填' }],
    url: [{ required: true, message: '必填' }],
    permission: [{ required: true, message: '必填' }]
  },
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
