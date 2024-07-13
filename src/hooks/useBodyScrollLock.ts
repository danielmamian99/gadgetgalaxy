import { useEffect } from 'react'

/**
 * The `useBodyScrollLock` function is a custom hook in TypeScript that locks or unlocks the scroll
 * behavior of the document body based on a boolean value.
 */
export const useBodyScrollLock = (shouldLock: boolean = true) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (shouldLock) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [shouldLock])
}
