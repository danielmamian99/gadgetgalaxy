import { composeClasses } from '@/app/utils'
import { CSSProperties, FC } from 'react'

export interface SpinnerProps {
  /**
   * The `style?: CSSProperties` prop is allowing the user to pass a CSSProperties as the style.
   * */
  style?: CSSProperties
  /**
   * The `className?: string` prop is allowing the user to pass a string as the className.
   * */
  className?: string
  /**
   * color?: string is allowing the user to pass a string as the color.
   * @default 'primary'
   * */
  color?: 'primary' | 'secondary' | 'terciary' | 'link' | 'cancel'
  /**
   * customBorderColor?: string is allowing the user to pass a string as the customBorderColor
   * @example 'border-red-500'
   */
  customBorderColor?: string
}

const assignedBorderColor: { [key: string]: string } = {
  primary: 'border-white',
  secondary: 'border-white',
  terciary: 'border-primary',
  link: 'border-primary',
  cancel: 'border-white'
}

export const Spinner: FC<SpinnerProps> = ({
  className = '',
  customBorderColor,
  color = 'primary',
  style
}) => {
  const colorAssigned = customBorderColor ?? assignedBorderColor[color]

  return (
    <div className='flex justify-center items-center'>
      <div
        role='spinner'
        className={composeClasses(
          colorAssigned,
          className,
          'w-6 h-6 animate-spin border-4 border-solid rounded-full !border-x-transparent !border-b-transparent'
        )}
        style={style}
      />
    </div>
  )
}

export default Spinner
