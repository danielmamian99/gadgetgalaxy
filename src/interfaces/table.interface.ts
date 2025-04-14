export interface ITableInfo {
  id: string
  name: string
  description: string
  date: string
  createdAt: string
}
export interface IAllTablesDataResponse {
  results: ITableInfo[]
  count: number
  page: number
  pageSize: number
}
export interface IUserOwnerTable {
  date: string
  id: string
  name: string
  photo?: string
}
export interface IComment {
  id: string
  date: string
  userOwner: IUserOwnerTable
  comment: string
}

export interface ITableData {
  tableInfo: ITableInfo
  ownerInfo: IUserOwnerTable
  comments: IComment[]
}

export interface ITableItem {
  id: number
  name: string
  price: string
  quantity: number
  imageUrl: string
  providerName: string
}
