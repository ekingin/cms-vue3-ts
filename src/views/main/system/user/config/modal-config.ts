import { API_DICT_DEPARTMENT, API_DICT_ROLE } from '@/global/constants'
import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'users',
  title: { add: '新建用户', edit: '编辑用户' },
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
      placeholder: '请输入手机号'
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
  formRules: {
    name: [
      { required: true, message: '必填', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: '由6~20数字或字母组成',
        trigger: 'blur'
      }
    ],
    realname: [
      { required: true, message: '必填', trigger: 'blur' },
      { max: 10, message: '最多10个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '必填', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{6,}$/,
        message: '至少由6位数字或字母组成',
        trigger: 'blur'
      }
    ],
    departmentId: [{ required: true, message: '必选', trigger: 'blur' }],
    roleId: [{ required: true, message: '必选', trigger: 'blur' }]
  },
  btns: [
    { label: '取消', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
