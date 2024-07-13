import { FC, ReactNode } from 'react'
import { ModalProvider } from './context'
import { _ModalContainer } from './components/modal-container'

export interface ModalProps {
  /**
   * This prop is used to modal render in a portal
   *  @default true
   */
  isPortal?: boolean
  /**
   * className to be applied to the container of the modal
   */
  containerClassName?: string
  /**
   * className to be applied to the modal
   */
  className?: string
  /**
   * Is used to open the modal
   */
  isOpen: boolean
  /**
   * Is used to close the modal
   */
  onClose: () => void
  /**
   * Whether the modal should close when clicking outside of it
   * @default true
   */
  closeOnOutsideClick?: boolean
  /**
   * Whether the modal should close when pressing the "Escape" key
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * The content of the modal
   */
  children: ReactNode
  /**
   * Whether the modal should have a background blur
   * @default false
   */
  enableBgBlur?: boolean
  /**
   * When isReponsive is true, in mobile render bottom sheet
   * @default true
   */
  isResponsive?: boolean
  /**
   * inMobileFullHeight is used to set the full height of the BottomSheet in mobile
   * @default false
   */
  inMobileFullHeight?: boolean
  /**
   * isBlockBodyScroll is used to block the scroll of the body when the modal is open
   * @default true
   */
  isBlockBodyScroll?: boolean
  /**
   * className to be applied to the modal in mobile when isResponsive is true
   */
  buttomSheetClassName?: string
}

export const Modal: FC<ModalProps> = ({
  children,
  className,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  containerClassName,
  enableBgBlur = false,
  isBlockBodyScroll = true,
  isOpen,
  isPortal = true,
  inMobileFullHeight = false,
  isResponsive = true,
  buttomSheetClassName,
  onClose
}) => {
  if (!isOpen) {
    return <></>
  }

  return (
    <ModalProvider value={{ onClose }}>
      <_ModalContainer
        isOpen={isOpen}
        mobileClassName={buttomSheetClassName}
        inMobileFullHeight={inMobileFullHeight}
        isResponsive={isResponsive}
        isBlockBodyScroll={isBlockBodyScroll}
        className={className}
        closeOnEscape={closeOnEscape}
        closeOnOutsideClick={closeOnOutsideClick}
        containerClassName={containerClassName}
        enableBgBlur={enableBgBlur}
        isPortal={isPortal}
      >
        {children}
      </_ModalContainer>
    </ModalProvider>
  )
}

export default Modal
