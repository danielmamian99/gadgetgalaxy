import { IUser } from '@/seed/seed'
import React from 'react'
import { TablesGrid } from '@/components/tableros-de-discusion/components'
import { Title } from '@/components'
import { CommentProfile } from '@/components/tablero-de-discusion/CommentProfile'
import { UserProfile } from '@/components/profile'
import { titleFont } from '@/config/fonts'
interface IProps {
  user: IUser
}
export const Profile = ({ user }: IProps) => {
  console.log('user >>>', user)
  return (
    <div className='flex flex-col pt-6 gap-10'>
      <div className='flex flex-col gap-3'>
        <UserProfile
          size='lg'
          date={user.date}
          userInfo={{
            ...user
          }}
          showBackButton
        />
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h1
            className={`${titleFont.className} antialiased text-3xl font-semibold`}
          >
            Tableros de {user.name}
          </h1>
          <h3 className='text-base'>{`Tableros de discusión creados por ${user.name}`}</h3>
        </div>
        {user.tables ? (
          <TablesGrid tables={user.tables} />
        ) : (
          <div>No hay tableros</div>
        )}
      </div>
    </div>
  )
}
