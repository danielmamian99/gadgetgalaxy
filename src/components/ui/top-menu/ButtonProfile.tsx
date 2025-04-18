'use client'

import React, { lazy, useState } from 'react'
import Tooltip from '../tooltip/Tooltip'
import { Avatar } from '../avatar/Avatar'
import { GoogleIcon } from '../components/GoogleIcon'
import Link from 'next/link'
import { useAuthUser } from '@/hooks/useAuthUser'
import { IUser } from '@/interfaces/profile.interface'

const DropdownComponent = lazy(() => import('../dropdown'))

const Dropdown = Object.assign(DropdownComponent, {
  Trigger: lazy(() =>
    import('../dropdown').then((mod) => ({
      default: mod.Dropdown.Trigger,
    }))
  ),
  Menu: lazy(() =>
    import('../dropdown').then((mod) => ({
      default: mod.Dropdown.Menu,
    }))
  ),
})
interface IProps {
  user: IUser
}
export const ButtonProfile = ({ user }: IProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const { clearUser } = useAuthUser()

  const handleLogout = () => {
    // Elimina los datos del localStorage
    clearUser()
  }

  return (
    <Tooltip
      content='Perfil'
      tooltipClassName={showOptions ? 'hidden' : 'z-3'}
      className='w-full'
      placement='bottom-start'
    >
      <Dropdown
        className='w-full'
        isOpen={showOptions}
        setIsOpen={setShowOptions}
        onClose={() => setShowOptions(false)}
        defaultPlacement='bottom-start'
      >
        <Dropdown.Trigger>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className='min-h-[42px] min-w-[42px] p-0.5 bg-surface-gray-10 text-black bg-transparent hover:bg-button-secondary active:bg-button-secondary-hover disabled:text-terciary disabled:hover:bg-button-secondary text-body-bold-m gap-2 flex items-center justify-center border-2 border-transparent whitespace-nowrap duration-200 ease-out transition-colors flex-row rounded-3xl'
          >
            <Avatar
              className='text-xl'
              name={user?.username}
              avatarUrl={user?.photo}
              size={42}
            />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Menu className='bg-white !w-[250px] max-w-[250px] border flex flex-col shadow-x5 items-start justify-start border-surface-strokes !rounded-3xl !p-0'>
          <div className='flex flex-col items-start w-full max-h-[35vh] ui-kit-scrollbar overflow-y-auto'>
            <Link
              href={`/perfil/${user?.id}`}
              className='w-full !justify-start text-black bg-transparent hover:bg-button-secondary active:bg-button-secondary-hover disabled:text-terciary disabled:hover:bg-button-secondary text-body-bold-m p-3 gap-2 flex items-center border-2 border-transparent whitespace-nowrap duration-200 ease-out transition-colors flex-row rounded-3xl'
            >
              <Avatar
                className='text-sm'
                name={user?.username}
                avatarUrl={user?.photo}
                size={28}
              />
              <p className='truncate max-w-[230px]'>{user?.username}</p>
            </Link>
            <button
              onClick={handleLogout}
              className='w-full !justify-start text-black bg-transparent hover:bg-button-secondary active:bg-button-secondary-hover disabled:text-terciary disabled:hover:bg-button-secondary text-body-bold-m p-3 gap-2 flex items-center border-2 border-transparent whitespace-nowrap duration-200 ease-out transition-colors flex-row rounded-3xl'
            >
              <GoogleIcon name='logout' className='text-2xl' />
              Salir
            </button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Tooltip>
  )
}
