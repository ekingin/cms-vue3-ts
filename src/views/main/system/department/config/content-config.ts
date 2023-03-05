import { API_DICT_DEPARTMENT } from '@/global/constants'
import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'department',
  title: '部门列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { label: '序号', type: 'index', width: '80', align: 'center' },
    { label: '部门名称', prop: 'name', width: '150', align: 'center' },
    { label: '部门领导', prop: 'leader', width: '150', align: 'center' },
    {
      label: '上级部门',
      prop: 'parentId',
      width: '150',
      align: 'center',
      dictUrl: API_DICT_DEPARTMENT
    },
    { label: '创建时间', prop: 'createAt', type: 'time', align: 'center' },
    { label: '更新时间', prop: 'updateAt', type: 'time', align: 'center' },
    {
      label: '操作',
      type: 'handler',
      width: '150',
      align: 'center',
      btns: [
        { label: '编辑', type: 'primary', icon: 'Edit', link: true, trigger: 'UPDATE' },
        { label: '删除', type: 'danger', icon: 'Delete', link: true, trigger: 'DELETE' }
      ]
    }
  ]
}
export default contentConfig
