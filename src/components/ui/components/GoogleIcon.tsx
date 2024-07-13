import { FC } from 'react'
import { composeClasses } from '@/app/utils'

export interface GoogleIconProps {
  name: string
  variant?: 'filled' | 'outlined'
  className?: string
  ariaLabel?: string
}

export const GoogleIcon: FC<GoogleIconProps> = ({
  name,
  variant = 'outlined',
  className,
  ariaLabel
}) => {
  return (
    <span
      role='img'
      aria-label={ariaLabel ?? name}
      id={variant === 'filled' ? 'material-symbols-filled' : ''}
      className={composeClasses(className, 'material-symbols-outlined')}
    >
      {name}
    </span>
  )
}

export default GoogleIcon
