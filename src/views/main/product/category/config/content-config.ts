import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'category',
  title: '分类列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { type: 'index', label: '序号', width: '80', align: 'center' },
    { label: '分类名称', prop: 'name', align: 'center', showOverflowTooltip: true },
    { label: '创建时间', prop: 'createAt', type: 'time', align: 'center' },
    { label: '更新时间', prop: 'updateAt', type: 'time', align: 'center' },
    {
      type: 'handler',
      label: '操作',
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
