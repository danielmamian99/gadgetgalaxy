import { createContext } from 'react'

export interface ContextModalProps {
  /**
   * Function to close the Modal
   */
  onClose: () => void
}

export const modalContext = createContext<ContextModalProps | null>(null)

export const ModalProvider = modalContext.Provider
