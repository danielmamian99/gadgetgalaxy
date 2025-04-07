'use client'
import React from 'react'

import { useUIStore } from '@/store'
import Modal from '../modal'
import { CloseButton } from '../button/CloseButton'
import { Button } from '../button/Button'

export const CreateBoardModal = () => {
  const isOpen = useUIStore((state) => state.isCreateBoardModalOpen)
  const closeModal = useUIStore((state) => state.closeCreateBoardModal)

  return (
    <Modal
      closeOnEscape
      closeOnOutsideClick
      enableBgBlur
      onClose={closeModal}
      className='w-[400px] h-full max-h-screen fixed right-0 top-0'
      isOpen={isOpen}
    >
      <Modal.Header className='w-full flex justify-between items-center py-4 px-6 border-b border-gray-200'>
        <h2 className='text-lg font-semibold'>Crear Tablero</h2>
        <CloseButton onClick={closeModal} />
      </Modal.Header>
      <Modal.Body className='p-6'>
        <form className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Nombre del Tablero
            </label>
            <input
              type='text'
              className='w-full border border-gray-300 rounded-md p-2'
              placeholder='Nombre del tablero'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Descripción
            </label>
            <textarea
              className='w-full border border-gray-300 rounded-md p-2'
              placeholder='Descripción del tablero'
            />
          </div>
          <Button size='sm' className='font-semibold hidden md:flex h-[42px]'>
            Crear
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateBoardModal
