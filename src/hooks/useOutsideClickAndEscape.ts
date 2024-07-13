import { RefObject, useCallback, useEffect } from 'react'

interface ClickOutsideAndEspaceOptions {
  /**
   * A reference to the element that should trigger the callback when clicked outside of.
   * @type {RefObject<HTMLElement>}
   */
  ref: RefObject<HTMLElement>
  /**
   * The callback function to be triggered when the element is clicked outside of.
   * @param {MouseEvent | KeyboardEvent} event - The event object.
   */
  callback: (event?: MouseEvent | KeyboardEvent) => void
  /**
   * Whether the callback should be triggered when the "Escape" key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether the callback should be triggered when the element is clicked outside of.
   * @default true
   */
  closeOnOutsideClick?: boolean
}

/**
 * The `useOutsideClickAndEscape` function is a custom hook in TypeScript that allows to detect clicks outside a specified element and trigger a callback function,
 * as well as to detect the key press of the "Escape" key and trigger the callback function if the closeOnEsc prop is specified as true.
 * @param {ClickOutsideAndEspaceOptions}
 * - `ref`: A reference to the element that should trigger the callback function when the element is clicked outside the element ref
 * - `callback`: The callback function to be triggered when the element is clicked outside of
 * - `closeOnEscape`: Whether the callback should be triggered when the "Escape" key is pressed
 */
export const useOutsideClickAndEscape = ({
  ref,
  callback,
  closeOnEscape = true,
  closeOnOutsideClick = true
}: ClickOutsideAndEspaceOptions): void => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref?.current &&
        !ref.current.contains(event.target as Node) &&
        closeOnOutsideClick
      ) {
        event?.stopPropagation()
        callback(event)
      }
    },
    [ref, callback, closeOnOutsideClick]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.stopPropagation()
        callback(event)
      }
    },
    [closeOnEscape, callback]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClick, handleKeyDown])
}
