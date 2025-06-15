import { getDiscussionBoardById } from '@/app/services/boards.services'
import { formatIsoToCustom } from '@/app/utils/formatter-dates'
import { PageNotFound } from '@/components/ui/not-found/PageNotFound'
import { CommentsGrid } from '@/components/tablero-de-discusion/CommentsGrid'
import { TableInfo } from '@/components/tablero-de-discusion/TableInfo'

interface IProductPageProps {
  params: {
    slug: string
  }
}

export default async function DiscussionBoardPage({
  params,
}: IProductPageProps) {
  const { slug } = params

  const { isSuccess, data } = await getDiscussionBoardById(slug)

  if (!isSuccess || !data) {
    return <PageNotFound />
  }

  const {
    nombre,
    description,
    createdAt,
    messages,
    users,
    admin,
    id,
    components,
  } = data.data
  return (
    <div className='flex flex-col gap-6 my-6 p-6 bg-white rounded-xl'>
      {/* Información del tablero */}
      <TableInfo
        tableInfo={{
          id,
          nombre,
          description,
          createdAt: formatIsoToCustom(createdAt),
        }}
        ownerInfo={users?.find((user: any) => user.id === admin)}
        components={components}
      />

      <CommentsGrid dashboardId={slug} comments={messages} />
    </div>
  )
}
