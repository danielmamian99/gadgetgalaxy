import { create } from 'zustand'

interface State {
  isAuthModalOpen: boolean
  isSideMenuOpen: boolean
  isCreateBoardModalOpen: boolean
  setIsAuthModalOpen: (isOpen: boolean) => void
  openSideMenu: () => void
  closeSideMenu: () => void
  openCreateBoardModal: () => void
  closeCreateBoardModal: () => void
}

export const useUIStore = create<State>((set) => ({
  isAuthModalOpen: false,
  isSideMenuOpen: false,
  isCreateBoardModalOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen }),
  openCreateBoardModal: () => set({ isCreateBoardModalOpen: true }),
  closeCreateBoardModal: () => set({ isCreateBoardModalOpen: false }),
}))
