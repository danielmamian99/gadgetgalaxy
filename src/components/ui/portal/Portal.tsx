import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsMounted } from '@/hooks'

export interface PortalProps {
  /**
   *  The `portalSelector` prop in the `Portal` component is used to specify the selector for the element where the portal should be rendered.
   *  If the element is not found, the portal will be rendered at the start of the `body` element.
   *  It is of type `string`.
   * */
  portalSelector?: string
  /**
   * The content to be rendered inside the portal.
   * */
  children: ReactNode
  /**
   * className to customize the portal
   */
  className?: string
}

export const Portal: FC<PortalProps> = (props) => {
  const { children, portalSelector, className = null } = props
  const isMounted = useIsMounted()

  const [portalElement] = useState(() => {
    if (typeof window === 'undefined') return null

    const element = document?.createElement('div')
    if (className) {
      element?.setAttribute('class', className)
    }
    return element
  })

  useEffect(() => {
    const elementSelector = portalSelector
      ? document?.querySelector(portalSelector)
      : document?.body

    if (!portalElement) return

    elementSelector?.insertBefore(portalElement, elementSelector.firstChild)

    return () => {
      elementSelector?.removeChild(portalElement)
    }
  }, [portalSelector, portalElement])

  if (typeof window === 'undefined' || !portalElement) return null

  return isMounted ? createPortal(children, portalElement) : null
}

export default Portal
