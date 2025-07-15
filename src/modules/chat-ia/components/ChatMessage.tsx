'use client'
import React from 'react'
import { ChatMessage as ChatMessageType } from '../hooks/useChatIA'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { ComponentCard } from './ComponentCard'
import { composeClasses } from '@/app/utils'

interface Props {
  message: ChatMessageType
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.type === 'user'
  const isLoading = message.isLoading

  return (
    <div
      className={composeClasses(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={composeClasses(
          'flex max-w-[85%] md:max-w-[75%]',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {/* Avatar */}
        <div
          className={composeClasses(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium',
            isUser ? 'bg-blue ml-4' : 'bg-surface-dark mr-4'
          )}
        >
          {isUser ? 'TU' : 'IA'}
        </div>

        {/* Mensaje */}
        <div
          className={composeClasses(
            'rounded-2xl px-6 py-4 break-words shadow-sm border',
            isUser
              ? 'bg-blue text-white rounded-br-md border-blue'
              : 'bg-white text-primary rounded-bl-md border-surface-strokes'
          )}
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <Spinner className='w-4 h-4' color='terciary' />
              <span className='text-secondary text-sm'>Pensando...</span>
            </div>
          ) : (
            <>
              <p className='whitespace-pre-wrap leading-relaxed'>
                {message.content}
              </p>

              {/* Componentes recomendados */}
              {message.components && message.components.length > 0 && (
                <div className='mt-4 space-y-3'>
                  <p className='text-sm font-semibold text-secondary border-t border-gray-200 pt-3'>
                    Componentes recomendados:
                  </p>
                  <div className='grid gap-3'>
                    {message.components.map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
