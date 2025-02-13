/* eslint-disable prettier/prettier */
import { ITableInfo } from './table.interface'

export interface IUser {
  date: string
  email: string
  id: string
  name: string
  photo?: string
  tables?: ITableInfo[]
}
