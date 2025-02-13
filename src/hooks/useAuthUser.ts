import { registerUser } from '@/seed/seed'

export const useAuthUser = () => {
  const user = registerUser
  const isLogin = false
  const setUser = (user: any) => {}
  return {
    setUser,
    isLogin,
    user,
  }
}
