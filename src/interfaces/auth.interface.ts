import { ERoles } from '@/seed/seed'

export interface IUser {
  email: string
  password: string
  name: string
}
export interface IStorageUser {
  storeName: string
  address: string
  city: string
  web: string
}
export interface IAuthUserState {
  user: any
  token: string
}

export interface IAuthUser {
  id: string
  name: string
  email: string
  photo?: string
}
