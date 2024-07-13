'use client'
import React from 'react'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import { LinkButtonNext } from '../button/LinkButtonNext'
import { usePathname } from 'next/navigation'
import { composeClasses } from '@/app/utils'
import { Button } from '../button/Button'

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const setIsAuthModalOpen = useUIStore((state) => state.setIsAuthModalOpen)

  const path = usePathname()
  const getShowSection = () => {
    if (path === '/') {
      return 'components'
    } else if (path.includes('/tableros-de-discusion')) {
      return 'tableros'
    }
    return 'components'
  }
  const showSection = getShowSection()
  return (
    <nav className='fixed top-0 flex px-5 justify-between items-center w-full py-2 border-b border-surface-strokes bg-white'>
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
              'absolute left-0 -bottom-2 w-full bg-black h-1 transition-all opacity-0',
              showSection === 'components' && 'opacity-100'
            )}
          ></div>
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 relative'
          href='/tableros-de-discusion'
        >
          Tableros de discusión
          <div
            className={composeClasses(
              'absolute left-0 -bottom-2 w-full bg-black h-1 transition-all opacity-0',
              showSection === 'tableros' && 'opacity-100'
            )}
          ></div>
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
        <button
          onClick={() => openSideMenu()}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 flex md:hidden'
        >
          Menú
        </button>
        <Button
          size='sm'
          className='font-semibold hidden md:flex'
          text='Iniciar sesión'
          onClick={(e) => {
            e.stopPropagation()
            setIsAuthModalOpen(true)
          }}
        />
      </div>
    </nav>
  )
}

export default TopMenu
