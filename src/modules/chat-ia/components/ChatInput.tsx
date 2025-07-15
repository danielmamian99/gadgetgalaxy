'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button/Button'
import { GoogleIcon, TextArea } from '@/components/ui/components'
import { composeClasses } from '@/app/utils'

interface Props {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export const ChatInput: React.FC<Props> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Escribe tu pregunta sobre electrónica...',
}) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className='border-t border-surface-strokes bg-white p-6'>
      <form
        onSubmit={handleSubmit}
        className='flex gap-3 items-end max-w-4xl mx-auto'
      >
        <div className='flex-1 relative'>
          {/* <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={composeClasses(
              'w-full resize-none rounded-lg border border-surface-strokes px-4 py-3',
              'focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20',
              'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
              'text-primary placeholder-terciary text-base leading-6',
              'min-h-[48px]'
            )}
            style={{ maxHeight: '120px' }}
          /> */}
          <TextArea
            value={message}
            setValue={setMessage}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
          />

          {/* Contador de caracteres */}
          {message.length > 800 && (
            <div
              className={composeClasses(
                'absolute bottom-2 right-2 text-xs',
                message.length > 1000 ? 'text-notif-red' : 'text-secondary'
              )}
            >
              {message.length}/1000
            </div>
          )}
        </div>

        <Button
          wFull={false}
          type='submit'
          isDisabled={disabled || !message.trim() || message.length > 1000}
          className={composeClasses(
            'rounded-lg px-4 py-3 min-h-[48px] min-w-[48px]',
            'flex items-center justify-center flex-shrink-0'
          )}
        >
          <GoogleIcon name='send' className='text-lg' />
        </Button>
      </form>

      {/* Sugerencias de ejemplo */}
      {message.length === 0 && (
        <div className='mt-4 flex flex-wrap gap-2 max-w-4xl mx-auto'>
          {[
            '¿Qué componentes necesito para un LED intermitente?',
            'Ayúdame a encontrar resistencias de 220Ω',
            '¿Cómo puedo hacer un circuito con Arduino?',
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => !disabled && onSendMessage(suggestion)}
              disabled={disabled}
              className={composeClasses(
                'text-sm px-4 py-2 rounded-full border border-surface-strokes',
                'hover:bg-surface-gray-10 transition-all hover:border-blue/30',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'text-secondary hover:text-primary'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
