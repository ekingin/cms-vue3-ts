import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'story',
  title: '故事列表',
  propList: [
    { label: '序号', type: 'index', width: '60', align: 'center' },
    { label: '故事标题', prop: 'title', align: 'center' },
    { label: '故事内容', prop: 'content', align: 'center', minWidth: '280' },
    { label: '创建时间', prop: 'createAt', type: 'time', align: 'center', width: '180' }
  ]
}
export default contentConfig
