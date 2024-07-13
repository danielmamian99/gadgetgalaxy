import { FC, MouseEvent, ReactNode } from 'react'
import { Button, ButtonVariant } from '@/components'
import { composeClasses } from '@/app/utils'
import { Divider } from '@/components/ui/components'

export interface ModalFooterProps {
  children?: ReactNode
  className?: string
  isShowDivider?: boolean
  confirmOptions?: {
    onClick: (event: MouseEvent) => void
    variant: ButtonVariant
    label: string
  }
  resetOptions?: {
    onClick: (event: MouseEvent) => void
    variant: ButtonVariant
    label: string
  }
}

export const _ModalFooter: FC<ModalFooterProps> = ({
  children,
  confirmOptions,
  resetOptions,
  className,
  isShowDivider = true
}) => {
  if (children) {
    return <footer className={className}>{children}</footer>
  }

  if (!confirmOptions || !resetOptions) {
    throw Error(
      'Modal.Footer requires confirmOptions and resetOptions when children are not provided.'
    )
  }

  return (
    <>
      {isShowDivider && <Divider />}
      <footer
        data-testid='modal-footer'
        className={composeClasses(
          className,
          'px-4 py-[9px] flex items-center justify-between w-full flex-row'
        )}
      >
        <Button
          variant={resetOptions.variant}
          onClick={resetOptions.onClick}
          text={resetOptions.label}
        />
        <Button
          variant={confirmOptions.variant}
          onClick={confirmOptions.onClick}
          text={confirmOptions.label}
        />
      </footer>
    </>
  )
}
