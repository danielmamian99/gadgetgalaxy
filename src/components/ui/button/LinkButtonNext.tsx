import { composeClasses } from '@/app/utils'
import Link from 'next/link'
import React from 'react'

interface IProps {
  href: string
  children: React.ReactNode
  className?: string
}
export const LinkButtonNext = ({ href, children, className = '' }: IProps) => {
  return (
    <Link
      className={composeClasses(
        'bg-button-primary hover:bg-button-primary-hover active:bg-button-primary-pressed py-2 px-4 text-white rounded-[50px]',
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
