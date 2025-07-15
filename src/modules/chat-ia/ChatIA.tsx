'use client'
import React, { useEffect, useRef } from 'react'
import { useChatIA } from './hooks/useChatIA'
import { ChatMessage, ChatInput, ConnectionStatus } from './components'
import { GoogleIcon } from '@/components/ui/components'
import { Button } from '@/components/ui/button/Button'
import { composeClasses } from '@/app/utils'
import useSession from '@/hooks/useSession'

export const ChatIA = () => {
  const { isLogin } = useSession()
  const {
    messages,
    connectionStatus,
    isTyping,
    sendMessage,
    clearChat,
    retry,
  } = useChatIA()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const welcomeMessage = () => {
    if (messages.length === 0) {
      return (
        <div className='flex-1 flex items-center justify-center p-6'>
          <div className='text-center max-w-2xl'>
            <div className='w-20 h-20 bg-blue rounded-full flex items-center justify-center mx-auto mb-6'>
              <GoogleIcon name='smart_toy' className='text-white text-3xl' />
            </div>
            <h2 className='text-3xl font-bold text-primary mb-4'>
              Asistente IA de Electrónica
            </h2>
            <p className='text-secondary text-lg leading-relaxed mb-8'>
              Pregúntame sobre componentes electrónicos, circuitos, proyectos de
              Arduino y más. Te ayudo a encontrar los componentes que necesitas
              en nuestra tienda.
            </p>
            {!isLogin && (
              <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6'>
                <p className='text-sm text-yellow-800 flex items-center justify-center gap-2'>
                  <GoogleIcon name='info' className='text-lg' />
                  Inicia sesión para una experiencia personalizada y
                  recomendaciones específicas.
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className='h-[calc(100vh-53px)] flex flex-col bg-surface-gray-10'>
      {/* Header */}
      <div className='border-b border-surface-strokes bg-white px-6 py-4 shadow-sm'>
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-blue rounded-full flex items-center justify-center'>
              <GoogleIcon name='smart_toy' className='text-white text-xl' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-primary'>
                Chat IA - Electrónica
              </h1>
              <p className='text-sm text-secondary'>
                Tu asistente para proyectos electrónicos
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            {messages.length > 0 && (
              <Button
                variant='secondary'
                size='sm'
                onClick={clearChat}
                className='flex items-center gap-2'
              >
                <GoogleIcon name='refresh' className='text-sm' />
                Limpiar chat
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <ConnectionStatus status={connectionStatus} onRetry={retry} />

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto'>
        {welcomeMessage()}

        {messages.length > 0 && (
          <div className='max-w-4xl mx-auto px-6 py-6'>
            <div className='space-y-6'>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className='flex justify-start'>
                  <div className='flex max-w-[80%] md:max-w-[70%]'>
                    <div className='flex-shrink-0 w-10 h-10 rounded-full bg-surface-dark mr-4 flex items-center justify-center text-white text-sm font-medium'>
                      IA
                    </div>
                    <div className='bg-white rounded-2xl rounded-bl-md px-6 py-4 shadow-sm border border-surface-strokes'>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          <div className='w-2 h-2 bg-blue rounded-full animate-bounce'></div>
                          <div
                            className='w-2 h-2 bg-blue rounded-full animate-bounce'
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className='w-2 h-2 bg-blue rounded-full animate-bounce'
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        <span className='text-sm text-secondary ml-2'>
                          Escribiendo...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className='flex-shrink-0 bg-white'>
        <ChatInput
          onSendMessage={sendMessage}
          disabled={
            !connectionStatus.connected || connectionStatus.reconnecting
          }
        />
      </div>
    </div>
  )
}
