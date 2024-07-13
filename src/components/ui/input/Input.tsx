'use client'
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  FocusEvent,
  useEffect,
  useRef,
  useState,
  RefObject,
  ReactNode,
  MouseEvent
} from 'react'
import {
  InfoLabel,
  InputField,
  Label,
  LeftIcon,
  RightIcon,
  RightText
} from './components'
import { composeClasses, formatPhoneNumber } from '@/app/utils'

export type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url'

export type InputType = 'text' | 'number' | 'password'

export type LabelPosition = {
  top: number
  left: number
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  labelPosition?: LabelPosition
  className?: string
  information?: string
  leftIcon?: ReactNode
  leftIconClass?: string
  value?: string
  rightIcon?: ReactNode
  rightIconClass?: string
  rightText?: string
  placeholder?: string
  informationIcon?: string
  informationIconClass?: string
  type?: InputType
  disabled?: boolean
  inputMode?: InputMode
  name: string
  phoneCodesIsResponsive?: boolean
  error?: string | boolean
  onRightIconClick?: (event: MouseEvent) => void
  onPhoneCodeChange?: (phoneCode: string) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  getRef?: (ref: RefObject<HTMLInputElement>) => void
  classNameContainer?: string
  classNameLabel?: string
  classNameInput?: string
  width?: string
  height?: string
  hideLabel?: boolean
}

export const Input = forwardRef(
  (
    {
      labelText,
      className,
      error,
      information,
      name,
      informationIcon = 'error',
      leftIcon,
      leftIconClass,
      rightIconClass,
      rightIcon,
      rightText,
      disabled,
      type,
      inputMode,
      placeholder,
      onChange,
      onRightIconClick,
      getRef,
      onPhoneCodeChange,
      value,
      classNameContainer,
      phoneCodesIsResponsive,
      classNameLabel,
      classNameInput,
      informationIconClass,
      width = '',
      height = '',
      labelPosition = {
        top: 16,
        left: 16
      },
      hideLabel = false,
      onBlur,
      ...props
    }: InputProps,
    _ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [active, setActive] = useState(false)
    const [selectedCode, setSelectedCode] = useState('+52')

    const handleActivation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setActive(!!e.target?.value)
    }, [])

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        const input = event?.target?.value
        const formattedValue = formatPhoneNumber(input)
        if (inputRef?.current) {
          inputRef.current.value = formattedValue
        }
      },
      []
    )

    const focusInput = useCallback(() => {
      inputRef?.current?.focus()
    }, [])

    const handleLabelClick = useCallback(() => {
      if (inputRef?.current) {
        focusInput()
      }
    }, [focusInput])

    //* ObserversK
    useEffect(() => {
      if (inputRef && getRef) {
        getRef(inputRef)
      }
    }, [inputRef, getRef])

    return (
      <div
        className={composeClasses(width, height, classNameContainer)}
        ref={_ref}
        data-testid='text-field-container'
      >
        <label
          className={composeClasses(
            error && 'shake-horizontal',
            'relative inline-flex justify-center w-full items-center',
            className
          )}
          htmlFor={name}
          data-testid='text-field-label'
        >
          <InputField
            inputMode={inputMode}
            disabled={disabled}
            error={error}
            handleActivation={handleActivation}
            handleInputChange={handleInputChange}
            inputRef={inputRef}
            labelText={labelText}
            hideLabel={hideLabel}
            onBlur={onBlur}
            leftIcon={leftIcon}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            props={props}
            rightIcon={rightIcon}
            rightText={rightText}
            type={type}
            value={value || ''}
            className={classNameInput}
            height={height}
          />

          {!hideLabel && (
            <Label
              active={active || !!value}
              disabled={disabled}
              error={error}
              position={labelPosition}
              handleLabelClick={handleLabelClick}
              labelText={labelText}
              leftIcon={leftIcon}
              name={name}
              value={value}
              placeholder={placeholder}
              type={type}
              className={classNameLabel}
              height={height}
            />
          )}

          <LeftIcon
            leftIcon={leftIcon}
            leftIconClass={composeClasses(
              'text-[1.5rem] text-primary',
              leftIconClass
            )}
            type={type}
            disabled={disabled}
          />

          {rightText && (
            <RightText rightText={rightText} rightIcon={rightIcon} />
          )}

          <RightIcon
            rightIcon={rightIcon}
            rightIconClass={composeClasses(
              'text-[1.5rem] right-4 text-primary',
              rightIconClass
            )}
            disabled={disabled}
            error={error}
            onRightIconClick={(event) => onRightIconClick?.(event)}
          />
        </label>

        <InfoLabel
          information={information}
          error={error}
          informationIcon={informationIcon}
          disabled={disabled}
          informationIconClass={informationIconClass}
        />
      </div>
    )
  }
)

export default Input
