'use client'
import { IOwnerInfo } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import Image from 'next/image'
import { Avatar } from '../ui/avatar/Avatar'
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
      <Link className='flex items-start gap-1' href={`/perfil/${userInfo?.id}`}>
        <Avatar name={userInfo.name} avatarUrl={userInfo.photo} />
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
