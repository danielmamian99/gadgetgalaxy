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
  const { fetchComments } = useComments({
    dashboardId,
  })
  const { authUser } = useSession()
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    const response = await postComment({
      dashboardId,
      comment: description,
      token: authUser?.token ?? '',
    })
    setIsLoading(false)
    if (response.error) {
      setError('Error al enviar el comentario')
    }
    if (response.isSuccess) {
      // await fetchComments()
      setDescription('')
      setError('')
    }
  }
  return (
    <div className='relative'>
      {isLoading && (
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
          isDisabled={isLoading || !description}
          onClick={onComment}
          size='sm'
        >
          {isLoading ? <p>Enviando...</p> : <p>Comentar</p>}
        </Button>
      </div>
    </div>
  )
}
