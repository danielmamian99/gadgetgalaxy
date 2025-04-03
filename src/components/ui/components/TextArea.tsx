'use client'
import { composeClasses } from '@/app/utils'
import { FC, useEffect, useRef, useCallback } from 'react'

export interface Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  setValue: (value: string) => void
  placeholder?: string
  maxCharacters?: number
  containerClassName?: string
  error?: string
  classNameLabel?: string
}

/**
 * This component is used for the textarea
 * @param value is the value of the textarea
 * @param setValue is a function that updates the value of the textarea
 * @returns {JSX.Element}
 */
export const TextArea: FC<Props> = ({
  placeholder,
  value,
  setValue,
  maxCharacters,
  containerClassName,
  error,
  classNameLabel,
  disabled,
  ...option
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const labelRef = useRef<HTMLLabelElement>(null)

  /**
   * This function is used to hide the label when the scrollbar is used
   * @returns {void}
   */
  const hiddenLabelInScrollbar = useCallback((): void => {
    const scrollTop = textareaRef?.current?.scrollTop || 0

    if (scrollTop > 10) {
      labelRef.current?.classList.add('hidden')
    } else {
      labelRef.current?.classList.remove('hidden')
    }
  }, [])

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!maxCharacters || maxCharacters >= e.target.value.length) {
        setValue(e.target.value)
      }
    },
    [maxCharacters, setValue]
  )

  useEffect(() => {
    const currentTextareaRef = textareaRef.current
    if (!currentTextareaRef) {
      return
    }
    currentTextareaRef.addEventListener('scroll', hiddenLabelInScrollbar)
    return () => {
      currentTextareaRef.removeEventListener('scroll', hiddenLabelInScrollbar)
    }
  }, [hiddenLabelInScrollbar])

  return (
    <div className={composeClasses('flex flex-col', containerClassName)}>
      <div className='relative inline-flex justify-center w-full items-center max-w-full'>
        <textarea
          data-testid='textarea'
          ref={textareaRef}
          {...option}
          className={composeClasses(
            'text-primary disabled:text-button-primary-disabled px-4 py-[.375rem] pt-6 h-[122px] border border-solid resize-none',
            'border-button-primary-disabled rounded-lg w-full focus:border-transparent peer',
            'focus-visible:outline-none focus-visible:border-primary focus-visible:border-[.125rem]',
            'hover:bg-surface-gray-10 focus:bg-surface-white',
            option?.className,
            !disabled && error && '!border-destructive'
          )}
          name='message'
          id='message'
          cols={2}
          rows={4}
          value={value}
          onChange={onChangeValue}
          disabled={disabled}
        />

        <label
          ref={labelRef}
          className={composeClasses(
            'absolute left-4 top-1 transition-all bg-transparent duration text-primary peer-focus:top-1 peer-focus:text-body-s peer-focus:cursor-default peer-focus:text-primary truncate max-w-[90%] peer-disabled:text-button-primary-disabled',
            value.length >= 1
              ? 'text-body-s cursor-default'
              : 'text-body-l cursor-text',
            classNameLabel,
            error && 'peer-focus:text-destructive'
          )}
          htmlFor='message'
        >
          {placeholder}
        </label>
      </div>

      {error && (
        <div
          id='informative'
          className={composeClasses(
            'mt-1 px-4 pointer-events-none',
            disabled && '!text-button-primary-disabled'
          )}
        >
          {error && typeof error === 'string' && !disabled && (
            <p className='text-body-s text-destructive flex items-center gap-1 shake-horizontal'>
              {
                <span className={'material-symbols-outlined !text-body-s'}>
                  error
                </span>
              }
              {error}
            </p>
          )}
        </div>
      )}

      {maxCharacters && (
        <div className='flex items-center gap-1 text-xs font-medium text-primary px-3'>
          <span className='material-symbols-outlined text-xs'>info</span>
          <p>{`Caracteres restantes ${value?.length}/${maxCharacters} `}</p>
        </div>
      )}
    </div>
  )
}

export default TextArea
