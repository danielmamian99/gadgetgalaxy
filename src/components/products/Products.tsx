'use client'
import React, { useState, useCallback } from 'react'
import { LinkButtonNext } from '@/components/ui/button/LinkButtonNext'
import Input from '../ui/input'
import { PaginationSection } from '@/app/modules/category'
import { IGadgetgalaxyComponents } from '@/interfaces/product.interface'
import { useForm } from '@/hooks/useForm'
import debounce from '@/app/utils/debounced'
import { getComponents } from '@/app/services/ssr.services'
import { Title } from '../ui/components/Title'
import { ProductGrid } from './product-grid/ProductGrid'
import { ProductGridSekeleton } from './product-grid/ProductGridSekeleton'

interface IProps {
  dataComponents: IGadgetgalaxyComponents
  page: number
}

export const Products = ({ dataComponents, page }: IProps) => {
  const [products, setProducts] = useState(dataComponents.results)
  const [loading, setLoading] = useState(false)
  const { formState, onInputTextChange } = useForm({
    search: '',
  })
  const limit = 35
  const totalPages = Math.ceil(dataComponents.count / limit)
  // Debounced function to fetch products using getComponents
  const fetchProducts = useCallback(
    debounce(async (query: string) => {
      setLoading(true)
      try {
        const response = await getComponents({
          limit: 35, // Puedes ajustar el límite según sea necesario
          offset: 0,
          query: query.trim() ? query : undefined, // Solo enviar query si no está vacío
        })
        if (response.isSuccess) {
          setProducts(response?.data?.data.results)
        } else {
          console.error('Error fetching products:', response.error)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }, 500),
    []
  )
  // Update search query and trigger debounced fetch
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onInputTextChange(e) // Update form state
    fetchProducts(value) // Llama a fetchProducts con el valor actual del input
  }
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
            <div data-tour='see-boards-mobile' className='max-w-[220px] '>
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
          onChange={handleSearchChange}
          name='search'
        />
      </div>
      {loading ? <ProductGridSekeleton /> : <ProductGrid products={products} />}
      <PaginationSection defaultPage={page} totalPages={totalPages} />
    </>
  )
}
