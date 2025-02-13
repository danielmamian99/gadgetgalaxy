'use client'
import { Button } from '@/components'
import Input from '@/components/ui/input'
import { titleFont } from '@/config/fonts'
import { useForm } from '@/hooks/useForm'
import { useState } from 'react'
import { IRegister } from './RegisterBody'
const FORM_VALIDATIONS = {
  storeName: [(name: string) => name.length > 0, 'Campo obligatorio'],
  address: [(name: string) => name.length > 0, 'Campo obligatorio'],
  city: [(name: string) => name.length > 0, 'Campo obligatorio'],
}
interface IProps {
  onGoToLogin: () => void
  onGoToRegisterClient: () => void
  userFormData: IRegister
  setUserFormData: (userFormData: IRegister) => void
}
export const RegisterStore = ({
  onGoToLogin,
  userFormData,
  setUserFormData,
  onGoToRegisterClient,
}: IProps) => {
  const [showErrors, setShowErrors] = useState(false)
  const { formValidation, formState, isFormValid, onInputTextChange } = useForm(
    {
      storeName: userFormData.storeName,
      address: userFormData.address,
      city: userFormData.city,
      web: userFormData.web,
    },
    FORM_VALIDATIONS
  )
  const { storeName, address, city, web } = formState
  const onSubmit = () => {
    setShowErrors(true)
    if (!isFormValid) {
      return
    }
    console.log('Create account')
    onGoToLogin()
  }
  const onClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    setUserFormData({
      ...userFormData,
      ...formState,
    })
    onGoToRegisterClient()
  }

  return (
    <div className='flex flex-col items-between justify-between bg-white rounded-lg h-full gap-3'>
      <div className='flex flex-col gap-3'>
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
        <Input
          error={showErrors && formValidation.storeNameValid}
          value={storeName}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Nombre de empresa'
          classNameInput=''
          name='storeName'
        />
        <Input
          error={showErrors && formValidation.addressValid}
          value={address}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Dirección'
          classNameInput=''
          name='address'
        />
        <Input
          error={showErrors && formValidation.cityValid}
          value={city}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Ciudad'
          name='city'
        />
        <Input
          value={web}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Página web o red social'
          name='web'
        />
      </div>
      <div className='flex flex-col'>
        <Button
          type='button'
          onClick={(event) => {
            event.stopPropagation()
            onSubmit()
          }}
          className='!py-2'
          size='md'
          isDisabled={!isFormValid}
        >
          Crear cuenta
        </Button>
        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>
        <button
          onClick={onClick}
          className='btn-secondary  text-center p-2 rounded-xl'
        >
          Regresar
        </button>
      </div>
    </div>
  )
}
