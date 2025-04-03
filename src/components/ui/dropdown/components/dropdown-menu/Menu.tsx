import { FC } from 'react'
import { useMatchWindowQuery } from '@/hooks/useMatchWindowQuery'
import { useOutsideClickAndEscape } from '@/hooks/useOutsideClickAndEscape'
import { useDropdownContext } from '../../hooks'
import { BottomSheet } from '@/components/ui/bottom-sheet/BottomSheet'
import { composeClasses } from '@/app/utils/classes'

export interface MenuProps {
  children: React.ReactNode
  className?: string
  buttomSheetClassName?: string
}

export const _Menu: FC<MenuProps> = ({
  children,
  className,
  buttomSheetClassName,
}) => {
  const { isMD } = useMatchWindowQuery()
  const {
    closeOnOutsideClick,
    isOpen,
    onClose,
    popperElement,
    floatingStyles,
    popperRef,
    setIsOpen,
    closeOnEscape,
    inMobileFullHeight,
    isResponsive,
  } = useDropdownContext()

  useOutsideClickAndEscape({
    ref: popperRef!,
    closeOnEscape,
    closeOnOutsideClick,
    callback: () => {
      onClose?.()
      setIsOpen?.(false)
    },
  })

  if (!isResponsive || isMD) {
    return (
      <div
        ref={popperElement}
        style={{
          ...floatingStyles,
        }}
        className={composeClasses(
          className,
          'w-full py-4 rounded-xl shadow-x5 border border-surface-strokes bg-surface-white z-1'
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      {...(inMobileFullHeight && {
        snapPoints: ({ maxHeight }: { maxHeight: number }) => [maxHeight],
      })}
    >
      <div className={buttomSheetClassName}>{children}</div>
    </BottomSheet>
  )
}
