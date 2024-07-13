import { useEffect, useState } from 'react'

export const useMatchWindowQuery = () => {
  const isMatchMediaAvailable =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'

  const ssmQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 480px)')
    : null
  const smQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 640px)')
    : null
  const mdQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 768px)')
    : null
  const lgQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 1024px)')
    : null
  const xlQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 1280px)')
    : null
  const xxlQuery = isMatchMediaAvailable
    ? window.matchMedia('(min-width: 1536px)')
    : null
  const [isSSM, setIsSSM] = useState(ssmQuery?.matches)
  const [isSM, setIsSM] = useState(smQuery?.matches)
  const [isMD, setIsMD] = useState(mdQuery?.matches)
  const [isLG, setIsLG] = useState(lgQuery?.matches)
  const [isXL, setIsXL] = useState(xlQuery?.matches)
  const [isXXL, setIsXXL] = useState(xxlQuery?.matches)

  useEffect(() => {
    const ssmListener = (event: MediaQueryListEvent) => {
      setIsSSM(event.matches)
    }
    const smListener = (event: MediaQueryListEvent) => {
      setIsSM(event.matches)
    }
    const mdListener = (event: MediaQueryListEvent) => {
      setIsMD(event.matches)
    }
    const lgListener = (event: MediaQueryListEvent) => {
      setIsLG(event.matches)
    }
    const xlListener = (event: MediaQueryListEvent) => {
      setIsXL(event.matches)
    }

    const xxlListener = (event: MediaQueryListEvent) => {
      setIsXXL(event.matches)
    }

    ssmQuery?.addEventListener('change', ssmListener)
    smQuery?.addEventListener('change', smListener)
    mdQuery?.addEventListener('change', mdListener)
    lgQuery?.addEventListener('change', lgListener)
    xlQuery?.addEventListener('change', xlListener)
    xxlQuery?.addEventListener('change', xxlListener)

    return () => {
      ssmQuery?.removeEventListener('change', ssmListener)
      smQuery?.removeEventListener('change', smListener)
      mdQuery?.removeEventListener('change', mdListener)
      lgQuery?.removeEventListener('change', lgListener)
      xlQuery?.removeEventListener('change', xlListener)
      xxlQuery?.removeEventListener('change', xxlListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isSSM,
    isSM,
    isMD,
    isLG,
    isXL,
    isXXL
  }
}

export default useMatchWindowQuery
