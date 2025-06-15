import { ITableItem } from '@/interfaces/table.interface'
import { create } from 'zustand'

interface State {
  selectedComponents: ITableItem[]
  setSelectedComponents: (components: ITableItem[]) => void
  addComponentToBoard: (component: ITableItem) => void
  updateComponentQuantity: (id: number, quantity: number) => void
  removeComponentFromBoard: (id: number) => void
}

export const useCreateDiscussionStore = create<State>((set) => ({
  selectedComponents: [],
  setSelectedComponents: (components) =>
    set((state) => ({
      ...state,
      selectedComponents: components,
    })),
  addComponentToBoard: (component) =>
    set((state) => {
      const existingComponent = state.selectedComponents.find(
        (item: ITableItem) => item.id === component.id
      )
      if (existingComponent) {
        const newQuantity = Math.min(
          existingComponent.quantity + component.quantity,
          existingComponent.stockNumber
        )
        return {
          ...state,
          selectedComponents: state.selectedComponents.map((item) =>
            item.id === component.id ? { ...item, quantity: newQuantity } : item
          ),
        }
      }
      // Si el componente no existe, limitar la cantidad inicial al stockNumber
      const initialQuantity = Math.min(
        component.quantity,
        component.stockNumber
      )
      return {
        ...state,
        selectedComponents: [
          ...state.selectedComponents,
          { ...component, quantity: initialQuantity },
        ],
      }
    }),
  updateComponentQuantity: (id, quantity) =>
    set((state) => ({
      ...state,
      selectedComponents: state.selectedComponents.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.min(quantity, item.stockNumber)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    })),
  removeComponentFromBoard: (id) =>
    set((state) => ({
      ...state,
      selectedComponents: state.selectedComponents.filter(
        (component) => component.id !== id
      ),
    })),
}))
