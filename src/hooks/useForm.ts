'use client'
import { stringNumberFormatToSimpleNumber } from '@/app/utils'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
interface IParams {
  [key: string]: any
}
export const useForm = (
  initialForm: IParams = {},
  formValidations: IParams = {}
) => {
  const [formState, setFormState] = useState<{ [key: string]: any }>(
    initialForm
  )
  const [formValidation, setFormValidation] = useState<IParams>({})

  useEffect(() => {
    createValidatos()
  }, [formState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }
    return true
  }, [formValidation])

  const onInputTextChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setFormState({ ...formState, [name]: value })
  }

  const onInputNumberChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: stringNumberFormatToSimpleNumber(value)
    })
  }
  const onChangeValue = ({
    name,
    value
  }: {
    name: string
    value: string | number
  }) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  const onResetForm = (resetValue = {}) => {
    setFormState(resetValue)
  }
  const createValidatos = () => {
    const formCheckedValues: IParams = {}
    for (const formField of Object.keys(formValidations)) {
      const [validateFunction, errorMessage = 'Este campo es requerido'] =
        formValidations[formField]
      formCheckedValues[`${formField}Valid`] = validateFunction(
        formState[formField]
      )
        ? null
        : errorMessage
    }
    setFormValidation(formCheckedValues)
  }
  return {
    ...formState,
    formState,
    onChangeValue,
    onInputNumberChange,
    onInputTextChange,
    onResetForm,
    ...formValidation,
    formValidation,
    isFormValid
  }
}
