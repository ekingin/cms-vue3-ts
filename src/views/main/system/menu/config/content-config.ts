import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'menu',
  title: '菜单列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { label: '菜单名称', prop: 'name', width: '150', align: 'center' },
    { label: '菜单级别', prop: 'type', width: '100', align: 'center' },
    { label: '菜单url', prop: 'url', width: '230', align: 'center' },
    { label: '菜单icon', prop: 'icon', width: '200', align: 'center' },
    { label: '权限', prop: 'permission', width: '250', align: 'center' },
    { label: '创建时间', prop: 'createTime', type: 'time', width: '180', align: 'center' },
    { label: '更新时间', prop: 'updateTime', type: 'time', width: '180', align: 'center' },
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
  ],
  tableTreeProps: {
    rowKey: 'id'
  }
}
export default contentConfig
