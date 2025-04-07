import { create } from 'zustand'

interface Component {
  id: string
  name: string
  description: string
  quantity: number
}

interface State {
  isAuthModalOpen: boolean
  isSideMenuOpen: boolean
  isCreateBoardModalOpen: boolean
  selectedComponents: Component[] // Agregar esta propiedad
  setIsAuthModalOpen: (isOpen: boolean) => void
  openSideMenu: () => void
  closeSideMenu: () => void
  openCreateBoardModal: () => void
  closeCreateBoardModal: () => void
  addComponentToBoard: (component: Component) => void
  updateComponentQuantity: (id: string, quantity: number) => void
  removeComponentFromBoard: (id: string) => void
}

export const useUIStore = create<State>((set) => ({
  isAuthModalOpen: false,
  isSideMenuOpen: false,
  isCreateBoardModalOpen: false,
  selectedComponents: [], // Inicializar como un array vacío
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  setIsAuthModalOpen: (isOpen: boolean) => set({ isAuthModalOpen: isOpen }),
  openCreateBoardModal: () => set({ isCreateBoardModalOpen: true }),
  closeCreateBoardModal: () => set({ isCreateBoardModalOpen: false }),
  addComponentToBoard: (component) =>
    set((state) => {
      const existingComponent = state.selectedComponents.find(
        (item: Component) => item.id === component.id
      )
      if (existingComponent) {
        return {
          ...state,
          selectedComponents: state.selectedComponents.map((item) =>
            item.id === component.id
              ? { ...item, quantity: item.quantity + component.quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        selectedComponents: [...state.selectedComponents, component],
      }
    }),
  updateComponentQuantity: (id, quantity) =>
    set((state) => ({
      ...state,
      selectedComponents: state.selectedComponents.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  removeComponentFromBoard: (id) =>
    set((state) => ({
      ...state,
      selectedComponents: state.selectedComponents.filter(
        (component) => component.id !== id
      ),
    })),
}))
