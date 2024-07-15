'use client'
import React from 'react'
import { ProductGrid, Title } from '@/components'
import { LinkButtonNext } from '@/components/ui/button/LinkButtonNext'
import Input from '../ui/input'
import { PaginationSection } from '@/app/modules/category'
import { IGadgetgalaxyComponents } from '@/interfaces'
import { useForm } from '@/hooks'

interface IProps {
  dataComponents: IGadgetgalaxyComponents
  token: string
}
export const Products = ({ dataComponents, token }: IProps) => {
  const { formState, onInputTextChange } = useForm({
    search: ''
  })
  return (
    <>
      <div className='flex flex-col pb-6 gap-2'>
        <div className='flex flex-col md:flex-row justify-between'>
          <Title
            title='Tienda'
            subtitle='todos los productos'
            className='mb-2'
          />
          <div className='flex flex-col gap-4 md:justify-end md:items-end mb-4'>
            <p className='text-sm'>
              ¡Reúnete con personas de la comunidad para comprar productos al
              por mayor y reducir tus costos!
            </p>
            <div className='max-w-[220px] '>
              <LinkButtonNext
                className='flex items-center justify-center text-sm'
                href='/tableros-de-discusion'
              >
                Ver tableros de discusión
              </LinkButtonNext>
            </div>
          </div>
        </div>
        <Input
          classNameContainer='w-full'
          classNameInput='!rounded-full'
          classNameLabel='text-secondary'
          labelText='Buscar Productos'
          leftIcon='search'
          value={formState.search}
          onChange={onInputTextChange}
          name='search'
        />
      </div>
      <ProductGrid products={dataComponents.results} />
      <PaginationSection token={token} totalPages={dataComponents.count} />
    </>
  )
}
