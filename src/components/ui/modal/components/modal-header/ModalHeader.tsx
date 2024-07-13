import { FC, MouseEvent, ReactNode } from 'react'
import { useModalContext } from '../../hooks'
import { composeClasses } from '@/app/utils'
import { Divider } from '@/components/ui/components'

export interface ModalHeaderProps {
  title?: ReactNode
  subTitle?: ReactNode
  className?: string
  /**
   * @default true
   */
  isShowCloseButton?: boolean
  children?: ReactNode
  /**
   * @default true
   */
  isShowDivider?: boolean
  /**
   * @default false
   */
  isShowLeftChevron?: boolean
  onClickLeftChevron?: (event: MouseEvent) => void
}

export const _ModalHeader: FC<ModalHeaderProps> = ({
  title,
  className,
  subTitle,
  isShowCloseButton = true,
  isShowDivider = true,
  isShowLeftChevron = false,
  onClickLeftChevron,
  children
}) => {
  const { onClose } = useModalContext()

  if (children) {
    return <header className={className}>{children}</header>
  }

  if (!title) {
    throw Error('Modal.Header requires title when children are not provided.')
  }

  return (
    <>
      <header
        data-testid='modal-header'
        className={composeClasses(
          className,
          'w-full flex items-center justify-between flex-row px-4 pb-1 pt-3'
        )}
      >
        {isShowLeftChevron && (
          <button type='button' onClick={onClickLeftChevron ?? onClose}>
            <span className='material-symbols-outlined text-primary'>
              chevron_left
            </span>
          </button>
        )}
        <div className='flex flex-col items-start justify-center gap-1'>
          <p className='text-body-bold-l text-primary'>{title}</p>
          <p className='text-body-bold-s text-secondary'>{subTitle}</p>
        </div>
        {isShowCloseButton && (
          <button
            onClick={onClose}
            data-testid='modal-close-button'
            type='button'
            className='hover:brightness-150'
          >
            <span className='material-symbols-outlined text-primary'>
              close
            </span>
          </button>
        )}
      </header>
      {isShowDivider && <Divider />}
    </>
  )
}
