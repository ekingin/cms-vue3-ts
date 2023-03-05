import { API_DICT_DEPARTMENT, API_DICT_ROLE } from '@/global/constants'
import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'users',
  title: {
    add: '新建用户',
    edit: '编辑用户'
  },
  formLabelWidth: 100,
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
      label: '密码：',
      prop: 'password',
      type: 'password',
      placeholder: '请输入密码',
      hidden: false
    },
    {
      label: '手机号：',
      prop: 'cellphone',
      type: 'input',
      placeholder: '请输入手机号导'
    },
    {
      label: '部门：',
      prop: 'departmentId',
      type: 'select',
      placeholder: '请选择部门',
      dictUrl: API_DICT_DEPARTMENT
    },
    {
      label: '角色：',
      prop: 'roleId',
      type: 'select',
      placeholder: '请选择角色',
      dictUrl: API_DICT_ROLE
    }
  ],
  btns: [
    { label: '取消', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
