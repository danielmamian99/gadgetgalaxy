import React from 'react'
import { ProductGrid } from '../products/product-grid/ProductGrid'
import { AnimatePresence, motion } from 'framer-motion'

interface IUserOrdersSummaryProps {
  usersConsolidated: any[]
  showConsolidated: boolean
  setShowConsolidated: (v: boolean) => void
}

export const UserOrdersSummary = ({
  usersConsolidated,
  showConsolidated,
  setShowConsolidated,
}: IUserOrdersSummaryProps) => (
  <div className='my-4'>
    <button
      className='px-4 py-2 bg-primary text-white rounded-lg mb-2'
      onClick={() => setShowConsolidated(!showConsolidated)}
    >
      {showConsolidated
        ? 'Ocultar resumen de pedidos por usuario'
        : 'Ver resumen de pedidos por usuario'}
    </button>
    <AnimatePresence initial={false}>
      {showConsolidated && (
        <motion.div
          key='user-orders-summary'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
          className='border rounded-lg p-4 bg-surface-gray-10'
        >
          {usersConsolidated.length === 0 && <p>No hay pedidos de usuarios.</p>}
          {usersConsolidated.map((user) => (
            <div key={user.user_id} className='mb-6'>
              <h3 className='font-semibold text-lg mb-2'>{user.username}</h3>
              <div style={{ zoom: 0.8 }}>
                <ProductGrid products={user.components} isPresentation />
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)
