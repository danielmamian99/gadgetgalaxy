import { off } from 'process'
import { fetchServer, fetchServerAuth } from '../utils'

const URL = process.env.DATABASE_URL
interface IProps {
  limit: number
  offset: number
}
export const getComponents = async ({ limit, offset }: IProps) => {
  const componentsUrl = `${URL}/comp/search/`
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
        proveedor: provider || null, // Agrega los datos del provider o null si no se encuentra
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

export const getDiscussionBoards = async ({ limit, offset }: IProps) => {
  const url = `${URL}/discussion-board/search/?limit=${limit}&offset=${offset}`
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
export const getDiscussionBoardById = async (id: string) => {
  const url = `${URL}/discussion-boards/${id}/`
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
export const postLogin = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const response = await fetch(`${URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()
    return {
      isSuccess: response.ok,
      data: { ...data, status: response.status },
    }
  } catch (error) {
    console.error('Error during login:', error)
    return {
      isSuccess: false,
      error,
    }
  }
}
