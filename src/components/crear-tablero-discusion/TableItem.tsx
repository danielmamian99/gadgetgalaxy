import React from 'react'
import Image from 'next/image'
import { ITableItem } from '@/interfaces/table.interface'
import QuantitySelectorV2 from '../ui/quantity-selector/QuantitySelectorV2'
import { composeClasses } from '@/app/utils/classes'
import { useCreateDiscussionStore } from '@/store/creacion-tablero/creacion-tablero-store'
import { GoogleIcon } from '../ui/components'

interface IProps {
  item: ITableItem
}
export const TableItem = ({ item }: IProps) => {
  const { updateComponentQuantity, removeComponentFromBoard } =
    useCreateDiscussionStore()

  const { name, imageUrl, providerName, quantity, price, id } = item

  const onChangeQuantity = (newQuantity: number) => {
    updateComponentQuantity(id, newQuantity)
  }
  const onRemove = () => {
    removeComponentFromBoard(id)
  }
  return (
    <div className='flex items-center w-full gap-4 border border-surface-strokes rounded-xl pl-2 '>
      <Image
        src={imageUrl}
        alt={`componente ${name}`}
        className='object-none rounded-xl max-h-[50px] max-w-[50px]'
        width={50}
        height={50}
      />
      <div className='flex flex-1 gap-5 items-center py-2'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>{name}</p>
          <p className='text-xs'>Proveedor: {providerName}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs'>Precio:{price}</p>
          <QuantitySelectorV2
            value={quantity}
            className='text-xs w-auto items-center [&>input]:h-[30px] [&>input]:w-[30px] [&>input]:rounded-[8px] [&>input]:!bg-white [&>input]:border [&>input]:border-surface-gray-20 z-1'
            classNameRightButton='hover:border-primary active:bg-primary active:text-white !h-[30px] !w-[30px]'
            classNameLeftButton={composeClasses(
              '!h-[30px] !w-[30px]',
              quantity > 1 &&
                'hover:border-primary active:bg-primary active:text-white'
            )}
            isEditable={true}
            onChangeInputValue={onChangeQuantity}
            onChange={onChangeQuantity}
            minQuantity={1}
          />
        </div>
      </div>
      <div className='flex items-center justify-center h-full px-6'>
        <button
          onClick={onRemove}
          className='bg-notif-red rounded-xl w-6 h-6 flex justify-center items-center'
        >
          <GoogleIcon name='delete' className='text-white text-xl' />
        </button>
      </div>
    </div>
  )
}
