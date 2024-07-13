import { FC, MouseEvent } from 'react'
import { InputProps } from '../../../Input'
import { composeClasses } from '@/app/utils'

interface RightIconProps {
  rightIcon?: InputProps['rightIcon']
  rightIconClass?: string
  disabled?: boolean
  error?: string | boolean
  onRightIconClick?: (event: MouseEvent) => void
}

export const RightIcon: FC<RightIconProps> = ({
  rightIcon,
  rightIconClass,
  disabled,
  error,
  onRightIconClick
}) => {
  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    onRightIconClick?.(event)
  }

  return (
    <span
      data-testid='right-icon'
      className={composeClasses(
        'material-symbols-outlined absolute',
        rightIconClass,
        !rightIcon && '!hidden',
        disabled && '!text-button-primary-disabled',
        error && '!text-destructive'
      )}
      onClick={handleOnClick}
    >
      {rightIcon}
    </span>
  )
}
