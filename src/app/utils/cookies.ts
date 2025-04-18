import { ALL_COOKIES_AUTH } from '@/constants/cookies'

const STAGE = process.env.NEXT_PUBLIC_STAGE ?? ''
const IS_LOCAL = STAGE === 'local'
const IS_DEV = STAGE === 'dev'

export const getCookieDomain = () => {
  if (IS_LOCAL) {
    return 'localhost'
  }

  if (IS_DEV) {
    return '.testgadgetgalaxy.com'
  }

  return '.gadgetgalaxy.com'
}

export interface CreateCookieParams {
  name: string
  value: string
  date: string
  httpOnly?: boolean
  secure?: boolean
}
export const convertTimestampToDate = (
  timestamp: number,
  extraMs = 0
): string => {
  const date = new Date(timestamp + extraMs)
  return date.toUTCString()
}

export const createCookie = ({
  name,
  value,
  date,
  httpOnly = true,
  secure = true,
}: CreateCookieParams) => {
  const cookie = `${name}=${value};expires=${date};path=/;domain=${getCookieDomain()};${
    httpOnly ? 'HttpOnly;' : ''
  }${secure ? 'Secure;' : ''}SameSite=Lax;`
  document.cookie = cookie
}

export const deleteCookie = (name: string) => {
  const cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${getCookieDomain()};`
  window.document.cookie = cookie
}

export const getCookieValue = (key: string) => {
  const cookieArray = window?.document?.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${key}=`))

  if (cookieArray) {
    const [, value] = cookieArray.split('=')
    return decodeURIComponent(value)
  }

  return null
}

export const updateCookie = ({
  name,
  value,
  date,
}: {
  name: string
  value: string
  date: string
}) => {
  createCookie({
    name,
    value,
    date,
    httpOnly: false,
    secure: !IS_LOCAL,
  })
}

export const deleteCookiesAuth = () => {
  ALL_COOKIES_AUTH.forEach((cookie) => deleteCookie(cookie))
}

export const getExpirationDate = () => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)
  return expirationDate.toUTCString()
}
