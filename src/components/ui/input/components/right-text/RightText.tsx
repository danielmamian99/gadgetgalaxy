import { FC } from 'react'
import { composeClasses } from '@/app/utils'
import { InputProps } from '../../Input'

interface RightTextProps {
  rightText?: string
  rightIcon?: InputProps['rightIcon']
}

export const RightText: FC<RightTextProps> = ({ rightText, rightIcon }) => {
  return (
    <span
      className={composeClasses(
        'absolute text-tertiary-input text-body-m',
        !rightIcon ? 'right-4' : 'right-12'
      )}
    >
      {rightText}
    </span>
  )
}
