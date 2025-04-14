import { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { composeClasses } from '@/app/utils/classes'

export interface QuantitySelectorV2Props {
  value: number
  maxQuantity?: number
  minQuantity?: number
  onChange: (quantity: number) => void
  onChangeInputValue?: (quantity: number) => void
  leftContentButton?: ReactNode
  rightContentButton?: ReactNode
  classNameRightButton?: string
  classNameLeftButton?: string
  className?: string
  isEditable?: boolean
}

export const QuantitySelectorV2 = ({
  className,
  maxQuantity,
  minQuantity = 0,
  leftContentButton,
  rightContentButton,
  classNameRightButton,
  classNameLeftButton,
  onChange,
  onChangeInputValue,
  value,
  isEditable,
}: QuantitySelectorV2Props) => {
  const handleQuantityChange = useCallback(
    (quantity: number) => {
      const newQuantity = Math.min(Math.max(quantity, minQuantity), quantity)
      onChange(newQuantity)
    },
    [onChange, minQuantity]
  )

  const maxLengthInput = useMemo(
    () => maxQuantity?.toString().length ?? 3,
    [maxQuantity]
  )

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cleanValueInput = event.target.value
        ?.replace(/[^0-9]/g, '')
        ?.slice(0, maxLengthInput)

      const inputValue = cleanValueInput ? parseInt(cleanValueInput, 10) : 0

      let adjustedQuantity = Math.max(inputValue, minQuantity)

      if (maxQuantity) {
        adjustedQuantity = Math.min(adjustedQuantity, maxQuantity)
      }

      if (onChangeInputValue) {
        onChangeInputValue(adjustedQuantity)
      }
    },
    [maxLengthInput, minQuantity, maxQuantity, onChangeInputValue]
  )

  useEffect(() => {
    if (value) {
      handleQuantityChange(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={composeClasses(className, 'flex gap-2')}>
      <button
        type='button'
        className={composeClasses(
          classNameLeftButton,
          value <= minQuantity ? 'text-terciary' : 'text-primary',
          'rounded-full w-8 h-8 border border-surface-strokes flex items-center justify-center'
        )}
        disabled={value <= minQuantity}
        onClick={() => handleQuantityChange(value - 1)}
      >
        - {leftContentButton}
      </button>
      {isEditable ? (
        <input
          className='text-body-l input-number-format w-8 h-8 pb-[1px] rounded-lg bg-surface-gray-10 text-center flex items-center justify-center'
          value={value.toString()?.slice(0, maxLengthInput)}
          type='number'
          data-testid='input-editable'
          inputMode='numeric'
          onChange={handleChangeValue}
        />
      ) : (
        <div className='text-body-l w-8 h-8 rounded-lg bg-surface-gray-10 flex items-center justify-center'>
          {value}
        </div>
      )}
      <button
        type='button'
        className={composeClasses(
          classNameRightButton,
          maxQuantity && value >= maxQuantity
            ? 'text-terciary'
            : 'text-primary',
          'rounded-full w-8 h-8 border border-surface-strokes flex items-center justify-center'
        )}
        disabled={maxQuantity ? value >= maxQuantity : false}
        onClick={() => handleQuantityChange(value + 1)}
      >
        + {rightContentButton}
      </button>
    </div>
  )
}

export default QuantitySelectorV2
