import React from 'react'
import { CommentTextArea } from './CommenTextArea'
import { UserProfile } from '../profile/UserProfile'
import { ITableInfo } from '@/interfaces/table.interface'
import { IUser } from '@/interfaces/profile.interface'
import { IComponent } from '@/interfaces/product.interface'
import { ProductGrid } from '../products/product-grid/ProductGrid'
import { useJoinBoardInit } from '@/hooks/useJoinBoardInit'

interface IProps {
  tableInfo: ITableInfo
  ownerInfo: IUser
  components: IComponent[]
}
export const TableInfo = ({
  tableInfo,
  ownerInfo,
  components: componentsProp,
}: IProps) => {
  const components = componentsProp.map((component) => ({
    ...component,
    stockNumber: component.stockNumber - component.quantity,
  }))
  return (
    <div className='flex flex-col gap-2  md:pb-6 border-b-2 border-surface-strokes'>
      <UserProfile
        date={tableInfo.createdAt}
        userInfo={ownerInfo}
        showBackButton
      />
      <h1 className='text-2xl font-semibold break-all overflow-wrap-anywhere'>
        {tableInfo.nombre}
      </h1>
      <p className='text-sm break-all overflow-wrap-anywhere'>
        {tableInfo.description}
      </p>
      <ProductGrid products={components} />
      <div className='mt-10 mb-4'>
        <CommentTextArea dashboardId={tableInfo.id} />
      </div>
    </div>
  )
}
