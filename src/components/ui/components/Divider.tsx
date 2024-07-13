import { composeClasses } from '@/app/utils'

export interface DividerProps {
  className?: string
  isVertical?: boolean
  color?: string
  height?: number | string
  width?: number | string
}

export const Divider = ({
  className = '',
  isVertical,
  color = 'bg-surface-strokes',
  height,
  width
}: DividerProps) => {
  if (isVertical) {
    return (
      <div
        role='separator'
        data-testid='divider'
        className={composeClasses(className, color)}
        style={{
          height: height ?? '100%',
          width: width ?? 2
        }}
      />
    )
  }

  return (
    <div
      role='separator'
      data-testid='divider'
      className={composeClasses(className, color)}
      style={{
        height: height ?? 2,
        width: width ?? '100%'
      }}
    />
  )
}
