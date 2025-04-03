import { FC, MouseEvent, ReactNode } from 'react'
import { _ContainerDropdownFooter } from './ContainerDropdownFooter'
import { Button } from '@/components/ui/button/Button'
import { composeClasses } from '@/app/utils/classes'
import { Divider } from '@/components/ui/components/Divider'

export interface DropdownFooterProps {
  children?: ReactNode
  onReset?: (event: MouseEvent) => void
  onConfirm?: (event: MouseEvent) => void
  resetLabel?: string
  confirmLabel?: string
  className?: string
  sizesButtons?: 'sm' | 'md' | 'lg'
  isDisabledReset?: boolean
  isDisabledConfirm?: boolean
  isLoadingReset?: boolean
  isLoadingConfirm?: boolean
}

export const _DropdownFooter: FC<DropdownFooterProps> = ({
  children,
  confirmLabel = 'Aceptar',
  onConfirm,
  onReset,
  resetLabel = 'Limpiar',
  className,
  sizesButtons = 'sm',
  isDisabledReset,
  isDisabledConfirm,
}) => {
  if (children) {
    return (
      <_ContainerDropdownFooter className={className}>
        {children}
      </_ContainerDropdownFooter>
    )
  }

  return (
    <>
      <Divider />
      <_ContainerDropdownFooter
        className={composeClasses(
          className,
          'flex flex-row items-center justify-between gap-1'
        )}
      >
        <Button
          dataTestId='dropdown-reset-button'
          isDisabled={isDisabledReset}
          size={sizesButtons}
          className='!px-0 !py-1'
          variant='link'
          onClick={onReset}
        >
          {resetLabel}
        </Button>
        <Button
          dataTestId='dropdown-confirm-button'
          isDisabled={isDisabledConfirm}
          size={sizesButtons}
          variant='secondary'
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </_ContainerDropdownFooter>
    </>
  )
}
