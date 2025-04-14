import { composeClasses } from '@/app/utils'
import React from 'react'
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'link'
  | 'cancel'
  | 'outline'
interface IProps {
  children: React.ReactNode
  dataTestId?: string
  type?: 'button' | 'link'
  size?: 'sm' | 'md' | 'lg'
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<Element, MouseEvent>) => void)
  href?: string
  isDisabled?: boolean
  wFull?: boolean
  variant?: ButtonVariant
  className?: string
}
const assignedButtonVariant: { [key: string]: string } = {
  primary:
    'text-white bg-button-primary hover:bg-button-primary-hover disabled:bg-button-disabled disabled:text-terciary active:bg-button-primary-pressed transition-all',
  secondary:
    'bg-button-dark text-white hover:brightness-90 disabled:bg-button-disabled disabled:text-terciary active:brightness-80',
  terciary:
    'bg-button-secondary text-primary hover:bg-button-secondary-hover disabled:bg-button-disabled disabled:text-terciary active:bg-button-secondary-pressed',
  link: 'bg-transparent text-primary underline hover:brightness-150 disabled:bg-button-disabled disabled:text-terciary active:brightness-80',
  cancel:
    'bg-notif-red text-white hover:brightness-90 disabled:bg-button-disabled disabled:text-terciary active:brightness-75',
} as const
export const Button: React.FC<IProps> = ({
  children,
  type = 'button',
  size = 'md',
  href = '',
  wFull = true,
  isDisabled = false,
  variant = 'primary',
  className = '',
  onClick,
  dataTestId,
}: IProps) => {
  const sizeStyle = {
    sm: 'py-2 px-4 text-sm ',
    md: 'py-[14px] px-6 text-md ',
    lg: 'py-4 px-8 text-lg ',
  }
  const style = composeClasses(
    'flex justify-center items-center gap-2 rounded-full',
    sizeStyle[size],
    assignedButtonVariant[variant],
    wFull && ' w-full',
    className
  )
  return type === 'button' || isDisabled ? (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={style}
      data-testid={dataTestId}
    >
      {children}
    </button>
  ) : (
    <a target='blank' href={href} className={style} data-testid={dataTestId}>
      {children}
    </a>
  )
}
