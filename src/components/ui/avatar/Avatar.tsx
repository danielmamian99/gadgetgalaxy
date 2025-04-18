import React from 'react'
import Image from 'next/image'
import { getInitials } from '@/helpers/strings'
import { composeClasses } from '@/app/utils/classes'

interface IProps {
  avatarUrl?: string
  name: string
  className?: string
  size?: number
}
export const Avatar = ({ avatarUrl, name, size = 32, className }: IProps) => {
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt='Avatar'
      className={composeClasses('rounded-full', className)}
      width={size}
      height={size}
    />
  ) : (
    <div
      style={{
        height: size,
        width: size,
        minWidth: size,
        minHeight: size,
      }}
      className={composeClasses(
        'rounded-full border-white shadow-md flex justify-center items-center font-bold',
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
