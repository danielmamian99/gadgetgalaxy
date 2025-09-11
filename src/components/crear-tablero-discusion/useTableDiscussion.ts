import {
  postDiscussionBoard,
  addComponentToDiscussionBoard,
} from '@/app/services/boards.services'
import { useForm } from '@/hooks/useForm'
import useMatchWindowQuery from '@/hooks/useMatchWindowQuery'
import useSession from '@/hooks/useSession'
import { useCreateDiscussionStore } from '@/store/creacion-tablero/creacion-tablero-store'
import { useUIStore } from '@/store/ui/ui-store'
import { useEffect, useState } from 'react'
import toast from '../ui/toast/toast'

const boardData = localStorage.getItem('createBoardData')
const parsedBoardData = boardData ? JSON.parse(boardData) : null
const INITIAL_FORM = parsedBoardData
  ? { name: parsedBoardData.name, description: parsedBoardData.description }
  : { name: '', description: '' }
const FORM_VALIDATIONS = {
  name: [(name: string) => name.length > 0, 'El nombre es obligatorio'],
}
export const useTableDiscussion = () => {
  const { authUser, isLogin, profile } = useSession()
  const setIsAuthModalOpen = useUIStore((state) => state.setIsAuthModalOpen)
  const setStartAddBoardAnimation = useUIStore(
    (state) => state.setStartAddBoardAnimation
  )
  const {
    formValidation,
    formState,
    isFormValid,
    onInputTextChange,
    onChangeValue,
  } = useForm(INITIAL_FORM, FORM_VALIDATIONS)
  const { isMD } = useMatchWindowQuery()
  const [showErrors, setShowErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { name, description } = formState
  const { selectedComponents, setSelectedComponents } =
    useCreateDiscussionStore()
  const isOpen = useUIStore((state) => state.isCreateBoardModalOpen)
  const closeCreateBoardModal = useUIStore(
    (state) => state.closeCreateBoardModal
  )

  const saveOnLocalStorage = () => {
    localStorage.setItem(
      'createBoardData',
      JSON.stringify({ selectedComponents, description, name })
    )
  }
  const onSubmit = async () => {
    setShowErrors(true)
    if (!isFormValid) {
      return
    }
    if (!isLogin) {
      saveOnLocalStorage()
      closeCreateBoardModal()
      setIsAuthModalOpen(true)
      toast({
        type: 'warning',
        title: 'Debes iniciar sesión para crear un tablero',
      })
      return
    }
    setIsLoading(true)

    const response = await postDiscussionBoard({
      name,
      description,
      token: authUser?.token || '',
      adminId: profile?.id ?? '',
    })
    if (response.error || response.isSuccess === false) {
      setIsLoading(false)
      toast({ type: 'error', title: 'Error al crear el tablero' })
      return
    }

    const boardId = response.data?.id

    const addComponentPromises = selectedComponents.map((item) =>
      addComponentToDiscussionBoard({
        boardId,
        componentId: item.id,
        quantity: item.quantity,
        token: authUser?.token || '',
        request: null,
      })
    )

    const results = await Promise.allSettled(addComponentPromises)
    const successful = results.filter(
      (result) => result.status === 'fulfilled'
    ).length
    const failed = results.filter(
      (result) => result.status === 'rejected'
    ).length
    if (failed > 0) {
      const errors = results
        .filter((result) => result.status === 'rejected')
        .map((result, index) => {
          const rejectedResult = result as PromiseRejectedResult
          return `Componente ${index + 1}: ${rejectedResult.reason}`
        })

      console.warn(`${failed} componentes fallaron al agregarse:`, errors)

      if (successful === 0) {
        toast({
          type: 'error',
          title: 'Error al agregar componentes al tablero',
        })
      } else {
        toast({
          type: 'warning',
          title: `Tablero creado, pero ${failed} componente(s) no se pudieron agregar`,
        })
      }
    }
    setIsLoading(false)
    toast({ type: 'success', title: 'Tablero creado con éxito' })
    window.open(
      `${window.location.origin}/tableros-de-discusion/${boardId}`,
      '_blank'
    )
    closeCreateBoardModal()
  }
  const onClickAddComponent = () => {
    closeCreateBoardModal()
    setStartAddBoardAnimation(true)
    setTimeout(() => {
      setStartAddBoardAnimation(false)
    }, 1500)
  }
  useEffect(() => {
    if (parsedBoardData) {
      setSelectedComponents(parsedBoardData.selectedComponents)
      localStorage.removeItem('createBoardData')
    }
  }, [parsedBoardData])

  return {
    closeCreateBoardModal,
    onChangeValue,
    onInputTextChange,
    onSubmit,
    onClickAddComponent,
    description,
    formValidation,
    isFormValid,
    isLoading,
    isMD,
    isOpen,
    name,
    selectedComponents,
    showErrors,
  }
}
