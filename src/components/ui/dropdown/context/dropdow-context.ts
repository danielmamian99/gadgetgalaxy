import { CSSProperties, MutableRefObject, createContext } from 'react'
import { ReferenceType } from '@floating-ui/react-dom'

export interface ContextDropdownProps {
  /**
   * Whether the dropdown is disabled or not
   */
  isDisabled?: boolean
  /**
   * Whether the dropdown is open or not
   * @default false
   */
  isOpen: boolean
  /**
   * Function to set the dropdown open or close
   */
  setIsOpen: (isOpen: boolean) => void
  /**
   * Function to close the dropdown
   */
  onClose: () => void
  /**
   * Whether the dropdown should close when clicking outside of it
   * @default true
   */
  closeOnOutsideClick?: boolean
  /**
   * Whether the dropdown should close when pressing the "Escape" key
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * ReferenceElement
   */
  referenceElement?: (node: ReferenceType | null) => void
  /**
   * Function to set the reference element
   */
  popperElement?: (node: ReferenceType | null) => void
  /**
   * Floating styles
   */
  floatingStyles?: CSSProperties
  /**
   * Popper ref
   */
  popperRef?: MutableRefObject<HTMLElement | null>
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
}

export const dropdownContext = createContext<ContextDropdownProps | null>(null)

export const DropdownProvider = dropdownContext.Provider
