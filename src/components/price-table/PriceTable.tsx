import { parsePriceBreaks } from '@/helpers/strings'
import { IPriceBreak } from '@/interfaces/table.interface'
import React from 'react'

export const PriceTable = ({ priceBreaks }: { priceBreaks: IPriceBreak[] }) => {
  return (
    <div>
      {priceBreaks.length > 0 ? (
        <table className='w-full text-xs mt-2 border'>
          <thead>
            <tr>
              <th className='border px-2 py-1'>Cantidad</th>
              <th className='border px-2 py-1'>Precio</th>
              <th className='border px-2 py-1'>Moneda</th>
            </tr>
          </thead>
          <tbody>
            {priceBreaks.map((row, idx) => (
              <tr key={idx}>
                <td className='border px-2 py-1 text-center'>{row.qty}</td>
                <td className='border px-2 py-1 text-center'>{row.price}</td>
                <td className='border px-2 py-1 text-center'>{row.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className='text-xs text-gray-400'>No hay tabla de precios</span>
      )}
    </div>
  )
}
