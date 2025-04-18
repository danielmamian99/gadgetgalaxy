'use client'
import { useEffect, useState } from 'react'
import {
  getCookieAuthUser,
  getCookieProfileUser,
} from '@/app/services/token-service'
import { IAuthUserState } from '@/interfaces/auth.interface'
import { IUser } from '@/interfaces/profile.interface'

export const useSession = () => {
  const [authUser, setAuthUser] = useState<IAuthUserState | null>(null)
  const [profile, setProfile] = useState<IUser | null>(null)
  const isLogin = !!authUser
  useEffect(() => {
    setAuthUser(getCookieAuthUser())
    setProfile(getCookieProfileUser())
  }, [])

  const updateAuthUser = (newAuthUser: IAuthUserState) => {
    setAuthUser(newAuthUser)
  }

  const updateProfile = (newProfile: IUser) => {
    setProfile(newProfile)
  }

  const updateSession = () => {
    setAuthUser(getCookieAuthUser())
    setProfile(getCookieProfileUser())
  }

  return {
    isLogin,
    authUser,
    profile,
    updateAuthUser,
    updateProfile,
    updateSession,
  }
}

export default useSession
