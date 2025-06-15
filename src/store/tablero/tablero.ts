import { create } from 'zustand'
import { IComment } from '@/interfaces/table.interface'

interface State {
  isLoadingAdd: boolean
  isLoadingDelete: boolean
  isLoadingComments: boolean
  setIsLoadingComments: (setIsLoadingComments: boolean) => void
  setIsLoadingAdd: (setIsLoadingAdd: boolean) => void
  setIsLoadingDelete: (setIsLoadingDelete: boolean) => void
  comments: IComment[]
  setComments: (comments: IComment[]) => void
}

export const useTableroStore = create<State>((set) => ({
  comments: [],
  isLoadingAdd: false,
  isLoadingDelete: false,
  isLoadingComments: false,
  setIsLoadingComments: (isLoadingComments) =>
    set((state) => ({
      ...state,
      isLoadingComments: isLoadingComments,
    })),
  setIsLoadingAdd: (isLoadingAdd) =>
    set((state) => ({
      ...state,
      isLoadingAdd: isLoadingAdd,
    })),
  setIsLoadingDelete: (isLoadingDelete) =>
    set((state) => ({
      ...state,
      isLoadingDelete: isLoadingDelete,
    })),
  setComments: (comments) =>
    set((state) => ({
      ...state,
      comments: comments,
    })),
}))
