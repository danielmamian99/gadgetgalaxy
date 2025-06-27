'use client'
import React, { useState } from 'react'
import Modal from '../ui/modal'
import { LoginBody } from './LoginBody'
import { RegisterBody } from './register/RegisterBody'
import { useAuthModal } from '@/hooks/useAuthModal'
import { CloseButton } from '../ui/button/CloseButton'
import { composeClasses } from '@/app/utils'
import { AnimatePresence, motion } from 'framer-motion'

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
        className={composeClasses('flex flex-col w-full transition-all')}
      >
        <AnimatePresence mode='wait' initial={false}>
          {isLogin ? (
            <motion.div
              key='login'
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 800 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='overflow-hidden'
            >
              <LoginBody
                closeAuthModal={closeAuthModal}
                onGoToRegister={() => {
                  setStep('register')
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key='register'
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 800 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='overflow-hidden'
            >
              <RegisterBody onGoToLogin={onGoToLogin} />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
