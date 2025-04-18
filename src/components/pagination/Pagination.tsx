import { useEffect, useState } from 'react'
import { TablePaginationProps } from './types'
import { getPageNumbers } from './ultils'
import { composeClasses } from '@/app/utils'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

export const Pagination = ({
  className,
  defaultPage = 1,
  totalPages,
  value,
  basePath = '',
  prefetch = false,
  onPageChange,
}: TablePaginationProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [currentPage, setCurrentPage] = useState<number>(defaultPage)
  const enableLastButton = currentPage < totalPages
  const enableFirstButton = currentPage > 1
  const handlePrefetch = useCallback(
    (pageNumber: number) => {
      // Iniciamos la transición para el prefetch
      startTransition(() => {
        // Prefetch de la página
        router.prefetch(`${basePath}?page=${pageNumber}`)
      })
    },
    [router, basePath]
  )
  const handleMouseEnter = useCallback(
    (pageNumber: number) => {
      handlePrefetch(pageNumber)
    },
    [handlePrefetch]
  )
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }
  useEffect(() => {
    if (value !== undefined) {
      setCurrentPage(value)
    }
  }, [value])

  return (
    <div
      className={composeClasses(
        'flex items-center gap-3 select-none',
        className
      )}
    >
      <button
        type='button'
        className='w-8 h-8 flex items-center justify-center rounded-full text-primary disabled:text-terciary'
        onClick={() => handlePageChange(currentPage - 1)}
        onMouseEnter={() => handleMouseEnter(currentPage - 1)}
        disabled={!enableFirstButton}
      >
        <SlArrowLeft />
      </button>

      {getPageNumbers(currentPage, totalPages).map((pageNumber, index) => {
        if (pageNumber === -1) {
          return (
            <span key={index} className='text-tertiary-input text-body-m'>
              ...
            </span>
          )
        }

        if (pageNumber === currentPage) {
          return (
            <div
              key={index}
              className={composeClasses(
                'flex items-center justify-center rounded-full text-body-m bg-button-dark text-white',
                pageNumber >= 1000 ? 'w-12 h-12 ' : 'w-8 h-8 '
              )}
            >
              <span>{pageNumber}</span>
            </div>
          )
        }

        return (
          <button
            key={index}
            type='button'
            className='w-8 h-8 flex items-center justify-center rounded-full text-body-m'
            onClick={() => {
              handlePageChange(pageNumber)
            }}
            onMouseEnter={() => handleMouseEnter(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })}

      <button
        type='button'
        className='w-8 h-8 flex items-center justify-center rounded-full text-primary disabled:text-terciary'
        onClick={() => handlePageChange(currentPage + 1)}
        onMouseEnter={() => handleMouseEnter(currentPage - 1)}
        disabled={!enableLastButton}
      >
        <SlArrowRight />
      </button>
    </div>
  )
}

export default Pagination
