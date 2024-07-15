import { IOwnerInfo, ITableInfo, IUser } from '@/seed/seed'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import Link from 'next/link'
import { CommentProfile } from './CommentProfile'
import { CommentTextArea } from './CommenTextArea'
import { UserProfile } from '../profile/UserProfile'

interface IProps {
  tableInfo: ITableInfo
  ownerInfo: IUser
}
export const TableInfo = ({ tableInfo, ownerInfo }: IProps) => {
  return (
    <div className='flex flex-col gap-2 border-b-2 border-surface-strokes md:pb-6'>
      <UserProfile date={tableInfo.date} userInfo={ownerInfo} showBackButton />
      <h1 className='text-2xl font-semibold'>{tableInfo.name}</h1>
      <p className='text-sm'>{tableInfo.description}</p>

      <div className='mt-10 mb-4'>
        <CommentTextArea />
      </div>
    </div>
  )
}
