import { FC, ReactNode } from 'react'
import { useDropdownContext } from '../../hooks'
import { ContainerDropdownHeader } from './ContainerDropdownHeader'
import { Divider } from '@/components/ui/components/Divider'

export interface DropdownHeaderProps {
  children?: ReactNode
  title?: string
  showCloseButton?: boolean
  className?: string
  showLeftChevron?: boolean
  onClickInArrow?: () => void
  showDivider?: boolean
}

export const _DropdownHeader: FC<DropdownHeaderProps> = ({
  children,
  title,
  className,
  showCloseButton,
  showLeftChevron,
  onClickInArrow,
  showDivider,
}) => {
  const { onClose, setIsOpen } = useDropdownContext()

  const handleOnClose = () => {
    onClose?.()
    setIsOpen?.(false)
  }

  if (children) {
    return (
      <ContainerDropdownHeader className={className}>
        {children}
      </ContainerDropdownHeader>
    )
  }

  return (
    <>
      <ContainerDropdownHeader className={className}>
        <div className='flex flex-row items-center justify-between'>
          {showLeftChevron && (
            <button type='button' onClick={onClickInArrow}>
              <span className='material-symbols-outlined text-primary'>
                chevron_left
              </span>
            </button>
          )}
          <p className='text-body-bold-l text-primary'>{title}</p>
          {showCloseButton && (
            <button type='button' onClick={handleOnClose}>
              <span className='material-symbols-outlined text-primary'>
                close
              </span>
            </button>
          )}
        </div>
      </ContainerDropdownHeader>
      {showDivider && <Divider />}
    </>
  )
}
