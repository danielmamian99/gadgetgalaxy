'use client'
import React, { useState } from 'react'
import { GoogleIcon, TextArea } from '../ui/components'
import { Button } from '../ui/button/Button'
import { useAuthModal } from '@/hooks/useAuthModal'
import useSession from '@/hooks/useSession'
import { postComment } from '@/app/services/boards.services'
import { useComments } from './useComments'
import { Portal } from '../ui/portal'

export const CommentTextArea = ({ dashboardId }: { dashboardId: string }) => {
  const {
    fetchComments,
    setIsLoadingAdd,
    isLoadingAdd,
    isLoadingComments,
    isLoadingDelete,
  } = useComments({
    dashboardId,
  })
  const { authUser } = useSession()
  const [error, setError] = useState('')
  const { isLogin } = useSession()
  const [description, setDescription] = useState('')
  const { openAuthModal } = useAuthModal()
  const onCancel = () => {
    setDescription('')
  }
  const onComment = async () => {
    if (!isLogin) {
      openAuthModal()
      return
    }
    setIsLoadingAdd(true)
    const response = await postComment({
      dashboardId,
      comment: description,
      token: authUser?.token ?? '',
    })
    if (response.error) {
      setError('Error al enviar el comentario')
    }
    if (response.isSuccess) {
      await fetchComments()
      setDescription('')
      setError('')
    }
  }
  return (
    <div className='relative'>
      {isLoadingComments && (
        <div className='fixed bottom-5 right-5 flex border rounded-lg border-surface-strokes bg-white p-2'>
          <p>Actualizando comentarios...</p>
          <GoogleIcon
            className='text-button-primary animate-spin'
            name='progress_activity'
          />
        </div>
      )}

      <TextArea
        error={error}
        setValue={(value) => {
          if (error) {
            setError('')
          }
          setDescription(value)
        }}
        className='w-full h-[86px]'
        containerClassName='w-full'
        value={description ? description : ''}
        placeholder='Añade un comentario'
        maxCharacters={800}
      />
      <div className='md:absolute mt-2 md:mt-0 flex gap-1 right-0 -bottom-6'>
        <Button onClick={onCancel} variant='secondary' size='sm'>
          Cancelar
        </Button>
        <Button
          isDisabled={isLoadingAdd || !description}
          onClick={onComment}
          size='sm'
          className={isLoadingAdd && isLoadingComments ? '!bg-notif-green' : ''}
        >
          {isLoadingAdd && !isLoadingComments && <p>Enviando...</p>}
          {isLoadingAdd && isLoadingComments && (
            <div className='flex gap-1 items-center text-white'>
              <p>Enviado</p>
              <GoogleIcon name='check' />
            </div>
          )}
          {((!isLoadingAdd && !isLoadingComments) || isLoadingDelete) && (
            <p>Comentar</p>
          )}
        </Button>
      </div>
    </div>
  )
}
