import { off } from 'process'
import { fetchServer, fetchServerAuth } from '../utils'

const URL = process.env.DATABASE_URL
interface IProps {
  limit: number
  offset: number
  query?: string
}

export const getComponents = async ({ limit, offset, query }: IProps) => {
  const componentsUrl = `${URL}/comp/search/?limit=${limit}&offset=${offset}${
    query?.trim() ? `&q=${encodeURIComponent(query)}` : ''
  }`
  const providersUrl = `${URL}/providers/`

  try {
    // Ejecuta ambas peticiones en paralelo
    const [componentsResponse, providersResponse] = await Promise.all([
      fetchServer(componentsUrl),
      fetchServer(providersUrl),
    ])

    // Accede a los datos de las respuestas
    const components = componentsResponse.data.results
    const providers = providersResponse.data.results

    // Realiza el merge de los components con sus providers
    const mergedData = components?.map((component: any) => {
      const provider = providers?.find(
        (provider: any) => String(provider.id) === String(component.proveedor)
      )
      return {
        ...component,
        proveedor: provider || null,
      }
    })

    return {
      isSuccess: true,
      data: {
        ...componentsResponse,
        data: {
          ...componentsResponse.data,
          results: mergedData,
        },
      },
    }
  } catch (error) {
    console.error('Error fetching components or providers:', error)
    return {
      isSuccess: false,
      error,
    }
  }
}

export const getUserById = async (id: string) => {
  const url = `${URL}/users/${id}/`
  try {
    const response = await fetchServer(url)
    return {
      isSuccess: true,
      data: response,
    }
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}

export const getBoardsById = async (id: string) => {
  const url = `${URL}/user-discussion-boards/${id}/`
  try {
    const response = await fetchServer(url)
    return {
      isSuccess: true,
      data: response,
    }
  } catch (error) {
    return {
      isSuccess: false,
      error,
    }
  }
}
