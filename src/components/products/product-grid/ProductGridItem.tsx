'use client'

import React, { useState } from 'react'
import { IComponent } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { capitalizeWords, composeClasses } from '@/app/utils'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useCreateDiscussionStore } from '@/store/creacion-tablero/creacion-tablero-store'
import { useUIStore } from '@/store/ui/ui-store'
import { PriceTable } from '@/components/price-table/PriceTable'
import { formatCurrency, parsePriceBreaks } from '@/helpers/strings'
import { AnimatePresence, motion } from 'framer-motion'
import { useCalculateDiscounts } from '@/hooks/useCalculateDiscounts'
import { useJoinBoardStore } from '@/store/unirse-tablero/unirse-tablero-store'

interface IProps {
  product: IComponent
  isPresentation?: boolean
}

export const ProductGridItem = ({ product, isPresentation }: IProps) => {
  const startAddBoardAnimation = useUIStore(
    (state) => state.startAddBoardAnimation
  )
  const {
    addComponentToBoard: addComponentToCreateDiscussionBoard,
    selectedComponents: createDiscussionSelectedComponents,
  } = useCreateDiscussionStore()
  const {
    addComponentToBoard: addComponentToJoinBoard,
    selectedComponents: joinSelectedComponents,
  } = useJoinBoardStore()
  const hasQuantity = !!product!.quantity
  const selectedComponents = hasQuantity
    ? joinSelectedComponents
    : createDiscussionSelectedComponents
  const addComponentToBoard = hasQuantity
    ? addComponentToJoinBoard
    : addComponentToCreateDiscussionBoard
  const { openAuthModal } = useAuthModal()
  const [openProvider, setOpenProvider] = useState(false)
  const [showComunityButtons, setShowComunityButtons] = useState(false)
  const {
    url,
    nombre,
    imageUrl: imageUrlProp,
    referencia,
    precio,
    datasheetUrl,
    proveedor,
    priceBreaks,
    stockNumber: stockNumberProp,
  } = product
  const imageUrl = imageUrlProp || product.image_url
  const stockNumber = stockNumberProp || product.stock_number
  const priceBreaksArray = parsePriceBreaks(priceBreaks || product.price_breaks)
  const hasDatasheet =
    Boolean(datasheetUrl || product.datasheet_url) &&
    ![datasheetUrl, product.datasheet_url].includes('N/A')
  const hasProveedorUrl =
    Boolean(proveedor) && proveedor.url && proveedor.url !== 'N/A'
  const { direccion, country, city, nombre: ProviderName } = proveedor ?? {}
  const address = capitalizeWords(`${city}, ${country}, ${direccion}`)
  const onAddComponent = () => {
    addComponentToBoard({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      quantity: 1,
      imageUrl: product.imageUrl || product.image_url,
      providerName: ProviderName,
      priceBreaks: priceBreaksArray,
      stockNumber: stockNumber,
    })
  }
  const isComponentInBoard = selectedComponents.find(
    (component) => component.id === product.id
  )
  const hasStock =
    stockNumber > 0 &&
    (isComponentInBoard ? stockNumber > isComponentInBoard.quantity : true)

  const { hasDiscount, currency, currentUnitPrice, originalUnitPrice } =
    useCalculateDiscounts({
      price: precio,
      priceBreaks: priceBreaksArray,
      quantity: product.quantity,
    })

  if (!imageUrl || imageUrl === 'N/A') return <></>

  return (
    <div
      className={`flex flex-col justify-between items-start rounded-xl overflow-hidden shadow-[0px_3px_6px_0px_rgba(34,34,34,0.16)] bg-white h-full w-fit text-sm max-h-[fit-content] min-w-[276px]`}
    >
      <Link target='blank' className='min-w-full max-h-full ' href={url}>
        <Image
          src={imageUrl || product.image_url}
          alt={nombre}
          className='w-full object-contain rounded-t-xl min-w-full max-h-[95px] border-b border-surface-strokes'
          width={150}
          height={150}
        />
      </Link>
      <div className='flex gap-1 w-full flex-col p-[10px]'>
        <div className='flex gap-2'>
          <Link className='flex-1 hover:text-blue-500' href={url}>
            <p>{nombre}</p>
            <p>{referencia}</p>
          </Link>
          <div className='flex flex-col items-end'>
            <span className='font-bold '>{precio}</span>
            <p>
              {hasQuantity ? 'Disponibles' : 'Stock'}:{' '}
              {stockNumber > 0 ? stockNumber : 0}
            </p>
          </div>
        </div>
        {hasQuantity && (
          <div className='flex justify-between'>
            <p className='font-semibold'>Pedido actual: {product!.quantity}</p>
            {hasDiscount && (
              <div className='flex flex-col items-end'>
                <span className='text-gray-400 line-through text-xs'>
                  {formatCurrency(originalUnitPrice, currency)}
                </span>
                <span className='text-green-600 text-xs font-semibold'>
                  -
                  {formatCurrency(
                    originalUnitPrice - currentUnitPrice,
                    currency
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {!isPresentation && (
          <div className='flex gap-2'>
            <Button
              isDisabled={!hasDatasheet}
              href={datasheetUrl || product.datasheet_url}
              size='sm'
              type='link'
              variant='secondary'
            >
              Datasheet
            </Button>
            <div className='relative'>
              <Button
                isDisabled={!hasStock}
                onClick={onAddComponent}
                className={composeClasses(
                  'truncate',
                  startAddBoardAnimation
                    ? 'brightness-100 animate-bounce duration-1000'
                    : ''
                )}
                size='sm'
                dataTour='add-to-board'
              >
                {hasStock ? 'Agregar a tablero' : 'Cantidad máxima'}
              </Button>
              {/* {!!product!.quantity && (
              <div className='absolute -top-1 -right-1 rounded-full w-5 h-5 bg-notif-red flex items-center justify-center text-white'>
                {product!.quantity}
              </div>
            )} */}
              {isComponentInBoard && (
                <div className='absolute -top-1 -right-1 rounded-full w-5 h-5 bg-notif-red flex items-center justify-center text-white'>
                  {isComponentInBoard.quantity}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isPresentation && (
        <>
          <div className='w-full h-[1px] bg-surface-strokes'></div>

          <div className='flex flex-col p-[10px] gap-1 w-full'>
            <button
              onClick={() => setOpenProvider((prev) => !prev)}
              className='flex items-center w-full justify-between'
            >
              <p>Proveedor: {ProviderName || product.proveedor_name} </p>
              {openProvider ? <SlArrowUp /> : <SlArrowDown />}
            </button>
            <AnimatePresence initial={false}>
              {openProvider && (
                <motion.div
                  key='price-table'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p>{address}</p>
                  <Button
                    isDisabled={!hasProveedorUrl}
                    href={proveedor.url}
                    size='sm'
                    type='link'
                    variant='secondary'
                  >
                    {hasProveedorUrl ? 'Página del proveedor' : 'No disponible'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            data-tour='table-price'
            className='flex flex-1 flex-col p-[10px] gap-2 w-full border-t'
          >
            <button
              id='table-price-card'
              onClick={() => setShowComunityButtons((prev) => !prev)}
              className='flex items-center w-full justify-between'
            >
              <p className='truncate'>Tabla de precios</p>
              {showComunityButtons ? <SlArrowUp /> : <SlArrowDown />}
            </button>
            <AnimatePresence initial={false}>
              {showComunityButtons && (
                <motion.div
                  key='price-table'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <PriceTable priceBreaks={priceBreaksArray} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}
