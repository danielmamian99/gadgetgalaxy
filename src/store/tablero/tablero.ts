import { create } from 'zustand'
import { IComment } from '@/interfaces/table.interface'

interface State {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  comments: IComment[]
  setComments: (comments: IComment[]) => void
}

export const useTableroStore = create<State>((set) => ({
  comments: [],
  isLoading: false,
  setIsLoading: (isLoading) =>
    set((state) => ({
      ...state,
      isLoading: isLoading,
    })),
  setComments: (comments) =>
    set((state) => ({
      ...state,
      comments: comments,
    })),
}))
