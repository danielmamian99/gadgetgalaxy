import { Profile } from '@/app/modules/profile/Profile'
import { getBoardsById, getUserById } from '@/app/services'
import { PageNotFound } from '@/components'
import { usersProfile } from '@/seed/seed'

interface IProductPageProps {
  params: {
    slug: string
  }
}

export default async function ({ params }: IProductPageProps) {
  const { slug } = params

  // Fetch de los datos del tablero de discusión
  const { isSuccess, data: user } = await getUserById(slug)
  const { isSuccess: isSuccesBosrds, data: boards } = await getBoardsById(slug)

  if (!isSuccess || !user?.data) {
    return <PageNotFound />
  }
  if (!user.data) {
    return <PageNotFound />
  }
  return <Profile user={{ ...user.data, tables: boards?.data || [] }} />
}
