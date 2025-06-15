import { FC, ReactNode } from 'react'
import {
  Placement,
  autoUpdate,
  flip,
  inline,
  shift,
  useFloating,
  offset,
} from '@floating-ui/react-dom'
import { DropdownProvider, ContextDropdownProps } from './context'
import { composeClasses } from '@/app/utils/classes'

export interface DropdownProps
  extends Omit<
    ContextDropdownProps,
    'referenceElement' | 'popperElement' | 'floatingStyles' | 'popperRef'
  > {
  /**
   * Defines the content of the dropdown. This is where you place any React nodes that should be rendered inside the dropdown.
   */
  children: ReactNode
  /**
   * Optional CSS class name to apply to the dropdown container for additional styling or targeting in CSS.
   */
  className?: string
  /**
   * Specifies the default placement of the dropdown relative to its trigger element. Uses the Placement type from '@floating-ui/react-dom' for possible values (e.g., 'bottom', 'top', etc.).
   * @default "bottom"
   */
  defaultPlacement?: Placement
  /**
   * The horizontal offset of the dropdown content from its trigger element. This value is used in custom positioning logic.
   * @default 0
   */
  positionX?: number
  /**
   * The vertical offset of the dropdown content from its trigger element. This value is used in custom positioning logic and often helps with adjusting the dropdown's position to ensure it does not overlap with other UI elements.
   * @default 20
   */
  positionY?: number
  /**
   * Determines the positioning strategy of the dropdown content. Can be 'fixed' or 'absolute'. 'Fixed' will position the dropdown relative to the viewport, which can be useful for ensuring the dropdown remains in view. 'absolute' positions it in relation to its nearest positioned ancestor.
   * @default "absolute"
   */
  strategyPosition?: 'fixed' | 'absolute'
  /**
   * When isReponsive is true, in mobile render bottom sheet
   * @default true
   */
  isResponsive?: boolean
  /**
   * inMobileFullHeight is used to set the full height of the BottomSheet in mobile
   * @default false
   */
  inMobileFullHeight?: boolean
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    children,
    className,
    defaultPlacement = 'bottom',
    positionX = 0,
    positionY = 20,
    strategyPosition = 'absolute',
    isResponsive = true,
    inMobileFullHeight = false,
    ...otherProps
  } = props

  const { refs, floatingStyles } = useFloating({
    placement: defaultPlacement,
    strategy: strategyPosition,
    middleware: [
      inline(),
      flip(),
      shift(),
      offset({
        mainAxis: positionY,
        crossAxis: positionX,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const contextValues = {
    ...otherProps,
    referenceElement: refs.setReference,
    popperElement: refs.setFloating,
    floatingStyles,
    popperRef: refs.floating,
    isResponsive,
    inMobileFullHeight,
  }
  return (
    <DropdownProvider value={contextValues as any}>
      <div
        ref={refs.setReference}
        data-testid='dropdown'
        id='container-relative-dropdown'
        className={composeClasses(className, 'relative')}
      >
        {children}
      </div>
    </DropdownProvider>
  )
}

export default Dropdown
