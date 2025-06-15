import { IComment } from '@/interfaces/table.interface'
import { useEffect, useState } from 'react'
import toast from '../ui/toast'
import { getComments } from '@/app/services/boards.services'
import { useTableroStore } from '@/store/tablero/tablero'

interface IProps {
  comments?: IComment[]
  dashboardId: string
}
export const useComments = ({
  comments: commentsProps,
  dashboardId,
}: IProps) => {
  const {
    setComments,
    comments,
    isLoadingAdd,
    isLoadingDelete,
    setIsLoadingAdd,
    setIsLoadingComments,
    isLoadingComments,
    setIsLoadingDelete,
  } = useTableroStore((state) => state)
  const fetchComments = async () => {
    try {
      setIsLoadingComments(true)
      const response = await getComments(dashboardId)
      if (response.isSuccess) {
        setComments(response.data.results)
      } else {
        toast({
          title: 'Error al cargar los comentarios',
          type: 'error',
        })
      }
    } catch (error) {
      toast({
        title: 'Error al cargar los comentarios',
        type: 'error',
      })
    } finally {
      setIsLoadingComments(false)
      setIsLoadingAdd(false)
      setIsLoadingDelete(false)
    }
  }

  useEffect(() => {
    if (commentsProps) {
      setComments(commentsProps)
    }
  }, [commentsProps])

  return {
    comments,
    isLoadingAdd,
    isLoadingComments,
    isLoadingDelete,
    fetchComments,
    setIsLoadingAdd,
    setIsLoadingComments,
    setIsLoadingDelete,
  }
}
