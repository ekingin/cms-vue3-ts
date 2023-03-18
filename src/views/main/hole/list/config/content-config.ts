import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'moment',
  title: '动态列表',
  propList: [
    { label: '序号', type: 'index', width: '100', align: 'center' },
    {
      label: '动态内容',
      prop: 'content',
      type: 'slot',
      align: 'center'
    },
    { label: '创建时间', prop: 'createTime', type: 'time', align: 'center', width: '220' },
    {
      type: 'handler',
      label: '操作',
      width: '100',
      align: 'center',
      btns: [{ label: '删除', type: 'danger', icon: 'Delete', link: true, trigger: 'DELETE' }]
    }
  ]
}
export default contentConfig
