import React from 'react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button/Button'
import { GoogleIcon } from '@/components/ui/components'

interface IProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  isLoading: boolean
  requestType: 'accept' | 'reject'
}

export const ConfirmRequestModal = ({
  title,
  description,
  isOpen,
  onClose,
  onAccept,
  isLoading,
  requestType,
}: IProps) => (
  <Modal enableBgBlur onClose={onClose} isOpen={isOpen}>
    <Modal.Header className='w-full flex justify-between items-center border-b border-surface strokes py-2 px-4'>
      <p className='text-lg font-semibold'>{title}</p>
      <button
        className='rounded-xl w-8 h-8 bg-surface-strokes flex items-center justify-center'
        onClick={onClose}
      >
        <GoogleIcon name='close' className='text-primary' />
      </button>
    </Modal.Header>
    <Modal.Body>
      <p className='text-sm'>{description}</p>
    </Modal.Body>
    <Modal.Footer className='flex w-full gap-5 px-4 py-2 border-t border-surface-strokes'>
      <Button
        variant='terciary'
        size='sm'
        onClick={onClose}
        isDisabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        variant={requestType === 'accept' ? 'primary' : 'cancel'}
        size='sm'
        onClick={onAccept}
        isDisabled={isLoading}
      >
        {isLoading
          ? 'Aceptando...'
          : requestType === 'accept'
            ? 'Aceptar'
            : 'Rechazar'}
        {requestType === 'accept' ? (
          <GoogleIcon name='check' />
        ) : (
          <GoogleIcon name='delete' />
        )}
      </Button>
    </Modal.Footer>
  </Modal>
)
