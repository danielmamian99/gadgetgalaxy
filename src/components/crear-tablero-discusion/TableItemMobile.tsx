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
export const TableItemMobile = ({ item }: IProps) => {
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
    <div className='flex py-1 px-2 items-center w-full gap-2 border border-surface-strokes rounded-xl'>
      <Image
        src={imageUrl}
        alt={`componente ${name}`}
        className='object-none rounded-xl max-h-[50px] max-w-[50px]'
        width={50}
        height={50}
      />
      <div className='flex gap-1 flex-col pr-2'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center  gap-1 pt-1'>
            <p className='text-xs'>
              {name}, Proveedor: {providerName}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-6 pt-1'>
          <QuantitySelectorV2
            value={quantity}
            className='text-xs w-auto items-center [&>input]:h-[28px] [&>input]:w-[28px] [&>input]:rounded-[8px] [&>input]:!bg-white [&>input]:border [&>input]:border-surface-gray-20 z-1'
            classNameRightButton='hover:border-primary active:bg-primary active:text-white !h-[28px] !w-[28px]'
            classNameLeftButton={composeClasses(
              '!h-[28px] !w-[28px]',
              quantity > 1 &&
                'hover:border-primary active:bg-primary active:text-white'
            )}
            isEditable={true}
            onChangeInputValue={onChangeQuantity}
            onChange={onChangeQuantity}
            minQuantity={1}
          />
          <button
            onClick={onRemove}
            className='bg-notif-red rounded-xl w-6 h-6 flex justify-center items-center'
          >
            <GoogleIcon name='delete' className='text-white text-xl' />
          </button>
        </div>
        <p className='text-xs'>Precio: {price}</p>
      </div>
    </div>
  )
}
