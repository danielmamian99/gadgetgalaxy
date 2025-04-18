'use client'
import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { useUIStore } from '@/store'
import { GoogleIcon } from '@/components/ui/components'
import { Button } from '@/components/ui/button/Button'
import { deleteComment } from '@/app/services/boards.services'
import useSession from '@/hooks/useSession'
import toast from '@/components/ui/toast'

interface IProps {
  commentId: string
  dashboardId: string
  onDelete: () => Promise<void>
}
export const DeleteCommentModal = ({
  commentId,
  dashboardId,
  onDelete,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const isDeleteModalOpen = useUIStore((state) => state.isDeleteModalOpen)
  const setIsDeleteModalOpen = useUIStore((state) => state.setIsDeleteModalOpen)
  const { authUser } = useSession()
  const onClose = () => {
    setIsDeleteModalOpen(false)
  }
  const onDeleteComment = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    setIsLoading(true)
    const response = await deleteComment({
      dashboardId,
      commentId,
      token: authUser?.token ?? '',
    })
    setIsLoading(false)
    if (response.error || !response.isSuccess) {
      toast({
        title: 'Error al eliminar el comentario',
        type: 'error',
      })
      return
    }
    toast({
      title: 'Comentario eliminado',
      type: 'success',
    })
    onDelete()
    setIsDeleteModalOpen(false)
  }
  return (
    <Modal enableBgBlur onClose={onClose} isOpen={isDeleteModalOpen}>
      <Modal.Header className='w-full flex justify-between items-center border-b border-surface strokes py-1 px-4   '>
        <p className='text-lg font-semibold'>¿Estás seguro?</p>
        <button className='rounded-xl w-8 h-8 bg-surface-strokes flex items-center justify-center'>
          <GoogleIcon name='close' className='text-primary' />
        </button>
      </Modal.Header>
      <Modal.Body>
        <p className='text-sm'>
          Al eliminar este comentario se borrará del tablero de discusion. Esta
          acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer className='flex w-full gap-5 px-4 py-2'>
        <Button variant='terciary' size='sm' onClick={onClose}>
          Cancelar
        </Button>
        <Button variant='cancel' size='sm' onClick={onDeleteComment}>
          {isLoading ? 'Eliminando... ' : 'Eliminar'}
          {isLoading ? (
            <GoogleIcon className='animate-spin' name='progress_activity' />
          ) : (
            <GoogleIcon name='delete' />
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
