'use client'
import { getComponents } from '@/app/services'
import Pagination from '@/components/pagination'
import React, { useEffect, useLayoutEffect, useState } from 'react'
interface IProps {
  totalPages: number
  defaultPage: number
}
export const PaginationSection = ({ totalPages, defaultPage }: IProps) => {
  const [basePath, setBasePath] = useState('')
  const onPageChange = async (newPage: number) => {
    window.location.href = `${basePath}?page=${newPage}`
  }
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setBasePath(window.origin)
    }
  }, [])

  return (
    <div className='flex h-[74px] w-full flex-row items-center justify-end bg-white p-3 z-2 border border-surface-strokes rounded-xl mt-2 mb-1 mx-auto'>
      <Pagination
        totalPages={totalPages}
        defaultPage={defaultPage}
        onPageChange={onPageChange}
        basePath={basePath}
        prefetch={true}
      />
    </div>
  )
}
