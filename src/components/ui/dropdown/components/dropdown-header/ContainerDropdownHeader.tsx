import { composeClasses } from '@/app/utils/classes'
import { FC, ReactNode } from 'react'

export interface ContainerDropdownHeaderProps {
  children: ReactNode
  className?: string
}

export const ContainerDropdownHeader: FC<ContainerDropdownHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      data-testid='dropdown-header'
      className={composeClasses(className, 'w-full px-4')}
    >
      {children}
    </div>
  )
}
