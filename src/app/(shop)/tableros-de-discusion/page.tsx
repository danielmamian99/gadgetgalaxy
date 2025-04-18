import React from 'react'
import { TablesOfDiscussion } from '@/components/tableros-de-discusion/TablesOfDiscussion'
import { getDiscussionBoards } from '@/app/services/boards.services'
export const dynamic = 'force-dynamic'
// O si prefieres usar ISR:
export const revalidate = 0
interface IProps {
  searchParams: {
    page?: string
  }
}
export default async function TablesPage({ searchParams }: IProps) {
  const { page: pageParams } = searchParams
  const page = pageParams ? parseInt(pageParams) : 1
  const offset = (page - 1) * 35
  const { isSuccess: isSuccessBoards, data: dataBoards } =
    await getDiscussionBoards({ limit: 35, offset })
  if (
    !isSuccessBoards ||
    !dataBoards ||
    ![200, 201, 202, 203, 204].includes(dataBoards.status)
  ) {
    return <div>error</div>
  }
  return <TablesOfDiscussion page={page} data={dataBoards?.data} />
}
