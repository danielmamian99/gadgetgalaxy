'use client'

import { useState, useEffect } from 'react'

export const useAuthUser = () => {
  const [user, setUserState] = useState<any>(null)
  const [token, setTokenState] = useState<string | null>(null)

  const isLogin = !!token

  // Función para actualizar el usuario y el token en el localStorage
  const setUser = (user: any, token: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    setUserState(user)
    setTokenState(token)
    window.location.reload()
  }

  // Función para limpiar el usuario y el token del localStorage
  const clearUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUserState(null)
    setTokenState(null)
    window.location.reload()
  }

  // Efecto para sincronizar el estado con el localStorage
  useEffect(() => {
    const syncAuthState = () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
      const storedToken = localStorage.getItem('token')
      setUserState(storedUser ? JSON.parse(storedUser) : null)
      setTokenState(storedToken)
    }

    // Escucha cambios en el localStorage
    window.addEventListener('storage', syncAuthState)

    // Inicializa el estado con los valores actuales del localStorage
    syncAuthState()

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('storage', syncAuthState)
    }
  }, [])

  return {
    user,
    token,
    isLogin,
    setUser,
    clearUser,
  }
}
