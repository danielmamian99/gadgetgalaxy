import { FC } from 'react'
import { useDropdownContext } from '../../hooks'
import { _Menu } from './Menu'

export interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
  buttomSheetClassName?: string
}

export const _DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  className,
  buttomSheetClassName,
}) => {
  const { isOpen } = useDropdownContext()

  if (!isOpen) {
    return null
  }

  return (
    <_Menu buttomSheetClassName={buttomSheetClassName} className={className}>
      {children}
    </_Menu>
  )
}
