import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'category',
  title: '分类列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { label: '序号', type: 'index', width: '80', align: 'center' },
    { label: '分类名称', prop: 'name', align: 'center', showOverflowTooltip: true },
    { label: '创建时间', prop: 'createTime', type: 'time', align: 'center' },
    { label: '更新时间', prop: 'updateTime', type: 'time', align: 'center' },
    {
      label: '操作',
      type: 'handler',
      width: '180px',
      align: 'center',
      btns: [
        { label: '编辑', type: 'primary', icon: 'Edit', link: true, trigger: 'UPDATE' },
        { label: '删除', type: 'danger', icon: 'Delete', link: true, trigger: 'DELETE' }
      ]
    }
  ]
}
export default contentConfig
