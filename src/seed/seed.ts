export enum ERoles {
  CLIENT = 'cliente',
  SELLER = 'vendedor',
}

export interface IOwnerInfo {
  id: string
  name: string
  photo?: string
}
