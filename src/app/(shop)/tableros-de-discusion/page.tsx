import React from 'react'
import { allTablesData } from '@/seed/seed'
import { TablesOfDiscussion } from '@/components/tableros-de-discusion/TablesOfDiscussion'
import { getComponents, getDiscussionBoards } from '@/app/services'

export default async function TablesPage() {
  //   const { isSuccess, data } = await postLogin()
  //   console.log('data >>>', data)
  //   if (!isSuccess || !data || ![200, 201, 202, 203, 204].includes(data.status)) {
  //     return <div>error</div>
  //   }
  const { isSuccess: isSuccessBoards, data: dataBoards } =
    await getDiscussionBoards({ limit: 35, offset: 0 })
  if (
    !isSuccessBoards ||
    !dataBoards ||
    ![200, 201, 202, 203, 204].includes(dataBoards.status)
  ) {
    return <div>error</div>
  }
  return <TablesOfDiscussion data={dataBoards?.data} />
}
