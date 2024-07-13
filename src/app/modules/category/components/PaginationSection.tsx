'use client'
import { getComponents } from '@/app/services'
import Pagination from '@/components/pagination'
import React from 'react'
interface IProps {
  totalPages: number
  token: string
}
const ITEMS_PER_PAGE = 35
export const PaginationSection = ({ totalPages, token }: IProps) => {
  const onPageChange = async (newPage: number) => {
    const response = await getComponents({
      token,
      limit: ITEMS_PER_PAGE,
      offset: (newPage - 1) * ITEMS_PER_PAGE
    })
    console.log('response >>>', response)
  }
  return (
    <div className='flex h-[74px] w-full flex-row items-center justify-end bg-white p-3 z-2 border border-surface-strokes rounded-xl mt-2 mb-1 mx-auto'>
      <Pagination
        totalPages={totalPages}
        defaultPage={1}
        onPageChange={onPageChange}
      />
    </div>
  )
}
