import { MouseEvent } from 'react'
import { toast as toastify, ToastOptions } from 'react-toastify'
import ToastComponent from './ToastComponent'

export interface toastOptions extends ToastOptions {
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
   * The `customIcon` parameter replace the default icon provided by the type.
   */
  customIcon?: {
    name?: string
    class?: string
  }
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
}

const assignedColorProgressByType = {
  success: '#97CC04',
  error: '#EA5858',
  info: '#0038FF',
  warning: '#F1A208'
} as const

/* The `toast` function is a helper function that creates and displays a toast notification
using the `react-toastify` library. */
export const toast = (options: toastOptions) => {
  const {
    title,
    type = 'success',
    customIcon,
    actions = null,
    description,
    position = 'top-right',
    autoClose = 4000,
    hideProgressBar = false,
    closeOnClick = true
  } = options

  return (
    <>
      {toastify?.[type]?.(
        <ToastComponent
          title={title}
          type={type}
          actions={actions}
          description={description}
          customIcon={customIcon}
        />,
        {
          position,
          autoClose: actions ? false : autoClose,
          hideProgressBar,
          closeButton: false,
          closeOnClick,
          icon: false,
          progressStyle: {
            accentColor: assignedColorProgressByType[type],
            marginBottom: '7px',
            marginLeft: '7px',
            marginRight: '7px',
            maxWidth: '290.93px',
            borderRadius: '0 0 12px 12px'
          }
        }
      )}
    </>
  )
}

export default toast
