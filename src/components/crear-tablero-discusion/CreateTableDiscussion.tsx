'use client'
import React from 'react'
import SidebarComponent from '../ui/components/SidebarComponent'
import { CloseButton } from '../ui/button/CloseButton'
import { Button } from '../ui/button/Button'
import { TableItem } from './TableItem'
import Input from '../ui/input/Input'
import TextArea from '../ui/components/TextArea'
import { TableItemMobile } from './TableItemMobile'
import { useTableDiscussion } from './useTableDiscussion'

export const CreateTableDiscussion = () => {
  const {
    closeCreateBoardModal,
    onChangeValue,
    onInputTextChange,
    onSubmit,
    onClickAddComponent,
    description,
    formValidation,
    isFormValid,
    isLoading,
    isMD,
    isOpen,
    name,
    selectedComponents,
    showErrors,
  } = useTableDiscussion()
  return (
    <SidebarComponent
      className='flex flex-col'
      onClose={closeCreateBoardModal}
      isOpen={isOpen}
    >
      <div className='w-full flex justify-between items-center border-b border-gray-200 px-4 md:px-6 py-4'>
        <h2 className='text-lg font-semibold'>Crear Tablero</h2>
        <CloseButton onClick={closeCreateBoardModal} />
      </div>
      <div className='flex flex-col gap-4 py-4 px-4 md:px-6 h-full max-h-[calc(100vh-140px)]'>
        <form className='flex flex-col gap-4'>
          <div>
            <Input
              error={showErrors && formValidation.storeNameValid}
              value={name}
              onChange={onInputTextChange}
              classNameLabel='!text-secondary !text-xs'
              labelText='Nombre del Tablero'
              classNameInput=''
              name='name'
              className='text-sm'
            />
          </div>
          <div>
            <TextArea
              value={description}
              placeholder='Descripción del Tablero'
              setValue={(value) => {
                onChangeValue({ name: 'description', value })
              }}
              classNameLabel='!text-secondary !text-xs'
              className='text-sm'
            />
          </div>
        </form>
        <div className='flex flex-col gap-4 overflow-y-auto'>
          {selectedComponents.map((component) =>
            isMD ? (
              <TableItem key={component.id} item={component} />
            ) : (
              <TableItemMobile key={component.id} item={component} />
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
          isDisabled={!isFormValid}
          size='sm'
          className='font-semibold h-[42px]'
        >
          {isLoading ? 'Cargando...' : 'Crear'}
        </Button>
      </div>
    </SidebarComponent>
  )
}
