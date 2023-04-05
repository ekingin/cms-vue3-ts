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
  label: string
  type?: 'index' | 'selection' | 'time' | 'money' | 'handler' | 'slot'
  prop?: string
  width?: string
  minWidth?: string
  btns?: IBtnItem[]
  size?: 'large' | 'default' | 'small'
  fixed?: 'right' | 'left' | true
  dict?: IOption[]
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

export type IFormItem = IInputFormItem | ISelectFormItem | IDateRangeFormItem | ISlotFormItem

export interface ICommonFormItem {
  prop: string
  label: string
  default?: string | string[]
  hidden?: boolean
  disabled?: boolean
}

export interface IInputFormItem extends ICommonFormItem {
  type: 'input' | 'password'
  placeholder?: string
}

export interface ISelectFormItem extends ICommonFormItem {
  type: 'select'
  dictUrl?: string
  options?: IOption[]
  placeholder?: string
}

export interface IDateRangeFormItem extends ICommonFormItem {
  type: 'date-range'
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export interface ISlotFormItem extends ICommonFormItem {
  type: 'slot'
}
