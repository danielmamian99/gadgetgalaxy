import { FC } from 'react'

import { InputProps } from '../../../Input'
import { composeClasses } from '@/app/utils'

interface LeftIconProps {
  leftIcon?: InputProps['leftIcon']
  leftIconClass?: string
  type: InputProps['type']
  disabled?: boolean
}

export const LeftIcon: FC<LeftIconProps> = ({
  leftIcon,
  leftIconClass,
  type,
  disabled
}) => {
  return (
    <span
      className={composeClasses(
        'absolute material-symbols-outlined left-4',
        leftIconClass,
        !leftIcon && '!hidden',
        disabled && '!text-button-primary-disabled'
      )}
    >
      {leftIcon}
    </span>
  )
}
