import React from 'react'
import { ProductGrid, Title } from '@/components'
import { getComponents, postLogin } from '../services'
import { PaginationSection } from '../modules/category'
import { LinkButtonNext } from '@/components/ui/button/LinkButtonNext'
import { Products } from '@/components/products'

export default async function Home() {
  const { isSuccess, data } = await postLogin()
  console.log('data >>>', data)
  if (!isSuccess || !data || ![200, 201, 202, 203, 204].includes(data.status)) {
    return <div>error</div>
  }
  const { isSuccess: isSuccessComponents, data: dataComponents } =
    await getComponents({ token: data.access_token, limit: 35, offset: 0 })
  if (
    !isSuccessComponents ||
    !dataComponents ||
    ![200, 201, 202, 203, 204].includes(dataComponents.status)
  ) {
    return <div>error</div>
  }
  console.log('dataComponents >>>', dataComponents.data.next)
  return (
    <Products dataComponents={dataComponents.data} token={data.access_token} />
  )
}
