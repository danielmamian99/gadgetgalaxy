import { off } from 'process'
import { fetchServerAuth } from '../utils'

const URL = process.env.DATABASE_URL
interface IProps {
  token: string
  limit: number
  offset: number
}
export const getComponents = async ({ token, limit, offset }: IProps) => {
  console.log('token >>>', token)
  console.log('limit >>>', limit)
  console.log('offset >>>', offset)
  const url = `${URL}/components/?limit=${limit}&offset=${offset}`
  console.log('url >>>', url)
  try {
    const response = await fetchServerAuth(url, token)
    console.log('response >>>', response)
    return {
      isSuccess: true,
      data: response
    }
  } catch (error) {
    return {
      isSuccess: false,
      error
    }
  }
}

export const postLogin = async () => {
  try {
    const response = await fetch(`${URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'smb123',
        password: '1c2a7086d0c'
      })
    })
    const data = await response.json()
    return {
      isSuccess: true,
      data: { ...data, status: response.status }
    }
  } catch (error) {
    return {
      isSuccess: false,
      error
    }
  }
}
