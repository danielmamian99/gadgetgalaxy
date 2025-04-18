import { composeClasses } from '@/app/utils/classes'
import { FC, MouseEvent } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from '../button/Button'

export interface ToastProps {
  /**
   * The `title` parameter is the title of the toast.
   */
  title: string

  /**
   * The `description` parameter is the description of the toast.
   */
  description?: string

  /**
   * The `type` parameter is the type of the toast.
   * @default 'info'
   */
  type: 'success' | 'error' | 'info' | 'warning'

  /**
   * The `actions` parameter is the actions of the toast.
   */
  actions?: {
    /**
     * The `accepted` parameter is the callback function that is called when the toast is accepted.
     */
    accepted?: (event: MouseEvent) => void

    /**
     * The `textAccepted` parameter is the text of the accepted button.
     * @default 'Aceptar'
     */
    textAccepted?: string
    /**
     * The `classNameAccepted` parameter is the className of the accepted button.
     */
    classNameAccepted?: string

    /**
     * The `declined` parameter is the callback function that is called when the toast is declined.
     */
    declined?: (event: MouseEvent) => void

    /**
     * The `textDeclined` parameter is the text of the declined button.
     * @default 'Descartar'
     */
    textDeclined?: string
    /**
     * The `classNameDeclined` parameter is the className of the declined button.
     */
    classNameDeclined?: string
  } | null

  /**
   * The `className` parameter is the className of the toast.
   */

  className?: string

  /**
   * The `customIcon` parameter replace the default icon provided by the type.
   */
  customIcon?: {
    name?: string
    class?: string
  }

  /**
   * The `style` parameter is the style of the toast.
   * @default {}
   */
  style?: React.CSSProperties

  /**
   * The `onClose` parameter is the callback function that is called when the toast is closed.
   */
  onClose?: () => void
}

const assignedStylesByType = {
  success: {
    containerClassName: 'border border-notif-green',
    iconClassName: 'bg-notif-green text-white',
    icon: 'check',
  },
  warning: {
    containerClassName: 'border border-notif-yellow',
    iconClassName: 'bg-notif-yellow text-white',
    icon: 'exclamation',
  },
  error: {
    containerClassName: 'border border-notif-red',
    iconClassName: 'bg-notif-red text-white',
    icon: 'exclamation',
  },
  info: {
    containerClassName: 'border border-notif-blue',
    iconClassName: 'bg-notif-blue text-white',
    icon: 'info_i',
  },
} as const

export const ToastComponent: FC<ToastProps> = ({
  actions = null,
  description,
  title,
  type = 'info',
  className,
  customIcon,
  style = {},
  onClose,
}) => {
  const { icon, iconClassName, containerClassName } = assignedStylesByType[type]

  return (
    <div
      data-testid='container-toast'
      className={composeClasses(
        className,
        containerClassName,
        actions && 'cursor-pointer',
        'flex flex-col w-fit bg-white rounded-lg'
      )}
      style={style}
    >
      <div className='flex flex-row w-fit items-start justify-between p-4 gap-2'>
        <span
          className={composeClasses(
            customIcon?.class,
            iconClassName,
            'text-body-bold-l rounded-full material-symbols-outlined w-6 h-6 flex items-center justify-center'
          )}
        >
          {customIcon?.name ?? icon}
        </span>
        <div className='flex flex-col items-start justify-center gap-2 min-w-[201px]'>
          <p className='text-headline-xs text-primary max-w-xs'>{title}</p>
          {description && (
            <p className='text-body-m text-secondary max-w-xs'>{description}</p>
          )}
          {actions && (
            <div className='flex flex-row items-center justify-start -ml-4'>
              {actions?.accepted && (
                <Button
                  variant='link'
                  className={actions?.classNameAccepted}
                  onClick={(event) => actions?.accepted?.(event)}
                >
                  {actions?.textAccepted || 'Aceptar'}
                </Button>
              )}
              {Boolean(actions?.declined && actions?.accepted) && (
                <div className='w-1 h-1 flex items-center justify-center rounded-full bg-secondary' />
              )}
              {Boolean(actions?.declined) && (
                <Button
                  variant='link'
                  className={actions?.classNameDeclined}
                  onClick={(event) => actions?.declined?.(event)}
                >
                  {actions?.textDeclined || 'Descartar'}
                </Button>
              )}
            </div>
          )}
        </div>
        <button
          className='cursor-pointer flex items-center justify-center text-primary hover:text-secondary'
          onClick={onClose}
          type='button'
          data-testid='button-close'
        >
          <MdOutlineClose className='min-w-[24px] min-h-[26px] text-primary hover:text-secondary' />
        </button>
      </div>
    </div>
  )
}

export default ToastComponent
