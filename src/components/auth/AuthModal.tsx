'use client'
import React, { useState } from 'react'
import Modal from '../ui/modal'
import { GoogleIcon } from '../ui/components'
import { LoginBody } from './LoginBody'
import { RegisterBody } from './RegisterBody'
import { useAuthModal } from '@/hooks/useAuthModal'
import { CloseButton } from '../ui/button/CloseButton'

export const AuthModal = () => {
  const { closeAuthModal, isAuthModalOpen } = useAuthModal()
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Modal
      closeOnEscape
      closeOnOutsideClick
      enableBgBlur
      onClose={closeAuthModal}
      className='w-[340px]'
      isOpen={isAuthModalOpen}
    >
      <Modal.Header className='w-full flex justify-end items-center py-2 px-6 border-b border-surface-strokes'>
        <CloseButton onClick={closeAuthModal} />
      </Modal.Header>
      <Modal.Body className='flex flex-col h-[526px] '>
        {isLogin ? (
          <LoginBody
            onGoToRegister={() => {
              setIsLogin(false)
            }}
          />
        ) : (
          <RegisterBody
            onGoToLogin={() => {
              setIsLogin(true)
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
