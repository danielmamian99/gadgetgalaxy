'use client'
import { Button } from '@/components'
import Input from '@/components/ui/input'
import { titleFont } from '@/config/fonts'
import { useForm } from '@/hooks/useForm'
import { useState } from 'react'
import { postLogin } from '@/app/services'
import { useAuthUser } from '@/hooks/useAuthUser'

const INITIAL_FORM = {
  email: '',
  password: '',
}

const FORM_VALIDATIONS = {
  email: [
    (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    'El correo no es válido',
  ],
  password: [
    (password: string) => password.length > 0,
    'La contraseña es obligatoria',
  ],
}

interface IProps {
  onGoToRegister: () => void
  closeAuthModal: () => void
}

export const LoginBody = ({ onGoToRegister, closeAuthModal }: IProps) => {
  const [showErrors, setShowErrors] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { setUser } = useAuthUser()
  const { formValidation, formState, isFormValid, onInputTextChange } = useForm(
    INITIAL_FORM,
    FORM_VALIDATIONS
  )
  const { email, password } = formState

  const onSubmit = async () => {
    setShowErrors(true)
    setErrorMessage(null)

    if (isFormValid) {
      setLoading(true)
      try {
        const { isSuccess, data } = await postLogin({
          username: email,
          password,
        })

        if (!isSuccess || !data || ![200, 201].includes(data.status)) {
          setErrorMessage('Credenciales incorrectas. Inténtalo de nuevo.')
          return
        }

        console.log('Login exitoso:', data)
        // Aquí puedes manejar el token o redirigir al usuario
        // Por ejemplo: guardar el token en el localStorage

        setUser(JSON.stringify(data.user), data.access_token)
      } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        setErrorMessage('Ocurrió un error. Inténtalo más tarde.')
      } finally {
        setLoading(false)
        closeAuthModal()
      }
    }
  }

  const onClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation()
    onGoToRegister()
  }

  return (
    <div className='flex flex-col gap-3 bg-white rounded-lg justify-between h-full w-full'>
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
        {errorMessage && (
          <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
        )}
      </div>
      <div className='flex flex-col'>
        <Button
          isDisabled={!isFormValid || loading}
          type='button'
          onClick={onSubmit}
          className='!py-2'
          size='md'
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </Button>
        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>

        <button
          onClick={onClick}
          className='btn-secondary text-center p-2 rounded-xl'
        >
          Crear una nueva cuenta
        </button>
      </div>
    </div>
  )
}
