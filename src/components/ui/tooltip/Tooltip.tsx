import { useCallback, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  Placement,
  inline,
  flip,
  shift
} from '@floating-ui/react-dom'
import { composeClasses } from '@/app/utils'

export interface ITooltipProps {
  children: React.ReactNode
  className?: string
  content: string
  tooltipClassName?: string
  placement?: Placement
  leftIcon?: string
  rightIcon?: string
}
export const Tooltip = ({
  children,
  className,
  content,
  leftIcon,
  placement,
  rightIcon,
  tooltipClassName
}: ITooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [inline(), flip(), shift()],
    placement
  })
  const handleMouseEnter = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false)
  }, [])
  return (
    <>
      <div
        className={composeClasses('w-fit', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={refs.setReference}
      >
        {children}
      </div>
      {isOpen && (
        <div
          className={composeClasses(
            'inline-flex p-1 justify-center items-center gap-2 bg-surface-dark rounded text-white text-xs',
            tooltipClassName
          )}
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {leftIcon && (
            <span
              data-testid='tooltip-icon-left'
              className='material-symbols-outlined text-base'
            >
              {leftIcon}
            </span>
          )}

          {content}
          {rightIcon && (
            <span
              data-testid='tooltip-icon-right'
              className='material-symbols-outlined text-base'
            >
              {rightIcon}
            </span>
          )}
        </div>
      )}
    </>
  )
}

export default Tooltip
