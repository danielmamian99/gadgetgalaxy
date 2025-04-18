'use client'

import React, { useState } from 'react'
import { IComponent } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { capitalizeWords, composeClasses } from '@/app/utils'
import { LinkButtonNext } from '@/components/ui/button/LinkButtonNext'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useCreateDiscussionStore } from '@/store/creacion-tablero/creacion-tablero-store'
import { useUIStore } from '@/store/ui/ui-store'

interface IProps {
  product: IComponent
}

export const ProductGridItem = ({ product }: IProps) => {
  const startAddBoardAnimation = useUIStore(
    (state) => state.startAddBoardAnimation
  )
  const { addComponentToBoard } = useCreateDiscussionStore()
  const { openAuthModal } = useAuthModal()
  const [openProvider, setOpenProvider] = useState(false)
  const [showComunityButtons, setShowComunityButtons] = useState(false)
  const { url, nombre, imageUrl, referencia, precio, datasheetUrl, proveedor } =
    product
  const hasDatasheet = Boolean(datasheetUrl) && datasheetUrl !== 'N/A'
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
      imageUrl: product.imageUrl,
      providerName: ProviderName,
    })
  }
  if (!imageUrl || imageUrl === 'N/A') return <></>
  return (
    <div
      className={`flex flex-col justify-between items-start rounded-xl overflow-hidden shadow-[0px_3px_6px_0px_rgba(34,34,34,0.16)] bg-white h-full w-full text-sm ${
        showComunityButtons || openProvider ? '' : 'max-h-[301px]'
      } `}
    >
      <Link target='blank' className='min-w-full max-h-full ' href={url}>
        <Image
          src={imageUrl}
          alt={nombre}
          className='w-full object-contain rounded-t-xl min-w-full max-h-[95px] border-b border-surface-strokes'
          width={150}
          height={150}
        />
      </Link>
      <div className='flex gap-1 w-full flex-col p-[10px]'>
        <Link className='hover:text-blue-500' href={url}>
          <p>{nombre}</p>
          <p>{referencia}</p>
        </Link>
        <span className='font-bold '>{precio}</span>

        <div className='flex gap-2'>
          <Button
            isDisabled={!hasDatasheet}
            href={datasheetUrl}
            size='sm'
            type='link'
            variant='secondary'
          >
            Datasheet
          </Button>
          <Button
            onClick={onAddComponent}
            className={composeClasses(
              'truncate',
              startAddBoardAnimation
                ? 'brightness-100 animate-bounce duration-1000'
                : ''
            )}
            size='sm'
          >
            Agregar a tablero
          </Button>
        </div>
      </div>
      <div className='w-full h-[1px] bg-surface-strokes'></div>

      <div className='flex flex-col p-[10px] gap-1 w-full'>
        <button
          onClick={() => setOpenProvider((prev) => !prev)}
          className='flex items-center w-full justify-between'
        >
          <p>Proveedor: {ProviderName} </p>
          {openProvider ? <SlArrowUp /> : <SlArrowDown />}
        </button>
        {openProvider && (
          <>
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
          </>
        )}
      </div>
      <div className='flex flex-col p-[10px] gap-2 w-full border-t'>
        <button
          onClick={() => setShowComunityButtons((prev) => !prev)}
          className='flex items-center w-full justify-between'
        >
          <p className='truncate'>Únete a la comunidad y reduce costos</p>
          {showComunityButtons ? <SlArrowUp /> : <SlArrowDown />}
        </button>
        {showComunityButtons && (
          <>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>Acerca de este producto:</p>
              <LinkButtonNext
                className='flex items-center justify-center'
                href='/tableros-de-discusion'
              >
                Ver tableros de discusión
              </LinkButtonNext>
              <Button
                onClick={openAuthModal}
                isDisabled={!url}
                size='sm'
                variant='secondary'
              >
                Crear tablero de discusión
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
