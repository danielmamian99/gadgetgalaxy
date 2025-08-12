'use client'
import React from 'react'
import { ConnectionStatus as ConnectionStatusType } from '../hooks/useChatIA'
import { GoogleIcon } from '@/components/ui/components'
import { Button } from '@/components/ui/button/Button'
import { Spinner } from '@/components/ui/spinner/Spinner'
import { composeClasses } from '@/app/utils'

interface Props {
  status: ConnectionStatusType
  onRetry?: () => void
}

export const ConnectionStatus: React.FC<Props> = ({ status, onRetry }) => {
  if (status.connected && !status.reconnecting && !status.error) {
    return (
      <div className='flex items-center gap-2 px-4 py-2 bg-notif-green-01 border-l-4 border-notif-green'>
        <div className='w-2 h-2 bg-notif-green rounded-full animate-pulse'></div>
        <span className='text-sm text-notif-green font-medium'>
          Conectado al asistente IA
        </span>
      </div>
    )
  }

  if (status.reconnecting) {
    return (
      <div className='flex items-center gap-2 px-4 py-2 bg-yellow-50 border-l-4 border-yellow-400'>
        <Spinner className='w-4 h-4' customBorderColor='border-yellow-400' />
        <span className='text-sm text-yellow-700 font-medium'>
          Reconectando...
        </span>
      </div>
    )
  }

  if (status.error) {
    return (
      <div className='flex items-center justify-between px-4 py-2 bg-red-50 border-l-4 border-notif-red'>
        <div className='flex items-center gap-2'>
          <GoogleIcon name='warning' className='text-notif-red text-lg' />
          <div className='flex flex-col'>
            <span className='text-sm text-notif-red font-medium'>
              Error de conexión
            </span>
            <span className='text-xs text-red-600'>{status.error}</span>
          </div>
        </div>
        {onRetry && (
          <Button
            size='sm'
            variant='secondary'
            onClick={onRetry}
            className='ml-2'
          >
            <GoogleIcon name='refresh' className='text-sm mr-1' />
            Reintentar
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2 px-4 py-2 bg-gray-50 border-l-4 border-gray-300'>
      <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
      <span className='text-sm text-gray-600 font-medium'>Desconectado</span>
    </div>
  )
}
