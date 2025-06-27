import { Dispatch } from 'react'
import type { StepType } from '@reactour/tour'

type BtnFnProps = {
  Button: React.FC<React.PropsWithChildren<NavButtonProps>>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  stepsLength: number
  currentStep: number
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
  steps?: StepType[]
}

type NavButtonProps = {
  onClick?: () => void
  kind?: 'next' | 'prev'
  hideArrow?: boolean
}

interface TourProviderProps {
  steps: StepType[]
  children: React.ReactNode
  defaultOpen?: boolean
  onSkipGuide?: () => void
  disableKeyboardNavigation?: boolean
}

export type { BtnFnProps, TourProviderProps, StepType }
