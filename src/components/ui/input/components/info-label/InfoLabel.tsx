import { composeClasses } from '@/app/utils'
import { FC } from 'react'

interface InfoLabelProps {
  information?: string
  error?: string | boolean
  informationIcon?: string
  disabled?: boolean
  informationIconClass?: string
}

export const InfoLabel: FC<InfoLabelProps> = ({
  information,
  error,
  informationIcon,
  disabled,
  informationIconClass
}) => {
  return (
    <div
      id='informative'
      className={composeClasses(
        'mt-1 px-4 pointer-events-none',
        disabled && '!text-button-primary-disabled'
      )}
    >
      {information && !error && (
        <p
          className={composeClasses(
            'text-body-s text-primary flex items-center gap-1',
            disabled && '!text-button-primary-disabled'
          )}
        >
          {informationIcon && (
            <span className='material-symbols-outlined text-body-s text-primary'>
              {informationIcon}
            </span>
          )}
          {information}
        </p>
      )}

      {/* Error Message */}
      {error && typeof error === 'string' && !disabled && (
        <p className='text-body-s text-destructive flex items-center gap-1 shake-horizontal'>
          {informationIcon && (
            <span
              className={composeClasses(
                'material-symbols-outlined !text-body-s',
                informationIconClass
              )}
            >
              {informationIcon}
            </span>
          )}
          {error}
        </p>
      )}
    </div>
  )
}
