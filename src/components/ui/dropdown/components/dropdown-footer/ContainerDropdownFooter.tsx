import { composeClasses } from '@/app/utils/classes'
import { FC, ReactNode } from 'react'

export interface ContainerDropdownFooterProps {
  children: ReactNode
  className?: string
}

export const _ContainerDropdownFooter: FC<ContainerDropdownFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      data-testid='dropdown-footer'
      className={composeClasses(className, 'w-full pt-4 px-4')}
    >
      {children}
    </div>
  )
}
