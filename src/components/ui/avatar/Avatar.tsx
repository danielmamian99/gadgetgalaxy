import React from 'react'
import Image from 'next/image'
import { getInitials } from '@/helpers/strings'

interface IProps {
  avatarUrl?: string
  name: string
  size?: number
}
export const Avatar = ({ avatarUrl, name, size = 32 }: IProps) => {
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt='Avatar'
      className='rounded-full'
      width={size}
      height={size}
    />
  ) : (
    <div
      style={{
        height: size,
        width: size,
      }}
      className='rounded-full border-white shadow-md flex justify-center items-center text-sm font-bold'
    >
      {getInitials(name)}
    </div>
  )
}
