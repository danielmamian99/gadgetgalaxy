import {
  addComponentToDiscussionBoard,
  // postComment,
  postDiscussionBoardRequest,
} from '@/app/services/boards.services'
import { useForm } from '@/hooks/useForm'
import useMatchWindowQuery from '@/hooks/useMatchWindowQuery'
import useSession from '@/hooks/useSession'
import { useUIStore } from '@/store/ui/ui-store'
import { useEffect, useState } from 'react'
import toast from '../ui/toast/toast'
import { useJoinBoardStore } from '@/store/unirse-tablero/unirse-tablero-store'

const boardData = localStorage.getItem('joinBoardDiscussion')
const parsedBoardData = boardData ? JSON.parse(boardData) : null
const INITIAL_FORM = parsedBoardData
  ? { comment: parsedBoardData.comment }
  : { comment: '' }

export const useJoinTableDiscussion = () => {
  const { authUser, isLogin, profile } = useSession()
  const setIsAuthModalOpen = useUIStore((state) => state.setIsAuthModalOpen)
  const setStartAddBoardAnimation = useUIStore(
    (state) => state.setStartAddBoardAnimation
  )
  const { formState, onChangeValue } = useForm(INITIAL_FORM)
  const { isMD } = useMatchWindowQuery()
  const [isLoading, setIsLoading] = useState(false)
  const { comment } = formState
  const {
    selectedComponents,
    setSelectedComponents,
    boardComponents,
    dashBoardId,
  } = useJoinBoardStore()
  const isOpen = useUIStore((state) => state.isJoinBoardModalOpen)
  const setIsJoinBoardModalOpen = useUIStore(
    (state) => state.setIsJoinBoardModalOpen
  )
  const closeJoinBoardModal = () => {
    setIsJoinBoardModalOpen(false)
  }
  const saveOnLocalStorage = () => {
    localStorage.setItem(
      'joinBoardDiscussion',
      JSON.stringify({ selectedComponents, comment })
    )
  }
  const onSubmit = async () => {
    if (!isLogin) {
      saveOnLocalStorage()
      closeJoinBoardModal()
      setIsAuthModalOpen(true)
      toast({
        type: 'warning',
        title: 'Debes iniciar sesión para crear un tablero',
      })
      return
    }
    setIsLoading(true)

    const response = await postDiscussionBoardRequest({
      comment,
      token: authUser?.token || '',
      dashboardId: dashBoardId ?? '',
      components: selectedComponents,
      userId: profile?.id ?? '',
      userName: profile?.username ?? '',
    })
    if (response.error || response.isSuccess === false) {
      setIsLoading(false)
      toast({ type: 'error', title: 'Error al crear la solicitud' })
      return
    }

    const requestId = response.data?.id

    const addComponentPromises = selectedComponents.map((item) =>
      addComponentToDiscussionBoard({
        boardId: null,
        componentId: item.id,
        quantity: item.quantity,
        token: authUser?.token || '',
        request: requestId,
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
          title: 'Error al agregar componentes a la solicitud',
        })
      } else {
        toast({
          type: 'warning',
          title: `Solicitud creada, pero ${failed} componente(s) no se pudieron asociar`,
        })
      }
    }
    setIsLoading(false)
    toast({ type: 'success', title: 'Solicitud enviada con éxito' })
    window.open(
      `${window.location.origin}/tableros-de-discusion/${dashBoardId}`,
      '_blank'
    )
    closeJoinBoardModal()
  }
  const onClickAddComponent = () => {
    closeJoinBoardModal()
    setStartAddBoardAnimation(true)
    setTimeout(() => {
      setStartAddBoardAnimation(false)
    }, 1500)
  }
  useEffect(() => {
    if (parsedBoardData) {
      setSelectedComponents(parsedBoardData.selectedComponents)
      localStorage.removeItem('joinBoardDiscussion')
    }
  }, [parsedBoardData])

  return {
    closeJoinBoardModal,
    onChangeValue,
    onSubmit,
    onClickAddComponent,
    comment,
    isLoading,
    isMD,
    isOpen,
    selectedComponents,
    boardComponents,
  }
}
