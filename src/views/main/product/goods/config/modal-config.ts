import { API_DICT_CATEGORY } from '@/global/constants'
import { GOODS_STATUS_DICT } from '@/global/local-dicts'
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
      type: 'input',
      label: '商品名称：',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '商品描述：',
      prop: 'desc',
      placeholder: '请输入商品描述'
    },
    {
      type: 'input',
      label: '商品原价：',
      prop: 'oldPrice',
      placeholder: '请输入商品原价'
    },
    {
      type: 'input',
      label: '商品现价：',
      prop: 'newPrice',
      placeholder: '请输入商品现价'
    },
    {
      type: 'input',
      label: '图片URL：',
      prop: 'imgUrl',
      placeholder: '请输入图片URL'
    },
    {
      type: 'input',
      label: '库存数量：',
      prop: 'inventoryCount',
      placeholder: '请输入图片URL'
    },
    {
      type: 'input',
      label: '发货地址：',
      prop: 'address',
      placeholder: '请输入发货地址'
    },
    {
      type: 'select',
      label: '商品分类：',
      prop: 'categoryId',
      placeholder: '请选择商品分类',
      dictUrl: API_DICT_CATEGORY
    },
    {
      type: 'select',
      label: '商品状态：',
      prop: 'status',
      placeholder: '请选择商品状态',
      options: GOODS_STATUS_DICT,
      hidden: false
    }
  ],
  btns: [
    { label: '返回', type: '', trigger: 'CANCEL' },
    { label: '确认', type: 'primary', trigger: 'CONFIRM' }
  ]
}

export default modalConfig
