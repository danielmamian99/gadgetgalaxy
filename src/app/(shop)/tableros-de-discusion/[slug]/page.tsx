import {
  getDiscussionBoardById,
  getDiscussionBoardComponents,
} from '@/app/services/boards.services'
import { formatIsoToCustom } from '@/app/utils/formatter-dates'
import { PageNotFound } from '@/components/ui/not-found/PageNotFound'
import { CommentsGrid } from '@/components/tablero-de-discusion/CommentsGrid'
import { TableInfo } from '@/components/tablero-de-discusion/TableInfo'
interface IProductPageProps {
  params: { slug: string }
}

export default async function DiscussionBoardPage({
  params,
}: IProductPageProps) {
  const { slug } = params

  const { isSuccess, data } = await getDiscussionBoardById(slug)
  const componentsRes = await getDiscussionBoardComponents(slug)
  const componentsNum = componentsRes.isSuccess
    ? componentsRes.data.components
    : []
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

  const mergedComponents = Array.isArray(components)
    ? components.map((comp: any) => {
        const found = componentsNum.find((c: any) => c.component === comp.id)
        return { ...comp, quantity: found ? found.quantity : 1 }
      })
    : []
  return (
    <div className='px-6 sm:px-10'>
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
          components={componentsNum}
        />

        <CommentsGrid
          dashboardId={slug}
          comments={messages}
          components={mergedComponents}
        />
      </div>
    </div>
  )
}
