'use client'

import { createCookie, deleteCookie } from '@/app/utils/cookies'
import { COOKIE_AUTH_USER, COOKIE_PROFILE_USER } from '@/constants/cookies'

const STAGE = process.env.NEXT_PUBLIC_STAGE ?? ''

export const useAuthUser = () => {
  // Función para actualizar el usuario y el token en el localStorage
  const setUser = (user: any, token: string) => {
    const expirationDate = new Date()

    expirationDate.setDate(expirationDate?.getDate() + 365)

    const formattedDate = expirationDate?.toUTCString()
    createCookie({
      name: COOKIE_AUTH_USER,
      value: JSON.stringify({ token }),
      date: formattedDate,
      httpOnly: false,
      secure: STAGE !== 'local',
    })
    createCookie({
      name: COOKIE_PROFILE_USER,
      value: JSON.stringify(user),
      date: formattedDate,
      httpOnly: false,
      secure: STAGE !== 'local',
    })
    window.location.reload()
  }

  // Función para limpiar el usuario y el token del localStorage
  const clearUser = () => {
    deleteCookie(COOKIE_AUTH_USER)
    deleteCookie(COOKIE_PROFILE_USER)
    window.location.reload()
  }
  return {
    setUser,
    clearUser,
  }
}
