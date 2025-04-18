import { formatIsoToCustom } from '@/app/utils/formatter-dates'
import { ITableInfo } from '@/interfaces/table.interface'
import Link from 'next/link'
import React from 'react'
interface IProps {
  table: ITableInfo
}
export const TableItem = ({ table }: IProps) => {
  return (
    <Link
      href={`/tableros-de-discusion/${table.id}`}
      key={table.id}
      className='w-full flex flex-col p-6  relative gap-2'
    >
      <article className='flex items-center justify-between gap-1 '>
        <h3 className='font-semibold truncate max-w-[calc(100%-110px)] md:max-w-[calc(100%-70px)]'>
          {table.nombre}
        </h3>

        <span className='text-xs text-secondary min-w-[70px]'>
          {formatIsoToCustom(table?.createdAt?.toString())}
        </span>
      </article>
      <p className='text-sm text-secondary truncate max-w-[calc(100%-10px)] '>
        {table.description}
      </p>
    </Link>
  )
}
