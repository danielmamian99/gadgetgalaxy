import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

export type ToastProviderProps = {}

export const ToastProvider: FC<ToastProviderProps> = (props) => {
  return (
    <ToastContainer
      {...props}
      closeButton={false}
      hideProgressBar={true}
      toastStyle={{
        background: 'transparent',
        padding: 0,
        margin: 0,
        border: 'none',
        boxShadow: 'none',
      }}
      style={{
        width: 'fit-content',
        height: 'fit-content',
        margin: 0,
        padding: 0,
        marginRight: '0.5rem',
        marginTop: '5.5rem',
      }}
    />
  )
}

export default ToastProvider
