export interface ITableInfo {
  id: string
  nombre: string
  description: string
  createdAt: string
}
export interface IAllTablesDataResponse {
  results: ITableInfo[]
  count: number
  next: string | null
  previous: string | null
}
export interface IUserOwnerTable {
  date: string
  id: string
  username: string
  photo?: string
}
export interface IComment {
  id: string
  createdAt: string
  updatedAt: string
  author: IUserOwnerTable
  content: string
  discussionBoard: string
  parent?: string
  replies?: IComment[]
}

export interface ITableData {
  tableInfo: ITableInfo
  ownerInfo: IUserOwnerTable
  comments: IComment[]
}

export interface IPriceBreak {
  qty: string
  price: string
  currency: string
}
export interface ITableItem {
  id: number
  name: string
  price: string
  quantity: number
  imageUrl: string
  providerName: string
  priceBreaks: IPriceBreak[]
  stockNumber: number
}

export enum EStatusJoinDiscussionBoard {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
