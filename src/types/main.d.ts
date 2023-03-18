import type { FormRules } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'

export interface IMainStore {
  wholeMenuTree: any[]
  dicts: Map<string, IOption[]>
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
  formRules?: FormRules
  validateFileds?: string[]
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

export interface IOption {
  label: string
  value: string | number
}

export interface IFormItem {
  type: string
  prop: string
  label?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  default?: string | null
  hidden?: boolean
  options?: IOption[]
  dictUrl?: string
  disabled?: boolean
}
