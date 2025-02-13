import React, { useState } from 'react'
import { RegisterClient } from './RegisterClient'
import { RegisterStore } from './RegisterStore'
export interface IRegister {
  name: string
  email: string
  password: string
  rol: string
  storeName: string
  address: string
  city: string
  web: string
}
interface IProps {
  onGoToLogin: () => void
}
export const RegisterBody = ({ onGoToLogin }: IProps) => {
  const [registerSteps, setRegisterSteps] = useState(1)
  const [userFormData, setUserFormData] = useState<IRegister>({
    name: '',
    email: '',
    password: '',
    rol: 'client',
    storeName: '',
    address: '',
    city: '',
    web: '',
  })
  const onGoToRegisterStore = () => {
    setRegisterSteps(2)
  }
  const onGoToRegisterClient = () => {
    setRegisterSteps(1)
  }
  return registerSteps === 1 ? (
    <RegisterClient
      onGoToLogin={onGoToLogin}
      onGoToRegisterStore={onGoToRegisterStore}
      userFormData={userFormData}
      setUserFormData={setUserFormData}
    />
  ) : (
    <RegisterStore
      onGoToLogin={onGoToLogin}
      onGoToRegisterClient={onGoToRegisterClient}
      userFormData={userFormData}
      setUserFormData={setUserFormData}
    />
  )
}
