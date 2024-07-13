'use client'
import React from 'react'
import { Title } from '../ui/components'
import { TablesGrid } from './components'
import { PaginationSection } from '@/app/modules/category'
import { IAllTablesData } from '@/seed/seed'
import { useForm } from '@/hooks'
import Input from '../ui/input'

interface IProps {
  data: IAllTablesData
}
export const TablesOfDiscussion = ({ data }: IProps) => {
  const { formState, onInputTextChange } = useForm({
    search: ''
  })
  return (
    <>
      <Title
        title='Tableros'
        subtitle='todos los tableros de discusión'
        className='mb-2'
      />
      <div className='flex flex-col pb-6 gap-2'>
        <p className='text-sm'>
          ¡Reúnete con personas de la comunidad para comprar productos al por
          mayor y reducir tus costos!
        </p>
      </div>
      <Input
        classNameContainer='w-full'
        classNameInput='!rounded-full'
        classNameLabel='text-secondary'
        labelText='Buscar tableros'
        leftIcon='search'
        value={formState.search}
        onChange={onInputTextChange}
        name='search'
      />
      <TablesGrid tables={data.results} />
      <PaginationSection token={''} totalPages={data.count} />
    </>
  )
}
