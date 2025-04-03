import { Profile } from '@/app/modules/profile/Profile'
import { PageNotFound } from '@/components'
import { usersProfile } from '@/seed/seed'

interface IProductPageProps {
  params: {
    slug: string
  }
}

export default function ({ params }: IProductPageProps) {
  const { slug } = params
  const user = usersProfile.find((user) => user.id === slug)
  if (!user) {
    return <PageNotFound />
  }
  return <Profile user={user} />
}
