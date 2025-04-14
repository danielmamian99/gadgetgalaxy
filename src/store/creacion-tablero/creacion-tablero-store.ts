import { ITableItem } from '@/interfaces/table.interface'
import { create } from 'zustand'

interface State {
  selectedComponents: ITableItem[]
  addComponentToBoard: (component: ITableItem) => void
  updateComponentQuantity: (id: number, quantity: number) => void
  removeComponentFromBoard: (id: number) => void
}

export const useCreateDiscussionStore = create<State>((set) => ({
  selectedComponents: [],
  addComponentToBoard: (component) =>
    set((state) => {
      const existingComponent = state.selectedComponents.find(
        (item: ITableItem) => item.id === component.id
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
