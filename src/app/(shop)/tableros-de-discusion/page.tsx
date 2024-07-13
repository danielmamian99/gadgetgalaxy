import React from 'react'
import { allTablesData } from '@/seed/seed'
import { TablesOfDiscussion } from '@/components/tableros-de-discusion/TablesOfDiscussion'

export default async function TablesPage() {
  //   const { isSuccess, data } = await postLogin()
  //   console.log('data >>>', data)
  //   if (!isSuccess || !data || ![200, 201, 202, 203, 204].includes(data.status)) {
  //     return <div>error</div>
  //   }
  //   const { isSuccess: isSuccessComponents, data: dataComponents } =
  //     await getComponents({ token: data.access_token, limit: 35, offset: 0 })
  //   if (
  //     !isSuccessComponents ||
  //     !dataComponents ||
  //     ![200, 201, 202, 203, 204].includes(dataComponents.status)
  //   ) {
  //     return <div>error</div>
  //   }
  const data = allTablesData
  return <TablesOfDiscussion data={data} />
}
