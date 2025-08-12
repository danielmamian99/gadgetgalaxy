import React, { useState } from 'react'
import Image from 'next/image'
import { ITableItem } from '@/interfaces/table.interface'
import QuantitySelectorV2 from '../ui/quantity-selector/QuantitySelectorV2'
import { composeClasses } from '@/app/utils/classes'
import { GoogleIcon } from '../ui/components'
import { PriceTable } from '../price-table/PriceTable'
import { motion, AnimatePresence } from 'framer-motion'
import { useCalculateDiscounts } from '@/hooks/useCalculateDiscounts'
import { formatCurrency } from '@/helpers/strings'
import { useJoinBoardStore } from '@/store/unirse-tablero/unirse-tablero-store'
interface IProps {
  item: ITableItem
  boardItem?: ITableItem
}
export const JoinTableItem = ({ item, boardItem }: IProps) => {
  const { updateComponentQuantity, removeComponentFromBoard } =
    useJoinBoardStore()
  const [showPriceTable, setShowPriceTable] = useState(false)
  const {
    name,
    imageUrl,
    providerName,
    quantity,
    price,
    id,
    priceBreaks,
    stockNumber,
  } = item

  const onChangeQuantity = (newQuantity: number) => {
    updateComponentQuantity(id, newQuantity)
  }
  const onRemove = () => {
    removeComponentFromBoard(id)
  }
  const totalQuantityForDiscount = (boardItem?.quantity || 0) + quantity
  const availableStock = stockNumber

  const { hasDiscount, currency, currentUnitPrice, originalUnitPrice } =
    useCalculateDiscounts({
      price,
      priceBreaks,
      quantity: totalQuantityForDiscount,
    })

  return (
    <div className='flex flex-col'>
      <div className='flex items-center w-full gap-4 border border-surface-strokes rounded-xl pl-2 '>
        <Image
          src={imageUrl}
          alt={`componente ${name}`}
          className='object-none rounded-xl max-h-[50px] max-w-[50px]'
          width={50}
          height={50}
        />
        <div className='flex flex-1 gap-5 items-center py-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>{name}</p>
            <p className='text-xs'>Proveedor: {providerName}</p>
          </div>
          <div className='flex gap-1'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs'>
                Precio:
                <span className='font-semibold ml-1'>
                  {formatCurrency(currentUnitPrice, currency)}
                </span>
              </p>
              <QuantitySelectorV2
                value={quantity}
                className='text-xs w-auto items-center [&>input]:h-[30px] [&>input]:w-[30px] [&>input]:rounded-[8px] [&>input]:!bg-white [&>input]:border [&>input]:border-surface-gray-20 z-1'
                classNameRightButton='hover:border-primary active:bg-primary active:text-white !h-[30px] !w-[30px]'
                classNameLeftButton={composeClasses(
                  '!h-[30px] !w-[30px]',
                  quantity > 1 &&
                    'hover:border-primary active:bg-primary active:text-white'
                )}
                isEditable={true}
                onChangeInputValue={onChangeQuantity}
                onChange={onChangeQuantity}
                minQuantity={1}
                maxQuantity={availableStock}
              />
            </div>
            <div className='flex flex-col gap-1 h-full'>
              {hasDiscount && (
                <>
                  <span className='ml-2 text-gray-400 line-through text-xs'>
                    {formatCurrency(originalUnitPrice, currency)}
                  </span>
                  <span className='ml-2 text-green-600 text-xs font-semibold'>
                    -
                    {formatCurrency(
                      originalUnitPrice - currentUnitPrice,
                      currency
                    )}
                  </span>
                </>
              )}
              <p
                className={composeClasses(
                  'text-xs flex-1 whitespace-nowrap',
                  quantity >= availableStock && 'text-red-500'
                )}
              >
                Disponible: {availableStock}
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center h-full px-6'>
          <button
            onClick={onRemove}
            className='bg-notif-red rounded-xl w-6 h-6 flex justify-center items-center'
          >
            <GoogleIcon name='delete' className='text-white text-xl' />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <button
          className='flex items-center justify-between w-full'
          onClick={() => setShowPriceTable(!showPriceTable)}
        >
          <p className='text-xs'>Tabla de precios y descuentos</p>
          {showPriceTable ? (
            <GoogleIcon
              name='keyboard_arrow_up'
              className='text-primary text-xl'
            />
          ) : (
            <GoogleIcon
              name='keyboard_arrow_down'
              className='text-primary text-xl'
            />
          )}
        </button>
        <AnimatePresence initial={false}>
          {showPriceTable && (
            <motion.div
              key='price-table'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <PriceTable priceBreaks={priceBreaks} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
