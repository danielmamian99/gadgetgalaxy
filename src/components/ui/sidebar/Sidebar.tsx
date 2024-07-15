'use client'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { FcElectronics } from 'react-icons/fc'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline
} from 'react-icons/io5'
import { GoogleIcon } from '../components'
import { CloseButton } from '../button/CloseButton'
import { useBodyScrollLock } from '@/hooks'

export const Sidebar = () => {
  const isLogin = false
  const { openAuthModal } = useAuthModal()
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeMenu = useUIStore((state) => state.closeSideMenu)
  const onLogin = (e: React.MouseEvent<Element, MouseEvent>) => {
    closeMenu()
    openAuthModal(e)
  }
  useBodyScrollLock(isSideMenuOpen)
  return (
    <div className='text-base md:text-xl'>
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}
      {isSideMenuOpen && (
        <div
          onClick={() => closeMenu()}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        />
      )}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[300px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )}
      >
        <CloseButton className='absolute top-5 right-5' onClick={closeMenu} />

        {isLogin && (
          <Link
            href='/'
            onClick={closeMenu}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
          >
            <IoPersonOutline size={30} />
            <span className='ml-3'> Perfil</span>
          </Link>
        )}
        <Link
          href='/'
          onClick={closeMenu}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <FcElectronics size={30} />
          <span className='ml-3'> Productos</span>
        </Link>
        <Link
          href='/tableros-de-discusion'
          onClick={closeMenu}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline size={30} />
          <span className='ml-3'>Tableros de discusión </span>
        </Link>

        <div className='w-full h-px bg-gray-200 my-10'></div>
        {isLogin ? (
          <Link
            href='/'
            onClick={closeMenu}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3'> Salir</span>
          </Link>
        ) : (
          <button
            onClick={onLogin}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
          >
            <IoLogInOutline size={30} />
            <span className='ml-3'> Ingresar</span>
          </button>
        )}
      </nav>
    </div>
  )
}

export default Sidebar
