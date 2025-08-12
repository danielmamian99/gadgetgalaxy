import { create } from 'zustand'

interface State {
  isDeleteModalOpen: boolean
  isAuthModalOpen: boolean
  isSideMenuOpen: boolean
  isCreateBoardModalOpen: boolean
  isJoinBoardModalOpen: boolean
  startAddBoardAnimation: boolean
  setStartAddBoardAnimation: (start: boolean) => void
  setIsAuthModalOpen: (isOpen: boolean) => void
  setIsDeleteModalOpen: (isOpen: boolean) => void
  openSideMenu: () => void
  closeSideMenu: () => void
  openCreateBoardModal: () => void
  closeCreateBoardModal: () => void
  setIsJoinBoardModalOpen: (isOpen: boolean) => void
}

export const useUIStore = create<State>((set) => ({
  isAuthModalOpen: false,
  isSideMenuOpen: false,
  isCreateBoardModalOpen: false,
  isDeleteModalOpen: false,
  startAddBoardAnimation: false,
  isJoinBoardModalOpen: false,
  setStartAddBoardAnimation: (start: boolean) =>
    set({ startAddBoardAnimation: start }),
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen }),
  setIsDeleteModalOpen: (isOpen: boolean) => set({ isDeleteModalOpen: isOpen }),
  openCreateBoardModal: () => set({ isCreateBoardModalOpen: true }),
  closeCreateBoardModal: () => set({ isCreateBoardModalOpen: false }),
  setIsJoinBoardModalOpen: (isOpen: boolean) =>
    set({ isJoinBoardModalOpen: isOpen }),
}))
