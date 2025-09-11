import React from 'react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button/Button'
import { GoogleIcon } from '@/components/ui/components'

interface IProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  onReject: () => void
  isLoading: boolean
}

export const AcceptRequestModal = ({
  isOpen,
  onClose,
  onAccept,
  onReject,
  isLoading,
}: IProps) => (
  <Modal enableBgBlur onClose={onClose} isOpen={isOpen}>
    <Modal.Header className='w-full flex justify-between items-center border-b border-surface strokes py-1 px-4'>
      <p className='text-lg font-semibold'>¿Aceptar solicitud?</p>
      <button
        className='rounded-xl w-8 h-8 bg-surface-strokes flex items-center justify-center'
        onClick={onClose}
      >
        <GoogleIcon name='close' className='text-primary' />
      </button>
    </Modal.Header>
    <Modal.Body>
      <p className='text-sm'>
        ¿Quieres aceptar o rechazar esta solicitud? Esta acción no se puede
        deshacer.
      </p>
    </Modal.Body>
    <Modal.Footer className='flex w-full gap-5 px-4 py-2'>
      <Button
        variant='terciary'
        size='sm'
        onClick={onClose}
        isDisabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        variant='cancel'
        size='sm'
        onClick={onReject}
        isDisabled={isLoading}
      >
        {isLoading ? 'Rechazando...' : 'Rechazar'}
      </Button>
      <Button
        variant='primary'
        size='sm'
        onClick={onAccept}
        isDisabled={isLoading}
      >
        {isLoading ? 'Aceptando...' : 'Aceptar'}
      </Button>
    </Modal.Footer>
  </Modal>
)
