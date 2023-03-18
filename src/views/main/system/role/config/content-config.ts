import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'role',
  title: '角色列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { label: '序号', type: 'index', width: '80', align: 'center' },
    { label: '角色名称', prop: 'name', width: '150', align: 'center' },
    { label: '权限介绍', prop: 'intro', width: '150', align: 'center' },
    { label: '创建时间', prop: 'createTime', type: 'time', align: 'center' },
    { label: '更新时间', prop: 'updateTime', type: 'time', align: 'center' },
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
