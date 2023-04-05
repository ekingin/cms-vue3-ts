import { API_DICT_CATEGORY } from '@/global/constants'
import type { IModalConfig } from '@/types'

const modalConfig: IModalConfig = {
  pageName: 'goods',
  title: {
    add: '新建商品',
    edit: '编辑商品'
  },
  formLabelWidth: 100,
  formItems: [
    {
      label: '商品名称：',
      prop: 'name',
      type: 'input',
      placeholder: '请输入商品名称'
    },
    {
      label: '商品描述：',
      prop: 'desc',
      type: 'input',
      placeholder: '请输入商品描述'
    },
    {
      label: '商品原价：',
      prop: 'oldPrice',
      type: 'input',
      placeholder: '请输入商品原价'
    },
    {
      label: '商品现价：',
      prop: 'newPrice',
      type: 'input',
      placeholder: '请输入商品现价'
    },
    {
      label: '图片URL：',
      prop: 'imgUrl',
      type: 'input',
      placeholder: '请输入图片URL'
    },
    {
      label: '库存数量：',
      prop: 'inventoryCount',
      type: 'input',
      placeholder: '请输入库存数量'
    },
    {
      label: '发货地址：',
      prop: 'address',
      type: 'input',
      placeholder: '请输入发货地址'
    },
    {
      label: '商品分类：',
      prop: 'categoryId',
      type: 'select',
      placeholder: '请选择商品分类',
      dictUrl: API_DICT_CATEGORY
    }
  ],
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
