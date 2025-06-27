'use client'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { FcElectronics } from 'react-icons/fc'
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoTicketOutline,
} from 'react-icons/io5'
import { CloseButton } from '../button/CloseButton'
import { useBodyScrollLock } from '@/hooks'
import SidebarComponent from '../components/SidebarComponent'
import useSession from '@/hooks/useSession'
import { Divider } from '../components'
import { Avatar } from '../avatar/Avatar'
import { useAuthUser } from '@/hooks/useAuthUser'

export const SideMenu = () => {
  const { clearUser } = useAuthUser()
  const { isLogin, profile } = useSession()
  const { openAuthModal } = useAuthModal()
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeMenu = useUIStore((state) => state.closeSideMenu)
  const onLogin = (e: React.MouseEvent<Element, MouseEvent>) => {
    closeMenu()
    openAuthModal(e)
  }
  const onLogout = () => {
    clearUser()
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
          <Fragment>
            <Link
              href={`/perfil/${profile?.id}`}
              onClick={closeMenu}
              className='flex items-center p-2 hover:bg-gray-100 rounded transition-all '
            >
              <Avatar
                avatarUrl={profile?.photo}
                name={profile?.username ?? 'G'}
              />
              <span className='ml-3'> {profile?.username}</span>
            </Link>
            <Divider className='!h-[1px]' />
          </Fragment>
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
            onClick={onLogout}
            className='flex items-center hover:bg-gray-100 rounded transition-all '
          >
            <IoLogOutOutline className='text-notif-red' size={30} />
            <span className='ml-3 text-notif-red'> Salir</span>
          </Link>
        ) : (
          <button
            data-tour='login-mobile'
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

export default SideMenu
