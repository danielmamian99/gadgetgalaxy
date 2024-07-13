import { FC, useMemo } from 'react'
import { InputProps } from '../../Input'
import { composeClasses } from '@/app/utils'

export interface LabelProps {
  labelText?: string
  active?: boolean
  leftIcon?: InputProps['leftIcon']
  placeholder?: string
  type?: InputProps['type']
  disabled?: boolean
  name: string
  error?: string | boolean
  handleLabelClick: () => void
  className?: string
  position?: {
    top?: number
    left?: number
  }
  height?: string
  value?: string
}

export const Label: FC<LabelProps> = ({
  active,
  type,
  leftIcon,
  placeholder,
  disabled,
  value,
  error,
  handleLabelClick,
  labelText,
  className,
  position = {
    top: 16,
    left: 16
  },
  height
}) => {
  const { top, left } = position

  const labelPosition = useMemo(() => {
    let newTop = top
    let newLeft = left

    if (leftIcon) {
      newLeft = 44
    }

    if (!!placeholder || active || !!value) {
      newTop = 4
    }

    return {
      left: newLeft,
      top: newTop
    }
  }, [left, top, leftIcon, placeholder, type, active, value])

  return (
    <div
      className={composeClasses(
        'absolute cursor-text peer-focus:!top-1 transition-all text-body-l bg-transparent duration text-tertiary-input peer-focus:text-body-s peer-focus:cursor-default peer-focus:text-primary',
        active && 'text-body-s',
        placeholder && 'cursor-default text-body-s',
        disabled &&
          '!text-button-primary-disabled bg-transparent !cursor-default',
        error && 'peer-focus:!text-destructive',
        className,
        height
      )}
      style={{
        top: labelPosition.top,
        left: labelPosition.left
      }}
      onClick={handleLabelClick}
      aria-label={labelText}
    >
      {labelText}
    </div>
  )
}
