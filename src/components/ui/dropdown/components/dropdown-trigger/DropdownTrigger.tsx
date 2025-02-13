import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import { useDropdownContext } from '../../hooks'

export interface DropdownTriggerProps {
  contentButton?: ReactNode
  className?: string
  children?: ReactNode
}

export const _DropdownTrigger: FC<DropdownTriggerProps> = ({
  contentButton,
  className,
  children,
}) => {
  const { setIsOpen, isOpen, isDisabled } = useDropdownContext()

  const handleToggle = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      setIsOpen?.(!isOpen)
    },
    [setIsOpen, isOpen]
  )

  if (children) {
    return (
      <div onClick={handleToggle} className={className}>
        {children}
      </div>
    )
  }

  return <></>
}
