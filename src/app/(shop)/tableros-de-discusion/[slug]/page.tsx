import { getDiscussionBoardById } from '@/app/services'
import { PageNotFound } from '@/components'
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

  // Fetch de los datos del tablero de discusión
  const { isSuccess, data } = await getDiscussionBoardById(slug)

  if (!isSuccess || !data) {
    return <PageNotFound />
  }

  console.log(data.data, 'daterr')

  // Extraer los datos necesarios de la respuesta
  const { nombre, description, created_at, messages, users, admin } = data.data

  return (
    <div className='flex flex-col gap-6 my-6 p-6 bg-white rounded-xl'>
      {/* Información del tablero */}
      <TableInfo
        tableInfo={{
          nombre,
          description,
          createdAt: new Date(created_at).toLocaleDateString(),
        }}
        ownerInfo={users?.find((user: any) => user.id === admin)}
      />

      {/* Lista de comentarios */}
      <CommentsGrid comments={messages} />
    </div>
  )
}
