import { HomeModule } from '@/modules/home'
import { getComponents } from '../services'
import { Products } from '@/components/products/Products'

export const dynamic = 'force-dynamic'
// O si prefieres usar ISR:
export const revalidate = 0
interface IProps {
  searchParams: {
    page?: string
  }
}

const fetchData = async (page: number) => {
  const offset = (page - 1) * 35
  const { isSuccess: isSuccessComponents, data: componentsData } =
    await getComponents({
      limit: 35,
      offset,
    })
  if (
    !isSuccessComponents ||
    !componentsData ||
    ![200, 201, 202, 203, 204].includes(componentsData.status)
  ) {
    return {
      isSuccess: false,
      error: `${!isSuccessComponents ? 'Error fetching components' : ''} ${
        componentsData ? componentsData.status : 'Empty components'
      }`,
    }
  }
  return {
    isSuccess: true,
    data: componentsData.data,
  }
}

export default async function Home({ searchParams }: IProps) {
  const { page: pageParams } = searchParams
  const page = pageParams ? parseInt(pageParams) : 1
  const { isSuccess, data, error } = await fetchData(page)

  if (error || !isSuccess) {
    return <div>{error}</div>
  }

  return (
    <div className='px-6 sm:px-10'>
      {data ? (
        <HomeModule dataComponents={data} page={page} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
