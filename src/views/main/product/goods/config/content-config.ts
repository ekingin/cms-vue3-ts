import type { IContentConfig } from '@/types/main'

const contentConfig: IContentConfig = {
  pageName: 'goods',
  title: '商品列表',
  operation: [{ label: '新建', type: 'primary', icon: 'Plus', trigger: 'CREATE' }],
  propList: [
    { type: 'index', label: '序号', width: '60', align: 'center' },
    { label: '商品名称', prop: 'name', width: '150', align: 'center', showOverflowTooltip: true },
    { label: '描述', prop: 'desc', align: 'center', showOverflowTooltip: true },
    { label: '原价格', prop: 'oldPrice', type: 'money', align: 'center' },
    { label: '现价格', prop: 'newPrice', type: 'money', align: 'center' },
    { label: '状态', prop: 'status', type: 'slot', width: '80', align: 'center' },
    { label: '图片', prop: 'imgUrl', type: 'slot', width: '100', align: 'center' },
    { label: '发货地址', prop: 'address', width: '90', align: 'center' },
    { label: '库存', prop: 'inventoryCount', align: 'center' },
    { label: '创建时间', prop: 'createTime', type: 'time', width: '180', align: 'center' },
    { label: '更新时间', prop: 'updateTime', type: 'time', width: '180', align: 'center' },
    {
      type: 'handler',
      label: '操作',
      width: '150px',
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
