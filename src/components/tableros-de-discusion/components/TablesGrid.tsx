import { ITable } from '@/interfaces/table.interface'
import React from 'react'
import { TableItem } from './TableItem'
import { Divider } from '@/components/ui/components'
interface IProps {
  tables: ITable[]
}
export const TablesGrid = ({ tables }: IProps) => {
  return (
    <div className='w-full flex flex-col rounded-xl border border-surface-strokes bg-white mb-6'>
      {tables.map((table, index) => (
        <>
          <TableItem table={table} />
          {index !== tables.length - 1 && <Divider className='w-full h-1' />}
        </>
      ))}
    </div>
  )
}
