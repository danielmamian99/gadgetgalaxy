import { composeClasses } from '@/app/utils'
import { FC, ReactNode } from 'react'

export interface ModalBodyProps {
  children: ReactNode
  className?: string
}

export const _ModalBody: FC<ModalBodyProps> = ({ children, className }) => {
  return <div className={composeClasses(className, 'p-6')}>{children}</div>
}
