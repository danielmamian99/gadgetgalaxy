'use client'
import React, { useState } from 'react'
import Modal from '../ui/modal'
import { LoginBody } from './LoginBody'
import { RegisterBody } from './register/RegisterBody'
import { useAuthModal } from '@/hooks/useAuthModal'
import { CloseButton } from '../ui/button/CloseButton'
import { composeClasses } from '@/app/utils'

type TSteps = 'login' | 'register'

export const AuthModal = () => {
  const { closeAuthModal, isAuthModalOpen } = useAuthModal()
  const [step, setStep] = useState<TSteps>('login')
  const isLogin = step === 'login'
  const onGoToLogin = () => {
    setStep('login')
  }
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
      <Modal.Body
        className={composeClasses(
          'flex flex-col w-full transition-all',
          isLogin ? 'h-[426px]' : 'h-[598px]'
        )}
      >
        {isLogin ? (
          <LoginBody
            onGoToRegister={() => {
              setStep('register')
            }}
          />
        ) : (
          <RegisterBody onGoToLogin={onGoToLogin} />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
