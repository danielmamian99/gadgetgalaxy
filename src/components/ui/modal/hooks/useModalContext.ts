import { useContext } from 'react'
import { modalContext } from '../context'

export const useModalContext = () => {
  const context = useContext(modalContext)
  if (!context) throw new Error('There is no modalContext provider')
  return context
}
