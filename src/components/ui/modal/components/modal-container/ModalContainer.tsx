import { FC, ReactNode, useRef } from 'react'
import { ConditionalPortalWrapper } from './ConditionalPortalWrapper'
import { useModalContext } from '../../hooks'
import { composeClasses } from '@/app/utils'
import {
  useBodyScrollLock,
  useMatchWindowQuery,
  useOutsideClickAndEscape
} from '@/hooks'
import { BottomSheet } from '@/components/ui/bottom-sheet'

export interface ModalContainerProps {
  isOpen: boolean
  children?: ReactNode
  className?: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  containerClassName?: string
  enableBgBlur?: boolean
  isPortal?: boolean
  isBlockBodyScroll?: boolean
  isResponsive?: boolean
  inMobileFullHeight?: boolean
  mobileClassName?: string
}

export const _ModalContainer: FC<ModalContainerProps> = ({
  children,
  isOpen,
  className,
  closeOnEscape,
  closeOnOutsideClick,
  containerClassName,
  enableBgBlur,
  isPortal = true,
  isBlockBodyScroll,
  isResponsive,
  inMobileFullHeight,
  mobileClassName
}) => {
  const { isMD } = useMatchWindowQuery()
  const { onClose } = useModalContext()

  const containerModalRef = useRef<HTMLDivElement | null>(null)

  useOutsideClickAndEscape({
    callback: onClose,
    closeOnEscape,
    closeOnOutsideClick,
    ref: containerModalRef
  })

  useBodyScrollLock(isMD ? isBlockBodyScroll : false)

  if (isMD || !isResponsive) {
    return (
      <ConditionalPortalWrapper isPortal={isPortal}>
        <div
          data-testid='modal-container'
          className={composeClasses(
            containerClassName,
            enableBgBlur && 'backdrop-blur-sm',
            'fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center'
          )}
        >
          <div
            data-testid='modal-second-container'
            ref={containerModalRef}
            className={composeClasses(
              className,
              'flex items-center flex-col min-w-[300px] justify-center cursor-default bg-white border border-surface-strokes rounded-xl shadow-y5'
            )}
          >
            {children}
          </div>
        </div>
      </ConditionalPortalWrapper>
    )
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className={mobileClassName}
      scrollLocking={isBlockBodyScroll}
      {...(inMobileFullHeight && {
        snapPoints: ({ maxHeight }: { maxHeight: number }) => [maxHeight]
      })}
    >
      {children}
    </BottomSheet>
  )
}
