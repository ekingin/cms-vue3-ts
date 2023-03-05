import { API_DICT_DEPARTMENT, API_DICT_ROLE } from '@/global/constants'
import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'users',
  title: '用户列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { label: '序号', type: 'index', width: '60', align: 'center' },
    { label: '用户名', prop: 'name', width: '120', align: 'center' },
    { label: '真实姓名', prop: 'realname', width: '120', align: 'center' },
    { label: '手机号', prop: 'cellphone', width: '150', align: 'center' },
    { label: '状态', prop: 'enable', type: 'slot', width: '80', align: 'center' },
    {
      label: '部门',
      prop: 'departmentId',
      width: '100',
      align: 'center',
      dictUrl: API_DICT_DEPARTMENT
    },
    { label: '角色', prop: 'roleId', width: '100', align: 'center', dictUrl: API_DICT_ROLE },
    { label: '创建时间', prop: 'createAt', type: 'time', width: '180', align: 'center' },
    { label: '更新时间', prop: 'updateAt', type: 'time', width: '180', align: 'center' },
    {
      label: '操作',
      type: 'handler',
      width: '150',
      align: 'center',
      fixed: 'right',
      btns: [
        { label: '编辑', type: 'primary', icon: 'Edit', link: true, trigger: 'UPDATE' },
        { label: '删除', type: 'danger', icon: 'Delete', link: true, trigger: 'DELETE' }
      ]
    }
  ]
}
export default contentConfig
