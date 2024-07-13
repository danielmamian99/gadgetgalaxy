import { Portal } from '@/components/ui/portal'
import { ReactNode } from 'react'

export interface ConditionalPortalWrapperProps {
  children: ReactNode
  isPortal: boolean
}

export const ConditionalPortalWrapper = ({
  children,
  isPortal
}: ConditionalPortalWrapperProps) => {
  if (isPortal) {
    return <Portal>{children}</Portal>
  }

  return <>{children}</>
}
