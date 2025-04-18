const URL = process.env.DATABASE_URL

export const postLogin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
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

export const postRegister = async ({
  rol,
  email,
  username,
  password,
}: {
  rol: 'cliente' | 'bodega'
  username: string
  password: string
  email: string
}) => {
  try {
    const response = await fetch(`${URL}/user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: rol,
        username,
        password,
        email,
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
