import React from 'react'
import { TablesGrid } from '@/components/tableros-de-discusion/components'
import { UserProfile } from '@/components/profile'
import { titleFont } from '@/config/fonts'
import { IUser } from '@/interfaces/profile.interface'
interface IProps {
  user: IUser
}
export const Profile = ({ user }: IProps) => {
  return (
    <div className='flex flex-col pt-6 gap-10'>
      <div className='flex flex-col gap-3'>
        <UserProfile
          size='lg'
          date={user.date}
          userInfo={{
            ...user,
          }}
          showBackButton
        />
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h1
            className={`${titleFont.className} antialiased text-3xl font-semibold`}
          >
            Tableros de {user.username}
          </h1>
          <h3 className='text-base'>{`Tableros de discusión creados por ${user.username}`}</h3>
        </div>
        {user?.tables ? (
          <TablesGrid tables={user?.tables} />
        ) : (
          <div>No hay tableros</div>
        )}
      </div>
    </div>
  )
}
