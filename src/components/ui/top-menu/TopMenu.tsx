'use client'
import React from 'react'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'
import { useCreateDiscussionStore, useUIStore } from '@/store'
import { usePathname } from 'next/navigation'
import { composeClasses } from '@/app/utils'
import { Button } from '../button/Button'
import { ButtonProfile } from './ButtonProfile'
import { GoogleIcon } from '../components'
import useSession from '@/hooks/useSession'
import { useMatchWindowQuery } from '@/hooks'

export const TopMenu = () => {
  const { isMD } = useMatchWindowQuery()
  const { isLogin, profile } = useSession()
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const setIsAuthModalOpen = useUIStore((state) => state.setIsAuthModalOpen)
  const openCreateBoardModal = useUIStore((state) => state.openCreateBoardModal)
  const selectedComponents = useCreateDiscussionStore(
    (state) => state.selectedComponents
  )

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
          data-tour='see-boards'
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

      <div className='flex gap-1 md:gap-2 items-center'>
        <Button
          size='sm'
          className='font-semibold flex md:hidden !p-2 !w-8 !h-8 relative'
          onClick={(e) => openCreateBoardModal()}
          dataTour='create-board-mobile'
        >
          <GoogleIcon className='text-xl' name='table' />
          {selectedComponents.length > 0 && (
            <div className='absolute top-0 right-0 rounded-full w-4 h-4 text-xs bg-notif-red'>
              {selectedComponents.length}
            </div>
          )}
        </Button>
        <button
          data-tour='menu-hamburguesa'
          onClick={() => openSideMenu()}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 flex md:hidden'
        >
          <GoogleIcon name='menu' />
        </button>
        <Button
          size='sm'
          className='font-semibold hidden md:flex h-[42px] whitespace-nowrap relative'
          onClick={(e) => openCreateBoardModal()}
          dataTour='create-board'
          id='create-board'
        >
          Crear tablero de discusión
          {selectedComponents.length > 0 && (
            <div className='absolute top-0 right-0 rounded-full w-5 h-5 bg-notif-red'>
              {selectedComponents.length}
            </div>
          )}
        </Button>
        {isLogin && profile && isMD ? (
          <ButtonProfile user={profile} />
        ) : (
          <Button
            size='sm'
            variant='outline'
            className='font-semibold hidden md:flex h-[42px] border-gray-300 shadow hover:shadow-lg hover:border-gray-500 transition-all'
            onClick={(e) => {
              e.stopPropagation()
              setIsAuthModalOpen(true)
            }}
            dataTour='login'
          >
            Iniciar sesión
          </Button>
        )}
      </div>
    </nav>
  )
}

export default TopMenu
