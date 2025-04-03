import React from 'react'
import { GoogleIcon } from '../components'
import { composeClasses } from '@/app/utils'
interface IProps {
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<Element, MouseEvent>) => void)
  className?: string
}
export const CloseButton = ({ onClick, className }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={composeClasses(
        'flex items-center justify-center w-8 h-8 rounded-lg bg-button-secondary active:scale-95 transition-all duration-150',
        className
      )}
    >
      <GoogleIcon name='close' className='text-2xl' />
    </button>
  )
}
