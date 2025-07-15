'use client'
import React from 'react'
import { Button } from '@/components/ui/button/Button'
import { composeClasses } from '@/app/utils'

interface Component {
  id: string
  name: string
  price: number
  stock: number
}

interface Props {
  component: Component
}

export const ComponentCard: React.FC<Props> = ({ component }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleViewComponent = () => {
    // Navegar al componente en la tienda
    window.open(`/?component=${component.id}`, '_blank')
  }

  return (
    <div className='bg-surface-gray-10 border border-surface-strokes rounded-xl p-4 hover:shadow-md transition-all hover:border-blue/30'>
      <div className='flex justify-between items-start mb-3'>
        <h4 className='font-semibold text-primary text-sm leading-tight flex-1 mr-3'>
          {component.name}
        </h4>
        <span
          className={composeClasses(
            'text-xs px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap',
            component.stock > 0
              ? 'bg-notif-green-01 text-notif-green'
              : 'bg-red-50 text-notif-red'
          )}
        >
          {component.stock > 0 ? `Stock: ${component.stock}` : 'Sin stock'}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='font-bold text-primary text-lg'>
          {formatPrice(component.price)}
        </span>
        <Button
          size='sm'
          variant='secondary'
          onClick={handleViewComponent}
          className='text-xs font-medium'
        >
          Ver componente
        </Button>
      </div>
    </div>
  )
}
