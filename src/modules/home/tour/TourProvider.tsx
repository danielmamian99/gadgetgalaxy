import { TourProvider as TourProviderWC } from '@/components/tour'

interface IProps {
  children: React.ReactNode
  onSkipGuide?: () => void
  disableKeyboardNavigation?: boolean
}

export const TourProvider = ({
  children,
  disableKeyboardNavigation,
  onSkipGuide,
}: IProps) => {
  return (
    <TourProviderWC
      disableKeyboardNavigation={disableKeyboardNavigation}
      onSkipGuide={onSkipGuide}
      steps={[]}
    >
      {children}
    </TourProviderWC>
  )
}
