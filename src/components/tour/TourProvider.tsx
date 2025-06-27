import { TourProviderProps } from './types'
import { TourProvider as TourProviderWC } from '@reactour/tour'
import { Button } from '../ui/button/Button'
import GoogleIcon from '../ui/components/GoogleIcon'

export const TourProvider = ({
  children,
  steps,
  defaultOpen,
  disableKeyboardNavigation = false,
  onSkipGuide,
}: TourProviderProps) => {
  const styles = {
    maskWrapper: (base: { [key: string]: string }): React.CSSProperties => ({
      ...base,
      color: '#222222',
    }),
    maskArea: (base: {
      [key: string]: string
    }): React.CSSProperties & { rx?: number } => ({
      ...base,
      rx: 20,
    }),
    popover: (base: { [key: string]: string }): React.CSSProperties => {
      return {
        ...base,
        boxShadow: 'none',
        backgroundColor: '#222222',
        color: '#fff',
        borderRadius: '8px',
        padding: '14px',
        fontSize: '12px',
      }
    },
  }
  return (
    <TourProviderWC
      steps={steps}
      defaultOpen={defaultOpen}
      styles={styles}
      padding={{
        mask: 0,
        popover: [0, 10],
      }}
      className='backdrop-blur-sm wizard-container-info'
      maskClassName='backdrop-blur-sm'
      highlightedMaskClassName='backdrop-blur-sm'
      onClickMask={() => null}
      prevButton={({ setIsOpen }) => {
        return (
          <Button
            variant='link'
            className='text-white'
            onClick={() => {
              onSkipGuide?.()
              setIsOpen(false)
            }}
          >
            Saltar guía
          </Button>
        )
      }}
      nextButton={({
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps = [],
      }) => {
        const last = currentStep === stepsLength - 1
        return (
          <Button
            variant='terciary'
            className='!gap-0'
            onClick={() => {
              if (last) {
                setIsOpen(false)
              } else {
                setCurrentStep((step) =>
                  step === steps?.length - 1 ? 0 : step + 1
                )
              }
            }}
          >
            Siguiente
            <GoogleIcon name='chevron_right' />
          </Button>
        )
      }}
      beforeClose={() => onSkipGuide?.()}
      showBadge={false}
      showDots={false}
      showCloseButton={false}
      disableInteraction={true}
      disableKeyboardNavigation={disableKeyboardNavigation}
    >
      {children}
    </TourProviderWC>
  )
}
