import { useUIStore } from '@/store'

export const useAuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useUIStore((store) => ({
    isAuthModalOpen: store.isAuthModalOpen,
    setIsAuthModalOpen: store.setIsAuthModalOpen
  }))

  const openAuthModal = (e?: React.MouseEvent<Element, MouseEvent>) => {
    e?.stopPropagation()
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = (e?: React.MouseEvent<Element, MouseEvent>) => {
    e?.stopPropagation()

    setIsAuthModalOpen(false)
  }

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal
  }
}
