import { API_DICT_DEPARTMENT } from '@/global/constants'
import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'department',
  title: {
    add: '新建部门',
    edit: '编辑部门'
  },
  formLabelWidth: 100,
  formItems: [
    {
      label: '部门名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入部门名称'
    },
    {
      label: '部门领导：',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入部门领导',
      default: null
    },
    {
      label: '上级部门：',
      prop: 'parentId',
      type: 'select',
      placeholder: '请选择上级部门',
      dictUrl: API_DICT_DEPARTMENT
    }
  ],
  formRules: {
    name: [{ required: true, message: '必填', trigger: 'blur' }],
    leader: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
