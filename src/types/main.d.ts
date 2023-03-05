import type { ElOption } from 'element-plus'

export interface IMainStore {
  entireMenuList: any[]
  dicts: Map
}

export interface IContentConfig {
  pageName: string
  propList: IPropItem[]
  title?: string
  operation?: IBtnItem[]
  tableTreeProps?: any
}

interface ISearchConfig {
  pageName: string
  formItems: IFormItem[]
  btns: IBtnItem[]
  formLabelWidth?: string | number
}

interface IModalConfig extends ISearchConfig {
  title: any
}

export interface IDictItem {
  label: string
  value: numebr | string
}

export interface IPropItem {
  type?: 'index' | 'selection' | 'time' | 'money' | 'handler' | 'slot'
  label?: string
  prop?: string
  width?: string
  minWidth?: string
  btns?: IBtnItem[]
  size?: 'large' | 'default' | 'small'
  fixed?: 'right' | 'left' | true
  dict?: IDictItem[]
  dictUrl?: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  showOverflowTooltip?: boolean
}

export interface IBtnItem {
  label: string
  trigger: string
  type?: '' | 'default' | 'success' | 'text' | 'primary' | 'warning' | 'info' | 'danger'
  icon?: string
  link?: boolean
  size?: 'large' | 'default' | 'small'
}

export interface IFormItem {
  type: string
  prop?: string
  label?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  default?: string
  hidden?: boolean
  options?: ElOption[]
  dictUrl?: string
  slotName?: string
  disabled?: boolean
}
