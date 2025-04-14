'use client'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { FcElectronics } from 'react-icons/fc'
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoTicketOutline,
} from 'react-icons/io5'
import { CloseButton } from '../button/CloseButton'
import { useBodyScrollLock } from '@/hooks'
import SidebarComponent from '../components/SidebarComponent'

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
    <SidebarComponent
      className='flex flex-col justify-between h-full'
      isOpen={isSideMenuOpen}
      onClose={closeMenu}
    >
      <div className='py-4 border-b'>
        <div className='flex justify-between px-4 w-full'>
          <div
            style={{
              borderRadius: '100%',
              backgroundImage: `url('/imgs/gadgetlogo1.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '32px',
              width: '32px',
            }}
          />

          <CloseButton onClick={closeMenu} />
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-4 py-4'>
        {isLogin && (
          <Link
            href='/'
            onClick={closeMenu}
            className='flex items-center p-2 hover:bg-gray-100 rounded transition-all '
          >
            <IoPersonOutline size={30} />
            <span className='ml-3'> Perfil</span>
          </Link>
        )}
        <Link
          href='/'
          onClick={closeMenu}
          className='flex items-center p-2 hover:bg-gray-100 rounded transition-all '
        >
          <FcElectronics size={30} />
          <span className='ml-3'> Productos</span>
        </Link>
        <Link
          href='/tableros-de-discusion'
          onClick={closeMenu}
          className='flex items-center p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline size={30} />
          <span className='ml-3'>Tableros de discusión </span>
        </Link>
      </div>
      <div className='border-t w-full p-4'>
        {isLogin ? (
          <Link
            href='/'
            onClick={closeMenu}
            className='flex items-center hover:bg-gray-100 rounded transition-all '
          >
            <IoLogOutOutline size={30} />
            <span className='ml-3'> Salir</span>
          </Link>
        ) : (
          <button
            onClick={onLogin}
            className='flex items-center hover:bg-gray-100 rounded transition-all '
          >
            <IoLogInOutline size={30} />
            <span className='ml-3'> Ingresar</span>
          </button>
        )}
      </div>
    </SidebarComponent>
  )
}

export default Sidebar
