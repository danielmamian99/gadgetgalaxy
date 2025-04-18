import { COOKIE_AUTH_USER, COOKIE_PROFILE_USER } from '@/constants/cookies'
import { getCookieValue } from '../utils/cookies'
import { IAuthUser, IAuthUserState } from '@/interfaces/auth.interface'

const STAGE = process.env.NEXT_PUBLIC_STAGE ?? ''

const IS_DEV_OR_PROD = STAGE === 'dev' || STAGE === 'prod'

export const getCookieAuthUser = () => {
  const authUser = getCookieValue(COOKIE_AUTH_USER)
  if (authUser) {
    const parsedAuthUser = JSON.parse(authUser) as IAuthUserState
    return parsedAuthUser
  }

  return null
}

export const getCookieProfileUser = () => {
  const profileUser = getCookieValue(COOKIE_PROFILE_USER)
  if (profileUser) {
    return JSON.parse(profileUser)
  }

  return null
}

// export const getCookieAuthorizationToken = () => {
//   const authUser = getCookieValue(COOKIE_AUTH_USER)
//   if (authUser) {
//     const parsedAuthUser = JSON.parse(authUser) as IAuthUser
//     const authorizationToken = parsedAuthUser?.token
//     return authorizationToken
//   }

//   return null
// }

// export const getCookieAuthorizationRoles = () => {
//   const authUser = getCookieValue(COOKIE_AUTH_USER)
//   if (authUser) {
//     const parsedAuthUser = JSON.parse(authUser) as IAuthUser
//     const authorizationRoles = parsedAuthUser?.roles
//     return authorizationRoles
//   }

//   return null
// }

// export const getAuthorizationTokenByAuthUser = (authUser: string) => {
//   if (authUser) {
//     const parsedAuthUser = JSON.parse(authUser) as IAuthUser
//     const authorizationToken = parsedAuthUser?.token
//     return authorizationToken
//   }

//   return null
// }
