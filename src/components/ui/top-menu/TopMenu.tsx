'use client'
import React from 'react'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import { usePathname } from 'next/navigation'
import { composeClasses } from '@/app/utils'
import { Button } from '../button/Button'
import { useAuthUser } from '@/hooks/useAuthUser'
import { ButtonProfile } from './ButtonProfile'

export const TopMenu = () => {
  const { isLogin, user } = useAuthUser()
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const setIsAuthModalOpen = useUIStore((state) => state.setIsAuthModalOpen)

  const path = usePathname()
  const getShowSection = () => {
    if (path === '/') {
      return 'components'
    } else if (path.includes('/tableros-de-discusion')) {
      return 'tableros'
    }
    return ''
  }
  const showSection = getShowSection()
  return (
    <nav className='fixed top-0 flex px-5 justify-between items-center w-full py-2 border-b border-surface-strokes bg-white z-[1]'>
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            {' '}
            Gadget Galaxy
          </span>
        </Link>
      </div>
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 relative'
          href='/'
        >
          Componentes
          <div
            className={composeClasses(
              'absolute left-0 -bottom-3 w-full bg-black h-1 transition-all',
              showSection === 'components' ? 'opacity-100' : 'opacity-0'
            )}
          />
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 relative'
          href='/tableros-de-discusion'
        >
          Tableros de discusión
          <div
            className={composeClasses(
              'absolute left-0 -bottom-3 w-full bg-black h-1 transition-all',
              showSection === 'tableros' ? 'opacity-100' : 'opacity-0'
            )}
          />
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
        <button
          onClick={() => openSideMenu()}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 flex md:hidden'
        >
          Menú
        </button>
        {isLogin ? (
          <ButtonProfile user={user} />
        ) : (
          <Button
            size='sm'
            className='font-semibold hidden md:flex h-[42px]'
            onClick={(e) => {
              e.stopPropagation()
              setIsAuthModalOpen(true)
            }}
          >
            Iniciar sesión
          </Button>
        )}
      </div>
    </nav>
  )
}

export default TopMenu
