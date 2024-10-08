'use client'
import { IOwnerInfo } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import { TextArea } from '../ui/components'
import { CommentTextArea } from './CommenTextArea'
interface IProps {
  userInfo: IOwnerInfo
  date?: string
  showBackButton?: boolean
}
export const CommentProfile = ({ showBackButton, userInfo, date }: IProps) => {
  const initials = (fullName: string) => {
    const names = fullName.split(' ')
    const result = names.map((name) => name.charAt(0).toUpperCase()).slice(0, 2)
    return result.join('')
  }
  const onBack = () => {
    window.history.back()
  }
  return (
    <div className='flex items-start gap-1'>
      {showBackButton && (
        <button
          onClick={onBack}
          className='rounded-full w-8 h-8 bg-primary flex items-center justify-center'
        >
          <GoogleIcon className='text-white' name='arrow_back' />
        </button>
      )}
      <Link className='flex items-start gap-1' href={`/perfil/${userInfo.id}`}>
        {userInfo?.photo ? (
          <img
            src={userInfo.photo}
            alt={userInfo.name}
            className='w-8 h-8 rounded-full'
          />
        ) : (
          <div className='w-[32px] h-[32px] rounded-full border-white shadow-md flex justify-center items-center text-sm font-bold'>
            {initials(userInfo?.name ?? '')}
          </div>
        )}
        <div className='flex items-center gap-1'>
          <h2 className='text-sm'>{userInfo.name}</h2>
          {date && (
            <>
              {' '}
              <div>•</div>
              <p className='text-sm text-secondary line'>{date}</p>
            </>
          )}
        </div>
      </Link>
    </div>
  )
}
