import React, { useState } from 'react'
import Image from 'next/image'
import { ITableItem } from '@/interfaces/table.interface'
import QuantitySelectorV2 from '../ui/quantity-selector/QuantitySelectorV2'
import { composeClasses } from '@/app/utils/classes'
import { useJoinBoardStore } from '@/store/unirse-tablero/unirse-tablero-store'
import { GoogleIcon } from '../ui/components'
import { stringNumberFormatToSimpleNumber } from '@/app/utils/formatter-text'
import { PriceTable } from '../price-table/PriceTable'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

interface IProps {
  item: ITableItem
  boardItem?: ITableItem
}
export const JoinTableItemMobile = ({ item, boardItem }: IProps) => {
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

  // Calcular descuentos considerando la cantidad del board + cantidad del usuario
  const totalQuantityForDiscount = (boardItem?.quantity || 0) + quantity
  const availableStock = stockNumber - (boardItem?.quantity || 0)

  // Calcula el mejor precio unitario según priceBreaks y cantidad total
  const getCurrentUnitPrice = () => {
    const safePrice = stringNumberFormatToSimpleNumber(price)
    if (!priceBreaks || priceBreaks.length === 0) return safePrice
    // Ordenar los priceBreaks por qty ascendente
    const sorted = [...priceBreaks].sort(
      (a, b) => Number(a.qty) - Number(b.qty)
    )
    let best = safePrice
    for (const pb of sorted) {
      const pbPrice = stringNumberFormatToSimpleNumber(pb.price)
      if (totalQuantityForDiscount >= Number(pb.qty)) {
        best = pbPrice
      }
    }
    return best
  }

  const getCurrency = () => {
    if (!priceBreaks || priceBreaks.length === 0) return 'COP'
    const sorted = [...priceBreaks].sort(
      (a, b) => Number(a.qty) - Number(b.qty)
    )
    let currency = 'COP'
    for (const pb of sorted) {
      if (totalQuantityForDiscount >= Number(pb.qty)) {
        currency = pb.currency
      }
    }
    return currency
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency || 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const currentUnitPrice = getCurrentUnitPrice()
  const originalUnitPrice = stringNumberFormatToSimpleNumber(price)
  const currency = getCurrency()
  const hasDiscount = currentUnitPrice < originalUnitPrice

  return (
    <div className='flex flex-col'>
      <div className='flex py-1 px-2 items-center w-full gap-2 border border-surface-strokes rounded-xl'>
        <Image
          src={imageUrl}
          alt={`componente ${name}`}
          className='object-none rounded-xl max-h-[50px] max-w-[50px]'
          width={50}
          height={50}
        />
        <div className='flex gap-1 flex-col pr-2 w-full'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center  gap-1 pt-1'>
              <p className='text-xs'>
                {name}, Proveedor: {providerName}
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between gap-2 pt-1 w-full'>
            <QuantitySelectorV2
              value={quantity}
              className='text-xs w-auto items-center [&>input]:h-[28px] [&>input]:w-[28px] [&>input]:rounded-[8px] [&>input]:!bg-white [&>input]:border [&>input]:border-surface-gray-20 z-1'
              classNameRightButton='hover:border-primary active:bg-primary active:text-white !h-[28px] !w-[28px]'
              classNameLeftButton={composeClasses(
                '!h-[28px] !w-[28px]',
                quantity > 1 &&
                  'hover:border-primary active:bg-primary active:text-white'
              )}
              isEditable={true}
              onChangeInputValue={onChangeQuantity}
              onChange={onChangeQuantity}
              minQuantity={1}
              maxQuantity={availableStock}
            />
            <div className='flex flex-col h-full'>
              <p
                className={composeClasses(
                  'text-xs flex-1 whitespace-nowrap',
                  quantity >= availableStock && 'text-red-500'
                )}
              >
                Stock: {availableStock}
              </p>
              {hasDiscount && (
                <span className='text-green-600 text-xs font-semibold'>
                  -
                  {formatCurrency(
                    originalUnitPrice - currentUnitPrice,
                    currency
                  )}
                </span>
              )}
            </div>
            <button
              onClick={onRemove}
              className='bg-notif-red rounded-xl w-6 h-6 flex justify-center items-center'
            >
              <GoogleIcon name='delete' className='text-white text-xl' />
            </button>
          </div>
          <p className='text-xs'>
            Precio:
            <span className='font-semibold ml-1'>
              {formatCurrency(currentUnitPrice, currency)}
            </span>
            {hasDiscount && (
              <span className='ml-2 text-gray-400 line-through'>
                {formatCurrency(originalUnitPrice, currency)}
              </span>
            )}
          </p>
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
