'use client'

import React, { useState } from 'react'
import { IComponent } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { capitalizeWords } from '@/app/utils'
import { LinkButtonNext } from '@/components/ui/button/LinkButtonNext'
import { useAuthModal } from '@/hooks/useAuthModal'

interface IProps {
  product: IComponent
}

export const ProductGridItem = ({ product }: IProps) => {
  const { openAuthModal } = useAuthModal()
  const [openProvider, setOpenProvider] = useState(false)
  const [showComunityButtons, setShowComunityButtons] = useState(false)
  const { url, nombre, imageUrl, referencia, precio, datasheetUrl, proveedor } =
    product
  const hasDatasheet = Boolean(datasheetUrl) && datasheetUrl !== 'N/A'
  const hasProveedorUrl =
    Boolean(proveedor) && proveedor.url && proveedor.url !== 'N/A'
  const { direccion, country, city, nombre: ProviderName } = proveedor
  const address = capitalizeWords(`${city}, ${country}, ${direccion}`)
  if (!imageUrl || imageUrl === 'N/A') return <></>
  return (
    <div
      className={`flex flex-col justify-between items-start rounded-xl overflow-hidden shadow-[0px_3px_6px_0px_rgba(34,34,34,0.16)] bg-white h-full w-full text-sm ${
        showComunityButtons || openProvider ? '' : 'max-h-[301px]'
      } `}
    >
      <Link className='min-w-full max-h-full ' href={`/product/${referencia}`}>
        <Image
          src={imageUrl}
          alt={nombre}
          className='w-full object-contain rounded-t-xl min-w-full max-h-[95px] border-b border-surface-strokes'
          width={150}
          height={150}
        />
      </Link>
      <div className='flex gap-1 w-full flex-col p-[10px]'>
        <Link className='hover:text-blue-500' href={`/product/${referencia}`}>
          <p>{nombre}</p>
          <p>{referencia}</p>
        </Link>
        <span className='font-bold '>{precio}</span>

        <div className='flex gap-2'>
          <Button
            isDisabled={!hasDatasheet}
            href={datasheetUrl}
            size='sm'
            text={'Datasheet'}
            type='link'
          />
          <Button
            isDisabled={!url}
            href={url}
            size='sm'
            text={url ? 'Ver producto' : 'No disponible'}
            type='link'
            variant='secondary'
          />
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
              text={hasProveedorUrl ? 'Página del proveedor' : 'No disponible'}
              type='link'
              variant='secondary'
            />
          </>
        )}
      </div>
      <div className='flex flex-col p-[10px] gap-2 w-full border-t'>
        <button
          onClick={() => setShowComunityButtons((prev) => !prev)}
          className='flex items-center w-full justify-between'
        >
          <p>Únete a la comunidad y reduce costos</p>
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
                text={'Crear tablero de discusión'}
                variant='secondary'
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
