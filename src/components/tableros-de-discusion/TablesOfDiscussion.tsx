'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Title } from '../ui/components'
import { TablesGrid } from './components'
import { PaginationSection } from '@/app/modules/category'
import { useForm } from '@/hooks'
import Input from '../ui/input'
import debounce from '@/app/utils/debounced'
import { IAllTablesDataResponse } from '@/interfaces/table.interface'
import { getDiscussionBoards } from '@/app/services/boards.services'

interface IProps {
  data: IAllTablesDataResponse
  page: number
}

export const TablesOfDiscussion = ({ data, page }: IProps) => {
  const [tables, setTables] = useState(data.results)
  const { formState, onInputTextChange } = useForm({
    search: '',
  })
  // Debounced function to fetch discussion boards
  const fetchTables = useCallback(
    debounce(async (query: string) => {
      try {
        const response = await getDiscussionBoards({
          limit: 35, // Ajusta el límite según sea necesario
          offset: 0,
          query: query.trim() ? query : undefined, // Solo enviar query si no está vacío
        })
        if (response.isSuccess) {
          setTables(response?.data?.data.results)
        } else {
          console.error('Error fetching discussion boards:', response.error)
        }
      } catch (error) {
        console.error('Error fetching discussion boards:', error)
      }
    }, 500),
    []
  )

  // Update search query and trigger debounced fetch
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onInputTextChange(e) // Update form state
    fetchTables(value) // Llama a fetchTables con el valor actual del input
  }

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
        onChange={handleSearchChange}
        name='search'
      />
      <TablesGrid tables={tables} />
      <PaginationSection defaultPage={page} totalPages={data.count} />
    </>
  )
}
