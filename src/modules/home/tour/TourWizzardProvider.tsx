/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useLayoutEffect,
} from 'react'

import { ITourSearchWizzard } from './types'
import { useMatchWindowQuery } from '@/hooks/useMatchWindowQuery'
import { useTour } from '@/components/tour'
import { StepType } from '@/components/tour/types'
import { useUIStore } from '@/store/ui/ui-store'
import { TOUR_COMPLETED_KEY } from '@/constants/localStorage'

const defaultValues: ITourSearchWizzard = {
  initWizzard: () => null,
}

const TourSearchWizzardContext =
  createContext<ITourSearchWizzard>(defaultValues)

export interface IProps {
  children: React.ReactNode
  onFinishTour?: () => void
  onActiveWizard?: () => void
  onClickMap?: () => void
}

const TourSearchWizzardProvider = ({
  children,
  onFinishTour,
  onActiveWizard,
  onClickMap,
}: IProps) => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const closeSideMenu = useUIStore((state) => state.closeSideMenu)

  const [hasSeenSearchTour, setHasSeenSearchTour] = useState(true)
  const [openWizzard, setOpenWizzard] = useState(false)
  const { setIsOpen, setSteps, setCurrentStep, currentStep, isOpen, steps } =
    useTour()
  const { isMD } = useMatchWindowQuery()

  const tourStepsMobile: StepType[] = [
    {
      selector: '[data-tour="create-board-mobile"]',
      content:
        '¡Crea un nuevo tablero de discusión para organizar tus compras en grupo!',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 22,
        }),
      },
    },
    {
      selector: '[data-tour="see-boards-mobile"]',
      content: 'Aquí puedes ver todos los tableros de discusión activos.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 20,
        }),
      },
    },

    {
      selector: '[data-tour="menu-hamburguesa"]',
      content: 'Abre el menú para ver más opciones.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 16,
        }),
      },
      action: () => {
        const wizardContainerInfo: HTMLElement =
          document.getElementsByClassName(
            'wizard-container-info'
          )[0] as HTMLElement
        if (wizardContainerInfo.children.length > 0) {
          wizardContainerInfo.children[0].classList.add('!hidden')
        }
        setTimeout(() => {
          openSideMenu()
        }, 1000)
        setTimeout(() => {
          setCurrentStep((step) => (step === steps?.length - 1 ? 0 : step + 1))
          if (wizardContainerInfo.children.length > 0) {
            wizardContainerInfo.children[0].classList.remove('!hidden')
          }
        }, 1300)
      },
    },
    {
      selector: '[data-tour="login-mobile"]',
      content:
        'Inicia sesión para guardar tus tableros y participar en la comunidad.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 4,
        }),
      },
      actionAfter: () => {
        closeSideMenu()
      },
    },

    {
      selector: '[data-tour="add-to-board"]',
      content: 'Agrega productos a tu tablero para planear compras en grupo.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 20,
        }),
      },
      action: () => {
        const buttonTablePrice: HTMLElement = document.getElementById(
          'table-price-card'
        ) as HTMLElement
        buttonTablePrice.click()
      },
    },
    {
      selector: '[data-tour="table-price"]',
      content:
        'Aquí puedes ver los precios segun la cantidad de productos. Reúnete con la comunidad y comenta en el tablero para obtener mejores precios y decidir juntos.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 6,
        }),
      },
      actionAfter: () => {
        const buttonTablePrice: HTMLElement = document.getElementById(
          'table-price-card'
        ) as HTMLElement
        buttonTablePrice.click()
      },
    },
  ]

  const tourStepsMD: StepType[] = [
    {
      selector: '[data-tour="create-board"]',
      content:
        '¡Crea un nuevo tablero de discusión para organizar tus compras en grupo!',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 22,
        }),
      },
    },
    {
      selector: '[data-tour="login"]',
      content:
        'Inicia sesión para guardar tus tableros y participar en la comunidad.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 22,
        }),
      },
    },
    {
      selector: '[data-tour="see-boards"]',
      content: 'Aquí puedes ver todos los tableros de discusión activos.',
      padding: {
        mask: 10,
      },
    },
    {
      selector: '[data-tour="add-to-board"]',
      content: 'Agrega productos a tu tablero para planear compras en grupo.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 20,
        }),
      },
      action: () => {
        const buttonTablePrice: HTMLElement = document.getElementById(
          'table-price-card'
        ) as HTMLElement
        buttonTablePrice.click()
      },
    },
    {
      selector: '[data-tour="table-price"]',
      content:
        'Aquí puedes ver los precios segun la cantidad de productos. Reúnete con la comunidad y comenta en el tablero para obtener mejores precios y decidir juntos.',
      styles: {
        maskArea: (base: {
          [key: string]: string
        }): React.CSSProperties & { rx?: number } => ({
          ...base,
          rx: 6,
        }),
      },
      actionAfter: () => {
        const buttonTablePrice: HTMLElement = document.getElementById(
          'table-price-card'
        ) as HTMLElement
        buttonTablePrice.click()
      },
    },
  ]
  const getTout = () => {
    const currentTour = isMD ? tourStepsMD : tourStepsMobile
    return currentTour
  }
  const tourSteps = getTout()

  const verifyHasSeenSearchTour = () => {
    try {
      const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY)
      if (!tourCompleted) {
        setHasSeenSearchTour(false)
        initWizzard()
        return
      }
      setHasSeenSearchTour(true)
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      initWizzard()
    }
  }

  useEffect(() => {
    verifyHasSeenSearchTour()
  }, [])

  const initWizzard = () => {
    setOpenWizzard(true)
  }

  const initTour = () => {
    onActiveWizard?.()

    if (setSteps) {
      setSteps(tourSteps)
    }

    setCurrentStep(0)
    setIsOpen(true)

    if (!hasSeenSearchTour) {
      setHasSeenSearchTour(true)
      localStorage.setItem(TOUR_COMPLETED_KEY, 'true')
    }
  }

  const finishTour = () => {
    onFinishTour?.()
    setIsOpen(false)
    setOpenWizzard(false)

    try {
      localStorage.setItem(TOUR_COMPLETED_KEY, 'true')
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }

    if (!hasSeenSearchTour) {
      setHasSeenSearchTour(true)
    }
  }

  const values = useMemo(
    () => ({
      initWizzard,
    }),
    [initWizzard]
  )

  useLayoutEffect(() => {
    if (!hasSeenSearchTour) {
      setTimeout(() => {
        initTour()
      }, 500)
    }
  }, [hasSeenSearchTour])

  return (
    <TourSearchWizzardContext.Provider value={values}>
      {children}
    </TourSearchWizzardContext.Provider>
  )
}

export { TourSearchWizzardProvider }

export const useTourSearchWizzard = (): ITourSearchWizzard =>
  useContext(TourSearchWizzardContext)
