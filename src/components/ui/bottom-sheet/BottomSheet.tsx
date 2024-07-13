import { composeClasses } from '@/app/utils'
import { FC } from 'react'
import {
  BottomSheet as BSComponent,
  BottomSheetProps as BSProps
} from 'react-spring-bottom-sheet'

// import 'react-spring-bottom-sheet/dist/style.css'

export type BottomSheetProps = Omit<BSProps, 'onDismiss' | 'open'> & {
  isOpen: boolean
  onClose?: () => void | undefined
  className?: string
  isBlockingScroll?: boolean
  snapPoints?: BSProps['snapPoints']
}

export const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  children,
  header,
  onClose,
  footer,
  className,
  isBlockingScroll = true,
  snapPoints,
  ...props
}) => {
  return (
    <BSComponent
      open={isOpen}
      header={header}
      scrollLocking={isBlockingScroll}
      onDismiss={onClose ? () => onClose() : undefined}
      footer={footer}
      snapPoints={snapPoints ?? (({ minHeight }) => minHeight)}
      {...props}
      className={composeClasses(
        className,
        'overflow-visible [>:data-rsbs-scroll]:overflow-visible'
      )}
    >
      {children}
    </BSComponent>
  )
}

export default BottomSheet
