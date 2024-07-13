'use client'
import { Button } from '@/components'
import Input from '@/components/ui/input'
import { titleFont } from '@/config/fonts'
import { useForm } from '@/hooks/useForm'
import Link from 'next/link'
import { useState } from 'react'
const INITIAL_FORM = {
  email: '',
  password: ''
}
const FORM_VALIDATIONS = {
  email: [
    (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    'El correo no es válido'
  ],
  password: [
    (password: string) => password.length > 0,
    'La contraseña es obligatoria'
  ]
}
interface IProps {
  onGoToRegister: () => void
}
export const LoginBody = ({ onGoToRegister }: IProps) => {
  const [showErrors, setShowErrors] = useState(false)
  const { formValidation, formState, isFormValid, onInputTextChange } = useForm(
    INITIAL_FORM,
    FORM_VALIDATIONS
  )
  const { email, password } = formState
  const onSubmit = () => {
    setShowErrors(true)
    if (isFormValid) {
      console.log('ingreso')
    }
  }
  const onClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    onGoToRegister()
  }
  return (
    <div className='flex flex-col gap-3 bg-white rounded-lg justify-between h-full'>
      <div className='flex flex-col gap-3'>
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>
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
          error={showErrors && formValidation.passwordValid}
          type='password'
          value={password}
          onChange={onInputTextChange}
          classNameLabel='!text-secondary text-sm'
          labelText='Contraseña'
          name='password'
        />
      </div>
      <div className='flex flex-col'>
        <Button
          type='button'
          onClick={onSubmit}
          className='!py-2'
          size='md'
          text='Ingresar'
        />
        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>

        <button
          onClick={onClick}
          className='btn-secondary  text-center p-2 rounded-xl'
        >
          Crear una nueva cuenta
        </button>
      </div>
    </div>
  )
}
