import { ITable } from '@/interfaces/table.interface'
import Link from 'next/link'
import React from 'react'
interface IProps {
  table: ITable
}
export const TableItem = ({ table }: IProps) => {
  return (
    <Link
      href={`/tableros-de-discusion/${table.id}`}
      key={table.id}
      className='w-full flex flex-col p-6  relative gap-2'
    >
      <article className='flex items-center justify-between gap-1 '>
        <h3 className='font-semibold truncate max-w-[calc(100%-70px)]'>
          {table.name}
        </h3>
        <span className='text-xs text-secondary min-w-[70px]'>
          {table.date}
        </span>
      </article>
      <p className='text-sm text-secondary'>{table.description}</p>
    </Link>
  )
}
