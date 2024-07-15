import { PageNotFound } from '@/components'
import { CommentsGrid } from '@/components/tablero-de-discusion/CommentsGrid'
import { TableInfo } from '@/components/tablero-de-discusion/TableInfo'
import { tablesPerIdData } from '@/seed/seed'

interface IProductPageProps {
  params: {
    slug: string
  }
}
export default function ({ params }: IProductPageProps) {
  const { slug } = params
  const product = tablesPerIdData.find((table) => table.tableInfo.id === slug)
  console.log('product >>>', product)
  if (!product) {
    return <PageNotFound />
  }
  const { tableInfo, ownerInfo, comments } = product
  return (
    <div className='flex flex-col gap-6 my-6 p-6 bg-white rounded-xl'>
      <TableInfo ownerInfo={ownerInfo} tableInfo={tableInfo} />
      <CommentsGrid comments={comments} />
    </div>
  )
}
