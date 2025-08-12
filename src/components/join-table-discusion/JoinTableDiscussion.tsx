'use client'
import React from 'react'
import SidebarComponent from '../ui/components/SidebarComponent'
import { CloseButton } from '../ui/button/CloseButton'
import { Button } from '../ui/button/Button'
import { JoinTableItem } from './JoinTableItem'
import TextArea from '../ui/components/TextArea'
import { useJoinTableDiscussion } from './useJoinTableDiscussion'
import { JoinTableItemMobile } from './JoinTableItemMobile'

export const JoinTableDiscussion = () => {
  const {
    closeJoinBoardModal,
    onChangeValue,
    onSubmit,
    onClickAddComponent,
    comment,
    isLoading,
    isMD,
    isOpen,
    selectedComponents,
    boardComponents,
  } = useJoinTableDiscussion()
  return (
    <SidebarComponent
      className='flex flex-col'
      onClose={closeJoinBoardModal}
      isOpen={isOpen}
    >
      <div className='w-full flex justify-between items-center border-b border-gray-200 px-4 md:px-6 py-4'>
        <h2 className='text-lg font-semibold'>Unirme al pedido</h2>
        <CloseButton onClick={closeJoinBoardModal} />
      </div>
      <div className='flex flex-col gap-4 py-4 px-4 md:px-6 h-full max-h-[calc(100vh-140px)]'>
        <form className='flex flex-col gap-4'>
          <div>
            <TextArea
              value={comment}
              placeholder='Comentario de la solicitud'
              setValue={(value) => {
                onChangeValue({ name: 'comment', value })
              }}
              classNameLabel='!text-secondary !text-xs'
              className='text-sm'
            />
          </div>
        </form>
        <div className='flex flex-col gap-4 overflow-y-auto'>
          {selectedComponents.map((component) =>
            isMD ? (
              <JoinTableItem
                key={component.id}
                item={component}
                boardItem={boardComponents.find(
                  (item) => item.id === component.id
                )}
              />
            ) : (
              <JoinTableItemMobile
                key={component.id}
                item={component}
                boardItem={boardComponents.find(
                  (item) => item.id === component.id
                )}
              />
            )
          )}
          {(!selectedComponents || selectedComponents.length === 0) && (
            <button
              onClick={onClickAddComponent}
              className='rounded-lg border border-dashed flex items-center justify-center w-full h-full min-h-[80px]'
            >
              <p className='text-sm text-secondary'>
                Selecciona un componente para agregarlo al tablero
              </p>
            </button>
          )}
        </div>
      </div>
      <div className='w-full px-6 border-t py-4'>
        <Button
          onClick={onSubmit}
          isDisabled={selectedComponents.length === 0}
          size='sm'
          className='font-semibold h-[42px]'
        >
          {isLoading ? 'Cargando...' : 'Crear'}
        </Button>
      </div>
    </SidebarComponent>
  )
}
