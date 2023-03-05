export interface IUlListItem {
  label: string
  desc: string
}

export interface IDesc {
  overview?: string
  list: IUlListItem[]
  column?: number
}
