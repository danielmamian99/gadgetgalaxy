import {
  ChangeEvent,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  RefObject,
  useCallback,
  useMemo
} from 'react'
import { InputProps } from '../../Input'
import { composeClasses } from '@/app/utils'

interface InputFieldProps {
  name: string
  value: string
  inputRef: RefObject<HTMLInputElement>
  props: InputHTMLAttributes<HTMLInputElement>
  type: InputProps['type']
  inputMode?: InputProps['inputMode']
  disabled?: boolean
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  handleActivation: (event: ChangeEvent<HTMLInputElement>) => void
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  labelText?: string
  leftIcon?: InputProps['leftIcon']
  rightIcon?: InputProps['rightIcon']
  rightText?: string
  error?: string | boolean
  className?: string
  hideLabel?: boolean
  height?: string
}

export const InputField: FC<InputFieldProps> = ({
  name,
  value,
  inputRef,
  props,
  type,
  inputMode,
  disabled,
  placeholder,
  onChange = () => {},
  handleActivation,
  handleInputChange,
  labelText,
  leftIcon,
  rightIcon,
  rightText,
  error,
  className,
  hideLabel,
  height = 'h-[3.25rem]',
  onBlur
}) => {
  const currentInputMode = useMemo(() => {
    if (inputMode) {
      return inputMode
    }

    return type === 'number' ? 'numeric' : 'text'
  }, [inputMode, type])

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleActivation(event)
      onChange(event)
    },
    [handleActivation, handleInputChange, onChange, type]
  )

  return (
    <input
      data-testid='input-text-field'
      name={name}
      aria-label={name}
      ref={inputRef}
      value={value || ''}
      {...props}
      className={composeClasses(
        'truncate px-4 py-[.375rem] border border-solid border-button-primary-disabled rounded-lg w-full focus:border-transparent peer focus-visible:outline-none focus-visible:border-primary focus-visible:border-[.125rem]',
        'hover:bg-surface-gray-10 focus:bg-surface-white',
        height,
        type === 'number' && 'input-number-format',
        !labelText || hideLabel ? '!py-0 pt-0' : 'pt-5',
        Boolean(leftIcon) && '!pl-11',
        Boolean(rightIcon && rightText) && '!pr-20',
        rightText && '!pr-12',
        Boolean(rightIcon) && '!pr-10',
        disabled &&
          '!border-button-primary-disabled !text-button-primary-disabled ',
        !disabled && error && '!border-destructive',
        'transition-all duration-150',
        className
      )}
      onBlur={(event) => onBlur?.(event)}
      type={type}
      disabled={disabled}
      inputMode={currentInputMode}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  )
}
