'use client'
import React, { ReactNode } from 'react'
import { useBodyScrollLock } from '@/hooks'
import { composeClasses } from '@/app/utils'

interface IProps {
  isOpen: boolean
  children: ReactNode
  className?: string
  onClose: () => void
}
export const SidebarComponent = ({
  isOpen,
  children,
  className,
  onClose,
}: IProps) => {
  useBodyScrollLock(isOpen)
  return (
    <div className='text-base md:text-xl'>
      {isOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 text-8xl' />
      )}
      {isOpen && (
        <div
          onClick={() => onClose()}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        />
      )}
      <div
        className={composeClasses(
          'fixed right-0 top-0 w-[300px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          !isOpen && 'translate-x-full',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default SidebarComponent
