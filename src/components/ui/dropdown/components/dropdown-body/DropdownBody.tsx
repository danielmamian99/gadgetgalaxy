import { composeClasses } from '@/app/utils/classes'
import { FC, ReactNode } from 'react'

export interface DropdownBodyProps {
  className?: string
  children: ReactNode
}

export const _DropdownBody: FC<DropdownBodyProps> = ({
  className,
  children,
}) => {
  return (
    <div
      data-testid='dropdown-body'
      className={composeClasses(className, 'p-4')}
    >
      {children}
    </div>
  )
}
