import React, { Fragment } from 'react'
import { TableItem } from './TableItem'
import { Divider } from '@/components/ui/components'
import { ITableInfo } from '@/interfaces/table.interface'
interface IProps {
  tables: ITableInfo[]
}
export const TablesGrid = ({ tables }: IProps) => {
  return (
    <div className='w-full flex flex-col rounded-xl border border-surface-strokes bg-white mb-6'>
      {tables?.length > 0
        ? tables?.map((table, index) => (
            <Fragment key={table.id}>
              <TableItem table={table} />
              {index !== tables.length - 1 && (
                <Divider className='w-full h-1' />
              )}
            </Fragment>
          ))
        : null}
    </div>
  )
}
