'use client'
import React, { useState } from 'react'
import { TextArea } from '../ui/components'
import { Button } from '../ui/button/Button'
import { useAuthModal } from '@/hooks/useAuthModal'

export const CommentTextArea = () => {
  const [description, setDescription] = useState('')
  const { openAuthModal } = useAuthModal()
  const onCancel = () => {
    setDescription('')
  }
  return (
    <div className='relative'>
      <TextArea
        setValue={(value) => setDescription(value)}
        className='w-full h-[86px]'
        containerClassName='w-full'
        value={description ? description : ''}
        placeholder='Añade un comentario'
        maxCharacters={800}
      />
      <div className='md:absolute mt-2 md:mt-0 flex gap-1 right-0 -bottom-6'>
        <Button
          onClick={onCancel}
          variant='secondary'
          size='sm'
          text='cancel'
        />
        <Button onClick={openAuthModal} size='sm' text='comment' />
      </div>
    </div>
  )
}
