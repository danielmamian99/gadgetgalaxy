import { useContext } from 'react'
import { dropdownContext } from '../context/dropdow-context'

export const useDropdownContext = () => {
  const context = useContext(dropdownContext)
  if (!context) throw new Error('There is no dropdownContext provider')
  return context
}
