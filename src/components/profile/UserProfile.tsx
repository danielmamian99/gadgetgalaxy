'use client'
import { IOwnerInfo } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import { composeClasses } from '@/app/utils'
import { Avatar } from '../ui/avatar/Avatar'
interface IProps {
  userInfo: IOwnerInfo
  date?: string
  showBackButton?: boolean
  size?: 'sm' | 'lg'
}
export const UserProfile = ({
  showBackButton,
  userInfo,
  date,
  size = 'sm',
}: IProps) => {
  const initials = (fullName: string) => {
    const names = fullName.split(' ')
    const result = names.map((name) => name.charAt(0).toUpperCase()).slice(0, 2)
    return result.join('')
  }
  const onBack = () => {
    window.history.back()
  }
  return (
    <div className='flex flex-col md:flex-row items-start gap-2 md:gap-1'>
      {showBackButton && (
        <button
          onClick={onBack}
          className='rounded-full min-w-8 min-h-8 bg-primary flex items-center justify-center'
        >
          <GoogleIcon className='text-white' name='arrow_back' />
        </button>
      )}
      <Link
        className='flex items-start gap-1 w-full'
        href={`/perfil/${userInfo.id}`}
      >
        <Avatar name={userInfo.name} avatarUrl={userInfo.photo} size={32} />
        <div
          className={composeClasses(
            'flex flex-col md:flex-row md:items-center gap-1 ',
            size === 'sm'
              ? 'text-sm'
              : 'text-xl font-semibold  max-w-[calc(100%-48px)]'
          )}
        >
          <h2 className='truncate'>{userInfo.name}</h2>
          {date && (
            <>
              {' '}
              <div className='hidden md:block'>•</div>
              <p
                className={composeClasses(
                  ' text-secondary line whitespace-nowrap',
                  size === 'sm'
                    ? 'text-sm'
                    : 'text-sm md:text-xl font-semibold  max-w-[calc(100%-48px)]'
                )}
              >
                {date}
              </p>
            </>
          )}
        </div>
      </Link>
    </div>
  )
}
