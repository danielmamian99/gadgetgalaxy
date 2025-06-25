import { fetchServer, snakeToCamel } from '../utils/fetch-server'

interface IProps {
  limit: number
  offset: number
  query?: string
}
const URL = process.env.DATABASE_URL

export const getDiscussionBoards = async ({ limit, offset, query }: IProps) => {
  const url = `${URL}/discussion-board/search/?limit=${limit}&offset=${offset}${
    query?.trim() ? `&q=${encodeURIComponent(query)}` : ''
  }`

  try {
    const response = await fetchServer(url)
    return { isSuccess: true, data: response }
  } catch (error) {
    console.error('Error fetching discussion boards:', error)
    return { isSuccess: false, error }
  }
}

export const getDiscussionBoardById = async (id: string) => {
  const url = `${URL}/discussion-boards/${id}/`
  try {
    const response = await fetchServer(url)
    return { isSuccess: true, data: response }
  } catch (error) {
    return { isSuccess: false, error }
  }
}

export const postDiscussionBoard = async ({
  name,
  description,
  token,
  adminId,
}: {
  name: string
  description: string
  token: string
  adminId: string
}) => {
  try {
    const response = await fetch(`${URL}/discussion-boards/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: name,
        description,
        admin: adminId,
        users_ids: [adminId],
      }),
    })

    const data = await response.json()
    return {
      isSuccess: response.ok,
      data: { ...data, status: response.status },
    }
  } catch (error) {
    console.error('Error during login:', error)
    return { isSuccess: false, error }
  }
}
export const addComponentToDiscussionBoard = async ({
  boardId,
  componentId,
  quantity,
  token,
}: {
  boardId: string
  componentId: number
  quantity: number
  token: string
}) => {
  try {
    const response = await fetch(`${URL}/discussion-board-components/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discussion_board: boardId,
        component: componentId,
        quantity,
      }),
    })
    const data = await response.json()
    return { isSuccess: response.ok, data }
  } catch (error) {
    return { isSuccess: false, error }
  }
}

export const postComment = async ({
  dashboardId,
  comment,
  token,
}: {
  dashboardId: string
  comment: string
  token: string
}) => {
  try {
    const response = await fetch(
      `${URL}/discussion-boards/${dashboardId}/messages/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment,
          discussion_board: dashboardId,
        }),
      }
    )

    const data = await response.json()
    return {
      isSuccess: response.ok,
      data: { ...data, status: response.status },
    }
  } catch (error) {
    console.error('Error during login:', error)
    return { isSuccess: false, error }
  }
}

export const deleteComment = async ({
  dashboardId,
  commentId,
  token,
}: {
  dashboardId: string
  commentId: string
  token: string
}) => {
  try {
    const response = await fetch(
      `${URL}/discussion-boards/${dashboardId}/messages/${commentId}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_id: commentId }),
      }
    )
    return {
      isSuccess: response.ok,
      data: { ...response, status: response.status },
    }
  } catch (error) {
    console.error('Error during login:', error)
    return { isSuccess: false, error }
  }
}

export const getComments = async (dashboardId: string) => {
  try {
    const response = await fetch(
      `${URL}/discussion-boards/${dashboardId}/messages/`
    )
    const data = await response.json()
    return {
      isSuccess: response.ok,
      data: { ...snakeToCamel(data), status: response.status },
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
    return { isSuccess: false, error }
  }
}

// Obtener componentes y cantidades de un discussion board
export const getDiscussionBoardComponents = async (boardId: string) => {
  try {
    const response = await fetch(
      `${URL}/discussion-board-components/?discussion_board=${boardId}`
    )
    const data = await response.json()
    return { isSuccess: response.ok, data }
  } catch (error) {
    return { isSuccess: false, error }
  }
}
