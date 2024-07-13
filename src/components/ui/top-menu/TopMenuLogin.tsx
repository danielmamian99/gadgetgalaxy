import React from 'react'
import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import GoogleIcon from '../components/GoogleIcon'

export const TopMenuLogin = () => {
  return (
    <div className='flex w-full justify-between items-center py-2 px-3 border-b border-surface-strokes'>
      {' '}
      <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>
          {' '}
          Gadget Galaxy
        </span>
      </Link>
      <Link
        className='w-10 h-10 flex justify-center items-center rounded-lg bg-[#484A5E1A]'
        href='/'
      >
        <GoogleIcon className='text-[#121212] font-bold' name='close' />
      </Link>
    </div>
  )
}
