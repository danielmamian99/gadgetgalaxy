'use client'
import { Button } from '@/components'
import Input from '@/components/ui/input'
import { titleFont } from '@/config/fonts'
import { useForm } from '@/hooks/useForm'
import { useState } from 'react'
import { GoogleIcon } from '../../ui/components'
import { composeClasses } from '@/app/utils'
import Tooltip from '../../ui/tooltip'
import { IRegister } from './RegisterBody'

const FORM_VALIDATIONS = {
  email: [
    (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    'El correo no válido',
  ],
  name: [(name: string) => name.length > 0, 'El nombre es obligatorio'],
  password: [
    (password: string) => password.length > 0,
    'La contraseña es obligatoria',
  ],
}
interface IProps {
  onGoToLogin: () => void
  onGoToRegisterStore: () => void
  userFormData: IRegister
  setUserFormData: (userFormData: IRegister) => void
}
export const RegisterClient = ({
  onGoToLogin,
  onGoToRegisterStore,
  userFormData,
  setUserFormData,
}: IProps) => {
  const { rol } = userFormData
  const [showErrors, setShowErrors] = useState(false)
  const [isStore, setIsStore] = useState(rol === 'store')
  const { formValidation, formState, isFormValid, onInputTextChange } = useForm(
    {
      name: userFormData.name,
      email: userFormData.email,
      password: userFormData.password,
    },
    FORM_VALIDATIONS
  )
  const { email, password, name } = formState
  const onSubmit = () => {
    setShowErrors(true)
    if (!isFormValid) {
      return
    }
    if (isStore) {
      setUserFormData({ ...userFormData, ...formState, rol: 'store' })
      onGoToRegisterStore()
      return
    }
    onGoToLogin()
  }
  const onClick = () => {
    onGoToLogin()
  }

  return (
    <div className='flex flex-col items-between justify-between bg-white rounded-lg h-full gap-3'>
      <div className='flex flex-col gap-3'>
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
        <Input
          error={showErrors && formValidation.emailValid}
          value={email}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Correo electrónico'
          classNameInput=''
          name='email'
        />
        <Input
          error={showErrors && formValidation.nameValid}
          value={name}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Nombre completo'
          classNameInput=''
          name='name'
        />
        <Input
          error={showErrors && formValidation.passwordValid}
          type='password'
          value={password}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Contraseña'
          name='password'
        />
        <p>Tipo de usuario:</p>
        <div className='flex gap-2 justify-center items-center w-full'>
          <Tooltip
            tooltipClassName='my-1'
            className='w-full'
            content='Compra junto a otros'
          >
            <button
              type='button'
              onClick={(event) => {
                event.stopPropagation()
                setIsStore(false)
              }}
              className={composeClasses(
                'flex gap-2 rounded-xl   px-2 py-1 w-full',
                isStore
                  ? 'border-surface-strokes border'
                  : 'bg-notif-green-01 border-notif-green border-2'
              )}
            >
              <GoogleIcon name='person' />
              Comprador
            </button>
          </Tooltip>
          <Tooltip
            tooltipClassName='my-1'
            className='w-full'
            content='Importa y distribuye'
          >
            <button
              type='button'
              onClick={(event) => {
                event.stopPropagation()
                setIsStore(true)
              }}
              className={composeClasses(
                'flex gap-2 rounded-xl   px-2 py-1 w-full',
                isStore
                  ? 'bg-notif-green-01 border-notif-green border-2'
                  : 'border-surface-strokes border'
              )}
            >
              <GoogleIcon name='local_shipping' />
              Bodega
            </button>
          </Tooltip>
        </div>
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
          {isStore ? 'Continuar' : 'Crear cuenta'}
        </Button>
        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>

        <button
          onClick={(event) => {
            event.stopPropagation()
            onClick()
          }}
          className='btn-secondary  text-center p-2 rounded-xl'
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}
