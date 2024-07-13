import { create } from 'zustand'

interface State {
  isAuthModalOpen: boolean
  isSideMenuOpen: boolean
  setIsAuthModalOpen: (isOpen: boolean) => void
  openSideMenu: () => void
  closeSideMenu: () => void
}

export const useUIStore = create<State>((set) => ({
  isAuthModalOpen: false,
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen })
}))
